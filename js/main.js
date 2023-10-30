'use strict';

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }


let localData = getDataFromLocalStorage();
let body = document.getElementById('category-body-container');
let page = 9;

function getPageContent() {

}

function createCategoryPanel() {
    let tags = getTags(getDataFromLocalStorage());
    let panel = document.getElementById('category-panel-container');

    // panel.innerHTML = "";
    for (const tagsElement of tags) {
        let iDiv = document.createElement('div');

        iDiv.className = 'category-container';
        iDiv.addEventListener("click", () => {
            searchTag(tagsElement.name)
        });
        panel.appendChild(iDiv);

        let innerImageDiv = document.createElement('div');
        innerImageDiv.addEventListener("mouseover", (e) => {
            showName(e.target.children[0])
        });
        innerImageDiv.addEventListener("mouseout", (e) => {
            hideName(e.target.children[0])
        });
        innerImageDiv.className = "category-image";
        iDiv.appendChild(innerImageDiv);

        let nameDiv = document.createElement('div');
        nameDiv.textContent = tagsElement.name;
        nameDiv.className = "name-image-div";
        nameDiv.addEventListener("mouseover", (e) => {
            showName(e.target)
        });
        nameDiv.addEventListener("mouseout", (e) => {
            hideName(e.target)
        });
        innerImageDiv.appendChild(nameDiv);

        let innerNameDiv = document.createElement('div');
        innerNameDiv.className = "category-name";
        innerNameDiv.textContent = tagsElement.name;
        iDiv.appendChild(innerNameDiv);
    }

    function showName(e) {
        console.log(e);
        e.style.display = "block";
    }

    function hideName(e) {
        console.log(e);
        e.style.display = "none";
    }
}


