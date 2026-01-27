// src/lib/tiendanube.js

const storeId = import.meta.env.PUBLIC_TIENDANUBE_STORE_ID;
const accessToken = import.meta.env.TIENDANUBE_ACCESS_TOKEN;

export async function getProducts() {
  if (!storeId || !accessToken) {
    console.error("Error: Faltan las credenciales de Tiendanube.");
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
      console.error("Error al conectar con la API de Tiendanube");
      return [];
    }

    const allProducts = await response.json();

    // --- ¡NUEVA LÓGICA DE FILTRADO! ---
    // Filtramos los productos para quedarnos solo con los que tengan el tag "destacados".
    const featuredProducts = allProducts.filter(product =>
      product.tags && product.tags.toLowerCase().includes('destacados')
    );

    return featuredProducts; // Devolvemos solo los productos destacados.

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}