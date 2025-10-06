document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('posts-list');

    // Função para buscar e exibir os posts
    async function fetchPosts() {
        try {
            const response = await fetch('/data/posts.json');
            if (!response.ok) {
                throw new Error('Não foi possível carregar a lista de posts.');
            }
            const posts = await response.json();

            // Limpa a lista antes de adicionar os posts
            postsList.innerHTML = '';

            // Adiciona cada post à lista na página
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-item');
                
                postElement.innerHTML = `
                    <p class="post-date">${post.date}</p>
                    <h2><a href="/post.html?slug=${post.slug}">${post.title}</a></h2>
                    <p>${post.summary}</p>
                `;
                postsList.appendChild(postElement);
            });

        } catch (error) {
            postsList.innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    }

    fetchPosts();
});