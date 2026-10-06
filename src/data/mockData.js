// Comprehensive Mock Data for 360 Realtors / True Realty Venture

export const CITIES = [
  {
    _id: 'city-1',
    name: 'Gurgaon',
    slug: 'gurgaon',
    state: 'Haryana',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 14500,
    description: 'The Millennium City, India’s leading corporate and luxury residential hub featuring Cyber Hub, Golf Course Road, and rapid commercial expansion.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+12.4% YoY', medianPrice: '₹ 1.85 Cr' },
    faqs: [
      { question: 'Why invest in Gurgaon real estate?', answer: 'Gurgaon offers exceptional appreciation and high rental yields driven by Fortune 500 headquarters, Cyber Hub, and Dwarka Expressway.' },
      { question: 'What is the average price per sq.ft in Gurgaon?', answer: 'The current median rate is approx. ₹ 14,500/sq.ft, with prime Golf Course Road reaching ₹ 35,000+/sq.ft.' }
    ]
  },
  {
    _id: 'city-2',
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi NCR',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 18500,
    description: 'The historic capital of India boasting prime luxury builder floors, diplomatic enclaves in Chanakyapuri, and elite South Delhi addresses.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+7.8% YoY', medianPrice: '₹ 3.20 Cr' },
    faqs: [
      { question: 'Which are the most sought-after areas in South Delhi?', answer: 'Greater Kailash, Vasant Vihar, Defence Colony, Hauz Khas, and Panchsheel Park.' }
    ]
  },
  {
    _id: 'city-3',
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 8200,
    description: 'Rapidly transforming smart city with world-class expressways, metro connectivity, and upcoming Jewar International Airport corridor.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+14.2% YoY', medianPrice: '₹ 95 Lakhs' },
    faqs: [
      { question: 'Is Noida a good long-term real estate investment?', answer: 'Yes, especially along Noida Expressway and Sector 150 due to major corporate IT parks and Jewar Airport.' }
    ]
  },
  {
    _id: 'city-4',
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 26500,
    description: 'The financial capital of India offering sea-facing penthouses, iconic high-rises, and luxury lifestyle along Bandra, Worli, and Juhu.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+9.1% YoY', medianPrice: '₹ 4.10 Cr' },
    faqs: [
      { question: 'What makes Mumbai residential market unique?', answer: 'High capital preservation, ocean views, and prime financial hubs like BKC.' }
    ]
  },
  {
    _id: 'city-5',
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 10200,
    description: 'The Silicon Valley of India with premier tech corridors along Whitefield, Sarjapur, and Outer Ring Road offering gated villa communities.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+11.5% YoY', medianPrice: '₹ 1.45 Cr' },
    faqs: [
      { question: 'Where are IT professionals investing in Bangalore?', answer: 'Whitefield, Sarjapur Road, HSR Layout, and Hebbal near Kempegowda Airport.' }
    ]
  },
  {
    _id: 'city-6',
    name: 'Goa',
    slug: 'goa',
    state: 'Goa',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 15500,
    description: 'India’s favorite coastal destination for holiday villas, luxury estates, and high-yield short-term rental vacation homes.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+15.8% YoY', medianPrice: '₹ 2.50 Cr' },
    faqs: [
      { question: 'What are typical holiday rental yields in Goa?', answer: 'Luxury villas in Assagao and Candolim consistently yield 10-14% gross rental income.' }
    ]
  },
  {
    _id: 'city-7',
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 8600,
    description: 'Dynamic economic hub with HITEC City, Financial District, and premier gated communities in Kokapet and Gachibowli.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+13.5% YoY', medianPrice: '₹ 1.35 Cr' },
    faqs: [
      { question: 'Why invest in Hyderabad real estate?', answer: 'High IT employment growth, world-class Outer Ring Road, and affordable luxury rates.' }
    ]
  },
  {
    _id: 'city-8',
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    country: 'India',
    popular: true,
    averagePricePerSqFt: 8200,
    description: 'Oxford of the East with sprawling IT corridors in Hinjewadi and Kharadi, offering premium lifestyle developments.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    priceTrends: { growthRate: '+10.2% YoY', medianPrice: '₹ 98 Lakhs' },
    faqs: [
      { question: 'What are the top investment corridors in Pune?', answer: 'Baner, Balewadi, Hinjewadi Phase 1-3, and Kharadi IT SEZ.' }
    ]
  }
];

export const LOCALITIES = [
  {
    _id: 'loc-1',
    name: 'Sector 65',
    slug: 'sector-65',
    city: 'city-1',
    description: 'Golf Course Extension Road prime high-street commercial and luxury residential corridor.',
    latitude: 28.4068,
    longitude: 77.0652
  },
  {
    _id: 'loc-2',
    name: 'Sector 92',
    slug: 'sector-92',
    city: 'city-1',
    description: 'Fast-developing green residential hub with master plan sector roads near Pataudi and DLF.',
    latitude: 28.4012,
    longitude: 76.9248
  },
  {
    _id: 'loc-3',
    name: 'Sector 25 MG Road',
    slug: 'sector-25-mg-road',
    city: 'city-1',
    description: 'Gurugram most coveted retail and commercial address directly connected to Delhi and Cyber City.',
    latitude: 28.4815,
    longitude: 77.0872
  },
  {
    _id: 'loc-4',
    name: 'Golf Course Road',
    slug: 'golf-course-road',
    city: 'city-1',
    description: 'Ultra-luxury residential and commercial corridor of DLF Phase 5 and Horizon Center.',
    latitude: 28.4595,
    longitude: 77.0266
  },
  {
    _id: 'loc-14',
    name: 'Sector 14',
    slug: 'sector-14',
    city: 'city-1',
    description: 'Heart of Old & Central Gurugram, high footfall commercial & retail destination with established social infrastructure.',
    latitude: 28.4732,
    longitude: 77.0423
  },
  {
    _id: 'loc-5',
    name: 'Greater Kailash',
    slug: 'greater-kailash',
    city: 'city-2',
    description: 'Elite South Delhi neighborhood known for luxury builder floors and high-end markets.',
    latitude: 28.5355,
    longitude: 77.2410
  },
  {
    _id: 'loc-6',
    name: 'Sector 150',
    slug: 'sector-150',
    city: 'city-3',
    description: 'Green sports city along Noida-Greater Noida Expressway.',
    latitude: 28.4412,
    longitude: 77.4988
  },
  {
    _id: 'loc-7',
    name: 'Bandra West',
    slug: 'bandra-west',
    city: 'city-4',
    description: 'Queen of the suburbs with luxury sea-facing high-rises and celebrity homes.',
    latitude: 19.0596,
    longitude: 72.8295
  },
  {
    _id: 'loc-8',
    name: 'Whitefield',
    slug: 'whitefield',
    city: 'city-5',
    description: 'Major IT corridor with premier international schools and luxury gated townships.',
    latitude: 12.9698,
    longitude: 77.7499
  },
  {
    _id: 'loc-9',
    name: 'Assagao',
    slug: 'assagao',
    city: 'city-6',
    description: 'Goa’s Beverly Hills, renowned for Portuguese heritage villas and boutique cafes.',
    latitude: 15.5908,
    longitude: 73.7712
  }
];

