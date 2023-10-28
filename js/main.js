'use strict';

let goTopButton = document.getElementById("go-top-btn-content");
let currentPosition = 0;

window.onscroll = function () {
    displayFunction()
};

function displayFunction() {
    if (document.documentElement.scrollTop > 20 && currentPosition === 0) {
        goTopButton.style.display = "block";
        goTopButton.style.top = "";
        goTopButton.style.bottom = "5%";
    } else if (document.documentElement.scrollTop < 20 && currentPosition === 0) {
        goTopButton.style.display = "none";
    }
    if (currentPosition !== 0) {
        goTopButton.style.bottom = "";
        goTopButton.style.top = "15%";
    }

}

function scrollFunction() {
    if (currentPosition === 0) {
        currentPosition = document.documentElement.scrollTop;
        document.documentElement.scrollTop = 0;
    } else {
        document.documentElement.scrollTop = currentPosition;
        currentPosition = 0;
    }
}

// document.addEventListener("click",changeColor(e))

function colorChangeFunction(e) {

    let heartBtn = e.target;
    if (heartBtn.style.color === "red") {
        heartBtn.style.color = "#555555";
    } else {
        heartBtn.style.color = "red";
    }
}


localStorage.setItem()