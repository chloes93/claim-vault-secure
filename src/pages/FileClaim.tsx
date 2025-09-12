import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Upload, CheckCircle, ArrowLeft, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const FileClaim = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [claimType, setClaimType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleSubmitClaim = () => {
    // Handle claim submission logic here
    console.log("Claim submitted:", { claimType, amount, description });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative p-3 bg-security-light rounded-xl">
              <Lock className="h-8 w-8 text-security" />
              <Shield className="h-4 w-4 text-trust absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">File New Claim</h1>
              <p className="text-muted-foreground">Submit an encrypted insurance claim with complete privacy</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Wallet Connection Step */}
          <Card className="p-6 shadow-lg border-0 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Step 1: Connect Wallet</h3>
              {isWalletConnected && (
                <Badge className="bg-security text-security-foreground">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Connected
                </Badge>
              )}
            </div>
            
            {!isWalletConnected ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">Connect your wallet to securely file an encrypted claim</p>
                <Button 
                  onClick={handleConnectWallet}
                  className="w-full bg-security hover:bg-security/90 text-security-foreground"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-security">
                <Wallet className="h-4 w-4" />
                <span>Wallet: 0x742d35...BC656</span>
              </div>
            )}
          </Card>

          {/* Claim Details Form */}
          <Card className="p-6 shadow-lg border-0 bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">Step 2: Claim Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Claim Type</label>
                <Select value={claimType} onValueChange={setClaimType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Insurance</SelectItem>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="property">Property Insurance</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Claim Amount</label>
                <Input
                  type="text"
                  placeholder="$0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <Textarea
                  placeholder="Describe your claim in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Supporting Documents</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground mb-2">Drag and drop files or click to upload</p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Encryption Notice */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-security-light to-trust-light">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-6 w-6 text-security" />
                <Shield className="h-6 w-6 text-trust" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Privacy Protected</h4>
                <p className="text-sm text-muted-foreground">Your claim will be encrypted using zero-knowledge proofs, ensuring complete privacy while enabling verification.</p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              onClick={handleSubmitClaim}
              disabled={!isWalletConnected || !claimType || !amount}
              className="flex-1 bg-security hover:bg-security/90 text-security-foreground py-6 text-lg"
            >
              <Lock className="mr-2 h-5 w-5" />
              Submit Encrypted Claim
            </Button>
            
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full py-6 text-lg border-border hover:bg-muted">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileClaim;