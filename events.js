const apiUrl = "https://event-manager-app-1.onrender.com";
function eventCards(events) {
  const e_card = document.getElementById("card");
  e_card.innerHTML = "";

  events.forEach((ele) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("events-card");
    eventCard.innerHTML = `
            <img src="${ele.poster}" alt="${ele.name}">
            <h3>${ele.name}</h3>
            <h5>Date: ${ele.date}</h5>
            <h5>Location: ${ele.location}</h5>
            <h5>Category: ${ele.category}</h5>
            <h5>Price: $${ele.price}</h5>
        `;
    e_card.appendChild(eventCard);
  });
}

document.getElementById("cFilter").addEventListener("change", function () {
  const selectedCategory = this.value;
  if (selectedCategory === "All") {
    fetch(`${apiUrl}/events`)
      .then((response) => response.json())
      .then((data) => {
        eventCards(data);
      })
      .catch((error) => console.error(error));
  } else {
    fetch(`${apiUrl}/events?category=${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        eventCards(data);
      })
      .catch((error) => console.error(error));
  }
});

document.getElementById("pricesort").addEventListener("change", function () {
  const sortDirection = this.value;

  fetch(`${apiUrl}/events`)
    .then((response) => response.json())
    .then((data) => {
      if (sortDirection === "Ascending") {
        data.sort((a, b) => a.price - b.price);
      } else {
        data.sort((a, b) => b.price - a.price);
      }
      eventCards(data);
    })
    .catch((error) => console.error(error));
});


fetch(`${apiUrl}/events`)
  .then((response) => response.json())
  .then((data) => {
    eventCards(data);
  })
  .catch((error) => console.error(error));
