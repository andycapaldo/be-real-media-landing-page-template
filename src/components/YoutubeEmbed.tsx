import React from 'react';

interface YouTubeEmbedProps {
  url: string;
}

const getYouTubeVideoId = (url: string): string | null => {
  // Regular expression to capture YouTube video ID from various URL formats
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
