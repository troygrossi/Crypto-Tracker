async function logout() {
  console.log("test");
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    logout();
  }
  console.log(event.target);
});
