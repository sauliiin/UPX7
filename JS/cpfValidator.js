function anyKeyPressed (event) {
    let campo = event.target;            // Pega o campo onde o evento ocorreu
    campo.value = mascara(campo.value);   // Chama a função máscara para o valor do campo
}

function mascara (valorRecebido) {
    valorRecebido = valorRecebido.replace(/\D/g,'');  
    valorRecebido = valorRecebido.replace(/(\d{3})(\d)/,"$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos
    valorRecebido = valorRecebido.replace(/(\d{3})(\d)/,"$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos do segundo bloco de números
    valorRecebido = valorRecebido.replace(/(\d)(\d{2})$/,"$1-$2"); // Coloca um hífen antes do 2 últimos números
    if (valorRecebido.length === 14) validarCpf(valorRecebido);
    return valorRecebido;
}

function validarCpf (cpfFormatado) {
    let cpfTeste = cpfFormatado
    if (cpfTeste == '000.000.000-00' || cpfTeste == '111.111.111-11' || cpfTeste == '222.222.222-22' || cpfTeste == '333.333.333-33' || cpfTeste == '444.444.444-44' || cpfTeste == '555.555.555-55' || cpfTeste == '666.666.666-66' || cpfTeste == '777.777.777-77' || cpfTeste == '888.888.888-88' || cpfTeste == '999.999.999-99') {
        setTimeout(() => {alert('Número de CPF Inválido')}, 300);
    }
    let cpfArray = Array.from(cpfFormatado.replace(/\D+/g, ''));
    const cpfv1 = cpfArray.slice(0, -2).reverse();
    const cpfv2 = cpfArray.slice(0, -1).reverse();
    let D1 = calculosDig(cpfv1);
    let D2 = calculosDig(cpfv2);
    let cpfD1 = cpfArray[9];
    let cpfD2 = cpfArray[10];
    if (cpfD1 != D1 || cpfD2 != D2) {
        setTimeout(() => {alert('Número de CPF Inválido')}, 500);
    }
}

function calculosDig(cpfv) {
    const dig = cpfv.reduce(function(acumulador, valor, indice){   
        acumulador += Number(valor)*(indice + 2);
        return acumulador;
    }, 0);
    const Digito = (dig*10%11) >= 10 ? 0 : dig*10%11;
    console.log(Digito);
    return Digito;
}


/* 
/\D/ é uma expressão regular (regex). As barras são os delimitadores e servem para indicar que dentro dela tem uma regex. No caso, a expressão utilizada \D e para encontrar um caractere que não seja número. O g é uma flag de global (não apenas para Regex), ou seja, irá buscar a expressão entre // em toda a sua string
/\d\ busca um número

//{3} Pesquisa 3 ocorrências correspondentes ao carácter precedido. Entre {} deve ter um inteiro positivo.

$  corresponde a final do texto.

let texto1 = 'bicicleta de rodas'
texto1 = texto1.replace(/\i/g, I)

Obs: você pode tentar uma máscara mais reduzida, mas prefiro a acima, porque ela inclui a formatação enquanto você digita: após 3 dígitos digitados já aparece o ".". Neste código a seguir, por exemplo, so formata após digitado tudo: valorRecebido = valorRecebido.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$+')

A mesma coisa, mas com arrow function
const anyKeyPressed = (event) => {
    let input = event.target
    input.value = cpfMask(input.value)
}
  
const cpfMask = (value) => {
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    value = value.replace(/(\d{3})(\d)/,"$1.$2")
    value = value.replace(/(\d{3})(\d)/,"$1.$2")
    value = value.replace(/(\d)(\d{2})$/,"$1-$2")
    return value
}
*/

/////////////////// Verificar se o e-mail já está cadastrado ///////////////////
// Salvara em um arquivo json os e-mails e cpfs cadastrados na forma de array, quando a pessoa clica em criar, verifica se já ta cadastrado.

let emailsCadastrados = [];
let cpfCadastrados = [];
let cnhCadastrados = [];
let usuarios = [];

function cadastroUsuario() {
    let nome = String((document.getElementById('nome')).value);
    let senha = String((document.getElementById('senha')).value);
    let email = String((document.getElementById('email')).value);
    let cpf = String((document.getElementById('cpfUsuario')).value);
    let cnh = String((document.getElementById('cnhUsuario')).value);
    emailsCadastrados.push(email);
    cpfCadastrados.push(cpf);
    cnhCadastrados.push(cnh);
    let emailsJson = JSON.stringify(emailsCadastrados);
    let cpfJson = JSON.stringify(cpfCadastrados);
    let cnhJson = JSON.stringify(cnhCadastrados);
    localStorage.setItem('emails', emailsJson);
    localStorage.setItem('cpfs', cpfJson);
    localStorage.setItem('cnhs', cnhJson);
    console.log(email)
    console.log(cpfJson)
    console.log(cnhJson)
    if (hasDuplicates(cnhCadastrados) === true && hasDuplicates(emailsCadastrados) === true && hasDuplicates(cpfCadastrados) === true) {
        console.log('CNH, CPF e-mail já cadastrados! Verifique os dados digitados.');
        alert('CNH, CPF e e-mail já cadastrados! Verifique os dados digitados.');
        cnhCadastrados.pop();
        cpfCadastrados.pop();
        emailsCadastrados.pop();
    } else if (nome == '' || senha == '' || email == '' || cpf == '' || cnh == '') {
        alert ('Todos os campos devem ser preenchidos!')
    } else if (hasDuplicates(cpfCadastrados) === true && hasDuplicates(emailsCadastrados) === true) {
        console.log('E-mail e CPF já cadastrados! Verifique os dados digitados.');
        alert('E-mail e CPF já cadastrados! Verifique os dados digitados.');
        cpfCadastrados.pop();
        emailsCadastrados.pop();  
    } else if (hasDuplicates(cnhCadastrados) === true && hasDuplicates(emailsCadastrados) === true) {
        console.log('CNH e e-mail já cadastrados! Verifique os dados digitados.');
        alert('CNH e e-mail já cadastrados! Verifique os dados digitados.');
        cnhCadastrados.pop();
        emailsCadastrados.pop(); 
    } else if (hasDuplicates(cnhCadastrados) === true && hasDuplicates(cpfCadastrados) === true) {
        console.log('CNH e CPF já cadastrados! Verifique os dados digitados.');
        alert('CNH e CPF já cadastrados! Verifique os dados digitados.');
        cnhCadastrados.pop();
        cpfCadastrados.pop(); 
    } else if (hasDuplicates(cpfCadastrados) === true) {
        console.log('CPF já cadastrado! Verifique os dados digitados.');
        alert('CPF ja cadastrado! Verifique os dados digitados.');
        cpfCadastrados.pop();   // Deleta o cpf recém cadastrado em duplicidade
    } else if (hasDuplicates(emailsCadastrados) === true) {
        console.log('Email já cadastrado! Verifique os dados digitados.');
        alert('Email ja cadastrado! Verifique os dados digitados.');
        emailsCadastrados.pop();   // Deleta o e-mail recém cadastrado em duplicidade
    } else if (hasDuplicates(cnhCadastrados) === true) {
        console.log('CNH já cadastrada! Verifique os dados digitados.');
        alert('CNH já cadastrada! Verifique os dados digitados.');
        cnhCadastrados.pop();   
    } else {
        const usuario = criaPessoas(nome, email, cpf, cnh, senha)
        usuarios.push(usuario);
        let usuariosJson = JSON.stringify(usuarios);
        localStorage.setItem('usuarios', usuariosJson);
        console.log(usuario);
        console.log(usuarios);
        console.log(usuariosJson);
        alert('Cadastro finalizado com sucesso!');
    }
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function criaPessoas (nome, email, cpf, cnh, senha) {
    return {
        nome: nome,
        email: email,
        cpf: cpf,
        cnh: cnh,
        senha: senha
    }
}

const content = document.querySelector(".content");
const inputSearch = document.querySelector("input[type='search']");

let items = [];

inputSearch.oninput = () => {
  content.innerHTML = "";

  items
    .filter((item) =>
      item.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
    .forEach((item) => addHTML(item));
};

function addHTML(item) {
  const div = document.createElement("div");
  div.innerHTML = item;
  content.append(div);
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((data) => data.json())
  .then((users) => {
    users.forEach((user) => {
      addHTML(user.name);
      items.push(user.name);
    });
  });

  