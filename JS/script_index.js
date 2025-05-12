// Função para carregar e exibir os usuários na página
function loadUsersIntoFields() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Selecionar o contêiner principal onde os campos serão adicionados
    const servicesContainer = document.querySelector(".main-index");

    // Remover elementos relacionados aos usuários antes de recriá-los (preservando outros elementos HTML)
    const existingUserBlocks = servicesContainer.querySelectorAll(".user-block");
    existingUserBlocks.forEach(block => block.remove());

    if (users.length === 0) {
        const noUsersMessage = document.createElement("p");
        noUsersMessage.textContent = "Nenhum usuário encontrado.";
        noUsersMessage.style.color = "gray";
        noUsersMessage.style.fontStyle = "italic";
        servicesContainer.appendChild(noUsersMessage);
        return;
    }

    users.forEach(user => {
        // Garantir que a foto do usuário está correta
        const foto = user.foto && user.foto.trim() !== "" ? user.foto : "img/foto-perfil-generica.jpg";

        const userBlock = document.createElement("div");
        userBlock.classList.add("user-block");

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

        // Campo Descrição do Serviço
        if (user.servicos && user.servicos.length > 0) {
            user.servicos.forEach(servico => {
                const descricaoField = document.createElement("li");
                descricaoField.classList.add("servicos-lista");
                descricaoField.innerHTML = `
                    <label class="servicos-label">Descrição do Serviço</label>
                    <button class="servicos-input" type="button" disabled>${servico.descricao}</button>
                `;
                fieldList.appendChild(descricaoField);
            });
        } else {
            const noServicesMessage = document.createElement("p");
            fieldList.appendChild(noServicesMessage);
        }

        // Campos adicionais (Telefone, Instagram, Facebook, TikTok)
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

        // Adicionar o bloco ao contêiner principal
        userBlock.appendChild(fieldList);
        servicesContainer.appendChild(userBlock);
    });
}

// Função para adicionar um novo usuário ao final da lista em localStorage
function addNewUser(newUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}

// Inicializar os dados e carregar os usuários na página
document.addEventListener("DOMContentLoaded", () => {
    seedUsers(); // Adiciona os usuários seedados, caso ainda não tenham sido adicionados
    loadUsersIntoFields(); // Carrega todos os usuários na página
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
        },
        {
            fullName: "Marcos Ferreira",
            foto: "img/prestador2.png",
            servicos: [{ descricao: "Instalações elétricas, manutenção de disjuntores, quadros e fiação. Atende emergências." }],
            telefone: "(31) 99888-7744",
            instagram: "@marcos.eletricista",
            facebook: "fb.com/marcoseletricista",
            tiktok: "@eletricistamarcos",
        },
        {
            fullName: "Carlos Menezes",
            foto: "img/prestador3.png",
            servicos: [{ descricao: "Detecção e reparo de vazamentos, troca de registros, instalação de torneiras, caixas d’água e pias." }],
            telefone: "(31) 91234-5678",
            instagram: "@carlosencanador",
            facebook: "fb.com/carlosencanador",
            tiktok: "@encanadorcarlos",
        },
        {
            fullName: "Ana Beatriz Rocha",
            foto: "img/prestador4.jpg",
            servicos: [{ descricao: "Pintura de interiores e fachadas, texturas decorativas, grafiato, esmalte e epóxi." }],
            telefone: "(31) 93456-1234",
            instagram: "@anapinturas",
            facebook: "fb.com/anapinturas",
            tiktok: "@anabeatrizpintora",
        },
        {
            fullName: "Rodrigo Campos",
            foto: "img/prestador5.jpg",
            servicos: [{ descricao: "Instalação, limpeza, manutenção e recarga de gás em ar-condicionado split e central." }],
            telefone: "(31) 99654-3210",
            instagram: "@rodrigoarcond",
            facebook: "fb.com/rodrigoar",
            tiktok: "@rodrigoartech",
        },
        {
            fullName: "Lucas Almeida",
            foto: "img/prestador6.jpg",
            servicos: [{ descricao: "Forros de gesso, paredes de drywall, sancas e decoração em gesso." }],
            telefone: "(31) 98700-3344",
            instagram: "@lucasgesseiro",
            facebook: "fb.com/lucas.gesso",
            tiktok: "@lucasgesseiro",
        },
        {
            fullName: "Mariana Teixeira",
            foto: "img/Perfis/2.jpg",
            servicos: [{ descricao: "Checklists de manutenção predial, pequenos reparos, hidráulica, elétrica e alvenaria leve." }],
            telefone: "(31) 99888-0022",
            instagram: "@marianatechpredial",
            facebook: "fb.com/marianapredial",
            tiktok: "@marianatechpredial",
        },
        {
            fullName: "Eduardo Lima",
            foto: "img/prestador7.png",
            servicos: [{ descricao: "Instalação de porcelanato, cerâmica, vinílico, laminado e rodapés." }],
            telefone: "(31) 91000-0099",
            instagram: "@edu.pisos",
            facebook: "fb.com/edupisos",
            tiktok: "@edu.pisos",
        },
        {
            fullName: "Sandra Moura",
            foto: "img/Perfis/3.jpeg",
            servicos: [{ descricao: "Aplicação de manta asfáltica, pintura impermeabilizante, tratamento de lajes e paredes úmidas." }],
            telefone: "(31) 99123-4567",
            instagram: "@imper.sandra",
            facebook: "fb.com/sandraimper",
            tiktok: "@imper.sandra",
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