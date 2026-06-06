import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// StrictMode intentionally omitted: its dev double-invoke double-creates the
// WebGL renderer + audio nodes, which fights the 3D canvas and Tone transport.
createRoot(document.getElementById("root")!).render(<App />);
