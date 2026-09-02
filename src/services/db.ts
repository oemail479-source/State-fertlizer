import { 
  User, Product, Bungalow, Order, PaymentTransaction, 
  BungalowBooking, Tender, TenderPurchaseRecord, Inquiry, 
  NewsItem, EventItem, FAQItem, VacancyItem, GalleryItem, 
  AuditLog, ERPSyncLog 
} from '../types';

const INITIAL_USERS: User[] = [
  {
    id: 'user-01',
    name: 'Super Admin',
    email: 'admin@sfcl-demo.lk',
    role: 'Super Administrator',
    department: 'Executive Management',
    nic: '198234509876',
    mobile: '+94 77 123 4567'
  },
  {
    id: 'user-02',
    name: 'Bandara Herath',
    email: 'procurement@sfcl-demo.lk',
    role: 'Procurement Officer',
    department: 'Procurement & Supplies',
    nic: '198545678912',
    mobile: '+94 71 234 5678'
  },
  {
    id: 'user-03',
    name: 'Samanthi Perera',
    email: 'booking@sfcl-demo.lk',
    role: 'Booking Officer',
    department: 'Estate & Logistics',
    nic: '199087654321',
    mobile: '+94 76 345 6789'
  },
  {
    id: 'user-04',
    name: 'Nimal Jayasinghe',
    email: 'finance@sfcl-demo.lk',
    role: 'Finance Officer',
    department: 'Finance & Accounts',
    nic: '197912345678',
    mobile: '+94 75 456 7890'
  },
  {
    id: 'user-05',
    name: 'Kavinda Ratnayake',
    email: 'editor@sfcl-demo.lk',
    role: 'Content Editor',
    department: 'Public Relations & IT',
    nic: '199223456789',
    mobile: '+94 72 567 8901'
  },
  {
    id: 'user-06',
    name: 'Sunil Wickramasinghe',
    email: 'internal@sfcl-demo.lk',
    role: 'Internal User',
    department: 'Agronomy Research Division',
    nic: '198834567890',
    mobile: '+94 70 678 9012'
  }
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Granular Urea (46% Nitrogen)',
    code: 'SFCL-UREA-50',
    category: 'Chemical Fertilizers',
    type: 'Nitrogenous',
    description: 'High-purity technical grade granular urea for maximum nitrogen enrichment in paddy, tea, and sugarcane farming.',
    specifications: 'Total Nitrogen: 46.0% min, Moisture: 0.5% max, Biuret: 1.0% max, Granulometry: 2.0-4.0mm 90% min.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg Polypropylene Woven Bag',
    pricePerUnit: 9000,
    availableStock: 14500,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 500,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock',
    isFeatured: true
  },
  {
    id: 'prod-02',
    name: 'Triple Super Phosphate (TSP 46% P2O5)',
    code: 'SFCL-TSP-50',
    category: 'Chemical Fertilizers',
    type: 'Phosphatic',
    description: 'Essential root-development fertilizer formulated for high crop yields in field crops, vegetables, and commercial estates.',
    specifications: 'Available Phosphate (P2O5): 46.0% min, Water Soluble P2O5: 41.0% min, Moisture: 4.0% max.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg HDPE Bag',
    pricePerUnit: 8500,
    availableStock: 8200,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 400,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock',
    isFeatured: true
  },
  {
    id: 'prod-03',
    name: 'Muriate of Potash (MOP 60% K2O)',
    code: 'SFCL-MOP-50',
    category: 'Chemical Fertilizers',
    type: 'Potassic',
    description: 'Premium red crystalline potassium chloride enhancing disease resistance and fruit quality in fruits and tubers.',
    specifications: 'Soluble Potash (K2O): 60.0% min, Moisture: 1.0% max, Sodium Chloride: 3.5% max.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg Laminated Bag',
    pricePerUnit: 9500,
    availableStock: 6400,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 450,
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock',
    isFeatured: true
  },
  {
    id: 'prod-04',
    name: 'Standard Ammonium Sulfate (SA 21% N, 24% S)',
    code: 'SFCL-SA-50',
    category: 'Chemical Fertilizers',
    type: 'Nitrogenous',
    description: 'Dual-nutrient nitrogen and sulfur fertilizer specially formulated for tea plantations, rubber estates, and acidic soils.',
    specifications: 'Nitrogen: 21.0% min, Sulfur: 24.0% min, Free Acid: 0.05% max, Moisture: 1.0% max.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg Bag',
    pricePerUnit: 6800,
    availableStock: 3100,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 300,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock'
  },
  {
    id: 'prod-05',
    name: 'Paddy Super Special NPK Mixture (15-15-15)',
    code: 'SFCL-NPK-PAD',
    category: 'Specialized Blends',
    type: 'Complex / NPK',
    description: 'Custom blended high-yield paddy mixture tailored for Maha and Yala harvest seasons across Dry Zone and Wet Zone paddy fields.',
    specifications: 'Nitrogen: 15%, P2O5: 15%, K2O: 15%, Trace Elements: Zn, B, Mg 1.5%.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg Bag',
    pricePerUnit: 10200,
    availableStock: 11200,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 600,
    image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock',
    isFeatured: true
  },
  {
    id: 'prod-06',
    name: 'Upcountry Vegetable Growth Mixture',
    code: 'SFCL-VEG-25',
    category: 'Specialized Blends',
    type: 'Complex / NPK',
    description: 'Designed specifically for Nuwara Eliya and Badulla potato, carrot, and leek farming with quick-release micronutrients.',
    specifications: 'NPK 12-18-20 + Mg 2% + Micro-nutrients 1%.',
    unit: 'Bag (25kg)',
    packageSize: '25 kg Bag',
    pricePerUnit: 5400,
    availableStock: 2800,
    isBulkAvailable: false,
    minQuantity: 1,
    maxQuantity: 100,
    image: '/vegetable-fertilizer.svg',
    effectiveDate: '2026-08-01',
    status: 'In Stock'
  },
  {
    id: 'prod-07',
    name: 'Bio-Organic Super-Gro Compost',
    code: 'SFCL-ORG-25',
    category: 'Organic Fertilizers',
    type: 'Organic',
    description: '100% natural, pathogen-free compost enriched with beneficial microbes and humic substances for sustainable soil health.',
    specifications: 'Organic Matter: >45%, Organic Carbon: 20%, C:N Ratio: <18:1, pH: 6.5 - 7.5.',
    unit: 'Bag (25kg)',
    packageSize: '25 kg Heavy Duty Eco Bag',
    pricePerUnit: 2200,
    availableStock: 5600,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 200,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock'
  },
  {
    id: 'prod-08',
    name: 'Zinc Sulfate Monohydrate (Micro-Nutrient)',
    code: 'SFCL-ZINC-01',
    category: 'Specialized Blends',
    type: 'Complex / NPK',
    description: 'Foliar and soil application zinc additive to eliminate khaira disease in paddy and boost chlorophyll production.',
    specifications: 'Zinc (Zn): 33.0% min, Sulfur (S): 15.0% min, Water Soluble powder.',
    unit: 'Pack (1kg)',
    packageSize: '1 kg Foil Pouch',
    pricePerUnit: 850,
    availableStock: 1200,
    isBulkAvailable: false,
    minQuantity: 1,
    maxQuantity: 50,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock'
  },
  {
    id: 'prod-09',
    name: 'Commercial Estate Coconut Boost NPK',
    code: 'SFCL-COC-50',
    category: 'Specialized Blends',
    type: 'Complex / NPK',
    description: 'Formulated for coconut palm nurseries and mature palm yields with elevated potassium and magnesium content.',
    specifications: 'NPK 12-6-24 + MgO 3% + B 0.5%.',
    unit: 'Bag (50kg)',
    packageSize: '50 kg Bag',
    pricePerUnit: 8900,
    availableStock: 4200,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 300,
    image: '/coconut-fertilizer.svg',
    effectiveDate: '2026-08-01',
    status: 'In Stock'
  },
  {
    id: 'prod-10',
    name: 'Bulk Granular Urea (1 Metric Ton Jumbo Bag)',
    code: 'SFCL-UREA-1MT',
    category: 'Chemical Fertilizers',
    type: 'Nitrogenous',
    description: 'Industrial and large-scale agricultural consignment supply for commercial estates, Govijana Sewa centers, and bulk distributors.',
    specifications: 'Total Nitrogen: 46.0% min, 1000 kg FIBC Jumbo Container Bag with discharge spout.',
    unit: 'Metric Ton (1000kg)',
    packageSize: '1 Metric Ton Jumbo Bag',
    pricePerUnit: 175000,
    availableStock: 450,
    isBulkAvailable: true,
    minQuantity: 1,
    maxQuantity: 50,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    effectiveDate: '2026-08-01',
    status: 'In Stock',
    isFeatured: true
  }
];

