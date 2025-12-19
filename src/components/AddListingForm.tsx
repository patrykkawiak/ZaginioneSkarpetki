import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { useListings } from "../contexts/ListingsContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

const cities = [
  "Warszawa", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Szczecin",
  "Bydgoszcz", "Lublin", "Katowice", "Białystok", "Gdynia", "Częstochowa",
  "Radom", "Toruń", "Sosnowiec", "Kielce", "Rzeszów", "Gliwice", "Łódź"
];

const colors = ["Czerwone", "Niebieskie", "Zielone", "Kolorowe", "Białe", "Czarne", "Różowe", "Żółte"];
const patterns = ["Kropki", "Paski", "Jednokolorowe", "Wzorzyste", "W kratkę"];
const conditions = ["Jak nowa", "Dobry stan", "Używana", "Vintage"];
const sizes = ["23-26", "27-30", "31-34", "35-38", "36-38", "39-42", "40-43", "42-45", "43-46"];

interface AddListingFormProps {
  open: boolean;
  onClose: () => void;
}

export function AddListingForm({ open, onClose }: AddListingFormProps) {
  const { addListing } = useListings();
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const [formData, setFormData] = useState({
    brand: "",
    condition: "Jak nowa",
    location: "Warszawa",
    color: "Kolorowe",
    pattern: "Wzorzyste",
    size: "39-42",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    featured: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error("Proszę dodać zdjęcie skarpetki");
      return;
    }

    if (!formData.brand || !formData.description || !formData.contactName || !formData.contactEmail) {
      toast.error("Proszę wypełnić wszystkie wymagane pola");
      return;
    }

    addListing({
      image: imagePreview,
      brand: formData.brand,
      condition: formData.condition,
      location: formData.location,
      color: formData.color,
      pattern: formData.pattern,
      size: formData.size,
      description: formData.description,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      featured: formData.featured
    });

    toast.success("🧦 Ogłoszenie dodane pomyślnie!", {
      description: "Twoja skarpetka czeka na swoją parę!"
    });

    // Reset form
    setFormData({
      brand: "",
      condition: "Jak nowa",
      location: "Warszawa",
      color: "Kolorowe",
      pattern: "Wzorzyste",
      size: "39-42",
      description: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      featured: false
    });
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-pink-500">
            Dodaj zgubioną skarpetkę 🧦
          </DialogTitle>
          <DialogDescription className="text-center">
            Wypełnij formularz aby dodać ogłoszenie o zgubionej skarpetce
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Image Upload */}
          <div>
            <Label>Zdjęcie skarpetki *</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                  <button
                    type="button"
                    onClick={() => setImagePreview("")}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-pink-400 transition-colors">
                  <Upload className="size-12 text-gray-400 mb-2" />
                  <span className="text-gray-500">Kliknij aby dodać zdjęcie</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <Label htmlFor="brand">Marka / Nazwa *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="np. Happy Socks"
                required
              />
            </div>

            {/* Size */}
            <div>
              <Label htmlFor="size">Rozmiar</Label>
              <select
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <Label htmlFor="color">Kolor dominujący</Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Pattern */}
            <div>
              <Label htmlFor="pattern">Wzór</Label>
              <select
                id="pattern"
                value={formData.pattern}
                onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {patterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition">Stan</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Miasto</Label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Opis sytuacji *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Gdzie i kiedy zgubiłeś skarpetkę? Czy ma jakieś szczególne cechy?"
              rows={4}
              required
            />
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4">
            <h4 className="text-lg mb-3">Dane kontaktowe</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Imię i nazwisko *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Jan Kowalski"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="jan@example.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contactPhone">Telefon (opcjonalnie)</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+48 600 000 000"
                />
              </div>
            </div>
          </div>

          {/* Featured Option */}
          <div className="flex items-center gap-2 bg-yellow-50 p-4 rounded-2xl">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Wyróżnij ogłoszenie (+10 zł) - większa widoczność!
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Plus className="size-4 mr-2" />
              Dodaj ogłoszenie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}