import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import ProductPage from "./pages/ProductPage";
// import RecallPage from "./pages/RecallPage";
import AboutPage from "./pages/AboutPage";
import DownloadAppPage from "./pages/DownloadAppPage";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import AskPage from "./pages/AskPage";


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Ensure we scroll to top after loading completes
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-earth-50">
          {isLoading && <Loader onComplete={handleLoaderComplete} />}
          <Layout isLoading={isLoading}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/product/:code" element={<ProductPage />} />
              {/* <Route path="/recall/:batchCode" element={<RecallPage />} /> */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/download" element={<DownloadAppPage />} />
              <Route path="/ask" element={<AskPage />} />

            </Routes>
          </Layout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
