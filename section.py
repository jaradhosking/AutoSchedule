class Section():
    def __init__(self, CRN, course, professor, building, times):
        #Course.__init__(self, subject, numID) #should maybe use super() instead of Course
        self.CRN = CRN #int, the CRN of the section
        self.course = course #Course object
        self.professor = professor #Professor object
        self.GPA = professor.avgCourseGPA.get(course.ID,course.avgGPA)
        self.building = building #Building object
        self.times = times #Times Object
