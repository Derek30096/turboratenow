import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  try {
    createRoot(root).render(<App />);
  } catch (error) {
    console.error('Render error:', error);
    root.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; background: white; color: black;">
        <h1>Champion Auto Insurance</h1>
        <p>Get your free quote and compare top rates now!</p>
        <button style="background: #007BFF; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;" onclick="window.location.href='https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980'">Get Free Quote Now</button>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}
