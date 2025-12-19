import { Dumbbell, Briefcase, Baby, TreePine, Clock, Sparkles } from "lucide-react";

const categories = [
  { name: "Sportowe", icon: Dumbbell, color: "from-blue-400 to-cyan-400", count: 1243 },
  { name: "Eleganckie", icon: Briefcase, color: "from-purple-400 to-pink-400", count: 856 },
  { name: "Dziecięce", icon: Baby, color: "from-yellow-400 to-orange-400", count: 2104 },
  { name: "Świąteczne", icon: TreePine, color: "from-green-400 to-emerald-400", count: 432 },
  { name: "Vintage", icon: Clock, color: "from-amber-400 to-red-400", count: 678 },
  { name: "Nietypowe", icon: Sparkles, color: "from-pink-400 to-purple-400", count: 1891 },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12">Kategorie skarpetek</h2>
        
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  className="flex-shrink-0 group"
                >
                  <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${category.color} p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all hover:scale-105`}>
                    <Icon className="size-12 text-white mb-2" />
                    <span className="text-white text-center">{category.name}</span>
                  </div>
                  <p className="text-center mt-2 text-sm text-gray-500">
                    {category.count} ogłoszeń
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          ← Przesuń, aby zobaczyć więcej →
        </div>
      </div>
    </section>
  );
}
