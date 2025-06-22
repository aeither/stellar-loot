import { useEffect, useState } from "react";
import {
  FREIGHTER_ID,
  FreighterModule,
  xBullModule,
  StellarWalletsKit,
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";

export const useStellarWallet = (network: WalletNetwork = WalletNetwork.TESTNET) => {
  const [walletKit, setWalletKit] = useState<StellarWalletsKit | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [accountExists, setAccountExists] = useState<boolean | null>(null);

  // Improved account existence check function using direct HTTP request
  const verifyAccountFunding = async (publicKey: string): Promise<boolean> => {
    try {
      const horizonUrl = network === WalletNetwork.TESTNET 
        ? 'https://horizon-testnet.stellar.org' 
        : 'https://horizon.stellar.org';
      
      const response = await fetch(`${horizonUrl}/accounts/${publicKey}`);
      
      if (response.ok) {
        const account = await response.json();
        console.log('Account loaded successfully:', account.id);
        console.log('Account balances:', account.balances);
        return true;
      } else if (response.status === 404) {
        console.log('Account not found on network');
        return false;
      } else {
        console.log('Account verification failed with status:', response.status);
        return false;
      }
    } catch (error: any) {
      console.error('Account verification failed:', error);
      console.log('Account verification error:', error.message);
      return false;
    }
  };

  useEffect(() => {
    const initializeWalletKit = async () => {
      try {
        setIsInitializing(true);
        
        const kit = new StellarWalletsKit({
          network,
          selectedWalletId: FREIGHTER_ID,
          modules: [new xBullModule(), new FreighterModule()],
        });
        
        setWalletKit(kit);

        try {
          const address = await kit.getAddress();
          if (address && address.address) {
            setWalletConnected(true);
            setPublicKey(address.address);
            
            const exists = await verifyAccountFunding(address.address);
            setAccountExists(exists);
            console.log('Account exists check result:', exists);
          }
        } catch (error) {
          console.log('No wallet connected');
        }
      } catch (error) {
        console.error('Error initializing wallet kit:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeWalletKit();

    return () => {
      if (walletKit) {
        walletKit.disconnect().catch(console.error);
      }
    };
  }, [network]);

  const connectWallet = async () => {
    if (!walletKit || isInitializing) return;
    
    try {
      await walletKit.openModal({
        onWalletSelected: async (option) => {
          try {
            walletKit.setWallet(option.id);
            const address = await walletKit.getAddress();
            setWalletConnected(true);
            setPublicKey(address.address);
            
            const exists = await verifyAccountFunding(address.address);
            setAccountExists(exists);
            console.log('Account exists check result after connection:', exists);
          } catch (error) {
            console.error('Error after wallet selection:', error);
          }
        },
        onClosed: (error) => {
          if (error) {
            console.error('Modal closed with error:', error);
          }
        },
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    if (!walletKit) return;
    
    try {
      await walletKit.disconnect();
      setWalletConnected(false);
      setPublicKey(null);
      setAccountExists(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const signTransaction = async (transactionXDR: string) => {
    if (!walletKit || !walletConnected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      return await walletKit.signTransaction(transactionXDR);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  const signMessage = async (message: string) => {
    if (!walletKit || !walletConnected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      return await walletKit.signMessage(message);
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  return { 
    walletKit, 
    walletConnected, 
    publicKey,
    isInitializing,
    accountExists,
    connectWallet, 
    disconnectWallet,
    signTransaction,
    signMessage,
    verifyAccountFunding
  };
};
