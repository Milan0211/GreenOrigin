import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ComparativeChart from "../components/ComparativeChart";


import {
  ArrowLeft,
  Shield,
  MapPin,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import EventTimeline from "../components/EventTimeline";
import GeoMap from "../components/GeoMap";
import CertificateBadge from "../components/CertificateBadge";
import { mockApi } from "../data/mockData";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", code],
    queryFn: () => mockApi.getProduct(code),
    retry: 1,
  });

  const handleRecallCheck = () => {
    if (product?.batchCode) {
      navigate(`/recall/${product.batchCode}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-earth-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-earth-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-earth-200 rounded-lg"></div>
                <div className="h-96 bg-earth-200 rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-earth-200 rounded-lg"></div>
                <div className="h-64 bg-earth-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-earth-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-earth-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-earth-600 mb-8">
              The product code "{code}" could not be found. Please check the QR
              code and try again.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/scan")}>Scan Again</Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isRecalled = product.recallStatus === "Recalled";

  return (
    <div className="min-h-screen bg-earth-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-earth-900">
              {product.herbName}
            </h1>
            <p className="text-earth-600">Batch: {product.batchCode}</p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Recall Alert */}
        {isRecalled && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent>
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Product Recall Alert
                  </h3>
                  <p className="text-red-800 mb-4">
                    This product batch has been recalled. Please do not consume
                    and return to place of purchase.
                  </p>
                  <Button
                    variant="danger"
                    onClick={handleRecallCheck}
                    className="flex items-center space-x-2"
                  >
                    <span>View Recall Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-earth-900">
                    Product Overview
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Badge status={product.batchStatus}>
                      {product.batchStatus}
                    </Badge>
                    <Badge status={product.recallStatus}>
                      {product.recallStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Herb Name
                    </h3>
                    <p className="text-earth-600">{product.herbName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Batch Code
                    </h3>
                    <p className="text-earth-600 font-mono">
                      {product.batchCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Blockchain Hash
                    </h3>
                    <p className="text-earth-600 font-mono text-sm break-all">
                      {product.blockchainHash}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Sustainability Score
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-earth-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${product.sustainabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-earth-600">
                        {product.sustainabilityScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Timeline */}
            <EventTimeline events={product.events} />

            {/* Geographic Map */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-earth-900 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Journey Map</span>
                </h2>
              </CardHeader>
              <CardContent>
                <GeoMap events={product.events} className="h-80" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Comparative Analysis */}
              {product.comparison && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-earth-900 flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Comparative Analysis</span>
                    </h2>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-earth-600 mb-4 capitalize">
                      This batch vs market average {product.herbName} quality
                    </p>

                    <ComparativeChart data={product.comparison} />
                  </CardContent>
                </Card>
              )}


            {/* Organic Certification */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-earth-900 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Certification</span>
                </h2>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-earth-900 mb-2">
                    {product.organicCertification}
                  </h3>
                  <p className="text-sm text-earth-600">
                    This product meets all organic certification standards
                  </p>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