export const DEVELOPERS = [
  {
    _id: 'dev-1',
    name: 'M3M India',
    slug: 'm3m-india',
    description: 'M3M India is synonymous with luxury, speed, and class. Renowned for creating landmark commercial and ultra-luxury residential projects in Gurugram.',
    establishedYear: 2010,
    locations: ['Gurgaon', 'Delhi NCR', 'Noida'],
    rating: 4.9,
    totalDeliveredSqFt: '30M+ Sq.Ft.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    featured: true
  },
  {
    _id: 'dev-2',
    name: 'WAL Group',
    slug: 'wal-group',
    description: 'WAL Group specializes in IGBC certified wellness residences, sustainable master planning, and modern lifestyle communities.',
    establishedYear: 2012,
    locations: ['Gurgaon', 'Haryana'],
    rating: 4.8,
    totalDeliveredSqFt: '12M+ Sq.Ft.',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80',
    featured: true
  },
  {
    _id: 'dev-3',
    name: 'Apex Horizon Estates',
    slug: 'apex-horizon-estates',
    description: 'Pioneers in high-rise architectural marvels and luxury gated master plans across North India.',
    establishedYear: 1996,
    locations: ['Gurgaon', 'Delhi', 'Noida'],
    rating: 4.9,
    totalDeliveredSqFt: '28M Sq.Ft.',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    featured: true
  },
  {
    _id: 'dev-4',
    name: 'Sovereign Realty Group',
    slug: 'sovereign-realty-group',
    description: 'Ultra-luxury sea-facing developments and boutique architectural residences in Mumbai and Goa.',
    establishedYear: 2002,
    locations: ['Mumbai', 'Pune', 'Goa'],
    rating: 4.8,
    totalDeliveredSqFt: '22M Sq.Ft.',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    featured: true
  },
  {
    _id: 'dev-5',
    name: 'Prestige Paramount Infra',
    slug: 'prestige-paramount-infra',
    description: 'Iconic tech park towers and premium integrated townships throughout South India.',
    establishedYear: 1994,
    locations: ['Bangalore', 'Chennai', 'Hyderabad'],
    rating: 4.9,
    totalDeliveredSqFt: '42M Sq.Ft.',
    logo: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=400&q=80',
    featured: false
  },
  {
    _id: 'dev-spj',
    name: 'SPJ Group',
    slug: 'spj-group',
    description: 'SPJ Group is a diversified legacy conglomerate with over 30+ years of operational excellence across trading, hospitality, and landmark real estate developments in North India. Committed to architectural brilliance with partner ACPL Architects.',
    establishedYear: 1993,
    locations: ['Gurgaon', 'Delhi NCR', 'Panipat'],
    rating: 4.9,
    totalDeliveredSqFt: '10M+ Sq.Ft.',
    logo: '/listings/spj-vedatam/image_4.jpg',
    featured: true
  }
];

