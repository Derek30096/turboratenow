import { createRoot } from "react-dom/client";
import App from "./App";

console.log('🚀 main.tsx loading...');

const root = document.getElementById("root");
console.log('📍 Root element:', root);

if (root) {
  try {
    // Clear the root content completely
    root.innerHTML = '';
    
    // Hide fallback content
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
    
    // Show error in root
    root.innerHTML = `
      <div style="padding: 40px; background: white; color: black; font-family: Arial;">
        <h1 style="color: #007BFF;">React Error</h1>
        <p>Error: ${error.message}</p>
        <p>Check console for details</p>
      </div>
    `;
  }
} else {
  console.error('❌ Root element not found');
  document.title = "❌ No Root - " + document.title;
  document.body.innerHTML = `
    <div style="padding: 40px; background: white; color: black; font-family: Arial;">
      <h1 style="color: red;">Root Element Not Found</h1>
      <p>The #root element is missing from the HTML</p>
    </div>
  `;
}
