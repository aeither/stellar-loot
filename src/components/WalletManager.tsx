import React, { useState } from "react";
import { generateKeypair, fundTestnetAccount, getAccountBalance } from "@/stellar";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Wallet, Key, Copy, RefreshCw, Sparkles, Loader2 } from "lucide-react";
import WalletConnector from "./WalletConnector";

interface ManualWallet {
  publicKey: string;
  secretKey: string;
  balance?: any;
}

const WalletManager = () => {
  const [manualWallet, setManualWallet] = useState<ManualWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [fundingLoading, setFundingLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const { walletConnected, publicKey, isInitializing, signTransaction, signMessage } = useStellarWallet();

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const keys = generateKeypair();
      setManualWallet(keys);
    } catch (error) {
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFundWallet = async () => {
    if (!manualWallet) return;
    
    setFundingLoading(true);
    try {
      const funded = await fundTestnetAccount(manualWallet.publicKey);
      if (funded) {
        console.log('Wallet funded successfully');
        // Refresh balance after funding
        await handleRefreshBalance();
      }
    } catch (error) {
      console.error('Error funding wallet:', error);
    } finally {
      setFundingLoading(false);
    }
  };

  const handleRefreshBalance = async () => {
    if (!manualWallet) return;
    
    setBalanceLoading(true);
    try {
      const balance = await getAccountBalance(manualWallet.publicKey);
      setManualWallet(prev => prev ? { ...prev, balance } : null);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setBalanceLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatBalance = (balance: any) => {
    if (!balance) return '0 XLM';
    const xlmBalance = balance.find((b: any) => b.asset_type === 'native');
    return xlmBalance ? `${parseFloat(xlmBalance.balance).toFixed(2)} XLM` : '0 XLM';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Stellar Wallet Manager</h1>
        <p className="text-gray-300">Connect your wallet or create a new one</p>
      </div>

      {/* Browser Wallet Connection */}
      <Card className="bg-gradient-to-br from-purple-800/60 to-indigo-800/60 backdrop-blur-sm border-2 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Browser Wallet (Freighter/xBull)
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

      <Separator className="bg-white/20" />

      {/* Manual Wallet Creation */}
      <Card className="bg-gradient-to-br from-blue-800/60 to-cyan-800/60 backdrop-blur-sm border-2 border-blue-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Manual Wallet Creation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!manualWallet ? (
            <div className="text-center">
              <p className="text-gray-300 mb-4">Create a new Stellar wallet for testing</p>
              <Button 
                onClick={handleCreateWallet} 
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create New Wallet
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Public Key */}
              <div>
                <Label className="text-white text-sm font-semibold">Public Key</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input 
                    value={manualWallet.publicKey} 
                    readOnly 
                    className="bg-white/10 border-white/20 text-white font-mono text-sm"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(manualWallet.publicKey)}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Secret Key */}
              <div>
                <Label className="text-white text-sm font-semibold">Secret Key (Keep Safe!)</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input 
                    value={manualWallet.secretKey} 
                    readOnly 
                    type="password"
                    className="bg-white/10 border-white/20 text-white font-mono text-sm"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(manualWallet.secretKey)}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Balance */}
              <div>
                <Label className="text-white text-sm font-semibold">Balance</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2">
                    <span className="text-white font-mono">
                      {formatBalance(manualWallet.balance)}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={handleRefreshBalance}
                    disabled={balanceLoading}
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className={`w-4 h-4 ${balanceLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-2">
                <Button 
                  onClick={handleFundWallet}
                  disabled={fundingLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold"
                >
                  {fundingLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Funding...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Fund on Testnet
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setManualWallet(null)}
                  className="text-white border-white/30 hover:bg-white/20"
                >
                  Create New
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
            <p>• <strong>Browser Wallet:</strong> Connect Freighter or xBull for easy transactions</p>
            <p>• <strong>Manual Wallet:</strong> Create a new wallet for testing and development</p>
            <p>• <strong>Testnet Funding:</strong> Use the "Fund on Testnet" button to get test XLM</p>
            <p>• <strong>Security:</strong> Never share your secret key in production</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletManager;
