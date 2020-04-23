

function handleClick() {
    resp = ($('form').serializeArray())
    semester = resp[0]["value"]
    req = (resp[1]["value"]).split(",")
    opt = (resp[2]["value"]).split(",")
    ch_min = parseInt(resp[3]["value"],10)
    ch_max = parseInt(resp[4]["value"],10)
    event.preventDefault()
    buildSchedule(semester,req,opt,d3.range(ch_min,ch_max+1))
}


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