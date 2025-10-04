// components/InstagramFeed.tsx
"use client";

import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  media_type: string;
  timestamp: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/instagram"); // API route path
        if (!res.ok) {
          throw new Error("Failed to fetch Instagram posts");
        }
        const data = await res.json();
        setPosts(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
              className="w-full h-full object-cover cursor-default md:cursor-none cursor-target"
            />
          ) : (
            <img
              src={post.media_url}
              alt={post.caption || "Instagram Post"}
              className="w-full h-full object-cover cursor-default md:cursor-none cursor-target"
            />
          )}
          {/* {post.caption && (
            <p className="p-2 text-sm text-gray-700 truncate">{post.caption}</p>
          )} */}
        </a>
      ))}
    </div>
  );
}
