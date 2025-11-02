document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Hamburguesa ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbar = document.querySelector('.navbar');

    hamburgerMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    // --- Lógica para cargar productos del Catálogo ---
    // Esta es una solución simplificada. Netlify genera una API a partir de los archivos de Git.
    // Para que funcione, el repositorio en GitHub debe ser público.
    const catalogoContainer = document.getElementById('catalogo-container');
    const user = 'lgarcia28'; // TU USUARIO DE GITHUB
    const repo = 'shurianweb'; // EL NOMBRE DE TU REPOSITORIO
    const path = '_productos'; // La carpeta definida en config.yml

    async function cargarProductos() {
        try {
            const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
            if (!response.ok) {
                throw new Error('No se pudieron cargar los productos del catálogo.');
            }
            const files = await response.json();
            
            if (files.length === 0) {
                 catalogoContainer.innerHTML = '<p>No hay productos en el catálogo en este momento. ¡Vuelve pronto!</p>';
                 return;
            }

            for (const file of files) {
                // Obtenemos el contenido de cada archivo de producto
                const productResponse = await fetch(file.download_url);
                const productContent = await productResponse.text();

                // Extraemos los datos del archivo (esto es un parser simple)
                const titleMatch = productContent.match(/title:\s*"(.*?)"/);
                const descriptionMatch = productContent.match(/description:\s*"(.*?)"/);
                const imageMatch = productContent.match(/image:\s*"(.*?)"/);
                
                const title = titleMatch ? titleMatch[1] : 'Producto sin título';
                const description = descriptionMatch ? descriptionMatch[1] : 'Sin descripción.';
                const image = imageMatch ? imageMatch[1] : ''; // Ruta a la imagen

                // Creamos la tarjeta del producto
                const card = document.createElement('div');
                card.className = 'producto-card';
                card.innerHTML = `
                    <img src="${image}" alt="${title}">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a href="https://wa.me/543417551501?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(title)}." class="btn-consultar" target="_blank">Consultar</a>
                `;
                catalogoContainer.appendChild(card);
            }
        } catch (error) {
            console.error('Error:', error);
            catalogoContainer.innerHTML = '<p>Error al cargar el catálogo. Intenta de nuevo más tarde.</p>';
        }
    }
    
    // Solo ejecutamos la función si estamos en una página que tiene el contenedor del catálogo
    if (catalogoContainer) {
        cargarProductos();
    }
});
