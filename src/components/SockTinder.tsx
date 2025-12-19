import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { X, Heart, MapPin, Ruler, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const sockCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1653478986369-c04280244686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBzb2NrJTIwd2hpdGV8ZW58MXx8fHwxNzYzODI1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Happy Socks",
    size: "39-42",
    pattern: "W białe kropki",
    location: "Warszawa, Mokotów",
    lastSeen: "2 dni temu"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1725775621495-00c2ad59a562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW4lMjBzb2NrcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYzODI1MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Nike Sports",
    size: "36-38",
    pattern: "Kolorowe paski",
    location: "Kraków, Kazimierz",
    lastSeen: "5 godzin temu"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1734523857126-90d118dd51b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Reserved Kids",
    size: "23-26",
    pattern: "Tęczowe gwiazdki",
    location: "Gdańsk, Wrzeszcz",
    lastSeen: "1 dzień temu"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1730449322472-2b63d1107357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc29ja3MlMjBjb3p5fGVufDF8fHx8MTc2MzgxOTk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    brand: "Woolly Comfort",
    size: "40-43",
    pattern: "Wełniana melanż",
    location: "Poznań, Stare Miasto",
    lastSeen: "3 dni temu"
  }
];

export function SockTinder() {
  const [cards, setCards] = useState(sockCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return (
      <section className="py-16 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-8">🎉 Przejrzałeś wszystkie skarpetki!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Sprawdź później - codziennie dodajemy nowe ogłoszenia
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
          >
            Zacznij od nowa
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="find" className="py-16 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl mb-4">Sock Tinder 💘</h2>
          <p className="text-xl text-gray-600">
            Przesuń w prawo jeśli to twoja para, w lewo jeśli nie pasuje
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative h-[600px]">
            <SwipeCard
              card={currentCard}
              onSwipe={handleSwipe}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <button
              onClick={() => handleSwipe("left")}
              className="bg-white p-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border-4 border-red-200"
            >
              <X className="size-10 text-red-500" />
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="bg-white p-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border-4 border-green-200"
            >
              <Heart className="size-10 text-green-500 fill-green-500" />
            </button>
          </div>

          <p className="text-center mt-6 text-gray-500">
            {currentIndex + 1} / {cards.length}
          </p>
        </div>
      </div>
    </section>
  );
}

function SwipeCard({ card, onSwipe }: { card: typeof sockCards[0]; onSwipe: (direction: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full">
        <div className="relative h-3/5">
          <ImageWithFallback
            src={card.image}
            alt={card.brand}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-1">
            <Sparkles className="size-4" />
            <span>Premium</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl mb-2">{card.brand}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Ruler className="size-5 text-blue-400" />
              <span>Rozmiar: {card.size}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="size-5 text-purple-400" />
              <span>Wzór: {card.pattern}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="size-5 text-green-400" />
              <span>{card.location}</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Ostatnio widziana: {card.lastSeen}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
