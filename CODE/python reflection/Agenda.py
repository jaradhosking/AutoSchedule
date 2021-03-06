class Agenda():
    def __init__(self, dow, start, end):
        if dow == 'U':
            days = 0
        elif dow == 'M':
            days = 1
        elif dow == 'T':
            days = 2
        elif dow == 'W':
            days = 3
        elif dow == 'R':
            days = 4
        elif dow == 'F':
            days = 5
        elif dow == 'S':
            days = 6
        self.start = (days*24*60+int(start[0:2])*60+int(start[2:]))
        self.end = (days*24*60+int(end[0:2])*60+int(end[2:]))
        self.timeRange = range(self.start,self.end)
        '''
        start/end are minutes from 12:00 AM Sunday
        '''




    def __eq__(self,obj):
        return isinstance(obj,Agenda) and self.timeRange == obj.timeRange




    def __str__(self):
        return "({},{})".format(self.start,self.end)




    def __repr__(self):
        return self.__str__()