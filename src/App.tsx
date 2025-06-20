import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext"; // Added AuthProvider

import ProtectedRoute from "./components/ProtectedRoute"; // Added ProtectedRoute
import LoginPage from "./pages/LoginPage"; // Added LoginPage
import ChannelPage from "./pages/ChannelPage";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import VideoWatchPage from "./pages/VideoWatchPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider> {/* AuthProvider wraps routes */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/channel" element={<ChannelPage />} /> {/* Assuming public for now */}
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route path="/video-watch" element={<VideoWatchPage />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/creator-studio" element={<CreatorStudioPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;