class Course:
    def __init__(self, subject, numID, creditHours, avgGPA):
        self.subject = subject
        self.numID = numID
        self.ID = subject + str(numID)
        self.creditHours = creditHours
        self.avgGPA = avgGPA
        self.sections = []




    def __eq__(self,obj):
        return isinstance(obj,Course) and self.ID == obj.ID




    def __str__(self):
        return self.ID




    def __repr__(self):
        return self.__str__()