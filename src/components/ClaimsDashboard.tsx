import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";

const ClaimsDashboard = () => {
  const claims = [
    {
      id: "CLM-2024-001",
      type: "Auto Insurance",
      amount: "$3,500",
      status: "verified",
      date: "2024-01-15",
      encrypted: true,
    },
    {
      id: "CLM-2024-002", 
      type: "Health Insurance",
      amount: "$1,200",
      status: "pending",
      date: "2024-01-18",
      encrypted: true,
    },
    {
      id: "CLM-2024-003",
      type: "Property Insurance", 
      amount: "$8,900",
      status: "processing",
      date: "2024-01-20",
      encrypted: true,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "processing": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-security text-security-foreground";
      case "pending": return "bg-yellow-500 text-white";
      case "processing": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative p-4 bg-trust-light rounded-2xl">
              <Shield className="h-12 w-12 text-trust" />
              <Lock className="h-6 w-6 text-security absolute -top-1 -right-1 bg-white rounded-full p-1" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Secure Claims Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor all your encrypted claims with full privacy protection and instant verification status.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-foreground">Recent Claims</h3>
          <Button className="bg-security hover:bg-security/90 text-security-foreground shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            File New Claim
          </Button>
        </div>

        <div className="grid gap-6">
          {claims.map((claim) => (
            <Card key={claim.id} className="p-6 shadow-lg border-0 bg-card hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="p-3 bg-trust-light rounded-xl">
                      <Shield className="h-6 w-6 text-trust" />
                    </div>
                    {claim.encrypted && (
                      <Lock className="h-4 w-4 text-security absolute -top-1 -right-1 bg-security-light rounded-full p-0.5" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{claim.id}</h4>
                    <p className="text-muted-foreground">{claim.type}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{claim.amount}</p>
                    <p className="text-sm text-muted-foreground">{claim.date}</p>
                  </div>
                  
                  <Badge className={`px-3 py-1 rounded-full ${getStatusColor(claim.status)} flex items-center space-x-1`}>
                    {getStatusIcon(claim.status)}
                    <span className="capitalize">{claim.status}</span>
                  </Badge>
                  
                  <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-security">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Zero-knowledge verification</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center bg-security-light border-0">
            <Lock className="h-10 w-10 text-security mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Total Encrypted Claims</h4>
            <p className="text-3xl font-bold text-security">12</p>
          </Card>
          
          <Card className="p-6 text-center bg-trust-light border-0">
            <CheckCircle className="h-10 w-10 text-trust mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Verified Claims</h4>
            <p className="text-3xl font-bold text-trust">8</p>
          </Card>
          
          <Card className="p-6 text-center bg-muted border-0">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Pending Review</h4>
            <p className="text-3xl font-bold text-muted-foreground">4</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClaimsDashboard;