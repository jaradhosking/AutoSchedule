
function createSchedule(schedule) {
    schedule.forEach(section => {
        createCourseBox(section)
    })
}



function createCourseBoxes(section) {
    section.timeSlots.forEach(timeSlot => {
        d3.select('#'+timeSlot.dow)
            .enter()
            .append("li")
            .attr("class","cd-schedule__event")
            .enter()
            .append("a")
            .attr("data-start",timeSlot.startFancy)
            .attr("data-end",timeSlot.startEnd)
            .attr("data-content","event-"+section.course.ID)
            .attr("href","#0")
            .enter()
            .append("em")
            .attr("class","cd-schedule__name")
            .enter()
            .append()
    })
}

                <li class="cd-schedule__event">
                  <a data-start="10:00" data-end="11:00"  data-content="event-isye3103" data-event="event-2" href="#0">
                    <em class="cd-schedule__name">ISYE 3103</em>
                  </a>
                </li>