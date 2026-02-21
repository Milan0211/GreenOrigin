import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, ArrowLeft, Camera, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../components/ui/Button";
import QRScanner from "../components/QRScanner";
import toast from "react-hot-toast";

const ScanPage = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [hasCamera, setHasCamera] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if camera is available
    const checkCamera = async () => {
      try {
        // Check if navigator.mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          setHasCamera(false);
          return;
        }
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setHasCamera(videoDevices.length > 0);
      } catch (error) {
        console.error("Error checking camera:", error);
        setHasCamera(false);
      }
    };

    checkCamera();
  }, []);

  const handleScan = (code) => {
    console.log("ScanPage: Received code:", code);
    setIsScannerOpen(false);
    toast.success("QR Code scanned successfully!");
    
    // Navigate immediately without delay
    navigate(`/product/${code}`, { replace: true });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      toast.error("Please enter a product code");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call - in real app, this would verify the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate the code format (should be like A123XY, B456YZ, etc.)
      const isValidCode = /^[A-Z]\d{3}[A-Z]{2}$/.test(manualCode.trim());
      
      if (isValidCode) {
        toast.success("✅ Product code verified! Redirecting...");
        navigate(`/product/${manualCode.trim()}`);
      } else {
        toast.error("❌ Invalid product code. Please check and try again.");
      }
    } catch (error) {
      console.error("Error verifying manual code:", error);
      toast.error("❌ Failed to verify product code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-sm md:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="whitespace-nowrap">
              <span className="md:hidden">Home</span>
              <span className="hidden md:inline">Back to Home</span>
            </span>
          </Button>
          <h1 className="text-xl md:text-2xl font-display font-bold text-earth-900 whitespace-nowrap">
            Scan QR Code
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Scanner and Manual Entry */}
          <div className="space-y-6 order-1 lg:order-1">
            {/* Camera Scanner Section */}
            <div className="card p-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-6 h-6 mr-3 text-herbal-green" />
                Camera Scanner
              </h2>

              {hasCamera === false ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Camera not available</p>
                  <p className="text-sm text-gray-500">
                    Please use manual entry below
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">Camera preview will appear here</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsScannerOpen(true)}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center space-x-2 bg-herb-400 hover:bg-herb-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-herb-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Camera className="w-5 h-5" />
                          <span>Start Scanning</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Entry Section */}
            <div className="card p-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4 flex items-center">
                <QrCode className="w-6 h-6 mr-3 text-herbal-green" />
                Manual Entry
              </h2>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="manualCode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Code or QR Data
                  </label>
                  <input
                    type="text"
                    id="manualCode"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="Enter product code (e.g., A123XY, B456YZ)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-green focus:border-transparent transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !manualCode.trim()}
                  className="w-full flex items-center justify-center space-x-2 bg-herb-400 hover:bg-herb-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-herb-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Search Product</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Instructions and Sample Codes */}
          <div className="space-y-6 order-2 lg:order-2">
            {/* How to Use */}
            <div className="card p-6 bg-herbal-green/5 border border-herbal-green/20">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                How to Use
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-herbal-green rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Point your camera at the QR code on the product packaging
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-herbal-green rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Ensure good lighting and steady hands for best results
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-herbal-green rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Alternatively, enter the product code manually above
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-herbal-green rounded-full mt-2 flex-shrink-0"></div>
                  <span>View complete traceability and lab test results</span>
                </li>
              </ul>
            </div>

            {/* Scanning Tips */}
            <div className="card p-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Scanning Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-herbal-green mt-1">•</span>
                  <span>Ensure good lighting for better scanning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-herbal-green mt-1">•</span>
                  <span>
                    Hold your device steady and at a comfortable distance
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-herbal-green mt-1">•</span>
                  <span>Make sure the QR code is not damaged or dirty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-herbal-green mt-1">•</span>
                  <span>Allow camera permissions when prompted</span>
                </li>
              </ul>
            </div>

            {/* Sample Codes */}
            <div className="card p-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                Try Sample Codes
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setManualCode("A123XY")}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-herbal-green/10 rounded-lg transition-colors duration-200 text-sm font-mono"
                >
                  A123XY - Ashwagandha Root Powder
                </button>
                <button
                  onClick={() => setManualCode("B456YZ")}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-herbal-green/10 rounded-lg transition-colors duration-200 text-sm font-mono"
                >
                  B456YZ - Turmeric Curcumin Powder
                </button>
                <button
                  onClick={() => setManualCode("C789AB")}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-herbal-green/10 rounded-lg transition-colors duration-200 text-sm font-mono"
                >
                  C789AB - Neem Leaf Extract
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isScannerOpen}
        onScan={handleScan}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
};

export default ScanPage;
