import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Lock, CheckCircle, Copy } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative p-4 bg-security-light rounded-2xl">
                <Wallet className="h-12 w-12 text-security" />
                <Lock className="h-6 w-6 text-trust absolute -top-1 -right-1 bg-white rounded-full p-1" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-xl text-muted-foreground">
              Securely connect your wallet to file encrypted insurance claims
            </p>
          </div>

          <Card className="p-8 shadow-lg border-0 bg-card">
            {!isConnected ? (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Choose Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect with your preferred wallet to start filing secure claims
                  </p>
                </div>

                <div className="flex justify-center">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading';
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === 'authenticated');

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <Button 
                                  onClick={openConnectModal}
                                  className="w-full py-6 text-lg bg-security hover:bg-security/90 text-security-foreground shadow-lg"
                                >
                                  <Wallet className="mr-3 h-6 w-6" />
                                  Connect Wallet
                                </Button>
                              );
                            }

                            if (chain.unsupported) {
                              return (
                                <Button 
                                  onClick={openChainModal}
                                  variant="destructive"
                                  className="w-full py-6 text-lg"
                                >
                                  Wrong network
                                </Button>
                              );
                            }

                            return (
                              <div className="space-y-4">
                                <Button
                                  onClick={openAccountModal}
                                  className="w-full py-6 text-lg bg-security hover:bg-security/90 text-security-foreground shadow-lg"
                                >
                                  <Wallet className="mr-3 h-6 w-6" />
                                  {account.displayName}
                                </Button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-security" />
                      <span>Bank-level security</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lock className="h-4 w-4 text-security" />
                      <span>End-to-end encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Badge className="bg-security text-security-foreground px-4 py-2 text-lg rounded-full">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Wallet Connected
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Wallet Successfully Connected</h3>
                  
                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Wallet className="h-6 w-6 text-security" />
                        <span className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(address || '')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 py-6 text-lg bg-security hover:bg-security/90 text-security-foreground shadow-lg"
                  >
                    <Lock className="mr-2 h-5 w-5" />
                    File New Claim
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 py-6 text-lg border-border hover:bg-muted"
                  >
                    View Dashboard
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Shield className="h-8 w-8 text-security mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Secure</p>
                      <p className="text-xs text-muted-foreground">Military-grade encryption</p>
                    </div>
                    <div>
                      <Lock className="h-8 w-8 text-security mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Private</p>
                      <p className="text-xs text-muted-foreground">Zero-knowledge proofs</p>
                    </div>
                    <div>
                      <CheckCircle className="h-8 w-8 text-security mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Verified</p>
                      <p className="text-xs text-muted-foreground">Instant claim validation</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WalletConnect;