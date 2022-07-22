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
        }
        if (o.hasOwnProperty("rangeMin") && o.hasOwnProperty("rangeMax") && o.hasOwnProperty("length")) {
            o.chartData = this.randomIntArrayInRange(o.rangeMin, o.rangeMax, o.length)
        }

        return o;
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
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
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

}

const AnalyticsData = {
    RCD: {
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
                length: 20,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 20,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    Authorization: {
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
                length: 20,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 20,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    POT: {
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
                length: 20,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 20,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
    Erma: {
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
                length: 20,
            },
            byWeek:{
                rangeMin: 200,
                rangeMax: 400,
                length: 20,
            }
        },
        chartTwoDataPoints: {
            rangeMin: 0,
            rangeMax: 50,
            length: 11,
        },
    },
}
new GENERATEDATA(AnalyticsData, "AnalyticsData")