import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/webComponents/Benefits";
import Collaboration from "../components/webComponents/Collaboration";
import Footer from "../components/webComponents/Footer";
import Header from "../components/webComponents/Header";
import Hero from "../components/webComponents/Hero";
import Pricing from "../components/webComponents/Pricing";
import Roadmap from "../components/webComponents/Roadmap";
import Services from "../components/webComponents/Services";

const WebsitePage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        {/* <Roadmap /> */}
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default WebsitePage;
