
const data = {
  "name": "Đỗ Văn Lữ",
  "yearOfBirth": 1950,
  "hometown": "Hà Nội",
  "avatar": "https://via.placeholder.com/60",
  "children": [
    {
      "name": "Đỗ Văn Bản",
      "yearOfBirth": 1975,
      "hometown": "Nam Định",
      "avatar": "https://via.placeholder.com/60",
      "children": [
        {
          "name": "Nguyễn Văn C",
          "yearOfBirth": 2000,
          "hometown": "Hải Phòng",
          "avatar": "https://via.placeholder.com/60",
          "children": []
        }
      ]
    }
  ]
};

function createTree(node) {
  const li = document.createElement("li");

  const card = document.createElement("div");
  card.classList.add("member-card");

  const avatar = document.createElement("img");
  avatar.src = node.avatar;
  avatar.alt = node.name;

  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("h3");
  name.textContent = node.name;

  const details = document.createElement("p");
  details.innerHTML = `🎂 ${node.yearOfBirth}<br>📍 ${node.hometown}`;

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

const root = document.createElement("ul");
root.appendChild(createTree(data));
document.getElementById("tree").innerHTML = "";
document.getElementById("tree").appendChild(root);
