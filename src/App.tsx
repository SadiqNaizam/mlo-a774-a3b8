import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// TooltipProvider from shadcn/ui is imported in ThemeProvider, but we might need it here if ThemeProvider wasn't wrapping it.
// For this setup, ThemeProvider will be inside QueryClientProvider and BrowserRouter, and can manage its own TooltipProvider if needed,
// or expect one from above. The prompt's original App.tsx had TooltipProvider at a high level.
// Let's maintain TooltipProvider from shadcn/ui at the top level as it was.
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext"; // Corrected import path

import ChannelPage from "./pages/ChannelPage";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import VideoWatchPage from "./pages/VideoWatchPage";
import NotFound from "./pages/NotFound";

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