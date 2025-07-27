import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  try {
    createRoot(root).render(<App />);
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Render error:', error);
  }
} else {
  console.error('Root element not found');
}
