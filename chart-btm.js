function createChart() {
    const ctx = document.getElementById('mycanvas').getContext('2d');
    const tooltipLine = {
        id: 'tooltipLine',
        beforeDraw: chart => {
            const { tooltip, data } = chart;
            if (tooltip._active && tooltip._active.length > 0) {
                const index = tooltip._active[0].index;
                updateChart(chart, index)
            }
        }
    }
    const updateChart = (chart, index) => {
        chart.data.datasets[1].data = [];
        for (let i = 0; i <= index; i++) {
            chart.data.datasets[1].data.push("0")
        }
        chart.update();
    }

    // custom tooltip block
    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
        // custom tooltip block
        if (!tooltipEl) {
            let tooltipEL = document.createElement('DIV');
            tooltipEL.classList.add('tooltip-wrp');
            let tooltipTop = document.createElement('DIV');
            let tooltipDot = document.createElement('DIV');
            tooltipDot.classList.add('tooltip-dot');
            tooltipTop.classList.add('tooltip-top');
            tooltipTop.appendChild(tooltipDot);
            // append to parent
            tooltipEL.appendChild(tooltipTop);
            chart.canvas.parentNode.appendChild(tooltipEL);
        }
        return tooltipEl
    }
    // 1 trigger
    const externalTooltipHandler = (context) => {
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0; // hide tooltip when mouse out
            return;
        }
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map(b => b.lines);
            const headEl = document.createElement("div");

            // 4A title loop
            titleLines.forEach(title => {
                const tooltipTitle = document.createTextNode(`${title.split('m')[0]}% of transactions`);
                headEl.classList.add("tooltip-head");
                headEl.appendChild(tooltipTitle);
                if (tooltipEl != null) tooltipEl.querySelector(".tooltip-top").appendChild(headEl);
            })

            // 4B body loop
            const tooltipBody = document.createElement('div');
            tooltipBody.classList.add("tooltip-btm");
            const textNode = document.createElement('div');
            const textLabel = document.createTextNode(`are processed in less than ${bodyLines[0]} mins`);
            textNode.classList.add("tooltip-btm-text");
            // append + textlabel
            textNode.appendChild(textLabel);
            tooltipBody.appendChild(textNode);

            if (tooltipEl != null) {
                const heads = tooltipEl.querySelectorAll('.tooltip-head');
                const btms = tooltipEl.querySelectorAll('.tooltip-btm');
                // remove old children
                heads.forEach(head => {
                    head.remove();
                })
                btms.forEach(btm => {
                    btm.remove();
                })
                // add new children
                tooltipEl.querySelector(".tooltip-top").appendChild(headEl);
                tooltipEl.appendChild(tooltipBody)

                tooltipEl.style.opacity = 1;
                // positioning of the tooltip.
                const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
                tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            }
        }
    }
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0m', '3m', '6m', '12m', '15m', '18m', '21m', '24m', '27m', '30m', '33m'],
            datasets: [{
                data: [0, 0, 0, 10, 40, 48, 40, 10, 0, 0, 0,],
                backgroundColor: [
                    'rgba(131, 88, 221, 1)',
                ],
                borderColor: [
                    '#BC9CFF',
                ],
                borderWidth: 1,
                fill: 1,

            },
            {
                data: [],
                backgroundColor: [
                    'rgba(131, 88, 221, 0.1)',
                ],
                borderColor: [
                    '#BC9CFF',
                ],
                borderWidth: 1,
                fill: 1,
                pointHitRadius: 0,
                pointRadius: 0,
                hoverRadius: 0,
            },
            {
                data: [0, 0, 0, 10, 40, 48, 40, 10, 0, 0, 0,],
                backgroundColor: [
                    'rgba(131, 88, 221, 0.1)',
                ],
                borderColor: [
                    '#BC9CFF',
                ],
                borderWidth: 1,
                fill: true,
                pointHitRadius: 0,
                pointRadius: 0,
                hoverRadius: 0,
            },
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom',
                },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler,
                }

            },
            tension: 0.4,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        borderColor: "rgba(191, 191, 191, 1)",
                        borderDash: [5, 1],
                        borderWidth: 1,
                        borderDashOffset: 1,
                    },
                },
                y: {
                    beginAtZero: true,
                    endAtZero: true,
                    grid: {
                        drawTicks: false,
                        display: true,
                        borderColor: "white",
                        borderDash: [8, 4],
                    },
                    stacked: false,
                },

            },
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#000000",
            pointBorderWidth: 1,
            pointRadius: 0,
        },
        plugins: [tooltipLine],
    });
}

createChart();
