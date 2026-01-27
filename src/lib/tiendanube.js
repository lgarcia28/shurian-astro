// src/lib/tiendanube.js (VERSIÓN FINAL Y LIMPIA)

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

    // Filtramos por la categoría "Destacados"
    const featuredProducts = allProducts.filter(product => {
      return product.categories.some(category => category.name.es === 'Destacados');
    });

    return featuredProducts;

  } catch (error) {
    // En producción, es mejor no loguear el error completo, pero sí saber que ocurrió.
    console.error("Error al obtener los productos desde Tiendanube.");
    return [];
  }
}