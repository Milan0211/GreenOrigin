# RootStory - Ayurvedic Herbs Blockchain Verification Platform

A consumer-facing web application for Ayurvedic herbal products that offers transparent, trusted, blockchain-verified provenance data accessed via QR codes on packaging.

## 🌿 Features

- **QR Code Scanning**: Instant verification of product authenticity using device camera
- **Product Journey Tracking**: Complete timeline from farm to consumer with detailed event information
- **Geographic Mapping**: Interactive maps showing the herb's journey across locations
- **Lab Certifications**: Detailed lab test results and quality certifications
- **Recall Management**: Real-time recall checking and safety alerts
- **Blockchain Verification**: Tamper-proof records ensuring complete transparency
- **Mobile-First Design**: Responsive design optimized for mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18+ with Vite
- **Styling**: TailwindCSS with custom earth-tone color palette
- **UI Components**: Custom components inspired by shadcn/ui
- **QR Scanning**: ZXing library for robust QR code detection
- **Maps**: React Leaflet for interactive geographic visualization
- **State Management**: TanStack Query for API state management
- **Routing**: React Router for navigation
- **Notifications**: React Hot Toast for user feedback

## 📱 Pages

1. **Homepage (/)**: Hero scan section, product overview, and featured FAQs
2. **Scan QR (/scan)**: Full-page QR scanner with real-time feedback
3. **Product Detail (/product/:id)**: Complete product information with timeline and map
4. **Recall Check (/recall/:batchCode)**: Batch safety verification and recall information
5. **About/FAQs (/about)**: Project information and team details

## 🎨 Design System

- **Colors**: Earth-tone base (greens, browns) with emerald and amber accents
- **Typography**: Inter for body text, Nunito for headings
- **Components**: Card-based layout with soft shadows and consistent spacing
- **Animations**: Gentle transitions and loading states
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rootstory-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📊 Sample Data

The application includes mock data for demonstration:

- **A123XY**: Ashwagandha (Certified)
- **B456YZ**: Turmeric (Certified)  
- **C789AB**: Brahmi (Pending)
- **D999XX**: Ginseng (Recalled - for testing recall functionality)

## 🔍 Key Components

- **QRScanner**: Camera-based QR code scanning with error handling
- **EventTimeline**: Vertical timeline showing product journey
- **GeoMap**: Interactive map with event markers
- **CertificateBadge**: Lab test result display with status indicators
- **Layout**: Responsive navigation and footer

## 🌐 API Endpoints (Mock)

- `GET /api/product/:code` - Fetch product details and journey
- `GET /api/recall/:batchCode` - Check recall status
- `GET /api/events/:eventId` - Get detailed event information

## 🎯 Features Implemented

✅ QR Code Scanning with camera access  
✅ Product journey timeline with expandable details  
✅ Interactive geographic mapping  
✅ Lab certification display with status badges  
✅ Recall checking and safety alerts  
✅ Responsive mobile-first design  
✅ Loading states and error handling  
✅ Toast notifications for user feedback  
✅ Accessibility features (ARIA labels, keyboard navigation)  
✅ Modern UI with earth-tone color scheme  
✅ Blockchain hash display and copying  

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Mobile Experience

- Touch-friendly interface with large tap targets
- Camera integration for QR scanning
- Responsive design that works on all screen sizes
- Optimized for mobile-first usage

## 🔒 Security & Privacy

- No personal data collection
- Secure camera access with user permission
- Blockchain verification for data integrity
- Privacy-first design principles

## 🏆 SIH Hackathon

Built for the Smart India Hackathon 2025, this project demonstrates:

- Modern web development practices
- Blockchain integration concepts
- Supply chain transparency solutions
- User-centered design approach
- Mobile-first development

## 📞 Support

For questions or support, contact:
- Email: info@rootstory.com
- Phone: +91 98765 43210

---

**Built with ❤️ for the SIH Hackathon 2025**