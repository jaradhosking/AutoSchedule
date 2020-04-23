// == does not call .equals
class Professor {
    constructor (name, avgGPA, avgCourseGPA, rmp_r, rmp_ss) {
        this.name = name // string, name of professor
        this.avgGPA = avgGPA // float, average GPA of professor per Course Critique
        this.avgCourseGPA = avgCourseGPA // dictionary, keys are courses, values are professor's avg GPA for that course
        this.rmp_r = rmp_r // float, average rate my professors rating of professor
        this.rmp_ss = rmp_ss // int, number of rate my professors responses
    }
    equals (o) {
        return (o instanceof Professor) && (this.name == o.name);
    }

    toString () {
        return this.name;
    }
}
