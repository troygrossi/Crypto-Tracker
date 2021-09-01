const loggedIn = document.querySelector("#loggedIn").textContent;

const loginNav = document.querySelector("#nav-login");
const logoutNav = document.querySelector("#nav-logout");
const profileNav = document.querySelector("#nav-profile");

const getNav = function () {
  if (loggedIn) {
    loginNav.style.display = "none";
    logoutNav.style.display = "";
    if (window.location.pathname === "/profile") {
      profileNav.style.display = "none";
    } else {
      profileNav.style.display = "";
    }
  } else {
    if (window.location.pathname === "/login") {
      loginNav.style.display = "none";
    } else {
      loginNav.style.display = "";
    }
    logoutNav.style.display = "none";
    profileNav.style.display = "none";
  }
};

getNav();
