import checkCookie from "./checkCookie.js";

class SHOWANALYTICSDATA {
    constructor() {
        this.addClickListenerElm = document.querySelectorAll("[data-click]");
        this.dropDownHead = document.querySelector("[data-change='dropdown-head']");

        this.completedTransactionElm = document.querySelector("[data-change='transaction-completed']")
        this.transactionPercentElm = document.querySelector("[data-change='transcation-completed-percent']");

        this.needsInterventionsElm = document.querySelector("[data-change='needs-interventions']");
        this.interventionsPercentElm = document.querySelector("[data-change='needs-interventions-percent']");

        this.hourSavedElm = document.querySelector("[data-change='saved-hours']");
        this.moneySavedElm = document.querySelector("[data-change='saved-money']");
        this.fteElm = document.querySelector("[data-change='fte']");

        this.throughputElm = document.querySelector("[data-change='throughput']");
        this.throughputMinElm = document.querySelector("[data-change='throughput-mins']")

        this.chartTop = document.getElementById("mycanvastwo");
        this.chartBtm = document.getElementById("mycanvas");

        this.data;
        this.chartOne;
        this.chartTwo;
        this.currentWorkflow;

        this.init();
    }

    init() {
        this.checkForCookie();
    }

    checkForCookie() {
        let haveCookie = checkCookie('AnalyticsData');
        if (haveCookie != null) {
            this.data = JSON.parse(haveCookie);
            this.addListener();
        }
    }

    addListener() {
        if (this.addClickListenerElm.length > 0) {
            this.addClickListenerElm.forEach(item => {
                item.addEventListener('click', (evt) => {
                    let clickedOn = evt.currentTarget;
                    let clickedOnType = clickedOn.type;
                    let clickedOnData;
                    if (clickedOnType == 'radio') {
                        clickedOnData = clickedOn.getAttribute('data-click');
                        this.UpdateChart(clickedOnData, false, this.currentWorkflow);
                    }
                    else {
                        clickedOnData = clickedOn.textContent;
                        this.currentWorkflow = clickedOnData;
                        this.updateTitleAndResetStyle(clickedOn);
                        this.updateAnalyticsData(clickedOnData);
                        this.UpdateChart(clickedOnData, true, this.currentWorkflow);
                        this.updateDefault();
                    }
                })
            })
            // default active category
            this.drawChart()
            this.addClickListenerElm[0].click();
        }
    }

    updateTitleAndResetStyle(elmToUpdate) {
        elmToUpdate.classList.add("active");
        this.dropDownHead.textContent = elmToUpdate.textContent;
        this.addClickListenerElm.forEach(item => {
            if (item == elmToUpdate) return;
            if (item.getAttribute("data-click") === 'dropdownItem') {
                item.classList.remove("active")
            }
        })
    }
    updateDefault() {
        // default active checkbox;
        let defaultCheckBox = [...this.addClickListenerElm].find(elm => {
            if (elm.getAttribute('data-click') === 'day') return elm;
        });
        defaultCheckBox.previousElementSibling.classList.add("w--redirected-checked");
        defaultCheckBox.click()
    }

