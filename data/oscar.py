import requests, re
from bs4 import BeautifulSoup
from pprint import pprint

# add enrollment and campus 

def get_class_sections(sem, dept, course_num):
    sem = "202008" if sem.lower() == "fall" else "202005"
    URL = f"https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse?term_in={sem}&subj_in={dept}&crse_in={course_num}&schd_in=%"
    resp = requests.get(URL)
    soup = BeautifulSoup(resp.text, "lxml")
    title_headers = soup.findAll(attrs={"class":"ddtitle", "scope":"colgroup"})
    parsed_titles = [parse_titles(i) for i in title_headers]
    details_tables = soup.findAll(attrs={"class":"datadisplaytable", "summary" : "This table lists the scheduled meeting times and assigned instructors for this class.."})
    parsed_tables = [parse_details(i) for i in details_tables]
    return [ dict(i+j) for i, j in zip(parsed_titles, parsed_tables) ]

def parse_details(details_table):
    data = details_table.findAll("tr")[1]
    rows = [i.text for i in data.findAll("td")]
    headers = ["Type","Time","Days","Where","Date Range", "Schedule Type","Instructors"]
    return list(zip(headers, rows))

def parse_titles(header):
    CRN, dept, course_id, section = re.search(r"- (\d+) - ([A-z]{2,})\s+(.+)\s+-\s+(\w+)", header.text).groups()
    return [("CRN", CRN), ("dept",dept), ("course_id",course_id), ("section",section)]

def main():
    data = get_class_sections("fall", "MATH", "1552")
    for i in data:
        print(i["section"].encode())
    # data = get_class_sections("summer", "ECON", "2100")
    # pprint(data)

if __name__ == "__main__":
    main()
    
