import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, BarChart2, Eye, ShieldCheck, Clock } from 'lucide-react'; // Added Eye, ShieldCheck, Clock for potential future stats/status

interface CreatorVideoListItemProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  visibility?: 'Public' | 'Private' | 'Unlisted'; // Optional: Video visibility status
  uploadDate?: string; // Optional: Video upload date
  onEdit: (videoId: string) => void;
  onDelete: (videoId: string) => void;
  onViewAnalytics: (videoId: string) => void;
  onPreview?: (videoId: string) => void; // Optional: Preview action
}

const CreatorVideoListItem: React.FC<CreatorVideoListItemProps> = ({
  videoId,
  thumbnailUrl,
  title,
  views,
  likes,
  comments,
  visibility = 'Public',
  uploadDate,
  onEdit,
  onDelete,
  onViewAnalytics,
  onPreview,
}) => {
  console.log('CreatorVideoListItem loaded for video:', title);

  // Helper to format large numbers
  const formatStat = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
      {/* Thumbnail */}
      <div className="w-full sm:w-40 h-24 flex-shrink-0 relative group">
        <img
          src={thumbnailUrl || 'https://via.placeholder.com/160x90?text=Video+Thumbnail'}
          alt={`Thumbnail for ${title}`}
          className="w-full h-full object-cover rounded-md"
        />
        {onPreview && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white"
            onClick={() => onPreview(videoId)}
            aria-label="Preview video"
          >
            <Eye className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Video Info & Stats */}
      <div className="flex-grow space-y-2 min-w-0">
        <h3 className="text-md sm:text-lg font-semibold truncate" title={title}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span>{formatStat(views)} views</span>
          <span>&bull;</span>
          <span>{formatStat(likes)} likes</span>
          <span>&bull;</span>
          <span>{formatStat(comments)} comments</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {visibility && (
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {visibility}
            </span>
          )}
          {uploadDate && (
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" /> {uploadDate}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0 pt-2 sm:pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(videoId)}
          className="w-full sm:w-auto"
        >
          <Edit3 className="mr-1.5 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewAnalytics(videoId)}
          className="w-full sm:w-auto"
        >
          <BarChart2 className="mr-1.5 h-4 w-4" /> Analytics
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(videoId)}
          className="w-full sm:w-auto"
        >
          <Trash2 className="mr-1.5 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default CreatorVideoListItem;