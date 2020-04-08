from Agenda import Agenda
from Section import Section

class Schedule:
    def __init__(self):
        self.GPA = 0 #expected GPA of this schedule
        self.sections = [] #list of Sections in this schedule
        self.occupied = [] #list of Agendas (times) occupied in this schedule
    def __eq__(self,obj):
        return isinstance(obj,Schedule) and set(self.sections) == set(obj.sections)
    def addSection(section):
        '''Adds a section of a course into this schedule

        Parameters:
        section (Section): section to be added

        Returns:
        Boolean: 1 if successful

        '''
        #notimplemented