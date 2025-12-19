import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-purple-50 to-purple-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl">🧦🔍</div>
              <div>
                <h3 className="text-xl text-pink-500">ZaginioneSkarpetki.pl</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Łączymy samotne skarpetki od 2020 roku. Każda skarpetka zasługuje na swoją parę!
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-white p-3 rounded-full hover:bg-pink-100 transition-colors">
                <Facebook className="size-5 text-pink-500" />
              </a>
              <a href="#" className="bg-white p-3 rounded-full hover:bg-purple-100 transition-colors">
                <Instagram className="size-5 text-purple-500" />
              </a>
              <a href="#" className="bg-white p-3 rounded-full hover:bg-blue-100 transition-colors">
                <Twitter className="size-5 text-blue-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 text-gray-800">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <a href="#find" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Znajdź skarpetkę
                </a>
              </li>
              <li>
                <a href="#add" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Dodaj ogłoszenie
                </a>
              </li>
              <li>
                <a href="#ranking" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Ranking par
                </a>
              </li>
              <li>
                <a href="#guide" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Poradnik prania
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg mb-4 text-gray-800">Informacje prawne</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                  RODO
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4 text-gray-800">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="size-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span>ul. Bawełniana 8<br />80-001 Gdańsk</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="size-5 text-purple-500" />
                <a href="tel:+48600555222" className="hover:text-pink-500 transition-colors">
                  +48 600 555 222
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="size-5 text-blue-500" />
                <a href="mailto:kontakt@zaginioneskarpetki.pl" className="hover:text-pink-500 transition-colors">
                  kontakt@zaginioneskarpetki.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-200 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 ZaginioneSkarpetki.pl • Wszelkie prawa zastrzeżone • Stworzone z ❤️ dla samotnych skarpetek
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Pamiętaj: żadna skarpetka nie powinna być sama! 🧦💕🧦
          </p>
        </div>
      </div>
    </footer>
  );
}
