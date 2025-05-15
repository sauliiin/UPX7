function loadUsersIntoFields(filter = "", singleUser = null) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Selecionar o contêiner principal onde os campos serão adicionados
    const servicesContainer = document.querySelector(".main-index");

    // Remover elementos relacionados aos usuários antes de recriá-los (preservando outros elementos HTML)
    const existingUserBlocks = servicesContainer.querySelectorAll(".user-block");
    existingUserBlocks.forEach(block => block.remove());

    if (users.length === 0) {
        return;
    }

    // Filtrar usuários com base no filtro de pesquisa ou no usuário selecionado
    let filteredUsers;
    if (singleUser) {
        // Filtra apenas o usuário selecionado
        filteredUsers = users.filter(user => 
            user.fullName === singleUser && 
            user.servicos && 
            user.servicos.length > 0
        );
    } else {
        // Filtra usuários com base no campo de busca e verifica se possuem serviços
        const searchText = filter.toLowerCase();
        filteredUsers = users.filter(user =>
            user.servicos &&
            user.servicos.length > 0 &&
            user.servicos.some(servico => servico.descricao.toLowerCase().includes(searchText))
        );
    }

    if (filteredUsers.length === 0) {
        return;
    }

    filteredUsers.forEach(user => {
        // Garantir que a foto do usuário está correta
        const foto = user.foto && user.foto.trim() !== "" ? user.foto : "img/foto-perfil-generica.jpg";

        const userBlock = document.createElement("div");
        userBlock.classList.add("user-block");

        // Adicionar a funcionalidade de clique para filtrar apenas o usuário selecionado
        userBlock.addEventListener("click", () => {
            loadUsersIntoFields("", user.fullName); // Reutiliza a função de busca para exibir apenas o usuário clicado
        });

        // Adicionar a foto do profissional
        const userImage = document.createElement("img");
        userImage.classList.add("user-image");
        userImage.src = foto;
        userImage.alt = `Foto de ${user.fullName}`;
        userBlock.appendChild(userImage);

        // Criar título com o nome do profissional
        const userName = document.createElement("h3");
        userName.textContent = `Nome do Prestador: ${user.fullName}`;
        userBlock.appendChild(userName);

        // Criar lista de campos
        const fieldList = document.createElement("ul");
        fieldList.classList.add("servicos-informacoes");

        // Adicionar os serviços (no mesmo formato dos outros campos)
        if (user.servicos && user.servicos.length > 0) {
            user.servicos.forEach(servico => {
                const serviceField = document.createElement("li");
                serviceField.classList.add("perfil-lista");
                serviceField.innerHTML = `
                    <label class="perfil-label">Serviço</label>
                    <button class="perfil-input" type="button" disabled>${servico.descricao}</button>
                `;
                fieldList.appendChild(serviceField);
            });
        }

        // Código para adicionar os campos (Telefone, Instagram, etc.)
        const fields = [
            { label: "Telefone", value: user.telefone },
            { label: "Instagram", value: user.instagram },
            { label: "Facebook", value: user.facebook },
            { label: "TikTok", value: user.tiktok },
        ];

        fields.forEach(field => {
            if (field.value) {
                const fieldItem = document.createElement("li");
                fieldItem.classList.add("perfil-lista");
                fieldItem.innerHTML = `
                    <label class="perfil-label">${field.label}</label>
                    <button class="perfil-input" type="button" disabled>${field.value}</button>
                `;
                fieldList.appendChild(fieldItem);
            }
        });

        // Adicionar campo de avaliação
        const avaliacaoField = document.createElement("li");
        avaliacaoField.classList.add("perfil-lista");

        const avaliacaoLabel = document.createElement("label");
        avaliacaoLabel.classList.add("perfil-label");
        avaliacaoLabel.textContent = "Avaliação";

        const avaliacaoImage = document.createElement("img");
        avaliacaoImage.classList.add("user-rating-centralizada");
        avaliacaoImage.src = user.avaliacao ? `img/${user.avaliacao}.png` : "img/0.png";
        avaliacaoImage.alt = user.avaliacao ? `${user.avaliacao} estrelas` : "Não avaliado";

        avaliacaoField.appendChild(avaliacaoLabel);
        avaliacaoField.appendChild(avaliacaoImage);
        fieldList.appendChild(avaliacaoField);

        // Adicionar a lista de campos ao bloco do usuário
        userBlock.appendChild(fieldList);

        // Adicionar o bloco ao contêiner principal
        servicesContainer.appendChild(userBlock);
    });
}

// Função para adicionar um novo usuário ao final da lista em localStorage
function addNewUser(newUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}

