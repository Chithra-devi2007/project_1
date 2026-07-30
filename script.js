// ---------- AUTH GUARD ----------
// Simple client-side demo check. Not real security — see login.html note.
if (sessionStorage.getItem("tg_logged_in") !== "true") {
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("tg_logged_in");
  window.location.href = "login.html";
});

// ---------- 3D TILT EFFECT ----------
function apply3DTilt(el, strength = 14) {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -strength;
    const rotateY = ((x - cx) / cx) * strength;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  });
}

apply3DTilt(document.getElementById("featuredTilt"), 10);

// ---------- AVATAR SVG GENERATOR ----------
// Custom original masked-gamer icon (not tied to any copyrighted game art),
// recolored per listing for variety.
function avatarSVG(c1, c2, id) {
  return `
  <svg width="88" height="88" viewBox="0 0 120 120">
    <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <circle cx="60" cy="60" r="56" fill="url(#g${id})" opacity="0.16"/>
    <path d="M60 20c-16 0-28 12-28 27 0 10 5 17 10 22l-4 14c-1 3 1 6 4 6h36c3 0 5-3 4-6l-4-14c5-5 10-12 10-22 0-15-12-27-28-27z" fill="url(#g${id})"/>
    <rect x="38" y="52" width="44" height="16" rx="8" fill="#0A0812"/>
    <circle cx="50" cy="60" r="5" fill="${c2}"/>
    <circle cx="70" cy="60" r="5" fill="${c2}"/>
    <path d="M46 30l6 10M74 30l-6 10" stroke="#0A0812" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

// ---------- LISTINGS DATA ----------
const listings = [
  { name: "Conqueror Elite ID", level: 65, price: 3299, badge: "Hot",  tags: ["All Skins","Rare Emote","OTP Ready"], c1:"#FF3D6E", c2:"#FFC94A" },
  { name: "Ace Dominator ID",   level: 58, price: 2199, badge: "New",  tags: ["Legendary Outfit","Mythic Gun Skin"], c1:"#00E5FF", c2:"#7B2FFF" },
  { name: "Diamond Rush ID",    level: 42, price: 1499, badge: "Deal", tags: ["Bundle Set","Free Emote"], c1:"#7B2FFF", c2:"#FF3D6E" },
  { name: "Platinum Storm ID",  level: 36, price: 999,  badge: "Best Value", tags: ["Starter Pack","Fast Handover"], c1:"#FFC94A", c2:"#FF8A3D" },
  { name: "Heroic Legend ID",   level: 71, price: 3899, badge: "Premium", tags: ["Full Wardrobe","Pet Collection"], c1:"#00E5FF", c2:"#FFC94A" },
  { name: "Gold Tier ID",       level: 29, price: 699,  badge: "Budget", tags: ["Beginner Friendly"], c1:"#7B2FFF", c2:"#00E5FF" },
  { name: "Master Class ID",    level: 54, price: 1899, badge: "Trending", tags: ["Rare Bundle","Verified"], c1:"#FF3D6E", c2:"#7B2FFF" },
  { name: "Immortal Squad ID",  level: 80, price: 5499, badge: "VIP", tags: ["Top 100 Rank","All Characters"], c1:"#FFC94A", c2:"#00E5FF" },
  { name: "Shadow Reaper ID",   level: 49, price: 1799, badge: "Rare", tags: ["Dark Bundle","Exclusive Skin"], c1:"#7B2FFF", c2:"#FF8A3D" },
  { name: "Phoenix Blaze ID",   level: 62, price: 2799, badge: "Popular", tags: ["Fire Skin Set","Custom Room Card"], c1:"#FF3D6E", c2:"#00E5FF" },
  { name: "Cyber Ninja ID",     level: 55, price: 2299, badge: "New", tags: ["Neon Outfit","Emote Pack"], c1:"#00E5FF", c2:"#7B2FFF" },
  { name: "Titan Warlord ID",   level: 73, price: 3599, badge: "Hot", tags: ["Legendary Backpack","Pet Bundle"], c1:"#FFC94A", c2:"#FF3D6E" },
  { name: "Frost Empress ID",   level: 47, price: 1599, badge: "Deal", tags: ["Winter Skin","Free Emote"], c1:"#00E5FF", c2:"#FFC94A" },
  { name: "Royal Samurai ID",   level: 68, price: 3199, badge: "Premium", tags: ["Katana Skin","Rare Bundle"], c1:"#7B2FFF", c2:"#00E5FF" },
  { name: "Venom Striker ID",   level: 39, price: 1299, badge: "Best Value", tags: ["Starter Bundle","Fast Handover"], c1:"#FF3D6E", c2:"#7B2FFF" },
];

const grid = document.getElementById("grid");

listings.forEach((item, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-inner" id="card-${i}">
      <span class="badge">${item.badge}</span>
      <div class="avatar-wrap">${avatarSVG(item.c1, item.c2, i)}</div>
      <h3>${item.name}</h3>
      <div class="lvl">Level ${item.level}</div>
      <div class="tags">
        ${item.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="price-row">
        <div class="price">₹${item.price.toLocaleString("en-IN")}</div>
        <button class="buy-btn">Buy Now</button>
      </div>
    </div>
  `;
  grid.appendChild(card);
  apply3DTilt(card.querySelector(".card-inner"), 8);
});

// ---------- BUY BUTTON DEMO ACTION ----------
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-btn")) {
    const name = e.target.closest(".card-inner").querySelector("h3").textContent;
    alert(`"${name}" ku interest kaatiyathukku thanks! Seller ungala WhatsApp la contact pannuvanga.`);
  }
});
