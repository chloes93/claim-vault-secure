# Claim Vault Secure

A secure, privacy-preserving insurance claims platform built with FHE (Fully Homomorphic Encryption) technology. This platform enables users to file insurance claims while maintaining complete privacy of sensitive data through encrypted processing.

## Features

- **FHE-Encrypted Claims**: All sensitive claim data is encrypted using Fully Homomorphic Encryption
- **Wallet Integration**: Seamless connection with popular Web3 wallets via RainbowKit
- **Privacy-First Design**: Zero-knowledge proof system for claim verification
- **Multi-Chain Support**: Built for Ethereum Sepolia testnet
- **Secure Processing**: Military-grade encryption for all claim data
- **Real-time Verification**: Instant claim validation and processing

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHEVM

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chloes93/claim-vault-secure.git
cd claim-vault-secure
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
NEXT_PUBLIC_VERIFIER_ADDRESS=YOUR_VERIFIER_ADDRESS
```

## Smart Contract

The platform uses a custom FHE-enabled smart contract (`ClaimVaultSecure.sol`) that:

- Encrypts all sensitive claim data using FHE
- Maintains privacy while enabling verification
- Supports multiple claim types (Auto, Health, Property, Life)
- Implements reputation systems for users and insurers
- Provides secure fund processing

## Security Features

- **End-to-End Encryption**: All data encrypted with FHE
- **Zero-Knowledge Proofs**: Verify claims without revealing data
- **Decentralized Verification**: Multiple verifiers for claim validation
- **Reputation System**: Trust scoring for all participants
- **Secure Fund Processing**: Encrypted transaction handling

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.