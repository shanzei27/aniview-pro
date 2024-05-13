# Aniview - a MyAnimeList profile companion
React-Express application

### Currently working features
1. Stats overview
2. Recent activity
3. Anime recommendations
4. Animes rated higher/lower than MAL mean score in your list
### Probable in future
1. Downloadable recent activity
2. MAL heatmap
3. Watched anime episode trend

## How it works
The client uses React with MUI for most of the styling. ~ChartJS for some charts~. API is a Express server listening to client requests which happens once at the start. It fetches data from both official MAL API and the unofficial [Jikan](https://jikan.moe/) API, handles all the processing and returns the data to the client. Fetched data is stored locally in client browser for persistence, until they erase it (using Forget option in site).
