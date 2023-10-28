'use strict';

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
// document.addEventListener("DOMContentLoaded", ready);
// let goTopButton = document.getElementById("go-top-btn-content");
// let currentPosition = 0;
let page = 0;
//
// window.onscroll = function () {
//     displayFunction()
// };
//
// function displayFunction() {
//     if (document.documentElement.scrollTop > 20 && currentPosition === 0) {
//         goTopButton.style.display = "block";
//         goTopButton.style.top = "";
//         goTopButton.style.bottom = "5%";
//     } else if (document.documentElement.scrollTop < 20 && currentPosition === 0) {
//         goTopButton.style.display = "none";
//     }
//     if (currentPosition !== 0) {
//         goTopButton.style.bottom = "";
//         goTopButton.style.top = "15%";
//     }
//
// }
//
// function scrollFunction() {
//     if (currentPosition === 0) {
//         currentPosition = document.documentElement.scrollTop;
//         document.documentElement.scrollTop = 0;
//     } else {
//         document.documentElement.scrollTop = currentPosition;
//         currentPosition = 0;
//     }
// }
//
// // document.addEventListener("click",changeColor(e))
//
// function colorChangeFunction(e) {
//
//     let heartBtn = e.target;
//     if (heartBtn.style.color === "red") {
//         heartBtn.style.color = "#555555";
//     } else {
//         heartBtn.style.color = "red";
//     }
// }


// data.forEach(element =>console.log(element));

function getPageContent() {

}

function getTags() {
    let tags = [];
    let tags2 = new Set();
    for (const dataElement of getDataFromLocalStorage()) {
        let arr = new Array(new Map(dataElement).get("tag")).pop();
        for (const arrElement of arr) {
            // let currentElement = new Map(Object.entries(arrElement));

            if (!tags2.has(JSON.stringify(arrElement))) {
            tags2.add(JSON.stringify(arrElement));
            }
        }

    }
    for (const arrElement of tags2) {
        let rsl = JSON.parse(arrElement);
        let currentElement = new Map(Object.entries(rsl));
        const tagObj = {
            id: currentElement.get("id"),
            name: currentElement.get("name")
        }
        tags.push(tagObj);
    }
    return tags;
}


function getDataFromLocalStorage() {
    let rsl = [];
    let data = new Array(localStorage.getObj("dataArray")).pop();

    for (const element of data) {
        rsl.push(new Map(Object.entries(element)));
    }
    console.log(rsl.length);
    return rsl.sort(compareFn);
}


function compareFn(a, b) {
    if (a instanceof Map && b instanceof Map) {
        let dateA = Date.parse(a.get("created"));
        let dateB = Date.parse(b.get("created"));
        return dateB - dateA;
    }
    return 0;
}
function ready(){
    console.log(document.getElementsByTagName('body')[0]);

    var iDiv = document.createElement('div');


    iDiv.className = 'category-container';
    document.getElementsByTagName('main')[0].appendChild(iDiv);

// Now create and append to iDiv
    var innerImageDiv = document.createElement('div');
    innerImageDiv.className = "category-image";

// The variable iDiv is still good... Just append to it.
    iDiv.appendChild(innerImageDiv);

    var innerNameDiv = document.createElement('div');
    innerNameDiv.className = "category-name";
    innerNameDiv.textContent= "Category";
// The variable iDiv is still good... Just append to it.
    iDiv.appendChild(innerNameDiv);

}




console.log(getTags());