export const PROJECTS = [
  {
    _id: 'proj-1',
    name: 'M3M Route 65',
    slug: 'm3m-route-65',
    tagline: 'The New Fashion & Dining Address of Gurugram',
    description: 'M3M Route 65 is spread across 4 prime acres in Sector 65, Golf Course Extension Road. Features 3-level high-street retail, anchor stores at every level, dedicated F&B & food court, hypermarket on lower ground floor, and double-height showrooms.',
    projectType: 'Commercial',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-1',
    address: 'Sector 65, Golf Course Extension Road, Gurugram, Haryana 122102',
    reraNumber: 'RC/REP/HARERA/GGM/605/337/2022/80',
    possession: 'In 2026+',
    possessionDate: '2026-12-31',
    status: 'UNDER_CONSTRUCTION',
    priceMin: 12500000,
    priceMax: 45000000,
    configurations: ['Retail Shops', 'Showrooms', 'Food Court Units'],
    totalAreaAcres: 4.0,
    featured: true,
    images: [
      '/listings/m3m-route65/image_1.jpg',
      '/listings/m3m-route65/image_4.jpg',
      '/listings/m3m-route65/image_7.jpg',
      '/listings/m3m-route65/image_8.jpg',
      '/listings/m3m-route65/image_6.jpg',
      '/listings/m3m-route65/image_9.jpg',
      '/listings/m3m-route65/image_3.jpg',
    ],
    amenities: [
      '3-Level Luxury Retail',
      'Anchor at Every Level',
      'Dedicated F&B & Food Court',
      'Double-Height Showrooms',
      'Huge Central Atrium',
      'Glass Frontage for High Visibility',
      'Wide Boulevards',
      'Landscaped Plaza',
      'Hypermarket on Lower Ground',
      '2-Level Basement Parking',
      '100% Power Backup',
      '24x7 Security Surveillance',
    ]
  },
  {
    _id: 'proj-2',
    name: 'WAL Serenia 92',
    slug: 'wal-serenia-92',
    tagline: 'IGBC Certified Luxury Wellness Residences',
    description: 'WAL Serenia 92 is an IGBC certified green residential development situated in Sector 92, Gurugram. Offering master-planned wellness homes with 34 lifestyle amenities, expansive running balconies, anti-skid vitrified flooring, and modular kitchens.',
    projectType: 'Residential',
    developer: 'dev-2',
    city: 'city-1',
    locality: 'loc-2',
    address: 'Sector 92, Master Plan Road, Gurugram, Haryana',
    reraNumber: 'HRERA/GGM/2024/WAL92',
    possession: 'Ready to Move',
    possessionDate: '2025-10-31',
    status: 'UNDER_CONSTRUCTION',
    priceMin: 11500000,
    priceMax: 17500000,
    configurations: ['2 BHK', '3 BHK'],
    totalAreaAcres: 5.5,
    featured: true,
    images: [
      '/listings/wal-serenia92/image_1.jpg',
      '/listings/wal-serenia92/image_2.jpg',
      '/listings/wal-serenia92/image_3.jpg',
      '/listings/wal-serenia92/image_4.jpg',
      '/listings/wal-serenia92/image_5.jpg',
      '/listings/wal-serenia92/image_6.jpg',
      '/listings/wal-serenia92/image_7.jpg',
      '/listings/wal-serenia92/image_8.jpg',
    ],
    amenities: [
      'Swimming Pool',
      'Badminton Court',
      'Pickleball Court',
      'Outdoor Gym',
      'Indoor Yoga Studio',
      'Oxygen Park',
      'Ayurveda Garden',
      'Miyawaki Forest',
      'Open Air Theatre',
      'Party Lawn',
      'Fire Pit',
      'Temple',
      'Shopping Arcade',
      'Medical Room & OPD',
      'Community Kitchen',
      'Basement & Surface Car Parking',
    ]
  },
  {
    _id: 'proj-3',
    name: 'M3M Jewel',
    slug: 'm3m-jewel',
    tagline: 'The Most Luxurious Retail Address of Gurugram',
    description: 'M3M Jewel is Gurugram first hybrid luxury retail destination on MG Road, Sector 25. Positioned 2 minutes from Cyber City and 5 minutes from Golf Course Road. Features 3 levels of luxury retail, double-height showrooms, expansive glass frontage, 5-screen multiplex, and grade-A corporate offices.',
    projectType: 'Commercial',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-3',
    address: 'Sector 25, MG Road, Gurugram, Haryana 122008',
    reraNumber: 'RC/REP/HARERA/GGM/635/367/2022/110',
    possession: 'In 2026+',
    possessionDate: '2026-06-30',
    status: 'UNDER_CONSTRUCTION',
    priceMin: 21000000,
    priceMax: 65000000,
    configurations: ['Luxury Retail Showrooms', 'Anchor Stores', 'Corporate Offices'],
    totalAreaAcres: 3.5,
    featured: true,
    images: [
      '/listings/m3m-jewel/image_1.jpg',
      '/listings/m3m-jewel/image_2.jpg',
      '/listings/m3m-jewel/image_3.jpg',
      '/listings/m3m-jewel/image_4.jpg',
      '/listings/m3m-jewel/image_5.jpg',
      '/listings/m3m-jewel/image_6.jpg',
      '/listings/m3m-jewel/image_7.jpg',
      '/listings/m3m-jewel/image_8.jpg',
    ],
    amenities: [
      '3-Levels of Luxury Retail',
      '2-Level F&B and Open Terrace Cafes',
      '5-Screen Multiplex',
      'Double-Height Flagship Showrooms',
      'Expansive Glass Frontage',
      'Exquisitely Designed Atrium',
      'Grade-A Corporate Office Floors',
      '2 Mins to Cyber City',
      '100+ Top Brand EOIs',
      'Multi-Level Parking',
    ]
  },
  {
    _id: 'proj-4',
    name: 'SPJ Vedatam',
    slug: 'spj-vedatam',
    tagline: 'Values Inbuilt - Sector 14, Gurugram',
    description: 'SPJ Vedatam is a premier mixed-use commercial and lifestyle landmark strategically located in Sector 14, Gurugram. Designed by internationally acclaimed ACPL Architects, Vedatam offers high-street retail, double-height flagship stores, premium commercial suites, and a vibrant dining plaza in the buzzing heart of Gurugram.',
    projectType: 'Commercial',
    developer: 'dev-spj',
    city: 'city-1',
    locality: 'loc-14',
    address: 'Site Office: Vedatam, Sector 14, Gurugram, Haryana - 122001',
    reraNumber: 'RC/REP/HARERA/GGM/897/629/2025/110',
    possession: 'In 2027+',
    possessionDate: '2027-12-31',
    status: 'NEW_LAUNCH',
    priceMin: 9500000,
    priceMax: 38000000,
    configurations: ['High-Street Retail Shops', 'Flagship Showrooms', 'Commercial Suites', 'F&B Food Court'],
    totalAreaAcres: 2.5,
    featured: true,
    images: [
      '/listings/spj-vedatam/image_1.jpg',
      '/listings/spj-vedatam/image_2.jpg',
      '/listings/spj-vedatam/image_3.jpg',
      '/listings/spj-vedatam/image_4.jpg',
      '/listings/spj-vedatam/image_5.jpg',
    ],
    amenities: [
      'High-Street Retail Promenade',
      'Designed by ACPL Architects',
      'Double-Height Glass Frontages',
      'Prime Sector 14 Main Road Access',
      'Open-Air Central Plaza',
      'Dedicated F&B & Terrace Dining',
      'Multi-Tier Basement Parking',
      '100% Power Backup & High-Speed Elevators',
      '24x7 Multi-Tier CCTV Security',
      'Dense Residential Footfall Catchment',
    ]
  },
  {
    _id: 'proj-5',
    name: 'M3M Capital Walk',
    slug: 'm3m-capital-walk',
    tagline: 'Flagship Luxury High-Street & Global Brands Boulevard',
    description: 'M3M Capital Walk is an ultra-luxurious, grand commercial boulevard featuring world-class architecture, expansive double-height retail frontages, global brand flagships (Louis Vuitton, Bulgari, Tommy Hilfiger, Mango, Boss), and vibrant open-air landscaped terrace dining spaces in Gurugram.',
    projectType: 'Commercial',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-1',
    address: 'Sector 113, Dwarka Expressway / Sector 65 Corridor, Gurugram, Haryana',
    reraNumber: 'RC/REP/HARERA/GGM/740/472/2023/84',
    possession: 'In 2026+',
    possessionDate: '2026-12-31',
    status: 'UNDER_CONSTRUCTION',
    priceMin: 18500000,
    priceMax: 65000000,
    configurations: ['High-Street Retail', 'Flagship Anchor Stores', 'Gourmet Dining Terrace', 'Boutique Suites'],
    totalAreaAcres: 5.2,
    featured: true,
    images: [
      '/listings/m3m-commercial/image_1.jpg'
    ],
    amenities: [
      'Double-Height Glass Façade',
      'Global Flagship Retail Brands',
      'Grand Illuminated Fountain Plaza',
      'Open-Air Rooftop & Sky Dining',
      'Multi-Level Basement Parking',
      'Central Skylight Architectural Canopy',
      '100% Power Backup',
      'High-Speed Elevators & Escalators',
      '24x7 Multi-Tier Surveillance',
    ]
  },
  {
    _id: 'proj-6',
    name: 'M3M Broadway',
    slug: 'm3m-broadway',
    tagline: 'Futuristic Architectural High-Street & Open Terraces Boulevard',
    description: 'M3M Broadway is an architectural triumph with curvilinear cantilevered terraces, illuminated crown lighting, boutique fashion retail stores, luxury jewelers (Cartier, Louis Vuitton), and rooftop alfresco cafes in Sector 71, Gurugram. Designed for maximum footfalls and exceptional street visibility.',
    projectType: 'Commercial',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-1',
    address: 'Sector 71, Golf Course Extension Road / SPR, Gurugram, Haryana',
    reraNumber: 'RC/REP/HARERA/GGM/322/2019/16',
    possession: 'Ready to Move / Delivered',
    possessionDate: '2025-06-30',
    status: 'READY_TO_MOVE',
    priceMin: 14500000,
    priceMax: 55000000,
    configurations: ['High-Street Retail Shops', 'Terrace Restaurants & Cafes', 'Boutique Showrooms', 'Studio Suites'],
    totalAreaAcres: 7.8,
    featured: true,
    images: [
      '/listings/m3m-broadway/image_1.jpg'
    ],
    amenities: [
      'Iconic Curvilinear Architectural Facade',
      'Cantilevered Open-Air Terrace Seating',
      'Double-Height Luxury Brand Stores',
      'High-Speed Escalators & Panoramic Lifts',
      'Dedicated Food Boulevard & Fine Dining',
      '10-Screen Multiplex & Entertainment Zone',
      'Triple-Basement Ample Car Parking',
      '100% Power Backup & 24x7 Security',
    ]
  },
  {
    _id: 'proj-7',
    name: 'M3M Golfestate',
    slug: 'm3m-golfestate',
    tagline: 'Experience Golf Style Living at a Coveted Location',
    description: 'M3M Golfestate is an ultra-luxury golf-themed residential landmark on Golf Course Extension Road, Sector 65, Gurugram. Designed around an exquisite 9-hole executive golf course with sprawling lakes, iconic 40-storey towers, resort-style clubhouses, and panoramic green fairway views.',
    projectType: 'Residential',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-1',
    address: 'Sector 65, Golf Course Extension Road, Gurugram, Haryana 122102',
    reraNumber: 'RC/REP/HARERA/GGM/2018/14',
    possession: 'Ready to Move',
    possessionDate: '2024-12-31',
    status: 'READY_TO_MOVE',
    priceMin: 45000000,
    priceMax: 125000000,
    configurations: ['3 BHK Luxury Suites', '4 BHK Golf Residences', '5 BHK Duplex Penthouses'],
    totalAreaAcres: 56.0,
    featured: true,
    images: [
      '/listings/m3m-golfestate/image_1.jpg'
    ],
    amenities: [
      '9-Hole Executive Golf Course',
      'Panoramic Fairway & Lake Views',
      'Resort-Style Luxury Clubhouse',
      'Temperature-Controlled All-Weather Pool',
      'Private Concierge & Valet Services',
      'Multi-Tier 7-Star Security Surveillance',
      'Lush Landscaped Zen & Fragrance Gardens',
      '100% Power Backup & High-Speed Private Elevators',
    ]
  },
  {
    _id: 'proj-8',
    name: 'M3M Crown',
    slug: 'm3m-crown',
    tagline: 'Regal Living Amidst 5.5 Acres of Lush Central Greens',
    description: 'M3M Crown is an ultra-luxury residential oasis situated in Sector 111, Dwarka Expressway, Gurugram. Featuring a majestic amphitheatre overlooking central lagoons, cascading water bodies, wooden footbridges, themed botanical gardens, and 75,000 sq.ft. of world-class club lifestyle.',
    projectType: 'Residential',
    developer: 'dev-1',
    city: 'city-1',
    locality: 'loc-1',
    address: 'Sector 111, Dwarka Expressway, Gurugram, Haryana 122017',
    reraNumber: 'RC/REP/HARERA/GGM/687/419/2023/31',
    possession: 'In 2027+',
    possessionDate: '2027-12-31',
    status: 'UNDER_CONSTRUCTION',
    priceMin: 28000000,
    priceMax: 65000000,
    configurations: ['3 BHK Luxury Residences', '4 BHK Grand Suites'],
    totalAreaAcres: 16.0,
    featured: true,
    images: [
      '/listings/m3m-crown/image_1.jpg'
    ],
    amenities: [
      '5.5 Acres of Lush Central Greens & Lagoons',
      'Open-Air Stone Amphitheatre',
      'Scenic Waterway Canal & Wooden Bridges',
      '75,000 Sq.Ft. Regal Clubhouse',
      'Olympic-Length Swimming Pool & Poolside Cabanas',
      'Shaded Pergolas & Picnic Lawns',
      'Double-Height Grand Drop-Off Porch',
      '100% Power Backup & Multi-Tier Surveillance',
    ]
  }
];

