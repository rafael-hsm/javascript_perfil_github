import api from './api';

class App{
    //Construtor
    constructor(){
        // Carrega os dados do localStorage
        const repositoriosData = localStorage.getItem('repositorios');
        this.repositorios = Array.isArray(repositoriosData) ? repositoriosData : [];

        // Form
        this.formulario = document.querySelector('form');

        // Lista
        this.lista = document.querySelector('.list-group');

        // Método para registrar os eventos do form
        this.registrarEventos();
        
        // Chama salvarRepositoriosNoLocalStorage para garantir que os dados sejam salvos
        this.salvarRepositoriosNoLocalStorage();

        // Busca os dados já salvos
        this.renderizarTela();
    }

    salvarRepositoriosNoLocalStorage() {
        localStorage.setItem('repositorios', JSON.stringify(this.repositorios));
    };

    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento)
    };

    async adicionarRepositorio(evento){
        // Evita que o formulário recarregue a página
        evento.preventDefault();

        // Recuperar o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        // Se o input vier vazio... sai da app
        if(input.length === 0){
            return; // return sempre sai da função
        }

        // Ativa o carregamento
        this.apresentarBuscando();

        try{
            let response = await api.get(`/repos/${input}`);

            // console.log(response);
            let { name, description, html_url, owner: {avatar_url}} = response.data;
    
            // Adiciona o repositório na Lista
            this.repositorios.push({
                nome: name,
                descricao: description,
                avatar_url,
                link: html_url,
            });

            // Renderizar a tela
            this.renderizarTela()

            // Salva os repositórios no localStorage
            this.salvarRepositoriosNoLocalStorage();
        }catch(erro){
            console.log('input: ', input)
            // Limpa Busca, vamos remover a mensagem de busca e deixar apenas a de erro
            this.lista.removeChild(document.querySelector('.list-group-item-warning'));

            // Limpar erro existente
            let er = this.lista.querySelector('.list-group-item-danger');
            if(er !== null){
                this.lista.removeChild(er);
            }

            //<li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-danger');
            let txtErro = document.createTextNode(`O repositório ${input} não existe.`);
            li.appendChild(txtErro);
            this.lista.appendChild(li);
        }

    }

    apresentarBuscando(){
        //<li>
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-warning');
        let txtBuscando = document.createTextNode(`Aguarde, buscando o repositório...`);
        li.appendChild(txtBuscando);
        this.lista.appendChild(li);
    }

    renderizarTela(){
        // Limpar o contéudo de Lista
        this.lista.innerHTML = '';

        // Percorrer toda a lista de repositórios e criar os elementos
        this.repositorios.forEach((repositorio, index) => {
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

            //<p>
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorio.descricao)
            p.appendChild(txtDescricao)
            li.appendChild(p);

            //<a> Acessar
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorio.link);
            let txtA = document.createTextNode('Acessar');
            a.appendChild(txtA);
            li.appendChild(a);

            // Adicione um espaço em branco entre "Acessar" e "Remover"
            let espacoEmBranco = document.createTextNode(' '); // Cria um nó de texto contendo um espaço em branco
            li.appendChild(espacoEmBranco);

            //<a> remover
            let removerLink = document.createElement('a');
            removerLink.setAttribute('href', '#');
            let txtRemover = document.createTextNode('Remover');
            removerLink.appendChild(txtRemover);
            li.appendChild(removerLink);

            // Adicione um evento de clique para remover o repositório
            removerLink.addEventListener('click', (evento) => {
                evento.preventDefault();
                this.removerRepositorio(index);
            });

            // Adicionar <li> como filho da ul
            this.lista.appendChild(li);

            // Limpar o conteúdo do input
            this.formulario.querySelector('input[id=repositorio]').value = '';

            // Adiciona o foco no input
            this.formulario.querySelector('input[id=repositorio]').focus();
        });
    };

    // Função para remover um repositório da lista
    removerRepositorio(index) {
    // Remove o repositório da lista
    this.repositorios.splice(index, 1);

    // Renderiza a tela novamente após a remoção
    this.renderizarTela();

    // Atualiza o localStorage após a remoção
    this.salvarRepositoriosNoLocalStorage();
  }
}

new App();