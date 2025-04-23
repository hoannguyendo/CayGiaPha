function createTree(node) {
  const li = document.createElement("li");

  const card = document.createElement("div");
  card.classList.add("member-card");

  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("h3");
  name.textContent = node.name;

  const details = document.createElement("p");
 let detailText = "";
if (node.yearOfBirth) detailText += `🎂 ${node.yearOfBirth}<br>`;
if (node.hometown) detailText += `📍 ${node.hometown}<br>`;
if (node.spouse) detailText += `❤️ Hôn phối: ${node.spouse}`;
details.innerHTML = detailText;

  info.appendChild(name);
  info.appendChild(details);
  card.appendChild(info); // Không có avatar

  if (node.children && node.children.length > 0) {
    const toggle = document.createElement("div");
    toggle.classList.add("toggle-btn");
    toggle.textContent = "+";

    const ul = document.createElement("ul");
    ul.classList.add("hidden");

    toggle.addEventListener("click", () => {
      const isHidden = ul.classList.contains("hidden");
      ul.classList.toggle("hidden");
      toggle.textContent = isHidden ? "−" : "+";
    });

    card.insertBefore(toggle, info);
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
