from bs4 import BeautifulSoup
import requests, random, time, re, json

base_URL = f"http://www.catalog.gatech.edu/"
URL = f"http://www.catalog.gatech.edu/coursesaz/"
resp = requests.get(URL)
soup = BeautifulSoup(resp.text, "lxml")
place = soup.find(attrs = {"id":"right-col"})
depts = place.findAll("li")
data = {}
for dept in depts:
    if (not dept.a) or ("coursesaz" not in dept.a.get("href")):
        print(dept)
        continue
    a = dept.a
    dept = re.search(r"\(([A-z]+)\)", a.text).group()
    data[dept] = []
    r = random.randint(1,4)
    print(f"Sleeping for time {r} ...")
    time.sleep(r)
    print(f"Gathering data for department {dept} ...")
    resp = requests.get(base_URL + a.get("href"))
    soup = BeautifulSoup(resp.text, "lxml")
    courses = soup.findAll(class_ = "courseblocktitle")
    for course in courses:
        text = course.text.strip().replace("\\xc2\\xa0", " ")
        print(text.encode())
        course_id = re.search(r"^[A-z]+\s(.+)\.", text).group()
        data[dept].append(course_id)
with open("course_catalog/courses.txt", "w") as f:
    f.write(str(data))
json.dump(data, open("course_catalog/courses.json", "w"), indent = 4)


    
