import React, { useState, useEffect } from 'react';
import { Client, networks } from 'hello_world';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wallet, RefreshCw } from 'lucide-react';
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
  
  const { 
    walletConnected, 
    publicKey, 
    signTransaction,
    accountExists,
    verifyAccountFunding
  } = useStellarWallet();

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

  // Improved account funding handler
  const handleFundAccount = async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`,
        { method: 'GET' }
      );
      
      if (response.ok) {
        // Wait a moment for the funding to propagate
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verify funding after friendbot
        const exists = await verifyAccountFunding(publicKey);
        if (exists) {
          setError(null);
          setGreeting('Account funded successfully! Please try the transaction again.');
        } else {
          setError('Funding completed but account verification failed. Please try again.');
        }
      } else {
        const errorText = await response.text();
        setError(`Friendbot request failed: ${errorText}`);
      }
    } catch (err) {
      setError('Failed to fund account');
    } finally {
      setIsLoading(false);
    }
  };

  // Manual account verification
  const handleVerifyAccount = async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const exists = await verifyAccountFunding(publicKey);
      if (exists) {
        setError(null);
        setGreeting('Account verified successfully!');
      } else {
        setError('Account verification failed. Account may not be funded.');
      }
    } catch (err) {
      setError('Account verification failed');
    } finally {
      setIsLoading(false);
    }
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
        rpcUrl: 'https://soroban-testnet.stellar.org'
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

    // Check if account exists before attempting transaction
    if (accountExists === false) {
      setError('Account not funded on testnet. Please fund your account first.');
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
        rpcUrl: 'https://soroban-testnet.stellar.org',
        // Provide the signTransaction function from the wallet
        signTransaction: signTransaction
      });
      
      // Create the transaction
      const tx = await contract.update_message({ 
        caller: publicKey, 
        new_message: newMessage 
      });
      
      // Properly handle transaction signing and submission
      try {
        await tx.signAndSend();
        setCurrentMessage(newMessage);
        setGreeting('Message updated successfully!');
      } catch (signError: any) {
        // Improved error handling
        let errorMsg = signError.message;
        
        // Handle specific Stellar errors
        if (signError.response?.data?.extras?.result_codes) {
          const codes = signError.response.data.extras.result_codes;
          errorMsg = `Transaction failed: ${codes.transaction || codes.operations}`;
        }
        
        // Handle user rejection
        if (signError.code === -4) {
          errorMsg = 'Transaction rejected by user';
        }
        
        // Handle account not found
        if (signError.message?.includes('txNoAccount')) {
          errorMsg = 'Account not found on network. Please fund your account.';
        }
        
        throw new Error(errorMsg);
      }
      
    } catch (err: any) {
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
                  {accountExists === false && (
                    <Badge variant="destructive">Not Funded</Badge>
                  )}
                  {accountExists === true && (
                    <Badge variant="default" className="bg-blue-500">Funded</Badge>
                  )}
                  {accountExists === null && (
                    <Badge variant="secondary">Checking...</Badge>
                  )}
                </>
              ) : (
                <Badge variant="destructive">Not Connected</Badge>
              )}
            </div>
          </div>

          {/* Account Actions */}
          {walletConnected && publicKey && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Account Actions</Label>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleVerifyAccount}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Verify Account
                </Button>
                {accountExists === false && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleFundAccount}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Wallet className="h-4 w-4 mr-2" />
                    )}
                    Fund with Friendbot
                  </Button>
                )}
              </div>
            </div>
          )}

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
              <div className="text-sm text-destructive">
                <p>Error: {error}</p>
                {!accountExists && publicKey && (
                  <Button 
                    variant="link" 
                    className="ml-0 p-0 text-destructive underline h-auto"
                    onClick={handleFundAccount}
                    disabled={isLoading}
                  >
                    Fund Account with Friendbot
                  </Button>
                )}
              </div>
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
                  disabled={isLoading || !newMessage.trim() || !walletConnected || !!messageValidationError || accountExists === false}
                  variant={!walletConnected ? "secondary" : "default"}
                >
                  {!walletConnected ? (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </>
                  ) : accountExists === false ? (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Fund Account
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
                  Connect your wallet to update the message
                </p>
              )}
              {accountExists === false && walletConnected && (
                <p className="text-sm text-muted-foreground">
                  Your account needs to be funded on testnet before you can update the message
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
              <p>• <strong>Update Message:</strong> Changes the stored message (requires funded wallet)</p>
              <p>• The contract stores a message that gets combined with your input</p>
              <p>• Connect your wallet and fund it to test the update_message function</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Test; 