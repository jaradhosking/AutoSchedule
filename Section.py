from math import sqrt

class Section():
    def __init__(self, CRN, course, professor, building, agenda):
        #Course.__init__(self, subject, numID) #should maybe use super() instead of Course
        self.CRN = CRN #int, the CRN of the section
        self.course = course #Course object
        self.professor = professor #Professor object
        self.GPA = professor.avgCourseGPA.get(course.ID,sqrt(professor.avgGPA*course.avgGPA)) #float, expected GPA of this section
        self.building = building #string, building the section is in
        self.agenda = agenda #list of Agenda objects
