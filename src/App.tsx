import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import React, { Suspense, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";

const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [loadingDone, setLoadingDone] = useState(false);

  const handleLoadingDone = useCallback(() => {
    setLoadingDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Full-screen animated loading screen — shown until ready */}
        {!loadingDone && <LoadingScreen onDone={handleLoadingDone} />}

        <BrowserRouter>
          <Layout>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Legacy routes redirect to home — preserves old links */}
                <Route path="/about" element={<Home />} />
                <Route path="/experience" element={<Home />} />
                <Route path="/projects" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
