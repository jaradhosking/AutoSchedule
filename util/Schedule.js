/*import Agenda from "Agenda.js";
import Section from "Section";*/


class Schedule {
    constructor () {
        this.GPA = 0 // float, expected GPA of this Schedule
        this.rmpRanking = 0 // float, average rate my professor ranking of the professors in this Schedule
        this.score = 0 // float, score of the Schedule
        this.creditHours = 0 // int, number of credit hours in this Schedule
        this.sections = [] // list of Sections in this schedule
        this.occupied = [] // list of Agendas (times) occupied in this Schedule
    }

    equals (o) {
        return (o instanceof Schedule) && ((new Set(this.sections)) == (new Set(obj.sections)));
    }


    toString() {
        return this.sections;
    }

    addSection(section) {
        // '''Adds a section of a course into this schedule

        // Parameters:
        // section (Section): section to be added

        // Returns:
        // Boolean: 1 if successful

        // '''
        for (let occupiedSlot of this.occupied) {
            for (let timeSlot of section.timeSlots) {
                if (occupiedSlot.timeRange.indexOf(timeSlot.start) != -1) {
                    throw new ScheduleError("Something is already scheduled here!");
                }
                if  (occupiedSlot.timeRange.indexOf(timeSlot.end-1) != -1) {
                    throw new ScheduleError("Something is already scheduled here!");
                }
            }
        }
        this.sections.push(section)
        this.GPA = (this.GPA * this.creditHours + section.course.creditHours * section.GPA) / (this.creditHours + section.course.creditHours)
        // if errors, section.timeSlots.forEach()
        for (let timeSlot of section.timeSlots) {
            this.occupied.push(timeSlot)
        }
    }
}
