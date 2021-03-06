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
    if (course_list.length == 0) {
        return valid_schedules
    }
    course = course_list.pop()
    if (valid_schedules.length == 0) {
        course.sections.forEach(section => {
            new_schedule = new Schedule()
            new_schedule.addSection(section)
            new_schedules.push(new_schedule)
        })
    } else {
        valid_schedules.forEach(schedule => {
            course.sections.forEach(section => {
                new_schedule = _.cloneDeep(schedule)
                try {
                    new_schedule.addSection(section)
                    new_schedules.push(new_schedule)
                }
                catch (ScheduleError) {
                    // ignore and try the next section
                }
            })
        })
    }
    if (new_schedules.length == 0) {
        throw new NoSolutionsError()
    }
    return find_valid_schedules(course_list, new_schedules)
}

function find_credit_hour_options(rcl,ocl,ch_range) {
    /*
    Finds all possible course combinations of the optional courses

    Parameters:
    rcl (Course[]): list of the required courses
    ocl (Course[]): list of the optional courses
    ch_range (list): range(minimum,maximum+1) of number of credit hours to be taken

    Returns:
    Course[][]: list of lists with possible optional course combinations
    */
    rc_ch = 0
    rcl.forEach(rc =>
        rc_ch += rc.creditHours
    )
    valid_combinations = []
    for (let i = 0; i < ocl.length; i++) {
        combs = new Iter(ocl).combinations(i + 1).toArray()
        combs.forEach(comb => {
            creditHours = 0
            comb.forEach(course => {
                creditHours += course.creditHours
            })
            if (ch_range.includes(creditHours + rc_ch)) {
                valid_combinations.push(comb)
            }
        })
    }
    return valid_combinations
}


function rank_schedules(schedules) {
    /*
    Ranks lists of schedules into one list of schedules, removing duplicates

    Parameters:
    *argv (Schedule[]): list of valid schedules

    Returns:
    Schedule[]: list of valid schedules
    */
    return schedules.sort(function(a,b) {
        return b.score - a.score
    })
}

function schedulize(rcl,ocl,ch_range) {
    /*
    Finds all possible course combinations of the optional courses

    Parameters:
    rcl (Course[]): list of the required courses
    ocl (Course[]): list of the optional courses
    ch_range (list): range(minimum,maximum+1) of number of credit hours to be taken

    Returns:
    Course[][]: list of lists with possible optional course combinations
    */
    vs = find_valid_schedules(rcl,[])
    vcl = find_credit_hour_options(rcl,ocl,ch_range)
    new_vs = []
    vcl.forEach( vc =>
        find_valid_schedules(vc,vs).forEach(new_sched=>{
            new_vs.push(new_sched)
        })
    )
    return rank_schedules(new_vs)
}





//////////////////////////////////////////////////////////////////////////////
////////////////////////////////   TESTING    ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*
chau = new Professor("Duen Chao", 3.97, {"CX4242":3.97},1.00,1)
foley = new Professor("Robert Foley",3.33, {"ISYE2027":2.89},3.8,36)
CX4242 = new Course("CX",4242,3,3.79)
ISYE2027 = new Course("ISYE",2027,3,2.86)
s12345 = new Section(12345,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1630","1745")])
s12346 = new Section(12346,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1748","1749")])
s12347 = new Section(12347,CX4242,chau,'atlanta',"Klaus",[Agenda("T","1600","1631")])
s31564 = new Section(31564,ISYE2027,foley,'atlanta',"MRDC",[Agenda("T","0800","0915"),Agenda("R","0800","0915")])
s80430 = new Section(80430,ISYE2027,foley,'atlanta',"IC",[Agenda("T","0800","0915"),Agenda("R","0800","0915")])
s83339 = new Section(83339,ISYE2027,foley,'atlanta',"IC",[Agenda("T","1230","1745"),Agenda("W","1230","1345")])
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

rcl = []
ocl = [CX4242,ISYE2027]
ch_range = range(0,9)

print(schedulize(rcl,ocl,ch_range))
*/