export const PROPERTIES = [
  // 1. PDF 1 Real Listing: M3M Route 65
  

  // 2. PDF 2 Real Listing: WAL Serenia 92
  {
    _id: 'prop-2',
    title: 'WAL Serenia 92 - 3 BHK Luxury Wellness Residences',
    slug: 'wal-serenia-92-3bhk-luxury-wellness-residence',
    description: 'WAL Serenia 92 is an IGBC Certified Wellness Residential development in Sector 92, Gurugram. Offering 3 BHK luxury residences with large running balconies, double charge anti-skid vitrified tiles, modular kitchen, and 34 lifestyle amenities including swimming pool, pickleball court, indoor yoga studio, reflexology deck, oxygen park, and miyawaki forest.',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: 14500000,
    pricePerSqFt: 7837,
    area: 1850,
    carpetArea: 1053,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    floor: 7,
    totalFloors: 19,
    furnishing: 'Semi-Furnished',
    facing: 'East',
    possession: 'Ready to Move',
    reraNumber: 'HRERA/GGM/2024/WAL92',
    city: 'city-1',
    locality: 'loc-2',
    developer: 'dev-2',
    project: 'proj-2',
    address: 'Sector 92, Near Pataudi & DLF Road, Gurugram, Haryana',
    latitude: 28.4012,
    longitude: 76.9248,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 2350,
    createdAt: '2026-09-18T10:00:00.000Z',
    images: [
      '/listings/wal-serenia92/image_1.png',
    ],
    amenities: [
      'Swimming Pool',
      'Badminton Court',
      'Pickleball Court',
      'Outdoor Gym',
      'Indoor Yoga Studio',
      'Oxygen Park',
      'Ayurveda Garden',
      'Miyawaki Forest',
      'Open Air Theatre',
      'Party Lawn',
      'Fire Pit',
      'Temple',
      'Shopping Arcade',
      'Medical Room & OPD',
      'Community Kitchen',
      'Basement & Surface Car Parking',
    ]
  },
  
  // 4. SPJ Vedatam - Sector 14, Gurugram
  {
    _id: 'prop-4',
    title: 'SPJ Vedatam - Luxury High-Street Retail & Commercial Suites',
    slug: 'spj-vedatam-sector-14-gurgaon',
    description: 'SPJ Vedatam by SPJ Group (SPJ Properties Pvt. Ltd.) is an iconic commercial and lifestyle destination in Sector 14, Gurugram. Designed by acclaimed ACPL Architects, Vedatam features modern double-height high-street retail shops, expansive display frontages, luxury commercial suites, vibrant open plazas, and dedicated F&B dining areas. Registered under HARERA: RC/REP/HARERA/GGM/897/629/2025/110 dated 25.03.2025.',
    propertyType: 'Retail Shop',
    transactionType: 'Buy',
    price: 13500000,
    pricePerSqFt: 18000,
    area: 750,
    carpetArea: 580,
    bedrooms: 0,
    bathrooms: 1,
    balconies: 0,
    floor: 1,
    totalFloors: 5,
    furnishing: 'Bare Shell',
    facing: 'North-East',
    possession: 'New Launch',
    reraNumber: 'RC/REP/HARERA/GGM/897/629/2025/110',
    city: 'city-1',
    locality: 'loc-14',
    developer: 'dev-spj',
    project: 'proj-4',
    address: 'Site Office: Vedatam, Sector 14, Gurugram, Haryana - 122001',
    latitude: 28.4732,
    longitude: 77.0423,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 1850,
    createdAt: '2026-10-06T10:00:00.000Z',
    images: [
      '/listings/spj-vedatam/image_1.jpg',
      '/listings/spj-vedatam/image_2.jpg',
      '/listings/spj-vedatam/image_3.jpg',
      '/listings/spj-vedatam/image_4.jpg',
      '/listings/spj-vedatam/image_5.jpg',
    ],
    amenities: [
      'High-Street Retail Promenade',
      'Double-Height Glass Frontage',
      'Designed by ACPL Architects',
      'Open-Air Central Plaza',
      'F&B Food Court & Fine Dining',
      'Dedicated Basement Car Parking',
      '100% Power Backup',
      'High-Speed Passenger & Service Elevators',
      '24x7 High-Definition CCTV Surveillance',
      'Dense Commercial & Residential Catchment',
      'HARERA Approved Project',
    ]
  },

  // 5. M3M Capital Walk - Flagship Luxury Retail Boulevard
  {
    _id: 'prop-5',
    title: 'M3M Capital Walk - Flagship Luxury High-Street Retail & Anchor Stores',
    slug: 'm3m-capital-walk-flagship-luxury-retail-gurgaon',
    description: 'M3M Capital Walk is a grand signature commercial boulevard by M3M India. Boasting contemporary glass-fronted architecture, double-height showroom corridors, international luxury anchors, lush terrace restaurants, and animated dancing fountain plazas. Located on a prime expressway arterial road in Gurugram with massive consumer catchment.',
    propertyType: 'Retail Shop',
    transactionType: 'Buy',
    price: 21500000,
    pricePerSqFt: 23888,
    area: 900,
    carpetArea: 720,
    bedrooms: 0,
    bathrooms: 1,
    balconies: 0,
    floor: 1,
    totalFloors: 4,
    furnishing: 'Bare Shell',
    facing: 'North',
    possession: 'Under Construction',
    reraNumber: 'RC/REP/HARERA/GGM/740/472/2023/84',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-5',
    address: 'Sector 113, Dwarka Expressway / Sector 65, Gurugram, Haryana',
    latitude: 28.5284,
    longitude: 77.0245,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 2190,
    createdAt: '2026-10-06T12:00:00.000Z',
    images: [
      '/listings/m3m-commercial/image_1.jpg'
    ],
    amenities: [
      'Double-Height Flagship Showroom Façade',
      'Grand Illuminated Fountain Plaza',
      'Open-Air Rooftop & Sky Dining',
      'High-Speed Elevators & Escalators',
      'Multi-Tier Basement Parking',
      'Central Skylight Canopy',
      '100% Power Backup',
      '24x7 Multi-Tier Surveillance',
      'High-Footfall Strategic Location',
    ]
  },

  // 6. M3M Broadway - Curvilinear Retail Boulevard & Open Terraces
  {
    _id: 'prop-6',
    title: 'M3M Broadway - High-Street Luxury Retail & Terrace Dining',
    slug: 'm3m-broadway-luxury-retail-sector-71-gurgaon',
    description: 'M3M Broadway Sector 71 Gurugram is a grand mixed-use lifestyle destination offering seamless two-sided frontage on a 150-meter-wide road. Designed by world-renowned architects, featuring flowing wrap-around balconies, double-height high-street retail showrooms, boutique fashion corridors (Cartier, Louis Vuitton, Mango), open rooftop alfresco restaurants, and 10-screen multiplex.',
    propertyType: 'Retail Shop',
    transactionType: 'Buy',
    price: 18500000,
    pricePerSqFt: 21764,
    area: 850,
    carpetArea: 680,
    bedrooms: 0,
    bathrooms: 1,
    balconies: 1,
    floor: 1,
    totalFloors: 5,
    furnishing: 'Bare Shell',
    facing: 'North-East',
    possession: 'Ready to Move',
    reraNumber: 'RC/REP/HARERA/GGM/322/2019/16',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-6',
    address: 'Sector 71, Golf Course Extension Road / SPR, Gurugram, Haryana',
    latitude: 28.4185,
    longitude: 77.0392,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 2680,
    createdAt: '2026-10-06T13:00:00.000Z',
    images: [
      '/listings/m3m-broadway/image_1.jpg'
    ],
    amenities: [
      'Iconic Curvilinear Architectural Facade',
      'Cantilevered Open-Air Terrace Seating',
      'Double-Height Glass Frontage Showrooms',
      'High-Speed Escalators & Panoramic Lifts',
      'Food Boulevard & Terrace Dining',
      'Triple-Basement Parking',
      '100% Power Backup',
      '24x7 High-Definition Surveillance',
    ]
  },

  // 7. M3M Golfestate - 4 BHK Ultra-Luxury Golf Residence
  {
    _id: 'prop-7',
    title: 'M3M Golfestate - 4 BHK Ultra-Luxury Golf-Facing Residence',
    slug: 'm3m-golfestate-4bhk-ultra-luxury-golf-facing-residence',
    description: 'Experience Golf Style Living at a Coveted Location. M3M Golfestate on Golf Course Extension Road, Sector 65 Gurugram, offers an exquisite 4 BHK luxury residence overlooking an executive 9-hole golf course and glistening water bodies. Features 10-ft floor-to-ceiling heights, wrap-around sunset view balconies, VRV air-conditioning, imported Italian marble flooring, and access to a 7-star resort clubhouse with temperature-controlled swimming pools.',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: 68500000,
    pricePerSqFt: 18026,
    area: 3800,
    carpetArea: 2950,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    floor: 22,
    totalFloors: 40,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    possession: 'Ready to Move',
    reraNumber: 'RC/REP/HARERA/GGM/2018/14',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-7',
    address: 'Sector 65, Golf Course Extension Road, Gurugram, Haryana 122102',
    latitude: 28.4068,
    longitude: 77.0652,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 3420,
    createdAt: '2026-10-06T13:10:00.000Z',
    images: [
      '/listings/m3m-golfestate/image_1.jpg'
    ],
    amenities: [
      '9-Hole Executive Golf Course Facing',
      'Wrap-Around Panoramic Balconies',
      'Imported Italian Marble & Hardwood Flooring',
      'Temperature-Controlled Pool & 7-Star Clubhouse',
      'Private Lift Lobby Access',
      'Multi-Tier 24x7 High-Tech Security',
      'Dedicated Reserved Covered Car Parking',
      '100% Power Backup',
    ]
  },

  // 8. M3M Golfestate Fairway West - Iconic Arch Signature Residences
  {
    _id: 'prop-8',
    title: 'M3M Golfestate Fairway West - Iconic Gateway Arch Residences',
    slug: 'm3m-golfestate-fairway-west-gateway-arch-residences',
    description: 'Experience Golf Style Living at a Coveted Location. M3M Golfestate Fairway West is a world-class architectural masterpiece featuring an imposing sky-bridge archway overlooking symmetrical landscaped formal gardens, water cascades, and an executive 9-hole golf course in Sector 65, Gurugram. Offering lavish 3 & 4 BHK residences with floor-to-ceiling glass fenestrations, double-height reception lobby, and concierge assistance.',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: 52000000,
    pricePerSqFt: 17333,
    area: 3000,
    carpetArea: 2350,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    floor: 12,
    totalFloors: 26,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    possession: 'Ready to Move',
    reraNumber: 'RC/REP/HARERA/GGM/2018/14',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-7',
    address: 'Fairway West, M3M Golfestate, Sector 65, Gurugram, Haryana 122102',
    latitude: 28.4075,
    longitude: 77.0665,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 2950,
    createdAt: '2026-10-06T13:25:00.000Z',
    images: [
      '/listings/m3m-golfestate-fairway/image_1.jpg'
    ],
    amenities: [
      'Iconic Gateway Arch Architectural Design',
      'Symmetrical Landscaped Gardens & Water Fountains',
      '9-Hole Executive Golf Course Access',
      'Grand Double-Height Entrance Lobby',
      'Olympic-Length Swimming Pool & Luxury Spa',
      'Private Concierge & Valet Desk',
      'Dedicated Reserved Covered Basement Parking',
      '100% Power Backup & 24x7 Multi-Tier Security',
    ]
  },

  // 9. M3M Crown - 3 BHK Luxury Lake & Garden Facing Residence
  {
    _id: 'prop-9',
    title: 'M3M Crown - 3 BHK Luxury Garden & Amphitheatre Facing Residence',
    slug: 'm3m-crown-3bhk-luxury-residence-dwarka-expressway',
    description: 'M3M Crown in Sector 111, Dwarka Expressway Gurugram, presents an ultra-luxury 3 BHK residence boasting direct views of 5.5 acres of continuous central greens, grand amphitheatre, tranquil waterways, and Japanese koi ponds. Designed with 3.2m clear ceiling heights, imported Italian marble, spacious sunset balconies, ultra-modern modular kitchen, and exclusive access to a 75,000 sq.ft. clubhouse.',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: 32500000,
    pricePerSqFt: 14772,
    area: 2200,
    carpetArea: 1650,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    floor: 16,
    totalFloors: 32,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    possession: 'Under Construction',
    reraNumber: 'RC/REP/HARERA/GGM/687/419/2023/31',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-8',
    address: 'Sector 111, Dwarka Expressway, Gurugram, Haryana 122017',
    latitude: 28.5284,
    longitude: 77.0315,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 2780,
    createdAt: '2026-10-06T13:30:00.000Z',
    images: [
      '/listings/m3m-crown/image_1.jpg'
    ],
    amenities: [
      'Amphitheatre & Central Greens View',
      'Scenic Waterway Canal & Wooden Bridge Promenade',
      '75,000 Sq.Ft. Luxury Clubhouse Access',
      'Imported Italian Marble & Double Glazed Windows',
      'Multi-Tier 24x7 High-Tech Surveillance',
      'Covered Basement Parking',
      '100% Power Backup',
    ]
  },

  // 10. M3M Crown Skywalk - 4 BHK Forest Canopy & Elevated Boardwalk Residence
  {
    _id: 'prop-10',
    title: 'M3M Crown - 4 BHK Elevated Skywalk & Central Lagoon Residence',
    slug: 'm3m-crown-4bhk-elevated-skywalk-residence-dwarka-expressway',
    description: 'Immerse yourself in elevated luxury at M3M Crown, Sector 111, Dwarka Expressway. This premier 4 BHK residence looks directly out onto the winding elevated wooden boardwalk canopy, illuminated tree-top skywalks, meandering swimming lagoons, and private gazebos nestled amidst 5.5 acres of curated woodland gardens. Complete with grand wrap-around sun decks, private elevator foyer, smart home automation, and 75,000 sq.ft. clubhouse privileges.',
    propertyType: 'Apartment',
    transactionType: 'Buy',
    price: 43500000,
    pricePerSqFt: 15818,
    area: 2750,
    carpetArea: 2150,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 4,
    floor: 20,
    totalFloors: 32,
    furnishing: 'Semi-Furnished',
    facing: 'North-East',
    possession: 'Under Construction',
    reraNumber: 'RC/REP/HARERA/GGM/687/419/2023/31',
    city: 'city-1',
    locality: 'loc-1',
    developer: 'dev-1',
    project: 'proj-8',
    address: 'Sector 111, Dwarka Expressway, Gurugram, Haryana 122017',
    latitude: 28.5284,
    longitude: 77.0315,
    featured: true,
    verified: true,
    status: 'PUBLISHED',
    viewsCount: 3120,
    createdAt: '2026-10-06T13:35:00.000Z',
    images: [
      '/listings/m3m-crown-skywalk/image_1.jpg'
    ],
    amenities: [
      'Panoramic Elevated Boardwalk & Forest Canopy View',
      'Lagoon Waterbodies & Private Garden Gazebos',
      '75,000 Sq.Ft. Luxury Resort Clubhouse Access',
      'Private High-Speed Elevator Lobby',
      'Full Home Automation & Double Glazed Windows',
      'Covered Multi-Level Basement Parking',
      '100% Power Backup & 24x7 Multi-Tier Security',
    ]
  }

];

