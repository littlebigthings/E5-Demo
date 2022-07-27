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
                dateFormat: "M d, Y h:i K",
                enableTime: true,
            });
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
                console.log(dateStr)
            })

            this.dateWithTimeRange.config.onClose.push((selectedDates, dateStr, instance) => {
                console.log(dateStr)
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
    filterByBillingPeriod(dataRange) {

    }

    // filter data based on Arrived time
    filterByArrivedTime(dateTime) {

    }

    getCommonAndFilter() {
        let filteredArray = [];
        if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0 && this.filteredPatientNameData.length > 0) {
            console.log("idData, pIdData, nameData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && !filteredArray.includes(item)) {
                    filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientIdData.length > 0) {
            console.log("idData, pIdData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredIdData.includes(item) && !filteredArray.includes(item)) {
                    filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0 && this.filteredPatientNameData.length > 0) {
            console.log("idData, nameData")
            this.filteredIdData.forEach(item => {
                if (this.filteredPatientNameData.includes(item) && this.filteredIdData.includes(item) && !filteredArray.includes(item)) {
                    filteredArray.push(item)
                }
            })
        }
        else if (this.filteredPatientNameData.length > 0 && this.filteredPatientIdData.length > 0) {
            console.log("pIdData, nameData")
            this.filteredPatientNameData.forEach(item => {
                if (this.filteredPatientIdData.includes(item) && this.filteredPatientNameData.includes(item) && !filteredArray.includes(item)) {
                    filteredArray.push(item)
                }
            })
        }
        else if (this.filteredIdData.length > 0) {
            console.log("IdData")
            filteredArray = this.filteredIdData;

        }
        else if (this.filteredPatientIdData.length > 0) {
            console.log("pIdData")
            filteredArray = this.filteredPatientIdData

        }
        else if (this.filteredPatientNameData.length > 0) {
            console.log("nameData")
            filteredArray = this.filteredPatientNameData

        }
        else {
            filteredArray = this.allRows;
        }
        // console.log(filteredArray)
        this.hideAndShowRows(filteredArray)
    }

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

}

new SEARCHFILTERS;