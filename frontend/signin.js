// let signupDatafromLs=JSON.parse(localStorage.getItem("signup-data"))||[]
// let nameforshow = JSON.parse(localStorage.getItem("name"))||""

// let signintext=document.querySelector("#show-login")
// if(nameforshow.length>0){
// signintext.innerHTML= `Welcome, ${nameforshow}`
// }
// else {
// signintext.innerHTML= `Welcome, Sign In`
// }

let login = document.getElementById("show-login");
login.addEventListener("click", (e) => {
  e.preventDefault();
});
document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
});

document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });

let email = document.querySelector("#email");

let password = document.querySelector("#password");

let submit = document.querySelector("#signin");
submit.addEventListener("click", submitfunc);

function submitfunc() {
  let obj = {
    email: email.value,
    password: password.value,
  };
  loginfunc(obj);
}

function loginfunc(payload) {
  fetch("https://outrageous-cyan-overcoat.cyclic.app/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      alert(res.msg);
      localStorage.setItem("token", res.token);

      if (res.msg == "Login Successful") {
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
