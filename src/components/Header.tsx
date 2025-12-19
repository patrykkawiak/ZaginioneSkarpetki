import { Search, Heart, Plus } from "lucide-react";

interface HeaderProps {
  onAddListingClick: () => void;
}

export function Header({ onAddListingClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-4xl">🧦🔍</div>
            <div>
              <h1 className="text-xl text-pink-500">ZaginioneSkarpetki.pl</h1>
              <p className="text-xs text-gray-500">Znajdź swoją parę!</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors">
              Strona główna
            </a>
            <a href="#find" className="text-gray-700 hover:text-blue-400 transition-colors flex items-center gap-1">
              <Search className="size-4" />
              Znajdź skarpetkę
            </a>
            <button 
              onClick={onAddListingClick}
              className="text-gray-700 hover:text-green-400 transition-colors flex items-center gap-1"
            >
              <Plus className="size-4" />
              Dodaj ogłoszenie
            </button>
            <a href="#ranking" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Ranking par
            </a>
            <a href="#guide" className="text-gray-700 hover:text-purple-400 transition-colors">
              Poradnik prania
            </a>
            <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors">
              Kontakt
            </a>
          </nav>

          {/* CTA Button */}
          <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all hover:scale-105">
            <Heart className="size-4 fill-white" />
            Moje para
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
              <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
              <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}