export const BLOGS = [
  {
    _id: 'blog-1',
    title: 'Top Real Estate Micro-Markets to Invest in 2026: High Appreciation Corridors',
    slug: 'top-real-estate-micro-markets-to-invest-in-2026-high-appreciation-corridors',
    excerpt: 'An exhaustive analysis of India’s burgeoning infrastructure projects, metro corridors, and prime luxury real estate zones delivering superior returns.',
    content: `Real estate in India is witnessing an unprecedented paradigm shift driven by planned expressways, expansion of commercial SEZs, and global Capability Centers (GCCs) establishing their global headquarters in Tier 1 cities.

From the Dwarka Expressway and Golf Course Extension Road in Gurgaon to the Jewar International Airport corridor along Greater Noida and North Bangalore’s aerospace hub, early investors are reaping double-digit returns.

In this guide, our research desk evaluates price trends, infrastructure pipelines, and developer credentials across prime micro-markets. High-speed road connectivity such as Delhi-Mumbai Expressway and operational Rapid Metro lines are unlocking massive capital appreciation potential. Institutional capital and Grade-A developers like M3M and WAL Group are creating integrated ecosystems where live-work-play models flourish.`,
    category: 'Market Trends',
    tags: ['Investment', 'High Yield', 'Expressway', '2026 Trends'],
    author: 'True Realty Venture Research Desk',
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    views: 3240,
    readTimeMinutes: 6,
    isPublished: true,
    publishedAt: '2026-09-10T09:00:00.000Z'
  },
  {
    _id: 'blog-2',
    title: 'The Ultimate Checklist for Home Buyers: RERA Due Diligence Explained',
    slug: 'the-ultimate-checklist-for-home-buyers-rera-due-diligence-explained',
    excerpt: 'How to thoroughly verify RERA approvals, encumbrance certificates, occupancy certificates, and builder escrow accounts before buying.',
    content: `Buying a home is one of the most critical financial decisions in an individual’s life. The Real Estate (Regulation and Development) Act (RERA) has empowered consumers with unprecedented transparency, but knowing how to interpret project filings remains essential.

Always verify the project registration on the official state RERA portal (e.g. HARERA, MahaRERA). Ensure the promoter has deposited 70% of project collections into a designated escrow account for construction.

Furthermore, inspect carpet area measurements instead of super-built-up illusions, verify non-encumbrance certificates from local sub-registrar offices, and ensure your agreement adheres to model sale contract standards.`,
    category: 'Home Buying Tips',
    tags: ['RERA', 'Legal', 'Checklist', 'Buyer Protection'],
    author: 'True Realty Venture Advisory Team',
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    views: 2890,
    readTimeMinutes: 5,
    isPublished: true,
    publishedAt: '2026-09-14T11:30:00.000Z'
  },
  {
    _id: 'blog-3',
    title: 'Luxury Villas vs High-Rise Penthouses: Which Lifestyle Delivers Higher ROI?',
    slug: 'luxury-villas-vs-high-rise-penthouses-which-lifestyle-delivers-higher-roi',
    excerpt: 'Comparing maintenance overheads, exclusivity, land appreciation vs rental yields between independent luxury villas and high-rise penthouses.',
    content: `While ultra-high-net-worth individuals increasingly demand expansive green acreage, high-rise penthouses offer unparalleled 360-degree skyline views, multi-tier concierge services, and lower daily maintenance burdens.

Independent luxury villas in destinations like Goa, Gurgaon (Sohna / Aravalis), and Bangalore provide complete freehold land ownership and exponential long-term capital appreciation.

Conversely, penthouses in landmark towers on Golf Course Road or Bandra Carter Road deliver superior rental yields and hassle-free upkeep. We break down historical capital appreciation across Goa, Gurgaon, and Hyderabad to help you decide.`,
    category: 'Investment Guide',
    tags: ['Luxury', 'Villas', 'Penthouses', 'Lifestyle'],
    author: 'True Realty Venture Luxury Advisory',
    featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    views: 4120,
    readTimeMinutes: 7,
    isPublished: true,
    publishedAt: '2026-09-18T14:15:00.000Z'
  },
  {
    _id: 'blog-4',
    title: 'Understanding Home Loan Tax Benefits under Section 24(b) and Section 80C',
    slug: 'understanding-home-loan-tax-benefits-under-section-24-b-and-section-80-c',
    excerpt: 'Maximize your tax deductions on home loan principal and interest payments while structuring your co-borrower property purchases.',
    content: `Indian tax law allows significant deductions for property purchasers under the old tax regime. Learn how to leverage Section 24(b) for up to ₹2 Lakhs interest deduction and Section 80C for principal repayment up to ₹1.5 Lakhs.

When purchasing jointly with a spouse or parent as co-owners and co-borrowers, both parties can independently claim these deductions, doubling the total household tax relief to ₹7 Lakhs annually.

We outline eligibility criteria, stamp duty deduction rules, and timing considerations when acquiring under-construction property versus ready-to-move units.`,
    category: 'Legal & Tax',
    tags: ['Tax', 'Home Loan', 'Finance', 'Savings'],
    author: 'True Realty Venture Finance Desk',
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    views: 2450,
    readTimeMinutes: 5,
    isPublished: true,
    publishedAt: '2026-09-22T10:00:00.000Z'
  },
  {
    _id: 'blog-5',
    title: 'Why Golf Course Extension Road is Gurgaon’s Most Prestigious Luxury Address',
    slug: 'why-golf-course-extension-road-is-gurgaons-most-prestigious-luxury-address',
    excerpt: 'A deep dive into why high-net-worth buyers and corporate leaders are flocking to Golf Course Extension Road.',
    content: `With seamless connectivity to NH-48 and Rapid Metro, world-class clubhouses, and upscale social hubs like Worldmark, Golf Course Extension Road has established itself as the premier address for discerning homebuyers.

Sector 65 and Sector 66 have seen premier mixed-use developments like M3M Route 65 that integrate luxury boutiques, gourmet dining, and flagship stores within walking distance of high-end gated condominiums.

Average rental returns have consistently surpassed 4.5% net yields, while commercial absorption rates lead NCR records.`,
    category: 'City Insights',
    tags: ['Gurgaon', 'Golf Course Extn', 'Luxury Living'],
    author: 'True Realty Venture Gurgaon Desk',
    featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    views: 3880,
    readTimeMinutes: 6,
    isPublished: true,
    publishedAt: '2026-09-26T16:00:00.000Z'
  },
  {
    _id: 'blog-6',
    title: 'Interior Design Trends: Sustainable Luxury and Biophilic Spaces for Modern Homes',
    slug: 'interior-design-trends-sustainable-luxury-and-biophilic-spaces-for-modern-homes',
    excerpt: 'Discover how natural light, sustainable timber, vertical gardens, and smart energy automation are reshaping residential aesthetics.',
    content: `Modern homeowners demand tranquility and sustainability. Biophilic interior concepts integrate indoor flora, organic earth tones, and acoustic insulation for effortless urban tranquility.

IGBC-certified developments like WAL Serenia 92 are championing double-charge anti-skid tiles, low-VOC finishes, and cross-ventilation engineering to decrease air conditioning loads while elevating aesthetic warmth.

Explore curated moodboards, smart LED circadian lighting ideas, and modular Italian kitchen layouts recommended by top interior architects.`,
    category: 'Interior Design',
    tags: ['Interiors', 'Architecture', 'Sustainable Living'],
    author: 'True Realty Venture Design Studio',
    featuredImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    views: 2950,
    readTimeMinutes: 4,
    isPublished: true,
    publishedAt: '2026-09-29T13:20:00.000Z'
  }
];

