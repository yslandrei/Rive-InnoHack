'use strict';
function legendClickCallback(event) {
    event = event || window.event;

    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var chartId = parseInt(parent.classList[0].split("-")[0], 10);
    var chart = Chart.instances[chartId];
    var index = Array.prototype.slice.call(parent.children).indexOf(target);
    var meta = chart.getDatasetMeta(index);

    if (meta.hidden === null) {
        meta.hidden = !chart.data.datasets[index].hidden;
        target.classList.add('hidden-lable');
    } else {
        target.classList.remove('hidden-lable');
        meta.hidden = null;
    }
    chart.update();
}
var config = {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
                label: 'Listings Views',
                fill: false,
                animation: false,
                backgroundColor: "#F8BB11",
                borderColor: "#F8BB11",
                pointBorderWidth: 10,
                pointHoverBorderWidth: 10,
                data: [16, 12, 37, 33, 44, 98, 20]
            },
            {
                label: 'Bookings',
                fill: false,
                animation: false,
                backgroundColor: "#3AACED",
                borderColor: "#3AACED",
                pointBorderWidth: 10,
                pointHoverBorderWidth: 10,

                data: [12, 32, 62, 12, 49, 12, 92]
            },

        ]
    },
    options: {
        legend: {
            display: false
        },
        hover: {
            onHover: function (e) {
                var point = this.getElementAtEvent(e);
                if (point.length) e.target.style.cursor = 'pointer';
                else e.target.style.cursor = 'default';
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,

                    padding: 20
                },
                gridLines: {

                    display: true,
                    zeroLineColor: "transparent"
                }

            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }],

        },
        tooltips: {
            backgroundColor: "rgba(0,0,0,0.6)",
            titleMarginBottom: 10,
            footerMarginTop: 6,
            xPadding: 22,
            yPadding: 12
        }
    }
};
var ctx = document.getElementById("canvas-chart");
var myLegendContainer = document.getElementById("myChartLegend");

var myChart = new Chart(ctx, config);
myLegendContainer.innerHTML = myChart.generateLegend();
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
    legendItems[i].addEventListener("click", legendClickCallback, false);
}