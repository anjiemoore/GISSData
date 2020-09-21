const xAxis = [];

chartCreation();

async function getData() {
    const response = fetch('ZonAnn.Ts+dSST.csv');
    const data = await (await response).text();

    const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const year = columns[0];
            xAxis.push(year);
            const nhTemp = columns[1];
            const shTemp = columns[2];
            console.log(year, nhTemp, shTemp);
        });
};

async function chartCreation() {
    await getData();
    const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: xAxis,
        datasets: [{
            label: 'Global Average Temperature',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
}