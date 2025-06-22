# 🌟 Stellar Loot

> **"Collect Cards, Earn XLM, Build Your Galactic Empire!"** 🚀

[![Stellar](https://img.shields.io/badge/Stellar-Network-yellow?style=for-the-badge&logo=stellar)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart%20Contracts-purple?style=for-the-badge)](https://soroban.stellar.org)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev)

## 🎮 What is Stellar Loot?

**Stellar Loot** is a mobile-first, blockchain-powered card collection game built on the **Stellar Network** using **Soroban smart contracts**. Players collect unique NFT cards, complete sets, and earn real **XLM rewards** in a fun, gamified experience.

### 🎯 The Problem We Solve

- **High Barrier to Entry**: Traditional blockchain games are complex and intimidating for new users
- **Lack of Mobile-First Design**: Most DeFi apps aren't optimized for mobile users
- **No Real Rewards**: Many games offer worthless tokens instead of real value
- **Poor User Experience**: Complex wallet connections and transaction processes

### 💡 Our Solution

**Stellar Loot** transforms the complex world of blockchain gaming into an accessible, fun, and rewarding experience:

- 🎮 **Mobile-First Design**: Optimized for touch interactions and mobile screens
- 🎯 **Simple Gameplay**: Easy-to-understand card collection mechanics
- 💰 **Real Rewards**: Earn actual XLM for completing card sets
- 🔗 **Seamless Integration**: One-click wallet connection with Freighter/xBull
- ⚡ **Fast Transactions**: Leveraging Stellar's 3-5 second confirmation times
- 🎨 **Beautiful UI**: Modern, gradient-rich design with smooth animations

## 🚀 Key Features

### 🎴 **Card Collection System**
- Collect unique NFT cards with stunning artwork
- Complete sets to unlock XLM rewards
- Track your collection with real-time updates
- Duplicate cards add value to your collection

### 💎 **NFT Minting**
- One-click NFT minting through "Chest Opening"
- Real-time transaction feedback with toast notifications
- Secure wallet integration with Stellar wallets
- IPFS-hosted card metadata and images

### 🏆 **Rewards System**
- Earn XLM for completing card sets
- Transparent reward distribution
- Real-time balance updates
- Secure transaction processing

### 📱 **Mobile-First Experience**
- Responsive design optimized for mobile devices
- Touch-friendly interface
- Smooth animations and transitions
- Offline-capable with service workers

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for responsive, utility-first styling
- **Radix UI** for accessible, unstyled components
- **Framer Motion** for smooth animations

### **Blockchain & Smart Contracts**
- **Stellar Network** for fast, low-cost transactions
- **Soroban Smart Contracts** written in Rust
- **Soroban SDK** for contract interactions
- **LaunchTube** for transaction submission and monitoring

### **Wallet Integration**
- **Stellar Wallets Kit** for multi-wallet support
- **Freighter** and **xBull** wallet compatibility
- **Secure key management** with environment variables

### **Infrastructure**
- **Vercel** for deployment and hosting
- **IPFS** for decentralized file storage
- **GitHub** for version control and collaboration

## 🎯 Smart Contract Features

Our **Soroban NFT Contract** (`soroban_nft.rs`) includes:

```rust
// Core NFT functionality
- mint(to: Address)           // Mint new NFTs
- owner_of(token_id: i128)    // Get token owner
- tokens_of(owner: Address)   // Get user's tokens
- transfer(from, to, token_id) // Transfer tokens
- approve(operator, token_id)  // Approve transfers

// Game-specific features
- Limited supply (1000 tokens)
- Metadata storage (name, symbol, URI, image)
- Event emission for frontend updates
- Authorization framework
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Stellar wallet (Freighter or xBull)
- Testnet XLM for transactions

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stellar-loot.git
cd stellar-loot

# Install dependencies
npm install

# Set up environment
npx tsx scripts/read-alice.ts

# Start development server
npm run dev
```

### Smart Contract Deployment

```bash
# Navigate to contract directory
cd contracts/nft

# Build the contract
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_nft.wasm \
  --source alice \
  --network testnet

# Generate TypeScript bindings
stellar contract bindings typescript \
  --contract-id YOUR_CONTRACT_ID \
  --network testnet \
  --output-dir bindings
```

## 🎮 How to Play

1. **Connect Wallet**: Link your Stellar wallet (Freighter/xBull)
2. **Open Chests**: Click "Open Chest" to mint new NFT cards
3. **Collect Cards**: Build your collection with unique cards
4. **Complete Sets**: Gather all cards in a set to earn XLM rewards
5. **Trade & Share**: Transfer cards to friends or trade them

## 🌟 Why Stellar?

- **⚡ Lightning Fast**: 3-5 second transaction confirmations
- **💰 Low Fees**: Transactions cost fractions of a cent
- **🌍 Eco-Friendly**: Carbon-neutral blockchain
- **🔒 Secure**: Battle-tested network with 7+ years of uptime
- **🌐 Interoperable**: Built-in DEX and asset issuance
- **📱 Mobile Ready**: Perfect for mobile-first applications

## 🏆 Hackathon Highlights

### **Innovation**
- First mobile-first card collection game on Stellar
- Seamless integration of Soroban smart contracts
- Real-time transaction feedback with toast notifications

### **Technical Excellence**
- Rust smart contracts with comprehensive testing
- TypeScript frontend with full type safety
- Modern React patterns with hooks and context

### **User Experience**
- Intuitive mobile-first design
- One-click wallet connection
- Real-time balance and transaction updates

### **Real-World Impact**
- Demonstrates practical use of Soroban smart contracts
- Shows potential for gaming on Stellar network
- Provides template for future DeFi applications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Scripts

```bash
# Generate secret key from mnemonic
npx tsx scripts/phrase2secret.ts

# Read Alice's identity and create .env
npx tsx scripts/read-alice.ts

# Mint NFT (requires .env setup)
npx tsx scripts/nft2.ts

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stellar Development Foundation** for the amazing blockchain platform
- **Soroban Team** for the smart contract framework
- **LaunchTube** for transaction infrastructure
- **Vercel** for hosting and deployment

---

**Built with ❤️ for the Stellar Community**

*Ready to start your galactic card collection? Connect your wallet and begin your journey!* 🚀✨