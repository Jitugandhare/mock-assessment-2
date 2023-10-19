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
            <p>Date: ${ele.date}</p>
            <p>Location: ${ele.location}</p>
            <p>Category: ${ele.category}</p>
            <p>Price: $${ele.price}</p>
        `;
    e_card.appendChild(eventCard);
  });
}



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
