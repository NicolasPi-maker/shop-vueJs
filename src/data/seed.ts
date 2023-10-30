import data from './product';
export async function seed(collectionName: string) {
    await fetch(`https://restapi.fr/api/${collectionName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}