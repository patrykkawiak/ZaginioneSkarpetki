import { X, MapPin, Clock, Ruler, Sparkles, Mail, Phone, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import { Listing } from "../contexts/ListingsContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

interface ListingDetailsProps {
  listing: Listing | null;
  open: boolean;
  onClose: () => void;
}

export function ListingDetails({ listing, open, onClose }: ListingDetailsProps) {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogDescription className="sr-only">
          Szczegółowe informacje o zgubionej skarpetce {listing.brand}
        </DialogDescription>
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
          >
            <X className="size-5" />
          </button>

          {/* Image */}
          <div className="relative h-96 overflow-hidden">
            <ImageWithFallback
              src={listing.image}
              alt={listing.brand}
              className="w-full h-full object-cover"
            />
            {listing.featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Sparkles className="size-5 fill-white" />
                <span>Wyróżnione</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-4xl mb-2">{listing.brand}</h2>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <Clock className="size-4" />
              <span>Dodane: {listing.lastSeen}</span>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg text-pink-500">Szczegóły skarpetki</h3>
                
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <Ruler className="size-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Rozmiar</div>
                    <div className="text-lg">{listing.size}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Sparkles className="size-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Wzór</div>
                    <div className="text-lg">{listing.pattern}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Kolor</div>
                    <div className="text-lg">{listing.color}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Stan</div>
                    <div className="text-lg">{listing.condition}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <MapPin className="size-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Lokalizacja</div>
                    <div className="text-lg">{listing.location}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-purple-500">Opis sytuacji</h3>
                <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-2xl">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6">
              <h3 className="text-2xl mb-4">Skontaktuj się z właścicielem</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <User className="size-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Imię i nazwisko</div>
                    <div className="text-lg">{listing.contactName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Mail className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Email</div>
                    <a 
                      href={`mailto:${listing.contactEmail}`}
                      className="text-lg text-blue-500 hover:underline"
                    >
                      {listing.contactEmail}
                    </a>
                  </div>
                </div>

                {listing.contactPhone && (
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Phone className="size-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Telefon</div>
                      <a 
                        href={`tel:${listing.contactPhone}`}
                        className="text-lg text-green-500 hover:underline"
                      >
                        {listing.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  onClick={() => window.location.href = `mailto:${listing.contactEmail}`}
                >
                  <Mail className="size-4 mr-2" />
                  Wyślij wiadomość
                </Button>
                {listing.contactPhone && (
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${listing.contactPhone}`}
                  >
                    <Phone className="size-4 mr-2" />
                    Zadzwoń
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}