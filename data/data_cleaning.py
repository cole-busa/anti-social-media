import pandas as pd

movies = pd.read_csv("raw/movies.csv")
video_games = pd.read_csv("raw/video_games.csv")
tv_shows = pd.read_csv("raw/toptvshow_Cleaned_v2.csv")

movies_cleaned = movies[["original_title", "duration"]]
movies_cleaned = movies_cleaned.rename(columns={"original_title": "Title", "duration": "Runtime"})
movies_cleaned.to_csv("cleaned/movies_cleaned.csv")


video_games_cleaned = video_games[["Title", "Length.All PlayStyles.Median"]]
video_games_cleaned = video_games_cleaned.rename(columns={"Length.All PlayStyles.Median": "Playtime"})
video_games_cleaned["Playtime"] = video_games_cleaned["Playtime"] * 60
video_games_cleaned = video_games_cleaned[video_games_cleaned["Playtime"] != 0]
video_games_cleaned.to_csv("cleaned/video_games_cleaned.csv")

tv_shows["last_season_yr"] = tv_shows["last_season_yr"].fillna(2023)
tv_shows["Runtime"] = (1 + tv_shows["last_season_yr"] - tv_shows["first_season_yr"]) * tv_shows["running_time_min"] * 13
tv_shows_cleaned = tv_shows[["tv_show", "Runtime"]].rename(columns={"tv_show": "Title",})
tv_shows_cleaned.to_csv("cleaned/tv_shows_cleaned.csv")