
import React from "react";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import WalletConnector from "./WalletConnector";

const WalletManager = () => {
  const { walletConnected, publicKey, signMessage } = useStellarWallet();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Stellar Wallet Manager</h1>
        <p className="text-gray-300">Connect your Freighter wallet</p>
      </div>

      {/* Browser Wallet Connection */}
      <Card className="bg-gradient-to-br from-purple-800/60 to-indigo-800/60 backdrop-blur-sm border-2 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Freighter Browser Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WalletConnector />
          {walletConnected && publicKey && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <p className="text-white text-sm">
                <strong>Connected Address:</strong> {publicKey}
              </p>
              <div className="mt-3 flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => signMessage("Hello from Stellar Loot!")}
                  className="text-white border-white/30 hover:bg-white/20"
                >
                  Sign Message
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Freighter Wallet:</strong> Install the Freighter browser extension to connect</p>
            <p>• <strong>Easy Transactions:</strong> Sign transactions and messages directly from your browser</p>
            <p>• <strong>Secure:</strong> Your private keys stay safe in your browser extension</p>
            <p>• <strong>Stellar Network:</strong> Works with both testnet and mainnet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletManager;
