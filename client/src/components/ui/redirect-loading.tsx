import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface RedirectLoadingProps {
  onComplete: () => void;
  className?: string;
}

export function RedirectLoading({ onComplete, className }: RedirectLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Checking for best rates...");

  useEffect(() => {
    const messages = [
      "Checking for best rates...",
      "Comparing 20+ insurance providers...",
      "Finding your personalized quote...",
      "Securing your savings..."
    ];

    let messageIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += Math.random() * 25 + 10; // Random progress between 10-35%
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 500);
        clearInterval(interval);
        return;
      }

      setProgress(progressValue);

      // Update message every 25% progress
      const newMessageIndex = Math.floor(progressValue / 25);
      if (newMessageIndex !== messageIndex && newMessageIndex < messages.length) {
        messageIndex = newMessageIndex;
        setMessage(messages[messageIndex]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={cn("fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50", className)}>
      <div className="text-center text-white max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Please Wait...</h2>
          <p className="text-blue-100 text-lg mb-6">{message}</p>
        </div>
        
        <div className="w-full bg-blue-700 rounded-full h-3 mb-4">
          <div 
            className="bg-orange-400 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-blue-200">
          {Math.round(progress)}% Complete - Securing your discount...
        </p>
      </div>
    </div>
  );
}