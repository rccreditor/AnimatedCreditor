import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Features />
                <Story />
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

          {/* Optional: Fallback route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
