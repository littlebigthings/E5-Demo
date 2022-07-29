class SEARCHFILTERS {
    constructor() {
        this.allRows = [...document.querySelectorAll("[data-filter='row']")];
        // elements to filter from.
        this.allIdElements = [...document.querySelectorAll("[data-filter='id']")];
        this.allPatientIdElements = [...document.querySelectorAll("[data-filter='patient-id']")];
        this.allBillingPeriodElements = [...document.querySelectorAll("[data-filter='date-range']")];
        this.allPatientNameElements = [...document.querySelectorAll("[data-filter='patient-name']")];
        this.allArrivedTimeElements = [...document.querySelectorAll("[data-filter='arrived-time']")];
        this.allCurrentStageElements = [...document.querySelectorAll("[data-filter='current-stage']")];
        this.allCurrentStatusElements = [...document.querySelectorAll("[data-filter='current-status']")];

        // elements to add listener
        this.idInput = document.querySelector("[data-search='id']");
        this.patientIdInput = document.querySelector("[data-search='patient-id']");
        this.billingPeriodInput = document.querySelector("[data-search='date-range']");
        this.patientNameInput = document.querySelector("[data-search='patient-name']");
        this.arrivedTimeInput = document.querySelector("[data-search='arrived-time']");

        // variable to store date and time inputs
        this.dateRange = null;
        this.dateWithTimeRange = null;

        // filtered by Id data
        this.filteredIdData = [];
        this.filteredPatientIdData = [];
        this.filteredPatientNameData = [];
        this.filteredBillingPeriodData = [];
        this.filteredArrivedTimeData = [];

        // variable to store filtered data
        this.filteredArray = [];

        this.init();
    }

    init() {
        this.addDatePicker();
        this.addListeners();
    }
    // integrate datepicker into Billing Period and Arrived Time field.
    addDatePicker() {
        if (this.billingPeriodInput != undefined && this.arrivedTimeInput != undefined) {
            this.dateRange = flatpickr(this.billingPeriodInput, {
                minDate: "2000-01",
                maxDate: "today",
                mode: "range",
                dateFormat: "d M, Y",
            });
            this.dateWithTimeRange = flatpickr(this.arrivedTimeInput, {
                minDate: "2000-01",
                maxDate: "today",
                dateFormat: "d M, Y, G:i K",
                enableTime: true,
            });
            // changing background color.
            this.billingPeriodInput.style.backgroundColor = '#ffff';
            this.arrivedTimeInput.style.backgroundColor = '#ffff';
        }
    }

    // add input listeners and date + time change listener.
    addListeners() {
        if (this.idInput != undefined && this.patientIdInput != undefined && this.patientNameInput != undefined && this.dateRange != undefined && this.dateWithTimeRange != undefined) {

            this.idInput.addEventListener('input', (evt) => {
                this.filterById(evt.target.value);
            })

            this.patientIdInput.addEventListener('input', (evt) => {
                this.filterByPatientId(evt.target.value);
            })

            this.patientNameInput.addEventListener('input', (evt) => {
                this.filterByName(evt.target.value);
            })

            // seperate listeners for datepicker elements
            this.dateRange.config.onClose.push((selectedDates, dateStr, instance) => {
                this.filterByBillingPeriod(dateStr);
            })

            this.dateWithTimeRange.config.onClose.push((selectedDates, dateStr, instance) => {
                this.filterByArrivedTime(dateStr);
            })

        }
    }

    // filter data based on the entered id
    filterById(id) {
        if (id.length > 0 && this.allIdElements.length > 0) {
            this.allIdElements.forEach(item => {
                let parent = item.closest("[data-filter='row']");
                if (item.textContent.toLowerCase().includes(id.toLowerCase()) && !this.filteredIdData.includes(parent)) {
                    this.filteredIdData.push(parent)
                }
                else if (!item.textContent.toLowerCase().includes(id.toLowerCase()) && this.filteredIdData.includes(parent)) {
                    let idxOfelm = this.filteredIdData.indexOf(parent);
                    this.filteredIdData.splice(idxOfelm, 1)
                }

            })
        }
        else {
            this.filteredIdData = [];
        }
        this.getCommonAndFilter();
    }

    // filter data based on patient id
    filterByPatientId(patientId) {
        if (patientId.length > 0 && this.allPatientIdElements.length > 0) {
            this.allPatientIdElements.forEach(item => {
                let parent = item.closest("[data-filter='row']");
                if (item.textContent.toLowerCase().includes(patientId.toLowerCase()) && !this.filteredPatientIdData.includes(parent)) {
                    this.filteredPatientIdData.push(parent)
                }
                else if (!item.textContent.toLowerCase().includes(patientId.toLowerCase()) && this.filteredPatientIdData.includes(parent)) {
                    let idxOfelm = this.filteredPatientIdData.indexOf(parent);
                    this.filteredPatientIdData.splice(idxOfelm, 1)
                }
            })
        }
        else {
            this.filteredPatientIdData = [];
        }
        this.getCommonAndFilter();
    }

    // filter data based on patient name
    filterByName(name) {
        if (name.length > 0 && this.allPatientNameElements.length > 0) {
            this.allPatientNameElements.forEach(item => {
                let parent = item.closest("[data-filter='row']");
                if (item.textContent.toLowerCase().includes(name.toLowerCase()) && !this.filteredPatientNameData.includes(parent)) {
                    this.filteredPatientNameData.push(parent)
                }
                else if (!item.textContent.toLowerCase().includes(name.toLowerCase()) && this.filteredPatientNameData.includes(parent)) {
                    let idxOfelm = this.filteredPatientNameData.indexOf(parent);
                    this.filteredPatientNameData.splice(idxOfelm, 1)
                }
            })
        }
        else {
            this.filteredPatientNameData = [];
        }
        this.getCommonAndFilter();
    }

    // filter data based on billing period
    filterByBillingPeriod(dateRange) {
        if (dateRange.length > 0 && this.billingPeriodInput.value.length > 0) {
            let startDate = dateRange.split(" to ")[0]
            let stopDate = dateRange.split(" to ")[1]
            let dateRangeVal = this.getDates(startDate, stopDate)
            if (this.allBillingPeriodElements.length > 0) {
                this.allBillingPeriodElements.forEach(item => {
                    let parent = item.closest("[data-filter='row']");
                    let startDate = item.textContent.split("-")[0]
                    let stopDate = item.textContent.split("-")[1]
                    let itemDateRange = this.getDates(startDate, stopDate)
                    dateRangeVal.forEach(date => {
                        if (itemDateRange.includes(date) && !this.filteredBillingPeriodData.includes(parent)) {
                            this.filteredBillingPeriodData.push(parent);
                        }
                        else if (!itemDateRange.includes(date) && this.filteredBillingPeriodData.includes(parent)) {
                            let idxOfelm = this.filteredBillingPeriodData.indexOf(parent);
                            this.filteredBillingPeriodData.splice(idxOfelm, 1)
                        }
                    })
                })
            }
        }
        else {
            this.filteredBillingPeriodData = [];
        }
        this.getCommonAndFilter();
    }

    // filter data based on Arrived time
    filterByArrivedTime(dateTime) {
        if(dateTime.length > 0 && this.arrivedTimeInput.value.length > 0){
            if(this.allArrivedTimeElements.length>0){
                this.allArrivedTimeElements.forEach(item => {
                    let parent = item.closest("[data-filter='row']");
                    if(item.textContent.includes(dateTime) && !this.filteredArrivedTimeData.includes(parent)){
                        this.filteredArrivedTimeData.push(parent);
                    }
                    else if (!item.textContent.includes(dateTime) && this.filteredArrivedTimeData.includes(parent)) {
                        let idxOfelm = this.filteredArrivedTimeData.indexOf(parent);
                        this.filteredArrivedTimeData.splice(idxOfelm, 1)
                    }
                })
            }
        }
        else{
            this.filteredArrivedTimeData = [];
        }
        this.getCommonAndFilter();
    }

    getCommonAndFilter() {
        this.filteredArray = [];
        if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, pIdData, nameData, dateRange, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredBillingPeriodData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, pIdData, dateRange, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length > 0) {
            // console.log("idData, nameData, dateRange, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientNameData.includes(item) && this.filteredIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length > 0) {
            // console.log("pIdData, nameData, dateRange, ArrivedTime")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredBillingPeriodData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, DateRAnge, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredBillingPeriodData.includes(item) && this.filteredIdData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length> 0) {
            // console.log("nameData, dateRange, ArrivedTime")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredBillingPeriodData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length> 0) {
            // console.log("pIdData, dateRange, ArrivedTime")
            this.filteredBillingPeriodData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, pIdData, nameData, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, pIdData, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredIdData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("idData, nameData, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientNameData.includes(item) && this.filteredIdData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("pIdData, nameData, ArrivedTime")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("IdData, ArrivedTime")
            this.filteredIdData.forEach(item => {
                if (this.filteredIdData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })

        }
        else if (this.filteredPatientIdData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("pIdData, ArrivedTime")
            this.filteredPatientIdData.forEach(item => {
                if(this.filteredArrivedTimeData.includes(item) && this.filteredPatientIdData.includes(item) && !this.filteredArray.includes(item)){
                    this.filteredArray.push(item)
                }
            })

        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("nameData, ArrivedTime")
            this.filteredPatientNameData.forEach(item => {
                if(this.filteredPatientNameData.includes(item) && this.filteredArrivedTimeData.includes(item) && !this.filteredArray.includes(item)){
                    this.filteredArray.push(item)
                }
            })

        }
        else if (this.filteredBillingPeriodData.length > 0 && this.filteredArrivedTimeData.length>0) {
            // console.log("daterange, ArrivedTime")
            this.filteredBillingPeriodData.forEach(item =>{
                if(this.filteredArrivedTimeData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)){
                    this.filteredArray.push(item)
                }
            })

        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("idData, pIdData, nameData, dateRange")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("idData, pIdData, dateRange")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("idData, nameData, dateRange")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientNameData.includes(item) && this.filteredIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("pIdData, nameData, dateRange")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("idData, DateRAnge")
            this.filteredIdData.forEach(item => {
                if (this.filteredBillingPeriodData.includes(item) && this.filteredIdData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("nameData, dateRange")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredBillingPeriodData.includes(item) && this.filteredPatientNameData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientIdData.length > 0 && this.filteredBillingPeriodData.length > 0) {
            // console.log("pIdData, dateRange")
            this.filteredBillingPeriodData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredBillingPeriodData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredPatientNameData.length > 0) {
            // console.log("idData, pIdData, nameData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0) {
            // console.log("idData, pIdData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredIdData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientNameData.length > 0) {
            // console.log("idData, nameData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientNameData.includes(item) && this.filteredIdData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredPatientIdData.length > 0) {
            // console.log("pIdData, nameData")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && !this.filteredArray.includes(item)) {
                    this.filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0) {
            // console.log("IdData")
            this.filteredArray = this.filteredIdData;

        }
        else if (this.filteredPatientIdData.length > 0) {
            // console.log("pIdData")
            this.filteredArray = this.filteredPatientIdData

        }
        else if (this.filteredPatientNameData.length > 0) {
            // console.log("nameData")
            this.filteredArray = this.filteredPatientNameData

        }
        else if (this.filteredBillingPeriodData.length > 0) {
            // console.log("only date range")
            this.filteredArray = this.filteredBillingPeriodData

        }
        else if (this.filteredArrivedTimeData.length > 0) {
            // console.log("only date with time range")
            this.filteredArray = this.filteredArrivedTimeData

        }
        else {
            // this.filteredArray = this.allRows;
            this.checkInputsVal()
        }
        // console.log(this.filteredArray)
        this.hideAndShowRows(this.filteredArray)
    }
    // function to show and hide rows.
    hideAndShowRows(filteredArray) {
        if (this.allRows.length > 0) {
            this.allRows.forEach(row => {
                if (!filteredArray.includes(row)) {
                    row.classList.add("hide")
                } else {
                    row.classList.remove("hide")
                }
            })
        }
    }

    // function to generates range of dates.
    getDates(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            let data = dt.toLocaleDateString('en-us', {
                weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
            })
            let dateArr = data.replace(" ", "").split(",")
            let year = dateArr[2]
            let month = dateArr[1].split(" ")[0]
            let day = dateArr[1].split(" ")[1]
            arr.push(`${day} ${month},${year}`);
        }
        return arr;
    };

    // function to check inputs and reset data
    checkInputsVal(){
        if(!this.idInput.value.length>0 && !this.patientIdInput.value.length > 0 && !this.patientNameInput.value.length >0 && !this.billingPeriodInput.value.length > 0 && !this.arrivedTimeInput.value.length > 0){
            this.filteredArray = this.allRows;
            this.hideAndShowRows(this.filteredArray)
        }
    }
}

new SEARCHFILTERS;