// src/lib/tiendanube.js (VERSIÓN DE DIAGNÓSTICO AVANZADO)

const storeId = import.meta.env.PUBLIC_TIENDANUBE_STORE_ID;
const accessToken = import.meta.env.TIENDANUBE_ACCESS_TOKEN;

export async function getProducts() {
  console.log("--- INICIANDO OBTENCIÓN DE PRODUCTOS (DEBUG AVANZADO) ---");

  if (!storeId || !accessToken) {
    console.error("!!! ERROR CRÍTICO: Faltan las credenciales de Tiendanube en Vercel.");
    return [];
  }

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/products`, {
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'Web Shurian (shurian.store)'
      }
    });

    if (!response.ok) {
      console.error("!!! ERROR: La conexión con la API de Tiendanube falló. Código:", response.status);
      return [];
    }

    const allProducts = await response.json();
    console.log(`>>> Se recibieron ${allProducts.length} productos en total.`);

    // --- ¡LOG CLAVE! VAMOS A IMPRIMIR LAS CATEGORÍAS DE CADA PRODUCTO ---
    if (allProducts.length > 0) {
      console.log("--- ANALIZANDO CATEGORÍAS DE LOS PRODUCTOS RECIBIDOS ---");
      allProducts.forEach(product => {
        const categoryNames = product.categories.map(cat => cat.name.es);
        console.log(`Producto: "${product.name.es}" -> Categorías: [${categoryNames.join(', ')}]`);
      });
    }
    // --------------------------------------------------------------------

    const featuredProducts = allProducts.filter(product => {
      return product.categories.some(category => category.name.es === 'Destacados');
    });

    console.log(`>>> Se encontraron ${featuredProducts.length} productos después de filtrar por categoría "Destacados".`);
    console.log("--- FIN DEL PROCESO ---");

    return featuredProducts;

  } catch (error) {
    console.error("!!! ERROR CATASTRÓFICO DURANTE EL FETCH:", error);
    return [];
  }
}