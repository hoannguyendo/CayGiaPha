function createTree(node) {
  const li = document.createElement("li");

  const card = document.createElement("div");
  card.classList.add("member-card");

  const avatar = document.createElement("img");
  avatar.src = node.avatar || "https://via.placeholder.com/60";  // Nếu không có ảnh thì dùng placeholder
  avatar.alt = node.name;

  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("h3");
  name.textContent = node.name;

  const details = document.createElement("p");
  details.innerHTML = 
    (node.yearOfBirth ? `🎂 ${node.yearOfBirth}<br>` : '') +
    (node.hometown ? `📍 ${node.hometown}` : '');

  info.appendChild(name);
  info.appendChild(details);
  card.appendChild(avatar);
  card.appendChild(info);

  if (node.children && node.children.length > 0) {
    const toggle = document.createElement("div");
    toggle.classList.add("toggle-btn");
    toggle.textContent = "+";
    toggle.addEventListener("click", () => {
      const isHidden = ul.classList.contains("hidden");
      ul.classList.toggle("hidden");
      toggle.textContent = isHidden ? "−" : "+";
    });

    card.insertBefore(toggle, avatar);

    const ul = document.createElement("ul");
    ul.classList.add("hidden");
    node.children.forEach(child => {
      ul.appendChild(createTree(child));
    });

    li.appendChild(card);
    li.appendChild(ul);
  } else {
    li.appendChild(card);
  }

  return li;
}

// 🛑 Dùng fetch để lấy data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const root = document.createElement("ul");
    root.appendChild(createTree(data));
    document.getElementById("tree").innerHTML = "";
    document.getElementById("tree").appendChild(root);
  })
  .catch(error => {
    console.error("Lỗi khi tải dữ liệu:", error);
    document.getElementById("tree").innerHTML = "Không thể tải dữ liệu.";
  });
