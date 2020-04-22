class ScheduleError extends Error {
    constructor(message) {
        super(message);
        this.name = "ScheduleError";
    }
}




class NoSolutionsError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoSolutionsError";
    }
}

/*class ScheduleError(Exception):
    pass




class NoSolutionsError(Exception):
    pass*/