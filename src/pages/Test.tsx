import React, { useState, useEffect } from 'react';
import { Client, networks } from 'bindings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wallet } from 'lucide-react';
import { useStellarWallet } from '@/hooks/useStellarWallet';
import { Address } from '@stellar/stellar-sdk';

function Test() {
  const [greeting, setGreeting] = useState('Loading...');
  const [inputValue, setInputValue] = useState('World');
  const [newMessage, setNewMessage] = useState('Hello_World');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('Hello');
  const [messageValidationError, setMessageValidationError] = useState<string | null>(null);
  
  const { walletConnected, publicKey, signTransaction } = useStellarWallet();

  // Debug: Log what we're importing
  useEffect(() => {
    console.log('Client import:', Client);
    console.log('networks import:', networks);
  }, []);

  // Validate message input for Stellar Symbol restrictions
  const validateMessage = (message: string): boolean => {
    // Stellar Symbols can only contain alphanumeric characters and underscores
    const symbolRegex = /^[a-zA-Z0-9_]+$/;
    if (!symbolRegex.test(message)) {
      setMessageValidationError('Message can only contain letters, numbers, and underscores (no spaces or special characters)');
      return false;
    }
    if (message.length > 32) {
      setMessageValidationError('Message must be 32 characters or less');
      return false;
    }
    setMessageValidationError(null);
    return true;
  };

  // Handle message input change with validation
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    validateMessage(value);
  };

  const fetchGreeting = async (to: string = 'World') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if networks are available
      if (!networks?.testnet) {
        throw new Error('Contract networks not available');
      }

      const contract = new Client({
        ...networks.testnet,
        rpcUrl: 'https://soroban-testnet.stellar.org:443'
      });
      
      const { result } = await contract.hello({ to });
      setGreeting(result.join(' '));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setGreeting('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessage = async () => {
    if (!walletConnected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    // Validate message before sending
    if (!validateMessage(newMessage)) {
      setError('Invalid message format');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Check if networks are available
      if (!networks?.testnet) {
        throw new Error('Contract networks not available');
      }

      const contract = new Client({
        ...networks.testnet,
        rpcUrl: 'https://soroban-testnet.stellar.org:443',
        // Provide the signTransaction function from the wallet
        signTransaction: signTransaction
      });
      
      // Create the transaction and sign/send it
      await contract.update_message({ 
        caller: publicKey, 
        new_message: newMessage 
      }).then((tx) => { 
        tx.signAndSend();
        setCurrentMessage(newMessage);
        setGreeting('Message updated successfully!');
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setGreeting('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  const handleHelloSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGreeting(inputValue);
  };

  const handleUpdateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary">Test</Badge>
            Hello World Contract Test
          </CardTitle>
          <CardDescription>
            Test the hello world smart contract functionality using Soroban testnet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Debug Info */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Debug Info</Label>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Client available: <Badge variant={Client ? "default" : "destructive"}>{Client ? "Yes" : "No"}</Badge></div>
              <div>Networks available: <Badge variant={networks ? "default" : "destructive"}>{networks ? "Yes" : "No"}</Badge></div>
              <div>Sign function available: <Badge variant={signTransaction ? "default" : "destructive"}>{signTransaction ? "Yes" : "No"}</Badge></div>
            </div>
          </div>

          {/* Wallet Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Wallet Status</Label>
            <div className="flex items-center gap-2">
              {walletConnected ? (
                <>
                  <Badge variant="default" className="bg-green-500">Connected</Badge>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}
                  </code>
                </>
              ) : (
                <Badge variant="destructive">Not Connected</Badge>
              )}
            </div>
          </div>

          {/* Contract Info */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Contract Details</Label>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Network: <Badge variant="outline">Testnet</Badge></div>
              <div>Contract ID: <code className="text-xs bg-muted px-1 rounded">
                {networks?.testnet?.contractId || 'Not available'}
              </code></div>
              <div>Current Message: <Badge variant="outline">{currentMessage}</Badge></div>
            </div>
          </div>

          {/* Greeting Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Contract Response</Label>
            <div className="p-4 bg-muted rounded-lg min-h-[60px] flex items-center">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Calling contract...</span>
                </div>
              ) : (
                <span className={error ? 'text-destructive' : 'text-foreground'}>
                  {greeting}
                </span>
              )}
            </div>
            {error && (
              <p className="text-sm text-destructive">
                Error: {error}
              </p>
            )}
          </div>

          {/* Hello Function Form */}
          <form onSubmit={handleHelloSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-input">Test Hello Function</Label>
              <div className="flex gap-2">
                <Input
                  id="name-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a name to greet..."
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Calling...
                    </>
                  ) : (
                    'Call Hello'
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Update Message Form */}
          <form onSubmit={handleUpdateMessage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message-input">Update Message (Requires Wallet)</Label>
              <div className="flex gap-2">
                <Input
                  id="message-input"
                  value={newMessage}
                  onChange={handleMessageChange}
                  placeholder="Enter new message (letters, numbers, underscores only)..."
                  disabled={isLoading || !walletConnected}
                  className={messageValidationError ? 'border-destructive' : ''}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !newMessage.trim() || !walletConnected || !!messageValidationError}
                  variant={!walletConnected ? "secondary" : "default"}
                >
                  {!walletConnected ? (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </>
                  ) : isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    'Update Message'
                  )}
                </Button>
              </div>
              {messageValidationError && (
                <p className="text-sm text-destructive">
                  {messageValidationError}
                </p>
              )}
              {!walletConnected && (
                <p className="text-sm text-muted-foreground">
                  Connect your wallet to update the message (costs 1 XLM)
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Stellar Symbols can only contain letters, numbers, and underscores. 
                No spaces, commas, or special characters allowed.
              </p>
            </div>
          </form>

          {/* Instructions */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">How it works</Label>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <strong>Hello Function:</strong> Calls the contract to get a greeting (read-only)</p>
              <p>• <strong>Update Message:</strong> Changes the stored message (requires wallet, costs 1 XLM)</p>
              <p>• The contract stores a message that gets combined with your input</p>
              <p>• Connect your wallet to test the update_message function</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Test; 