const xYears = [];
const yNhtemps = [];
const yShtemps = [];

chartCreation();

async function getData() {
    const response = fetch('ZonAnn.Ts+dSST.csv');
    const data = await (await response).text();

    const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const year = columns[0];
            xYears.push(year);
            const nhTemp = columns[1];
            yNhtemps.push(parseFloat(nhTemp) + 14);
            const shTemp = columns[2];
            yShtemps.push(parseFloat(shTemp) + 14);
        });
};

async function chartCreation() {
    await getData();
    const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
    labels: xYears,
    datasets: [{
        fill: false,
        borderColor: 'rgb(0, 174, 255)',
        label: 'Northern Hemisphere',
        yAxisID: 'NH',
        data: yNhtemps
    }, {
        fill: false,
        label: 'Southern Hemisphere',
        borderColor: 'rgb(255, 110, 0)',
        yAxisID: 'SH',
        data: yShtemps
    }]
    },

    // Configuration options go here
    options: {
        scales: {
          yAxes: [{
            id: 'NH',
            type: 'linear',
            position: 'left',
          }, {
            id: 'SH',
            type: 'linear',
            position: 'right',
          }]
        }
      }
});
}
