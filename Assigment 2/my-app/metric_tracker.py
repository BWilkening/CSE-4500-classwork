import time
from selenium import webdriver
import collections
import csv

def writeToCSV(filename : str, metrics : dict):
    with open(file=filename, mode="w", newline="") as fp:
        #create writer object
        writer = csv.DictWriter(fp, fieldnames=metrics.keys())

    writer.writeheader()
    writer.writerow(metrics)

def main():
    # Initialize browser
    driver = webdriver.Chrome()
    # Navigate to your website 
    driver.get("http://localhost:3000/")
    metrics = collections.defaultdict(list) # (current time : value)

    SAMPLE_SIZE = 10
    count = 0
    # Track presence time 
    start_time = time.time()
    while count < SAMPLE_SIZE:
        presence_time = start_time
        current_time = time.time()
        presence_time = current_time - start_time
        print(f"Presence time: {presence_time} seconds")
        metrics["Presence time (Seconds)"].append (presence_time)
    
        # TIMESTAMP : "Present Time (Seconds)" : Presence Time
        # TIMESTAMP : "Scrolling (Pixels)" : Scroll
        # Track scrolling
        scroll_height = driver.execute_script("return document.body.scrollHeight")  
        current_scroll = driver.execute_script("return window.pageYOffset")
        print(f"Scrolled {current_scroll}/{scroll_height} pixels")
        metrics["Scrolling (Pixels)"].append (current_scroll/scroll_height)
    
        count += 1
        time.sleep(2) 
        
    driver.quit()
    print(metrics)
    writeToCSV("metrics.csv", metrics)

if __name__=="__main__":
    main()