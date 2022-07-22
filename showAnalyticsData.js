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

    addListener(){
        if(this.addClickListenerElm.length > 0){
            this.addClickListenerElm.forEach(item => {
                item.addEventListener('click', (evt) => {
                    let clickedOn = evt.currentTarget;
                    let clickedOnType = clickedOn.type;
                    let clickedOnData;
                    if(clickedOnType == 'radio'){
                        clickedOnData = clickedOn.getAttribute('data-click');
                        this.UpdateChart(clickedOnData);
                    }
                    else{
                        clickedOnData = clickedOn.textContent;
                        this.updateTitleAndResetStyle(clickedOn);
                        this.updateAnalyticsData(clickedOnData);
                        this.updateDefault(false);
                    }
                })
            })
            this.updateDefault(true);
        }
    }

    updateTitleAndResetStyle(elmToUpdate){
        elmToUpdate.classList.add("active");
        this.dropDownHead.textContent = elmToUpdate.textContent;
        this.addClickListenerElm.forEach(item => {
            if(item == elmToUpdate)return;
            if(item.getAttribute("data-click") === 'dropdownItem'){
                item.classList.remove("active")
            }
        })
    }
    updateDefault(both){
        if(both)this.addClickListenerElm[0].click();
        let defaultCheckBox = [...this.addClickListenerElm].find(elm => {
            if(elm.getAttribute('data-click') === 'day')return elm;
        });
        defaultCheckBox.previousElementSibling.classList.add("w--redirected-checked");
        defaultCheckBox.click()
    }
    
    updateAnalyticsData(workflow){
        if(workflow.length > 0){
            
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

    UpdateChart(updateBy){
        console.log(updateBy)
    }
}

new SHOWANALYTICSDATA;