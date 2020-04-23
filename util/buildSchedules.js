// courseCritiqueCourses
// courseCritiqueProfessors
// rmp
// oscar

// class Course {
//     constructor(subject, numID, creditHours, avgGPA) {

// class Section {
//     constructor (CRN, course, professor, campus, building, timeSlots) {

// class Professor {
//     constructor (name, avgGPA, avgCourseGPA, rmp_r, rmp_ss) {

// class Agenda {
//     constructor(dow, start, end) {

function buildSchedule(rcl, ocl, chr) {
    let minCreds = chr[0]
    let maxCreds = chr[1]
    let rCourses = []
    let oCourses = []

    for (let i of rcl) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        avgGPA = 0
        for (j of courseCritiqueCourses[i]) {
            if (j["Professor"] == "All") {
                avgGPA = j["GPA"]
                break
            }
        }
        chr = parseFloat(oscar["fall"][dept][numID][0]["credits"])
        rCourses.push(new Course(dept, numID, chr, avgGPA))
    }
    for (let i of ocl) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        avgGPA = 0
        for (j of courseCritiqueCourses[i]) {
            if (j["Professor"] == "All") {
                avgGPA = j["GPA"]
                break
            }
        }
        chr = parseFloat(oscar["fall"][dept][numID][0]["credits"])
        oCourses.push(new Course(dept, numID, chr, avgGPA))
    }
}
