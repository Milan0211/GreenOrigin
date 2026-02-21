import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { mockApi } from "../data/mockData";
import toast from "react-hot-toast";

const RecallPage = () => {
  const { batchCode } = useParams();
  const navigate = useNavigate();

  const {
    data: recall,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recall", batchCode],
    queryFn: () => mockApi.getRecall(batchCode),
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-earth-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-earth-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              <div className="h-64 bg-earth-200 rounded-lg"></div>
              <div className="h-48 bg-earth-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-earth-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-earth-900 mb-4">
              Error Loading Recall Information
            </h2>
            <p className="text-earth-600 mb-8">
              There was an error loading recall information for batch "
              {batchCode}".
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isRecalled = recall.recallStatus === "Recalled";

  return (
    <div className="min-h-screen bg-earth-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
              Recall Check
            </h1>
            <p className="text-earth-600">Batch: {batchCode}</p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Status Card */}
          <Card
            className={
              isRecalled
                ? "border-red-200 bg-red-50"
                : "border-emerald-200 bg-emerald-50"
            }
          >
            <CardContent>
              <div className="text-center py-8">
                {isRecalled ? (
                  <>
                    <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-red-900 mb-2">
                      Product Recalled
                    </h2>
                    <p className="text-red-800 mb-4">
                      This batch has been recalled and should not be consumed.
                    </p>
                    <Badge status="recalled" className="text-lg px-4 py-2">
                      RECALLED
                    </Badge>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
                      Product Safe
                    </h2>
                    <p className="text-emerald-800 mb-4">
                      No recalls found for this batch code.
                    </p>
                    <Badge status="safe" className="text-lg px-4 py-2">
                      SAFE
                    </Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recall Details */}
          {isRecalled && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-earth-900">
                  Recall Information
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">Product</h3>
                    <p className="text-earth-600">{recall.herbName}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Recall Reason
                    </h3>
                    <p className="text-earth-600">{recall.recallReason}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Recall Date
                    </h3>
                    <p className="text-earth-600">
                      {new Date(recall.recallDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Affected Products
                    </h3>
                    <ul className="list-disc list-inside text-earth-600 space-y-1">
                      {recall.affectedProducts.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">
                      Instructions
                    </h3>
                    <p className="text-earth-600">{recall.instructions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          {isRecalled && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-earth-900">
                  Contact Information
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-earth-600" />
                    <div>
                      <p className="font-medium text-earth-900">
                        Recall Hotline
                      </p>
                      <p className="text-earth-600">{recall.contactInfo}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-earth-600" />
                    <div>
                      <p className="font-medium text-earth-900">
                        Email Support
                      </p>
                      <p className="text-earth-600">recalls@rootstory.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-earth-900">Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isRecalled ? (
                  <>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        try {
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                            await navigator.clipboard.writeText(recall.contactInfo);
                            toast.success("Contact information copied to clipboard");
                          } else {
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = recall.contactInfo;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            toast.success("Contact information copied to clipboard");
                          }
                        } catch (error) {
                          console.error("Failed to copy to clipboard:", error);
                          toast.error("Failed to copy to clipboard");
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Copy Contact Info</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        try {
                          const subject = `Recall Inquiry - Batch ${batchCode}`;
                          const body = `I have a product from batch ${batchCode} and need assistance with the recall.`;
                          const mailtoUrl = `mailto:recalls@rootstory.com?subject=${encodeURIComponent(
                            subject
                          )}&body=${encodeURIComponent(body)}`;
                          
                          window.open(mailtoUrl);
                        } catch (error) {
                          console.error("Error opening email client:", error);
                          // Fallback: copy email address to clipboard
                          navigator.clipboard?.writeText('recalls@rootstory.com');
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Send Email</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={() => navigate("/scan")}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Check Another Product</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecallPage;