export const INITIAL_LEADS = [
  {
    _id: 'lead-1',
    name: 'Rohit Khanna',
    phone: '+91 98112 34567',
    email: 'rohit.khanna@example.com',
    property: 'prop-1',
    propertyTitle: 'M3M Route 65 - Premium High-Street Retail & F&B Hub',
    budget: '₹ 1.5 Cr - 2.0 Cr',
    preferredLocation: 'Gurgaon',
    status: 'QUALIFIED',
    source: 'Property Page',
    message: 'Looking for a verified ground floor retail shop for capital appreciation.',
    createdAt: '2026-09-28T12:00:00.000Z',
    notes: [
      { text: 'Client contacted via website CTA. High intent investor.', createdAt: '2026-09-28T12:30:00.000Z' }
    ]
  },
  {
    _id: 'lead-2',
    name: 'Ananya Deshmukh',
    phone: '+91 98201 98765',
    email: 'ananya.d@example.com',
    property: 'prop-2',
    propertyTitle: 'WAL Serenia 92 - 3 BHK Luxury Wellness Residences',
    budget: '₹ 1.4 Cr',
    preferredLocation: 'Gurgaon',
    status: 'SITE_VISIT',
    source: 'Website CTA',
    message: 'Interested in ready-to-move 3 BHK with park facing balcony.',
    createdAt: '2026-09-29T15:30:00.000Z',
    notes: [
      { text: 'Site visit scheduled for coming Saturday 11 AM.', createdAt: '2026-09-29T16:00:00.000Z' }
    ]
  }
];

