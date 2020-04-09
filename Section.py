from math import sqrt

class Section():
    def __init__(self, CRN, course, professor, building, timeSlots):
        #Course.__init__(self, subject, numID)
        self.CRN = CRN #int, the CRN of the section
        self.course = course #Course object
        self.professor = professor #Professor object
        self.GPA = professor.avgCourseGPA.get(course.ID,sqrt(professor.avgGPA*course.avgGPA)) #float, expected GPA of this section
        self.building = building #string, building the section is in
        self.timeSlots = timeSlots #list of Agenda objects




    def __eq__(self,obj):
        return isinstance(obj,Section) and self.CRN == obj.CRN
