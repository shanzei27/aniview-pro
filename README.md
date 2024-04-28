# React frontend /w Express server for an MAL profile companion

### The companion aims to serve ~~authorized~~ users with the following features
1. Stats overview
2. Recent activity (downloadable)
3. Anime recommendations
4. Animes rated higher/lower than mean score in your list
5. MAL heatmap*
6. Watched anime episode trend*
(* - considerations for future)

### How it works
The client uses React with MUI for most of the styling. ChartJS for some charts. API is a Express server listening to client requests which happens once at the start. It fetches data from both official MAL API and the unofficial [Jikan](https://jikan.moe/) API, handles all the processing and returns the data to the client.
