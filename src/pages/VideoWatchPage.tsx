import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import VideoPlayer from '@/components/VideoPlayer';
import CommentThread from '@/components/CommentThread';
import VideoThumbnailItem from '@/components/VideoThumbnailItem';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

// Lucide Icons
import { ThumbsUp, ThumbsDown, Share2, Bookmark, UserPlus } from 'lucide-react';

// Placeholder data for the video being watched
const currentVideo = {
  id: 'vid001',
  title: 'Epic Montage: A Decade of Gaming Highlights',
  sources: [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4', quality: '720p' },
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video/mp4', quality: '480p' },
  ],
  poster: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
  views: '2.1M',
  uploadDate: 'Jun 10, 2024',
  likes: '150K',
  channel: {
    id: 'channel_gamerx', // Used for constructing link if needed, App.tsx has /channel
    name: 'GamerXtreme',
    avatarUrl: 'https://ui.shadcn.com/avatars/05.png',
    subscribers: '1.2M',
  },
  description: `Relive the most iconic moments from the past ten years of gaming! This montage features breathtaking clips, hilarious fails, and legendary plays from a variety of titles.
  
Timestamps:
0:00 - Intro
0:45 - Legendary FPS Moments
5:20 - RPG Boss Battles
10:15 - Indie Game Gems
15:00 - Outro & Special Thanks
  
Follow me on social media!
Twitter: @GamerXtreme
Instagram: @GamerXtremeOfficial
  
Thanks for watching! Don't forget to like, subscribe, and hit the bell icon!
#Gaming #Montage #Highlights`,
  tags: ['Gaming', 'Montage', 'Highlights', 'Esports']
};

// Placeholder data for related videos
const relatedVideosData = [
  { videoId: 'rel001', thumbnailUrl: 'https://i.ytimg.com/vi/S4W6k_b0c3g/hqdefault.jpg', title: 'Top 10 Plays of the Week - Episode 52', channelName: 'GamingWeekly', viewCount: '500K views', uploadDate: '3 days ago', videoDuration: '10:05', channelAvatarUrl: 'https://ui.shadcn.com/avatars/02.png' },
  { videoId: 'rel002', thumbnailUrl: 'https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg', title: 'My Setup Tour 2024 - Pro Gamer Gear', channelName: 'TechSource', viewCount: '1.2M views', uploadDate: '1 week ago', videoDuration: '15:22', channelAvatarUrl: 'https://ui.shadcn.com/avatars/03.png' },
  { videoId: 'rel003', thumbnailUrl: 'https://i.ytimg.com/vi/7_n08Y3uYSA/hqdefault.jpg', title: 'Let\'s Play: New Open World RPG Part 1', channelName: 'AdventureLogs', viewCount: '80K views', uploadDate: '1 day ago', videoDuration: '45:10', channelAvatarUrl: 'https://ui.shadcn.com/avatars/04.png' },
  { videoId: 'rel004', thumbnailUrl: 'https://i.ytimg.com/vi/Ptb6T90p_Bo/hqdefault.jpg', title: 'Speedrunning Tips for Beginners', channelName: 'QuickRunner', viewCount: '220K views', uploadDate: '5 days ago', videoDuration: '8:40' },
];

const VideoWatchPage = () => {
  useEffect(() => {
    console.log('VideoWatchPage loaded');
    // In a real application, you would fetch video data based on video ID from the URL.
    // For example, using `useLocation` from `react-router-dom` to get query params:
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const videoId = queryParams.get('v');
    // if (videoId) { /* fetch video data */ }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <ScrollArea className="flex-1 md:ml-64 pt-16"> {/* pt-16 for fixed Header, md:ml-64 for expanded Sidebar */}
          <main className="container mx-auto py-6 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Video Content Area */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                <section aria-labelledby="video-player-section" className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <h2 id="video-player-section" className="sr-only">Video Player</h2>
                  <VideoPlayer
                    sources={currentVideo.sources}
                    poster={currentVideo.poster}
                    title={currentVideo.title}
                    autoplay={false} // Set to true if autoplay is desired
                  />
                </section>

                <section aria-labelledby="video-details-section">
                  <Card>
                    <CardHeader>
                      <h1 id="video-details-section" className="text-xl sm:text-2xl font-bold leading-tight">
                        {currentVideo.title}
                      </h1>
                      <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-2 gap-x-2">
                        <span>{currentVideo.views} views</span>
                        <span>&bull;</span>
                        <span>Uploaded {currentVideo.uploadDate}</span>
                        <Badge variant="secondary" className="ml-auto hidden sm:inline-flex">HD</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-t border-b">
                        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                          <Link to="/channel" aria-label={`View ${currentVideo.channel.name}'s channel`}> {/* Path from App.tsx */}
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                              <AvatarImage src={currentVideo.channel.avatarUrl} alt={currentVideo.channel.name} />
                              <AvatarFallback>{currentVideo.channel.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <Link to="/channel" className="font-semibold hover:underline text-base"> {/* Path from App.tsx */}
                              {currentVideo.channel.name}
                            </Link>
                            <p className="text-xs text-muted-foreground">{currentVideo.channel.subscribers} subscribers</p>
                          </div>
                        </div>
                        <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                          <UserPlus className="mr-2 h-4 w-4" /> Subscribe
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-3">
                        <Button variant="ghost" size="sm" className="flex-grow sm:flex-grow-0">
                          <ThumbsUp className="mr-1.5 h-5 w-5" /> {currentVideo.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-grow sm:flex-grow-0">
                          <ThumbsDown className="mr-1.5 h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-grow sm:flex-grow-0">
                          <Share2 className="mr-1.5 h-5 w-5" /> Share
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-grow sm:flex-grow-0">
                          <Bookmark className="mr-1.5 h-5 w-5" /> Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section aria-labelledby="video-description-section">
                  <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg border" defaultValue="description">
                    <AccordionItem value="description" className="border-none">
                      <AccordionTrigger className="text-base font-semibold hover:no-underline py-2">
                        Video Description
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground whitespace-pre-wrap pt-2 pb-0">
                        {currentVideo.description}
                        {currentVideo.tags && currentVideo.tags.length > 0 && (
                           <div className="mt-4">
                             <p className="font-medium text-card-foreground mb-1">Tags:</p>
                             <div className="flex flex-wrap gap-2">
                               {currentVideo.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                             </div>
                           </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                <section aria-labelledby="video-comments-section">
                  <h2 id="video-comments-section" className="sr-only">Comments</h2>
                  <CommentThread />
                </section>
              </div>

              {/* Related Videos Sidebar */}
              <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:pt-0"> {/* No pt needed as grid handles alignment */}
                <h3 className="text-lg font-semibold">Related Videos</h3>
                {relatedVideosData.map(video => (
                  <VideoThumbnailItem
                    key={video.videoId}
                    videoId={video.videoId}
                    thumbnailUrl={video.thumbnailUrl}
                    videoDuration={video.videoDuration}
                    title={video.title}
                    channelName={video.channelName}
                    channelAvatarUrl={video.channelAvatarUrl}
                    viewCount={video.viewCount}
                    uploadDate={video.uploadDate}
                  />
                ))}
              </aside>
            </div>
          </main>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default VideoWatchPage;