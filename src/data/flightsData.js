import { AIRPORTS, findAirport } from './airports';
import { AIRLINES } from './airlines';

export const FLIGHTS_SEED = [
  {
    id: 'FL-EK-612',
    flightNumber: 'EK 612',
    airline: 'Emirates',
    airlineCode: 'EK',
    aircraft: 'Boeing 777-300ER',
    origin: 'ISB',
    originCity: 'Islamabad',
    originName: 'Islamabad International Airport',
    destination: 'DXB',
    destinationCity: 'Dubai',
    destinationName: 'Dubai International Airport',
    departureTime: '03:10',
    arrivalTime: '05:45',
    duration: '3h 35m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 295,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 9,
    baggage: { carryOn: '7 kg', checked: '30 kg' },
    features: ['In-flight Wi-Fi', 'ICE Entertainment (6,500+ channels)', 'Halal Hot Meal', 'USB Power Ports'],
    co2Emissions: '142 kg',
    refundable: true,
    rating: 4.8
  },
  {
    id: 'FL-QR-632',
    flightNumber: 'QR 632',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    aircraft: 'Airbus A350-900',
    origin: 'ISB',
    originCity: 'Islamabad',
    originName: 'Islamabad International Airport',
    destination: 'LHR',
    destinationCity: 'London',
    destinationName: 'Heathrow Airport',
    departureTime: '04:45',
    arrivalTime: '13:50',
    duration: '13h 05m',
    stops: 1,
    layoverCity: 'Doha (DOH)',
    layoverDuration: '2h 15m',
    stopDetails: '1 Stop via Doha (DOH)',
    basePriceUSD: 740,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 5,
    baggage: { carryOn: '7 kg', checked: '35 kg' },
    features: ['Oryx One Entertainment', 'World’s Best Business Option', 'Complimentary Amenity Kit', 'Gourmet Dining'],
    co2Emissions: '290 kg',
    refundable: true,
    rating: 4.9
  },
  {
    id: 'FL-PK-785',
    flightNumber: 'PK 785',
    airline: 'Pakistan International Airlines (PIA)',
    airlineCode: 'PK',
    aircraft: 'Boeing 777-200LR',
    origin: 'ISB',
    originCity: 'Islamabad',
    originName: 'Islamabad International Airport',
    destination: 'LHR',
    destinationCity: 'London',
    destinationName: 'Heathrow Airport',
    departureTime: '11:30',
    arrivalTime: '15:45',
    duration: '8h 15m',
    stops: 0,
    stopDetails: 'Direct Non-stop',
    basePriceUSD: 660,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 14,
    baggage: { carryOn: '7 kg', checked: '40 kg' },
    features: ['Extra Baggage Allowance (40kg)', 'Fresh Pakistani Cuisine', 'Non-stop Direct Routing'],
    co2Emissions: '245 kg',
    refundable: true,
    rating: 4.2
  },
  {
    id: 'FL-TK-715',
    flightNumber: 'TK 715',
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    aircraft: 'Airbus A330-300',
    origin: 'LHE',
    originCity: 'Lahore',
    originName: 'Allama Iqbal International Airport',
    destination: 'IST',
    destinationCity: 'Istanbul',
    destinationName: 'Istanbul Airport',
    departureTime: '06:15',
    arrivalTime: '10:30',
    duration: '6h 15m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 410,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 8,
    baggage: { carryOn: '8 kg', checked: '30 kg' },
    features: ['Flying Chef Experience', 'Miles&Smiles Bonus', 'Touristanbul Layover Option'],
    co2Emissions: '195 kg',
    refundable: true,
    rating: 4.7
  },
  {
    id: 'FL-EK-201',
    flightNumber: 'EK 201',
    airline: 'Emirates',
    airlineCode: 'EK',
    aircraft: 'Airbus A380-800',
    origin: 'DXB',
    originCity: 'Dubai',
    originName: 'Dubai International Airport',
    destination: 'JFK',
    destinationCity: 'New York',
    destinationName: 'John F. Kennedy International Airport',
    departureTime: '08:30',
    arrivalTime: '14:25',
    duration: '13h 55m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 980,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 12,
    baggage: { carryOn: '7 kg', checked: '2x 23 kg' },
    features: ['Double-Decker A380 Comfort', 'Onboard Lounge (Business/First)', 'Fast High-Speed Wi-Fi'],
    co2Emissions: '380 kg',
    refundable: true,
    rating: 4.9
  },
  {
    id: 'FL-SQ-308',
    flightNumber: 'SQ 308',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    aircraft: 'Airbus A350-900 Ultra Long Range',
    origin: 'SIN',
    originCity: 'Singapore',
    originName: 'Singapore Changi Airport',
    destination: 'LHR',
    destinationCity: 'London',
    destinationName: 'Heathrow Airport',
    departureTime: '09:00',
    arrivalTime: '15:40',
    duration: '13h 40m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 890,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 6,
    baggage: { carryOn: '7 kg', checked: '30 kg' },
    features: ['KrisWorld 1,800+ Options', 'Book the Cook Dining', 'Ergonomic Seat Design'],
    co2Emissions: '298 kg',
    refundable: true,
    rating: 4.9
  },
  {
    id: 'FL-SV-722',
    flightNumber: 'SV 722',
    airline: 'Saudia',
    airlineCode: 'SV',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: 'KHI',
    originCity: 'Karachi',
    originName: 'Jinnah International Airport',
    destination: 'JED',
    destinationCity: 'Jeddah',
    destinationName: 'King Abdulaziz International Airport',
    departureTime: '13:00',
    arrivalTime: '16:15',
    duration: '4h 15m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 340,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 11,
    baggage: { carryOn: '7 kg', checked: '2x 23 kg' },
    features: ['Free Zamzam Allowance on return', 'Prayer Area onboard', 'Full Halal Menu'],
    co2Emissions: '160 kg',
    refundable: true,
    rating: 4.6
  },
  {
    id: 'FL-PA-200',
    flightNumber: 'PA 200',
    airline: 'Airblue',
    airlineCode: 'PA',
    aircraft: 'Airbus A321neo',
    origin: 'KHI',
    originCity: 'Karachi',
    originName: 'Jinnah International Airport',
    destination: 'ISB',
    destinationCity: 'Islamabad',
    destinationName: 'Islamabad International Airport',
    departureTime: '10:00',
    arrivalTime: '11:55',
    duration: '1h 55m',
    stops: 0,
    stopDetails: 'Non-stop',
    basePriceUSD: 95,
    supplierCurrency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 18,
    baggage: { carryOn: '7 kg', checked: '20 kg' },
    features: ['Modern Neo Fleet', 'Snack & Beverage Service', 'Punctual Schedule'],
    co2Emissions: '65 kg',
    refundable: true,
    rating: 4.3
  }
];