    updateAnalyticsData(workflow) {
        if (workflow.length > 0) {

            // update Transactions completed data
            let transactionCompletedData = this.data[workflow].TransactionsCompleted.numberOfTransctionsRange.data;
            this.completedTransactionElm.textContent = transactionCompletedData;
            let transactionPercentData = this.data[workflow].TransactionsCompleted.percentFromLastRange.data;
            this.transactionPercentElm.textContent = `${transactionPercentData}%`

            // update Needs interventions data
            let interventionsTransactionData = this.data[workflow].NeedsInterventions.numberOfTransctionsRange.data;
            this.needsInterventionsElm.textContent = interventionsTransactionData;
            let interventionsPercentData = this.data[workflow].NeedsInterventions.percentFromLastRange.data;
            this.interventionsPercentElm.textContent = `${interventionsPercentData}%`

            // update You have saved data
            let savedHourData = this.data[workflow].haveSaved.hours.data;
            this.hourSavedElm.textContent = `${savedHourData} Hrs`;
            let savedMoneyData = this.data[workflow].haveSaved.money.data;
            this.moneySavedElm.textContent = `$${savedMoneyData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            let fte = this.data[workflow].haveSaved.FTE.data;
            this.fteElm.textContent = `${fte} FTE`;

            // update Throughput per hour data
            let throughputTransactionData = this.data[workflow].ThroughputPerHour.transactions.data;
            this.throughputElm.textContent = throughputTransactionData;
            let throughputMinData = this.data[workflow].ThroughputPerHour.avgMinTransctions.data;
            this.throughputMinElm.textContent = throughputMinData;
        }
    }

    UpdateChart(updateBy, updateBtm, workflow) {
        let chartTopData;
        let chartTopLabelData;
        let chartBtmData = this.data[workflow].chartTwoDataPoints.chartData
        if (updateBtm) {
            this.chartBtm.data.datasets.forEach((data, index) => {
                if (index == 0 || index == 2) {
                    data.data = chartBtmData;
                }
            })
            this.chartBtm.update()
        } else {
            if (updateBy == 'day') {
                chartTopLabelData = this.data[workflow].chartOneDataPoints.byDay.labels;
                chartTopData = this.data[workflow].chartOneDataPoints.byDay.chartData;
                this.chartTop.data.datasets[0].data = chartTopData;
                this.chartTop.update()
            }
            else if (updateBy == 'week') {
                chartTopLabelData = this.data[workflow].chartOneDataPoints.byWeek.labels;
                chartTopData = this.data[workflow].chartOneDataPoints.byWeek.chartData;
                this.chartTop.data.datasets[0].data = chartTopData;
                this.chartTop.update()
            }
        }
    }

    drawChart() {

        const ctxOne = document.getElementById('mycanvastwo').getContext('2d');
        const ctxTwo = document.getElementById('mycanvas').getContext('2d');

        const tooltipLine = {
            id: 'tooltipLine',
            beforeDraw: chart => {
                // const { tooltip, data } = chart;
                const { ctx, data, tooltip, chartArea: { top, bottom, left, right, height, width }, scales: { x, y } } = chart;
                if (tooltip._active && tooltip._active.length > 0) {
                    // code for line
                    ctx.save();
                    const activePoint = chart.tooltip._active[0];

                    ctx.beginPath();
                    ctx.moveTo(activePoint.element.x, activePoint.element.y);
                    ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba(132, 94, 212, 1)';
                    ctx.stroke();

                    ctx.restore();
                    // code for line
                    if (chart.canvas.id == 'mycanvas') {
                        const index = tooltip._active[0].index;
                        updateChart(chart, index)
                    }
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
            // console.log(chart.canvas.id)
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
                let titleText;
                if (chart.canvas.id == 'mycanvas') {
                    titleText = document.createTextNode(`${bodyLines[0]}% of transactions`);
                }
                else {
                    titleText = document.createTextNode(`${bodyLines[0]} transactions`);
                }
                TitleTextNode.classList.add("tooltip-head");
                // append + textlabel
                TitleTextNode.appendChild(titleText);
                tooltipTitleElm.appendChild(TitleTextNode);
                if (tooltipEl != null) tooltipEl.appendChild(tooltipTitleElm);

                // 4A body loop
                titleLines.forEach(title => {
                    const textNode = document.createElement("div");
                    let textLabel;
                    if (chart.canvas.id == 'mycanvas') {
                        textLabel = document.createTextNode(`are processed in less than ${title} mins`);
                    } else {
                        textLabel = document.createTextNode('completed');
                    }
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
                    if (chart.canvas.id == 'mycanvas') {
                        tooltipDot.style.backgroundColor = 'rgba(188, 156, 255, 1)';
                        tooltipEl.style.maxWidth = '9.9em';
                    } else {
                        tooltipDot.style.backgroundColor = 'rgba(132, 94, 212, 1)';
                        tooltipEl.style.maxWidth = '8.19em';
                    }
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
                    let space; // This for making space between the caret and the element.
                    if(chart.canvas.id == 'mycanvas'){
                        space=1;
                    }
                    else{
                        space=10;
                    }

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
        this.chartBtm = new Chart(ctxTwo, {
            type: 'line',
            data: {
                labels: ['0m', '3m', '6m', '12m', '15m', '18m', '21m', '24m', '27m', '30m', '33m'],
                datasets: [{
                    // data to update
                    data: [],
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
                    // data to update
                    data: [],
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

        this.chartTop = new Chart(ctxOne, {
            type: 'line',
            data: {
                labels: [21, 22, 23, 24, 25, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
                datasets: [{
                    // data update here.
                    data: [],
                    backgroundColor: [
                        'rgba(132, 94, 212, 0.05)',
                    ],
                    borderColor: [
                        'rgba(131, 88, 221, 1)',
                    ],
                    borderWidth: 1,
                    fill: true,
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',

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
                        xAlign: 'center',
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
                pointBackgroundColor: "rgba(131, 88, 221, 1)",
                pointBorderColor: "rgba(132, 94, 212, 1)",
                pointBorderWidth: 1,
                pointRadius: 2,
            },
            plugins: [tooltipLine],
        });
    }

}

new SHOWANALYTICSDATA;
// [0, 0, 0, 10, 40, 48, 40, 10, 0, 0, 0,]