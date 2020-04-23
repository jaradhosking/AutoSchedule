import requests, re, json, random, time, os
from bs4 import BeautifulSoup
from pprint import pprint

# add enrollment and campus 

def get_class_sections(sem, dept, course_num):
    sem = "202008" if sem.lower() == "fall" else "202005"
    URL = f"https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse?term_in={sem}&subj_in={dept}&crse_in={course_num}&schd_in=%"
    resp = requests.get(URL)
    soup = BeautifulSoup(resp.text, "lxml")
    if soup.find("table", attrs = {"summary" : "This layout table holds message information"}):
        print(f"{dept}{course_num} during {sem} not found the following URL..\n{URL}\n\n")
        return None
    credits = re.search(r"(\d?\d?-?\d\d?\.?\d?\d?\d?\d?) Credits", soup.find(class_ = "dddefault").text).groups()[0]
    credits = credits if "-" not in credits else credits.split("-")[0]
    title_headers = soup.findAll(attrs={"class":"ddtitle", "scope":"colgroup"})
    parsed_titles = [parse_titles(i, credits) for i in title_headers]
    details_tables = soup.findAll(attrs={"class":"datadisplaytable", "summary" : "This table lists the scheduled meeting times and assigned instructors for this class.."})
    parsed_tables = [parse_details(i) for i in details_tables]
    return [ dict(i+j) for i, j in zip(parsed_titles, parsed_tables) ]

def parse_details(details_table):
    data = details_table.findAll("tr")[1]
    rows = [i.text for i in data.findAll("td")]
    headers = ["Type","Time","Days","Where","Date Range", "Schedule Type","Instructors"]
    return list(zip(headers, rows))

def parse_titles(header, credits):
    CRN, dept, course_id, section = re.search(r"- (\d+) - ([A-z]{2,})\s+(.+)\s+-\s+(\w+)", header.text).groups()
    return [("CRN", CRN), ("dept",dept), ("course_id",course_id), ("section",section), ("credits", credits)]

def main():
    all_courses = json.load(open("course_catalog/courses.json"))
    for sem in ["summer", "fall"]:
        courses = ["CS2316","MATH2603","CS1331","CS1332","ISYE3030","ISYE3232","ECON2100","CS4400","CX4240","CX4242","ISYE4031","MATH1553","ISYE2027","ME1770","CS2110","CS2340", "ECE2020"]
        for course in courses:
            dept = re.sub(r"\d","",course).strip()
            course_id = course.replace(dept, "").strip()
            if f"{course_id}R" in all_courses[dept]:
                a = random.randint(0,3)
                print(f"Sleeping for {a} ...")
                time.sleep(a)
                data = get_class_sections(sem, dept, f"{course_id}R")
                print(f"Gathered data for {dept}{course_id}R")
                if dept not in os.listdir(f"oscar/{sem}"):
                    os.mkdir(f"oscar/{sem}/{dept}")
                json.dump(data, open(f"oscar/{sem}/{dept}/{course_id}R.json","w"), indent=4)
            a = random.randint(0,3)
            print(f"Sleeping for {a} ...")
            time.sleep(a)
            data = get_class_sections(sem, dept, f"{course_id}")
            print(f"Gathered data for {dept}{course_id}")
            if dept not in os.listdir(f"oscar/{sem}"):
                os.mkdir(f"oscar/{sem}/{dept}")
            json.dump(data, open(f"oscar/{sem}/{dept}/{course_id}.json","w"), indent=4)
            

            
    # data = get_class_sections("fall", "MATH", "1552")
    # pprint(data)
    # data = get_class_sections("summer", "ECON", "2100")
    # pprint(data)

if __name__ == "__main__":
    main()
    
