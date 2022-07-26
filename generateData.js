import checkCookie from "./checkCookie.js";
class GENERATEDATA {
    constructor(data, name) {
        this.data = data;
        this.name = name;
        this.init();
    }

    init() {
        this.checkForCookie();
    }

    checkForCookie(){
        let haveCookie = checkCookie(this.name);
        if(haveCookie == null)this.setDataTocookie();
    }

    setDataTocookie() {
        let getData = this.generate(this.data)
        let dataToStore = JSON.stringify(getData)
        this.setCookie(this.name, dataToStore, 1);
    }

    generate({ ...o }) {
        for (const key in o) {
            if (typeof o[key] === 'object')
                o[key] = this.generate(o[key])
        }

        if (o.hasOwnProperty("max") && o.hasOwnProperty("min")) {
            o.data = this.randomIntFromInterval(o.min, o.max)
            delete o.max;
            delete o.min;
        }
        if (o.hasOwnProperty("rangeMin") && o.hasOwnProperty("rangeMax") && o.hasOwnProperty("length")) {
            o.chartData = this.randomIntArrayInRange(o.rangeMin, o.rangeMax, o.length)
            delete o.rangeMin;
            delete o.rangeMax;
        }

        return o;
    }

    randomIntFromInterval(min, max) { // min and max included 
        let number = Math.floor(Math.random() * (max - min + 1) + min)
        return number.toLocaleString();
    }

    randomIntArrayInRange(min, max, n = 1) {
        return Array.from(
            { length: n },
            () => Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        localStorage.setItem(name, value)
        document.cookie = name + "=" + ('onlyExp' || "") + expires + "; path=/";
    }

}

const AnalyticsData = {
    Authorizations: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 3500,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    ClaimsSubmission: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 3500,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    EligibilityManagement: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 3500,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    AlertManagement: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 7470,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    MedicareEligibilityAlertMgmt: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 7470,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    'Physician/FacilityNotification': {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 7470,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    OASIStoiQIES: {
        TransactionsCompleted: {
            numberOfTransctionsRange: {
                min: 2000,
                max: 7470,
            },
            percentFromLastRange: {
                min: 10,
                max: 40,
            },
        },
        NeedsInterventions: {
            numberOfTransctionsRange: {
                min: 200,
                max: 400,
            },
            percentFromLastRange: {
                min: 2,
                max: 15,
            },
        },
        haveSaved: {
            hours: {
                min: 50,
                max: 200,
            },
            money: {
                min: 10990,
                max: 12990,
            },
            FTE: {
                min: 2.5,
                max: 6.6,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 1,
                max: 10,
            }
        },
        chartOneDataPoints: {
            byDay:{
                rangeMin: 100,
                rangeMax: 400,
                length: 30,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 30,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
}
const WorkFlowSummeryData = {
    RCD: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    Authorizations: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    ClaimsSubmission: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    EligibilityManagement: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    AlertManagement: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    MedicareEligibilityAlertMgmt: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    'Physician/FacilityNotification': {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
    OASIStoiQIES: {
        scheduled:{
            min: 50,
            max: 150,
        },
        wait:{
            min: 50,
            max: 150,
        },
        inProgress:{
            min: 50,
            max: 150,
        },
        failed:{
            min: 10,
            max: 30,
        },
        needsIntervention:{
            min: 50,
            max: 150,
        },
        completed:{
            min: 100,
            max: 150,
        }
    },
}
new GENERATEDATA(AnalyticsData, "AnalyticsData")
new GENERATEDATA(WorkFlowSummeryData, "WorkflowSummeryData")