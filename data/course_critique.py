# If any of the following imports cause an error execute the following from the command line
#    $pip install bs4
#    $pip install mypy
#    $pip install pandas
#    $pip install requests
#    $pip install html5lib
#    $pip install lxml

# Run this file with the following directory structure
#    - Project
#       - data
#           - course_critique.py
#           - course_critique
#           - rmp
#                - rmp.csv
# File must be ran from the data folder
#    C:/.../data/ python course_critique.py

from bs4 import BeautifulSoup
from typing import *
from pprint import pprint
import pandas as pd
import requests, re, os, random, json, time

def get_data_for_class(class_name : str) -> None:
    '''
    >>> get_data_for_class("CS2316")
    >>> get_data_for_class("CX4242")
    '''
    dept = re.search(r"[A-z]+", class_name).group().upper()
    cid = re.search(r"\d+", class_name).group()
    if dept not in os.listdir("course_critique"):
        os.mkdir("course_critique/" + dept)
    URL = f"https://critique.gatech.edu/course.php?id={class_name}"
    resp = requests.get(URL)
    if resp.status_code != 200:
        print(f"Error occured while retrieving data for class {class_name} \n" + \
              f"Status code returned: {resp.status_code}")
        return None
    class_df, profs_in_class_df = pd.read_html(resp.text)[:2]   
    class_df.drop("Average Marks", axis = 1, inplace = True)
    class_df["Professor"] = "All"
    profs_in_class_df.drop(["Size", "W%"], axis = 1, inplace = True)
    df = pd.concat([class_df, profs_in_class_df], axis = 0, ignore_index = True)
    df.to_json(open(f"course_critique/{dept}/{cid}.json", "w"), orient = "records", indent = 4)
    print(f"File for course {dept}{cid} written to JSON.\n")
    aList = json.load(open(f"course_critique/{dept}/{cid}.json"))
    pprint(aList[:3])
    return [i["Professor"] for i in aList]

def get_data_for_professor(prof):
    if f"{prof}.json" in os.listdir("course_critique/profs"):
        return None
    lname, fname = prof.split(",")
    lname, fname = lname.strip(), re.sub(r"[ -]", "", fname)
    ugly_name = (lname + fname).upper().replace(" ", "")
    URL = f"https://critique.gatech.edu/prof.php?id={ugly_name}"
    resp = requests.get(URL)
    avg_df, all_df = pd.read_html(resp.text)
    try:
        grouped = all_df.groupby("Course").mean().reset_index()
        avg_df.drop("Average Marks", inplace = True, axis = 1)
        grouped.drop("W%", inplace = True, axis = 1)
        avg_df["Course"] = "All"
        df = pd.concat([avg_df, grouped], axis = 0)
        df.to_json(open(f"course_critique/profs/{prof}.json","w"), orient = "records", indent = 4)
        print(f"File for professor {prof} written to JSON.\n")
    except Exception as e:
        print(e)
        print(prof)
        print(ugly_name)

def load_classes():
    # courses = json.load(open("course_catalog/courses.json"))
    # for dept in courses:
    #     dumm = random.randint(3,5)
    #     for course_num in courses[dept]:
    #         dum = random.randint(1,dumm)
    #         print(f"Sleeping for {dum}")
    #         time.sleep(dum)
    #         get_data_for_class(dept+course_num)
    #         print(f"Gathered data for {dept}{course_num}")
    courses = ["CS2316","MATH2603","CS1331","CS1332","ISYE2028","ISYE3232","ECON2100","CS4400","CX4240","CX4242","ISYE4031","MATH1553","ISYE2027","ME1770","CS2110","CS2340", "ECE2020"]
    profs = [get_data_for_class(i) for i in courses]
    for i in profs:
        for j in i:
            if j == "All":
                continue
            k = random.randint(1,3)
            print(f"Sleeping for {k}...")
            time.sleep(k)
            get_data_for_professor(j)

def main():
    load_classes()

if __name__ == "__main__":
    main()