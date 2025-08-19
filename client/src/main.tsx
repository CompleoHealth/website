import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupKeyboardNavigation } from './lib/accessibility';
import { initPerformanceMonitoring, addResourceHints } from './lib/performance';

// Initialize performance monitoring and accessibility features
initPerformanceMonitoring();
setupKeyboardNavigation();
addResourceHints();

createRoot(document.getElementById("root")!).render(<App />);
