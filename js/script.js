document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#catalog-grid");
  const modal = document.querySelector("#product-modal");
  if (!grid) return;
  const category = grid.dataset.category;
  const items = CATALOGO[category] || [];

  grid.innerHTML = items.map((p,i) => {
    const [name, price, old, desc, image] = p;
    const priceHTML = old ? `<div class="price"><s>${old}</s> <strong>${price}</strong></div>` : `<div class="price"><strong>${price}</strong></div>`;
    return `<article class="product-card" data-index="${i}">
      <div class="product-image"><img src="${image}" alt="${name}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none';"><span>GUAYAQUIL V3</span></div>
      <div class="product-body"><p class="product-cat">${category.toUpperCase()}</p><h3>${name}</h3>${priceHTML}<p>${desc}</p><button class="details">VER FICHA →</button></div>
    </article>`;
  }).join("");

  const open = (i) => {
    const [name, price, old, desc, image] = items[i];
    modal.classList.remove("hidden");
    document.querySelector("#modal-image").src = image;
    document.querySelector("#modal-title").textContent = name;
    document.querySelector("#modal-category").textContent = category.toUpperCase() + " · GUAYAQUIL V3";
    document.querySelector("#modal-description").textContent = desc;
    document.querySelector("#modal-price").innerHTML = old ? `<s>${old}</s> <strong>${price}</strong>` : `<strong>${price}</strong>`;
  };
  grid.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (card) open(Number(card.dataset.index));
  });
  document.querySelector(".modal-close")?.addEventListener("click", () => modal.classList.add("hidden"));
  document.querySelector(".modal-backdrop")?.addEventListener("click", () => modal.classList.add("hidden"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.add("hidden"); });
});