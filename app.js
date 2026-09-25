/* ==========================================================================
   Grocery Price Comparison — app logic
   Everything here reads from STORES / CATEGORIES / ITEMS / LAST_SYNCED,
   defined in data.js. No build step, no framework.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "grocery-compare-basket-v1";
  const RM = (n) => "RM " + n.toFixed(2);

  const itemById = Object.fromEntries(ITEMS.map((it) => [it.id, it]));
  const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  // ---------------------------------------------------------------- state
  let basket = loadBasket(); // { itemId: qty }

  function loadBasket() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      // drop anything referencing an item that no longer exists
      const clean = {};
      Object.keys(parsed).forEach((id) => {
        if (itemById[id] && parsed[id] > 0) clean[id] = parsed[id];
      });
      return clean;
    } catch (e) {
      return {};
    }
  }

  function saveBasket() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
    } catch (e) {
      /* localStorage unavailable — basket just won't persist this session */
    }
  }

  function setQty(itemId, qty) {
    if (qty <= 0) delete basket[itemId];
    else basket[itemId] = qty;
    saveBasket();
    renderAll();
  }

  function basketItemIds() {
    return Object.keys(basket).filter((id) => basket[id] > 0);
  }

  function basketCount() {
    return basketItemIds().reduce((sum, id) => sum + basket[id], 0);
  }

  // ------------------------------------------------------------- tab nav
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));

  function showTab(name) {
    tabButtons.forEach((btn) => {
      const active = btn.dataset.tab === name;
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
    if (name === "compare") renderCompare();
    if (name === "list") renderShoppingList();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  tabButtons.forEach((btn) => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.goto));
  });

  // ------------------------------------------------------------- basket drawer
  const basketDrawer = document.getElementById("basketDrawer");
  const basketBackdrop = document.getElementById("basketBackdrop");

  function openBasket() {
    basketDrawer.classList.add("open");
    basketDrawer.setAttribute("aria-hidden", "false");
    basketBackdrop.hidden = false;
  }
  function closeBasketDrawer() {
    basketDrawer.classList.remove("open");
    basketDrawer.setAttribute("aria-hidden", "true");
    basketBackdrop.hidden = true;
  }

  document.getElementById("basketPill").addEventListener("click", openBasket);
  document.getElementById("closeBasket").addEventListener("click", closeBasketDrawer);
  basketBackdrop.addEventListener("click", closeBasketDrawer);
  document.getElementById("clearBasket").addEventListener("click", () => {
    basket = {};
    saveBasket();
    renderAll();
  });
  document.getElementById("viewCompareBtn").addEventListener("click", () => {
    closeBasketDrawer();
    showTab("compare");
  });

  // ------------------------------------------------------------- HOME
  function renderHome() {
    const statRow = document.getElementById("statRow");
    statRow.innerHTML = [
      stat(ITEMS.length, "items tracked"),
      stat(CATEGORIES.length, "categories"),
      stat(STORES.length, "stores compared"),
    ].join("");

    document.getElementById("storeChipRow").innerHTML = STORES.map(
      (s) => `<span class="store-chip">${escapeHtml(s.name)}</span>`
    ).join("");

    document.getElementById("categoryGrid").innerHTML = CATEGORIES.map((c) => {
      const count = ITEMS.filter((it) => it.category === c.id).length;
      return `<div class="category-card">
        <div class="cat-icon">${c.icon}</div>
        <div class="cat-title">${escapeHtml(c.title)}</div>
        <div class="cat-count">${count} item${count === 1 ? "" : "s"}</div>
      </div>`;
    }).join("");

    document.getElementById("lastSyncedLine").textContent =
      "Prices last synced: " + LAST_SYNCED + " — see README.md for how to refresh them.";
  }

  function stat(value, label) {
    return `<div class="stat-tile"><div class="stat-value">${value}</div><div class="stat-label">${escapeHtml(label)}</div></div>`;
  }

  // ------------------------------------------------------------- SHOP
  const shopCategoriesEl = document.getElementById("shopCategories");
  const itemSearchEl = document.getElementById("itemSearch");

  function renderShop(filterText) {
    const filter = (filterText || "").trim().toLowerCase();
    shopCategoriesEl.innerHTML = CATEGORIES.map((cat) => {
      const items = ITEMS.filter(
        (it) => it.category === cat.id && (!filter || it.name.toLowerCase().includes(filter))
      );
      if (!items.length) return "";
      return `<div class="shop-category-block">
        <div class="shop-category-title">${cat.icon} ${escapeHtml(cat.title)}</div>
        <div class="item-grid">${items.map(itemCardHtml).join("")}</div>
      </div>`;
    }).join("");

    // wire up buttons for the items just rendered
    shopCategoriesEl.querySelectorAll("[data-inc]").forEach((btn) =>
      btn.addEventListener("click", () => setQty(btn.dataset.inc, (basket[btn.dataset.inc] || 0) + 1))
    );
    shopCategoriesEl.querySelectorAll("[data-dec]").forEach((btn) =>
      btn.addEventListener("click", () => setQty(btn.dataset.dec, (basket[btn.dataset.dec] || 0) - 1))
    );
  }

  function itemCardHtml(it) {
    const prices = STORES.map((s) => it.prices[s.id]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const qty = basket[it.id] || 0;
    return `<div class="item-card">
      <div class="item-name">${escapeHtml(it.name)}</div>
      <div class="item-unit">${escapeHtml(it.unit)}</div>
      <div class="item-range">${RM(min)}<span> – ${RM(max)}</span></div>
      <div class="qty-row">
        <div class="qty-stepper">
          <button type="button" data-dec="${it.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${qty}</span>
          <button type="button" data-inc="${it.id}" aria-label="Increase quantity">+</button>
        </div>
        ${qty === 0 ? `<button type="button" class="add-btn" data-inc="${it.id}">Add</button>` : ""}
      </div>
    </div>`;
  }

  itemSearchEl.addEventListener("input", () => renderShop(itemSearchEl.value));

  // ------------------------------------------------------------- BASKET DRAWER content
  function renderBasketDrawer() {
    const ids = basketItemIds();
    document.getElementById("basketCount").textContent = basketCount();

    const container = document.getElementById("basketItems");
    if (!ids.length) {
      container.innerHTML = `<p class="basket-empty-msg">Your basket is empty.</p>`;
      return;
    }
    container.innerHTML = ids
      .map((id) => {
        const it = itemById[id];
        const qty = basket[id];
        return `<div class="basket-line">
          <div>
            <div class="bl-name">${escapeHtml(it.name)}</div>
            <div class="bl-unit">${escapeHtml(it.unit)} × ${qty}</div>
          </div>
          <button type="button" class="remove-btn" data-remove="${id}">Remove</button>
        </div>`;
      })
      .join("");
    container.querySelectorAll("[data-remove]").forEach((btn) =>
      btn.addEventListener("click", () => setQty(btn.dataset.remove, 0))
    );
  }

  // ------------------------------------------------------------- COMPARE
  function storeTotal(storeId) {
    return basketItemIds().reduce((sum, id) => sum + itemById[id].prices[storeId] * basket[id], 0);
  }

  function renderCompare() {
    const ids = basketItemIds();
    document.getElementById("compareEmpty").hidden = ids.length > 0;
    document.getElementById("compareContent").style.display = ids.length ? "" : "none";
    if (!ids.length) return;

    const totals = STORES.map((s) => ({ store: s, total: storeTotal(s.id) }));
    const min = Math.min(...totals.map((t) => t.total));

    document.getElementById("storeTotalGrid").innerHTML = totals
      .sort((a, b) => a.total - b.total)
      .map(
        (t) => `<div class="store-total-card ${t.total === min ? "is-cheapest" : ""}">
          ${t.total === min ? '<span class="cheapest-badge">Cheapest</span>' : ""}
          <div class="store-total-name">${escapeHtml(t.store.name)}</div>
          <div class="store-total-amount">${RM(t.total)}</div>
        </div>`
      )
      .join("");

    // item-by-item table
    const head = document.getElementById("itemPriceTableHead");
    head.innerHTML =
      `<th>Item</th>` + STORES.map((s) => `<th>${escapeHtml(s.shortName)}</th>`).join("");

    const body = document.getElementById("itemPriceTableBody");
    body.innerHTML = ids
      .map((id) => {
        const it = itemById[id];
        const qty = basket[id];
        const linePrices = STORES.map((s) => it.prices[s.id] * qty);
        const min = Math.min(...linePrices);
        return `<tr>
          <td>${escapeHtml(it.name)} <span class="bl-unit">×${qty}</span></td>
          ${STORES.map((s, i) => {
            const cellVal = linePrices[i];
            const isBest = cellVal === min;
            return `<td class="${isBest ? "best-price" : ""}">${RM(cellVal)}</td>`;
          }).join("")}
        </tr>`;
      })
      .join("");
  }

  // ------------------------------------------------------------- SHOPPING LIST
  function renderShoppingList() {
    const ids = basketItemIds();
    document.getElementById("listEmpty").hidden = ids.length > 0;
    const listContent = document.getElementById("listContent");
    listContent.innerHTML = "";
    if (!ids.length) return;

    // for each item, find the store(s) with the minimum price
    const byStore = Object.fromEntries(STORES.map((s) => [s.id, []]));
    const tied = [];

    ids.forEach((id) => {
      const it = itemById[id];
      const qty = basket[id];
      const min = Math.min(...STORES.map((s) => it.prices[s.id]));
      const cheapestStores = STORES.filter((s) => it.prices[s.id] === min);
      if (cheapestStores.length === 1) {
        byStore[cheapestStores[0].id].push({ item: it, qty, unitPrice: min });
      } else {
        tied.push({ item: it, qty, unitPrice: min, stores: cheapestStores });
      }
    });

    const blocks = [];

    STORES.forEach((s) => {
      const lines = byStore[s.id];
      if (!lines.length) return;
      const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
      blocks.push(`<div class="store-list-block">
        <h3><span>${escapeHtml(s.name)}</span><span class="store-list-total">${RM(subtotal)}</span></h3>
        <ul>${lines
          .map(
            (l) =>
              `<li>${escapeHtml(l.item.name)} × ${l.qty} <span class="li-price">(${RM(l.unitPrice)} / ${escapeHtml(l.item.unit)})</span></li>`
          )
          .join("")}</ul>
      </div>`);
    });

    if (tied.length) {
      const subtotal = tied.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
      blocks.push(`<div class="store-list-block tie-block">
        <h3><span>Tied — pick any of the listed stores</span><span class="store-list-total">${RM(subtotal)}</span></h3>
        <ul>${tied
          .map(
            (l) =>
              `<li>${escapeHtml(l.item.name)} × ${l.qty} <span class="li-price">(${RM(l.unitPrice)} / ${escapeHtml(
                l.item.unit
              )} — tied at ${l.stores.map((s) => escapeHtml(s.name)).join(", ")})</span></li>`
          )
          .join("")}</ul>
      </div>`);
    }

    listContent.innerHTML = blocks.join("");
  }

  // ------------------------------------------------------------- utils
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  // ------------------------------------------------------------- render all
  function renderAll() {
    renderHome();
    renderShop(itemSearchEl.value);
    renderBasketDrawer();
    // compare / list panels re-render on tab switch, but keep them fresh
    // if currently visible (e.g. basket changed via drawer while on that tab)
    const activePanel = panels.find((p) => !p.hidden);
    if (activePanel && activePanel.dataset.panel === "compare") renderCompare();
    if (activePanel && activePanel.dataset.panel === "list") renderShoppingList();
  }

  renderAll();
})();
