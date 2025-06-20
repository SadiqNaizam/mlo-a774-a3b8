import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import ChannelHeader from '@/components/ChannelHeader';
import VideoThumbnailItem from '@/components/VideoThumbnailItem';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide Icons for placeholders
import { ListVideo, Users, Info, Video as VideoIcon } from 'lucide-react'; // Renamed Video to VideoIcon to avoid conflict

// Sample Data
const channelData = {
  channelName: "TechVisionary",
  subscriberCount: 2150000,
  avatarImageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
  bannerImageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neSUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&h=300",
  initialIsSubscribed: false,
  description: `Welcome to the official channel of TechVisionary! We are dedicated to bringing you the latest
and greatest in technology, innovation, and future trends. Our mission is to explore the cutting edge,
demystify complex topics, and inspire a new generation of thinkers and creators.

Join us as we delve into topics like artificial intelligence, quantum computing, sustainable tech,
gadget reviews, and much more. We upload new videos every week, so make sure to subscribe and hit the
notification bell so you don't miss out!`,
  joinDate: "January 15, 2020",
  totalVideosEstimate: 120,
  totalViewsEstimate: "75 Million+",
  socialLinks: {
    twitter: "TechVisionaryHQ",
    instagram: "TechVisionaryOfficial"
  }
};

const sampleVideos = [
  {
    videoId: 'vid001',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '12:35',
    title: 'The Future of Quantum Computing: A Deep Dive',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '2.1M views',
    uploadDate: '3 days ago',
  },
  {
    videoId: 'vid002',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '08:17',
    title: 'Unboxing the Latest Gadgets of 2024',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '850K views',
    uploadDate: '1 week ago',
  },
  {
    videoId: 'vid003',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '15:02',
    title: 'AI in Everyday Life: Transforming Our World',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '1.2M views',
    uploadDate: '2 weeks ago',
  },
  {
    videoId: 'vid004',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZirtualJTIwcmVhbGl0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '22:10',
    title: 'Exploring Virtual Reality: Beyond Gaming',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '975K views',
    uploadDate: '1 month ago',
  },
  {
    videoId: 'vid005',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '18:50',
    title: 'Mastering Modern JavaScript: ES2023 Features',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '650K views',
    uploadDate: '1 month ago',
  },
  {
    videoId: 'vid006',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2NpZW5jZSUyMGxhYnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '25:00',
    title: 'Breakthroughs in Renewable Energy Tech',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '1.9M views',
    uploadDate: '2 months ago',
  },
   {
    videoId: 'vid007',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '09:30',
    title: 'The Evolution of User Interface Design',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '450K views',
    uploadDate: '3 months ago',
  },
  {
    videoId: 'vid008',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6758f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=320&h=180',
    videoDuration: '14:22',
    title: 'Building Your First Smart Home Automation System',
    channelName: channelData.channelName,
    channelAvatarUrl: channelData.avatarImageUrl,
    viewCount: '780K views',
    uploadDate: '4 months ago',
  }
];

const ChannelPage: React.FC = () => {
  console.log('ChannelPage loaded');

  const handleSubscribeToggle = (isSubscribed: boolean) => {
    console.log(`Channel subscription status for ${channelData.channelName} changed to: ${isSubscribed}`);
    // In a real app, this would trigger an API call
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1 pt-16"> {/* pt-16 for fixed header height */}
        <Sidebar />
        
        <ScrollArea className="flex-1 md:pl-64 transition-all duration-300 ease-in-out">
          <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <ChannelHeader
              channelName={channelData.channelName}
              subscriberCount={channelData.subscriberCount}
              avatarImageUrl={channelData.avatarImageUrl}
              bannerImageUrl={channelData.bannerImageUrl}
              initialIsSubscribed={channelData.initialIsSubscribed}
              onSubscribeToggle={handleSubscribeToggle}
            />

            <Tabs defaultValue="videos" className="mt-8 w-full">
              <TabsList className="flex border-b">
                <TabsTrigger value="videos" className="px-4 py-2">Videos</TabsTrigger>
                <TabsTrigger value="playlists" className="px-4 py-2">Playlists</TabsTrigger>
                <TabsTrigger value="community" className="px-4 py-2">Community</TabsTrigger>
                <TabsTrigger value="about" className="px-4 py-2">About</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-6">
                {sampleVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {sampleVideos.map((video) => (
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
                  </div>
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <VideoIcon className="w-16 h-16 mb-4 text-muted-foreground/70" />
                    <p className="text-xl font-semibold mb-2">No Videos Uploaded Yet</p>
                    <p className="text-sm">This channel hasn't uploaded any videos.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="playlists" className="mt-6">
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-lg p-8">
                  <ListVideo className="w-16 h-16 mb-4 text-muted-foreground/70" />
                  <p className="text-xl font-semibold mb-2">No Playlists Available</p>
                  <p className="text-sm text-center max-w-xs">
                    This channel hasn't created any playlists yet. Check back later!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="mt-6">
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-muted/20 rounded-lg p-8">
                  <Users className="w-16 h-16 mb-4 text-muted-foreground/70" />
                  <p className="text-xl font-semibold mb-2">No Community Posts</p>
                  <p className="text-sm text-center max-w-xs">
                    {channelData.channelName} hasn't shared any community posts recently.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                        <Info className="w-5 h-5 mr-2 text-primary" /> 
                        About {channelData.channelName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                    <p>{channelData.description}</p>
                    <h3 className="text-base font-semibold mt-4 mb-1">Channel Details</h3>
                    <ul className="list-disc pl-5 space-y-0.5">
                      <li>Joined: {channelData.joinDate}</li>
                      <li>Subscribers: {channelData.subscriberCount.toLocaleString()}</li>
                      <li>Estimated Total Videos: {channelData.totalVideosEstimate}</li>
                      <li>Estimated Total Views: {channelData.totalViewsEstimate}</li>
                    </ul>
                    {channelData.socialLinks && (
                      <>
                        <h3 className="text-base font-semibold mt-4 mb-1">Follow Us</h3>
                        <ul className="list-disc pl-5 space-y-0.5">
                          {channelData.socialLinks.twitter && <li>Twitter: <a href={`https://twitter.com/${channelData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@{channelData.socialLinks.twitter}</a></li>}
                          {channelData.socialLinks.instagram && <li>Instagram: <a href={`https://instagram.com/${channelData.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@{channelData.socialLinks.instagram}</a></li>}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChannelPage;