import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { MapPin, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface CityData {
  name: string;
  x: number;
  y: number;
  count: number;
  trending: boolean;
}

const cities: CityData[] = [
  { name: "Warszawa", x: 72, y: 45, count: 2847, trending: true },
  { name: "Kraków", x: 68, y: 70, count: 1923, trending: true },
  { name: "Wrocław", x: 50, y: 60, count: 1456, trending: false },
  { name: "Poznań", x: 50, y: 45, count: 1234, trending: false },
  { name: "Gdańsk", x: 62, y: 15, count: 1876, trending: true },
  { name: "Szczecin", x: 40, y: 22, count: 876, trending: false },
  { name: "Łódź", x: 65, y: 52, count: 1345, trending: false },
  { name: "Katowice", x: 65, y: 72, count: 1567, trending: false },
  { name: "Lublin", x: 82, y: 60, count: 789, trending: false },
  { name: "Białystok", x: 85, y: 38, count: 654, trending: false },
  { name: "Gdynia", x: 60, y: 12, count: 987, trending: false },
  { name: "Bydgoszcz", x: 58, y: 38, count: 743, trending: false },
  { name: "Rzeszów", x: 78, y: 72, count: 567, trending: false }
];

interface SockMapProps {
  open: boolean;
  onClose: () => void;
}

export function SockMap({ open, onClose }: SockMapProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);

  const getMarkerSize = (count: number) => {
    const maxCount = Math.max(...cities.map(c => c.count));
    const minSize = 20;
    const maxSize = 60;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-blue-500">
            Mapa Zgubień Skarpetek 🗺️
          </DialogTitle>
          <DialogDescription className="text-center">
            Zobacz gdzie najczęściej giną skarpetki w Polsce
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Legend */}
          <div className="flex justify-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-400"></div>
              <span className="text-sm text-gray-600">Mało zgubień ({"<"}1000)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-pink-500"></div>
              <span className="text-sm text-gray-600">Średnio (1000-2000)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-600"></div>
              <span className="text-sm text-gray-600">Dużo zgubień ({">"}2000)</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-orange-500" />
              <span className="text-sm text-gray-600">Trend wzrostowy</span>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-xl">
            {/* Simple Poland outline */}
            <svg viewBox="0 0 100 100" className="w-full h-[500px]">
              {/* Simplified Poland border */}
              <path
                d="M 40 20 L 45 15 L 50 13 L 55 12 L 60 12 L 65 13 L 70 16 L 75 20 L 80 25 L 85 32 L 88 40 L 88 50 L 86 60 L 83 68 L 78 75 L 72 80 L 65 82 L 58 82 L 52 80 L 48 75 L 45 68 L 42 60 L 40 52 L 38 45 L 38 35 L 40 28 Z"
                fill="#e0f2fe"
                stroke="#93c5fd"
                strokeWidth="0.5"
                opacity="0.6"
              />

              {/* City Markers */}
              {cities.map((city, index) => {
                const size = getMarkerSize(city.count);
                const isHovered = hoveredCity?.name === city.name;
                const isSelected = selectedCity?.name === city.name;
                
                return (
                  <g key={index}>
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={size / 10}
                      className={`cursor-pointer transition-all ${
                        city.count > 2000
                          ? "fill-pink-600"
                          : city.count > 1000
                          ? "fill-pink-500"
                          : "fill-pink-400"
                      }`}
                      opacity={isHovered || isSelected ? 1 : 0.8}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      onClick={() => setSelectedCity(city)}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isHovered ? 1.2 : 1,
                        filter: isHovered ? "brightness(1.2)" : "brightness(1)"
                      }}
                      transition={{ 
                        type: "spring",
                        delay: index * 0.05 
                      }}
                      whileHover={{ scale: 1.3 }}
                    />
                    
                    {/* Pulse animation for trending cities */}
                    {city.trending && (
                      <motion.circle
                        cx={city.x}
                        cy={city.y}
                        r={size / 10}
                        className="fill-orange-400"
                        opacity={0.4}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 0, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    {/* Trending icon */}
                    {city.trending && (
                      <g transform={`translate(${city.x + size / 8}, ${city.y - size / 8})`}>
                        <circle r="1.5" fill="white" />
                        <text
                          x="0"
                          y="0.5"
                          fontSize="2"
                          textAnchor="middle"
                          fill="#f97316"
                        >
                          ↗
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip */}
            {hoveredCity && !selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-pink-500" />
                  <span className="font-semibold">{hoveredCity.name}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {hoveredCity.count.toLocaleString()} zgubień
                </div>
              </motion.div>
            )}
          </div>

          {/* Selected City Info */}
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="size-6 text-pink-500" />
                    <h3 className="text-2xl">{selectedCity.name}</h3>
                    {selectedCity.trending && (
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <TrendingUp className="size-3" />
                        Trend
                      </span>
                    )}
                  </div>
                  <p className="text-3xl text-pink-600">
                    {selectedCity.count.toLocaleString()} <span className="text-lg text-gray-500">zgubień</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCity(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Top kategoria</div>
                  <div className="text-lg">🧦 Sportowe</div>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Najpopularniejszy kolor</div>
                  <div className="text-lg">🔴 Czerwone</div>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <div className="text-sm text-gray-500 mb-1">Czas odzyskania</div>
                  <div className="text-lg">⏱️ ~12 dni</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-100 rounded-2xl">
                <p className="text-sm text-blue-800">
                  💡 <strong>Ciekawostka:</strong> W {selectedCity.name} najwięcej skarpetek ginie w{" "}
                  {selectedCity.trending ? "laundromatch i siłowniach" : "pralni automatycznych"}!
                </p>
              </div>
            </motion.div>
          )}

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-pink-100 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">
                {cities.reduce((sum, city) => sum + city.count, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Zgubienia razem</div>
            </div>
            <div className="bg-purple-100 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">{cities.length}</div>
              <div className="text-sm text-gray-600">Miast w bazie</div>
            </div>
            <div className="bg-blue-100 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">
                {cities.sort((a, b) => b.count - a.count)[0].name}
              </div>
              <div className="text-sm text-gray-600">Lider zgubień</div>
            </div>
            <div className="bg-green-100 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">42%</div>
              <div className="text-sm text-gray-600">Wskaźnik powrotu</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}