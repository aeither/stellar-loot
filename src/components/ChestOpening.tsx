import { useState, useEffect } from "react";
import { X, Sparkles, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Use `sorobanClient` wherever needed in your component
interface ChestOpeningProps {
  onClose: () => void;
  onMint: () => Promise<boolean>; // Function that returns true if minting was successful
}

const ChestOpening = ({ onClose, onMint }: ChestOpeningProps) => {
  const [chestState, setChestState] = useState<'closed' | 'minting' | 'opening' | 'opened' | 'revealing' | 'rewards'>('closed');
  const [currentRewardIndex, setCurrentRewardIndex] = useState(-1);
  const [revealedRewards, setRevealedRewards] = useState<number[]>([]);
  const { toast } = useToast();

  // Function to get random image from the 3 available
  const getRandomImage = () => {
    const images = ['/images/tomato.jpeg', '/images/eggplant.jpeg', '/images/cucumber.jpeg'];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Function to get name based on image
  const getNameFromImage = (imagePath: string) => {
    if (imagePath.includes('tomato')) return 'Tomato';
    if (imagePath.includes('eggplant')) return 'Eggplant';
    if (imagePath.includes('cucumber')) return 'Cucumber';
    return 'Unknown';
  };

  const rewards = [
    { type: 'card', name: getNameFromImage(getRandomImage()), rarity: 'Epic', color: 'from-purple-500 to-blue-500', image: getRandomImage() },
    { type: 'card', name: getNameFromImage(getRandomImage()), rarity: 'Legendary', color: 'from-red-500 to-orange-500', image: getRandomImage() },
    { type: 'xlm', amount: 0, icon: Gem }
  ];

  const handleChestClick = async () => {
    if (chestState === 'closed') {
      // Start minting process
      setChestState('minting');
      
      try {
        // Show loading toast
        toast({
          title: "Opening Chest...",
          description: "Minting your NFT, please wait...",
        });

        // Call the minting function
        const mintSuccess = await onMint();
        
        if (mintSuccess) {
          // Show success toast
          toast({
            title: "🎉 Chest Opened Successfully!",
            description: "Your NFT has been minted and is now in your collection!",
          });
          
          // Continue with chest opening animation
          setChestState('opening');
          setTimeout(() => setChestState('opened'), 1000);
          setTimeout(() => {
            setChestState('revealing');
            setCurrentRewardIndex(0);
          }, 2000);
        } else {
          // Minting failed, go back to closed state
          setChestState('closed');
          toast({
            title: "❌ Transaction Failed",
            description: "Failed to mint NFT. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error during minting:", error);
        setChestState('closed');
        toast({
          title: "❌ Error Opening Chest",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } else if (chestState === 'opened') {
      setChestState('revealing');
      setCurrentRewardIndex(0);
    }
  };

  // Auto-reveal rewards one by one
  useEffect(() => {
    if (chestState === 'revealing' && currentRewardIndex >= 0 && currentRewardIndex < rewards.length) {
      const timer = setTimeout(() => {
        setRevealedRewards(prev => [...prev, currentRewardIndex]);
        
        if (currentRewardIndex < rewards.length - 1) {
          setCurrentRewardIndex(currentRewardIndex + 1);
        } else {
          // All rewards revealed, show final state
          setTimeout(() => {
            setChestState('rewards');
          }, 1500);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [chestState, currentRewardIndex, rewards.length]);

  const handleContinue = () => {
    onClose();
  };

  const handleSkip = () => {
    setRevealedRewards(rewards.map((_, index) => index));
    setChestState('rewards');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0 bg-black/40 backdrop-blur-sm border border-white/20"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Skip button during revealing */}
        {chestState === 'revealing' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="absolute -top-2 -left-2 z-10 text-yellow-300 hover:bg-yellow-400/20 rounded-full px-4 py-2 text-sm font-bold bg-black/40 backdrop-blur-sm border border-yellow-400/30"
          >
            Skip ⚡
          </Button>
        )}

        {/* Chest Animation */}
        {chestState !== 'rewards' && chestState !== 'revealing' && (
          <div className="text-center">
            <div
              onClick={chestState === 'minting' ? undefined : handleChestClick}
              className={`relative mx-auto w-48 h-48 transition-all duration-1000 ${
                chestState === 'minting' ? 'cursor-not-allowed opacity-75' :
                chestState === 'opening' ? 'animate-bounce cursor-pointer' : 'hover:scale-105 cursor-pointer'
              }`}
            >
              {/* Chest */}
              <div className={`w-full h-full bg-gradient-to-br from-amber-600 to-yellow-700 rounded-2xl border-4 border-yellow-500 shadow-2xl transition-all duration-1000 ${
                chestState === 'opened' ? 'transform rotate-12' : ''
              }`}>
                {/* Chest lid */}
                <div className={`absolute top-0 left-0 w-full h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-t-2xl border-b-2 border-yellow-600 transition-all duration-1000 ${
                  chestState === 'opened' ? 'transform -rotate-45 -translate-y-8' : ''
                }`}>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                
                {/* Chest body */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-b-2xl">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-yellow-500 rounded-lg"></div>
                </div>

                {/* Sparkles when opening */}
                {chestState === 'opening' && (
                  <>
                    <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-yellow-300 animate-spin" />
                    <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-pink-300 animate-spin delay-300" />
                    <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-blue-300 animate-spin delay-700" />
                    <Sparkles className="absolute -bottom-4 -right-4 w-8 h-8 text-purple-300 animate-spin delay-500" />
                  </>
                )}

                {/* Glowing effect when opened */}
                {chestState === 'opened' && (
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-2xl animate-pulse"></div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              {chestState === 'closed' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Reward Chest</h2>
                  <p className="text-gray-300">Tap to open!</p>
                </div>
              )}
              {chestState === 'minting' && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2 animate-pulse">Minting NFT...</h2>
                  <p className="text-gray-300">✨ Creating your digital treasure! ✨</p>
                </div>
              )}
              {chestState === 'opening' && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2 animate-pulse">Opening...</h2>
                  <p className="text-gray-300">✨ Magic is happening! ✨</p>
                </div>
              )}
              {chestState === 'opened' && (
                <div>
                  <h2 className="text-2xl font-bold text-green-300 mb-2">Chest Opened!</h2>
                  <p className="text-gray-300">Tap anywhere to see your rewards</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Individual Reward Reveal */}
        {chestState === 'revealing' && currentRewardIndex >= 0 && (
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">🎉 New Reward! 🎉</h2>
              <p className="text-gray-300">Reward {currentRewardIndex + 1} of {rewards.length}</p>
            </div>

            {/* Current Reward Display */}
            <div className="relative mx-auto w-64 h-80 mb-6">
              <Card className="w-full h-full bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-4 border-yellow-400/70 shadow-2xl animate-scale-in relative overflow-hidden">
                {/* Sparkle effects around the card */}
                <Sparkles className="absolute -top-6 -left-6 w-8 h-8 text-yellow-300 animate-spin" />
                <Sparkles className="absolute -top-6 -right-6 w-6 h-6 text-pink-300 animate-spin delay-300" />
                <Sparkles className="absolute -bottom-6 -left-6 w-6 h-6 text-blue-300 animate-spin delay-700" />
                <Sparkles className="absolute -bottom-6 -right-6 w-8 h-8 text-purple-300 animate-spin delay-500" />
                
                <CardContent className="p-8 flex flex-col items-center justify-center h-full relative z-10">
                  {rewards[currentRewardIndex].type === 'card' ? (
                    <>
                      <div className={`w-24 h-24 bg-gradient-to-br ${rewards[currentRewardIndex].color} rounded-2xl flex items-center justify-center mb-4 shadow-2xl border-4 border-white/30 animate-pulse`}>
                        <img src={rewards[currentRewardIndex].image} alt={rewards[currentRewardIndex].name} className="w-24 h-24 rounded-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{rewards[currentRewardIndex].name}</h3>
                      <Badge className={`text-lg px-4 py-2 ${
                        rewards[currentRewardIndex].rarity === 'Legendary' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        rewards[currentRewardIndex].rarity === 'Epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                        'bg-gradient-to-r from-blue-500 to-cyan-500'
                      } animate-pulse`}>
                        {rewards[currentRewardIndex].rarity}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl border-4 border-white/30 animate-pulse">
                        {(() => {
                          const IconComponent = rewards[currentRewardIndex].icon;
                          return <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />;
                        })()}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">+{rewards[currentRewardIndex].amount} XLM</h3>
                      <p className="text-lg text-yellow-300">Stellar Lumens</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {rewards.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    revealedRewards.includes(index) 
                      ? 'bg-green-400 shadow-lg' 
                      : index === currentRewardIndex 
                        ? 'bg-yellow-400 animate-pulse shadow-lg' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Final Rewards Display */}
        {chestState === 'rewards' && (
          <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-2 border-yellow-400/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">🎉 All Rewards Obtained! 🎉</h2>
                <p className="text-gray-300">Here's your complete haul:</p>
              </div>

              <div className="space-y-3 mb-6">
                {rewards.map((reward, index) => (
                  <Card 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      {reward.type === 'card' ? (
                        <>
                          <div className={`w-12 h-12 bg-gradient-to-br ${reward.color} rounded-lg flex items-center justify-center shadow-xl border-2 border-white/30`}>
                            <img src={reward.image} alt={reward.name} className="w-12 h-12 rounded-lg object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white">{reward.name}</p>
                            <Badge className={`text-xs ${
                              reward.rarity === 'Legendary' ? 'bg-orange-500' :
                              reward.rarity === 'Epic' ? 'bg-purple-500' : 'bg-blue-500'
                            }`}>
                              {reward.rarity}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-xl border-2 border-white/30">
                            {(() => {
                              const IconComponent = reward.icon;
                              return <IconComponent className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white">+{reward.amount} XLM</p>
                            <p className="text-xs text-gray-300">Stellar Lumens</p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Continue to Collection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChestOpening;
