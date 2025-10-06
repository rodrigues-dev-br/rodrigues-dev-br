document.addEventListener('DOMContentLoaded', () => {
    const postContent = document.getElementById('post-content');
    
    // Pega o 'slug' do post da URL
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('slug');

    if (!postSlug) {
        postContent.innerHTML = `<p>Post não encontrado. <a href="/">Voltar para a home</a>.</p>`;
        return;
    }

    // Função para buscar e renderizar o post
    async function fetchPost() {
        try {
            const response = await fetch(`/data/${postSlug}.json`);
            if (!response.ok) {
                throw new Error('Post não encontrado.');
            }
            const post = await response.json();
            
            // Define o título da página
            document.title = `${post.title} - Rodrigues.Dev`;

            // Limpa o container antes de adicionar o conteúdo
            postContent.innerHTML = '';

            // Adiciona o título e a data
            const header = `
                <h1>${post.title}</h1>
                <p class="post-meta">Publicado por ${post.author} em ${post.date}</p>
            `;
            postContent.insertAdjacentHTML('beforeend', header);
            
            // Renderiza o conteúdo do post (parágrafos, imagens, código, etc.)
            post.content.forEach(element => {
                let htmlElement = '';
                switch (element.type) {
                    case 'paragraph':
                        htmlElement = `<p>${element.value}</p>`;
                        break;
                    case 'image':
                        htmlElement = `<img src="${element.src}" alt="${element.alt}">`;
                        break;
                    case 'code':
                        // Escapa caracteres HTML para exibir o código corretamente
                        const escapedCode = element.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        htmlElement = `<pre><code class="language-${element.lang}">${escapedCode}</code></pre>`;
                        break;
                    case 'heading':
                        htmlElement = `<h2>${element.value}</h2>`;
                        break;
                }
                postContent.insertAdjacentHTML('beforeend', htmlElement);
            });

        } catch (error) {
            document.title = 'Erro - Rodrigues.Dev';
            postContent.innerHTML = `<p style="color: red;">${error.message} <a href="/">Voltar para a home</a>.</p>`;
        }
    }

    fetchPost();
});