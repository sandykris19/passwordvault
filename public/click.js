console.log("client side js running");

const hash = document.querySelector(".hash");
const del = document.querySelector(".bx");
const unhide = document.querySelector(".unhidepassword");

document.addEventListener("click", (e) => {
  let parents = e.target.parentElement;
  console.log();
  if (e.target.classList.contains("bx")) {
    parents.querySelector(".hash").classList.toggle("hide");
    parents.querySelector(".unhidepassword").classList.toggle("visible");
  }
});
