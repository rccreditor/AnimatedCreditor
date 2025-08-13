import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import About from "./components/About";
import CreditorStats from "./components/CreditorStats";
import MasterClass from "./components/MasterClassBanner";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MembershipMC from "./pages/MembershipMC";
import AboutCreditor from "./components/AboutCreditor";
import AboutPaul from "./components/AboutPaul";
import WebsitePage from "./pages/WebsitePage";
import GameBanner from "./components/GameBanner";

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/services/website-creation";

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CreditorStats />
              <AboutCreditor />
              <AboutPaul />
              <MasterClass />
              <About />
              <Features />
              <GameBanner/>
              
              <Contact />
            </>
          }
        />

        {/* Individual Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Features />} />
        <Route path="/prologue" element={<Story />} />
        <Route path="/course" element={<Hero />} /> {/* Replace with course page later */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/masterclass" element={<MembershipMC />} />
        <Route path="/services/website-creation" element={<WebsitePage />} />

        {/* Optional: Fallback route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
