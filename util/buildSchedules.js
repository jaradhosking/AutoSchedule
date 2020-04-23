// courseCritiqueCourses
// courseCritiqueProfessors
// rmp
// oscar

// class Agenda {
//     constructor(dow, start, end) {

function buildSchedule(sem, rcl, ocl, chr) {
    /*
    sem: semester ("summer", "fall")
    rcl: Required Class List (array)
    ocl: Optional ''
    chr: Credit HouR ([min, max])
    */

    let minCreds = chr[0]
    let maxCreds = chr[1]

    // Creates course objects
    // class Course {
//     constructor(subject, numID, creditHours, avgGPA) {

    let rCourses = []
    let oCourses = []

    if (rcl[0] != "") {
        for (let i of rcl) {
            console.log(i)
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
    }
    if (ocl[0] != "") {
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



    // Finds unique professors
    let rProfs = new Set()
    let oProfs = new Set()

    for (let i of rCourses) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        for (let j of oscar[sem][dept][+numID]) {
            for (let k of j["Instructors"]) {
                rProfs.add(k)
            }
        }
    }

    for (let i of oCourses) {
        numID = /[0-9]+/g.exec(i)[0]
        dept = /[A-Z]+/g.exec(i)[0]
        for (let j of oscar[sem][dept][+numID]) {
            for (let k of j["Instructors"]) {
                oProfs.add(k)
            }
        }
    }

    // class Professor {
    //     constructor (name, avgGPA, avgCourseGPA, rmp_r, rmp_ss) {
    // {
    //     name : name
    //     avgGPA : avgGPA
    //     avgCourseGPA : {course1GPA, ...}
    //     rmp_r : rating
    //     rmp_ss : numRatings
    // }

    let rProfObjects = []
    let oProfObjects = []

    for (let i of rProfs) {
        val = i.split(", ")
        i = [val[1], val[0]].join(", ")
        if (professors[i] == null) {
            rProfObjects.push(new Professor(i, 0, {}, 0, 0))    
        } else {
        rProfObjects.push(new Professor(i, professors[i]["avgGPA"], professors[i]["courses"], professors[i]["numRatings"], professors[i]["score"]))
        }
    }

    for (let i of oProfs) {
        val = i.split(", ")
        i = [val[1], val[0]].join(", ")
        if (professors[i] == null) {
            oProfObjects.push(new Professor(i, 0, {}, 0, 0))    
        } else {
        oProfObjects.push(new Professor(i, professors[i]["avgGPA"], professors[i]["courses"], professors[i]["numRatings"], professors[i]["score"]))
        }
    }

    // Creates section objects
    // class Section {
    //     constructor (CRN, course, professor, campus, building, timeSlots) {
    // class Course {
    //     constructor(subject, numID, creditHours, avgGPA)

    let combinedCourses = rCourses.concat(oCourses)
    let combinedProfs = rProfObjects.concat(oProfObjects)
    let sectionObjects = []
    for (let i of combinedCourses) {
        for (let j of oscar[sem][i.subject][+numID]) {
            // Finds professor object
            let inst = j["Instructors"][0] // Only takes 1st instructor
            for (let k of combinedProfs) {
                if (k.name == inst) {
                    let prof = k
                }
            }
            // Make agenda objects
            // let sec = new Section(j["CRN"], i, k, "Atlanta", j["Where"], )
        }    
    } 
}
