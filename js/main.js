'use strict';

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
document.addEventListener("DOMContentLoaded", createCategoryPanel);

let page = 0;

function getPageContent() {

}

function getTags() {
    let uniqTags = [];
    let filteredStrings = new Set();
    for (const dataElement of getDataFromLocalStorage()) {
        let arr = new Array(new Map(dataElement).get("tag")).pop();

        for (const arrElement of arr) {
            if (!filteredStrings.has(JSON.stringify(arrElement))) {
                filteredStrings.add(JSON.stringify(arrElement));
            }
        }
    }
    for (const arrElement of filteredStrings) {
        let rsl = JSON.parse(arrElement);
        let currentElement = new Map(Object.entries(rsl));
        const tagObj = {
            id: currentElement.get("id"),
            name: currentElement.get("name")
        }
        uniqTags.push(tagObj);
    }
    return uniqTags;
}

function getDataFromLocalStorage() {
    let rsl = [];
    let data = new Array(localStorage.getObj("dataArray")).pop();

    for (const element of data) {
        rsl.push(new Map(Object.entries(element)));
    }

    return rsl.sort(function (a, b)  {
        if (a instanceof Map && b instanceof Map) {
            let dateA = Date.parse(a.get("created"));
            let dateB = Date.parse(b.get("created"));
            return dateB - dateA;
        }
        return 0;
    });
}


function createCategoryPanel() {
    let tags = getTags();
    let panel = document.getElementById('category-panel-container');
    panel.innerHTML = "";
    for (const tagsElement of tags) {
        let iDiv = document.createElement('div');

        iDiv.className = 'category-container';
        panel.appendChild(iDiv);

        let innerImageDiv = document.createElement('div');
        innerImageDiv.className = "category-image";

        iDiv.appendChild(innerImageDiv);

        let innerNameDiv = document.createElement('div');
        innerNameDiv.className = "category-name";
        innerNameDiv.textContent = tagsElement.name;
        iDiv.appendChild(innerNameDiv);
    }
}

console.log(getTags());
