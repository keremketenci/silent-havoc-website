interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  media_type: string;
  timestamp: string;
}

// Instagram media URLs are signed and expire, so refresh the feed hourly
const REVALIDATE_SECONDS = 60 * 60;

async function getPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${token}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch (error) {
    console.error("Failed to fetch Instagram posts:", error);
    return [];
  }
}

export async function InstagramFeed() {
  const posts = await getPosts();
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {post.media_type === "VIDEO" ? (
            <video
              src={post.media_url}
              controls
              preload="metadata"
              className="w-full h-full object-cover cursor-default md:cursor-none cursor-target"
            />
          ) : (
            // Instagram CDN hosts vary and URLs expire, so next/image is not used here
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.media_url}
              alt={post.caption || "Silent Havoc Instagram post"}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover cursor-default md:cursor-none cursor-target"
            />
          )}
        </a>
      ))}
    </div>
  );
}
