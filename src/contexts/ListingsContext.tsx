import { createContext, useContext, useState, ReactNode } from "react";

export interface Listing {
  id: number;
  image: string;
  brand: string;
  condition: string;
  location: string;
  lastSeen: string;
  featured: boolean;
  color: string;
  pattern: string;
  size: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface ListingsContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "lastSeen">) => void;
  getListingById: (id: number) => Listing | undefined;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const initialListings: Listing[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwcGF0dGVybnxlbnwxfHx8fDE3NjM4MTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Happy Socks Rainbow",
    condition: "Jak nowa",
    location: "Warszawa, Śródmieście",
    lastSeen: "2h temu",
    featured: true,
    color: "Kolorowe",
    pattern: "Wzorzyste",
    size: "39-42",
    description: "Zgubiona podczas przeprowadzki. Bardzo kolorowa skarpetka z wzorem tęczy. Sentymentalna wartość!",
    contactName: "Anna Kowalska",
    contactEmail: "anna@example.com",
    contactPhone: "+48 600 111 222"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1580973757787-e22cdecb9cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGVkJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Nike Striped Sport",
    condition: "Używana",
    location: "Kraków, Nowa Huta",
    lastSeen: "5h temu",
    featured: false,
    color: "Kolorowe",
    pattern: "Paski",
    size: "36-38",
    description: "Skarpetka sportowa w paski. Zgubiłem ją na siłowni.",
    contactName: "Piotr Nowak",
    contactEmail: "piotr@example.com",
    contactPhone: "+48 600 222 333"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1734523857126-90d118dd51b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Reserved Kids Star",
    condition: "Dobry stan",
    location: "Gdańsk, Wrzeszcz",
    lastSeen: "1d temu",
    featured: true,
    color: "Kolorowe",
    pattern: "Wzorzyste",
    size: "23-26",
    description: "Ulubiona skarpetka mojego synka z gwiazdkami. Proszę o kontakt!",
    contactName: "Magdalena Wiśniewska",
    contactEmail: "magda@example.com",
    contactPhone: "+48 600 333 444"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1730449322472-2b63d1107357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc29ja3MlMjBjb3p5fGVufDF8fHx8MTc2MzgxOTk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Woolly Comfort Classic",
    condition: "Vintage",
    location: "Wrocław, Psie Pole",
    lastSeen: "3h temu",
    featured: false,
    color: "Zielone",
    pattern: "Jednokolorowe",
    size: "40-43",
    description: "Wełniana skarpetka vintage, pamiątka po babci.",
    contactName: "Tomasz Kaczmarek",
    contactEmail: "tomasz@example.com",
    contactPhone: "+48 600 444 555"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1653478986369-c04280244686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBzb2NrJTIwd2hpdGV8ZW58MXx8fHwxNzYzODI1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "White Elegance",
    condition: "Perfekcyjna",
    location: "Poznań, Grunwald",
    lastSeen: "30min temu",
    featured: true,
    color: "Białe",
    pattern: "Kropki",
    size: "38-40",
    description: "Biała elegancka skarpetka w kropki. Zgubiona na weselu.",
    contactName: "Karolina Lewandowska",
    contactEmail: "karolina@example.com",
    contactPhone: "+48 600 555 666"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1725775621495-00c2ad59a562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW4lMjBzb2NrcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYzODI1MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Funky Pattern Mix",
    condition: "Dobry stan",
    location: "Łódź, Centrum",
    lastSeen: "6h temu",
    featured: false,
    color: "Kolorowe",
    pattern: "Wzorzyste",
    size: "42-45",
    description: "Bardzo nietypowy wzór, kolorowa i wesoła skarpetka.",
    contactName: "Jakub Szymański",
    contactEmail: "jakub@example.com",
    contactPhone: "+48 600 666 777"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1641399122809-e3c85958eb67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzb2Nrc3xlbnwxfHx8fDE3NjM4MjU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Red Passion",
    condition: "Jak nowa",
    location: "Katowice, Centrum",
    lastSeen: "1h temu",
    featured: false,
    color: "Czerwone",
    pattern: "Jednokolorowe",
    size: "37-39",
    description: "Intensywnie czerwona skarpetka, zgubiona w parku.",
    contactName: "Ewa Dąbrowska",
    contactEmail: "ewa@example.com",
    contactPhone: "+48 600 777 888"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1731936757642-09bccaf8b495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwc29ja3N8ZW58MXx8fHwxNzYzODI1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Blue Ocean",
    condition: "Używana",
    location: "Szczecin, Pogodno",
    lastSeen: "4h temu",
    featured: false,
    color: "Niebieskie",
    pattern: "Jednokolorowe",
    size: "40-42",
    description: "Niebieska skarpetka w odcieniu morskim.",
    contactName: "Marcin Zieliński",
    contactEmail: "marcin@example.com",
    contactPhone: "+48 600 888 999"
  }
];

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const addListing = (listing: Omit<Listing, "id" | "lastSeen">) => {
    const newListing: Listing = {
      ...listing,
      id: Math.max(...listings.map(l => l.id), 0) + 1,
      lastSeen: "Przed chwilą"
    };
    setListings(prev => [newListing, ...prev]);
  };

  const getListingById = (id: number) => {
    return listings.find(listing => listing.id === id);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, getListingById }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListings must be used within ListingsProvider");
  }
  return context;
}
