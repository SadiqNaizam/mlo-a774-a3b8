import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Custom Domain Components
import CreatorVideoListItem from '@/components/CreatorVideoListItem';

// Shadcn/UI Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// react-hook-form and Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Lucide Icons
import { UploadCloud, ListVideo, BarChart2 } from 'lucide-react';

// Form Schema for Video Upload
const videoUploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title can be at most 100 characters."),
  description: z.string().max(5000, "Description can be at most 5000 characters.").optional(),
  videoFile: z.custom<FileList>()
    .refine(files => files && files.length > 0, "A video file is required.")
    .refine(files => files && files[0]?.size <= 100 * 1024 * 1024, "Video file size must be less than 100MB.") // Example size validation
    .refine(files => files && ['video/mp4', 'video/webm', 'video/quicktime'].includes(files[0]?.type), "Unsupported video format."), // Example type validation
  thumbnailFile: z.custom<FileList>()
    .refine(files => files && files.length > 0, "A thumbnail image is required.")
    .refine(files => files && files[0]?.size <= 5 * 1024 * 1024, "Thumbnail file size must be less than 5MB.")
    .refine(files => files && ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type), "Unsupported image format.").optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]).default("PUBLIC"),
  tags: z.string().optional().describe("Comma-separated tags for discoverability"),
});
type VideoUploadFormValues = z.infer<typeof videoUploadFormSchema>;

// Sample Data for Managed Videos
interface ManagedVideo {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  visibility: 'Public' | 'Private' | 'Unlisted';
  uploadDate: string;
}

const sampleManagedVideos: ManagedVideo[] = [
  { videoId: 'vid001', thumbnailUrl: 'https://source.unsplash.com/random/160x90?v=1&sig=1', title: 'My First Vlogging Adventure', views: 12560, likes: 1200, comments: 85, visibility: 'Public', uploadDate: '3 days ago' },
  { videoId: 'vid002', thumbnailUrl: 'https://source.unsplash.com/random/160x90?v=1&sig=2', title: 'Tutorial: Advanced Coding Techniques', views: 88000, likes: 4500, comments: 230, visibility: 'Public', uploadDate: '1 week ago' },
  { videoId: 'vid003', thumbnailUrl: 'https://source.unsplash.com/random/160x90?v=1&sig=3', title: 'Unlisted Test - Beta Features', views: 150, likes: 10, comments: 3, visibility: 'Unlisted', uploadDate: '2 hours ago' },
  { videoId: 'vid004', thumbnailUrl: 'https://source.unsplash.com/random/160x90?v=1&sig=4', title: 'Private Family Vacation Montage', views: 5, likes: 2, comments: 0, visibility: 'Private', uploadDate: '5 days ago' },
];

