import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import VideoThumbnailItem from '@/components/VideoThumbnailItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SampleVideo {
  videoId: string;
  thumbnailUrl: string;
  videoDuration: string;
  title: string;
  channelName: string;
  channelAvatarUrl?: string;
  viewCount: string;
  uploadDate: string;
}

const trendingVideosData: SampleVideo[] = [
  {
    videoId: 'trend001',
    thumbnailUrl: 'https://picsum.photos/seed/trend001/400/225',
    videoDuration: '12:35',
    title: 'Unveiling the Next Big Thing in Tech',
    channelName: 'Tech Unboxed',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=TechUnboxed',
    viewCount: '2.1M views',
    uploadDate: '1 day ago',
  },
  {
    videoId: 'trend002',
    thumbnailUrl: 'https://picsum.photos/seed/trend002/400/225',
    videoDuration: '08:12',
    title: 'Comedy Sketch: The Misadventures of a Coder',
    channelName: 'Laugh Riot',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=LaughRiot',
    viewCount: '850K views',
    uploadDate: '16 hours ago',
  },
  {
    videoId: 'trend003',
    thumbnailUrl: 'https://picsum.photos/seed/trend003/400/225',
    videoDuration: '22:05',
    title: 'Mastering React Hooks: A Deep Dive',
    channelName: 'DevSimplified',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=DevSimplified',
    viewCount: '1.2M views',
    uploadDate: '3 days ago',
  },
  {
    videoId: 'trend004',
    thumbnailUrl: 'https://picsum.photos/seed/trend004/400/225',
    videoDuration: '15:50',
    title: 'Travel Vlog: Hidden Gems of Southeast Asia',
    channelName: 'Wanderlust Adventures',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=WanderlustAdventures',
    viewCount: '600K views',
    uploadDate: '5 days ago',
  },
];

const recommendedVideosData: SampleVideo[] = [
  {
    videoId: 'rec001',
    thumbnailUrl: 'https://picsum.photos/seed/rec001/400/225',
    videoDuration: '18:40',
    title: 'Advanced CSS Techniques for Modern Web Design',
    channelName: 'DesignPro',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=DesignPro',
    viewCount: '450K views',
    uploadDate: '1 week ago',
  },
  {
    videoId: 'rec002',
    thumbnailUrl: 'https://picsum.photos/seed/rec002/400/225',
    videoDuration: '10:00',
    title: 'Quick & Healthy Recipes for Busy People',
    channelName: 'FitFoodie',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=FitFoodie',
    viewCount: '300K views',
    uploadDate: '4 days ago',
  },
  {
    videoId: 'rec003',
    thumbnailUrl: 'https://picsum.photos/seed/rec003/400/225',
    videoDuration: '25:15',
    title: 'The Future of AI: Predictions and Possibilities',
    channelName: 'FutureScope',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=FutureScope',
    viewCount: '920K views',
    uploadDate: '2 weeks ago',
  },
];

const newReleasesVideosData: SampleVideo[] = [
  {
    videoId: 'new001',
    thumbnailUrl: 'https://picsum.photos/seed/new001/400/225',
    videoDuration: '09:30',
    title: 'Indie Game Showcase: Top Picks of the Month',
    channelName: 'GamerCentral',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=GamerCentral',
    viewCount: '150K views',
    uploadDate: '2 hours ago',
  },
  {
    videoId: 'new002',
    thumbnailUrl: 'https://picsum.photos/seed/new002/400/225',
    videoDuration: '14:22',
    title: 'Learn Python in 15 Minutes (Crash Course)',
    channelName: 'CodeQuickie',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=CodeQuickie',
    viewCount: '22K views',
    uploadDate: 'Just now',
  },
  {
    videoId: 'new003',
    thumbnailUrl: 'https://picsum.photos/seed/new003/400/225',
    videoDuration: '05:55',
    title: 'Animated Short Film: "The Little Robot"',
    channelName: 'PixelAnimations',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=PixelAnimations',
    viewCount: '75K views',
    uploadDate: '1 day ago',
  },
  {
    videoId: 'new004',
    thumbnailUrl: 'https://picsum.photos/seed/new004/400/225',
    videoDuration: '30:01',
    title: 'Documentary: The Secrets of Ancient Civilizations',
    channelName: 'History Revealed',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=HistoryRevealed',
    viewCount: '1.8M views',
    uploadDate: '6 hours ago',
  },
];


const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pt-16 md:pl-64 transition-all duration-300 ease-in-out"> {/* Adjust pl-64 if sidebar collapsed width is different and state is available */}
          <ScrollArea className="h-[calc(100vh-4rem)]"> {/* 4rem = h-16 (Header height) */}
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
              
              <section className="mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                  Trending Videos
                </h2>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {trendingVideosData.map(video => (
                    <VideoThumbnailItem key={video.videoId} {...video} />
                  ))}
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                  Recommended For You
                </h2>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recommendedVideosData.map(video => (
                    <VideoThumbnailItem key={video.videoId} {...video} />
                  ))}
                </div>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                  New Releases
                </h2>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {newReleasesVideosData.map(video => (
                    <VideoThumbnailItem key={video.videoId} {...video} />
                  ))}
                </div>
              </section>

            </div>
            <Footer />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Homepage;