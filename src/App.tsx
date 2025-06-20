import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext"; // Ensure this path is correct

import ChannelPage from "./pages/ChannelPage"; // Assuming .tsx, if not, adjust
import CreatorStudioPage from "./pages/CreatorStudioPage"; // Assuming .tsx
import Homepage from "./pages/Homepage"; // Assuming .tsx
import SearchResultsPage from "./pages/SearchResultsPage"; // Assuming .tsx
import VideoWatchPage from "./pages/VideoWatchPage"; // Assuming .tsx
import NotFound from "./pages/NotFound"; // Assuming .tsx

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider> {/* Ensure TooltipProvider wraps components that use tooltips */}
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;