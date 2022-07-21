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
            tooltipTop.classList.add('tooltip-top');
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
            const tooltipBody = document.createElement("div");


            // 4B title loop
            const tooltipTitleElm = document.createElement('div');
            tooltipTitleElm.classList.add("tooltip-top");
            const TitleTextNode = document.createElement('div');
            const titleText = document.createTextNode(`${bodyLines[0]}% of transactions`);
            TitleTextNode.classList.add("tooltip-head");
            // append + textlabel
            TitleTextNode.appendChild(titleText);
            tooltipTitleElm.appendChild(TitleTextNode);
            if (tooltipEl != null) tooltipEl.appendChild(tooltipTitleElm);

            // 4A body loop
            titleLines.forEach(title => {
                const textNode = document.createElement("div");
                const textLabel = document.createTextNode(`are processed in less than ${title} mins`);
                tooltipBody.classList.add("tooltip-btm");
                textNode.classList.add("tooltip-btm-text");
                textNode.appendChild(textLabel)
                tooltipBody.appendChild(textNode);
                if (tooltipEl != null) tooltipEl.appendChild(tooltipBody);
            })
            if (tooltipEl != null) {
                const heads = tooltipEl.querySelectorAll('.tooltip-top');
                const btms = tooltipEl.querySelectorAll('.tooltip-btm');
                // remove old children
                heads.forEach(head => {
                    head.remove();
                })
                btms.forEach(btm => {
                    btm.remove();
                })
                // add new children
                let tooltipTop = document.createElement("div");
                tooltipTop.classList.add("tooltip-top")
                let tooltipDot = document.createElement('DIV');
                tooltipDot.classList.add('tooltip-dot');
                tooltipTop.appendChild(tooltipDot)
                tooltipEl.appendChild(tooltipTop)
                tooltipEl.querySelector(".tooltip-top").appendChild(TitleTextNode);
                tooltipEl.appendChild(tooltipBody)

                tooltipEl.style.opacity = 1;
                // positioning of the tooltip.
                const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

                // Tooltip height and width
                const { height, width } = tooltipEl.getBoundingClientRect();

                // Carets
                const caretY = tooltip.caretY;
                const caretX = tooltip.caretX;

                // alingment
                const yAlign = tooltip.yAlign;
                const xAlign = tooltip.xAlign;

                // Final coordinates
                let top = positionY + caretY - height;
                let left = positionX + caretX - width / 2;
                let space = 1; // This for making space between the caret and the element.

                // yAlign could be: `top`, `bottom`, `center`
                if (yAlign === "top") {
                    top += height + space;
                } else if (yAlign === "center") {
                    top += height / 2;
                } else if (yAlign === "bottom") {
                    top -= space;
                }
                // xAlign could be: `left`, `center`, `right`
                if (xAlign === "left") {
                    left = left + width / 2 - tooltip.xPadding - space / 2;
                    if (yAlign === "center") {
                        left = left + space * 2;
                    }
                } else if (xAlign === "right") {
                    left -= width / 2;
                    if (yAlign === "center") {
                        left = left - space;
                    } else {
                        left += space;
                    }
                }
                tooltipEl.style.left = left - 6 + 'px';
                tooltipEl.style.top = top - 2 + 'px';
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
                    'rgba(214, 198, 245, 1)',
                ],
                borderColor: [
                    'rgba(188, 156, 255, 1)',
                ],
                borderWidth: 1,
                fill: 1,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',

            },
            {
                data: [],
                backgroundColor: [
                    'rgba(248, 242, 255, 1)',
                ],
                borderColor: [
                    '#0000',
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
                    'rgba(248, 242, 255, 1)',
                ],
                borderColor: [
                    'rgba(131, 88, 221, 1)',
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
                },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler,
                    xAlign: 'right',
                    yAlign: 'bottom',
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
                    ticks: {
                        display: false
                    },
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
