import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingBar } from "@/components/ui/loading-bar";
import { CheckCircle, Shield, DollarSign } from "lucide-react";
import { trackVisitor, trackCTAClick, trackLead } from "@/lib/analytics";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track page visit
    trackVisitor();
    
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

  const handleCTAClick = (ctaType: string, ctaText: string) => {
    // Track the CTA click for analytics
    trackCTAClick(ctaType, ctaText);
    
    // Track potential lead (since this is a bridge page, clicking CTA indicates intent)
    trackLead();
    
    // TODO: Replace with actual affiliate link
    console.log(`CTA clicked: ${ctaType} - ${ctaText}`);
    // window.location.href = 'https://championautoinsurance.com/affiliate-link';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Minimal with urgency */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="text-sm font-semibold animate-pulse">
              ⚡ Limited Time: Insurance Rates Going Up - Compare NOW & Lock In Savings!
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
                Most Drivers Overpay $437/Year on Auto Insurance
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100 leading-relaxed">
                Compare Top Providers & Save Big in Under 60 Seconds
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <span className="text-yellow-300 mr-2">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm">4.8/5 (2,847 Reviews)</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <span className="text-green-300 mr-2">✓</span>
                  <span className="text-sm">2M+ Happy Customers</span>
                </div>
              </div>
              
              {/* Loading Animation */}
              <LoadingBar className="mx-auto md:mx-0" />
              
              <Button 
                onClick={() => handleCTAClick('hero_cta', '🚨 Get My Free Quote - Save $437+ Now!')}
                className="cta-glow bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-full text-xl shadow-lg h-auto pulse mb-4"
              >
                🚨 Get My Free Quote - Save $437+ Now!
              </Button>
              <p className="text-blue-200 text-sm">
                ✓ Free • ✓ No Obligation • ✓ Instant Results • ✓ 100% Secure
              </p>
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

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">A+ BBB Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-sm font-medium">4.8/5 TrustPilot</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">100% Free Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-[var(--light-gray)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Smart Drivers Choose Our Comparison Tool
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't overpay for auto insurance. Our free tool compares 50+ top insurers to find your lowest rate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            
            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Compare 50+ Top Insurers</h3>
                <p className="text-[var(--medium-gray)] font-medium">GEICO, Progressive, State Farm, Allstate & More</p>
                <div className="text-2xl font-bold text-green-600 mt-2">30 Seconds</div>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--success-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">100% Free & Secure</h3>
                <p className="text-[var(--medium-gray)] font-medium">No spam calls, no hidden fees, no obligations</p>
                <div className="text-2xl font-bold text-green-600 mt-2">Always Free</div>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Average Savings</h3>
                <p className="text-[var(--medium-gray)] font-medium">Most drivers save on their auto insurance</p>
                <div className="text-3xl font-bold text-orange-600 mt-2">$437/Year</div>
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
              <div className="text-center text-white max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  See What Our Customers Are Saying
                </h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <p className="text-lg italic mb-4">
                    "I was skeptical at first, but this actually worked! I saved $512 per year by switching. 
                    The whole process took less than 5 minutes and I had my new policy the same day."
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                    <span className="font-semibold">Sarah M., Tampa FL</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">4.8★</div>
                    <div className="text-sm">TrustPilot Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-300">$437</div>
                    <div className="text-sm">Average Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-300">2.1M+</div>
                    <div className="text-sm">Quotes Processed</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚨 Insurance Rates Are Rising Fast!
          </h2>
          <h3 className="text-2xl md:text-3xl text-orange-300 font-bold mb-6">
            Compare Now Before It's Too Late
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't wait - rates increase monthly. Get your quote in 30 seconds and lock in today's lower prices!
          </p>
          
          <Button 
            onClick={() => handleCTAClick('secondary_cta', '⚡ Get My Instant Quote - Save $437+')}
            className="cta-glow bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-12 rounded-full text-2xl shadow-lg h-auto animate-bounce mb-4"
          >
            ⚡ Get My Instant Quote - Save $437+
          </Button>
          
          <p className="text-blue-200 text-sm mt-4">
            ✓ 100% Free ✓ No Phone Calls ✓ Instant Results ✓ Secure & Private
          </p>
        </div>
      </section>

      {/* Urgency/Scarcity Section */}
      <section className="py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Important Rate Alert
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Auto insurance rates have increased by an average of 23% this year. Experts predict another 15-20% increase by summer. 
              Don't wait - secure today's rates before they go up again!
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-red-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">23%</div>
                <div className="text-sm text-gray-600">Rate Increase This Year</div>
              </div>
              <div className="bg-orange-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">15-20%</div>
                <div className="text-sm text-gray-600">Predicted Increase by Summer</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">$437</div>
                <div className="text-sm text-gray-600">Your Potential Savings Now</div>
              </div>
            </div>
            <Button 
              onClick={() => handleCTAClick('urgency_cta', '🔒 Lock In My Low Rate Now')}
              className="cta-glow bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg h-auto mt-6"
            >
              🔒 Lock In My Low Rate Now
            </Button>
          </div>
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
              © 2025 Auto Insurance Comparison. All rights reserved. | 
              <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a> | 
              <a href="/analytics" className="hover:text-white transition-colors ml-1">Analytics</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
