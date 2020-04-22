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

def load_classes():
    courses = json.load(open("course_catalog/courses.json"))
    for dept in courses:
        dumm = random.randint(3,5)
        for course_num in courses[dept]:
            dum = random.randint(1,dumm)
            print(f"Sleeping for {dum}")
            time.sleep(dum)
            get_data_for_class(dept+course_num)
            print(f"Gathered data for {dept}{course_num}")

def main():
    load_classes()

if __name__ == "__main__":
    main()