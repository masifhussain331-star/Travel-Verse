// Worldwide Airport Database for Flight Booking
export const AIRPORTS = [
  // Pakistan
  { code: 'ISB', city: 'Islamabad', country: 'Pakistan', name: 'Islamabad International Airport' },
  { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
  { code: 'LHE', city: 'Lahore', country: 'Pakistan', name: 'Allama Iqbal International Airport' },
  { code: 'PEW', city: 'Peshawar', country: 'Pakistan', name: 'Bacha Khan International Airport' },
  { code: 'MUX', city: 'Multan', country: 'Pakistan', name: 'Multan International Airport' },
  { code: 'SKT', city: 'Sialkot', country: 'Pakistan', name: 'Sialkot International Airport' },
  { code: 'KDU', city: 'Skardu', country: 'Pakistan', name: 'Skardu Airport' },
  { code: 'UET', city: 'Quetta', country: 'Pakistan', name: 'Quetta International Airport' },

  // Middle East & Gulf
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International Airport' },
  { code: 'AUH', city: 'Abu Dhabi', country: 'United Arab Emirates', name: 'Zayed International Airport' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', name: 'King Abdulaziz International Airport' },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', name: 'King Khalid International Airport' },
  { code: 'MED', city: 'Madinah', country: 'Saudi Arabia', name: 'Prince Mohammad Bin Abdulaziz Airport' },
  { code: 'MCT', city: 'Muscat', country: 'Oman', name: 'Muscat International Airport' },
  { code: 'BAH', city: 'Manama', country: 'Bahrain', name: 'Bahrain International Airport' },
  { code: 'KWI', city: 'Kuwait City', country: 'Kuwait', name: 'Kuwait International Airport' },

  // Europe & Turkey
  { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  { code: 'SAW', city: 'Istanbul (Sabiha)', country: 'Turkey', name: 'Sabiha Gokcen Airport' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { code: 'LGW', city: 'London (Gatwick)', country: 'United Kingdom', name: 'Gatwick Airport' },
  { code: 'MAN', city: 'Manchester', country: 'United Kingdom', name: 'Manchester Airport' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Leonardo da Vinci–Fiumicino Airport' },
  { code: 'MXP', city: 'Milan', country: 'Italy', name: 'Milan Malpensa Airport' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Josep Tarradellas Barcelona-El Prat' },
  { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Adolfo Suárez Madrid–Barajas Airport' },

  // North America
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport' },
  { code: 'EWR', city: 'Newark / New York', country: 'United States', name: 'Newark Liberty International' },
  { code: 'ORD', city: 'Chicago', country: 'United States', name: "O'Hare International Airport" },
  { code: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International Airport' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', name: 'San Francisco International Airport' },
  { code: 'MIA', city: 'Miami', country: 'United States', name: 'Miami International Airport' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport' },
  { code: 'YVR', city: 'Vancouver', country: 'Canada', name: 'Vancouver International Airport' },

  // Asia Pacific
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi Airport' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'Kuala Lumpur International Airport' },
  { code: 'DPS', city: 'Bali (Denpasar)', country: 'Indonesia', name: 'Ngurah Rai International Airport' },
  { code: 'MLE', city: 'Maldives (Male)', country: 'Maldives', name: 'Velana International Airport' },
  { code: 'HND', city: 'Tokyo (Haneda)', country: 'Japan', name: 'Tokyo Haneda Airport' },
  { code: 'NRT', city: 'Tokyo (Narita)', country: 'Japan', name: 'Narita International Airport' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', name: 'Incheon International Airport' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Sydney Kingsford Smith Airport' },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport' }
];

export function findAirport(codeOrQuery) {
  if (!codeOrQuery) return null;
  const q = codeOrQuery.toLowerCase().trim();
  return AIRPORTS.find(a => 
    a.code.toLowerCase() === q || 
    a.city.toLowerCase().includes(q) || 
    a.name.toLowerCase().includes(q) ||
    a.country.toLowerCase().includes(q)
  ) || null;
}

