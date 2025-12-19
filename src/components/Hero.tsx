import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwcGF0dGVybnxlbnwxfHx8fDE3NjM4MTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Nie bądź singlem!",
    subheadline: "Znajdź swoją parę wśród tysięcy samotnych skarpetek",
    color: "from-pink-400/20 to-purple-400/20"
  },
  {
    image: "https://images.unsplash.com/photo-1580973757787-e22cdecb9cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGVkJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Każda skarpetka zasługuje na drugą połówkę",
    subheadline: "Dołącz do największej społeczności poszukiwaczy par",
    color: "from-blue-400/20 to-cyan-400/20"
  },
  {
    image: "https://images.unsplash.com/photo-1730449322472-2b63d1107357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc29ja3MlMjBjb3p5fGVufDF8fHx8MTc2MzgxOTk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Historie reunifikacji, które wzruszają",
    subheadline: "Ponad 10,000 udanych połączeń w 2024!",
    color: "from-yellow-400/20 to-orange-400/20"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt="Hero image"
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} backdrop-blur-[2px]`}></div>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-6xl text-gray-800 mb-4 drop-shadow-sm">
                {slide.headline}
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                {slide.subheadline}
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-4 rounded-full hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 mx-auto text-lg">
                <Search className="size-5" />
                Rozpocznij poszukiwania
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft className="size-6 text-gray-700" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight className="size-6 text-gray-700" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-pink-500 w-8" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
