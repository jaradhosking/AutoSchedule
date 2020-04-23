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
// {
//     name : name
//     avgGPA : avgGPA
//     avgCourseGPA : {course1GPA, ...}
//     rmp_r : rating
//     rmp_ss : numRatings
// }

// class Agenda {
//     constructor(dow, start, end) {

function buildSchedule(rcl, ocl, chr) {
    let minCreds = chr[0]
    let maxCreds = chr[1]
    let rCourses = []
    let oCourses = []
    let rProfs = new Set()
    let oProfs = new Set()

    for (let i of rCourses) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        rProfs.add(oscar[dept][numID]["Instructors"][0])
    }

    for (let i of oCourses) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        oProfs.add(oscar[dept][numID]["Instructors"][0])
    }

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
    for (let i of rcl) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
    }

}
