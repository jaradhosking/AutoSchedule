from Agenda import Agenda
from Section import Section

class Schedule:
    def __init__(self):
        self.GPA = 0 #float, expected GPA of this Schedule
        self.creditHours = 0 #int, number of credit hours in this Schedule
        self.sections = [] #list of Sections in this schedule
        self.occupied = [] #list of Agendas (times) occupied in this Schedule
    def __eq__(self,obj):
        return isinstance(obj,Schedule) and set(self.sections) == set(obj.sections)
    def addSection(self,section):
        '''Adds a section of a course into this schedule

        Parameters:
        section (Section): section to be added

        Returns:
        Boolean: 1 if successful

        '''
        self.sections.append(section)
        self.GPA = (self.GPA * self.creditHours + section.course.creditHours * section.GPA) / (self.creditHours + section.course.creditHours)