from Course import Course
from Section import Section
from Professor import Professor
#from Schedule import Schedule

chau = Professor("Duen Chao", 3.97, {"CX4242":3.97},1.00,1)
CX4242 = Course("CX",4242,3.79)
c123456 = Section(123456,CX4242,chau)
print(c123456.course.ID)
print(c123456.professor.name)
print(c123456.GPA)