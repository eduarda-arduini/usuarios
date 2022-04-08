
function insert(){
    const listaUsuario = document.querySelector('ul');
	const val = document.querySelector('input').value;
    const res = axios.post('http://localhost:8088/usuario/', {
        nome: val
    }).then(resp => {
        data = resp.data;
        const { excluirUsuario, linhaBotao, usuario } = createHtml();
        excluirUsuario.setAttribute("id", data.id);
        excluirUsuario.onclick = function () {
            remove(this.id);
        };
        linhaBotao.append(excluirUsuario)
        usuario.appendChild(document.createTextNode(data.nome));
        usuario.appendChild(linhaBotao);
        listaUsuario.appendChild(usuario)
    })
}

function createHtml() {
    const usuario = document.createElement('li');
    const linhaBotao = document.createElement('li');
    const excluirUsuario = document.createElement('button');
    excluirUsuario.innerText = "excluir";
    return { excluirUsuario, linhaBotao, usuario };
}

function remove(id){
    const res = axios.delete('http://localhost:8088/usuario/' + id).then(resp => {
        const usuario = document.getElementById(id);
        const ulUsuario = usuario.parentElement
        ulUsuario.parentElement.remove()
    })
}


function getAll(){
    const listaUsuario = document.querySelector('ul');
	const val = document.querySelector('input').value;
    const res = axios.get('http://localhost:8088/usuario/').then(resp => {
        data = resp.data;
        data.forEach(e => {
            const { excluirUsuario, linhaBotao, usuario } = createHtml();
            excluirUsuario.setAttribute("id", e.id);
            excluirUsuario.onclick = function () {
                remove(e.id);
            };
            linhaBotao.append(excluirUsuario)
            usuario.appendChild(document.createTextNode(e.nome));
            usuario.appendChild(linhaBotao);
            listaUsuario.appendChild(usuario)
        })});
}

window.onload = getAll;

window.insert = insert;

window.remove = remove;