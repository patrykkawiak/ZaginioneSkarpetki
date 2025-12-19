import { Heart, Quote, Map, HelpCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stories = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1725775621495-00c2ad59a562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW4lMjBzb2NrcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYzODI1MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Anna & Bartek",
    story: "Po 3 latach rozłąki w końcu znaleźliśmy się! Dziękujemy ZaginioneSkarpetki.pl ❤️",
    location: "Warszawa",
    date: "Listopad 2024"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwcGF0dGVybnxlbnwxfHx8fDE3NjM4MTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Kolorowe Bliźniaki",
    story: "Myślałam, że nigdy nie zobaczę mojej siostrzanej skarpetki. Portal dał nam drugą szansę!",
    location: "Gdańsk",
    date: "Październik 2024"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1734523857126-90d118dd51b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Małe Stópki",
    story: "Ulubiona skarpetka mojego synka wróciła do domu! To był najszczęśliwszy dzień!",
    location: "Kraków",
    date: "Wrzesień 2024"
  }
];

interface SuccessStoriesProps {
  onQuizClick: () => void;
  onMapClick: () => void;
}

export function SuccessStories({ onQuizClick, onMapClick }: SuccessStoriesProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">Oni znaleźli drugą połówkę 💑</h2>
          <p className="text-xl text-gray-600">
            Prawdziwe historie reunifikacji, które cieszą serca
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                  <Heart className="size-6 text-red-500 fill-red-500" />
                </div>
              </div>
              <div className="p-6">
                <Quote className="size-8 text-pink-300 mb-2" />
                <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <p className="text-purple-600">{story.name}</p>
                  <p className="text-sm text-gray-500">{story.location} • {story.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            onClick={onQuizClick}
            className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <HelpCircle className="size-12" />
              </div>
              <h3 className="text-3xl">Quiz Skarpetki</h3>
            </div>
            <p className="text-white/90 mb-6 text-lg">
              Jaką skarpetką jesteś? Odkryj swój idealny match!
            </p>
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full hover:shadow-lg transition-all">
              Rozpocznij quiz →
            </button>
          </div>

          <div 
            onClick={onMapClick}
            className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Map className="size-12" />
              </div>
              <h3 className="text-3xl">Mapa Zgubień</h3>
            </div>
            <p className="text-white/90 mb-6 text-lg">
              Zobacz gdzie najczęściej giną skarpetki w Twojej okolicy!
            </p>
            <button className="bg-white text-blue-500 px-6 py-3 rounded-full hover:shadow-lg transition-all">
              Sprawdź mapę →
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-2">🧦</div>
            <div className="text-3xl text-pink-500 mb-1">12,453</div>
            <div className="text-gray-600">Par połączonych</div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">👥</div>
            <div className="text-3xl text-blue-500 mb-1">24,906</div>
            <div className="text-gray-600">Szczęśliwych użytkowników</div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">📍</div>
            <div className="text-3xl text-green-500 mb-1">486</div>
            <div className="text-gray-600">Miast w Polsce</div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">⭐</div>
            <div className="text-3xl text-yellow-500 mb-1">4.9</div>
            <div className="text-gray-600">Średnia ocen</div>
          </div>
        </div>
      </div>
    </section>
  );
}