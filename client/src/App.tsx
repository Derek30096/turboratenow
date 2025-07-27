import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Analytics from "@/pages/analytics";
import ProtectedTracking from "@/pages/protected-tracking";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/dashboard" component={ProtectedTracking} />
      <Route path="/tracking" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  console.log('🎨 App component rendering...');
  
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('❌ App render error:', error);
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', background: 'white', color: 'black', minHeight: '100vh' }}>
        <h1 style={{ color: '#007BFF' }}>Most Drivers Overpay $437/Year on Auto Insurance</h1>
        <p>React App Error - Check console</p>
        <p style={{ color: 'red', fontSize: '14px' }}>Error: {error.message}</p>
      </div>
    );
  }
}

export default App;
