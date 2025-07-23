import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/ui/login-form";
import TrackingDashboard from "@/pages/tracking-dashboard";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function ProtectedTracking() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [loginError, setLoginError] = useState("");

  const handleLogin = (password: string) => {
    const success = login(password);
    if (!success) {
      setLoginError("Incorrect password. Please try again.");
    } else {
      setLoginError("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      {/* Dashboard */}
      <TrackingDashboard />
    </div>
  );
}