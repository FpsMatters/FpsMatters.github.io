import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const containerRef = useRef(null);
  const rafId = useRef(null);
  const lastScrollTime = useRef(0);

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
      
      // For cursor animation
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Optimized scroll tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current > 100) {
        setIsScrolling(true);
        lastScrollTime.current = now;
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }

      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const totalHeight = windowHeight * 3; // First 3 sections
      const progress = Math.min(scrollTop / totalHeight, 1);
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized animation frame updates
  useEffect(() => {
    const updateAnimations = () => {
      rafId.current = requestAnimationFrame(() => {
        // Update animations here if needed
        rafId.current = null;
      });
    };
    
    updateAnimations();
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Cleanup animation frames on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Morphing gradient mask
  const getGradientMask = () => {
    const { x, y } = mousePos;
    const angle = (x * 180) - 90;
    const scale = 1 + (scrollProgress * 0.5);
    
    return `linear-gradient(${angle}deg, 
      transparent ${20 * (1 - scrollProgress)}%, 
      white ${60 * (1 - scrollProgress * 0.5)}%)`;
  };

  return (
    <div className="font-sans bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Morphing gradient layer */}
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-500 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
              rgba(79, 70, 229, 0.8), transparent 70%)`,
            transform: `scale(${1 + scrollProgress * 0.2})`
          }}
        ></div>
        
        {/* Floating particles with optimized animation */}
        {[...Array(10)].map((_, i) => {
          const size = Math.random() * 10 + 5;
          const speed = Math.random() * 0.5 + 0.2;
          const delay = Math.random() * 5;
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-purple-500/30 backdrop-blur-sm will-change-transform"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${speed * 10}s linear infinite`,
                animationDelay: `${delay}s`,
                opacity: 0.3 - (scrollProgress * 0.2),
                transform: `translateY(${Math.sin(Date.now() / 1000 + i) * 5}px)`
              }}
            ></div>
          );
        })}
      </div>

      {/* Cursor glow effect */}
      <div 
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-screen bg-gradient-to-br from-blue-400 to-purple-600 opacity-30 will-change-transform"
        style={{
          left: `${cursorPos.x - 128}px`,
          top: `${cursorPos.y - 128}px`,
          transition: 'opacity 0.2s ease-out'
        }}
      ></div>

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {/* Hero Sections */}
        {[0, 1, 2].map((i) => (
          <section
            key={i}
            ref={sectionRefs[i]}
            className={`snap-start min-h-screen flex items-center justify-center relative pb-10 transition-all duration-700 ${
              currentSection === i ? 'opacity-100' : 'opacity-70'
            }`}
            style={{
              transform: `translateY(${scrollProgress * (i * 15)}px)`,
              filter: `blur(${scrollProgress * 1.5}px)`
            }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className={`absolute w-full h-1 transition-all duration-700 ease-out ${
                  currentSection >= i ? 'scale-x-100' : 'scale-x-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, 
                    rgba(59, 130, 246, ${1 - scrollProgress}), 
                    rgba(124, 58, 237, ${0.5 + scrollProgress * 0.5}), 
                    rgba(236, 72, 153, ${scrollProgress}))`
                }}
              ></div>
            </div>
            
            {/* Animated Text with 3D Effect */}
            <div 
              className="relative text-center px-4 will-change-transform"
              style={{
                transform: `perspective(800px) rotateX(${(mousePos.y - 0.5) * 8 * (2 - i)}deg) rotateY(${(mousePos.x - 0.5) * 8 * (2 - i)}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <h1 
                className={`text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-500 ${
                  currentSection >= i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  textShadow: `0 ${scrollProgress * 5}px ${scrollProgress * 10}px rgba(0,0,0,0.3)`
                }}
              >
                {i === 0 && "The future is here"}
                {i === 1 && "Your competitors are on the AI race, outperforming better than ever."}
                {i === 2 && "Falling behind? No worries. Are you ready to make the change?"}
              </h1>
              
              {/* Text glow effect with optimized transform */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-lg transition-transform duration-300"
                style={{
                  opacity: currentSection === i ? 0.3 : 0,
                  transform: `scale(${1 + (mousePos.x * 0.15)})`
                }}
              ></div>
            </div>
            
            {/* Scroll Indicator */}
            {currentSection === i && i < 2 && (
              <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
                <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <span className="text-sm text-gray-400">Scroll down</span>
              </div>
            )}
          </section>
        ))}

        {/* Main Content Sections */}
        <section 
          ref={sectionRefs[3]} 
          className="snap-start bg-gray-900"
        >
          {/* Rest of the website content */}
          <div className="pt-20 pb-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Empowering Your Business with AI</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We help companies integrate artificial intelligence solutions to stay ahead in the competitive landscape.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div id="services" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-700 p-8 rounded-lg shadow-lg transform transition hover:scale-105 duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-semibold mb-4">AI Strategy Consulting</h3>
                  <p className="text-gray-300">Develop a tailored AI strategy aligned with your business goals and industry trends.</p>
                </div>
                <div className="bg-gray-700 p-8 rounded-lg shadow-lg transform transition hover:scale-105 duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-semibold mb-4">Machine Learning Solutions</h3>
                  <p className="text-gray-300">Implement cutting-edge machine learning models to drive innovation and efficiency.</p>
                </div>
                <div className="bg-gray-700 p-8 rounded-lg shadow-lg transform transition hover:scale-105 duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-semibold mb-4">AI Integration & Deployment</h3>
                  <p className="text-gray-300">Seamlessly integrate AI capabilities into your existing workflows and systems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div id="why-us" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
              <ul className="space-y-4 max-w-2xl mx-auto">
                {[
                  "Expert team of AI specialists and data scientists",
                  "Proven track record with Fortune 500 companies",
                  "End-to-end solutions from strategy to implementation",
                  "Continuous support and optimization post-deployment"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Ready to take your business to the next level with AI? Contact us today for a free consultation.</p>
              <form className="max-w-xl mx-auto space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" />
                <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-6 text-center">
              <p>&copy; 2023 AI Consultancy. All rights reserved.</p>
            </div>
          </footer>
        </section>
      </div>

      {/* Custom Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transform-gpu" 
        style={{ 
          width: `${scrollProgress * 100}%`, 
          transition: 'width 0.1s ease-out'
        }}>
      </div>
    </div>
  );
}
