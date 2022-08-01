import checkCookie from "./checkCookie.js";
class SHOWWORKFLOWDATA {
    constructor() {

        this.workflowDropdownElms = document.querySelectorAll("[data-wfk='workflow']");
        this.dropdownHeadElm = document.querySelector("[data-wfk='title']");
        this.topBars = document.querySelectorAll("[data-top-bar]");
        this.topBarTexts = document.querySelectorAll("[data-bar-text]")

        this.bottomBarsElms = document.querySelectorAll("[data-category]");
        this.allBottomBars = document.querySelectorAll(".summary-item");
        
        this.data;
        this.init();
    }

    init() {
        let haveCookie = checkCookie("WorkflowSummeryData")
        if (haveCookie != null) {
            this.data = JSON.parse(haveCookie)
            this.addListnerToDd();
            this.setBarHeight();
        }
    }

    addListnerToDd() {
        if (this.workflowDropdownElms.length > 0) {
            this.workflowDropdownElms.forEach(item => {
                item.addEventListener('click', (evt) => {
                    let clickedOn = evt.currentTarget.textContent.split(" ").join("");
                    this.updateTopBars(clickedOn);
                    this.updateBottomBars(clickedOn);
                    this.updateTitleAndResetStyle(evt.currentTarget);
                })
            })
            // activateDefault
            this.workflowDropdownElms[0].click();
        }
    }

    updateTopBars(workflow) {
        this.topBars.forEach((bar, index) => {
            let barAttrVal = bar.getAttribute("data-top-bar");
            let textElm = this.topBarTexts[index];
            let textAttrVal = textElm.getAttribute("data-bar-text");
            if (barAttrVal == 'scheduled' && textAttrVal == 'scheduled') {
                bar.style.height = `${this.data[workflow].scheduled.data / 14.4}em`;
                textElm.textContent = this.data[workflow].scheduled.data;
            }
            else if (barAttrVal == 'wait' && textAttrVal == 'wait') {
                bar.style.height = `${this.data[workflow].wait.data / 14.4}em`;
                textElm.textContent = this.data[workflow].wait.data;
            }
            else if (barAttrVal == 'inprogress' && textAttrVal == 'inprogress') {
                bar.style.height = `${this.data[workflow].inProgress.data / 14.4}em`;
                textElm.textContent = this.data[workflow].inProgress.data;
            }
            else if (barAttrVal == 'failed' && textAttrVal == 'failed') {
                bar.style.height = `${this.data[workflow].failed.data / 14.4}em`;
                textElm.textContent = this.data[workflow].failed.data;
            }
            else if (barAttrVal == 'needsintervention' && textAttrVal == 'needsintervention') {
                bar.style.height = `${this.data[workflow].needsIntervention.data / 14.4}em`;
                textElm.textContent = this.data[workflow].needsIntervention.data;
            }
            else if (barAttrVal == 'completed' && textAttrVal == 'completed') {
                bar.style.height = `${this.data[workflow].completed.data / 14.4}em`;
                textElm.textContent = this.data[workflow].completed.data;
            }
        })
    }

    updateBottomBars(workflow) {
        let allMatchedBlocks = [...document.querySelectorAll(`[data-category='${workflow}']`)];
        let matchBoxParent = allMatchedBlocks.map(item => item.closest(".summary-item"));
        if(this.allBottomBars.length>0)
            this.allBottomBars.forEach(item => {
                if(matchBoxParent.includes(item)){
                    item.classList.remove("hide");
                }else{
                    item.classList.add("hide");
                }
            })
    }

    setBarHeight() {
        if (this.bottomBarsElms.length > 0) {
            this.bottomBarsElms.forEach(bar => {
                let AttrVal = bar.getAttribute("data-category")
                bar.setAttribute("data-category", AttrVal.split(" ").join(""));
                let mainParent = bar.closest(".summary-item");
                let heightValArr = [...mainParent.querySelectorAll("[data-height='value']")]
                let heightValLength = heightValArr.length;
                let sumOfHeights = 0;
                heightValArr.forEach(item=>{
                    if(item.textContent.length > 0){
                       sumOfHeights += parseInt(item.textContent)
                    }
                })
                let diffFromHundred = 100 - sumOfHeights;
                let extraHeightToAdd =Math.floor(diffFromHundred / heightValLength);
                heightValArr.forEach(item => {
                    if(item.textContent.length > 0){
                        let barDiv = item.closest("[data-box='stage']");
                        let heightVal = item.textContent;
                        barDiv.style.height = `${heightVal + extraHeightToAdd}%`;
                    }

                })

            })
        }
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