/**
 * Dynamic demo search provider that delivers high-quality realistic flight matches
 * between ANY origin and destination.
 */
export function searchFlights({
  origin = 'ISB',
  destination = 'DXB',
  departureDate,
  returnDate,
  tripType = 'round-trip',
  passengers = 1,
  cabinClass = 'Economy'
}) {
  const originAirport = findAirport(origin) || { code: origin, city: origin, name: `${origin} Airport` };
  const destAirport = findAirport(destination) || { code: destination, city: destination, name: `${destination} Airport` };

  // Multiplier based on cabin class
  const classMultiplier = {
    'Economy': 1.0,
    'Premium Economy': 1.6,
    'Business': 3.2,
    'First': 5.5
  }[cabinClass] || 1.0;

  // Find exact pre-seeded matches if any
  const exactMatches = FLIGHTS_SEED.filter(
    f => f.origin.toLowerCase() === originAirport.code.toLowerCase() &&
         f.destination.toLowerCase() === destAirport.code.toLowerCase()
  );

  // If we have exact pre-seeded flights, return adjusted versions
  const baseList = [...exactMatches];

  // If fewer than 4 flights, synthesize realistic carrier options
  const carriers = [
    { name: 'Emirates', code: 'EK', baseUSD: 320, dur: '3h 45m', stops: 0, aircraft: 'Boeing 777-300ER', dep: '03:15', arr: '06:00' },
    { name: 'Qatar Airways', code: 'QR', baseUSD: 360, dur: '5h 30m', stops: 1, layover: 'DOH (1h 45m)', aircraft: 'Airbus A350-900', dep: '05:30', arr: '10:00' },
    { name: 'Pakistan International Airlines (PIA)', code: 'PK', baseUSD: 275, dur: '3h 30m', stops: 0, aircraft: 'Boeing 777-200ER', dep: '09:20', arr: '11:50' },
    { name: 'flydubai', code: 'FZ', baseUSD: 240, dur: '3h 50m', stops: 0, aircraft: 'Boeing 737 MAX 8', dep: '14:40', arr: '17:30' },
    { name: 'Turkish Airlines', code: 'TK', baseUSD: 440, dur: '7h 15m', stops: 1, layover: 'IST (2h 10m)', aircraft: 'Airbus A330-300', dep: '06:45', arr: '13:00' },
    { name: 'Etihad Airways', code: 'EY', baseUSD: 335, dur: '4h 10m', stops: 0, aircraft: 'Boeing 787-9', dep: '19:15', arr: '22:25' }
  ];

  carriers.forEach((c, index) => {
    // Generate synthetic flight
    const id = `FL-${c.code}-${100 + index * 27}-${originAirport.code}-${destAirport.code}`;
    const basePrice = Math.round(c.baseUSD * classMultiplier);

    baseList.push({
      id,
      flightNumber: `${c.code} ${200 + index * 42}`,
      airline: c.name,
      airlineCode: c.code,
      aircraft: c.aircraft,
      origin: originAirport.code,
      originCity: originAirport.city,
      originName: originAirport.name,
      destination: destAirport.code,
      destinationCity: destAirport.city,
      destinationName: destAirport.name,
      departureTime: c.dep,
      arrivalTime: c.arr,
      duration: c.dur,
      stops: c.stops,
      stopDetails: c.stops === 0 ? 'Non-stop Direct' : `1 Stop via ${c.layover}`,
      layoverCity: c.stops > 0 ? c.layover : null,
      basePriceUSD: basePrice,
      supplierCurrency: 'USD',
      cabinClass: cabinClass,
      availableSeats: 7 + (index % 12),
      baggage: { carryOn: '7 kg', checked: cabinClass === 'Business' ? '40 kg' : '30 kg' },
      features: [
        'Free Wi-Fi (messaging)',
        'In-seat power & USB',
        'Complimentary Dining & Drinks',
        cabinClass === 'Business' ? 'Lie-flat 180° Bed' : 'Ergonomic 32" Pitch Seat'
      ],
      co2Emissions: `${140 + index * 30} kg`,
      refundable: index % 2 === 0,
      rating: (4.4 + (index % 6) * 0.1).toFixed(1)
    });
  });

  return baseList;
}