export const INITIAL_ENQUIRIES = [
  {
    _id: 'enq-1',
    name: 'Vikram Sethi',
    phone: '+91 99100 55443',
    email: 'vsethi@example.com',
    subject: 'M3M Jewel Showroom EOI details',
    message: 'Please provide official payment plans and brochure for M3M Jewel MG Road.',
    status: 'CONTACTED',
    createdAt: '2026-09-29T10:00:00.000Z'
  }
];

export const INITIAL_SITE_VISITS = [
  {
    _id: 'sv-1',
    name: 'Sanjay Aggarwal',
    phone: '+91 98711 22334',
    email: 'sanjay.aggarwal@example.com',
    propertyTitle: 'WAL Serenia 92 - 3 BHK Luxury Wellness Residences',
    visitDate: '2026-10-10',
    visitTime: '11:00 AM',
    status: 'CONFIRMED',
    message: 'Please arrange golf cart tour of amenities.',
    createdAt: '2026-09-30T10:00:00.000Z'
  }
];

export const INITIAL_USERS = [
  {
    _id: 'user-admin',
    name: 'True Realty Admin',
    email: 'admin@estate360.com',
    role: 'SUPER_ADMIN',
    phone: '+91 98765 00001',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isActive: true
  },
  {
    _id: 'user-agent-1',
    name: 'Vikram Malhotra',
    email: 'agent1@estate360.com',
    role: 'AGENT',
    phone: '+91 98711 00001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isActive: true,
    agentDetails: {
      agency: 'True Realty Venture Luxury Advisory',
      licenseNumber: 'RERA-AGT-2024-8801',
      experienceYears: 8,
      rating: 4.9,
      reviewsCount: 32
    }
  },
  {
    _id: 'user-client-1',
    name: 'Deepak Kumar',
    email: 'client1@example.com',
    role: 'USER',
    phone: '+91 99887 10001',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isActive: true
  }
];
