"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Gift, MapPin, Eye, Link, Mail, Github } from 'lucide-react';

export default function BiolinkInterface() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // --- NEW TYPEWRITER STATES ---
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  // Add as many sentences here as you want!
  const phrases = [
    "VBUCKS CAN ONLY BE PURCHASED WITH PAYPAL THEY ARE NOT SOLD OUT!!!",
    "Join the Server! prolly the best one you'll ever be in",
    "Fortnite Crew is handled within the Server",
    "Make A ticket in the server if you have questions!"
  ];

  // 1. ADVANCED TYPEWRITER EFFECT LOGIC
  useEffect(() => {
    if (!hasEntered) return;
    
    let timer: NodeJS.Timeout;

    const handleType = () => {
      // Pick the current phrase based on loopNum
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      // Type or delete characters
      setTypedText(
        isDeleting 
          ? fullText.substring(0, typedText.length - 1) 
          : fullText.substring(0, typedText.length + 1)
      );

      // Adjust typing speed based on what it's doing
      setTypingSpeed(isDeleting ? 50 : 150); // Deletes faster than it types

      // Logic to switch between typing, pausing, and deleting
      if (!isDeleting && typedText === fullText) {
        // Finished typing -> Pause for 2 seconds before deleting
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        // Finished deleting -> Move to next word and pause briefly
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); 
      } else {
        // Continue typing/deleting
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    // Start the loop
    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, hasEntered, loopNum, typingSpeed]);


  // 2. PARALLAX/TILT ON HOVER LOGIC (Unchanged)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const maxRotation = 10; 
    const rotateX = -((mouseY / (rect.height / 2)) * maxRotation);
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    setTiltStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  };

  // 3. System Handlers
  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.log("Video play blocked:", e));
    }
    setTimeout(() => setHasEntered(true), 1000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const links = [
    { name: "DISCORD SERVER ( RIBBETSHOP )", url: "https://discord.gg/h8QkRZcgR5", icon: "/firstgif.gif" },
    { name: "CREW", url: "https://buymeacoffee.com/meibeee/e/329890", icon: "/secondgif.gif" },
    { name: "SAVE THE WORLD FOUNDERS", url: "https://buymeacoffee.com/meibeee/e/329888", icon: "/thirdgif.gif" },
    { name: "VINDERTECH APPLIED", url: "https://buymeacoffee.com/meibeee/e/507586", icon: "/fourthgif.gif" },
    { name: "PARTNERED SERVER", url: "https://discord.gg/Mtm8TR7Rc8", icon: "/fifthgif.gif" },
  ];

  return (
    // ---> ADDED 'no-scrollbar' to the main HTML/Body wrapper <---
    // ENLARGEMENT CHANGE: Main py-16 -> py-20
    <div className="min-h-screen relative flex flex-col items-center pt-4 pb-4 text-white selection:bg-white/30">
      
      {/* SOLID BACKGROUND */}
      <div className="fixed inset-0 bg-slate-950 -z-20"></div>

      {/* STATIC BACKGROUND VIDEO */}
      <video 
        ref={videoRef} autoPlay loop muted playsInline 
        className={`fixed inset-0 w-full h-full object-cover -z-10 transition-all duration-1000 ease-in-out ${
          !hasEntered ? "opacity-30 blur-sm scale-105" : "opacity-40 blur-[2px] scale-100"
        }`}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* INTRO SCREEN */}
      {!hasEntered ? (
        <div 
          onClick={handleEnter}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer bg-black/60 transition-all duration-1000 ease-in-out ${
            isEntering ? "opacity-0 backdrop-blur-none pointer-events-none" : "opacity-100 backdrop-blur-md"
          }`}
        >
          <h1 className="text-xl md:text-3xl text-white font-bold tracking-widest animate-pulse">
            私の店へようこそ
          </h1>
        </div>
      ) : (
        
        /* SCROLLABLE MAIN CONTENT */
        // ENLARGEMENT CHANGE: max-w-lg -> max-w-xl
        <div className="relative z-10 flex flex-col items-center w-full max-w-xl px-4 space-y-5 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out font-silkscreen">
          
          {/* Audio Toggle (Fixed) */}
          {/* ENLARGEMENT CHANGE: p-2 -> p-2.5, Icon 20 -> 22 */}
          <button onClick={toggleMute} className="fixed top-6 left-6 z-20 p-2.5 bg-white/30 border border-white/80 rounded-lg backdrop-blur-md hover:bg-white/40 transition-all">
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>

          {/* View Counter (Fixed) */}
          <div className="fixed bottom-1 left-6 z-20 flex items-center gap-2.5 px-4 py-2 bg-white/30 border border-white/80 rounded-lg backdrop-blur-md text-sm group cursor-help">
              
              {/* VIEWS TOOLTIP (TOP POSITION) */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/90 text-white text-[11px] tracking-widest px-3 py-1.5 border border-white/20 rounded whitespace-nowrap shadow-xl">
                    PROFILE VIEWS
                </div>
              </div>

            <Eye size={16} />
            <span>32,853</span>
          </div>

          <a 
            href="https://luigistates.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-1 right-6 z-20 flex items-center gap-2.5 px-4 py-2
             bg-white/30 border border-white/80 rounded-lg backdrop-blur-md text-sm group cursor-pointer
            hover:bg-white/40 transition-colors duration-200"
          >
            
            <div className="absolute bottom-full mb-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <div className="bg-black/90 text-white text-[11px] tracking-widest px-3 py-1.5 border border-white/20 rounded whitespace-nowrap shadow-xl">
                Buy your website here
              </div>
            </div>

            <img 
              src="/luigi.webp" 
              alt="Website Link" 
              className="w-4 h-4 object-contain" 
            />
          </a>

          {/* PARALLAX CONTAINER */}
          <div 
            ref={contentRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-full flex flex-col items-center space-y-5 pt-0 transition-transform duration-200 ease-out will-change-transform"
          >
            {/* Avatar */}
            {/* ENLARGEMENT CHANGE: w-24 h-24 -> w-28 h-28 */}
            <div className="w-28 h-28 rounded-full p-1 bg-pink-200 border-2 border-slate-800 shadow-xl overflow-hidden mt-8">
              <img src="https://r2.guns.lol/c0810cdf-5eb8-4121-810b-1e3da396b5f7.webp" alt="Profile" className="w-full h-full object-cover rounded-full bg-pink-100" />
            </div>

            {/* Rainbow Username */}
            {/* ADDED: Top Tooltip Logic ('relative group flex items-center justify-center' container and inner div) */}
            {/* ENLARGEMENT CHANGE: text-3xl -> text-4xl */}
            <div className="relative group flex items-center justify-center">

                <h1 className="text-4xl font-bold tracking-widest animate-rainbow uppercase">
                  CLOWNEY
                </h1>
            </div>

            {/* Gift Icon (Original bottom tooltip retained) */}
            {/* ENLARGEMENT CHANGE: Gift 16 -> 18, Tooltip text [10px] -> text-xs, group-hover: animate-float added */}
            <div className="relative group items-center justify-center">
              <div className="p-2.5 bg-amber-500 rounded-md text-white shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors group-hover:animate-float">
                <Gift size={18} />
              </div>
            </div>

            {/* Typewriter Animation Display */}
            {/* ENLARGEMENT CHANGE: h-6 -> h-8, text-sm -> text-base */}
            <div className="min-h-[1rem] mt-2 flex justify-center w-full px-4">
              <p className="w-full max-w-[530px] text-center text-base tracking-widest text-white/90 leading-relaxed">
                {typedText}
                <span className="animate-[pulse_1s_infinite] ml-1">|</span>
              </p>
              
            </div>

            {/* Location */}
            {/* ENLARGEMENT CHANGE: text-xs -> text-sm, MapPin 12 -> 14 */}
            <div className="flex items-center gap-2.5 text-sm tracking-widest text-white/90 mt-2">
              <MapPin size={14} />
              <span>JAPAN OSAKA</span>
            </div>

            {/* Social Icons Row */}
            {/* ENLARGEMENT CHANGE: SVGs 18/20 -> 20/22 */}
            <div className="flex items-center gap-5 py-5">
              <a href="https://x.com/ConfusedRibbet" className="hover:-translate-y-1 transition-transform opacity-80 hover:opacity-100"><XIcon size={20}/></a>
              <a href="https://www.tiktok.com/@meibeeyoushould" className="hover:-translate-y-1 transition-transform opacity-80 hover:opacity-100"><TikTokIcon size={20}/></a>
              <a href="https://www.roblox.com/users/7495796010/profile" className="hover:-translate-y-1 transition-transform opacity-80 hover:opacity-100"><RobloxIcon size={22}/></a>
              <a href="https://github.com/Meibeeyoushould" className="hover:-translate-y-1 transition-transform opacity-80 hover:opacity-100"><Github size={22} /></a>
              <a href="mailto:Ribbetshop@gmail.com" className="hover:-translate-y-1 transition-transform opacity-80 hover:opacity-100"><Mail size={22} /></a>
            </div>

            {/* Links List */}
            {/* ENLARGEMENT CHANGE: space-y-3 -> space-y-4, w-10 h-10 -> w-12 h-12, link text text-[10px] sm:text-xs -> text-xs sm:text-sm */}
            <div className="w-full space-y-4 mt-5">
              {links.map((link, index) => (
                <a key={index} href={link.url} className="group relative flex items-center w-full bg-white/30 hover:bg-white/40 border border-white/80 backdrop-blur-md p-2 transition-all duration-300 overflow-hidden">
                  <div className="w-12 h-12 shrink-0 bg-slate-800 rounded-sm overflow-hidden border border-white/20">
                    <img src={link.icon} alt={link.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center pr-12">
                    <span className="text-xs sm:text-sm tracking-widest text-white/80 group-hover:text-white uppercase transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple SVGs with official XML namespaces and width/height driven by prop or default
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5.63 5.63 0 0 1-1.04-.1z"/>
  </svg>
);

const RobloxIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.19 0L0 20.81 20.81 24 24 3.19 3.19 0zM13.36 14.53l-3.89-.83.83-3.89 3.89.83-.83 3.89z"/>
  </svg>
);