// lib/fetchRSS.ts
import Parser from "rss-parser";

const parser = new Parser({
  requestOptions: {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    timeout: 10000,
  },
});

export interface FeedItem {
  title: string;
  link: string;
  image: string;
  pubDate: string;
  source: string;
}

interface FeedInfo {
  url: string;
  name: string;
}

// Only working RSS feeds with proper images
const RSS_FEEDS: FeedInfo[] = [
  { url: "https://www.motorbeam.com/category/cars/feed/", name: "Motor Beam" },
  { url: "https://www.indiacarnews.com/news/feed/", name: "IndiaCar News" },
  { url: "https://www.team-bhp.com/rss-feed", name: "Team-BHP" },
];

export async function fetchTrendingRSS(limit = 8): Promise<FeedItem[]> {
  let combinedFeed: FeedItem[] = [];

  for (const feedInfo of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedInfo.url);

      const items: FeedItem[] = feed.items.slice(0, 4).map((item: any) => {
        let image = "";

        // Robust image extraction
        if (item.enclosure?.url) image = item.enclosure.url;
        else if (item["media:content"]?.url) image = item["media:content"].url;
        else if (item["content:encoded"]) {
          const match = item["content:encoded"].match(/<img[^>]+src="([^">]+)"/);
          if (match && match[1]) image = match[1];
        } else if (item.content) {
          const match = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (match && match[1]) image = match[1];
        }

        return {
          title: item.title || "",
          link: item.link || "#",
          image,
          pubDate: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString()
            : "",
          source: feedInfo.name,
        };
      });

      combinedFeed.push(...items);
    } catch (e) {
      console.warn(`Failed to fetch RSS feed: ${feedInfo.name}`, e);
    }
  }

  return combinedFeed.slice(0, limit);
}
