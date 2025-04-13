import './index.css'

const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');
const resultadoBusca = document.getElementById('resultadoBusca');

btnBusca.addEventListener('click', () => {
    const valor = inputBusca.value.trim();
    if (valor !== '') {
      resultadoBusca.textContent = `Você buscou por: "${valor}"`;
    } else {
      resultadoBusca.textContent = '';
    }
});

// Dados dos departamentos e categorias
const menuData = {
    departamentos: [
        {
            nome: "Departamento",
            isActive: true,
            categorias: [
                { titulo: "Categoria", items: ["Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria"] },
                { titulo: "Categoria", items: ["Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria"] },
                { titulo: "Categoria", items: ["Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria", "Categoria"] }
            ]
        },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false },
        { nome: "Departamento", isActive: false }
    ]
};

// Função para criar o menu mobile
function createMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-white transform translate-x-full transition-transform duration-300 ease-in-out z-50 lg:hidden';
    mobileMenu.id = 'mobile-menu';

    // Overlay escuro para o fundo
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 -z-10';
    mobileMenu.appendChild(overlay);

    // Cabeçalho do menu mobile
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10';
    
    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold text-[#005CFF]';
    title.textContent = 'Menu';

    const closeButton = document.createElement('button');
    closeButton.className = 'text-gray-500 p-2 hover:bg-gray-100 rounded-full';
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;

    header.appendChild(title);
    header.appendChild(closeButton);
    mobileMenu.appendChild(header);

    // Lista de departamentos
    const departmentList = document.createElement('div');
    departmentList.className = 'overflow-y-auto h-[calc(100vh-64px)] bg-white pb-20';

    menuData.departamentos.forEach(dep => {
        const depItem = document.createElement('div');
        depItem.className = 'border-b';
        
        const depButton = document.createElement('button');
        depButton.className = 'w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50';
        depButton.innerHTML = `
            <span class="text-gray-800">${dep.nome}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        `;

        if (dep.categorias) {
            const subMenu = document.createElement('div');
            subMenu.className = 'hidden bg-gray-50';
            
            dep.categorias.forEach(cat => {
                const catSection = document.createElement('div');
                catSection.className = 'py-3 px-6';
                
                const catTitle = document.createElement('h3');
                catTitle.className = 'text-[#005CFF] font-semibold mb-2';
                catTitle.textContent = cat.titulo;
                
                const catList = document.createElement('ul');
                catList.className = 'space-y-2';
                
                cat.items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="#" class="text-gray-600 block py-1 hover:text-[#005CFF]">${item}</a>`;
                    catList.appendChild(li);
                });

                catSection.appendChild(catTitle);
                catSection.appendChild(catList);
                subMenu.appendChild(catSection);
            });

            depButton.addEventListener('click', () => {
                const isExpanded = !subMenu.classList.contains('hidden');
                subMenu.classList.toggle('hidden');
                const arrow = depButton.querySelector('svg');
                arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
                depButton.classList.toggle('text-[#005CFF]', !isExpanded);
                depButton.classList.toggle('bg-gray-50', !isExpanded);
            });

            depItem.appendChild(depButton);
            depItem.appendChild(subMenu);
        } else {
            depItem.appendChild(depButton);
        }

        departmentList.appendChild(depItem);
    });

    mobileMenu.appendChild(departmentList);
    document.body.appendChild(mobileMenu);

    // Eventos para abrir/fechar o menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0');
        overlay.classList.remove('-z-10');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('-z-10');
        }, 300);
        document.body.style.overflow = '';
    };

    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevenir que o menu feche ao clicar dentro dele
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Inicializar o menu mobile quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
});

// Dados dos produtos
const productData = [
    {
        image: '/img/camisa branca.png',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
        originalPrice: 'R$ 100,00',
        price: 'R$ 79,90',
        installments: '10x de R$ 7,90'
    },
    {
        image: '/img/camisa branca.png',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
        originalPrice: 'R$ 100,00',
        price: 'R$ 79,90',
        installments: '10x de R$ 7,90'
    },
    {
        image: '/img/camisa branca.png',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
        originalPrice: 'R$ 100,00',
        price: 'R$ 79,90',
        installments: '10x de R$ 7,90'
    },
    {
        image: '/img/camisa branca.png ',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
        originalPrice: 'R$ 100,00',
        price: 'R$ 79,90',
        installments: '10x de R$ 7,90'
    },
    {
        image: '/img/camisa branca.png',
        title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
        originalPrice: 'R$ 100,00',
        price: 'R$ 79,90',
        installments: '10x de R$ 7,90'
    }
];

// Função para criar o dropdown dos departamentos na barra superior
function createTopDepartmentDropdown() {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'hidden group-hover:block absolute top-full left-0 bg-white shadow-lg w-[1000px] py-2 rounded-lg z-50';
    dropdownContainer.style.height = '400px';

    const submenuContent = document.createElement('div');
    submenuContent.className = 'h-full flex flex-row justify-between p-6';

    const grid = document.createElement('div');
    grid.className = 'flex flex-row justify-between w-full';

    // Usar as categorias do primeiro departamento (que é o ativo)
    const activeDepartment = menuData.departamentos.find(dep => dep.isActive);
    if (activeDepartment && activeDepartment.categorias) {
        activeDepartment.categorias.forEach(cat => {
            const column = document.createElement('div');
            column.className = 'flex flex-col w-1/2';
            
            const title = document.createElement('h3');
            title.className = 'text-[#005CFF] font-semibold mb-4';
            title.textContent = cat.titulo;
            
            const list = document.createElement('ul');
            list.className = 'space-y-2';
            
            cat.items.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'text-gray-600 hover:text-[#005CFF]';
                a.textContent = item;
                li.appendChild(a);
                list.appendChild(li);
            });

            column.appendChild(title);
            column.appendChild(list);
            grid.appendChild(column);
        });
    }

    // Adicionar a imagem promocional
    const promoContainer = document.createElement('div');
    promoContainer.className = 'mt-auto w-1/3 h-full flex align-middle justify-center';
    
    const promoImage = document.createElement('img');
    promoImage.src = '/img/imagem do dropdown.png';
    promoImage.alt = 'Confira os Produtos';
    promoImage.className = 'w-236 h-298 object-cover rounded-lg';

    submenuContent.appendChild(grid);
    submenuContent.appendChild(promoContainer);
    promoContainer.appendChild(promoImage);
    dropdownContainer.appendChild(submenuContent);

    return dropdownContainer;
}

// Função para criar o dropdown principal
function createDropdown() {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'hidden group-hover:flex absolute top-full left-0 bg-[#F5F5F5] shadow-lg z-50';
    
    const departamentosList = document.createElement('div');
    departamentosList.className = 'flex flex-col py-2 max-h-[400px] overflow-y-auto overflow-x-hidden w-64';
    departamentosList.style.scrollbarWidth = 'thin';
    departamentosList.style.scrollbarColor = '#D1D5DB transparent';

    let activeSubmenu = null;

    menuData.departamentos.forEach((dep, index) => {
        const depItem = document.createElement('div');
        depItem.className = 'departamento-item';
        
        const depLink = document.createElement('a');
        depLink.href = '#';
        depLink.className = 'flex items-center justify-between px-4 py-2 hover:bg-gray-100';
        
        const depText = document.createElement('span');
        depText.className = dep.isActive ? 'text-[#005CFF] font-semibold' : 'text-gray-600';
        depText.textContent = dep.nome;
        
        const arrow = document.createElement('span');
        arrow.className = dep.isActive ? 'text-[#005CFF]' : 'text-gray-400';
        arrow.textContent = '›';
        
        depLink.appendChild(depText);
        depLink.appendChild(arrow);
        depItem.appendChild(depLink);

        // Criar submenu apenas para o primeiro departamento
        if (dep.isActive && dep.categorias) {
            activeSubmenu = createSubmenu(dep.categorias);
        }

        departamentosList.appendChild(depItem);
    });

    dropdownContainer.appendChild(departamentosList);
    if (activeSubmenu) {
        dropdownContainer.appendChild(activeSubmenu);
    }
    return dropdownContainer;
}

// Função para criar o submenu com as categorias
function createSubmenu(categorias) {
    const submenu = document.createElement('div');
    submenu.className = 'bg-white shadow-lg w-[1000px] z-50';
    submenu.style.backgroundColor = 'white';
    submenu.style.height = '400px';

    const submenuContent = document.createElement('div');
    submenuContent.className = 'h-full flex flex-row justify-between p-6';

    const grid = document.createElement('div');
    grid.className = 'flex flex-row justify-between w-full';

    categorias.forEach(cat => {
        const column = document.createElement('div');
        column.className = 'flex flex-col w-1/2';
        
        const title = document.createElement('h3');
        title.className = 'text-[#005CFF] font-semibold mb-4';
        title.textContent = cat.titulo;
        
        const list = document.createElement('ul');
        list.className = 'space-y-2';
        
        cat.items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'text-gray-600 hover:text-[#005CFF]';
            a.textContent = item;
            li.appendChild(a);
            list.appendChild(li);
        });

        column.appendChild(title);
        column.appendChild(list);
        grid.appendChild(column);
    });

    // Adicionar a imagem promocional
    const promoContainer = document.createElement('div');
    promoContainer.className = 'mt-auto w-1/3 h-full flex align-middle justify-center';
    
    const promoImage = document.createElement('img');
    promoImage.src = '/img/imagem do dropdown.png';
    promoImage.alt = 'Confira os Produtos';
    promoImage.className = 'w-236 h-298    object-cover rounded-lg';

    submenuContent.appendChild(grid);
    submenuContent.appendChild(promoContainer);
    promoContainer.appendChild(promoImage);
    submenu.appendChild(submenuContent);

    return submenu;
}

// Função para criar o banner promocional
function createSuperSaleBanner() {
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'relative w-full bg-[#E7E7EA] flex justify-center';

    const innerContainer = document.createElement('div');
    innerContainer.className = 'w-full lg:max-w-7xl flex flex-row h-[382px] lg:h-[400px]';

    // Container da imagem com texto sobreposto no mobile
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full lg:w-1/2 h-full flex items-stretch relative';
    
    // Usar picture com source para controlar a imagem em diferentes tamanhos de tela
    const picture = document.createElement('picture');
    picture.className = 'w-full';
    
    // Source para desktop
    const desktopSource = document.createElement('source');
    desktopSource.media = '(min-width: 1025px)';
    desktopSource.srcset = '/img/Imagem-Home.png';
    
    // Source para mobile
    const mobileSource = document.createElement('source');
    mobileSource.media = '(max-width: 1024px)';
    mobileSource.srcset = '/img/cert/banner-promocional-mobile.png';
    
    // Imagem padrão
    const img = document.createElement('img');
    img.src = '/img/Imagem-Home.png';
    img.alt = 'Super Sale';
    img.className = 'w-full h-full object-cover object-center';
    
    picture.appendChild(desktopSource);
    picture.appendChild(mobileSource);
    picture.appendChild(img);
    
    // Texto sobreposto para mobile
    const mobileTextOverlay = document.createElement('div');
    mobileTextOverlay.className = 'absolute inset-0 flex flex-col items-end justify-center pr-10 lg:hidden';

    const mobileTitle = document.createElement('div');
    mobileTitle.className = 'flex flex-col items-center justify-center text-center px-5';
    
    const mobileSuperText = document.createElement('div');
    mobileSuperText.textContent = 'SUPER';
    mobileSuperText.className = 'text-[48px] leading-none font-bold mb-1';
    
    const mobileSaleText = document.createElement('div');
    mobileSaleText.textContent = 'SALE';
    mobileSaleText.className = 'text-[48px] leading-none font-light';

    const mobileSubtitle = document.createElement('p');
    mobileSubtitle.className = 'text-[#0066FF] text-base mb-1 mt-2 font-bold text-base';
    mobileSubtitle.textContent = 'SELECTED ITEMS UP TO';

    const mobileDiscount = document.createElement('p');
    mobileDiscount.className = 'text-[#0066FF] text-[48px] leading-none font-bold text-3x1';
    mobileDiscount.textContent = '50%OFF';

    mobileTitle.appendChild(mobileSuperText);
    mobileTitle.appendChild(mobileSaleText);
    mobileTextOverlay.appendChild(mobileTitle);
    mobileTextOverlay.appendChild(mobileSubtitle);
    mobileTextOverlay.appendChild(mobileDiscount);
    
    imageContainer.appendChild(picture);
    imageContainer.appendChild(mobileTextOverlay);

    // Container do texto (visível apenas no desktop)
    const textContainer = document.createElement('div');
    textContainer.className = 'hidden lg:flex w-1/2 flex-col items-center justify-center';

    const title = document.createElement('div');
    title.className = 'flex text-[64px] leading-none mb-4';

    const superText = document.createElement('div');
    superText.textContent = 'SUPER';
    superText.className = 'font-bold';
    
    const saleText = document.createElement('div');
    saleText.textContent = 'SALE';
    saleText.className = 'font-light';
    
    title.appendChild(superText);
    title.appendChild(saleText);

    const subtitle = document.createElement('p');
    subtitle.className = 'text-[#0066FF] text-xl uppercase tracking-wider';
    subtitle.textContent = 'ITENS SELECIONADOS COM ATÉ';

    const discount = document.createElement('p');
    discount.className = 'text-[#0066FF] text-[48px] leading-none font-bold mt-1';
    discount.textContent = '50%OFF';

    textContainer.appendChild(title);
    textContainer.appendChild(subtitle);
    textContainer.appendChild(discount);

    innerContainer.appendChild(imageContainer);
    innerContainer.appendChild(textContainer);

    bannerContainer.appendChild(innerContainer);

    return bannerContainer;
}

// Função para criar o carrossel de produtos
function createProductCarousel() {
    const section = document.createElement('section');
    section.className = 'w-full max-w-7xl mx-auto px-4 py-12 mt-8';

    // Header do carrossel
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-8';

    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold';
    title.textContent = 'Lançamentos';

    const viewMore = document.createElement('a');
    viewMore.href = '#';
    viewMore.className = 'text-gray-600 hover:text-[#005CFF]';
    viewMore.textContent = 'Ver mais';

    header.appendChild(title);
    header.appendChild(viewMore);

    // Container do carrossel
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'relative overflow-hidden';

    // Container de produtos com scroll horizontal
    const productGrid = document.createElement('div');
    productGrid.className = 'flex gap-4 pb-8 lg:pb-4 scrollbar-hide snap-x snap-mandatory overflow-x-auto';
    productGrid.style.scrollBehavior = 'smooth';
    productGrid.style.scrollbarWidth = 'none';
    productGrid.style.msOverflowStyle = 'none';
    productGrid.style.webkitOverflowScrolling = 'touch';

    // Esconder a barra de rolagem
    const style = document.createElement('style');
    style.textContent = `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Botões de navegação (visíveis apenas em desktop)
    const prevButton = document.createElement('button');
    prevButton.className = 'hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center z-10 hover:bg-gray-50 transition-colors';
    prevButton.innerHTML = '<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>';

    const nextButton = document.createElement('button');
    nextButton.className = 'hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center z-10 hover:bg-gray-50 transition-colors';
    nextButton.innerHTML = '<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';

    // Container dos indicadores de página
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'absolute bottom-0 left-0 right-0 flex justify-center gap-2 lg:hidden';

    // Adicionar produtos ao grid
    productData.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'relative group bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[calc(50%-8px)] lg:w-[280px] snap-start';

        // Badge NOVO
        const badge = document.createElement('span');
        badge.className = 'absolute top-2 left-2 bg-[#002D6C] text-white text-xs px-2 py-1 rounded z-10';
        badge.textContent = 'NOVO';

        // Imagem do produto
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative aspect-square bg-white rounded-t-lg p-4';
        
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        image.className = 'w-full h-full object-contain';
        
        imageContainer.appendChild(image);

        // Informações do produto
        const info = document.createElement('div');
        info.className = 'p-4 space-y-2';

        const productTitle = document.createElement('h3');
        productTitle.className = 'text-sm text-gray-800 line-clamp-2 h-10';
        productTitle.textContent = product.title;

        const priceContainer = document.createElement('div');
        priceContainer.className = 'flex items-center gap-2 flex-wrap';

        const originalPrice = document.createElement('span');
        originalPrice.className = 'text-gray-400 line-through text-sm';
        originalPrice.textContent = product.originalPrice;

        const discountBadge = document.createElement('span');
        discountBadge.className = 'bg-[#E8F3FF] text-[#005CFF] text-xs px-2 py-1 rounded';
        discountBadge.textContent = '10% OFF';

        const price = document.createElement('div');
        price.className = 'text-lg font-bold w-full';
        price.textContent = product.price;

        const installments = document.createElement('div');
        installments.className = 'text-sm text-gray-600 mb-4';
        installments.textContent = 'Ou em até ' + product.installments;

        // Botão Comprar
        const buyButton = document.createElement('button');
        buyButton.className = 'w-full bg-[#005CFF] text-white py-2 rounded-lg hover:bg-[#0046CC] transition-colors';
        buyButton.textContent = 'Comprar';

        priceContainer.appendChild(originalPrice);
        priceContainer.appendChild(discountBadge);

        info.appendChild(productTitle);
        info.appendChild(priceContainer);
        info.appendChild(price);
        info.appendChild(installments);
        info.appendChild(buyButton);

        productCard.appendChild(badge);
        productCard.appendChild(imageContainer);
        productCard.appendChild(info);

        productGrid.appendChild(productCard);

        // Criar indicador para cada par de produtos
        if (index % 2 === 0) {
            const indicator = document.createElement('button');
            indicator.className = `w-2 h-2 rounded-full transition-colors ${index === 0 ? 'bg-[#005CFF]' : 'bg-gray-300'}`;
            indicatorsContainer.appendChild(indicator);
        }
    });

    // Adicionar eventos de navegação
    let scrollAmount = 0;
    let currentIndex = 0;
    const pairWidth = window.innerWidth - 32; // Largura total menos padding

    prevButton.addEventListener('click', () => {
        scrollAmount = Math.max(scrollAmount - pairWidth, 0);
        productGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        scrollAmount = Math.min(scrollAmount + pairWidth, productGrid.scrollWidth - productGrid.clientWidth);
        productGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Atualizar indicadores baseado no scroll
    productGrid.addEventListener('scroll', () => {
        const newIndex = Math.floor(productGrid.scrollLeft / pairWidth);
        if (newIndex !== currentIndex) {
            const indicators = indicatorsContainer.children;
            indicators[currentIndex].classList.replace('bg-[#005CFF]', 'bg-gray-300');
            indicators[newIndex].classList.replace('bg-gray-300', 'bg-[#005CFF]');
            currentIndex = newIndex;
        }

        // Atualizar opacidade dos botões de navegação (apenas desktop)
        scrollAmount = productGrid.scrollLeft;
        prevButton.style.opacity = scrollAmount > 0 ? '1' : '0.5';
        nextButton.style.opacity = scrollAmount < (productGrid.scrollWidth - productGrid.clientWidth) ? '1' : '0.5';
    });

    // Inicializar estado dos botões
    prevButton.style.opacity = '0.5';
    nextButton.style.opacity = productGrid.scrollWidth > productGrid.clientWidth ? '1' : '0.5';

    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(productGrid);
    carouselContainer.appendChild(nextButton);
    carouselContainer.appendChild(indicatorsContainer);

    section.appendChild(header);
    section.appendChild(carouselContainer);

    return section;
}

// Função para criar a seção de conteúdo com imagem e texto
function createContentSection() {
    const section = document.createElement('section');
    section.className = 'w-full max-w-7xl mx-auto px-0 lg:px-4 py-8 lg:py-16 mt-8 lg:mt-16 mb-12';

    const container = document.createElement('div');
    container.className = 'flex flex-col lg:flex-row lg:items-center lg:gap-16';

    // Container da imagem
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full lg:w-1/2 bg-[#DEDEDE] mb-8 lg:mb-0';

    const image = document.createElement('img');
    image.src = '/img/caneca-1.png';
    image.alt = 'Caneca Avanti';
    image.className = 'w-full h-full object-contain';

    imageContainer.appendChild(image);

    // Container do texto
    const textContainer = document.createElement('div');
    textContainer.className = 'w-full lg:w-1/2 flex flex-col gap-6 px-4 lg:px-0';

    const title = document.createElement('h2');
    title.className = 'text-[24px] font-bold tracking-wide';
    title.textContent = 'LOREM IPSUM';

    const textContent = document.createElement('div');
    textContent.className = 'flex flex-col gap-6';

    const paragraph1 = document.createElement('p');
    paragraph1.className = 'text-[#333333] leading-relaxed text-base';
    paragraph1.textContent = 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.';

    const paragraph2 = document.createElement('p');
    paragraph2.className = 'text-[#333333] leading-relaxed text-base';
    paragraph2.textContent = 'Cras dignissim est et pellentesque tincidunt. Praesent bibendum quis velit a aliquam. Ut vestibulum turpis eget mi iaculis ullamcorper. Curabitur nec metus sed tortor sollicitudin porta nec eu enim. Ut fermentum scelerisque tortor mollis volutpat. Mauris iaculis magna nisl, vel porttitor augue placerat et.';

    textContent.appendChild(paragraph1);
    textContent.appendChild(paragraph2);

    textContainer.appendChild(title);
    textContainer.appendChild(textContent);

    container.appendChild(imageContainer);
    container.appendChild(textContainer);
    section.appendChild(container);

    return section;
}

// Função para criar a segunda seção de conteúdo
function createSecondContentSection() {
    const section = document.createElement('section');
    section.className = 'w-full bg-[#DEDEDE] py-8 lg:py-16 mb-12';

    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:gap-16';

    // Container do texto
    const textContainer = document.createElement('div');
    textContainer.className = 'w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1';

    const title = document.createElement('h2');
    title.className = 'text-[24px] font-bold tracking-wide';
    title.textContent = 'LOREM IPSUM';

    // Container para os itens com ícones
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'flex flex-col gap-6';

    // Função auxiliar para criar itens com ícone
    function createIconItem(text) {
        const item = document.createElement('div');
        item.className = 'flex gap-6';

        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-12 h-12 bg-[#005CFF] rounded-full flex items-center justify-center flex-shrink-0';

        const icon = document.createElement('span');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>`;

        const paragraph = document.createElement('p');
        paragraph.className = 'text-[#333333] leading-relaxed text-base';
        paragraph.textContent = text;

        iconContainer.appendChild(icon);
        item.appendChild(iconContainer);
        item.appendChild(paragraph);

        return item;
    }

    // Criar três itens com ícones
    const items = [
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
    ].map(text => createIconItem(text));

    items.forEach(item => itemsContainer.appendChild(item));

    textContainer.appendChild(title);
    textContainer.appendChild(itemsContainer);

    // Container da imagem
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full lg:w-1/2 mb-8 lg:mb-0 order-1 lg:order-2';

    const image = document.createElement('img');
    image.src = '/img/caneco dois.png';
    image.alt = 'Caneca Avanti';
    image.className = 'w-full h-full object-cover rounded-lg';

    imageContainer.appendChild(image);

    container.appendChild(textContainer);
    container.appendChild(imageContainer);
    section.appendChild(container);

    return section;
}

// Função para criar a terceira seção de conteúdo
function createThirdContentSection() {
    const section = document.createElement('section');
    section.className = 'w-full max-w-7xl mx-auto px-0 lg:px-4 py-8 lg:py-16 mb-12';

    const container = document.createElement('div');
    container.className = 'flex flex-col lg:flex-row lg:items-center lg:gap-16';

    // Container da imagem
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full lg:w-1/2 bg-[#DEDEDE] mb-8 lg:mb-0';

    const image = document.createElement('img');
    image.src = '/img/caneca-1.png';
    image.alt = 'Caneca Avanti';
    image.className = 'w-full h-full object-contain';

    imageContainer.appendChild(image);

    // Container do texto
    const textContainer = document.createElement('div');
    textContainer.className = 'w-full lg:w-1/2 flex flex-col gap-6 px-4 lg:px-0';

    const title = document.createElement('h2');
    title.className = 'text-[24px] font-bold tracking-wide';
    title.textContent = 'LOREM IPSUM';

    const textContent = document.createElement('div');
    textContent.className = 'flex flex-col gap-6';

    const paragraph1 = document.createElement('p');
    paragraph1.className = 'text-[#333333] leading-relaxed text-base';
    paragraph1.textContent = 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.';

    const paragraph2 = document.createElement('p');
    paragraph2.className = 'text-[#333333] leading-relaxed text-base';
    paragraph2.textContent = 'Cras dignissim est et pellentesque tincidunt. Praesent bibendum quis velit a aliquam. Ut vestibulum turpis eget mi iaculis ullamcorper. Curabitur nec metus sed tortor sollicitudin porta nec eu enim. Ut fermentum scelerisque tortor mollis volutpat. Mauris iaculis magna nisl, vel porttitor augue placerat et.';

    textContent.appendChild(paragraph1);
    textContent.appendChild(paragraph2);

    textContainer.appendChild(title);
    textContainer.appendChild(textContent);

    container.appendChild(imageContainer);
    container.appendChild(textContainer);
    section.appendChild(container);

    return section;
}

// Função para criar a seção de newsletter
function createNewsletterSection() {
    const section = document.createElement('section');
    section.className = 'w-full max-w-7xl mx-auto py-8 px-4';

    // Container do título
    const titleContainer = document.createElement('div');
    titleContainer.className = 'text-center mb-6';

    const title = document.createElement('h3');
    title.className = 'text-lg';
    
    const regularText = document.createElement('span');
    regularText.textContent = 'Cadastre-se na nossa ';
    regularText.className = 'text-base font-bold';
    
    const blueText = document.createElement('span');
    blueText.className = 'text-[#005CFF] font-bold text-base';
    blueText.textContent = 'newsletter';
    
    title.appendChild(regularText);
    title.appendChild(blueText);
    titleContainer.appendChild(title);

    // Container do formulário
    const formContainer = document.createElement('div');
    formContainer.className = 'bg-gray-200 p-4 lg:p-8 rounded-lg max-w-5xl mx-auto h-[284px] lg:h-auto flex items-center';

    const form = document.createElement('form');
    form.className = 'flex flex-col items-center justify-between w-full lg:flex-row gap-4 lg:gap-4';

    // Input de nome
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Digite seu nome';
    nameInput.className = 'px-4 py-2 rounded-lg w-full lg:w-64';

    // Input de email
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Digite seu e-mail';
    emailInput.className = 'px-4 py-2 rounded-lg w-full lg:w-64';

    // Checkbox de privacidade
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'flex items-center w-[279px] gap-1 whitespace-nowrap w-full lg:w-auto';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'h-[16px] w-[16px] appearance-none bg-white border rounded checked:bg-[#0066FF] checked:border-[#0066FF]';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'text-xs font-bold text-[#656565]';
    checkboxLabel.textContent = 'Estou de acordo com a ';

    const privacyLink = document.createElement('a');
    privacyLink.href = '#';
    privacyLink.className = 'text-xs font-bold text-[#656565] hover:underline';
    privacyLink.textContent = 'Política de Privacidade';

    // Montar o container do checkbox
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(privacyLink);

    // Botão de cadastro
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'bg-[#005CFF] h-[48px] text-white px-6 py-2 rounded-lg hover:bg-[#0046CC] whitespace-nowrap w-full lg:w-auto';
    submitButton.textContent = 'Cadastrar';

    // Adicionar elementos ao form
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(checkboxContainer);
    form.appendChild(submitButton);

    formContainer.appendChild(form);

    // Montar a seção
    section.appendChild(titleContainer);
    section.appendChild(formContainer);

    return section;
}

// Função para criar a seção de contato
function createContactSection() {
    const section = document.createElement('section');
    section.className = 'relative';

    // Criar o elemento picture para gerenciar as diferentes imagens
    const picture = document.createElement('picture');
    
    // Source para desktop
    const desktopSource = document.createElement('source');
    desktopSource.media = '(min-width: 1025px)';
    desktopSource.srcset = '/img/imagem do footer.png';
    
    // Source para mobile
    const mobileSource = document.createElement('source');
    mobileSource.media = '(max-width: 1024px)';
    mobileSource.srcset = '/img/cert/footer-mobile.png';
    
    // Imagem padrão (fallback)
    const img = document.createElement('img');
    img.src = '/img/imagem do footer.png';
    img.alt = 'Background';
    img.className = 'w-full h-[330px] object-cover';
    
    // Montar a estrutura do picture
    picture.appendChild(desktopSource);
    picture.appendChild(mobileSource);
    picture.appendChild(img);
    
    // Adicionar o picture à seção
    section.appendChild(picture);

    // Container do texto
    const textContainer = document.createElement('div');
    textContainer.className = 'absolute top-1/2 -translate-y-1/2 w-full h-[75px] flex items-center justify-center bg-[#0066FF]';

    const text = document.createElement('h2');
    text.className = 'text-white text-2xl font-normal max-w-2xl mx-auto px-4 text-center text-base font-semibold';
    text.textContent = 'Entre em contato conosco e verifique a disponibilidade para sua região!';

    textContainer.appendChild(text);
    section.appendChild(textContainer);

    return section;
}

// Função para criar o footer
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-[#F5F5F5] pt-8 lg:pt-16 pb-8';

    const mainContainer = document.createElement('div');
    mainContainer.className = 'max-w-7xl mx-auto px-4';

    // Container superior com logo, redes sociais e links
    const topContainer = document.createElement('div');
    topContainer.className = 'flex flex-col lg:flex-row lg:justify-between mb-8 lg:mb-12';

    // Seção do logo e redes sociais
    const logoSection = document.createElement('div');
    logoSection.className = 'mb-8 lg:mb-0 flex flex-col items-center lg:items-start';

    const logo = document.createElement('img');
    logo.src = '/img/cert/avanti.png';
    logo.alt = 'Avanti';
    logo.className = 'h-8 mb-6';

    const socialLinks = document.createElement('div');
    socialLinks.className = 'flex gap-8 items-center';
    
    const socialIcons = ['insta', 'facebook', 'youtube', 'tiktok'];
    socialIcons.forEach(platform => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'text-[#005CFF] flex items-center';
        const icon = document.createElement('img');
        icon.src = `/img/cert/${platform}.png`;
        icon.alt = platform;
        icon.className = 'h-[19.01px] w-[19.01px]';
        link.appendChild(icon);
        socialLinks.appendChild(link);
    });

    logoSection.appendChild(logo);
    logoSection.appendChild(socialLinks);

    // Função auxiliar para criar seções de links
    function createLinkSection(title, links) {
        const section = document.createElement('div');
        section.className = 'mb-8 lg:mb-0 w-full lg:w-auto';

        const dropdownButton = document.createElement('button');
        dropdownButton.className = 'w-full flex items-center justify-between h-[50px] py-0 border-t border-gray-200 lg:border-0';
        
        const heading = document.createElement('h4');
        heading.className = 'text-base font-bold';
        heading.textContent = title;

        const arrow = document.createElement('span');
        arrow.className = 'lg:hidden transform transition-transform text-[#0066FF] text-lg';
        arrow.innerHTML = '⌵';

        dropdownButton.appendChild(heading);
        dropdownButton.appendChild(arrow);

        const linkList = document.createElement('ul');
        linkList.className = 'hidden lg:block space-y-2 mt-4 lg:mt-4';

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'text-sm text-gray-600 hover:text-[#005CFF]';
            a.textContent = link;
            li.appendChild(a);
            linkList.appendChild(li);
        });

        // Adicionar evento de clique para mobile
        dropdownButton.addEventListener('click', () => {
            const isExpanded = !linkList.classList.contains('hidden');
            if (window.innerWidth < 1024) { // Apenas para mobile
                linkList.classList.toggle('hidden');
                arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });

        section.appendChild(dropdownButton);
        section.appendChild(linkList);
        return section;
    }

    // Criar seções de links com os títulos em h5
    const institucionalSection = createLinkSection('Institucional', [
        'Sobre Nós',
        'Nossas Lojas',
        'Privacidade e Segurança',
        'Termos e Condições'
    ]);

    const ajudaSection = createLinkSection('Central de ajuda', [
        'Fale Conosco',
        'Frete e Entrega',
        'Trocas e Devoluções',
        'Formas de Pagamento',
        'FAQ'
    ]);

    // Seção de Atendimento com dropdown
    const atendimentoSection = document.createElement('div');
    atendimentoSection.className = 'mb-8 lg:mb-0 w-full lg:w-auto';

    const atendimentoButton = document.createElement('button');
    atendimentoButton.className = 'w-full flex items-center justify-between h-[50px] py-0 border-t border-gray-200 lg:border-0';

    const atendimentoTitle = document.createElement('h4');
    atendimentoTitle.className = 'text-base font-bold';
    atendimentoTitle.textContent = 'Atendimento';

    const atendimentoArrow = document.createElement('span');
    atendimentoArrow.className = 'lg:hidden transform transition-transform text-[#0066FF] text-lg';
    atendimentoArrow.innerHTML = '⌵';

    atendimentoButton.appendChild(atendimentoTitle);
    atendimentoButton.appendChild(atendimentoArrow);

    const atendimentoInfo = document.createElement('div');
    atendimentoInfo.className = 'hidden lg:block space-y-2 mt-4 text-sm text-gray-600';

    const telefone = document.createElement('p');
    telefone.innerHTML = '<span class="font-semibold">Telefone:</span> (00) 1234-5678';

    const email = document.createElement('p');
    email.innerHTML = '<span class="font-semibold">E-mail:</span> exemplo@exemplo.com.br';

    const horario = document.createElement('div');
    horario.className = 'mt-4';
    horario.innerHTML = `
        <p class="font-semibold">Horário de atendimento:</p>
        <p>Segunda a Sábado: 07h00 às 23h00</p>
        <p>Domingos e Feriados: 07h00 às 21h00</p>
    `;

    atendimentoInfo.appendChild(telefone);
    atendimentoInfo.appendChild(email);
    atendimentoInfo.appendChild(horario);

    // Adicionar evento de clique para mobile no Atendimento
    atendimentoButton.addEventListener('click', () => {
        const isExpanded = !atendimentoInfo.classList.contains('hidden');
        if (window.innerWidth < 1024) {
            atendimentoInfo.classList.toggle('hidden');
            atendimentoArrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });

    atendimentoSection.appendChild(atendimentoButton);
    atendimentoSection.appendChild(atendimentoInfo);

    // Adicionar todas as seções ao container superior
    topContainer.appendChild(logoSection);
    topContainer.appendChild(institucionalSection);
    topContainer.appendChild(ajudaSection);
    topContainer.appendChild(atendimentoSection);

    // Container de métodos de pagamento
    const paymentContainer = document.createElement('div');
    paymentContainer.className = 'flex flex-wrap justify-center items-center gap-8 lg:gap-8 py-8 border-t border-b border-gray-200 bg-[#F5F5F5]';
    
    const paymentMethods = ['amex', 'mastercard', 'visa', 'hipercard', 'elo', 'diners', 'paypal', 'pix', 'boleto'];
    paymentMethods.forEach(method => {
        const img = document.createElement('img');
        img.src = `/img/payment/${method}.png`;
        img.alt = method;
        img.className = 'h-[18px] w-auto';
        paymentContainer.appendChild(img);
    });

    // Container de texto legal
    const legalText = document.createElement('p');
    legalText.className = 'text-center text-sm text-gray-600 bg- max-w-4xl mx-auto py-8';
    legalText.textContent = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.';

    // Container de certificações
    const certContainer = document.createElement('div');
    certContainer.className = 'flex flex-wrap justify-center items-center gap-8 lg:gap-8 py-8';
    
    const certifications = ['lets-encrypt', 'pci', 'avanti', 'vtex'];
    certifications.forEach(cert => {
        const img = document.createElement('img');
        img.src = `/img/cert/${cert}.png`;
        img.alt = cert;
        img.className = 'h-[15px] w-auto';
        certContainer.appendChild(img);
    });

    // Montar o footer
    mainContainer.appendChild(topContainer);
    mainContainer.appendChild(paymentContainer);
    mainContainer.appendChild(legalText);
    mainContainer.appendChild(certContainer);
    footer.appendChild(mainContainer);

    return footer;
}

// Inicializar os dropdowns e o banner
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o dropdown "Todas as Categorias"
    const menuButton = document.querySelector('button.flex.items-center.gap-2');
    if (menuButton) {
        const dropdown = createDropdown();
        menuButton.parentElement.appendChild(dropdown);
    }

    // Inicializar o dropdown "Departamento"
    const departmentButtons = document.querySelectorAll('a');
    departmentButtons.forEach(button => {
        if (button.textContent === 'Departamento') {
            const departmentDropdown = createTopDepartmentDropdown();
            button.parentElement.classList.add('group', 'relative');
            button.parentElement.appendChild(departmentDropdown);
        }
    });

    // Criar ou encontrar o elemento main
    let mainContent = document.querySelector('main');
    if (!mainContent) {
        mainContent = document.createElement('main');
        document.body.appendChild(mainContent);
    }

    // Adicionar o banner promocional
    const banner = createSuperSaleBanner();
    mainContent.appendChild(banner);

    // Adicionar o carrossel após o banner
    const carousel = createProductCarousel();
    mainContent.appendChild(carousel);

    // Adicionar a seção de conteúdo após o carrossel
    if (mainContent) {
        const contentSection = createContentSection();
        mainContent.appendChild(contentSection);
    }

    // Adicionar a segunda seção de conteúdo
    const secondContentSection = createSecondContentSection();
    mainContent.appendChild(secondContentSection);

    // Adicionar a terceira seção de conteúdo
    const thirdContentSection = createThirdContentSection();
    mainContent.appendChild(thirdContentSection);

    // Adicionar o segundo carrossel
    const secondCarousel = createProductCarousel();
    // Modificar o título do segundo carrossel
    const secondCarouselTitle = secondCarousel.querySelector('h2');
    secondCarouselTitle.textContent = 'Mais Vendidos';
    mainContent.appendChild(secondCarousel);

    // Adicionar a seção de contato primeiro
    const contactSection = createContactSection();
    mainContent.appendChild(contactSection);

    // Adicionar a seção de newsletter depois da seção de contato
    const newsletterSection = createNewsletterSection();
    mainContent.appendChild(newsletterSection);

    // Adicionar o footer após todas as outras seções
    const footer = createFooter();
    document.body.appendChild(footer);
}); 