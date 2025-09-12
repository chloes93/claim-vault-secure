import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ArrowLeft, 
  Download,
  Flag,
  Eye
} from "lucide-react";

const ClaimDetails = () => {
  const { id } = useParams();
  const [reviewNote, setReviewNote] = useState("");
  
  // Mock claim data - in real app, would fetch based on ID
  const claim = {
    id: id || "CLM-2024-001",
    type: "Auto Insurance",
    amount: "$3,500",
    status: "pending",
    date: "2024-01-15",
    claimant: "Anonymous-47A3",
    description: "Vehicle collision on highway. Front bumper damage and headlight replacement needed.",
    documents: [
      "incident_report.pdf",
      "repair_estimate.pdf", 
      "photos_damage.zip"
    ],
    timeline: [
      { date: "2024-01-15", action: "Claim filed", status: "completed" },
      { date: "2024-01-15", action: "Documents uploaded", status: "completed" },
      { date: "2024-01-16", action: "Initial verification", status: "completed" },
      { date: "2024-01-17", action: "Insurer review", status: "pending" },
    ]
  };

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

  const handleApproveClaim = () => {
    console.log("Claim approved:", claim.id);
  };

  const handleFlagForReview = () => {
    console.log("Claim flagged for review:", claim.id, "Note:", reviewNote);
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
            <div className="relative p-3 bg-trust-light rounded-xl">
              <Shield className="h-8 w-8 text-trust" />
              <Lock className="h-4 w-4 text-security absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Claim Details</h1>
              <p className="text-muted-foreground">View and manage claim {claim.id}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claim Overview */}
            <Card className="p-6 shadow-lg border-0 bg-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="p-3 bg-trust-light rounded-xl">
                      <Shield className="h-6 w-6 text-trust" />
                    </div>
                    <Lock className="h-4 w-4 text-security absolute -top-1 -right-1 bg-security-light rounded-full p-0.5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{claim.id}</h2>
                    <p className="text-muted-foreground">Filed on {claim.date}</p>
                  </div>
                </div>
                
                <Badge className={`px-3 py-1 rounded-full ${getStatusColor(claim.status)} flex items-center space-x-1`}>
                  {getStatusIcon(claim.status)}
                  <span className="capitalize">{claim.status}</span>
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Claim Type</label>
                  <p className="text-lg font-semibold text-foreground">{claim.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Claim Amount</label>
                  <p className="text-lg font-semibold text-foreground">{claim.amount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Claimant</label>
                  <p className="text-lg font-semibold text-foreground">{claim.claimant}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                  <p className="text-lg font-semibold text-foreground capitalize">{claim.status}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                <p className="text-foreground">{claim.description}</p>
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-6 shadow-lg border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Supporting Documents</h3>
              <div className="space-y-3">
                {claim.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-security-light rounded">
                        <Lock className="h-4 w-4 text-security" />
                      </div>
                      <span className="font-medium text-foreground">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6 shadow-lg border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Claim Timeline</h3>
              <div className="space-y-4">
                {claim.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      event.status === 'completed' ? 'bg-security' : 'bg-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{event.action}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 shadow-lg border-0 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={handleApproveClaim}
                  className="w-full bg-security hover:bg-security/90 text-security-foreground"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Claim
                </Button>
                
                <Button variant="outline" className="w-full border-foreground text-foreground hover:bg-accent">
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </div>
            </Card>

            {/* Flag for Review */}
            <Card className="p-6 shadow-lg border-0 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Flag for Review</h3>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Add review notes..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  rows={3}
                />
                <Button 
                  onClick={handleFlagForReview}
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Flag for Review
                </Button>
              </div>
            </Card>

            {/* Security Info */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-security-light to-trust-light">
              <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Protection</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-security">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm">End-to-end encrypted</span>
                </div>
                <div className="flex items-center space-x-2 text-security">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Zero-knowledge verification</span>
                </div>
                <div className="flex items-center space-x-2 text-security">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">Privacy preserved</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;