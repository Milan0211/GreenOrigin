
// // ================= MOCK PRODUCTS =================
// export const mockProducts = {
//   "A123XY": {
//     herbName: "Ashwagandha",
//     batchCode: "A123XY",
//     batchStatus: "Certified",
//     recallStatus: "Safe",

//     events: [
//       {
//         id: 1,
//         role: "Farmer",
//         locationName: "Satara, Maharashtra",
//         lat: 17.68,
//         lng: 74.01,
//         date: "2025-09-05",
//         description: "Ashwagandha harvested",
//         details: "3-4 year mature roots"
//       },
//       {
//         id: 2,
//         role: "Processor",
//         locationName: "Mumbai",
//         lat: 19.07,
//         lng: 72.87,
//         date: "2025-09-06",
//         description: "Roots dried & cleaned",
//         details: "Sun drying process"
//       },
//       {
//         id: 3,
//         role: "Lab",
//         locationName: "Pune",
//         lat: 18.52,
//         lng: 73.88,
//         date: "2025-09-07",
//         description: "Lab testing complete",
//         details: "Quality approved"
//       },
//       {
//         id: 4,
//         role: "Distributor",
//         locationName: "Delhi",
//         lat: 28.61,
//         lng: 77.21,
//         date: "2025-09-09",
//         description: "Packed & shipped",
//         details: "Ready for market"
//       }
//     ],

//     comparison: [
//       { name: "Purity %", thisBatch: 97, marketAvg: 85 },
//       { name: "Shelf Life (months)", thisBatch: 24, marketAvg: 18 },
//       { name: "Microbial Safety", thisBatch: 0.1, marketAvg: 0.5 },
//       { name: "Aroma Strength", thisBatch: 8.5, marketAvg: 6 }
//     ],

//     blockchainHash: "0xabc123",
//     sustainabilityScore: 95,
//     organicCertification: "USDA Organic"
//   },

//   // ================= TURMERIC =================
//   "B456YZ": {
//     herbName: "Turmeric",
//     batchCode: "B456YZ",
//     batchStatus: "Certified",
//     recallStatus: "Safe",

//     events: [
//       {
//         id: 1,
//         role: "Farmer",
//         locationName: "Erode, Tamil Nadu",
//         lat: 11.34,
//         lng: 77.73,
//         date: "2025-09-02",
//         description: "Turmeric harvested",
//         details: "High curcumin batch"
//       },
//       {
//         id: 2,
//         role: "Processor",
//         locationName: "Coimbatore",
//         lat: 11.01,
//         lng: 76.96,
//         date: "2025-09-04",
//         description: "Boiled & dried",
//         details: "Traditional method"
//       },
//       {
//         id: 3,
//         role: "Lab",
//         locationName: "Chennai",
//         lat: 13.08,
//         lng: 80.27,
//         date: "2025-09-05",
//         description: "Quality testing",
//         details: "Curcumin verified"
//       },
//       {
//         id: 4,
//         role: "Distributor",
//         locationName: "Bangalore",
//         lat: 12.97,
//         lng: 77.59,
//         date: "2025-09-07",
//         description: "Distributed",
//         details: "Market ready"
//       }
//     ],

//     comparison: [
//       { name: "Purity %", thisBatch: 98, marketAvg: 86 },
//       { name: "Shelf Life (months)", thisBatch: 30, marketAvg: 20 },
//       { name: "Microbial Safety", thisBatch: 0.05, marketAvg: 0.4 },
//       { name: "Aroma Strength", thisBatch: 9, marketAvg: 7 }
//     ],

//     blockchainHash: "0xdef456",
//     sustainabilityScore: 92,
//     organicCertification: "India Organic"
//   },

//   // ================= BRAHMI =================
//   "C789AB": {
//     herbName: "Brahmi",
//     batchCode: "C789AB",
//     batchStatus: "Certified",
//     recallStatus: "Safe",

//     events: [
//       {
//         id: 1,
//         role: "Farmer",
//         locationName: "Kerala",
//         lat: 10.85,
//         lng: 76.27,
//         date: "2025-09-01",
//         description: "Brahmi harvested",
//         details: "Wetland farming"
//       },
//       {
//         id: 2,
//         role: "Processor",
//         locationName: "Kochi",
//         lat: 9.93,
//         lng: 76.26,
//         date: "2025-09-02",
//         description: "Leaves dried",
//         details: "Low heat drying"
//       },
//       {
//         id: 3,
//         role: "Lab",
//         locationName: "Trivandrum",
//         lat: 8.52,
//         lng: 76.93,
//         date: "2025-09-03",
//         description: "Lab testing",
//         details: "All safe"
//       },
//       {
//         id: 4,
//         role: "Distributor",
//         locationName: "Hyderabad",
//         lat: 17.38,
//         lng: 78.48,
//         date: "2025-09-05",
//         description: "Shipped",
//         details: "Ready for sale"
//       }
//     ],

//     comparison: [
//       { name: "Purity %", thisBatch: 96, marketAvg: 82 },
//       { name: "Shelf Life (months)", thisBatch: 18, marketAvg: 12 },
//       { name: "Microbial Safety", thisBatch: 0.08, marketAvg: 0.6 },
//       { name: "Aroma Strength", thisBatch: 7.5, marketAvg: 5 }
//     ],

//     blockchainHash: "0xghi789",
//     sustainabilityScore: 90,
//     organicCertification: "Kerala Organic"
//   }
// };

// // ================= MOCK API =================
// export const mockApi = {
//   getProduct: async (code) => {
//     await new Promise((r) => setTimeout(r, 400));
//     const product = mockProducts[code];
//     if (!product) throw new Error("Product not found");
//     return product;
//   }
// };




