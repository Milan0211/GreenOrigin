import { useState, useRef, useEffect, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Camera, X, AlertCircle } from "lucide-react";
import Button from "./ui/Button";
import Toast from "./ui/Toast";

const QRScanner = ({ onScan, onClose, isOpen = false }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const streamRef = useRef(null);
  const isProcessingRef = useRef(false);

  const stopScanning = useCallback(() => {
    console.log("Stopping scanner...");
    
    // Stop camera stream first
    if (streamRef.current) {
      console.log("Stopping camera stream...");
      streamRef.current.getTracks().forEach(track => {
        console.log("Stopping track:", track.kind);
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Reset scanner
    if (readerRef.current) {
      try {
        readerRef.current.reset();
        readerRef.current = null;
      } catch (error) {
        console.log("Scanner reset error:", error);
      }
    }
    
    setIsScanning(false);
    setError(null);
    setScanSuccess(false);
    isProcessingRef.current = false;
  }, []);

  const startScanning = useCallback(async () => {
    if (!readerRef.current || isProcessingRef.current) return;

    try {
      console.log("Starting scanning...");
      setIsScanning(true);
      setError(null);
      isProcessingRef.current = true;

      await readerRef.current.decodeFromVideoDevice(
        undefined, // Use default camera
        videoRef.current,
        (result, error) => {
          if (result && isProcessingRef.current) {
            const code = result.getText().trim();
            console.log("QR Code detected:", code);
            
            // Validate the code format (should be like A123XY, B456YZ, etc.)
            const isValidCode = /^[A-Z]\d{3}[A-Z]{2}$/.test(code);
            
            if (isValidCode) {
              console.log("Valid code found, processing...");
              isProcessingRef.current = false;
              setScanSuccess(true);
              
              // Stop everything immediately
              stopScanning();
              
              // Close scanner immediately and call onScan
              setTimeout(() => {
                onClose(); // Close the scanner popup
                onScan(code); // Process the scan
              }, 100);
            } else {
              console.log("Invalid QR code format:", code);
            }
          }
          if (error && error.name !== "NotFoundException") {
            console.error("Scan error:", error);
          }
        }
      );
    } catch (err) {
      console.error("Scanning error:", err);
      setError("Failed to start camera scanning");
      setIsScanning(false);
      isProcessingRef.current = false;
    }
  }, [onScan, stopScanning]);

  const initializeScanner = useCallback(async () => {
    try {
      console.log("Initializing scanner...");
      
      // Clean up any existing scanner
      if (readerRef.current) {
        try {
          readerRef.current.reset();
        } catch (e) {
          console.log("Reset error during init:", e);
        }
      }
      
      readerRef.current = new BrowserMultiFormatReader();
      setError(null);
      setHasPermission(null);
      setScanSuccess(false);
      isProcessingRef.current = false;

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported");
      }

      // Get camera stream and store it
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      });

      streamRef.current = stream;
      setHasPermission(true);

      // Start scanning after a short delay
      setTimeout(() => {
        startScanning();
      }, 500);
    } catch (err) {
      console.error("Scanner initialization error:", err);
      setError("Camera access denied or not available");
      setHasPermission(false);
    }
  }, [startScanning]);

  useEffect(() => {
    if (isOpen) {
      console.log("Scanner opening...");
      initializeScanner();
    } else {
      console.log("Scanner closing...");
      stopScanning();
    }

    return () => {
      console.log("Scanner cleanup...");
      stopScanning();
    };
  }, [isOpen, initializeScanner, stopScanning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (readerRef.current) {
        try {
          readerRef.current.reset();
        } catch (error) {
          console.log("Cleanup error:", error);
        }
      }
      
      // Stop camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, []);

  const handleRetry = () => {
    console.log("Retrying scanner...");
    setError(null);
    setScanSuccess(false);
    isProcessingRef.current = false;
    stopScanning();
    setTimeout(() => {
      initializeScanner();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-earth-200">
          <h2 className="text-lg font-semibold text-earth-900">Scan QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-earth-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scanner Content */}
        <div className="p-4">
          {hasPermission === false ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-earth-900 mb-2">
                Camera Access Required
              </h3>
              <p className="text-earth-600 mb-6">
                Please allow camera access to scan QR codes. You can enable it
                in your browser settings.
              </p>
              <Button onClick={handleRetry} variant="primary">
                Try Again
              </Button>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-earth-900 mb-2">
                Scanning Error
              </h3>
              <p className="text-earth-600 mb-6">{error}</p>
              <Button onClick={handleRetry} variant="primary">
                Retry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera Preview */}
              <div className="relative bg-earth-100 rounded-lg overflow-hidden aspect-square">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-emerald-500 rounded-lg animate-pulse">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500 rounded-br-lg"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="text-center">
                <Camera className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-earth-600">
                  Position the QR code within the frame to scan
                </p>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                {scanSuccess ? (
                  <div className="flex-1 flex items-center justify-center text-green-600 font-medium">
                    ✓ Scan Successful!
                  </div>
                ) : !isScanning ? (
                  <Button
                    onClick={startScanning}
                    variant="primary"
                    className="flex-1"
                  >
                    Start Scanning
                  </Button>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-blue-600 font-medium">
                    Scanning...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
