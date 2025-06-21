
import { useEffect, useState } from "react";
import {
  FREIGHTER_ID,
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";

export const useStellarWallet = (network: WalletNetwork = WalletNetwork.TESTNET) => {
  const [walletKit, setWalletKit] = useState<StellarWalletsKit | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const kit = new StellarWalletsKit({
      network,
      selectedWalletId: FREIGHTER_ID,
      modules: [new FreighterModule()],
    });
    setWalletKit(kit);

    // Check if wallet is already connected by trying to get address
    const checkConnection = async () => {
      try {
        const address = await kit.getAddress();
        if (address) {
          setWalletConnected(true);
          setPublicKey(address.address);
        }
      } catch (error) {
        // Wallet not connected, which is expected
        console.log('No wallet connected');
      }
    };

    checkConnection();

    return () => {
      kit.disconnect();
    };
  }, [network]);

  const connectWallet = async () => {
    if (!walletKit) return;
    
    try {
      await walletKit.openModal({
        onWalletSelected: async (option) => {
          walletKit.setWallet(option.id);
          const address = await walletKit.getAddress();
          setWalletConnected(true);
          setPublicKey(address.address);
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
    connectWallet, 
    disconnectWallet,
    signTransaction,
    signMessage
  };
};