// ================= MOCK PRODUCTS =================

export const mockProducts = {
  "A123XY": createProduct("Ashwagandha", "A123XY", "Satara, Maharashtra", "Nashik Processing Unit", "Pune Herbal Lab", "Delhi Distributor"),
  "B456YZ": createProduct("Turmeric", "B456YZ", "Erode, Tamil Nadu", "Coimbatore Processing Unit", "Chennai Spice Lab", "Bangalore Distributor"),
  "C789AB": createProduct("Neem", "C789AB", "Jaipur, Rajasthan", "Udaipur Processing Unit", "Ahmedabad Herbal Lab", "Delhi Distributor"),
  "D012QR": createProduct("Tulsi", "D012QR", "Bhopal, MP", "Indore Processing Unit", "Nagpur Herbal Lab", "Mumbai Distributor"),
  "E345EF": createProduct("Brahmi", "E345EF", "Kerala Wetlands", "Kochi Processing Unit", "Trivandrum Ayurveda Lab", "Hyderabad Distributor"),
  "F678GH": createProduct("Ginger", "F678GH", "Sikkim Hills", "Gangtok Processing Unit", "Kolkata Spice Lab", "Delhi Distributor"),
  "G901IJ": createProduct("Amla", "G901IJ", "Prayagraj, UP", "Kanpur Processing Unit", "Lucknow Food Lab", "Delhi Distributor"),
  "H234KL": createProduct("Giloy", "H234KL", "Forest Region MP", "Jabalpur Processing Unit", "Bhopal Herbal Lab", "Indore Distributor"),
  "I567MN": createProduct("Shatavari", "I567MN", "Chhattisgarh", "Raipur Processing Unit", "Nagpur Ayurveda Lab", "Mumbai Distributor"),
  "J890OP": createProduct("Triphala", "J890OP", "Varanasi", "Varanasi Processing Unit", "Delhi Ayurveda Lab", "Delhi Distributor"),
  "K123QR": createProduct("Moringa", "K123QR", "Salem, TN", "Madurai Processing Unit", "Chennai Nutrition Lab", "Bangalore Distributor"),
  "L456ST": createProduct("Fenugreek", "L456ST", "Jodhpur", "Ajmer Processing Unit", "Jaipur Food Lab", "Delhi Distributor"),
  "M789UV": createProduct("Aloe Vera", "M789UV", "Kutch, Gujarat", "Ahmedabad Processing Unit", "Surat Herbal Lab", "Mumbai Distributor"),
  "N012WX": createProduct("Licorice", "N012WX", "Punjab Farms", "Ludhiana Processing Unit", "Chandigarh Lab", "Delhi Distributor"),
  "O345YZ": createProduct("Cardamom", "O345YZ", "Idukki, Kerala", "Kochi Spice Processing", "Kochi Spice Lab", "Bangalore Distributor"),
  "P678AB": createProduct("Cinnamon", "P678AB", "Sri Lanka Farms", "Chennai Processing", "Chennai Spice Lab", "Mumbai Distributor"),
  "Q901CD": createProduct("Clove", "Q901CD", "Kerala Coast", "Kozhikode Processing", "Kochi Spice Lab", "Delhi Distributor"),
  "R234EF": createProduct("Black Pepper", "R234EF", "Wayanad", "Calicut Processing", "Kochi Lab", "Delhi Distributor"),
  "S567GH": createProduct("Cumin", "S567GH", "Gujarat Farms", "Unjha Processing", "Ahmedabad Lab", "Mumbai Distributor"),
  "T890IJ": createProduct("Coriander", "T890IJ", "MP Farms", "Indore Processing", "Bhopal Lab", "Delhi Distributor")
};

// ================= FUNCTION =================

function createProduct(name, code, farmerLoc, processorLoc, labLoc, distributorLoc) {
  return {
    herbName: name,
    batchCode: code,
    batchStatus: "Certified",
    recallStatus: "Safe",

    events: [
      {
        id: 1,
        role: "Farmer",
        locationName: farmerLoc,
        lat: 20,
        lng: 78,
        date: "2025-09-01",
        description: `${name} harvested`,
        details: "Organic cultivation"
      },
      {
        id: 2,
        role: "Processor",
        locationName: processorLoc,
        lat: 21,
        lng: 79,
        date: "2025-09-02",
        description: "Processed",
        details: "Cleaned & dried"
      },
      {
        id: 3,
        role: "Lab",
        locationName: labLoc,
        lat: 22,
        lng: 80,
        date: "2025-09-03",
        description: "Lab tested",
        details: "Quality approved"
      },
      {
        id: 4,
        role: "Distributor",
        locationName: distributorLoc,
        lat: 28,
        lng: 77,
        date: "2025-09-05",
        description: "Distributed",
        details: "Market ready"
      }
    ],

    comparison: [
      { name: "Purity %", thisBatch: 96, marketAvg: 85 },
      { name: "Shelf Life", thisBatch: 24, marketAvg: 18 },
      { name: "Microbial Safety", thisBatch: 0.1, marketAvg: 0.5 },
      { name: "Aroma Strength", thisBatch: 8, marketAvg: 6 }
    ],

    blockchainHash: "0x123abc",
    sustainabilityScore: 90,
    organicCertification: "Organic Certified"
  };
}

// ================= API =================

export const mockApi = {
  getProduct: async (code) => {
    await new Promise((r) => setTimeout(r, 300));
    const product = mockProducts[code];
    if (!product) throw new Error("Product not found");
    return product;
  }
};
