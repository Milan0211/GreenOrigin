# HerbTrace Demo Guide

## 🚀 Quick Start

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Open in browser**
   Navigate to `http://localhost:5173`

## 📱 Demo Flow

### 1. Homepage Experience
- **Hero Section**: Large scan button and introduction
- **Features**: Overview of key capabilities
- **Sample Products**: Click on any sample product card to explore
- **FAQ Section**: Common questions and answers

### 2. QR Scanning
- **Scan Page**: Navigate to `/scan` or click "Scan QR Code"
- **Camera Access**: Allow camera permissions when prompted
- **Sample Codes**: Use provided sample codes if no physical QR code
- **Instructions**: Step-by-step scanning guide

### 3. Product Details
Try these sample product codes:

#### A123XY - Ashwagandha (Certified)
- Complete journey from Satara to Delhi
- All lab tests passed
- Interactive map with 4 locations
- Blockchain hash available

#### B456YZ - Turmeric (Certified)
- Journey from Tamil Nadu to Karnataka
- High curcumin content (4.2%)
- Premium quality certification
- Full traceability

#### C789AB - Brahmi (Pending)
- Partial journey (Kerala processing)
- Some tests still pending
- Shows pending status handling

### 4. Recall Testing
- **Safe Product**: Use any certified product code
- **Recalled Product**: Use `D999XX` to see recall alert
- **Recall Details**: Complete recall information and contact details

### 5. About Page
- **Mission**: Project goals and vision
- **Team**: Expert profiles
- **Technology**: Tech stack overview
- **Contact**: Support information

## 🎯 Key Features to Demo

### QR Code Scanning
1. Click "Scan QR Code" on homepage
2. Allow camera access
3. Point camera at QR code (or use sample codes)
4. See instant redirect to product page

### Product Journey
1. Navigate to any product page
2. Scroll through the timeline
3. Click on events to see detailed information
4. View the interactive map

### Lab Certificates
1. Check the sidebar on product pages
2. See color-coded status badges
3. View detailed test results

### Recall System
1. Go to `/recall/D999XX` to see recall alert
2. Check `/recall/A123XY` to see safe status
3. Test contact information copying

### Mobile Experience
1. Open developer tools
2. Switch to mobile view
3. Test touch interactions
4. Verify responsive design

## 🔧 Technical Features

### Performance
- Fast loading with React Query caching
- Optimized images and assets
- Smooth animations and transitions

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast colors
- ARIA labels throughout

### Security
- Camera permission handling
- Secure data display
- No personal data collection

## 📊 Sample Data Structure

```json
{
  "herbName": "Ashwagandha",
  "batchCode": "A123XY",
  "batchStatus": "Certified",
  "recallStatus": "Safe",
  "events": [
    {
      "id": 1,
      "role": "Farmer",
      "locationName": "Satara, Maharashtra",
      "lat": 17.68,
      "lng": 74.01,
      "date": "2025-09-05",
      "description": "Organic Ashwagandha roots harvested",
      "details": "Detailed harvesting information..."
    }
  ],
  "certificates": [
    {
      "type": "Moisture",
      "status": "PASS",
      "value": "8.2%",
      "limit": "<10%"
    }
  ]
}
```

## 🎨 Design Highlights

### Color Scheme
- **Earth Tones**: Natural greens and browns
- **Accent Colors**: Emerald green and amber
- **Status Colors**: Green (safe), amber (warning), red (danger)

### Typography
- **Headings**: Nunito font family
- **Body Text**: Inter font family
- **Hierarchy**: Clear visual hierarchy

### Components
- **Cards**: Soft shadows and rounded corners
- **Badges**: Color-coded status indicators
- **Buttons**: Consistent styling and hover effects
- **Maps**: Interactive with custom markers

## 🚀 Deployment Ready

The application is production-ready with:
- Optimized build process
- Static file generation
- CDN-friendly assets
- Environment configuration

## 📱 Mobile Testing

Test on various devices:
- **iPhone**: Safari browser
- **Android**: Chrome browser
- **Tablet**: iPad/Android tablet
- **Desktop**: Chrome, Firefox, Safari

## 🔍 Troubleshooting

### Camera Issues
- Ensure HTTPS in production
- Check browser permissions
- Use sample codes as fallback

### Map Loading
- Check internet connection
- Verify Leaflet CSS loading
- Test with different browsers

### Performance
- Clear browser cache
- Check network tab for errors
- Verify all dependencies installed

---

**Ready for SIH Hackathon Demo! 🏆**
