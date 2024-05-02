import {encoded, translations} from './data.js'

let decoded  = JSON.parse(JSON.stringify(encoded));
let uniqId=[];

function decode(encoded,uniqId,decoded) {

    let mapId = new Map();

    for (let curObj of decoded) {
        for (let [key, value] of Object.entries(curObj)) {
            switch (key) {
                case 'groupId':
                case 'service':
                case 'formatSize':
                case 'ca':
                    curObj[key] = value;
                    break;
                default:
                    if (mapId.has(value)) {
                        mapId.set(value, mapId.get(value) + 1);
                    } else {
                        mapId.set(value, 1);
                    }
                    if (translations[String(value)] !== undefined) {
                        curObj[key] = translations[String(value)];
                    } else {
                        curObj[key] = value;
                    }
                    break;
            }
        }
    }
    mapId.forEach((value, key) => {
        if (value === 1) {
            uniqId.push(key)
        }
    })

}

decode(encoded,uniqId,decoded);
console.log(decoded)
console.log(uniqId)


