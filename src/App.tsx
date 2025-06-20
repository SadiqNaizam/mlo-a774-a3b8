import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ChannelPage from "./pages/ChannelPage";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import VideoWatchPage from "./pages/VideoWatchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/channel" element={<ChannelPage />} />
          <Route path="/creator-studio" element={<CreatorStudioPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/video-watch" element={<VideoWatchPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
