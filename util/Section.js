

class Section {
    constructor (CRN, course, professor, campus, building, timeSlots) {
        this.CRN = CRN // int, the CRN of the section
        this.course = course // Course object
        this.professor = professor // Professor object
        this.GPA = (professor.avgCourseGPA[course.ID] * professor.avgGPA) ** (1/2) // float, expected GPA of this section
        // this.GPA = professor.avgCourseGPA.get(course.ID,(professor.avgGPA*course.avgGPA) ** (1/2)) // float, expected GPA of this section
        this.building = building // string, building the section is in
        this.campus = campus // campus the section is in
        this.timeSlots = timeSlots // list of Agenda objects
        course.sections.push(this)
    }

    equals (o) {
        return (o instanceof Section) && (this.CRN == o.CRN);
    }

    toString (o) {
        return `(${this.course}, ${this.CRN})`
    }
}
