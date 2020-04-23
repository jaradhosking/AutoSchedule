


function createSchedule(schedule) {
    var i = 0
    schedule.forEach(section => {
        createCourseBox(section, i)
    })
}



function createCourseBoxes(section, i) {
    section.timeSlots.forEach(timeSlot => {
        d3.select('#'+timeSlot.dow)
            //.enter()
            .append("li")
            .attr("class","cd-schedule__event")
            //.enter()
            .append("a")
            .attr("data-start",timeSlot.startFancy)
            .attr("data-end",timeSlot.startEnd)
            .attr("data-content","event-"+section.course.ID)
            .attr("data-event","event-"+i.toString())
            .attr("href","#0")
            //.enter()
            .append("em")
            .attr("class","cd-schedule__name")
            //.enter()
            .text(section.course.ID)
    })
}