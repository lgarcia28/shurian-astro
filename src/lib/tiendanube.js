// src/lib/tiendanube.js (VERSIÓN DE DIAGNÓSTICO)

const storeId = import.meta.env.PUBLIC_TIENDANUBE_STORE_ID;
const accessToken = import.meta.env.TIENDANUBE_ACCESS_TOKEN;

export async function getProducts() {
  console.log("--- INICIANDO OBTENCIÓN DE PRODUCTOS ---");

  if (!storeId || !accessToken) {
    console.error("!!! ERROR CRÍTICO: Faltan las credenciales de Tiendanube en Vercel.");
    return [];
  }

  console.log("Credenciales encontradas. Conectando con la tienda ID:", storeId);

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/products`, {
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'Web Shurian (shurian.store)'
      }
    });

    if (!response.ok) {
      console.error("!!! ERROR: La conexión con la API de Tiendanube falló. Código de estado:", response.status);
      return [];
    }

    const allProducts = await response.json();
    console.log(">>> DATOS CRUDOS RECIBIDOS DE LA API:", JSON.stringify(allProducts, null, 2));

    if (allProducts.length > 0) {
      console.log("--- Analizando el primer producto para ver sus tags ---");
      console.log("Nombre del primer producto:", allProducts[0].name.es);
      console.log("Tags del primer producto (tipo:", typeof allProducts[0].tags, "):", allProducts[0].tags);
    }

    const featuredProducts = allProducts.filter(product => {
      const hasTags = product.tags && typeof product.tags === 'string';
      if (!hasTags) return false;

      const tagsInLowerCase = product.tags.toLowerCase();
      return tagsInLowerCase.includes('destacados');
    });

    console.log(">>> PRODUCTOS FINALES DESPUÉS DE FILTRAR:", JSON.stringify(featuredProducts, null, 2));
    console.log("--- FIN DEL PROCESO ---");

    return featuredProducts;

  } catch (error) {
    console.error("!!! ERROR CATASTRÓFICO DURANTE EL FETCH:", error);
    return [];
  }
}