from Agenda import Agenda
from Course import Course
from Professor import Professor
from Schedule import Schedule
from Section import Section

chau = Professor("Duen Chao", 3.97, {"CX4242":3.97},1.00,1)
CX4242 = Course("CX",4242,3,3.79)
c123456 = Section(123456,CX4242,chau,"Klaus",[Agenda("T","1630","1745")])
print(c123456.course.ID)
print(c123456.professor.name)
print(c123456.GPA)
shed = Schedule()
shed.addSection(c123456)
for sec in shed.sections:
    print(sec.CRN)
print(shed.GPA)
print(shed.occupied[0].start)
print(shed.occupied[0].end)



def find_rc_options(rc):
    '''Finds all possible schedule combinations of the required courses

    Parameters:
    rc (Course[]): list of the required courses

    Returns:
    Schedule[]: list of schedules with the required courses

    '''
    #notimplemented




def find_credit_hour_options(rc,oc,ch_min,ch_max):
    '''Finds all possible course combinations of the optional courses

    Parameters:
    rc (Course[]): list of the required courses
    oc (Course[]): list of the optional courses
    ch_min (int): minimum number of credit hours
    ch_max (int): maximum number of chredit hours

    Returns:
    Course[][]: list of lists with possibile optional course combinations

    '''
    #notimplemented



def find_oc_options(schedules,oc_comb):
    '''Finds all possible schedule combinations of the required and optional courses

    Parameters:
    schedules (Schedule[]): list of valid schedules
    oc_comb (Course[]): list of courses

    Returns:
    Schedule[]: list of schedules with the required and optional courses

    '''
    #notimplemented




def merge_schedules(*argv):
    '''Merges lists of schedules into one list of schedules, removing duplicates

    Parameters:
    *argv (Schedule[]): list of valid schedules

    Returns:
    Schedule[]: list of valids schedules

    '''
    #notimplemented