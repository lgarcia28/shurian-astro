// src/lib/tiendanube.js (VERSIÓN FINAL CON FILTRO POR CATEGORÍA)

const storeId = import.meta.env.PUBLIC_TIENDANUBE_STORE_ID;
const accessToken = import.meta.env.TIENDANUBE_ACCESS_TOKEN;

export async function getProducts() {
  if (!storeId || !accessToken) {
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
      return [];
    }

    const allProducts = await response.json();

    // --- ¡NUEVO FILTRO POR CATEGORÍA! ---
    const featuredProducts = allProducts.filter(product => {
      // product.categories es un array, así que usamos .some() para ver si alguna categoría coincide.
      return product.categories.some(category => category.name.es === 'Destacados');
    });

    return featuredProducts;

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}