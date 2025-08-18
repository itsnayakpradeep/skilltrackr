import Navbar from "@components/layout/Navbar";
import Hero from "@components/layout/Hero";
import Features from "@components/layout/Features";
import Footer from "@components/layout/Footer";
import Testimonials from "@components/layout/Testimonials"; // Importing Testimonials component

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      
      <Features /> {/* Add the Features component here */}
      <Testimonials /> {/* Add the Testimonials component here */}
      
      {/* Other components can be added here as needed */}
      <Footer /> {/* Add the Footer component here */}
    </>
  );
}
