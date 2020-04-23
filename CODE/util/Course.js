class Course {
    constructor(subject, numID, creditHours, avgGPA) {
        this.subject = subject
        this.numID = numID
        this.ID = subject + numID.toString()
        this.creditHours = creditHours
        this.avgGPA = avgGPA
        this.sections = []
    }
    
    equals(o) {
        return o instanceof Course && this.ID == o.ID
    }

    toString() {
        return this.ID
    }
}