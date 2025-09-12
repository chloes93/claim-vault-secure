# Vercel Deployment Guide for Claim Vault Secure

This guide provides step-by-step instructions for deploying the Claim Vault Secure application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account with access to the repository
- Environment variables ready

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `chloes93/claim-vault-secure`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite React project

### 3. Configure Project Settings

1. **Project Name**: `claim-vault-secure` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Set Environment Variables

Click "Environment Variables" and add the following:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_VERIFIER_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: Replace the placeholder contract addresses with actual deployed contract addresses when available.

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL

### 6. Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow DNS configuration instructions

## Post-Deployment Configuration

### 1. Update Contract Addresses

After deploying your smart contracts to Sepolia testnet:

1. Go to Vercel project settings
2. Update environment variables with actual contract addresses
3. Redeploy the application

### 2. Test the Application

1. Visit your deployment URL
2. Connect a Web3 wallet (MetaMask, etc.)
3. Switch to Sepolia testnet
4. Test the claim filing functionality

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia chain ID | `11155111` |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for Sepolia | `https://sepolia.infura.io/v3/YOUR_KEY` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `2ec9743d0d0cd7fb94dee1a7e6d33475` |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | `b18fb7e6ca7045ac83c41157ab93f990` |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `NEXT_PUBLIC_VERIFIER_ADDRESS` | Verifier contract address | `0x...` |

## Troubleshooting

### Build Failures

1. **Dependency Issues**: Ensure all dependencies are in `package.json`
2. **Environment Variables**: Check that all required variables are set
3. **Build Logs**: Check Vercel build logs for specific error messages

### Runtime Issues

1. **Wallet Connection**: Ensure WalletConnect project ID is correct
2. **Network Issues**: Verify RPC URL is accessible
3. **Contract Calls**: Check that contract addresses are correct

### Performance Optimization

1. **Bundle Size**: Monitor bundle size in Vercel analytics
2. **Loading Times**: Use Vercel's performance insights
3. **Caching**: Configure appropriate cache headers

## Automatic Deployments

Vercel automatically deploys when you push to the main branch:

1. Push changes to GitHub
2. Vercel detects the push
3. Automatic deployment starts
4. New version goes live after successful build

## Monitoring and Analytics

1. **Analytics**: Enable Vercel Analytics in project settings
2. **Logs**: Monitor function logs in Vercel dashboard
3. **Performance**: Use Vercel's performance monitoring tools

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to Git
2. **HTTPS**: Vercel provides HTTPS by default
3. **CORS**: Configure CORS settings if needed
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Project Issues: [github.com/chloes93/claim-vault-secure/issues](https://github.com/chloes93/claim-vault-secure/issues)

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Custom domain configured (if applicable)
- [ ] Contract addresses updated
- [ ] Application tested end-to-end
- [ ] Analytics enabled
- [ ] Monitoring configured

---

**Note**: This deployment guide assumes you have already deployed your smart contracts to the Sepolia testnet. If you haven't done so, you'll need to deploy the contracts first and then update the environment variables with the actual contract addresses.
