import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, Eye, CheckCircle, AlertCircle, Search } from "lucide-react";

const InsurerVerification = () => {
  const pendingClaims = [
    {
      id: "CLM-2024-001",
      claimant: "Anonymous-47A3",
      type: "Auto Insurance",
      amount: "$3,500",
      confidence: 95,
      riskScore: "Low",
      verificationSteps: ["Identity Verified", "Documents Authenticated", "Policy Active"],
    },
    {
      id: "CLM-2024-002", 
      claimant: "Anonymous-8B2F",
      type: "Health Insurance",
      amount: "$1,200",
      confidence: 88,
      riskScore: "Medium",
      verificationSteps: ["Identity Verified", "Documents Pending", "Policy Active"],
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-security text-security-foreground";
      case "Medium": return "bg-yellow-500 text-white";
      case "High": return "bg-destructive text-destructive-foreground";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative p-4 bg-trust-light rounded-2xl">
              <Eye className="h-12 w-12 text-trust" />
              <Shield className="h-6 w-6 text-security absolute -top-1 -right-1 bg-white rounded-full p-1" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insurer Verification Portal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verify claims instantly without accessing sensitive policyholder data using zero-knowledge proofs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center bg-security-light border-0">
            <Shield className="h-10 w-10 text-security mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Claims to Verify</h4>
            <p className="text-3xl font-bold text-security">24</p>
          </Card>
          
          <Card className="p-6 text-center bg-trust-light border-0">
            <CheckCircle className="h-10 w-10 text-trust mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Verified Today</h4>
            <p className="text-3xl font-bold text-trust">18</p>
          </Card>
          
          <Card className="p-6 text-center bg-muted border-0">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Avg. Processing</h4>
            <p className="text-3xl font-bold text-muted-foreground">2.3s</p>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-foreground">Pending Claims Verification</h3>
            <Button variant="outline" className="border-border hover:bg-muted">
              <Search className="mr-2 h-4 w-4" />
              Search Claims
            </Button>
          </div>

          {pendingClaims.map((claim) => (
            <Card key={claim.id} className="p-6 shadow-lg border-0 bg-card">
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="p-3 bg-trust-light rounded-xl">
                        <Shield className="h-6 w-6 text-trust" />
                      </div>
                      <Lock className="h-4 w-4 text-security absolute -top-1 -right-1 bg-security-light rounded-full p-0.5" />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{claim.id}</h4>
                      <p className="text-muted-foreground">Claimant: {claim.claimant}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">{claim.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="text-sm font-medium">{claim.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Verification Confidence</span>
                      <span className="text-sm font-bold text-security">{claim.confidence}%</span>
                    </div>
                    <Progress value={claim.confidence} className="h-2" />
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Risk Assessment</span>
                    <Badge className={`ml-2 ${getRiskColor(claim.riskScore)}`}>
                      {claim.riskScore} Risk
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    {claim.verificationSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-security" />
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-3">
                  <Button className="bg-security hover:bg-security/90 text-security-foreground shadow-lg">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Claim
                  </Button>
                  
                  <Button variant="outline" className="border-border hover:bg-muted">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Flag for Review
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-security">
                      <Lock className="h-4 w-4" />
                      <span>Zero-knowledge verification</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Privacy preserved</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground">Last updated: 2 minutes ago</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-security-light to-trust-light rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Revolutionary Privacy Protection
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our zero-knowledge verification system allows you to validate claims authenticity 
              without ever accessing sensitive policyholder information.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-security" />
                <span className="text-sm font-medium">End-to-end Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-security" />
                <span className="text-sm font-medium">Zero-knowledge Proofs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-security" />
                <span className="text-sm font-medium">Instant Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsurerVerification;