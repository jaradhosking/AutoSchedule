class Professor:
    def __init__(self, name, avgGPA, avgCourseGPA, rmp_r, rmp_ss):
        self.name = name #string, name of professor
        self.avgGPA = avgGPA #float, average GPA of professor per Course Critique
        self.avgCourseGPA = avgCourseGPA #dictionary, keys are courses, values are professor's avg GPA for that course
        self.rmp_r = rmp_r #float, average rate my professors rating of professor
        self.rmp_ss = rmp_ss #int, number of rate my professors responses