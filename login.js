// https://event-manager-app-1.onrender.com/events

document.getElementById("loginform").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href='dashboard.html'
        } else {
          alert("Invalid Credentials!...");
        }
      })
      .catch((err) => console.log(err))
});
  
//eve.holt@reqres.in

