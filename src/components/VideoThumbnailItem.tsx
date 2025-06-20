import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from 'lucide-react';

interface VideoThumbnailItemProps {
  videoId: string;
  thumbnailUrl: string;
  videoDuration?: string; // e.g., "12:34"
  title: string;
  channelName: string;
  channelAvatarUrl?: string;
  viewCount: string; // e.g., "1.2M views" or "10,000 views"
  uploadDate: string; // e.g., "2 weeks ago" or "Mar 15, 2024"
}

const VideoThumbnailItem: React.FC<VideoThumbnailItemProps> = ({
  videoId,
  thumbnailUrl,
  videoDuration,
  title,
  channelName,
  channelAvatarUrl,
  viewCount,
  uploadDate,
}) => {
  console.log(`VideoThumbnailItem loaded for video ID: ${videoId}, Title: ${title}`);

  return (
    <Link 
      to={`/video-watch?v=${videoId}`} 
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg" 
      aria-label={`Watch video: ${title}`}
    >
      <Card className="w-full overflow-hidden bg-card border rounded-lg transition-all duration-200 ease-in-out group-hover:shadow-xl group-hover:scale-[1.02] h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-t-lg">
            <img
              src={thumbnailUrl || 'https://via.placeholder.com/320x180?text=Video+Thumbnail'}
              alt={`Thumbnail for ${title}`}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
          </AspectRatio>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
            <PlayCircle className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
          {videoDuration && (
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 pointer-events-none"
            >
              {videoDuration}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <div className="flex items-start space-x-3">
            {channelAvatarUrl && (
              <Avatar className="h-9 w-9 mt-0.5 flex-shrink-0">
                <AvatarImage src={channelAvatarUrl} alt={`${channelName} avatar`} />
                <AvatarFallback>{channelName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            {/* If no avatar, this space will not be taken by an Avatar component */}
            
            <div className="flex-1 min-w-0"> {/* min-w-0 for text truncation within flex */}
              <h3 className="text-sm font-semibold leading-snug text-card-foreground line-clamp-2" title={title}>
                {title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1" title={channelName}>
                {channelName}
              </p>
              <div className="text-xs text-muted-foreground mt-1 flex items-center flex-wrap">
                <span>{viewCount}</span>
                <span className="mx-1.5 text-xs">•</span>
                <span>{uploadDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoThumbnailItem;