import Agenda from 'Agenda.js'
import Course from 'Course.js'
import * from 'CustomErrors.js'
import Professor from 'Professor.js'
import Schedule from 'Schedule.js'
import Section from 'Section.js'

function find_valid_schedules(course_list, valid_schedules) {
    /*Finds all possible schedule combinations of the courses in course_list
    All courses in the list will be in each schedule

    Parameters:
    course_list (Course[]): list of the Courses to be put into the schedules
    valid_schedules (Sections[]): list of valid Schedules

    Returns:
    Schedule[]: list of schedules with the required courses
    */
    new_schedules = []
    if course_list.length == 0:
        return valid_schedules
    course = course_list.pop()
    if valid_schedules.length == 0:
        course.sections.forEach(section =>
            new_schedule = new Schedule
            new_schedule.addSection(section)
            new_schedules.append(new_schedule)
        )
    else:
        valid_schedules.forEach(schedule =>
            course.sections.foreach(section =>
                new_schedule = copy.deepcopy(schedule)
                try:
                    new_schedule.addSection(section)
                    new_schedules.append(new_schedule)
                except ScheduleError:
                    pass
                except:
                    print("Error in find_rc_options()")
            )
        )
}



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
        for schedule in valid_schedules:
            for section in course.sections:
                new_schedule = copy.deepcopy(schedule)
                try:
                    new_schedule.addSection(section)
                    new_schedules.append(new_schedule)
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
    ch_range (list): range(minimum,maximum+1) of number of credit hours to be taken

    Returns:
    Course[][]: list of lists with possible optional course combinations

    '''
    rc_ch = 0
    for rc in rcl:
        rc_ch += rc.creditHours

    valid_combinations = []
    for i in range(len(ocl)):
        combs = combinations(ocl,i + 1)
        for comb in combs:
            creditHours = 0
            for course in comb:
                creditHours += course.creditHours
            if creditHours + rc_ch in ch_range:
                valid_combinations.append(list(comb))
    return valid_combinations



def merge_schedules(*argv):
    '''Merges lists of schedules into one list of schedules, removing duplicates

    Parameters:
    *argv (Schedule[]): list of valid schedules

    Returns:
    Schedule[]: list of valid schedules

    '''
    #NOTE--PROBABLY DO NOT HAVE  TO IMPLEMENT THIS.  WILL FIND OUT IN TESTING
    #notimplemented




def rank_schedules(*argv):
    '''Ranks lists of schedules into one list of schedules, removing duplicates

    Parameters:
    *argv (Schedule[]): list of valid schedules

    Returns:
    Schedule[]: list of valid schedules

    '''
    #notimplemented




def schedulize(rcl,ocl,ch_range):
    '''Finds all possible course combinations of the optional courses

    Parameters:
    rcl (Course[]): list of the required courses
    ocl (Course[]): list of the optional courses
    ch_range (list): range(minimum,maximum+1) of number of credit hours to be taken

    Returns:
    Course[][]: list of lists with possible optional course combinations

    '''
    vs = find_valid_schedules(rcl,[])
    vcl = find_credit_hour_options(rcl,ocl,ch_range)
    new_vs = []
    for vc in vcl:
        for new_sched in find_valid_schedules(vc,vs):
            new_vs.append(new_sched)
    return new_vs




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
foley = Professor("Robert Foley",3.33, {"ISYE2027":2.89},3.8,36)
CX4242 = Course("CX",4242,3,3.79)
ISYE2027 = Course("ISYE",2027,3,2.86)
s12345 = Section(12345,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1630","1745")])
s12346 = Section(12346,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1748","1749")])
s12347 = Section(12347,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1600","1631")])
s31564 = Section(31564,ISYE2027,foley,'atlanta',"MRDC",[Agenda("T","0800","0915"),Agenda("R","0800","0915")])
s80430 = Section(80430,ISYE2027,foley,'atlanta',"IC",[Agenda("T","0800","0915"),Agenda("R","0800","0915")])
s83339 = Section(83339,ISYE2027,foley,'atlanta',"IC",[Agenda("T","1230","1745"),Agenda("W","1230","1345")])
'''some testing cases
print(s12345.course.ID)
print(s12346.professor.name)
print(s12347.GPA)
shed = Schedule()
shed.addSection(s12345)
shed.addSection(s12346)
shed.addSection(s12347)
for sec in shed.sections:
    print(sec.CRN)
print(shed.GPA)
print(shed.occupied[0].start)
print(shed.occupied[0].end)
print(CX4242.sections)
yeet = find_valid_schedules([CX4242],[])
print(yeet)
for shed in yeet:
    print(shed)
    for section in shed.sections:
        print(section.course.ID)
        print(section.timeSlots)
print(find_credit_hour_options([],[CX4242],range(0,5)))
'''
rcl = []
ocl = [CX4242,ISYE2027]
ch_range = range(0,9)

print(schedulize(rcl,ocl,ch_range))