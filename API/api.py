from flask import Flask, jsonify
import pymongo
import os

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://adminadmin:adminadmin@cluster0.cprsa.mongodb.net/BDatProject?retryWrites=true&w=majority")
db = client["Bdat1004FinalProject"]["FinalProject"]


def get_all_movies():
    return list(db.find({}))


@app.route("/")
def index():
    movies = get_all_movies()

    return jsonify({"movies":movies})


@app.route("/movies/<id>")
def get_movie(id):
    movie = db.find_one({'_id':id})
    return jsonify({"movie":movie})

@app.route("/movies/revenue_by_year")
def revenue_by_year():
    movies =  get_all_movies()
    release_year_count = {}

    for movie in movies:
        release_year = list(str(movie['release_year']-1))
        release_year[-1] = 1
        release_year = ''.join(map(str, release_year))

        movie_revenue = movie['revenue']
        if movie_revenue == None:
            movie_revenue = 0
        

        if release_year in release_year_count:
            release_year_count[release_year] += movie_revenue
        else:
            release_year_count[release_year] = movie_revenue
    

    
    return jsonify(release_year_count)

@app.route("/movies/release_year_count")
def ratings_count():
    movies =  get_all_movies()
    release_year_count = {}

    for movie in movies:
        release_year = list(str(movie['release_year']-1))
        release_year[-1] = 1
        release_year = ''.join(map(str, release_year))
        

        if release_year in release_year_count:
            release_year_count[release_year] +=1
        else:
            release_year_count[release_year] = 1
    

    
    return jsonify(release_year_count)


@app.route('/movies/movie_count_by_title_length')
def movies_count_by_title_length():
    movies = get_all_movies()
    title_length_count = {}

    for movie in movies:
        title_length = len(movie['movie_name'].split(' '))
        if title_length in title_length_count:
            title_length_count[title_length] +=1
        else:
            title_length_count[title_length] = 1

    return title_length_count


@app.route('/movies/total_revenue_by_title_length')
def total_revenue_by_title_length():
    movies = get_all_movies()
    revenue_by_length = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0,
        13:0
    }

    for movie in movies:
        title_length = len(movie['movie_name'].split(' '))
        movie_revenue = movie['revenue']
        if movie_revenue == None:
            movie_revenue = 0
        
        revenue_by_length[title_length] += movie_revenue

    return jsonify(revenue_by_length)



@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

