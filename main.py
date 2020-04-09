from Agenda import Agenda
from Course import Course
from CustomErrors import *
from Professor import Professor
from Schedule import Schedule
from Section import Section




def find_valid_schedules(course_list, valid_schedules):
    '''Finds all possible schedule combinations of the courses in course_list
    All courses in the list will be in each schedule

    Parameters:
    course_list (Course[]): list of the Courses to be put into the schedules
    valid_schedules (Sections[]): list of valid Schedules

    Returns:
    Schedule[]: list of schedules with the required courses

    '''
    new_schedules = []
    if len(course_list) == 0:
        return valid_schedules
    course = course_list.pop()
    if len(valid_schedules) == 0:
        for section in course.sections:
            new_schedule = Schedule()
            new_schedule.addSection(section)
            new_schedules.append(new_schedule)
    else:
        for section in course.sections:
            for schedule in valid_schedules:
                try:
                    schedule.addSection(section)
                    new_schedules.append(schedule)
                except ScheduleError:
                    pass
                except:
                    print("Error in find_rc_options()")
    if len(new_schedules) == 0:
        raise NoSolutionsError
    return find_valid_schedules(course_list, new_schedules)





def find_credit_hour_options(rcl,ocl,ch_range):
    '''Finds all possible course combinations of the optional courses

    Parameters:
    rcl (Course[]): list of the required courses
    ocl (Course[]): list of the optional courses
    ch_range (list): Range(minimum,maximum+1) of number of credit hours to be taken

    Returns:
    Course[][]: list of lists with possible optional course combinations

    '''
    combinations_left = False
    for oc in ocl:
        if oc.creditHours in ch_range:
            combinations_left = True
    if !combinations_left:
        return []
    rc_ch = 0
    for required_course in rcl:
        rc_ch += required_course.creditHours
    add_min = ch_min - rc_ch
    add_max = ch_max - rc_ch
    valid_combinations = []





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




def main():
    '''
    not implemented
    '''
    return 1




if __name__ == "__main__":
    main()




##############################################################################
##############################################################################
################################   TESTING    ################################
##############################################################################
##############################################################################

chau = Professor("Duen Chao", 3.97, {"CX4242":3.97},1.00,1)
CX4242 = Course("CX",4242,3,3.79)
c123456 = Section(123456,CX4242,chau,"Klaus",[Agenda("T","1630","1745")])
c123457 = Section(123457,CX4242,chau,"Klaus",[Agenda("T","1748","1749")])
c123458 = Section(123458,CX4242,chau,"Klaus",[Agenda("T","1600","1631")])
'''some testing cases
print(c123456.course.ID)
print(c123456.professor.name)
print(c123456.GPA)
shed = Schedule()
shed.addSection(c123456)
shed.addSection(c123457)
shed.addSection(c123458)
for sec in shed.sections:
    print(sec.CRN)
print(shed.GPA)
print(shed.occupied[0].start)
print(shed.occupied[0].end)
'''
print(CX4242.sections)
yeet = find_valid_schedules([CX4242],[])
print(yeet)
for shed in yeet:
    print(shed)
    for section in shed.sections:
        print(section.course.ID)
        print(section.timeSlots)