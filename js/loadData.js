import myJson from '../data/data.json' assert {type: 'json'};


let my_array = Object.entries(myJson).map(function(entry){
     let key = entry[0];
    let value = entry[1];

  let   nested_object = value;
    nested_object.key = key;
    return nested_object;
});

let cards =[];

for (const arrElement of my_array.pop()) {
    cards.push(arrElement);
}

localStorage.setObj("dataArray",cards);
