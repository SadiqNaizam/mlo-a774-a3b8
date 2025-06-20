import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Check, Users } from 'lucide-react';

interface ChannelHeaderProps {
  channelName: string;
  subscriberCount: number;
  avatarImageUrl: string;
  bannerImageUrl: string;
  initialIsSubscribed?: boolean;
  onSubscribeToggle?: (isSubscribed: boolean) => void;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  channelName = "Awesome Channel",
  subscriberCount = 1230000,
  avatarImageUrl = "https://via.placeholder.com/128",
  bannerImageUrl = "https://via.placeholder.com/1200x300",
  initialIsSubscribed = false,
  onSubscribeToggle,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);

  console.log('ChannelHeader loaded for:', channelName);

  const handleSubscribeClick = () => {
    const newSubscribedState = !isSubscribed;
    setIsSubscribed(newSubscribedState);
    if (onSubscribeToggle) {
      onSubscribeToggle(newSubscribedState);
    }
    console.log(`Subscription status for ${channelName} changed to: ${newSubscribedState}`);
  };

  const formatSubscriberCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M subscribers`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K subscribers`;
    }
    return `${count} subscribers`;
  };

  return (
    <div className="w-full bg-background text-foreground">
      {/* Banner Image */}
      <div className="relative h-40 md:h-64 bg-muted">
        <img
          src={bannerImageUrl}
          alt={`${channelName} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-12 sm:-mt-16">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background rounded-full shadow-md">
              <AvatarImage src={avatarImageUrl} alt={`${channelName} avatar`} />
              <AvatarFallback>{channelName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          {/* Channel Name, Subscribers, and Subscribe Button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between flex-grow w-full sm:w-auto pt-4 sm:pt-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">{channelName}</h1>
              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start">
                <Users className="h-4 w-4 mr-1.5" />
                {formatSubscriberCount(subscriberCount)}
              </p>
            </div>

            {/* Subscribe Button */}
            <div className="mt-4 sm:mt-0">
              <Button
                onClick={handleSubscribeClick}
                variant={isSubscribed ? "secondary" : "default"}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ease-in-out ${
                  isSubscribed 
                    ? 'bg-muted hover:bg-muted/90 text-muted-foreground' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Subscribed
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Subscribe
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;