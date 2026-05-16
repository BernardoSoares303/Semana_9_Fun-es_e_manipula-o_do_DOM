const data = {
  produtos: [
    { id: 1, nome: "iPhone 14", preco: 6000, categoria: "Celulares", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSoKtFZMz9ecfWPCMtqmq8dIpM2olviEBokA&s", descricao: "Apple top", emEstoque: true },
    { id: 2, nome: "Samsung S23", preco: 4500, categoria: "Celulares", imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/2302/gallery/br-galaxy-s23-s911-sm-s911bzekzto-534840703?$720_576_JPG$", descricao: "Samsung top", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Yr2lwx7cRN8_Hffyyn9g15qcqR8vVaCalA&s", descricao: "Dell potente", emEstoque: false },
    { id: 4, nome: "Notebook Acer", preco: 2800, categoria: "Notebooks", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJpTqVBFq9mzEwdYsbrugQE-od-ZAt8bB6Q&s", descricao: "Bom custo", emEstoque: true },
    { id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd0fWykmliNhF_54zLyA43yAIZRHsCeIcMEQ&s", descricao: "RGB", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7rMEYst2HnlOMIOSCwEqqIQx-mCPZuX-tw&s", descricao: "Switch azul", emEstoque: true },
    { id: 7, nome: "PS5", preco: 4200, categoria: "Games", imagem: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21", descricao: "Console Sony", emEstoque: false },
    { id: 8, nome: "Xbox Series S", preco: 2500, categoria: "Games", imagem: "https://www.gigantec.com.br/media/catalog/product/cache/66c3fa0fb26d248d0ca40a64a387c3da/b/f/bfb06f23-4c87-4c58-b4d9-ed25d3a739b9.jpg", descricao: "Console Microsoft", emEstoque: true }
  ]
};

// ==========================
// Seletores
// ==========================
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// ==========================
// Funções
// ==========================
function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.backgroundColor = "#f9f9f9";
  card.style.padding = "10px";

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}" style="cursor:pointer">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="btn-details">Ver detalhes</button>
    <button class="btn-highlight">Destacar</button>
  `;

  const btnDetails = card.querySelector(".btn-details");
  const btnHighlight = card.querySelector(".btn-highlight");

  btnDetails.addEventListener("click", () => {
    window.location.href = `detalhes.html?id=${produto.id}`;
  });

  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  if (!productList) return;

  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  if (!categorySelect) return;

  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorySelect.innerHTML = '<option value="Todas">Todas</option>';

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function filterProducts() {
  if (!searchInput || !categorySelect) return data.produtos;

  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "Todas" || p.categoria === categoria;

    return matchNome && matchCategoria;
  });
}

// ==========================
// DETALHES
// ==========================
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function renderDetailsPage() {
  if (!productDetails) return;

  const id = getProductIdFromURL();
  const produto = data.produtos.find(p => p.id === id);

  if (!produto) return;

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <img src="${produto.imagem}" style="max-width:300px">
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

// ==========================
// Eventos (somente index)
// ==========================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
  });
}

if (categorySelect) {
  categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
  });
}

if (btnRender) {
  btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
  });
}

// ==========================
// Inicialização
// ==========================
if (productList) {
  renderCategories();
  renderProducts(data.produtos);
}

if (productDetails) {
  renderDetailsPage();
}