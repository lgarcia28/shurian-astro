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

    return allProducts; // DEVOLVEMOS TODO TEMPORALMENTE PARA PROBAR

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}