const INITIAL_BUNGALOWS: Bungalow[] = [
  {
    id: 'bung-polonnaruwa',
    name: 'Polonnaruwa Circuit Bungalow',
    location: 'North Central Province',
    address: 'Near Parakrama Samudra, Station Road, Polonnaruwa',
    contactNumber: '+94 27 222 4190',
    description: 'Scenic lakeside holiday residence situated in historic Polonnaruwa, providing tranquil accommodations, dining hall, air-conditioned rooms, and secure parking for official visits and leisure.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rooms: [
      {
        id: 'pol-r1',
        bungalowId: 'bung-polonnaruwa',
        roomNumber: 'Room 01',
        roomName: 'Deluxe AC Suite (Royal View)',
        capacity: 4,
        bedType: '1 King Bed + 1 Twin Bed',
        pricePerNight: 7500,
        amenities: ['Air Conditioning', 'Attached Bath', 'Hot Water', 'Lake View Balcony', 'TV', 'Free Wi-Fi'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'pol-r2',
        bungalowId: 'bung-polonnaruwa',
        roomNumber: 'Room 02',
        roomName: 'Executive Twin Room',
        capacity: 3,
        bedType: '2 Twin Beds',
        pricePerNight: 5500,
        amenities: ['Air Conditioning', 'Attached Bath', 'Hot Water', 'Garden View', 'Wi-Fi'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'pol-r3',
        bungalowId: 'bung-polonnaruwa',
        roomNumber: 'Room 03',
        roomName: 'Standard Family Room',
        capacity: 4,
        bedType: '2 Double Beds',
        pricePerNight: 5000,
        amenities: ['Ceiling Fan', 'Attached Bath', 'Hot Water', 'Garden Access'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'pol-r4',
        bungalowId: 'bung-polonnaruwa',
        roomNumber: 'Room 04',
        roomName: 'Standard Officer Room',
        capacity: 2,
        bedType: '1 Double Bed',
        pricePerNight: 4000,
        amenities: ['Ceiling Fan', 'Attached Bath', 'Desk & Chair'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'bung-nuwaraeliya',
    name: 'Nuwara-Eliya Circuit Bungalow',
    location: 'Central Province',
    address: 'Upper Lake Road, near Gregory Lake, Nuwara-Eliya',
    contactNumber: '+94 52 222 3840',
    description: 'Charming colonial-style mountain retreat featuring fireplace, heated blankets, pristine gardens, and panoramic views of Pidurutalagala mountain range.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rooms: [
      {
        id: 'nue-r1',
        bungalowId: 'bung-nuwaraeliya',
        roomNumber: 'Room 01',
        roomName: 'Grand Colonial Suite (Fireplace)',
        capacity: 4,
        bedType: '1 King Bed + Fireplace Living',
        pricePerNight: 9500,
        amenities: ['Fireplace', 'Heated Shower', 'Mountain View Balcony', 'TV', 'Tea/Coffee Maker', 'Wi-Fi'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'nue-r2',
        bungalowId: 'bung-nuwaraeliya',
        roomNumber: 'Room 02',
        roomName: 'Highland Family Room',
        capacity: 4,
        bedType: '2 Queen Beds',
        pricePerNight: 7500,
        amenities: ['Heated Shower', 'Mountain View', 'Electric Blankets', 'Wi-Fi'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'nue-r3',
        bungalowId: 'bung-nuwaraeliya',
        roomNumber: 'Room 03',
        roomName: 'Superior Double Room',
        capacity: 2,
        bedType: '1 Queen Bed',
        pricePerNight: 6000,
        amenities: ['Heated Shower', 'Garden View', 'Tea/Coffee Maker'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'nue-r4',
        bungalowId: 'bung-nuwaraeliya',
        roomNumber: 'Room 04',
        roomName: 'Standard Twin Room',
        capacity: 2,
        bedType: '2 Single Beds',
        pricePerNight: 5000,
        amenities: ['Heated Shower', 'Garden View'],
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

const INITIAL_TENDERS: Tender[] = [
  {
    id: 'tnd-2026-01',
    tenderRef: 'SFCL/PROC/2026/08/UREA-04',
    title: 'Procurement of 50,000 MT Granular Urea Fertilizer for Maha Season 2026/2027',
    category: 'Fertilizer Supply',
    publishedDate: '2026-08-15',
    closingDate: '2026-09-25',
    description: 'International competitive bidding for supply, bagging, and delivery of 50,000 MT of Granular Urea to SFCL Colombo port and regional warehouses.',
    status: 'Open',
    documents: [
      {
        id: 'doc-01',
        title: 'Tender Notice & Invitation Guidelines',
        fileName: 'SFCL_Urea_Procurement_Notice_2026.pdf',
        fileSize: '1.2 MB',
        isPaid: false,
        documentFee: 0
      },
      {
        id: 'doc-02',
        title: 'Bidding Document & Technical Specifications (Full Pack)',
        fileName: 'SFCL_Urea_Bidding_Document_Vol_I_II.pdf',
        fileSize: '14.5 MB',
        isPaid: true,
        documentFee: 5000
      }
    ]
  },
  {
    id: 'tnd-2026-02',
    tenderRef: 'SFCL/LOG/2026/08/DIS-01',
    title: 'Island-wide Island Freight & Transport Services for Regional Govijana Sewa Distribution',
    category: 'Logistics & Transport',
    publishedDate: '2026-08-18',
    closingDate: '2026-09-15',
    description: 'National competitive bidding for hiring 10-ton and 15-ton prime mover trucks for fertilizer transportation from Hunupitiya main warehouse to island-wide distribution hubs.',
    status: 'Closing Soon',
    documents: [
      {
        id: 'doc-03',
        title: 'Transport Tender Notice',
        fileName: 'Transport_Tender_Notice.pdf',
        fileSize: '850 KB',
        isPaid: false,
        documentFee: 0
      },
      {
        id: 'doc-04',
        title: 'Complete Transport Logistics RFP & Terms',
        fileName: 'SFCL_Transport_RFP_Full.pdf',
        fileSize: '6.2 MB',
        isPaid: true,
        documentFee: 3500
      }
    ]
  },
  {
    id: 'tnd-2026-03',
    tenderRef: 'SFCL/LAB/2026/07/SPEC-09',
    title: 'Supply, Installation & Calibration of High-Precision ICP-OES Spectrometer for Testing Lab',
    category: 'Lab Equipment',
    publishedDate: '2026-08-01',
    closingDate: '2026-09-30',
    description: 'Supply of advanced laboratory spectroscopy instrument for micro-nutrient analysis at SFCL Central Quality Testing Laboratory, Peliyagoda.',
    status: 'Open',
    documents: [
      {
        id: 'doc-05',
        title: 'Lab Instrument Specifications Brief',
        fileName: 'ICP_OES_Lab_Spec_Brief.pdf',
        fileSize: '2.1 MB',
        isPaid: false,
        documentFee: 0
      },
      {
        id: 'doc-06',
        title: 'Official Commercial Bidding Document',
        fileName: 'Lab_Spectrometer_Bidding_Doc.pdf',
        fileSize: '8.4 MB',
        isPaid: true,
        documentFee: 4000
      }
    ]
  },
  {
    id: 'tnd-2026-04',
    tenderRef: 'SFCL/IT/2026/06/SRV-02',
    title: 'Upgrade of Enterprise Server Infrastructure & Data Center Hardware',
    category: 'IT Infrastructure',
    publishedDate: '2026-06-10',
    closingDate: '2026-07-20',
    description: 'Supply and deployment of rack servers, SAN storage array, and backup unit for SFCL head office.',
    status: 'Closed',
    documents: [
      {
        id: 'doc-07',
        title: 'IT Server Tender Notice (Archived)',
        fileName: 'IT_Server_Tender_Archived.pdf',
        fileSize: '1.1 MB',
        isPaid: false,
        documentFee: 0
      }
    ]
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SFCL-ORD-2026-00891',
    customerName: 'Mahinda Bandara',
    customerNic: '197512349876',
    customerEmail: 'm.bandara@farmnet.lk',
    customerMobile: '+94 77 987 6543',
    deliveryAddress: 'No. 45, Main Street, Polonnaruwa',
    items: [
      { productId: 'prod-01', productName: 'Granular Urea (46% Nitrogen)', unitPrice: 9000, quantity: 10, unit: 'Bag (50kg)', total: 90000 },
      { productId: 'prod-05', productName: 'Paddy Super Special NPK Mixture (15-15-15)', unitPrice: 10200, quantity: 5, unit: 'Bag (50kg)', total: 51000 }
    ],
    subtotal: 141000,
    deliveryFee: 4500,
    totalAmount: 145500,
    paymentMethod: 'BOC IPG',
    paymentStatus: 'Successful',
    orderStatus: 'Confirmed',
    createdAt: '2026-08-28 10:15 AM',
    transactionId: 'TXN-BOC-8910452',
    erpSyncStatus: 'Synced',
    erpReference: 'ERP-SO-2026-9921'
  },
  {
    id: 'ord-1002',
    orderNumber: 'SFCL-ORD-2026-00892',
    customerName: 'Dambulla Agri Co-op Society',
    customerNic: 'PV00234918',
    customerEmail: 'procure@dambulla-coop.lk',
    customerMobile: '+94 66 228 4100',
    deliveryAddress: 'Peliyagoda Transport Depot / Pickup',
    items: [
      { productId: 'prod-10', productName: 'Bulk Granular Urea (1 Metric Ton Jumbo Bag)', unitPrice: 175000, quantity: 2, unit: 'Metric Ton (1000kg)', total: 350000 }
    ],
    subtotal: 350000,
    deliveryFee: 0,
    totalAmount: 350000,
    paymentMethod: 'People\'s Bank IPG',
    paymentStatus: 'Successful',
    orderStatus: 'Processing',
    createdAt: '2026-08-29 02:40 PM',
    transactionId: 'TXN-PBL-9928104',
    erpSyncStatus: 'Synced',
    erpReference: 'ERP-SO-2026-9925'
  }
];

const INITIAL_BOOKINGS: BungalowBooking[] = [
  {
    id: 'bok-5001',
    bookingRef: 'SFCL-BOK-2026-0041',
    bungalowId: 'bung-polonnaruwa',
    bungalowName: 'Polonnaruwa Circuit Bungalow',
    roomId: 'pol-r1',
    roomName: 'Deluxe AC Suite (Royal View)',
    guestName: 'Dr. Chandana Jayasuriya',
    guestNic: '197034561234',
    guestEmail: 'c.jayasuriya@agri.gov.lk',
    guestMobile: '+94 71 889 0123',
    isInternal: false,
    checkInDate: '2026-09-10',
    checkOutDate: '2026-09-12',
    numberOfNights: 2,
    totalFee: 15000,
    status: 'Approved',
    paymentTransactionId: 'TXN-BOC-771890',
    createdAt: '2026-08-25 11:20 AM',
    refundStatus: 'None'
  },
  {
    id: 'bok-5002',
    bookingRef: 'SFCL-BOK-2026-0042',
    bungalowId: 'bung-nuwaraeliya',
    bungalowName: 'Nuwara-Eliya Circuit Bungalow',
    roomId: 'nue-r1',
    roomName: 'Grand Colonial Suite (Fireplace)',
    guestName: 'Sunil Wickramasinghe',
    guestNic: '198834567890',
    guestEmail: 'internal@sfcl-demo.lk',
    guestMobile: '+94 70 678 9012',
    isInternal: true,
    department: 'Agronomy Research Division',
    purpose: 'Maha Season Soil Inspection & Field Officer Training',
    checkInDate: '2026-09-18',
    checkOutDate: '2026-09-20',
    numberOfNights: 2,
    totalFee: 19000,
    status: 'Pending Internal Approval',
    createdAt: '2026-08-30 09:00 AM',
    refundStatus: 'None'
  }
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    referenceNo: 'SFCL-INQ-2026-000124',
    name: 'Kithsiri Samarasinghe',
    email: 'kithsiri.samara@gmail.com',
    mobile: '+94 77 345 8901',
    category: 'Fertilizer Availability',
    subject: 'Inquiry regarding MOP fertilizer stock in Ampara regional store',
    message: 'We require approximately 20 metric tons of MOP for the upcoming paddy cultivation in Kalmunai. Please confirm stock availability and collection procedure.',
    status: 'Assigned',
    assignedOfficer: 'Bandara Herath',
    submittedAt: '2026-08-29 04:15 PM'
  },
  {
    id: 'inq-102',
    referenceNo: 'SFCL-INQ-2026-000125',
    name: 'Dilani Perera',
    email: 'dilani.p@microfarms.lk',
    mobile: '+94 71 567 1234',
    category: 'Testing Lab Services',
    subject: 'Soil heavy metal testing turn-around time and charges',
    message: 'Could you please provide the fee structure for cadmium and lead testing in organic soil samples at your Peliyagoda testing laboratory?',
    status: 'Responded',
    assignedOfficer: 'Kavinda Ratnayake',
    response: 'Dear Madam, Our central laboratory provides heavy metal testing at LKR 4,500 per sample with a standard 5 working day report turn-around time. Details sent to your email.',
    respondedAt: '2026-08-30 11:30 AM',
    submittedAt: '2026-08-28 09:40 AM'
  }
];

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-01',
    titleEn: 'SFCL Guarantees Uninterrupted Fertilizer Supply for Maha Season 2026/2027',
    titleSi: '2026/2027 මහ කන්නය සඳහා අඛණ්ඩ පොහොර සැපයුමක් රාජ්‍ය පොහොර සමාගම සහතික කරයි',
    titleTa: '2026/2027 மஹா பருவத்திற்கு தடையற்ற உர விநியோகத்தை அரசாங்க உர நிறுவனம் உறுதி செய்கிறது',
    summaryEn: 'State Fertilizer Company Limited has secured 120,000 MT of high-grade Urea and TSP to ensure full national food security across all agricultural zones.',
    summarySi: 'සියලුම කෘෂිකාර්මික කලාප පුරා ජාතික ආහාර සුරක්ෂිතතාව තහවුරු කිරීම සඳහා රාජ්‍ය පොහොර සමාගම උසස් තත්ත්වයේ යූරියා සහ TSP මෙට්‍රික් ටොන් 120,000ක් ලබාගෙන ඇත.',
    summaryTa: 'தேசிய உணவுப் பாதுகாப்பை உறுதி செய்வதற்காக 120,000 மெட்ரிக் தொன் உரங்களை அரசாங்க உர நிறுவனம் கொள்முதல் செய்துள்ளது.',
    contentEn: 'State Fertilizer Company Limited (SFCL) Chairman announced today that complete procurement logistics have been finalized for the upcoming Maha Season. Regional distribution centers in Polonnaruwa, Anuradhapura, Ampara, and Hambantota have been stocked to maximum capacity.',
    contentSi: 'එළඹෙන මහ කන්නය සඳහා සම්පූර්ණ ප්‍රසම්පාදන ලොජිස්ටික්ස් අවසන් කර ඇති බව රාජ්‍ය පොහොර සමාගමේ සභාපතිතුමා අද නිවේදනය කළේය.',
    contentTa: 'வரவிருக்கும் மஹா பருவத்திற்கான கொள்முதல் பணிகள் நிறைவடைந்துள்ளதாக உர நிறுவனத் தலைவர் தெரிவித்துள்ளார்.',
    category: 'Announcement',
    publishedDate: '2026-08-26',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'news-02',
    titleEn: 'Launch of Online Circuit Bungalow Reservation Portal & Digital Payment Gateway',
    titleSi: 'ඔන්ලයින් මණ්ඩල බංගලා වෙන්කිරීමේ ද්වාරය සහ ඩිජිටල් ගෙවීම් පද්ධතිය එළිදැක්වීම',
    titleTa: 'ஆன்லைன் சுற்றுப் பங்களா முன்பதிவு தளம் மற்றும் டிஜிட்டல் கட்டண முறை அறிமுகம்',
    summaryEn: 'SFCL introduces direct online room-level booking and real-time bank payment gateways for Circuit Bungalows in Polonnaruwa and Nuwara Eliya.',
    summarySi: 'පොළොන්නරුව සහ නුවරඑළිය මණ්ඩල බංගලා සඳහා ඔන්ලයින් කාමර වෙන්කිරීම් සහ රියල් ටයිම් බැංකු ගෙවීම් පද්ධති රාජ්‍ය පොහොර සමාගම මගින් හඳුන්වා දෙයි.',
    summaryTa: 'பொலன்னறுவை மற்றும் நுவரெலியா பங்களாக்களுக்கான ஆன்லைன் முன்பதிவு வசதி தொடங்கப்பட்டுள்ளது.',
    contentEn: 'As part of the digital transformation initiative, public and internal officers can now check live room availability and make online reservations via BOC and People\'s Bank payment gateways.',
    contentSi: 'ඩිජිටල් පරිවර්තන මුලපිරීමේ පියවරක් ලෙස, මහජනතාවට සහ අභ්‍යන්තර නිලධාරීන්ට දැන් සජීවී කාමර ලබා ගැනීමේ හැකියාව පරීක්ෂා කර ඔන්ලයින් වෙන් කිරීම් කළ හැක.',
    contentTa: 'டிஜிட்டல் மாற்றத்தின் ஒரு பகுதியாக, பொதுமக்கள் மற்றும் அதிகாரிகள் இப்போது நேரடியாக ஆன்லைனில் முன்பதிவு செய்யலாம்.',
    category: 'Corporate',
    publishedDate: '2026-08-20',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  }
];

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    questionEn: 'How can smallholder farmers purchase fertilizer online?',
    questionSi: 'සුළු පරිමාණ ගොවීන්ට ඔන්ලයින් මගින් පොහොර මිලදී ගන්නේ කෙසේද?',
    questionTa: 'சிறுகுறு விவசாயிகள் ஆன்லைனில் உரங்களை எவ்வாறு வாங்கலாம்?',
    answerEn: 'Farmers can select their required fertilizer product from our Online Products Catalogue, enter the required bags (from 1 bag up to bulk tons), complete checkout via credit card or BOC/People\'s Bank online banking, and collect or request regional delivery.',
    answerSi: 'ගොවීන්ට අපගේ ඔන්ලයින් නිෂ්පාදන නාමාවලියෙන් අවශ්‍ය පොහොර නිෂ්පාදනය තෝරාගෙන, බැංකු ගෙවීම් මගින් මිලදී ගත හැක.',
    answerTa: 'விவசாயிகள் நமது ஆன்லைன் தயாரிப்பு பட்டியலில் இருந்து உரங்களைத் தேர்ந்தெடுத்து கட்டணம் செலுத்திப் பெறலாம்.',
    category: 'Products & Sales'
  },
  {
    id: 'faq-02',
    questionEn: 'What is the procedure for purchasing paid tender documents?',
    questionSi: 'ගෙවුම් ටෙන්ඩර් ලේඛන මිලදී ගැනීමේ පටිපාටිය කුමක්ද?',
    questionTa: 'கட்டண டெண்டர் ஆவணங்களை வாங்குவதற்கான நடைமுறை என்ன?',
    answerEn: 'Navigate to Procurement, select an open tender with a paid document, click "Pay & Download", complete the online payment via IPG, and upon verification the official PDF document will be instantly unlocked for downloading.',
    answerSi: 'ප්‍රසම්පාදන අංශයට ගොස්, ටෙන්ඩරය තෝරා ඔන්ලයින් ගෙවීම් කර ලේඛනය බාගත කරන්න.',
    answerTa: 'டெண்டர் பகுதிக்குச் சென்று ஆன்லைனில் கட்டணம் செலுத்தி ஆவணத்தைப் பதிவிறக்கம் செய்யலாம்.',
    category: 'Procurement'
  }
];

// Persistent LocalStorage helper
class DatabaseService {
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(`sfcl_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`sfcl_${key}`, JSON.stringify(value));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }
  }

  // Users
  getUsers(): User[] {
    return this.getItem('users', INITIAL_USERS);
  }

  // Products
  getProducts(): Product[] {
    return this.getItem('products', INITIAL_PRODUCTS);
  }

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) products[index] = product;
    else products.push(product);
    this.setItem('products', products);
  }

  // Orders
  getOrders(): Order[] {
    return this.getItem('orders', INITIAL_ORDERS);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'erpSyncStatus'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `SFCL-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      erpSyncStatus: 'Pending'
    };
    orders.unshift(newOrder);
    this.setItem('orders', orders);

    // Create payment transaction record
    if (newOrder.paymentStatus === 'Successful') {
      this.addPaymentTransaction({
        transactionId: newOrder.transactionId || `TXN-MOCK-${Date.now()}`,
        orderOrBookingRef: newOrder.orderNumber,
        module: 'Product Sale',
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        amount: newOrder.totalAmount,
        gateway: newOrder.paymentMethod,
        status: 'SUCCESS',
        timestamp: newOrder.createdAt
      });

      // Log ERP Sync Queue
      this.addERPSyncLog({
        id: `erp-${Date.now()}`,
        orderId: newOrder.id,
        orderNumber: newOrder.orderNumber,
        amount: newOrder.totalAmount,
        status: 'Pending',
        syncedAt: new Date().toISOString(),
        retryCount: 0
      });
    }

    this.addAuditLog('Public Customer', 'Customer/Public User', 'Place Order', 'E-Commerce', `Placed order ${newOrder.orderNumber} for LKR ${newOrder.totalAmount}`);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      this.setItem('orders', orders);
      this.addAuditLog('Admin User', 'Order Officer', 'Update Order Status', 'Orders', `Updated order ${order.orderNumber} to ${status}`);
    }
  }

  // Bungalows & Bookings
  getBungalows(): Bungalow[] {
    return this.getItem('bungalows', INITIAL_BUNGALOWS);
  }

  saveBungalow(bungalow: Bungalow): void {
    const bungalows = this.getBungalows();
    const index = bungalows.findIndex(item => item.id === bungalow.id);
    if (index >= 0) bungalows[index] = bungalow;
    else bungalows.push(bungalow);
    this.setItem('bungalows', bungalows);
  }

  getBookings(): BungalowBooking[] {
    return this.getItem('bookings', INITIAL_BOOKINGS);
  }

  createBooking(bookingData: Omit<BungalowBooking, 'id' | 'bookingRef' | 'createdAt'>): BungalowBooking {
    const bookings = this.getBookings();
    const newBooking: BungalowBooking = {
      ...bookingData,
      id: `bok-${Date.now()}`,
      bookingRef: `SFCL-BOK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };
    bookings.unshift(newBooking);
    this.setItem('bookings', bookings);

    if (newBooking.status === 'Payment Successful' || newBooking.status === 'Approved') {
      this.addPaymentTransaction({
        transactionId: newBooking.paymentTransactionId || `TXN-MOCK-${Date.now()}`,
        orderOrBookingRef: newBooking.bookingRef,
        module: 'Circuit Bungalow',
        customerName: newBooking.guestName,
        customerEmail: newBooking.guestEmail,
        amount: newBooking.totalFee,
        gateway: 'BOC IPG',
        status: 'SUCCESS',
        timestamp: newBooking.createdAt
      });
    }

    this.addAuditLog(
      newBooking.guestName,
      newBooking.isInternal ? 'Internal User' : 'Public User',
      'Create Bungalow Booking',
      'Circuit Bungalow',
      `Booked ${newBooking.roomName} at ${newBooking.bungalowName} (${newBooking.checkInDate} to ${newBooking.checkOutDate})`
    );

    return newBooking;
  }

  updateBookingStatus(bookingId: string, status: BungalowBooking['status'], reason?: string): void {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      if (reason) booking.rejectionReason = reason;
      this.setItem('bookings', bookings);
      this.addAuditLog('Admin Officer', 'Booking Officer', 'Update Booking Status', 'Circuit Bungalow', `Updated booking ${booking.bookingRef} to ${status}`);
    }
  }

  processRefund(bookingId: string, refundAmount: number): void {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'Refunded';
      booking.refundStatus = 'Processed';
      booking.refundAmount = refundAmount;
      this.setItem('bookings', bookings);
      
      this.addPaymentTransaction({
        transactionId: `REF-${Date.now()}`,
        orderOrBookingRef: booking.bookingRef,
        module: 'Circuit Bungalow',
        customerName: booking.guestName,
        customerEmail: booking.guestEmail,
        amount: refundAmount,
        gateway: 'BOC IPG',
        status: 'REFUNDED',
        timestamp: new Date().toLocaleString()
      });

      this.addAuditLog('Finance Officer', 'Finance Officer', 'Process Refund', 'Payments', `Approved and processed refund of LKR ${refundAmount} for ${booking.bookingRef}`);
    }
  }

  // Tenders & Document Payments
  getTenders(): Tender[] {
    return this.getItem('tenders', INITIAL_TENDERS);
  }

  getPurchasedTenders(): TenderPurchaseRecord[] {
    return this.getItem('purchased_tenders', []);
  }

  recordTenderPurchase(purchase: Omit<TenderPurchaseRecord, 'id' | 'purchasedAt' | 'downloadCount'>): TenderPurchaseRecord {
    const purchases = this.getPurchasedTenders();
    const newRecord: TenderPurchaseRecord = {
      ...purchase,
      id: `pur-${Date.now()}`,
      purchasedAt: new Date().toLocaleString(),
      downloadCount: 1
    };
    purchases.unshift(newRecord);
    this.setItem('purchased_tenders', purchases);

    this.addPaymentTransaction({
      transactionId: purchase.transactionId,
      orderOrBookingRef: purchase.tenderRef,
      module: 'Tender Document',
      customerName: purchase.buyerName,
      customerEmail: purchase.buyerEmail,
      amount: purchase.amount,
      gateway: 'People\'s Bank IPG',
      status: 'SUCCESS',
      timestamp: newRecord.purchasedAt
    });

    this.addAuditLog(purchase.buyerName, 'Vendor / Public', 'Purchase Tender Document', 'Procurement', `Purchased tender doc for ${purchase.tenderRef} (LKR ${purchase.amount})`);
    return newRecord;
  }

  // Inquiries
  getInquiries(): Inquiry[] {
    return this.getItem('inquiries', INITIAL_INQUIRIES);
  }

  createInquiry(inquiryData: Omit<Inquiry, 'id' | 'referenceNo' | 'status' | 'submittedAt'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      referenceNo: `SFCL-INQ-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'New',
      submittedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };
    inquiries.unshift(newInquiry);
    this.setItem('inquiries', inquiries);
    this.addAuditLog(newInquiry.name, 'Public User', 'Submit Inquiry', 'Inquiries', `Submitted inquiry ${newInquiry.referenceNo}`);
    return newInquiry;
  }

  updateInquiry(id: string, updates: Partial<Inquiry>): void {
    const inquiries = this.getInquiries();
    const inq = inquiries.find(i => i.id === id);
    if (inq) {
      Object.assign(inq, updates);
      this.setItem('inquiries', inquiries);
      this.addAuditLog('Admin Officer', 'Inquiry Officer', 'Update Inquiry', 'Inquiries', `Updated inquiry ${inq.referenceNo}`);
    }
  }

  // News & Content
  getNews(): NewsItem[] {
    return this.getItem('news', INITIAL_NEWS);
  }

  getFAQs(): FAQItem[] {
    return this.getItem('faqs', INITIAL_FAQS);
  }

  // Payment Transactions Log
  getPaymentTransactions(): PaymentTransaction[] {
    return this.getItem('payment_txns', []);
  }

  addPaymentTransaction(txn: Omit<PaymentTransaction, 'id'> & { id?: string }): void {
    const txns = this.getPaymentTransactions();
    const fullTxn: PaymentTransaction = {
      ...txn,
      id: txn.id || `txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    txns.unshift(fullTxn);
    this.setItem('payment_txns', txns);
  }

  // ERP Sync Logs
  getERPSyncLogs(): ERPSyncLog[] {
    return this.getItem('erp_logs', []);
  }

  addERPSyncLog(log: ERPSyncLog): void {
    const logs = this.getERPSyncLogs();
    logs.unshift(log);
    this.setItem('erp_logs', logs);
  }

  syncERPNow(logId?: string): { successCount: number; syncedLogs: ERPSyncLog[] } {
    const logs = this.getERPSyncLogs();
    const orders = this.getOrders();
    let count = 0;

    logs.forEach(l => {
      if (!logId || l.id === logId) {
        l.status = 'Synced';
        l.erpReference = `ERP-REF-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        l.syncedAt = new Date().toLocaleString();
        count++;

        const ord = orders.find(o => o.id === l.orderId);
        if (ord) {
          ord.erpSyncStatus = 'Synced';
          ord.erpReference = l.erpReference;
        }
      }
    });

    this.setItem('erp_logs', logs);
    this.setItem('orders', orders);
    this.addAuditLog('ERP Integration Engine', 'System', 'ERP Synchronization', 'Integrations', `Manually triggered ERP synchronization for ${count} transactions.`);
    return { successCount: count, syncedLogs: logs };
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.getItem('audit_logs', []);
  }

  addAuditLog(user: string, role: string, action: string, module: string, details: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      user,
      role,
      action,
      module,
      details,
      timestamp: new Date().toLocaleString(),
      ipAddress: '192.168.10.45 (SFCL Intranet)'
    };
    logs.unshift(newLog);
    this.setItem('audit_logs', logs.slice(0, 100)); // keep last 100
  }
}

export const db = new DatabaseService();
