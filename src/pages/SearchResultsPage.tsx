import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import VideoThumbnailItem from '@/components/VideoThumbnailItem';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Loader2, Search as SearchIcon } from 'lucide-react';

interface MockVideo {
  videoId: string;
  thumbnailUrl: string;
  videoDuration?: string;
  title: string;
  channelName: string;
  channelAvatarUrl?: string;
  viewCount: string;
  uploadDate: string;
}

const MOCK_VIDEO_RESULTS_TEMPLATE: MockVideo[] = Array.from({ length: 28 }, (_, i) => ({
  videoId: `search_vid_${i + 1}`,
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}_search_result/320/180`,
  videoDuration: `${Math.floor(Math.random() * 10) + 3}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  title: `Found: Video Result Title Example ${i + 1} - Learn about topic ${i % 5 +1}`,
  channelName: `Creator Channel ${i % 4 + 1}`,
  channelAvatarUrl: `https://i.pravatar.cc/40?u=channel_search_${i % 4 + 1}`,
  viewCount: `${(Math.random() * 5 + 0.1).toFixed(1)}M views`,
  uploadDate: `${Math.floor(Math.random() * 6) + 1} days ago`,
}));

const getPaginationItems = (currentPage: number, totalPages: number): (number | '...')[] => {
    const delta = 1; // Number of pages to show around the current page
    const rangeWithDots: (number | '...')[] = [];

    // Always show the first page
    rangeWithDots.push(1);

    // Determine intermediate pages and dots
    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage - delta > 2) {
        rangeWithDots.push('...');
    }

    for (let i = left; i <= right; i++) {
        rangeWithDots.push(i);
    }

    if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...');
    }
    
    // Always show the last page if totalPages > 1
    if (totalPages > 1) {
        rangeWithDots.push(totalPages);
    }
    
    // Deduplicate (e.g., if 1 is also in the range or totalPages is small)
    const uniqueRange = rangeWithDots.filter((item, index, self) => {
        return !(item === '...' && self[index -1] === '...'); // no consecutive ellipsis
    });
    
    // Remove potential duplicate if totalPages=1 and range includes 1 twice
    if (totalPages === 1 && uniqueRange.length > 1 && uniqueRange[uniqueRange.length-1] === 1) {
        return [1];
    }
    
    // Further clean up: if 1 ... 2, remove ...
    if (uniqueRange[0] === 1 && uniqueRange[1] === '...' && uniqueRange[2] === 2) {
      uniqueRange.splice(1, 1);
    }
    // if N-1 ... N, remove ...
    if (uniqueRange[uniqueRange.length-3] === totalPages-1 && uniqueRange[uniqueRange.length-2] === '...' && uniqueRange[uniqueRange.length-1] === totalPages) {
      uniqueRange.splice(uniqueRange.length-2, 1);
    }

    return uniqueRange;
};


const SearchResultsPage: React.FC = () => {
  console.log('SearchResultsPage loaded');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of videos per page

  const [isLoading, setIsLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState<MockVideo[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call and filtering
    setTimeout(() => {
      if (query) {
        const results = MOCK_VIDEO_RESULTS_TEMPLATE.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.channelName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
      setCurrentPage(1); // Reset to first page on new search
      setIsLoading(false);
    }, 700); // Simulate network delay
  }, [query]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  
  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResults.slice(startIndex, endIndex);
  }, [filteredResults, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optionally scroll to top of results or page
      // window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const paginationItems = useMemo(() => getPaginationItems(currentPage, totalPages), [currentPage, totalPages]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <ScrollArea className="flex-1 pt-16 md:ml-64"> {/* ml-64 for expanded sidebar (w-64) */}
          <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Loading search results...</p>
              </div>
            ) : !query ? (
              <div className="flex justify-center items-center h-96">
                <Alert variant="default" className="max-w-lg text-center">
                  <SearchIcon className="h-5 w-5" />
                  <AlertTitle className="font-semibold">No Search Query Provided</AlertTitle>
                  <AlertDescription>
                    Please use the search bar at the top to find videos.
                  </AlertDescription>
                </Alert>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                 <SearchIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No results found for "{query}"</h2>
                <p className="text-muted-foreground">
                  Try searching for something else, or check your spelling.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Search Results for: <span className="text-primary">{query}</span>
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing {currentVideos.length} of {filteredResults.length} results. Page {currentPage} of {totalPages}.
                  </p>
                </div>

                {/* Placeholder for potential filter/sort options */}
                {/* 
                <div className="mb-6 p-4 border rounded-lg bg-card shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Filter & Sort</h3>
                  <p className="text-sm text-muted-foreground">Advanced filtering and sorting options could be placed here.</p>
                </div>
                */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {currentVideos.map((video) => (
                    <VideoThumbnailItem key={video.videoId} {...video} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-60' : undefined}
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        {paginationItems.map((page, index) => (
                          <PaginationItem key={index}>
                            {page === '...' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(page as number); }}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-60' : undefined}
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;