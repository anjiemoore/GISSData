getData();

async function getData() {
    const response = fetch('test.csv');
    const data = await (await response).text();
    console.log(data);
}