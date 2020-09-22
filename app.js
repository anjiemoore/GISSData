chartCreation();

async function getData() {
    const xYears = [];
    const yGlobal = [];
    const yNhtemps = [];
    const yShtemps = [];
    
    const response = fetch('ZonAnn.Ts+dSST.csv');
    const data = await (await response).text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xYears.push(year);
        const glob = columns[1];
        yGlobal.push(parseFloat(glob) +14);
        const nhTemp = columns[2];
        yNhtemps.push(parseFloat(nhTemp) + 14);
        const shTemp = columns[3];
        yShtemps.push(parseFloat(shTemp) + 14);
    });

    return { xYears, yGlobal, yNhtemps, yShtemps }
};

async function chartCreation() {
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: data.xYears,
            datasets: [{
                fill: false,
                borderColor: 'rgb(85, 132, 0)',
                borderWidth: '1.5',
                label: 'Global',
                yAxisID: 'GL',
                data: data.yGlobal
            }, {
                fill: false,
                label: 'Southern Hemisphere',
                borderColor: 'rgb(166, 83, 107)',
                borderWidth: '1.5',
                yAxisID: 'SH',
                data: data.yShtemps
            }, {
                fill: false,
                borderColor: 'rgb(52, 127, 196)',
                borderWidth: '1.5',
                label: 'Northern Hemisphere',
                data: data.yNhtemps
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    id: 'GL',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "°C";
                        }
                    }
                }, {
                    id: 'SH',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "°C";
                        }
                    }
                }]
            }
        }
    });
}
