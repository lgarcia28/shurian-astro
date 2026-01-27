// Leemos las variables de entorno que configuramos en Vercel
const storeId = import.meta.env.PUBLIC_TIENDANUBE_STORE_ID;
const accessToken = import.meta.env.TIENDANUBE_ACCESS_TOKEN;

export async function getProducts() {
  // Si las llaves no están configuradas, no hacemos nada
  if (!storeId || !accessToken) {
    console.error("Error: Faltan las credenciales de Tiendanube.");
    return []; 
  }

  try {
    // Hacemos la llamada a la API de Tiendanube
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

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return []; 
  }
}