# Vercel Deployment Guide for Claim Vault Secure

This guide provides step-by-step instructions for deploying the Claim Vault Secure application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `chloes93/claim-vault-secure`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite project

### Step 3: Configure Project Settings

1. **Project Name**: `claim-vault-secure` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### Step 4: Set Environment Variables

Click "Environment Variables" and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
NEXT_PUBLIC_VERIFIER_ADDRESS=YOUR_VERIFIER_ADDRESS
```

**Important**: Replace `YOUR_DEPLOYED_CONTRACT_ADDRESS` and `YOUR_VERIFIER_ADDRESS` with actual addresses after contract deployment.

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL

### Step 6: Configure Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow DNS configuration instructions

## Post-Deployment Configuration

### Smart Contract Deployment

1. Deploy the `ClaimVaultSecure.sol` contract to Sepolia testnet
2. Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable
3. Redeploy the application

### Verifier Setup

1. Set up a verifier address for claim validation
2. Update the `NEXT_PUBLIC_VERIFIER_ADDRESS` environment variable
3. Redeploy the application

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia chain ID | `11155111` |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for Sepolia | `https://sepolia.infura.io/v3/YOUR_KEY` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `YOUR_WALLET_CONNECT_PROJECT_ID` |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | `YOUR_INFURA_API_KEY` |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `NEXT_PUBLIC_VERIFIER_ADDRESS` | Verifier wallet address | `0x...` |

## Build Configuration

The project uses the following build settings:

- **Framework**: Vite
- **Node.js Version**: 18.x
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are properly installed
2. **Environment Variables**: Ensure all required variables are set
3. **Contract Address**: Verify the contract is deployed and address is correct
4. **RPC Issues**: Check RPC endpoint is accessible and has sufficient quota

### Support

For deployment issues:
1. Check Vercel build logs
2. Verify environment variables
3. Ensure all dependencies are compatible
4. Contact support if issues persist

## Security Notes

- Never commit sensitive environment variables to the repository
- Use Vercel's environment variable system for all secrets
- Regularly rotate API keys and tokens
- Monitor deployment logs for any security issues

## Performance Optimization

- Enable Vercel's Edge Functions for better performance
- Use Vercel's CDN for static assets
- Configure proper caching headers
- Monitor Core Web Vitals

## Monitoring

- Set up Vercel Analytics for usage tracking
- Configure error monitoring
- Set up uptime monitoring
- Monitor build performance

This completes the Vercel deployment setup for Claim Vault Secure.