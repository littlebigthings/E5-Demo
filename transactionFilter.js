class SEARCHFILTERS {
    constructor() {
        // elements to filter from.
        this.allIdElements = document.querySelectorAll("[data-filter='id']");
        this.allPatientIdElements = document.querySelectorAll("[data-filter='patient-id']");
        this.allBillingPeriodElements = document.querySelectorAll("[data-filter='date-range']");
        this.allPatientNameElements = document.querySelectorAll("[data-filter='patient-name']");
        this.allArrivedTimeElements = document.querySelectorAll("[data-filter='arrived-time']");
        this.allCurrentStageElements = document.querySelectorAll("[data-filter='current-stage']");
        this.allCurrentStatusElements = document.querySelectorAll("[data-filter='current-status']");

        // elements to add listener
        this.idInput = document.querySelector("[data-search='id']");
        this.patientIdInput = document.querySelector("[data-search='patient-id']");
        this.billingPeriodInput = document.querySelector("[data-search='date-range']");
        this.patientNameInput = document.querySelector("[data-search='patient-name']");
        this.arrivedTimeInput = document.querySelector("[data-search='arrived-time']");

        // variable to store date and time inputs
        this.dateRange = null;
        this.dateWithTimeRange = null;

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
                maxDate:"today",
                mode: "range",
                dateFormat: "d M, Y",
            });
            this.dateWithTimeRange = flatpickr(this.arrivedTimeInput, {
                minDate: "2000-01",
                maxDate:"today",
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
            this.dateRange.config.onClose.push((selectedDates, dateStr, instance) =>{
                console.log(dateStr)
            })

            this.dateWithTimeRange.config.onClose.push((selectedDates, dateStr, instance) =>{
                console.log(dateStr)
            })

        }
    }

    // filter data based on the entered id
    filterById(id) {

    }

    // filter data based on patient id
    filterByPatientId(patientId) {

    }

    // filter data based on patient name
    filterByName(name) {

    }

    // filter data based on billing period
    filterByBillingPeriod(dataRange) {

    }

    // filter data based on Arrived time
    filterByArrivedTime(dateTime) {

    }

}

new SEARCHFILTERS;