const CreatorStudioPage: React.FC = () => {
  console.log('CreatorStudioPage loaded');

  const form = useForm<VideoUploadFormValues>({
    resolver: zodResolver(videoUploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "PUBLIC",
      tags: "",
      videoFile: undefined,
      thumbnailFile: undefined,
    },
  });

  const onUploadSubmit = (data: VideoUploadFormValues) => {
    console.log("Video Upload Submitted:", {
        ...data,
        videoFile: data.videoFile[0]?.name, // Log file name for brevity
        thumbnailFile: data.thumbnailFile?.[0]?.name, // Log file name for brevity
    });
    // In a real app, handle file uploads (e.g., to a backend service)
    alert(`Mock Upload: Video "${data.title}" submitted. Check console for details.`);
    form.reset();
  };

  // Placeholder handlers for video list items
  const handleEditVideo = (videoId: string) => {
    console.log("Edit video:", videoId);
    alert(`Triggered edit for video ID: ${videoId} (mock)`);
  };
  const handleDeleteVideo = (videoId: string) => {
    console.log("Delete video:", videoId);
    if (window.confirm(`Are you sure you want to delete video ID: ${videoId}? (mock)`)) {
        alert(`Video ID: ${videoId} deleted (mock)`);
    }
  };
  const handleViewAnalytics = (videoId: string) => {
    console.log("View analytics for video:", videoId);
    alert(`Navigating to analytics for video ID: ${videoId} (mock)`);
  };
  const handlePreviewVideo = (videoId: string) => {
    console.log("Preview video:", videoId);
    // Example: open in new tab, similar to YouTube's "View on YouTube"
    window.open(`/video-watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pt-16 md:pl-64 transition-all duration-300 ease-in-out">
          <ScrollArea className="h-[calc(100vh-4rem)]"> {/* Header is 4rem (h-16) */}
            <div className="p-4 sm:p-6 lg:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">Creator Studio</h1>
              
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-lg mb-6">
                  <TabsTrigger value="upload" className="text-xs sm:text-sm">
                    <UploadCloud className="mr-1.5 h-4 w-4" /> Upload Video
                  </TabsTrigger>
                  <TabsTrigger value="manage" className="text-xs sm:text-sm">
                    <ListVideo className="mr-1.5 h-4 w-4" /> Manage Videos
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="hidden md:flex text-xs sm:text-sm">
                    <BarChart2 className="mr-1.5 h-4 w-4" /> Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                  <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Upload New Video</CardTitle>
                      <CardDescription>Fill in the details below to upload your video to the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onUploadSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Video Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., My Awesome Vlog Episode 1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Tell viewers about your video..." className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="videoFile"
                            render={({ field: { onChange, value, ...rest } }) => ( // value is excluded here to prevent issues with Input type file
                              <FormItem>
                                <FormLabel>Video File</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="file" 
                                    accept="video/mp4,video/webm,video/quicktime" 
                                    onChange={(e) => onChange(e.target.files)} 
                                    {...rest} 
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                  />
                                </FormControl>
                                <FormDescription>MP4, WebM, MOV. Max 100MB.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="thumbnailFile"
                            render={({ field: { onChange, value, ...rest } }) => (
                              <FormItem>
                                <FormLabel>Thumbnail Image (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/webp" 
                                    onChange={(e) => onChange(e.target.files)} 
                                    {...rest}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                  />
                                </FormControl>
                                <FormDescription>JPG, PNG, WebP. Max 5MB.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="visibility"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Visibility</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select video visibility" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="PUBLIC">Public</SelectItem>
                                    <SelectItem value="UNLISTED">Unlisted</SelectItem>
                                    <SelectItem value="PRIVATE">Private</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tags (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., gaming, tutorial, vlog" {...field} />
                                </FormControl>
                                <FormDescription>Comma-separated keywords to help viewers find your video.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Uploading..." : "Upload Video"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="manage">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Your Videos</CardTitle>
                      <CardDescription>Edit, delete, or view analytics for your uploaded videos.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-0 p-0"> {/* Remove CardContent padding if list items have their own */}
                      {sampleManagedVideos.length > 0 ? (
                        <div className="divide-y divide-border">
                            {sampleManagedVideos.map((video) => (
                            <CreatorVideoListItem
                                key={video.videoId}
                                videoId={video.videoId}
                                thumbnailUrl={video.thumbnailUrl}
                                title={video.title}
                                views={video.views}
                                likes={video.likes}
                                comments={video.comments}
                                visibility={video.visibility}
                                uploadDate={video.uploadDate}
                                onEdit={handleEditVideo}
                                onDelete={handleDeleteVideo}
                                onViewAnalytics={handleViewAnalytics}
                                onPreview={handlePreviewVideo}
                            />
                            ))}
                        </div>
                      ) : (
                        <p className="p-6 text-center text-muted-foreground">You haven't uploaded any videos yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics">
                   <Card>
                    <CardHeader>
                      <CardTitle>Channel Analytics</CardTitle>
                      <CardDescription>Overview of your channel's performance (Placeholder).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10">
                            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">Detailed channel analytics will be available here soon.</p>
                            <p className="text-sm text-muted-foreground mt-2">Track views, watch time, subscriber growth, and more.</p>
                             <img src="https://assets-global.website-files.com/5fba247ff408b767ed9ab38c/6227345527c8bfc5a1A57A0c_Group-48095497.png" alt="Sample Analytics Chart" className="mt-6 rounded-lg shadow-md mx-auto max-w-xl" />
                        </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreatorStudioPage;