class Course:
    def __init__(self, subject, numID, avgGPA):
        self.subject = subject
        self.numID = numID
        self.ID = subject + str(numID)
        self.avgGPA = avgGPA
    def __eq__(self,obj):
        return isinstance(obj,Course) and self.ID == obj.ID