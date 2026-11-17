export const HOTELS_DATA = [
  {
    id: 'HTL-DXB-ATLANTIS',
    name: 'Atlantis The Royal Resort & Residences',
    city: 'Dubai',
    country: 'United Arab Emirates',
    destinationCode: 'DXB',
    address: 'Crescent Road, Palm Jumeirah, Dubai',
    starRating: 5,
    userRating: 4.9,
    reviewCount: 3840,
    pricePerNightUSD: 520,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'The world’s most ultra-luxury experiential resort on the iconic Palm',
    description: 'Surging 43 storeys high into the Arabian sky, Atlantis The Royal is a masterclass in modern architecture and theatrical luxury. Boasting Michelin-starred restaurants, infinity sky pools, and private cabanas overlooking the Arabian Gulf.',
    amenities: [
      'Sky Infinity Pool',
      'Private Beachfront',
      'Awaken Luxury Spa',
      '17 World-class Restaurants',
      'Free High-Speed Wi-Fi',
      'Complimentary Aquaventure Waterpark Access',
      'Helipad Transfer Service',
      'Fitness Center & Tennis Courts'
    ],
    ratingBreakdown: {
      cleanliness: 5.0,
      comfort: 4.9,
      location: 4.8,
      service: 4.9,
      value: 4.6
    },
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in date. No pre-payment required.',
    rooms: [
      {
        id: 'RM-ROYAL-DELUXE',
        name: 'Seascape King Room with Palm Balcony',
        priceUSD: 520,
        size: '55 m²',
        bedType: '1 King Bed',
        capacity: '2 Adults, 1 Child',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80',
        amenities: ['Private Balcony', 'Nespresso Coffee Machine', 'Diptique Amenities', 'Marble Bathroom', 'Complimentary Minibar'],
        freeCancellation: true
      },
      {
        id: 'RM-SKY-SUITE',
        name: 'Sky Terrace One Bedroom Suite',
        priceUSD: 890,
        size: '110 m²',
        bedType: '1 King Bed + Lounge Sofa',
        capacity: '3 Adults',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        amenities: ['Expansive Panoramic Terrace', '24/7 Butler Service', 'Free Airport Limousine', 'Full Living Room'],
        freeCancellation: true
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Hamza Tariq',
        location: 'Islamabad, Pakistan',
        rating: 5,
        date: 'October 2026',
        comment: 'Mind-blowing experience! The sky pool is out of this world and the service from the TRAVELVERSE booking portal was instantaneous.'
      },
      {
        id: 'rev-2',
        author: 'Sarah Jenkins',
        location: 'London, UK',
        rating: 5,
        date: 'November 2026',
        comment: 'Unrivalled luxury. Breakfast was a feast and room views of the Palm Jumeirah at sunset are unforgettable.'
      }
    ]
  },
  {
    id: 'HTL-IST-FOURSEASONS',
    name: 'Four Seasons Hotel Istanbul at the Bosphorus',
    city: 'Istanbul',
    country: 'Turkey',
    destinationCode: 'IST',
    address: 'Ciragan Cad. No: 28, Besiktas, 34349 Istanbul',
    starRating: 5,
    userRating: 4.9,
    reviewCount: 2950,
    pricePerNightUSD: 440,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'A restored 19th-century Ottoman palace resting directly upon the Bosphorus strait',
    description: 'Step into historical grandeur combined with contemporary luxury. Four Seasons Istanbul at the Bosphorus offers private boat docks, traditional Turkish hammams, and majestic views where East meets West.',
    amenities: [
      'Waterfront Heated Pool',
      'Traditional Turkish Hammam & Spa',
      'Private Bosphorus Boat Dock',
      'Fine Dining Seafood Terrace',
      'Free High-Speed Wi-Fi',
      'Valet Parking',
      'Concierge City Tours'
    ],
    ratingBreakdown: {
      cleanliness: 4.9,
      comfort: 4.9,
      location: 5.0,
      service: 5.0,
      value: 4.7
    },
    cancellationPolicy: 'Free cancellation up to 72 hours before arrival.',
    rooms: [
      {
        id: 'RM-BOSPHORUS-VIEW',
        name: 'Palace Bosphorus View King',
        priceUSD: 440,
        size: '50 m²',
        bedType: '1 Extra Large King',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80',
        amenities: ['Direct Strait Views', 'Deep Soaking Tub', 'Espresso Machine', 'Bose Sound System'],
        freeCancellation: true
      },
      {
        id: 'RM-OTTOMAN-SUITE',
        name: 'Ottoman Grand Terrace Suite',
        priceUSD: 780,
        size: '95 m²',
        bedType: '1 King Bed + 1 Day Bed',
        capacity: '3 Adults',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80',
        amenities: ['Private Waterfront Deck', 'Marble Fireplace', 'Complimentary Champagne'],
        freeCancellation: true
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Ali Rehman',
        location: 'Lahore, Pakistan',
        rating: 5,
        date: 'September 2026',
        comment: 'Staying right by the Bosphorus watching ships pass while enjoying authentic Turkish tea was sheer magic.'
      }
    ]
  },
  {
    id: 'HTL-CDG-SHANGRI-LA',
    name: 'Shangri-La Paris (Eiffel Tower View)',
    city: 'Paris',
    country: 'France',
    destinationCode: 'CDG',
    address: '10 Avenue d’Iéna, 16th arr., 75116 Paris',
    starRating: 5,
    userRating: 4.8,
    reviewCount: 2180,
    pricePerNightUSD: 790,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'Former home of Prince Roland Bonaparte overlooking the Eiffel Tower and River Seine',
    description: 'An iconic Parisian landmark combining French aristocratic history with Shangri-La’s warm hospitality. Unobstructed front-row vistas of the glittering Eiffel Tower from your bedroom terrace.',
    amenities: [
      'Eiffel Tower Terrace Views',
      'Michelin-starred Cantonese & French Cuisine',
      'Subterranean Swimming Pool & Spa',
      'Chauffeured Rolls Royce Transfers',
      'Pet Friendly'
    ],
    ratingBreakdown: { cleanliness: 4.9, comfort: 4.8, location: 5.0, service: 4.8, value: 4.5 },
    cancellationPolicy: 'Free cancellation up to 5 days prior to arrival.',
    rooms: [
      {
        id: 'RM-EIFFEL-PREMIER',
        name: 'Eiffel View Premier King Room',
        priceUSD: 790,
        size: '48 m²',
        bedType: '1 King Bed',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
        amenities: ['Direct Eiffel View', 'Heated Bathroom Floors', 'Guerlain Toiletries', 'Balcony'],
        freeCancellation: true
      }
    ],
    reviews: []
  },
  {
    id: 'HTL-MLE-SONEVA-JANI',
    name: 'Soneva Jani Water Retreat & Reserve',
    city: 'Maldives',
    country: 'Maldives',
    destinationCode: 'MLE',
    address: 'Medhufaru Island, Noonu Atoll',
    starRating: 5,
    userRating: 4.9,
    reviewCount: 1650,
    pricePerNightUSD: 980,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'Iconic overwater villas featuring retractable roofs for stargazing and private ocean water slides',
    description: 'Encircled by an uninterrupted 5.6-kilometer turquoise lagoon, Soneva Jani is the zenith of sustainable barefoot luxury in the Maldives. Each overwater villa includes a private pool and waterslide directly into the azure sea.',
    amenities: [
      'Overwater Cinema Paradiso',
      'Retractable Master Bedroom Roof',
      'Private Ocean Waterslide',
      'Complimentary Chocolate & Ice Cream Parlour',
      'Barefoot Butler Service (Mr./Ms. Friday)',
      'Marine Biology & Dolphin Safari'
    ],
    ratingBreakdown: { cleanliness: 5.0, comfort: 5.0, location: 5.0, service: 5.0, value: 4.7 },
    cancellationPolicy: 'Free cancellation up to 14 days before arrival.',
    rooms: [
      {
        id: 'RM-WATER-VILLA-SLIDE',
        name: 'One Bedroom Water Retreat with Slide',
        priceUSD: 980,
        size: '411 m²',
        bedType: '1 King Bed + Sunken Lounge',
        capacity: '2 Adults, 2 Children',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80',
        amenities: ['Private Waterslide', 'Stargazing Roof', 'Private 13m Pool', 'Sunken Dining Area'],
        freeCancellation: true
      }
    ],
    reviews: []
  },
  {
    id: 'HTL-KDU-SERENA-SHIGAR',
    name: 'Serena Shigar Fort & Palace Heritage',
    city: 'Skardu',
    country: 'Pakistan',
    destinationCode: 'KDU',
    address: 'Shigar Valley, Baltistan, Gilgit-Baltistan',
    starRating: 5,
    userRating: 4.8,
    reviewCount: 940,
    pricePerNightUSD: 160,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'A 400-year-old Raja palace meticulously converted into an exquisite alpine heritage sanctuary',
    description: 'Surrounded by the dramatic Karakoram mountains and lush apricot orchards, Serena Shigar Fort offers genuine royal Balti hospitality, historic carved woodwork, and pure Himalayan tranquillity.',
    amenities: [
      'Historical Raja Heritage Suites',
      'Fong-Khar Royal Dining Pavilion',
      'Organic Orchard Gardens',
      'Traditional Balti Cultural Tours',
      'High-speed Satellite Internet',
      'Airport Shuttle to Skardu (KDU)'
    ],
    ratingBreakdown: { cleanliness: 4.8, comfort: 4.7, location: 5.0, service: 4.9, value: 4.9 },
    cancellationPolicy: 'Free cancellation up to 48 hours before arrival date.',
    rooms: [
      {
        id: 'RM-ROYAL-BALTI',
        name: 'Raja Heritage Deluxe Suite',
        priceUSD: 160,
        size: '42 m²',
        bedType: '1 Royal King Bed',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80',
        amenities: ['Mountain & Garden Views', 'Handmade Balti Carpets', 'Wood Burning Heating', 'Complimentary Breakfast'],
        freeCancellation: true
      }
    ],
    reviews: []
  },
  {
    id: 'HTL-DPS-MANDAPA-RITZ',
    name: 'Mandapa, a Ritz-Carlton Reserve',
    city: 'Bali (Ubud)',
    country: 'Indonesia',
    destinationCode: 'DPS',
    address: 'Jl. Raya Kedewatan, Banjar Kedewatan, Ubud, Bali',
    starRating: 5,
    userRating: 4.9,
    reviewCount: 1820,
    pricePerNightUSD: 390,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'A secluded sanctuary nestled along the sacred Ayung River in the spiritual heart of Bali',
    description: 'Mandapa offers a deeply immersive Balinese retreat with private river villas, lush organic rice paddies, yoga shalas, and personalized holistic wellness programs.',
    amenities: [
      'Riverside Cocoon Dining Pods',
      'Holistic Wellness Spa & Yoga',
      'Private Butler Service (Patih)',
      'Organic Working Farm & Herbal Garden',
      'River Rafting Launch Point'
    ],
    ratingBreakdown: { cleanliness: 4.9, comfort: 5.0, location: 4.9, service: 5.0, value: 4.7 },
    cancellationPolicy: 'Free cancellation up to 72 hours prior to arrival.',
    rooms: [
      {
        id: 'RM-RIVER-VILLA',
        name: 'Ayung River Front Pool Villa',
        priceUSD: 390,
        size: '145 m²',
        bedType: '1 King Bed',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
        amenities: ['Private Plunge Pool', 'Ayung River Audio & Views', 'Balinese Pavilion', 'Outdoor Rainforest Shower'],
        freeCancellation: true
      }
    ],
    reviews: []
  },
  {
    id: 'HTL-LHR-THE-SAVOY',
    name: 'The Savoy London',
    city: 'London',
    country: 'United Kingdom',
    destinationCode: 'LHR',
    address: 'Strand, London WC2R 0EZ',
    starRating: 5,
    userRating: 4.8,
    reviewCount: 3100,
    pricePerNightUSD: 620,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'London’s most storied luxury hotel on the River Thames since 1889',
    description: 'The Savoy has hosted royalty, world leaders, and Hollywood legends. Situated on the north bank of the Thames, steps away from Covent Garden and the West End theatre district.',
    amenities: ['Savoy Grill by Gordon Ramsay', 'American Bar (World’s Best Bar)', 'Indoor Heated Pool', 'Butler Service'],
    ratingBreakdown: { cleanliness: 4.9, comfort: 4.8, location: 5.0, service: 4.9, value: 4.5 },
    cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in.',
    rooms: [
      {
        id: 'RM-SAVOY-DELUXE',
        name: 'Deluxe King River Thames View',
        priceUSD: 620,
        size: '45 m²',
        bedType: '1 King Bed',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format&fit=crop&q=80',
        amenities: ['River Thames Panorama', 'Art Deco Styling', 'Savoy Signature Bedding'],
        freeCancellation: true
      }
    ],
    reviews: []
  },
  {
    id: 'HTL-SIN-MARINA-BAY',
    name: 'Marina Bay Sands Singapore',
    city: 'Singapore',
    country: 'Singapore',
    destinationCode: 'SIN',
    address: '10 Bayfront Ave, Singapore 018956',
    starRating: 5,
    userRating: 4.8,
    reviewCount: 5200,
    pricePerNightUSD: 540,
    supplierCurrency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&auto=format&fit=crop&q=80'
    ],
    tagline: 'The world’s largest rooftop infinity pool perched 57 stories above Singapore skyline',
    description: 'An architectural icon commanding the Singapore skyline. Marina Bay Sands features world-class celebrity chef dining, luxury shopping, and unmatched panoramic infinity pool views.',
    amenities: ['57th Floor SkyPark Infinity Pool', 'Banyan Tree Spa', 'Direct Shoppes Access', 'Rooftop Club Ce La Vi'],
    ratingBreakdown: { cleanliness: 4.8, comfort: 4.7, location: 5.0, service: 4.7, value: 4.6 },
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
    rooms: [
      {
        id: 'RM-MBS-PREMIER',
        name: 'Sands Premier Sky Harbor View',
        priceUSD: 540,
        size: '47 m²',
        bedType: '1 King Bed',
        capacity: '2 Adults',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80',
        amenities: ['Guaranteed High Floor', 'Floor-to-ceiling glass windows', 'Exclusive SkyPark Pool Access'],
        freeCancellation: true
      }
    ],
    reviews: []
  }
];

export function searchHotels({ destination, checkIn, checkOut, guests, priceMax, minRating, amenities }) {
  let results = [...HOTELS_DATA];

  if (destination) {
    const q = destination.toLowerCase().trim();
    results = results.filter(h => 
      h.city.toLowerCase().includes(q) ||
      h.country.toLowerCase().includes(q) ||
      h.name.toLowerCase().includes(q) ||
      h.destinationCode.toLowerCase() === q
    );
  }

  if (priceMax) {
    results = results.filter(h => h.pricePerNightUSD <= priceMax);
  }

  if (minRating) {
    results = results.filter(h => h.userRating >= minRating);
  }

  if (amenities && amenities.length > 0) {
    results = results.filter(h => 
      amenities.every(amenity => h.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase())))
    );
  }

  return results;
}

