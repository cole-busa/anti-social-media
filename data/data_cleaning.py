import pandas as pd

movies = pd.read_csv("raw/movies.csv")
video_games = pd.read_csv("raw/video_games.csv")
tv_shows = pd.read_csv("raw/toptvshow_Cleaned_v2.csv")

movies_cleaned = movies[["original_title", "duration"]]
movies_cleaned = movies_cleaned.rename(columns={"original_title": "title", "duration": "runtime"})
movies_cleaned.to_csv("cleaned/movies_cleaned.csv")


video_games_cleaned = video_games[["Title", "Length.All PlayStyles.Median"]]
video_games_cleaned = video_games_cleaned.rename(columns={"Title": "title", "Length.All PlayStyles.Median": "playtime"})
video_games_cleaned.to_csv("cleaned/video_games_cleaned.csv")

tv_shows["last_season_yr"] = tv_shows["last_season_yr"].fillna(2023)
tv_shows["runtime"] = (tv_shows["last_season_yr"] - tv_shows["first_season_yr"]) * tv_shows["running_time_min"] * 13
tv_shows_cleaned = tv_shows[["tv_show", "runtime"]].rename(columns={"tv_show": "title",})
tv_shows_cleaned.to_csv("cleaned/tv_shows_cleaned.csv")