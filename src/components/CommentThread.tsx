import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

// Types
interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

interface CommentType {
  id: string;
  user: UserProfile;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: CommentType[];
}

// Mock current user (replace with actual auth context in a real app)
const MOCK_CURRENT_USER: UserProfile = {
  id: 'user_current_123',
  name: 'Current User',
  avatarUrl: 'https://ui.shadcn.com/avatars/01.png', // Placeholder avatar
};

// Mock initial comments (replace with API call in a real app)
const MOCK_INITIAL_COMMENTS: CommentType[] = [
  {
    id: 'comment_1',
    user: { id: 'user_a', name: 'Alice Wonderland', avatarUrl: 'https://ui.shadcn.com/avatars/02.png' },
    text: 'Great video! Really enjoyed the content. This platform looks amazing and the video player is smooth.',
    timestamp: '2 hours ago',
    likes: 15,
    dislikes: 1,
    replies: [
      {
        id: 'reply_1_1',
        user: { id: 'user_b', name: 'Bob The Builder', avatarUrl: 'https://ui.shadcn.com/avatars/03.png' },
        text: 'I agree, this was very informative! The creator did a fantastic job.',
        timestamp: '1 hour ago',
        likes: 5,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: 'comment_2',
    user: { id: 'user_c', name: 'Charlie Brown', avatarUrl: 'https://ui.shadcn.com/avatars/04.png' },
    text: 'Could you make a follow-up on advanced streaming techniques? That would be super helpful for aspiring creators.',
    timestamp: '3 hours ago',
    likes: 8,
    dislikes: 0,
    replies: [],
  },
];

interface CommentItemProps {
  comment: CommentType;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReplySubmit: (parentId: string, replyText: string) => void;
  level?: number; 
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike, onDislike, onReplySubmit, level = 0 }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyAction = () => {
    if (replyText.trim()) {
      onReplySubmit(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className={`flex space-x-2 sm:space-x-3 ${level > 0 ? 'ml-6 sm:ml-10' : ''} py-4`}>
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm">{comment.user.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 whitespace-pre-wrap">{comment.text}</p>
        <div className="flex items-center space-x-1 sm:space-x-3 mt-2 text-xs">
          <Button variant="ghost" size="sm" onClick={() => onLike(comment.id)} className="p-1 h-auto text-gray-600 dark:text-gray-400 hover:text-blue-500">
            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> {comment.likes > 0 && comment.likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDislike(comment.id)} className="p-1 h-auto text-gray-600 dark:text-gray-400 hover:text-red-500">
            <ThumbsDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> {comment.dislikes > 0 && comment.dislikes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowReplyInput(!showReplyInput)} className="p-1 h-auto text-gray-600 dark:text-gray-400">
            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> Reply
          </Button>
        </div>
        {showReplyInput && (
          <div className="mt-3 flex space-x-2 sm:space-x-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={MOCK_CURRENT_USER.avatarUrl} alt={MOCK_CURRENT_USER.name} />
                <AvatarFallback>{MOCK_CURRENT_USER.name.substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`Replying to ${comment.user.name}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 text-sm mb-2"
                rows={2}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setShowReplyInput(false)}>Cancel</Button>
                <Button onClick={handleReplyAction} size="sm" disabled={!replyText.trim()}>
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Reply</span>
                    <span className="sm:hidden">Post</span>
                </Button>
              </div>
            </div>
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className={`mt-3 ${level === 0 ? 'border-l-2 border-gray-200 dark:border-gray-700' : ''} pl-0`}>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                onDislike={onDislike}
                onReplySubmit={onReplySubmit}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentThread: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    console.log('CommentThread loaded');
    // Simulate fetching comments
    setComments(MOCK_INITIAL_COMMENTS);
  }, []);

  const findCommentAndUpdate = (
    items: CommentType[],
    commentId: string,
    updateFn: (comment: CommentType) => CommentType
  ): CommentType[] => {
    return items.map(item => {
      if (item.id === commentId) {
        return updateFn(item);
      }
      if (item.replies && item.replies.length > 0) {
        return { ...item, replies: findCommentAndUpdate(item.replies, commentId, updateFn) };
      }
      return item;
    });
  };

  const handleLike = (commentId: string) => {
    setComments(prevComments =>
      findCommentAndUpdate(prevComments, commentId, c => ({ ...c, likes: c.likes + 1 }))
    );
  };

  const handleDislike = (commentId: string) => {
     setComments(prevComments =>
      findCommentAndUpdate(prevComments, commentId, c => ({ ...c, dislikes: c.dislikes + 1 }))
    );
  };
  
  const addReplyToComment = (
    items: CommentType[],
    parentId: string,
    reply: CommentType
  ): CommentType[] => {
    return items.map(item => {
      if (item.id === parentId) {
        return { ...item, replies: [reply, ...item.replies] }; 
      }
      if (item.replies && item.replies.length > 0) {
        return { ...item, replies: addReplyToComment(item.replies, parentId, reply) };
      }
      return item;
    });
  };

  const handlePostReply = (parentId: string, replyText: string) => {
    const newReply: CommentType = {
      id: `reply_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: MOCK_CURRENT_USER,
      text: replyText,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setComments(prevComments => addReplyToComment(prevComments, parentId, newReply));
  };

  const handlePostNewComment = () => {
    if (newCommentText.trim()) {
      const newComment: CommentType = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        user: MOCK_CURRENT_USER,
        text: newCommentText,
        timestamp: 'Just now',
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setComments(prevComments => [newComment, ...prevComments]);
      setNewCommentText('');
    }
  };

  const getTotalCommentsCount = (items: CommentType[]): number => {
    let count = 0; // Only count items if they exist
    if (!items) return 0;
    count = items.length;
    for (const item of items) {
      if (item.replies && item.replies.length > 0) {
        count += getTotalCommentsCount(item.replies);
      }
    }
    return count;
  };
  const totalComments = getTotalCommentsCount(comments);

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-2 sm:px-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        {totalComments} Comment{totalComments !== 1 ? 's' : ''}
      </h2>
      
      <div className="flex space-x-2 sm:space-x-3 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={MOCK_CURRENT_USER.avatarUrl} alt={MOCK_CURRENT_USER.name} />
          <AvatarFallback>{MOCK_CURRENT_USER.name.substring(0,1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="mb-2 text-sm"
            rows={2}
          />
          <div className="flex justify-end">
            {newCommentText && (
                 <Button variant="ghost" size="sm" onClick={() => setNewCommentText('')} className="mr-2">
                    Cancel
                 </Button>
            )}
            <Button onClick={handlePostNewComment} disabled={!newCommentText.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Comment
            </Button>
          </div>
        </div>
      </div>
      
      <Separator className="mb-2 sm:mb-4" />

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <CommentItem
              comment={comment}
              onLike={handleLike}
              onDislike={handleDislike}
              onReplySubmit={handlePostReply}
            />
            {index < comments.length - 1 && <Separator className="my-0" />} 
          </React.Fragment>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
};

export default CommentThread;