import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Arc from "./components/Arc";
import DeepDive from "./components/DeepDive";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Principles from "./components/Principles";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-snow antialiased">
      <TopBar />
      <main>
        <Hero />
        <Arc />
        <DeepDive />
        <Projects />
        <Capabilities />
        <Principles />
        <Contact />
      </main>
    </div>
  );
}
