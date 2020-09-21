getData();

async function getData() {
    const response = fetch('ZonAnn.Ts+dSST.csv');
    const data = await (await response).text();

    const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const year = columns[0];
            const nhTemp = columns[1];
            const shTemp = columns[2];
            console.log(year, nhTemp, shTemp);
        });

        
}