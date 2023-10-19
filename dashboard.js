const apiUrl = "https://event-manager-app-1.onrender.com";
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

 getData();

function getData() {
  try {
    fetch(`${apiUrl}/events`)
      .then((res) => res.json())
      .then((data) => {
        const etable = document.getElementById("etable");
        const tbody = etable.querySelector("tbody");
        tbody.innerHTML = ``;

        // console.log(data);

        data.forEach((el) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${el.name}</td>
          <td>${el.date}</td>
          <td>${el.location}</td>
          <td>${el.category}</td>
          <td>${el.price}</td>
            <td><button class="edit-btn" data-id=${el.id}>Edit</button></td>
            <td><button class="delete-btn" data-id=${el.id}>Delete</button></td>`;

          tbody.appendChild(tr);
        });
      });
  } catch (err) {
    console.log(err);
  }
}



