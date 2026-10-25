// ankit.js (basic interactivity for your Amazon clone)

document.addEventListener("DOMContentLoaded", () => {
  // ===== Helpers =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ===== SEARCH (click icon or press Enter) =====
  const searchInput = $(".search-input");
  const searchIcon = $(".search-icon");

  function doSearch() {
    if (!searchInput) return;
    const q = searchInput.value.trim();
    if (!q) {
      alert("Type something to search.");
      return;
    }
    // Open Amazon search (you can change amazon.in to your own page later)
    window.open(`https://www.amazon.in/s?k=${encodeURIComponent(q)}`, "_blank");
  }

  if (searchIcon) searchIcon.addEventListener("click", doSearch);

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = $(".foot-panel1");
  if (backToTop) {
    backToTop.style.cursor = "pointer";
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== SIMPLE "SIGN IN" (save name in localStorage) =====
  // Your HTML has: <div class="nav-singin border"> ... <span>Hello , sing in</span>
  const signInBox = $(".nav-singin");
  const helloSpan = $(".nav-singin span");

  function updateHelloName() {
    const name = localStorage.getItem("amazonCloneName");
    if (helloSpan) {
      helloSpan.textContent = name ? `Hello, ${name}` : "Hello, sign in";
    }
  }

  updateHelloName();

  if (signInBox) {
    signInBox.style.cursor = "pointer";
    signInBox.addEventListener("click", () => {
      const current = localStorage.getItem("amazonCloneName") || "";
      const name = prompt("Enter your name (demo sign-in):", current);
      if (name === null) return; // cancelled
      const clean = name.trim();
      if (!clean) {
        localStorage.removeItem("amazonCloneName");
      } else {
        localStorage.setItem("amazonCloneName", clean);
      }
      updateHelloName();
    });
  }

  // ===== CART COUNT (stored in localStorage) =====
  // Your HTML uses class "nav-car" (not nav-cart), so we target ".nav-car"
  const cartBox = $(".nav-car");
  let cartCount = Number(localStorage.getItem("amazonCloneCartCount") || 0);

  // Create a small badge in the cart
  let cartBadge = null;
  if (cartBox) {
    cartBox.style.cursor = "pointer";
    cartBox.style.position = "relative";

    cartBadge = document.createElement("span");
    cartBadge.style.position = "absolute";
    cartBadge.style.top = "2px";
    cartBadge.style.right = "2px";
    cartBadge.style.background = "#f08804";
    cartBadge.style.color = "black";
    cartBadge.style.borderRadius = "999px";
    cartBadge.style.padding = "2px 6px";
    cartBadge.style.fontSize = "12px";
    cartBadge.style.fontWeight = "700";
    cartBox.appendChild(cartBadge);

    const renderCart = () => {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? "inline-block" : "none";
      localStorage.setItem("amazonCloneCartCount", String(cartCount));
    };

    renderCart();

    // Click cart to clear (demo behavior)
    cartBox.addEventListener("click", () => {
      const ok = confirm("Demo: Clear cart?");
      if (ok) {
        cartCount = 0;
        renderCart();
      }
    });

    // Add to cart when user clicks any product box (demo)
    const boxes = $$(".box");
    boxes.forEach((box) => {
      box.style.cursor = "pointer";
      box.addEventListener("click", () => {
        cartCount += 1;
        renderCart();
      });
    });
  }

  // ===== PANEL "ALL" TOGGLE (useful for mobile) =====
  const panelAll = $(".panel-all");
  const panelOps = $(".panel-ops");

  if (panelAll && panelOps) {
    panelAll.style.cursor = "pointer";
    let open = true;

    panelAll.addEventListener("click", () => {
      open = !open;
      panelOps.style.display = open ? "block" : "none";
    });
  }

  // ===== HERO MESSAGE CLOSE BUTTON =====
  const heroMsg = $(".hero-message");
  if (heroMsg) {
    heroMsg.style.position = "relative";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "X";
    closeBtn.title = "Close";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "10px";
    closeBtn.style.top = "6px";
    closeBtn.style.border = "none";
    closeBtn.style.background = "transparent";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontWeight = "700";

    heroMsg.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      heroMsg.style.display = "none";
    });
  }

  // ===== Footer copyright: set current year (optional) =====
  const copy = $(".copy-right");
  if (copy) {
    const year = new Date().getFullYear();
    // Keep your text style, just make it look current
    copy.textContent = `© 1993-${year}, amazon.com, inc. or its affiliates (clone demo)`;
  }
});