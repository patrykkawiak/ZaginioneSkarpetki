import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SockTinder } from "./components/SockTinder";
import { Categories } from "./components/Categories";
import { FeaturedListings } from "./components/FeaturedListings";
import { SuccessStories } from "./components/SuccessStories";
import { Footer } from "./components/Footer";
import { AddListingForm } from "./components/AddListingForm";
import { SockQuiz } from "./components/SockQuiz";
import { SockMap } from "./components/SockMap";
import { ListingsProvider } from "./contexts/ListingsContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [addListingOpen, setAddListingOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <ListingsProvider>
      <div className="min-h-screen bg-white">
        <Header onAddListingClick={() => setAddListingOpen(true)} />
        <main>
          <Hero />
          <SockTinder />
          <Categories />
          <FeaturedListings />
          <SuccessStories 
            onQuizClick={() => setQuizOpen(true)}
            onMapClick={() => setMapOpen(true)}
          />
        </main>
        <Footer />

        {/* Modals */}
        <AddListingForm 
          open={addListingOpen} 
          onClose={() => setAddListingOpen(false)} 
        />
        <SockQuiz 
          open={quizOpen} 
          onClose={() => setQuizOpen(false)} 
        />
        <SockMap 
          open={mapOpen} 
          onClose={() => setMapOpen(false)} 
        />

        {/* Toast Notifications */}
        <Toaster position="top-center" richColors />
      </div>
    </ListingsProvider>
  );
}
