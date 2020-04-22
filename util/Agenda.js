class Agenda {
    constructor(dow, start, end) {
        if (dow == 'U') {
            days = 0
        } else if (dow == 'M') {
            days = 1 
        } else if (dow == 'T') {
            days = 2
        } else if (dow == 'W') {
            days = 3
        } else if (dow == 'R') {
            days = 4
        } else if (dow == 'F') {
            days = 5
        } else if (dow == 'S') {
            days = 6
        }
        this.start = (days*24*60+parseInt(start[0:2],10)*60+parseInt(start[2:],10))
        this.end = (days*24*60+parseInt(end[0:2],10)*60+parseInt(end[2:],10))
        this.timeRange = d3.range(this.start,this.end)
        // start/end are minutes from 12:00 AM Sunday
    }

    equals(o) {
        return o instanceof Agenda and this.timeRange == o.timeRange
    }

    toString() {
        return "(" + this.start.toString() + "," + this.end.toString() + ")"
    }
}