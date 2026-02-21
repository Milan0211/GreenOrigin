  import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  Shield,
  Map,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Leaf,
  Lock,
  Sparkles,
  TestTube,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const FeatureCard = ({ icon: Icon, title, description, delay = 0, gradient = "bg-gradient-herbal" }) => {
  return (
    <div
      className="card p-8 text-center group hover:scale-105 transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 mx-auto mb-6 ${gradient} rounded-2xl flex items-center justify-center group-hover:animate-glow`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-nunito font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  // Scroll to top on page load and refresh
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Also scroll to top after a short delay to ensure it works
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    // Handle page refresh
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const features = [
    {
      icon: Shield,
      title: "React Frontend",
      description:
        "Built with React for a modern, responsive user interface that provides seamless QR code scanning and real-time verification experiences.",
      delay: 0,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: Map,
      title: "Node.js & Go Backend",
      description:
        "Powerful backend infrastructure using Node.js and Go programming language for high-performance data processing and API management.",
      delay: 200,
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      icon: Lock,
      title: "Blockchain & Docker",
      description:
        "Secure blockchain implementation with Docker containerization ensuring tamper-proof records and scalable deployment across environments.",
      delay: 400,
      gradient: "bg-gradient-to-br from-slate-700 to-slate-800",
    },
    {
      icon: TestTube,
      title: "MongoDB & REST API",
      description:
        "Robust data storage with MongoDB and seamless integration through REST APIs for comprehensive product traceability and lab certifications.",
      delay: 600,
      gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
  ];

  const faqs = [
    {
      question: "How do QR codes verify authenticity?",
      answer:
        "Each QR code contains a unique blockchain hash that links to immutable records of the product's journey. When you scan the code, our system verifies the hash against the blockchain, ensuring the product hasn't been tampered with and all provenance data is authentic.",
      icon: QrCode,
    },
    {
      question: "What tests are conducted in labs?",
      answer:
        "Our certified laboratories conduct comprehensive tests including moisture content, pesticide residue analysis, DNA authentication, heavy metals testing, microbial contamination checks, and purity assessments. Each test follows international standards and results are permanently recorded on the blockchain.",
      icon: TestTube,
    },
    {
      question: "How does blockchain ensure tamper-proof records?",
      answer:
        "Blockchain technology creates an immutable ledger where each transaction is cryptographically linked to the previous one. Once data is recorded, it cannot be altered without changing all subsequent blocks, making it virtually impossible to tamper with product records. This ensures complete transparency and trust.",
      icon: Shield,
    },
    {
      question: "What happens if a product is recalled?",
      answer:
        "If a product is recalled, you'll receive immediate notifications through our platform. The recall information is instantly updated on the blockchain, and you can check the recall status of any batch using our recall checker. We provide detailed information about the reason for recall and recommended actions.",
      icon: AlertTriangle,
    },
    {
      question: "How do I know the herbs are sustainably sourced?",
      answer:
        "Our sustainability score is calculated based on multiple factors including farming practices, water usage, carbon footprint, fair trade certification, and environmental impact. Each product displays a sustainability score from 0-100%, and you can view detailed sustainability metrics in the product traceability report.",
      icon: Shield,
    },
    {
      question: "Can I trust the blockchain data?",
      answer:
        "Yes, our blockchain is built on a decentralized network where multiple nodes verify each transaction. The data is cryptographically secured and cannot be modified once recorded. Additionally, all data points are cross-verified with physical documentation and lab reports, ensuring complete accuracy and trustworthiness.",
      icon: Shield,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Drag functionality for carousel
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  // Touch support for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-herb-50">
        {/* Clean Background with Subtle Pattern */}
        <div className="absolute inset-0 bg-herb-50"></div>

        {/* Minimal Organic Shapes */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] organic-shape bg-herb-100/30 animate-organic-drift"></div>
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] organic-shape bg-mint-100/25 animate-organic-drift"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #32B768 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Floating Botanical Elements - Enhanced */}
        <div className="absolute top-20 right-1/4 text-herb-400/40 animate-float">
          <Leaf className="h-16 w-16" />
        </div>
        <div
          className="absolute top-1/3 left-8 text-mint-400/35 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Leaf className="h-12 w-12" />
        </div>
        <div
          className="absolute bottom-1/4 right-1/3 text-amber-400/40 animate-float"
          style={{ animationDelay: "4s" }}
        >
          <Leaf className="h-14 w-14" />
        </div>
        <div
          className="absolute top-1/2 right-8 text-herb-400/30 animate-float"
          style={{ animationDelay: "6s" }}
        >
          <Leaf className="h-8 w-8" />
        </div>
        <div
          className="absolute bottom-20 right-1/4 text-mint-400/25 animate-float"
          style={{ animationDelay: "8s" }}
        >
          <Leaf className="h-10 w-10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <div className="text-center max-w-5xl mx-auto">
            {/* Enhanced Typography with Text Shadow */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 text-herb-800 leading-tight md:whitespace-nowrap">
              <span className="block md:inline">Rooted.</span>
              <span className="block md:inline"> Verified.</span>
              <span className="block md:inline"> Authentic.</span>
            </h1>

            <p className="text-3xl md:text-4xl font-display font-bold text-herb-800 mb-6 leading-tight">
              ✨ Every Herb Has a Story. Discover Yours.
            </p>

            <p className="text-xl md:text-2xl text-herb-700 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Follow every step of your herb's journey transparent, traceable, and blockchain-backed.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              
              <button
                onClick={() => navigate("/scan")}
                className="btn-scan flex items-center space-x-3 px-8 py-4 text-lg font-semibold group"
              >
                <QrCode className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span>Scan QR Code</span>
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
              </button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/ask")}
                className="flex items-center space-x-3 px-8 py-4 text-lg font-semibold group"
               >
               <HelpCircle className="h-5 w-5" />
               <span>Ask Herbal AI</span>
               </Button>


              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/about")}
                className="flex items-center space-x-3 px-8 py-4 text-lg font-semibold group"
              >
                <span>Learn more</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-herb-700 group">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-herb-800">
                    100% Authentic
                  </div>
                  <div className="text-sm text-herb-600">Verified Source</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-herb-700 group">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-herb-800">
                    Blockchain Secured
                  </div>
                  <div className="text-sm text-herb-600">Tamper-Proof</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-herb-700 group">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-herb-800">
                    Organic Certified
                  </div>
                  <div className="text-sm text-herb-600">Premium Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RootStory Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-gray-900 mb-6">
              Why Choose GreenOrigin?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine ancient Ayurvedic wisdom with cutting-edge blockchain
              technology to bring you the most trusted and transparent herbal
              products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                  key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section className="py-16 px-6 relative herbal-gradient-bg overflow-visible">

        <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display font-black mb-8 text-herb-900">
              Try It Now
            </h2>
            <p className="text-2xl text-herb-700 font-light">
              Experience our blockchain-verified platform with these sample
              products
            </p>
          </div>

          {/* Horizontal Carousel */}
          <div 
            className={`carousel-container ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {(() => {
              const herbs = [
              {
                code: "A123XY",
                name: "Ashwagandha",
                  status: "Verified",
                  statusColor: "bg-green-500",
                description: "Premium quality root extract",
                  gradient: "from-herb-500 to-herb-600",
              },
              {
                code: "B456YZ",
                name: "Turmeric",
                  status: "Verified",
                  statusColor: "bg-green-500",
                description: "High curcumin content",
                  gradient: "from-herb-500 to-herb-600",
              },
              {
                code: "C789AB",
                  name: "Neem",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Fresh leaf processing",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "D012CD",
                  name: "Tulsi",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Holy basil extract",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "E345EF",
                name: "Brahmi",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Memory enhancing herb",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "F678GH",
                  name: "Ginger",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Digestive support root",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "G901IJ",
                  name: "Amla",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Vitamin C rich fruit",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "H234KL",
                  name: "Giloy",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Immunity booster vine",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "I567MN",
                  name: "Shatavari",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Women's health herb",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "J890OP",
                  name: "Triphala",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Three fruit blend",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "K123QR",
                  name: "Moringa",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Superfood leaves",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "L456ST",
                  name: "Fenugreek",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Blood sugar support",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "M789UV",
                  name: "Aloe Vera",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Skin healing gel",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "N012WX",
                  name: "Licorice",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Sweet root extract",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "O345YZ",
                  name: "Cardamom",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Aromatic spice pods",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "P678AB",
                  name: "Cinnamon",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Warm bark spice",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "Q901CD",
                  name: "Clove",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Aromatic flower buds",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "R234EF",
                  name: "Black Pepper",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Sharp spice berries",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "S567GH",
                  name: "Cumin",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Earthy seed spice",
                  gradient: "from-herb-500 to-herb-600",
                },
                {
                  code: "T890IJ",
                  name: "Coriander",
                  status: "Verified",
                  statusColor: "bg-green-500",
                  description: "Fresh leaf herb",
                  gradient: "from-herb-500 to-herb-600",
                },
              ];
              // Create infinite loop: duplicate the array for seamless scrolling
              const duplicatedHerbs = [...herbs, ...herbs];
              return duplicatedHerbs.map((product, index) => {
                // Calculate the correct block number (1-20) regardless of which copy
                const blockNumber = (index % herbs.length) + 1;
                return (
              <div
                key={product.code}
                className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden min-w-[300px] shadow-xl"
                onClick={() => navigate(`/product/${product.code}`)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-herb-500/20 via-mint-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105`}
                    >
                      <QrCode className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 font-mono">
                        Block #{blockNumber}
                      </div>
                      <div className="text-xs text-gray-400">Verified</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 font-mono text-sm">
                    Code: {product.code}
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">
                    {product.description}
                  </p>

                  <span
                    className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${
                      product.status === "Verified"
                        ? "bg-green-500/20 text-green-600 border border-green-500/30"
                        : "bg-amber-500/20 text-amber-600 border border-amber-500/30"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
              );
              });
            })()}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about GreenOrigin's blockchain
              verification system
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openIndex === index;

              return (
              <div
                key={index}
                  className="card border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-herbal-green/10 rounded-lg flex items-center justify-center group-hover:bg-herbal-green/20 transition-colors duration-200">
                        <Icon className="w-5 h-5 text-herbal-green" />
                    </div>
                      <h3 className="text-lg font-nunito font-semibold text-gray-900 group-hover:text-herbal-green transition-colors duration-200">
                      {faq.question}
                    </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-herbal-green" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4">
                      <div className="pl-14">
                        <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
                </div>
              );
            })}
          </div>

          {/* Additional Help */}
          
          
        </div>
      </section>

    </div>
  );
};

export default HomePage;