function getTags(data) {
    let uniqTags = [];
    let filteredStrings = new Set();
    for (const dataElement of data) {
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

    return rsl.sort(function (a, b) {
        if (a instanceof Map && b instanceof Map) {
            let dateA = Date.parse(a.get("created"));
            let dateB = Date.parse(b.get("created"));
            return dateB - dateA;
        }
        return 0;
    });
}

function createInitialBody() {
    let data = getDataFromLocalStorage().slice(0,page);
    createBody(data);
}


function createBody(data, clear = true) {
    let body = document.getElementById('category-body-container');

    // console.log(body);
    if (clear) {
        body.innerHTML = "";
    }
    // let rowDiv = document.createElement('div');
    let couponRowContainerDiv;
    for (let i = 0; i < data.length; i++) {
        if (i === 0 || i % 3 === 0) {
            couponRowContainerDiv = document.createElement('div');
            couponRowContainerDiv.className = 'coupon-row-container';
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
        couponNameDiv.textContent = new Map(data[i]).get("name");
        couponRowDiv.appendChild(couponNameDiv);

        let couponHeartDiv = document.createElement('div');
        couponHeartDiv.className = 'coupon-heart';
        couponRowDiv.appendChild(couponHeartDiv);

        let heartSpan = document.createElement('span');
        heartSpan.className = 'material-icons-outlined';
        heartSpan.textContent = " favorite ";
        heartSpan.addEventListener("click", colorChangeFunction);
        couponHeartDiv.appendChild(heartSpan);

        couponRowDiv = document.createElement('div');
        couponRowDiv.className = 'coupon-row';
        couponContentDiv.appendChild(couponRowDiv);

        let briefDescrDiv = document.createElement('div');
        briefDescrDiv.className = 'brief-description';
        briefDescrDiv.textContent = new String(new Map(data[i]).get("description")).substring(0, 70) + "...";
        couponRowDiv.appendChild(briefDescrDiv);

        let expireDateDiv = document.createElement('div');
        expireDateDiv.className = 'expire-date';
        expireDateDiv.textContent = "Expired in " + (getDifferenceInDays(new Map(data[i]).get("created"),
            new Map(localData[i]).get("duration")));
        couponRowDiv.appendChild(expireDateDiv);

        let hrElement = document.createElement('hr');
        couponContentDiv.appendChild(hrElement);

        couponRowDiv = document.createElement('div');
        couponRowDiv.className = 'coupon-row';
        couponContentDiv.appendChild(couponRowDiv);

        let couponPriceDiv = document.createElement('div');
        couponPriceDiv.className = 'coupon-price';
        couponPriceDiv.textContent = "$" + new Map(data[i]).get("price");
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


// const ss = ()=> {
//     debounce(search);
// }

// function debounce(func, timeout = 5000) {
//     console.log("inn");
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
// }
// const debounce = (callback, wait) => {
     function debounce(callback, wait = 5000) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

const storageEventCb = () => search();

function search() {
    let searchQuery = document.getElementById("input-field").value;
    let category = document.getElementById("search-select").value;

    // let searchQuery = searchValue.target.value;
    let localData = getDataFromLocalStorage();
    if (!searchQuery) {
        return;
        // createBody(localData);

    }
    switch (category) {
        case "tag":
            searchTag(searchQuery);
            break;
        case "description":
            searchDescription(searchQuery);
            break;
        case "name":
            searchName(searchQuery);
            break;
        case "all":
            searchAll(searchQuery);
            break;
        default:
            break;
    }


    function searchName(searchValue) {
        let rls = [];
        for (const arrElement of localData) {
            let name = arrElement.get("name");
            if (new String(name).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                rls.push(arrElement);
            }
        }
        createBody(rls)
    }

    function searchDescription(searchValue) {
        let rls = [];
        for (const arrElement of localData) {
            let desc = arrElement.get("description");
            if (desc.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                rls.push(arrElement);
            }
        }
        createBody(rls)
    }

    function searchAll(searchValue) {
        let rls = [];
        for (const arrElement of localData) {
            let desc = arrElement.get("description");
            let name = arrElement.get("name");

            if (new String(name).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || new String(desc).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                rls.push(arrElement);
            }
            let tags = arrElement.get("tag");
            for (const tag of tags) {
                if (new String(tag.name).indexOf(searchValue) !== -1) {
                    rls.push(arrElement);
                    break;
                }
            }
        }
        createBody(rls)
    }
}
const debouncedCb = debounce(storageEventCb, 1500);

document.addEventListener('input',debouncedCb);

function searchTag(searchValue) {
    let rls = [];
    for (const arrElement of localData) {
        let tags = arrElement.get("tag");
        for (const tag of tags) {
            if (new String(tag.name).toLowerCase().indexOf(new String(searchValue).toLowerCase()) !== -1) {
                rls.push(arrElement);
                console.log(searchValue);
                break;
            }
        }
    }
    createBody(rls)
}

function getDifferenceInDays(created, duration) {
    const date2 = addDays(created, duration).valueOf();
    const date1 = new Date().valueOf();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

document.addEventListener("DOMContentLoaded", createInitialBody);
document.addEventListener("DOMContentLoaded", createCategoryPanel);


let goTopButton;
let currentPosition = 0;

window.onscroll = function () {
    displayFunction()
};

function displayFunction() {
    if (document.documentElement.scrollTop > 20 && currentPosition === 0) {
        goTopButton.style.display = "flex";
        goTopButton.style.top = "";
        goTopButton.style.bottom = "5%";
    } else if (document.documentElement.scrollTop < 20 && currentPosition === 0) {
        goTopButton.style.display = "none";
    }
    if (currentPosition !== 0) {
        goTopButton.style.bottom = "";
        goTopButton.style.top = "15%";
    }

    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 5) {
dd();
//    showLoader();
     //  throttle(addBody,10);
        // debounce(addBody(),10000);
        // hideLoader();

    }
}
const cc = ()=>     addBody();

const dd =    debounce(cc,1300);


function addBody() {
    console.log("111");
    let newPage = page+3;
    let currentData = getDataFromLocalStorage().slice(page,newPage);
    page=newPage;
    createBody(currentData,false);
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


function colorChangeFunction(e) {
    let heartBtn = e.target;
    if (heartBtn.style.color === "red") {
        heartBtn.style.color = "#555555";
    } else {
        heartBtn.style.color = "red";
    }
}

//
const ff = () => {
    goTopButton = document.getElementById("go-top-btn-content");
    // loader = document.querySelector('.loader');
};
document.addEventListener("DOMContentLoaded", ff);
// console.log(document.getElementById("go-top-btn-container"))
//
function throttle (callback, limit) {
    console.log("out");
    let waiting = false;                      // Initially, we're not waiting
    return function () {
        console.log("out");// We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}
//
// function throttle(func, timeFrame) {
//     let lastTime = 0;
//     console.log("mid1");
//     return function () {
//         let now = Date.now();
//         if (now - lastTime >= timeFrame) {
//             func();
//             console.log("mid");
//             lastTime = now;
//         }
//     };
// }


// const hideLoader = () => {
//     loader.classList.remove('show');
// };
//
// const showLoader = () => {
//     console.log("show");
//     loader.classList.add('show');
// };
//
// let loader ;