import { Shield, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-security overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8cGF0aCBkPSJNMjAgMjBjMC0xMS4wNDYtOC45NTQtMjAtMjAtMjB2MjBoMjB6bTAgMHYyMGMxMS4wNDYgMCAyMC04Ljk1NCAyMC0yMEgyMHoiLz4KPC9nPgo8L3N2Zz4=')]"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img src="/logo.svg" alt="Claim Vault Secure Logo" className="h-16 w-16" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Insurance with
          <span className="block bg-gradient-to-r from-security-light to-white bg-clip-text text-transparent">
            Built-In Confidentiality
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          File encrypted claims that protect your privacy while enabling instant verification. 
          The future of secure insurance is here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/file-claim">
            <Button 
              size="lg" 
              className="bg-security hover:bg-security/90 text-security-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Lock className="mr-2 h-5 w-5" />
              File New Claim
            </Button>
          </a>
          
          <a href="/dashboard">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Dashboard
            </Button>
          </a>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Lock className="h-8 w-8 text-security-light mb-4 mx-auto" />
            <h3 className="text-white text-lg font-semibold mb-2">Encrypted Claims</h3>
            <p className="text-blue-100 text-sm">Your sensitive data stays private with zero-knowledge encryption</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Shield className="h-8 w-8 text-security-light mb-4 mx-auto" />
            <h3 className="text-white text-lg font-semibold mb-2">Instant Verification</h3>
            <p className="text-blue-100 text-sm">Claims verified in seconds without revealing personal details</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Eye className="h-8 w-8 text-security-light mb-4 mx-auto" />
            <h3 className="text-white text-lg font-semibold mb-2">Full Transparency</h3>
            <p className="text-blue-100 text-sm">Track your claims status with complete audit trails</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;