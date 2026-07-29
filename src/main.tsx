
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";

if (import.meta.env.DEV && "serviceWorker" in navigator) {
  void navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
    .then(() => {
      if ("caches" in window) {
        return caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
      }
      return undefined;
    })
    .catch((error) => {
      console.warn("[dev] failed to clear service workers:", error);
    });
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);
