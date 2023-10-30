import data from './product';
import product from './product';

export async function seed(collectionName: string) {
    await fetch(`https://restapi.fr/api/${collectionName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function seed40Articles(collectionName: string) {
    await fetch(`https://restapi.fr/generator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getProductBluePrint(collectionName))
    })
}

const getProductBluePrint = (collectionName: string) => {
    return {
        "times": 40,
        "resourceName": collectionName,
        "title": "name",
        "image": {
            "type": "image",
            "theme": "computer",
            "height": 200,
            "width": 300
        },
        "category": {
            "type": "collection",
            "values": ["gamer", "desktop", "streaming", "desktop"],
            "unique": false
        },
        "description": {
            "type": "sentence",
            "range": [9, 12]
        },
        "stock": {
            "type": "number",
            "range": [1, 10]
        },
        "price": {
            "type": "number",
            "range": [800, 3500]
        },
    };
}