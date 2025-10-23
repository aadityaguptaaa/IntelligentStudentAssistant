# modules/recommendation.py
import requests
from config import YOUTUBE_API_KEY

def fetch_youtube_videos(topic, max_results=10):
    search_query = f"{topic} explained for students"
    url = (
        f"https://www.googleapis.com/youtube/v3/search"
        f"?part=snippet&type=video&q={search_query}"
        f"&key={YOUTUBE_API_KEY}&maxResults={max_results}"
    )
    response = requests.get(url).json()

    videos = []
    for item in response.get("items", []):
        snippet = item["snippet"]
        title = snippet["title"]
        video_id = item["id"]["videoId"]
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        # Use high-quality thumbnail if available
        thumbnail = snippet.get("thumbnails", {}).get("high", {}).get("url", "")
        videos.append({
            "title": title,
            "url": video_url,
            "channel": snippet.get("channelTitle", "Unknown"),
            "thumbnail": thumbnail
        })
    return videos
