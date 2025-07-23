import { cn } from "@/lib/utils";

interface LoadingBarProps {
  className?: string;
  text?: string;
}

export function LoadingBar({ className, text = "Calculating your savings..." }: LoadingBarProps) {
  return (
    <div className={cn("mb-4 sm:mb-6 bg-white/20 rounded-full p-2 max-w-xs sm:max-w-sm w-full", className)}>
      <div className="loading-bar h-2 rounded-full"></div>
      <p className="text-xs sm:text-sm text-center mt-2 text-blue-100">{text}</p>
    </div>
  );
}
