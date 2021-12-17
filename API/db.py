#!/usr/bin/env python
# coding: utf-8

# In[9]:

 
import requests       
from bs4 import BeautifulSoup
import pymongo
import uuid
import schedule
import re 
import time


client = pymongo.MongoClient("mongodb+srv://adminadmin:adminadmin@cluster0.cprsa.mongodb.net/BDatProject?retryWrites=true&w=majority")
db = client["Bdat1004FinalProject"]
collection = db["FinalProject"]

Movie_name = []
Year = []
Time = []
Rating = []
Metascore = []
Votes = []
Gross_revenue = []

def insert_into_db():
    for i in range(0, len(Movie_name)):
        

            current_movie = {
                '_id': str(uuid.uuid1()),
                'movie_name': Movie_name[i],
                'release_year': int(re.sub("[^0-9]", "", Year[i])),
                'duration': int(Time[i]),
                'rating': float(Rating[i]),
                'score': (int(Metascore[i]) if Metascore[i] else None),
                'total_votes': int(re.sub("[^0-9]", "", Votes[i])),
                'revenue': (float(Gross_revenue[i]) if Gross_revenue[i] else None)

            }

            print(current_movie)
            collection.insert_one(current_movie)

def scrape_IMDB():

    url = 'https://www.imdb.com/search/title/?user_rating=1.0,10.0&groups=top_1000&sort=user_rating,desc&count=250'

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')


    


    Data = soup.findAll('div', attrs= {'class': 'lister-item mode-advanced'})


    for i in Data:
        n = i.h3.a.text
        Movie_name.append(n)

        release_year = i.h3.find('span', class_ = 'lister-item-year text-muted unbold').text.replace('(', '').replace(')', '')
        Year.append(release_year)

        Duration = i.p.find('span', class_ = 'runtime').text.replace(' min', '')
        Time.append(Duration)

        rating = i.find('div', class_ = 'inline-block ratings-imdb-rating').text.replace('\n', '')
        Rating.append(rating)

        score  = i.find('span', class_ = 'metascore').text.replace(' ', '') if i.find('span', class_ = 'metascore') else None
        Metascore.append(re.sub("[^0-9]","", score) if score else None)

        value = i.find_all('span', attrs = {'name': 'nv'})

        total_vote = value[0].text
        Votes.append(total_vote)

        Revenue = value[1].text if len(value) >1 else None
        Gross_revenue.append(re.sub("[^0-9.]","",Revenue) if Revenue else None)


    insert_into_db()


    

schedule.every(1440).minutes.do(scrape_IMDB)

while True:
    schedule.run_pending()
    time.sleep(1)







# In[ ]:




