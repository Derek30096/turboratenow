import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingBar } from "@/components/ui/loading-bar";
import { RedirectLoading } from "@/components/ui/redirect-loading";
import { CheckCircle, Shield, DollarSign } from "lucide-react";
import { trackVisitor, trackCTAClick, trackLead, trackRedirect, initializeAdvancedTracking } from "@/lib/advanced-analytics";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    try {
      // Initialize advanced tracking
      initializeAdvancedTracking();
      
      // Track page visit
      trackVisitor().catch(err => console.log('Tracking init error:', err));
      
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
    } catch (error) {
      console.log('Initialization error:', error);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleCTAClick = (ctaType: string, ctaText: string) => {
    try {
      // Track the CTA click for analytics
      trackCTAClick(ctaType, ctaText).catch(err => console.log('CTA tracking error:', err));
      
      // Track potential lead (since this is a bridge page, clicking CTA indicates intent)
      trackLead().catch(err => console.log('Lead tracking error:', err));
      
      // Show loading screen before redirect
      console.log(`CTA clicked: ${ctaType} - ${ctaText}`);
      setShowLoading(true);
    } catch (error) {
      console.log('CTA click error:', error);
      // Still show loading and redirect even if tracking fails
      setShowLoading(true);
    }
  };

  const handleRedirectComplete = () => {
    try {
      // Track the redirect event
      trackRedirect().catch(err => console.log('Redirect tracking error:', err));
    } catch (error) {
      console.log('Redirect tracking error:', error);
    }
    
    // Redirect to MaxBounty affiliate link after loading screen
    window.location.href = 'https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980';
  };

  return (
    <div className="min-h-screen bg-white">
      {showLoading && (
        <RedirectLoading onComplete={handleRedirectComplete} />
      )}
      {/* Header - Minimal with urgency */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-1">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex justify-center items-center">
            <div className="text-xs font-semibold animate-pulse text-center leading-tight">
              ⚡ Limited Time: Insurance Rates Going Up - Compare NOW!
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-blue-600 text-white py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                Most Drivers Overpay $437/Year on Auto Insurance
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 text-blue-100 leading-relaxed">
                Compare Top Providers & Save Big in Under 60 Seconds
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center bg-white/10 rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                  <span className="text-yellow-300 mr-1 sm:mr-2 text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs">4.8/5 (2,847 Reviews)</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                  <span className="text-green-300 mr-1 sm:mr-2">✓</span>
                  <span className="text-xs">2M+ Happy Customers</span>
                </div>
              </div>
              
              {/* Loading Animation */}
              <LoadingBar className="mx-auto md:mx-0" />
              
              <Button 
                onClick={() => handleCTAClick('hero_cta', '🚨 Get My Free Quote - Save $437+ Now!')}
                className="cta-glow bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 rounded-full text-sm sm:text-lg md:text-xl shadow-lg h-auto pulse mb-3 sm:mb-4 w-full sm:w-auto"
              >
                🚨 Get My Free Quote - Save $437+ Now!
              </Button>
              <p className="text-blue-200 text-xs text-center md:text-left leading-relaxed px-2 sm:px-0">
                ✓ Free • ✓ No Obligation • ✓ Instant Results • ✓ 100% Secure
              </p>
            </div>
            
            <div className="text-center order-1 md:order-2 mb-4 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern car for auto insurance" 
                className="rounded-xl shadow-2xl w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-xs sm:text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium">A+ BBB Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-xs sm:text-sm font-medium">4.8/5 TrustPilot</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-xs sm:text-sm font-medium">100% Free Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 sm:py-16 bg-[var(--light-gray)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Smart Drivers Choose Our Comparison Tool
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Don't overpay for auto insurance. Our free tool compares 50+ top insurers to find your lowest rate.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
            <Card className="fade-in-up text-center p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Compare 50+ Top Insurers</h3>
                <p className="text-sm sm:text-base text-[var(--medium-gray)] font-medium">GEICO, Progressive, State Farm, Allstate & More</p>
                <div className="text-xl sm:text-2xl font-bold text-green-600 mt-2">30 Seconds</div>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--success-green)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">100% Free & Secure</h3>
                <p className="text-sm sm:text-base text-[var(--medium-gray)] font-medium">No spam calls, no hidden fees, no obligations</p>
                <div className="text-xl sm:text-2xl font-bold text-green-600 mt-2">Always Free</div>
              </CardContent>
            </Card>

            <Card className="fade-in-up text-center p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500 sm:col-span-2 md:col-span-1">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Average Savings</h3>
                <p className="text-sm sm:text-base text-[var(--medium-gray)] font-medium">Most drivers save on their auto insurance</p>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">$437/Year</div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden shadow-2xl min-h-[300px] sm:min-h-[400px] bg-cover bg-center"
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')"
               }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full py-12 sm:py-20">
              <div className="text-center text-white max-w-3xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  See What Our Customers Are Saying
                </h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <p className="text-sm sm:text-lg italic mb-4">
                    "I was skeptical at first, but this actually worked! I saved $512 per year by switching. 
                    The whole process took less than 5 minutes and I had my new policy the same day."
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-yellow-300 text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                    <span className="font-semibold text-sm sm:text-base">Sarah M., Tampa FL</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-300">4.8★</div>
                    <div className="text-xs sm:text-sm">TrustPilot Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-300">$437</div>
                    <div className="text-xs sm:text-sm">Average Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-300">2.1M+</div>
                    <div className="text-xs sm:text-sm">Quotes Processed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reinforcement CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[var(--primary-blue)] to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            🚨 Insurance Rates Are Rising Fast!
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl text-orange-300 font-bold mb-6">
            Compare Now Before It's Too Late
          </h3>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Don't wait - rates increase monthly. Get your quote in 30 seconds and lock in today's lower prices!
          </p>
          
          <Button 
            onClick={() => handleCTAClick('secondary_cta', '⚡ Get My Instant Quote - Save $437+')}
            className="cta-glow bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-2xl shadow-lg h-auto animate-bounce mb-4 w-full sm:w-auto"
          >
            ⚡ Get My Instant Quote - Save $437+
          </Button>
          
          <p className="text-blue-200 text-xs sm:text-sm mt-4">
            ✓ 100% Free ✓ No Phone Calls ✓ Instant Results ✓ Secure & Private
          </p>
        </div>
      </section>

      {/* Urgency/Scarcity Section */}
      <section className="py-8 sm:py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl mx-auto border-l-4 border-red-500">
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
              ⚠️ Important Rate Alert
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Auto insurance rates have increased by an average of 23% this year. Experts predict another 15-20% increase by summer. 
              Don't wait - secure today's rates before they go up again!
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="bg-red-100 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-red-600">23%</div>
                <div className="text-xs sm:text-sm text-gray-600">Rate Increase This Year</div>
              </div>
              <div className="bg-orange-100 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">15-20%</div>
                <div className="text-xs sm:text-sm text-gray-600">Predicted Increase by Summer</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 sm:p-4 sm:col-span-2 md:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-green-600">$437</div>
                <div className="text-xs sm:text-sm text-gray-600">Your Potential Savings Now</div>
              </div>
            </div>
            <Button 
              onClick={() => handleCTAClick('urgency_cta', '🔒 Lock In My Low Rate Now')}
              className="cta-glow bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg h-auto mt-6 w-full sm:w-auto"
            >
              🔒 Lock In My Low Rate Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm mb-4">
              This site is a promotional partner. We may receive compensation from Champion Auto Insurance.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              © 2025 Auto Insurance Comparison. All rights reserved.<br className="sm:hidden" />
              <span className="hidden sm:inline"> | </span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="hidden sm:inline"> | </span><br className="sm:hidden" />
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="hidden sm:inline"> | </span><br className="sm:hidden" />
              <a href="/analytics" className="hover:text-white transition-colors">Analytics</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
