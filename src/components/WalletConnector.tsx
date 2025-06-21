import React from "react";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WalletConnector = () => {
  const { walletConnected, publicKey, connectWallet, disconnectWallet } = useStellarWallet();

  const formatPublicKey = (key: string) => {
    if (key.length <= 12) return key;
    return `${key.slice(0, 6)}...${key.slice(-6)}`;
  };

  return (
    <div className="flex items-center space-x-3">
      {!walletConnected ? (
        <Button 
          onClick={connectWallet}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      ) : (
        <div className="flex items-center space-x-3">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            Connected
          </Badge>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
            <span className="text-white text-sm font-mono">
              {formatPublicKey(publicKey || '')}
            </span>
          </div>
          <Button 
            onClick={disconnectWallet}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnector; 