import checkCookie from "./checkCookie.js";
class SHOWWORKFLOWDATA {
    constructor() {

        this.workflowDropdownElms = document.querySelectorAll("[data-wfk='workflow']");
        this.dropdownHeadElm = document.querySelector("[data-wfk='title']");
        this.topBars = document.querySelectorAll("[data-top-bar]");
        this.topBarTexts = document.querySelectorAll("[data-bar-text]")

        this.data;
        this.init();
    }

    init() {
        let haveCookie = checkCookie("WorkflowSummeryData")
        if (haveCookie != null) {
            this.data = JSON.parse(haveCookie)
            this.addListnerToDd();
        }
    }

    addListnerToDd() {
        if (this.workflowDropdownElms.length > 0) {
            this.workflowDropdownElms.forEach(item => {
                item.addEventListener('click', (evt) => {
                    let clickedOn = evt.currentTarget.textContent;
                    this.updateBars(clickedOn);
                    this.updateTitleAndResetStyle(evt.currentTarget);
                })
            })
            // activateDefault
            this.workflowDropdownElms[0].click();
        }
    }

    updateBars(workflow) {
        this.topBars.forEach((bar, index) => {
            let barAttrVal = bar.getAttribute("data-top-bar");
            let textElm = this.topBarTexts[index];
            let textAttrVal = textElm.getAttribute("data-bar-text");
            if(barAttrVal == 'scheduled' && textAttrVal == 'scheduled'){
                bar.style.height = `${this.data[workflow].scheduled.data /14.4}em`;
                textElm.textContent = this.data[workflow].scheduled.data;
            }
            else if(barAttrVal == 'wait' && textAttrVal == 'wait'){
                bar.style.height = `${this.data[workflow].wait.data /14.4}em`;
                textElm.textContent = this.data[workflow].wait.data;
            }
            else if(barAttrVal == 'inprogress' && textAttrVal == 'inprogress'){
                bar.style.height = `${this.data[workflow].inProgress.data /14.4}em`;
                textElm.textContent = this.data[workflow].inProgress.data;
            }
            else if(barAttrVal == 'failed' && textAttrVal == 'failed'){
                bar.style.height = `${this.data[workflow].failed.data /14.4}em`;
                textElm.textContent = this.data[workflow].failed.data;
            }
            else if(barAttrVal == 'needsintervention' && textAttrVal == 'needsintervention'){
                bar.style.height = `${this.data[workflow].needsIntervention.data /14.4}em`;
                textElm.textContent = this.data[workflow].needsIntervention.data;
            }
            else if(barAttrVal == 'completed' && textAttrVal == 'completed'){
                bar.style.height = `${this.data[workflow].completed.data /14.4}em`;
                textElm.textContent = this.data[workflow].completed.data;
            }
        })
    }

    updateTitleAndResetStyle(elmToUpdate) {
        elmToUpdate.classList.add("active");
        this.dropdownHeadElm.textContent = elmToUpdate.textContent;
        this.workflowDropdownElms.forEach(item => {
            if (item == elmToUpdate) return;
            if (item.getAttribute("data-wfk") === 'workflow') {
                item.classList.remove("active")
            }
        })
    }
}

new SHOWWORKFLOWDATA;