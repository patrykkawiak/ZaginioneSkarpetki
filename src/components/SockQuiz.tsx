import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface QuizQuestion {
  question: string;
  options: { text: string; type: string }[];
}

const questions: QuizQuestion[] = [
  {
    question: "Jak spędzasz idealny weekend?",
    options: [
      { text: "🏃‍♂️ Aktywnie - sport i ruch!", type: "sport" },
      { text: "🎨 Kreatywnie - sztuka i kultura", type: "creative" },
      { text: "🛋️ Relaksacyjnie - domówka i serial", type: "cozy" },
      { text: "🎉 Towarzysko - imprezy i znajomi", type: "party" }
    ]
  },
  {
    question: "Twój ulubiony kolor to:",
    options: [
      { text: "🔴 Czerwony - pasja i energia", type: "party" },
      { text: "🔵 Niebieski - spokój i harmonia", type: "cozy" },
      { text: "🟢 Zielony - natura i równowaga", type: "sport" },
      { text: "🟡 Żółty - radość i optymizm", type: "creative" }
    ]
  },
  {
    question: "W szafie dominują:",
    options: [
      { text: "👔 Eleganckie ubrania", type: "elegant" },
      { text: "👟 Dresy i sportowe stroje", type: "sport" },
      { text: "🎨 Kolorowe i nietypowe rzeczy", type: "creative" },
      { text: "👖 Wygodne, casualowe ubrania", type: "cozy" }
    ]
  },
  {
    question: "Twoje motto życiowe:",
    options: [
      { text: "💪 Bez bólu nie ma zysku", type: "sport" },
      { text: "🌈 Życie jest zbyt krótkie na nudę", type: "party" },
      { text: "☮️ Spokój i harmonia ponad wszystko", type: "cozy" },
      { text: "✨ Bądź wyjątkowy", type: "creative" }
    ]
  },
  {
    question: "W pracy/szkole jesteś:",
    options: [
      { text: "🎯 Zdeterminowany i ambitny", type: "sport" },
      { text: "🤝 Towarzyski i komunikatywny", type: "party" },
      { text: "💡 Kreatywny i innowacyjny", type: "creative" },
      { text: "📚 Spokojny i metodyczny", type: "cozy" }
    ]
  }
];

const results = {
  sport: {
    title: "Skarpetka Sportowa 🏃‍♂️",
    description: "Jesteś pełen energii i zawsze w ruchu! Twoja idealna para to skarpetka sportowa - wygodna, oddychająca i gotowa na każde wyzwanie. Nie wyobrażasz sobie dnia bez aktywności!",
    image: "https://images.unsplash.com/photo-1580973757787-e22cdecb9cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGVkJTIwc29ja3MlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjM4MjUyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-blue-400 to-cyan-400"
  },
  creative: {
    title: "Skarpetka Artystyczna 🎨",
    description: "Jesteś duszą towarzystwa i kochasz wyróżniać się z tłumu! Twoja idealna para to kolorowa, wzorzysta skarpetka - oryginalna i niepowtarzalna, tak jak Ty!",
    image: "https://images.unsplash.com/photo-1679391903287-b52bee558313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwcGF0dGVybnxlbnwxfHx8fDE3NjM4MTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-pink-400 to-purple-400"
  },
  cozy: {
    title: "Skarpetka Przytulna 🧦",
    description: "Cenisz komfort i spokój. Twoja idealna para to miękka, wełniana skarpetka - ciepła, przytulna i idealna na długie wieczory z książką czy filmem!",
    image: "https://images.unsplash.com/photo-1730449322472-2b63d1107357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc29ja3MlMjBjb3p5fGVufDF8fHx8MTc2MzgxOTk2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-orange-400 to-red-400"
  },
  party: {
    title: "Skarpetka Imprezowa 🎉",
    description: "Jesteś życiem każdej imprezy! Twoja idealna para to śmiała, jaskrawa skarpetka - przyciąga wzrok i nie boi się być w centrum uwagi!",
    image: "https://images.unsplash.com/photo-1725775621495-00c2ad59a562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW4lMjBzb2NrcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYzODI1MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-yellow-400 to-pink-400"
  },
  elegant: {
    title: "Skarpetka Elegancka 👔",
    description: "Masz klasę i styl! Twoja idealna para to elegancka skarpetka - stonowana, wysokiej jakości i zawsze odpowiednia na każdą okazję.",
    image: "https://images.unsplash.com/photo-1653478986369-c04280244686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBzb2NrJTIwd2hpdGV8ZW58MXx8fHwxNzYzODI1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-gray-400 to-gray-600"
  }
};

interface SockQuizProps {
  open: boolean;
  onClose: () => void;
}

export function SockQuiz({ open, onClose }: SockQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    
    const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return results[mostCommon as keyof typeof results] || results.cozy;
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const result = showResult ? getResult() : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-pink-500">
            {showResult ? "Twój wynik!" : "Quiz: Jaką skarpetką jesteś?"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {showResult ? "Odkryj swój typ skarpetki!" : "Odpowiedz na 5 pytań i poznaj swoją idealną parę"}
          </DialogDescription>
        </DialogHeader>

        {!showResult ? (
          <div className="py-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Pytanie {currentQuestion + 1} z {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl mb-6 text-center">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.type)}
                    className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 rounded-2xl text-left transition-all hover:shadow-lg hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6"
          >
            {result && (
              <div className="text-center">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <ImageWithFallback
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${result.color} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl text-white drop-shadow-lg">
                      {result.title}
                    </h3>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {result.description}
                </p>

                <div className="flex gap-3">
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="flex-1"
                  >
                    Rozwiąż ponownie
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    Zamknij
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-2xl">
                  <p className="text-sm text-gray-600">
                    💡 Udostępnij wynik znajomym i przekonaj się, jakimi skarpetkami są oni!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}