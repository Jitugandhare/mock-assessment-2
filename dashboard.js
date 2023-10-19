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

        console.log(data);

        data.forEach((el) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${el.name}</td>
          <td>${el.date}</td>
          <td>${el.location}</td>
          <td>${el.category}</td>
          <td>${el.price}</td>
            <td><button class="edit-btn" data-id=${el.id}>Edit</button></td>
            <td><button class="delete-btn" data-id=${el.id} >Delete</button></td>`;

          tbody.appendChild(tr);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

// async function addEvent() {
//   try {
//     let data = {
//       image: document.getElementById("eventpost").ariaValueMax,
//       name: document.getElementById("eventname").value,
//       description: document.getElementById("description").value,
//       date: document.getElementById("date").value,
//       location: document.getElementById("location").value,
//       category: document.getElementById("eventcategory").value,
//       price: document.getElementById("price").value,
//     };

//     let res = await fetch(`${apiUrl}/events`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     let ans = await res.json();
//     console.log(ans);
//   } catch (err) {
//     console.log(err);
//   }
// }

//Post

document.getElementById("eform").addEventListener("submit", async function (e) {
  e.preventDefault();
  const image = document.getElementById("eventpost").value;
  const name = document.getElementById("eventname").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const category = document.getElementById("eventcategory").value;
  const price = document.getElementById("price").value;

  try {
    const res = await fetch(`${apiUrl}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poster: image,
        name: name,
        description: description,
        date: date,
        location: location,
        category: category,
        price: price,
      }),
    });
    const data = await res.json();
    console.log(data);
    getData();
  } catch (err) {
    console.log(err);
  }
});

//delete

document.getElementById("etable").addEventListener("click", async function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const e_id = e.target.dataset.id;
    try {
      let res = await fetch(`${apiUrl}/events/${e_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const del = await res.json();
      getData();
      console.log(del);
    } catch (err) {
      console.log(err);
    }
  }
});

// async function deleteEvent() {

// }

//update

async function EditEvent(id) {
  try {
    let res = await fetch(`${apiUrl}/events/${id}`);
    let data = await res.json();
    document.getElementById("eventname").value = data.name;
    document.getElementById("date").value = data.date;
    document.getElementById("location").value = data.location;

    document.getElementById("")
  } catch (err) {
    console.log(err);
  }
}
