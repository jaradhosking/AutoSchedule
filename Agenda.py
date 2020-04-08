class Agenda():
    def __init__(self, start, end):
        #Course.__init__(self, subject, numID) #should maybe use super() instead of Course
        self.start = start
        self.end = end
        '''
        plan here is to have start/end be ticks from 12:00 AM Monday
        '''