import { MapPin, Clock, Star, Filter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useListings } from "../contexts/ListingsContext";
import { ListingDetails } from "./ListingDetails";
import { Listing } from "../contexts/ListingsContext";

const colors = ["Wszystkie", "Czerwone", "Niebieskie", "Zielone", "Kolorowe", "Białe", "Czarne", "Różowe", "Żółte"];
const patterns = ["Wszystkie wzory", "Kropki", "Paski", "Jednokolorowe", "Wzorzyste", "W kratkę"];

export function FeaturedListings() {
  const { listings } = useListings();
  const [selectedColor, setSelectedColor] = useState("Wszystkie");
  const [selectedPattern, setSelectedPattern] = useState("Wszystkie wzory");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const colorMatch = selectedColor === "Wszystkie" || listing.color === selectedColor;
    const patternMatch = selectedPattern === "Wszystkie wzory" || listing.pattern === selectedPattern;
    return colorMatch && patternMatch;
  });

  // Show only 6 initially, or all if showAll is true
  const displayedListings = showAll ? filteredListings : filteredListings.slice(0, 6);

  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setDetailsOpen(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl mb-4">Wyróżnione ogłoszenia</h2>
          <p className="text-xl text-gray-600">
            {filteredListings.length} {filteredListings.length === 1 ? "skarpetka czeka" : "skarpetek czeka"} na swoją parę
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="size-5 text-purple-500" />
            <h3 className="text-lg">Filtruj wyniki</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Kolor</label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedColor === color
                        ? "bg-pink-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Wzór</label>
              <div className="flex flex-wrap gap-2">
                {patterns.map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => setSelectedPattern(pattern)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedPattern === pattern
                        ? "bg-purple-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Active Filters Summary */}
          {(selectedColor !== "Wszystkie" || selectedPattern !== "Wszystkie wzory") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Aktywne filtry:</span>
                {selectedColor !== "Wszystkie" && (
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                    {selectedColor}
                  </span>
                )}
                {selectedPattern !== "Wszystkie wzory" && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {selectedPattern}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedColor("Wszystkie");
                    setSelectedPattern("Wszystkie wzory");
                  }}
                  className="text-sm text-gray-500 hover:text-pink-500 underline ml-2"
                >
                  Wyczyść filtry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {displayedListings.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
                  onClick={() => handleViewDetails(listing)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={listing.image}
                      alt={listing.brand}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {listing.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="size-4 fill-white" />
                        <span className="text-sm">Wyróżnione</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-3">{listing.brand}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        Stan: {listing.condition}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-blue-400" />
                        {listing.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-purple-400" />
                        {listing.lastSeen}
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-full hover:shadow-lg transition-all">
                      Zobacz szczegóły
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredListings.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-white text-gray-700 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-gray-200"
                >
                  {showAll ? "Pokaż mniej" : `Załaduj więcej ogłoszeń (${filteredListings.length - 6} więcej)`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl text-gray-600 mb-2">Brak wyników</h3>
            <p className="text-gray-500 mb-6">
              Nie znaleziono skarpetek pasujących do wybranych filtrów
            </p>
            <button
              onClick={() => {
                setSelectedColor("Wszystkie");
                setSelectedPattern("Wszystkie wzory");
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <ListingDetails
        listing={selectedListing}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </section>
  );
}
