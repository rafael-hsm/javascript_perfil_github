class APP{
    //Construtor
    constructor(){
        // Lista de repositórios
        this.repositorios = [];

        // Form
        this.formulario = document.querySelector('form');

        // Lista
        this.lista = document.querySelector('.list-group');

        // Método para registrar os eventos do form
        this.registrarEventos();
    }

    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento)
    }

    adicionarRepositorio(evento){
        // Evita que o formulário recarregue a página
        evento.preventDefault();

        // Adiciona o repositório na Lista
        this.repositorios.push({
            nome: 'Nerd Fonts',
            descricao: 'Iconic font aggregator, collection, and patcher.',
            avatar_url: 'https:/avatars0.githubusercontent.com/u/8083459?v=4',
            link: 'https://github.com/ryanoasis/nerd-fonts'
        });

        // Renderizar a tela
        console.log(this.repositorios);
    }

    renderizarTela(){
        // Limpar o contéudo de Lista
        this.lista.innerHTML = '';

        // Percorrer toda a lista de repositórios e criar os elementos
        this.repositorios.forEach(repositorio => {
            //<li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            //<img>
            let img = document.createElement('img');
            img.setAttribute('src', repositorio.avatar_url);
            li.appendChild(img);

            //<strong>
            let strong = document.createElement('strong');
            let txtNome = document.createTextNode(repositorio.nome);
            strong.appendChild(txtNome);
            li.appendChild(strong);

        })
    }
}

new APP();