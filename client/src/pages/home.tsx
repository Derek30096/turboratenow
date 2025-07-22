import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingBar } from "@/components/ui/loading-bar";
import { CheckCircle, Shield, DollarSign } from "lucide-react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleCTAClick = () => {
    // TODO: Replace with actual affiliate link
    console.log('CTA clicked - redirect to affiliate link');
    // window.location.href = 'AFFILIATE_LINK_HERE';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-[var(--primary-blue)] font-semibold text-lg">
              {/* Minimal header - no logo per requirements */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Unlock Lower Auto Insurance Rates Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Compare and Save in Less Than 60 Seconds
              </p>
              
              {/* Loading Animation */}
              <LoadingBar className="mx-auto md:mx-0" />
              
              <Button 
                onClick={handleCTAClick}
                className="cta-glow bg-[var(--success-green)] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg h-auto"
              >
                Get My Free Quote
              </Button>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern car for auto insurance" 
                className="rounded-xl shadow-2xl w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-[var(--light-gray)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Compare Multiple Providers</h3>
                <p className="text-[var(--medium-gray)]">Get quotes from top insurers in seconds, not hours</p>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--success-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">No Hidden Fees</h3>
                <p className="text-[var(--medium-gray)]">Transparent pricing with no obligations or surprises</p>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Save Hundreds</h3>
                <p className="text-[var(--medium-gray)]">Most customers save $400+ on their next premium</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl min-h-[400px] bg-cover bg-center"
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')"
               }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full py-20">
              <div className="text-center text-white max-w-2xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Thousands Who've Already Saved
                </h2>
                <p className="text-xl mb-8 text-gray-200">
                  Smart drivers compare rates before renewing. Are you one of them?
                </p>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[var(--success-green)]">4.8★</div>
                    <div className="text-sm">Customer Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--success-green)]">$437</div>
                    <div className="text-sm">Average Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--success-green)]">2M+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reinforcement CTA */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary-blue)] to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Overpay? Get Your Free Quote Now.
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            It takes less than 60 seconds to see how much you could save. No phone calls, no paperwork.
          </p>
          
          <Button 
            onClick={handleCTAClick}
            className="cta-glow bg-[var(--success-green)] hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg h-auto"
          >
            Start Saving
          </Button>
          
          <p className="text-blue-200 text-sm mt-4">
            Free • No Obligation • Instant Results
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm mb-4">
              This site is a promotional partner. We may receive compensation from Champion Auto Insurance.
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Auto Insurance Comparison. All rights reserved. | 
              <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
