import { createRoot } from "react-dom/client";
import App from "./App";

console.log('🚀 main.tsx loading...');

const root = document.getElementById("root");
console.log('📍 Root element:', root);

if (root) {
  console.log('🎯 Creating React root...');
  createRoot(root).render(<App />);
  console.log('✅ React app rendered successfully');
  document.title = "✅ React Working - " + document.title;
} else {
  console.error('❌ Root element not found');
  document.title = "❌ No Root - " + document.title;
}
