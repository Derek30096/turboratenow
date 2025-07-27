import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log('🚀 main.tsx loading...');

const root = document.getElementById("root");
console.log('📍 Root element:', root);

if (root) {
  try {
    // Hide fallback content once React is ready
    const fallback = document.getElementById('fallback');
    if (fallback) {
      fallback.style.display = 'none';
      console.log('🔄 Fallback hidden');
    }
    
    console.log('🎯 Creating React root...');
    createRoot(root).render(<App />);
    console.log('✅ React app rendered successfully');
    
    // Add debug info to page
    document.title = "✅ React Working - " + document.title;
  } catch (error) {
    console.error('❌ Render error:', error);
    document.title = "❌ React Error - " + document.title;
    // Don't override content, let fallback stay visible
  }
} else {
  console.error('❌ Root element not found');
  document.title = "❌ No Root - " + document.title;
}