// Função para inicializar os dados e carregar usuários
document.addEventListener("DOMContentLoaded", () => {
    seedUsers(); // Adiciona os usuários seedados, caso ainda não tenham sido adicionados
    loadUsersIntoFields(); // Carrega todos os usuários na página

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (event) => {
        const filter = event.target.value; // Texto digitado no campo de busca
        loadUsersIntoFields(filter); // Atualiza os resultados com base no texto digitado
    });
});

function seedUsers() {
    if (localStorage.getItem("users")) {
        console.log("Usuários já cadastrados. Seed não será executado novamente.");
        return;
    }

    const users = [
        {
            fullName: "José Geraldo Garcia",
            foto: "img/pessoa1.jpg",
            servicos: [{ descricao: "Construções, reformas, reboco, contrapiso e assentamento de pisos e azulejos." }],
            telefone: "(31)994521567",
            instagram: "@Garcia_Jose",
            facebook: "José Geraldo Garcia",
            tiktok: "@Garcia_Jose",
            avaliacao: 5,
        },
        {
            fullName: "Marcos Ferreira",
            foto: "img/prestador2.png",
            servicos: [{ descricao: "Instalações elétricas, manutenção de disjuntores, quadros e fiação. Atende emergências." }],
            telefone: "(31) 99888-7744",
            instagram: "@marcos.eletricista",
            facebook: "fb.com/marcoseletricista",
            tiktok: "@eletricistamarcos",
            avaliacao: 4,
        },
        {
            fullName: "Carlos Menezes",
            foto: "img/prestador3.png",
            servicos: [{ descricao: "Detecção e reparo de vazamentos, troca de registros, instalação de torneiras, caixas d’água e pias." }],
            telefone: "(31) 91234-5678",
            instagram: "@carlosencanador",
            facebook: "fb.com/carlosencanador",
            tiktok: "@encanadorcarlos",
            avaliacao: 5,
        },
        {
            fullName: "Ana Beatriz Rocha",
            foto: "img/prestador4.jpg",
            servicos: [{ descricao: "Pintura de interiores e fachadas, texturas decorativas, grafiato, esmalte e epóxi." }],
            telefone: "(31) 93456-1234",
            instagram: "@anapinturas",
            facebook: "fb.com/anapinturas",
            tiktok: "@anabeatrizpintora",
            avaliacao: 3,
        },
        {
            fullName: "Rodrigo Campos",
            foto: "img/prestador5.jpg",
            servicos: [{ descricao: "Instalação, limpeza, manutenção e recarga de gás em ar-condicionado split e central." }],
            telefone: "(31) 99654-3210",
            instagram: "@rodrigoarcond",
            facebook: "fb.com/rodrigoar",
            tiktok: "@rodrigoartech",
            avaliacao: 2,
        },
        {
            fullName: "Lucas Almeida",
            foto: "img/prestador6.jpg",
            servicos: [{ descricao: "Forros de gesso, paredes de drywall, sancas e decoração em gesso." }],
            telefone: "(31) 98700-3344",
            instagram: "@lucasgesseiro",
            facebook: "fb.com/lucas.gesso",
            tiktok: "@lucasgesseiro",
            avaliacao: 5,
        },
        {
            fullName: "Eduardo Campos",
            foto: "img/prestador7.png",
            servicos: [{ descricao: "Checklists de manutenção predial, pequenos reparos, hidráulica, elétrica e alvenaria leve." }],
            telefone: "(31) 99888-0022",
            instagram: "@marianatechpredial",
            facebook: "fb.com/marianapredial",
            tiktok: "@marianatechpredial",
            avaliacao: 1,
        },
        {
            fullName: "Mariana Teixeira",
            foto: "img/prestador8.jpg",
            servicos: [{ descricao: "Instalação de porcelanato, cerâmica, vinílico, laminado e rodapés." }],
            telefone: "(31) 91000-0099",
            instagram: "@edu.pisos",
            facebook: "fb.com/edupisos",
            tiktok: "@edu.pisos",
            avaliacao: 4,
        },
        {
            fullName: "Sandra Moura",
            foto: "img/prestador9.jpg",
            servicos: [{ descricao: "Aplicação de manta asfáltica, pintura impermeabilizante, tratamento de lajes e paredes úmidas." }],
            telefone: "(31) 99123-4567",
            instagram: "@imper.sandra",
            facebook: "fb.com/sandraimper",
            tiktok: "@imper.sandra",
            avaliacao: 3,
        },
    ];

    // Atribuir foto padrão caso esteja ausente
    users.forEach(user => {
        if (!user.foto || user.foto.trim() === "") {
            user.foto = "img/foto-perfil-generica.jpg";
        }
        console.log(`Foto carregada para ${user.fullName}: ${user.foto}`);
    });

    localStorage.setItem("users", JSON.stringify(users));
    console.log("Usuários cadastrados com sucesso!");
}

// Inicializar os dados e carregar os usuários na página
document.addEventListener("DOMContentLoaded", () => {
    seedUsers();
    loadUsersIntoFields();
});



