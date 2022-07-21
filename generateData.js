class GENERATEDATA {
    constructor(data, name) {
        this.data = data;
        this.name = name;
        this.init();
    }

    init() {
        this.setDataTocookie();
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

        if (o.hasOwnProperty("max")) {
            if (o.hasOwnProperty("min")) {
                o.data = this.randomIntFromInterval(o.min, o.max)
            }
        }

        return o;
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
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
                min: 3,
                max: 8,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 10,
                max: 50,
            }
        },
        chartOneDataPoints: {
            byDay: [],
            byWeek: [],
        },
        chartTwoDataPoints: [],
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
                min: 3,
                max: 8,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 10,
                max: 50,
            }
        },
        chartOneDataPoints: {
            byDay: [],
            byWeek: [],
        },
        chartTwoDataPoints: [],
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
                min: 3,
                max: 8,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 10,
                max: 50,
            }
        },
        chartOneDataPoints: {
            byDay: [],
            byWeek: [],
        },
        chartTwoDataPoints: [],
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
                min: 3,
                max: 8,
            }
        },
        ThroughputPerHour: {
            transactions: {
                min: 233,
                max: 600,
            },
            avgMinTransctions: {
                min: 10,
                max: 50,
            }
        },
        chartOneDataPoints: {
            byDay: [0,1,2,3,4,5,6,7,],
            byWeek: [0,1,2,3,4,5,6,7,]
        },
        chartTwoDataPoints: [0,1,2,3,4,5,6,7,],
    },
}
new GENERATEDATA(AnalyticsData, "AnalyticsData")