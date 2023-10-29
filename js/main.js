'use strict';

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
document.addEventListener("DOMContentLoaded", createCategoryPanel);
document.addEventListener("DOMContentLoaded", createBody);
let localData = getDataFromLocalStorage();

let page = 0;

function getPageContent() {

}

function getTags() {
    let uniqTags = [];
    let filteredStrings = new Set();
    for (const dataElement of localData) {
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

    let body = document.getElementById('category-body-container');
    // body.innerHTML = "";
    //let rowDiv = document.createElement('div');
    let couponRowContainerDiv;
    for (let i = 0; i < localData.length; i++) {
        if (i !== 1 || i % 3 === 0) {
            couponRowContainerDiv = document.createElement('div');
            couponRowContainerDiv.className = 'category-container';
            body.appendChild(couponRowContainerDiv);
        }

        let couponColumnContentDiv = document.createElement('div');
        couponColumnContentDiv.className = 'coupon-column-content';
        couponRowContainerDiv.appendChild(couponColumnContentDiv);

        let couponContainerDiv = document.createElement('div');
        couponContainerDiv.className = 'coupon-container';
        couponColumnContentDiv.appendChild(couponContainerDiv);

        let couponImageDiv = document.createElement('div');
        couponImageDiv.className = 'coupon-image';
        couponContainerDiv.appendChild(couponImageDiv);

        let couponContentDiv = document.createElement('div');
        couponContentDiv.className = 'coupon-content';
        couponContainerDiv.appendChild(couponContentDiv);

        let couponRowDiv = document.createElement('div');
        couponRowDiv.className = 'coupon-row';
        couponContentDiv.appendChild(couponRowDiv);

        let couponNameDiv = document.createElement('div');
        couponNameDiv.className = 'coupon-name';
        couponRowDiv.appendChild(couponNameDiv);

        let couponHeartDiv = document.createElement('div');
        couponNameDiv.className = 'coupon-heart';
        couponRowDiv.appendChild(couponHeartDiv);

        let heartSpan = document.createElement('span');
        heartSpan.className = 'material-icons-outlined';
        heartSpan.addEventListener("click", colorChangeFunction);
        couponHeartDiv.appendChild(heartSpan);

        couponRowDiv = document.createElement('div');
        couponRowDiv.className = 'coupon-row';
        couponContentDiv.appendChild(couponRowDiv);

        let briefDescrDiv = document.createElement('div');
        briefDescrDiv.className = 'brief-description';
        couponRowDiv.appendChild(briefDescrDiv);

        let expireDateDiv = document.createElement('div');
        expireDateDiv.className = 'expire-date';
        couponRowDiv.appendChild(expireDateDiv);

        let hrElement = document.createElement('hr');
        couponContentDiv.appendChild(hrElement);

        couponRowDiv = document.createElement('div');
        couponRowDiv.className = 'coupon-row';
        couponContentDiv.appendChild(couponRowDiv);

        let couponPriceDiv = document.createElement('div');
        couponPriceDiv.className = 'coupon-price';
        couponRowDiv.appendChild(couponPriceDiv);

        let cartBtnDiv = document.createElement('div');
        cartBtnDiv.className = 'add-to-cart-btn';
        couponRowDiv.appendChild(cartBtnDiv);

        let addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.type = "button";
        addToCartBtn.textContent = "Add to Cart";
        cartBtnDiv.appendChild(addToCartBtn);

    }
}

function createBody() {
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
