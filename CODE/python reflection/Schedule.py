from Agenda import Agenda
from CustomErrors import *
from Section import Section




class Schedule:
    def __init__(self):
        self.GPA = 0 #float, expected GPA of this Schedule
        self.rmpRanking = 0 #float, average rate my professor ranking of the professors in this Schedule
        self.score = 0 #float, score of the Schedule
        self.creditHours = 0 #int, number of credit hours in this Schedule
        self.sections = [] #list of Sections in this schedule
        self.occupied = [] #list of Agendas (times) occupied in this Schedule




    def __eq__(self,obj):
        return isinstance(obj,Schedule) and set(self.sections) == set(obj.sections)




    def __str__(self):
        return str(self.sections)




    def __repr__(self):
        return self.__str__()




    def addSection(self,section):
        '''Adds a section of a course into this schedule

        Parameters:
        section (Section): section to be added

        Returns:
        Boolean: 1 if successful

        '''
        for occupiedSlot in self.occupied:
            for timeSlot in section.timeSlots:
                if timeSlot.start in occupiedSlot.timeRange:
                    raise ScheduleError("Something is already scheduled here!")
                if timeSlot.end-1 in occupiedSlot.timeRange:
                    raise ScheduleError("Something is already scheduled here!")
        self.sections.append(section)
        self.GPA = (self.GPA * self.creditHours + section.course.creditHours * section.GPA) / (self.creditHours + section.course.creditHours)
        for timeSlot in section.timeSlots:
            self.occupied.append(timeSlot)