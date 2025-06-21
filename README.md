# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c4d72b88-4d38-4ac0-aad1-db9e0e271e1d

## Stellar Wallet Integration

This project includes comprehensive Stellar wallet functionality with support for:

### Features
- **Browser Wallet Connection**: Connect Freighter and xBull wallets
- **Manual Wallet Creation**: Generate new Stellar keypairs for testing
- **Testnet Funding**: Automatically fund wallets on Stellar testnet
- **Balance Checking**: View wallet balances in real-time
- **Transaction Signing**: Sign transactions and messages with connected wallets

### How to Use
1. Navigate to the **Wallet** tab in the bottom navigation
2. **Connect Browser Wallet**: Click "Connect Wallet" to connect Freighter or xBull
3. **Create Manual Wallet**: Click "Create New Wallet" to generate a test wallet
4. **Fund Testnet**: Use "Fund on Testnet" to get test XLM for development

### Dependencies
- `@stellar/stellar-sdk`: Core Stellar functionality
- `@creit.tech/stellar-wallets-kit`: Browser wallet integration

### Security Notes
- Manual wallet secret keys are for testing only
- Never share secret keys in production
- Use browser wallets for production applications

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c4d72b88-4d38-4ac0-aad1-db9e0e271e1d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c4d72b88-4d38-4ac0-aad1-db9e0e271e1d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
