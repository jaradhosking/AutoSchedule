// from math import sqrt
import Professor from "Professor";

console.log(Professor.helloWorld);

// class Section():
//     def __init__(self, CRN, course, professor, campus, building, timeSlots):
//         self.CRN = CRN #int, the CRN of the section
//         self.course = course #Course object
//         self.professor = professor #Professor object
//         self.GPA = professor.avgCourseGPA.get(course.ID,sqrt(professor.avgGPA*course.avgGPA)) #float, expected GPA of this section
//         self.building = building #string, building the section is in
//         self.campus = campus #campus the section is in
//         self.timeSlots = timeSlots #list of Agenda objects
//         course.sections.append(self)

class Section {
    constructor (self, CRN, course, professor, campus, building, timeSlots):
        this.CRN = CRN // int, the CRN of the section
        this.course = course // Course object
        this.professor = professor // Professor object
        this.GPA = professor.avgCourseGPA.get(course.ID,(professor.avgGPA*course.avgGPA) ** (1/2)) // float, expected GPA of this section
        this.building = building // string, building the section is in
        this.campus = campus // campus the section is in
        this.timeSlots = timeSlots // list of Agenda objects
        course.sections.append(self)
}

//     def __eq__(self,obj):
//         return isinstance(obj,Section) and self.CRN == obj.CRN




//     def __str__(self):
//         return "({},{})".format(self.course,self.CRN)




//     def __repr__(self):
//         return self.__str__()
