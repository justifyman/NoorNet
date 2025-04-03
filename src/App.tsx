import "./App.css";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import Footer from "./components/Footer";

function App() {
  // Generate floating particles
  const particles = Array.from({ length: 10 }, (_, i) => {
    const size = Math.random() * 3 + 1;
    return {
      id: i,
      size,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
        Math.random() * 100 + 50
      )}, ${Math.floor(Math.random() * 150 + 100)}, 0.15)`,
      delay: Math.random() * 5,
    };
  });

  return (
    <div className="min-h-screen bg-[#1e1c2e] flex flex-col relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 starry-night"></div>
      <div className="absolute inset-0 moroccan-pattern opacity-45"></div>
      <div className="absolute inset-0 soft-gradient"></div>

      {/* Floating particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: particle.top,
              left: particle.left,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      <Header />
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 md:mb-8 text-white text-center">
          NoorNet
        </h1>
        <SearchSection />
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          <div className="flex items-center text-xs text-gray-400 bg-[#2a2939]/50 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-[#2a2939]/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_12px_-2px_rgba(137,100,205,0.3)]">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Answers are taken from trusted sites</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 bg-[#2a2939]/50 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-[#2a2939]/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_12px_-2px_rgba(137,100,205,0.3)]">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Coherent, fast search</span>
          </div>
        </div>
        <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-3 md:gap-4">
          <div className="flex items-center text-xs text-gray-400 bg-[#2a2939]/50 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-[#2a2939]/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_12px_-2px_rgba(137,100,205,0.3)]">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V16M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Authentic Islamic sources</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 bg-[#2a2939]/50 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-[#2a2939]/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_12px_-2px_rgba(137,100,205,0.3)]">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V12L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>24/7 availability</span>
          </div>
        </div>
      </div>

      {/* Footer at the bottom of the page */}
      <div className="mt-auto relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
