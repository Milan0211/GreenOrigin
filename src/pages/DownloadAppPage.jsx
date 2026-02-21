import { useEffect } from "react";

const DownloadAppPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fdfb] px-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-herb-800 mb-6">
          Coming Soon 🚀
        </h1>

        <p className="text-xl md:text-2xl text-herb-600 max-w-xl mx-auto mb-8">
          Our mobile app is currently under development.
          <br />
          Stay tuned — it will be available very soon!
        </p>

        <div className="mt-8">
          <span className="inline-block bg-herb-100 text-herb-700 px-6 py-3 rounded-full shadow-md text-lg font-semibold">
             App Launching Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppPage;
