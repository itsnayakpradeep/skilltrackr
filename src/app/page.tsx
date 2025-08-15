import Navbar from "@components/layout/Navbar";
import Hero from "@components/layout/Hero";
import Features from "@components/layout/Features";
import Footer from "@components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      
      <Features /> {/* Add the Features component here */}
      <Footer /> {/* Add the Footer component here */}
    </>
  );
}
