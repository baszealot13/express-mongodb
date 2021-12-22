const moment = require('moment');

class Greeting {
    times = ''
    constructor(now) {
        this.times = parseInt(moment(now).format('H'));
    }

    sayGreeting() {
        if (this.times >= 6 && this.times < 12) {
            return 1;
        } else if (this.times > 12 && this.times < 16) {
            return 2;
        } else if (this.times > 16 && this.times < 21) {
            return 3;
        } else {
            return 4;
        }
    }
}

module.exports = Greeting;