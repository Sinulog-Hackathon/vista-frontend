import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Layers,
  DollarSign,
  ArrowRight,
  ShoppingCart,
  Check,
  MessageCircle,
  Bot,
} from "lucide-react";
import emptyRoomImg from "../assets/landing/empty_room.png";
import furnishedRoomImg from "../assets/landing/non_empty_room.png";

export function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setContainerWidth(sliderContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const calculatePosition = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      calculatePosition(e.clientX);
    },
    [calculatePosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      calculatePosition(e.touches[0].clientX);
    },
    [calculatePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      calculatePosition(e.touches[0].clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const furnitureItems = [
    {
      name: "Wooden Chair",
      price: "$120",
    },
    {
      name: "Blue Velvet Sofa",
      price: "$850",
    },
    {
      name: "Modern Standing Lamp",
      price: "$210",
    },
    {
      name: "Glass Coffee Table",
      price: "$340",
    },
    {
      name: "Minimalist Bookshelf",
      price: "$280",
    },
    {
      name: "Ceramic Vase Set",
      price: "$65",
    },
  ];
  const voiceCommands = [
    "Change the sofa to a modern style",
    "Make the room feel warmer",
    "Add minimalist paintings",
  ];
  const chatMessages = [
    {
      type: "user",
      text: "When was this property built?",
    },
    {
      type: "mark",
      text: "This property was built in 2015 and has had several renovations since then.",
    },
    {
      type: "user",
      text: "What are the property taxes like in this area?",
    },
  ];
  return (
    <div
      ref={containerRef}
      className="h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth"
    >
      {/* Animated Background Shapes - Fixed Position */}
      <motion.div
        className="bg-vista-surface pointer-events-none fixed top-20 left-10 -z-10 h-48 w-48 rounded-full opacity-60 blur-3xl md:h-96 md:w-96"
        animate={{
          x: [0, 50, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="bg-vista-accent/10 pointer-events-none fixed right-5 bottom-40 -z-10 h-64 w-64 rounded-full opacity-50 blur-3xl md:right-10 md:h-125 md:w-125"
        animate={{
          x: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Navigation - Fixed */}
      <nav className="bg-vista-bg/80 fixed top-0 right-(--scrollbar-width,17px) left-0 z-50 border-b border-white/20 backdrop-blur-sm">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-6">
          <div className="font-display text-vista-primary text-xl font-bold md:text-2xl">
            Vista
          </div>
          <div className="text-vista-text absolute left-1/2 hidden -translate-x-1/2 gap-6 text-sm font-medium lg:flex xl:gap-8">
            <a
              href="#hero"
              className="hover:text-vista-accent transition-colors"
            >
              Home
            </a>
            <a
              href="#staging"
              className="hover:text-vista-accent transition-colors"
            >
              AI Staging
            </a>
            <a
              href="#echo"
              className="hover:text-vista-accent transition-colors"
            >
              Voice Design
            </a>
            <a
              href="#mark"
              className="hover:text-vista-accent transition-colors"
            >
              AI Assistant
            </a>
            <a
              href="#cost"
              className="hover:text-vista-accent transition-colors"
            >
              Cost Estimates
            </a>
          </div>
          <button className="bg-vista-primary hover:bg-opacity-90 rounded-full px-4 py-2 text-sm font-medium text-white transition-all md:px-6 md:py-2.5">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section - 100vh */}
      <section
        id="hero"
        className="bg-vista-bg relative flex min-h-screen snap-start items-center justify-center px-4 py-24 md:h-screen md:px-6 md:py-20"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="z-10 text-center lg:text-left"
          >
            <h1 className="text-vista-primary mb-4 text-3xl leading-tight font-bold md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl">
              See the future of your home—
              <span className="text-vista-accent block sm:inline">
                before you buy.
              </span>
            </h1>
            <p className="text-vista-text/80 mx-auto mb-6 max-w-lg text-base leading-relaxed md:mb-8 md:text-lg lg:mx-0 lg:text-xl">
              Vista is a next-generation real estate platform. Visualize,
              customize, and understand a property with AI-driven clarity.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="bg-vista-accent shadow-vista-accent/30 mx-auto flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold text-white shadow-lg md:px-8 md:py-4 md:text-lg lg:mx-0"
            >
              Start Virtual Tour{" "}
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative"
          >
            <div className="relative h-[350px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[400px] md:h-[500px]">
              {/* Before/After Container */}
              <div
                ref={sliderContainerRef}
                className="group relative h-full w-full select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* After Image (Furnished - Full Width Background) */}
                <div className="absolute inset-0 h-full w-full overflow-hidden bg-gray-100">
                  <img
                    src={furnishedRoomImg}
                    alt="Room After - Furnished"
                    className="pointer-events-none h-full w-full object-cover"
                    draggable={false}
                  />
                </div>

                {/* Before Image (Empty - Clipped Overlay) */}
                <div
                  className="absolute inset-0 h-full overflow-hidden"
                  style={{
                    width: `${sliderPosition}%`,
                    transition: isDragging ? "none" : "width 0.1s ease-out",
                  }}
                >
                  <img
                    src={emptyRoomImg}
                    alt="Room Before - Empty"
                    className="pointer-events-none h-full object-cover"
                    style={{
                      width: containerWidth ? `${containerWidth}px` : "100vw",
                      maxWidth: "none",
                    }}
                    draggable={false}
                  />
                </div>

                {/* Slider Line */}
                <div
                  className="bg-vista-accent absolute top-0 bottom-0 z-10 w-1 cursor-col-resize shadow-lg"
                  style={{
                    left: `${sliderPosition}%`,
                    transition: isDragging ? "none" : "left 0.1s ease-out",
                  }}
                />

                {/* Slider Handle */}
                <div
                  className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-col-resize"
                  style={{
                    left: `${sliderPosition}%`,
                    transition: isDragging ? "none" : "left 0.1s ease-out",
                  }}
                >
                  <div className="bg-vista-accent flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110 md:h-12 md:w-12">
                    <svg
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19l7-7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <motion.div
                  className="absolute top-4 left-4 z-20 rounded-lg bg-black/60 px-3 py-1 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-xs font-bold text-white md:text-sm">
                    Before
                  </span>
                </motion.div>

                <motion.div
                  className="bg-vista-accent/90 absolute top-4 right-4 z-20 rounded-lg px-3 py-1 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-xs font-bold text-white md:text-sm">
                    After
                  </span>
                </motion.div>

                {/* Drag hint */}
                <motion.div
                  className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs font-medium text-white">
                    ← Drag to compare →
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Staging Section - 100vh */}
      <section
        id="staging"
        className="bg-vista-bg relative flex min-h-screen snap-start items-center justify-center px-4 py-20 md:h-screen md:px-6"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative order-2 md:order-1"
          >
            <div className="shadow-soft group relative aspect-video overflow-hidden rounded-2xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
                alt="Modern Interior"
                className="h-full w-full object-cover"
              />
              <div className="from-vista-primary/20 absolute inset-0 bg-linear-to-r to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="order-1 md:order-2"
          >
            <div className="bg-vista-accent/10 text-vista-accent mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:mb-6 md:h-12 md:w-12">
              <Layers className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h2 className="text-vista-primary mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
              Redesign Reality Instantly
            </h2>
            <p className="text-vista-text/70 text-base leading-relaxed md:text-lg">
              Transform a property's interior with AI. Modify furniture,
              lighting, and mood without physical renovations. Visualize changes
              directly on 360° panoramic images.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Echo Voice Section - 100vh */}
      <section
        id="echo"
        className="bg-vista-bg relative flex min-h-screen snap-start items-center justify-center px-4 py-20 md:h-screen md:px-6"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="bg-vista-accent/10 text-vista-accent mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:mb-6 md:h-12 md:w-12">
              <Mic className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h2 className="text-vista-primary mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
              Echo — Your Voice-Driven Design Partner
            </h2>
            <p className="text-vista-text/70 text-base leading-relaxed md:text-lg">
              While exploring a property in VR, simply speak your ideas. Echo
              interprets voice commands and updates the space in real-time,
              creating a hands-free, immersive experience.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="min-h-100ms-center relative flex justify-center"
          >
            <div className="bg-vista-primary relative flex h-48 w-48 items-center justify-center rounded-full shadow-2xl md:h-64 md:w-64">
              <Mic className="h-16 w-16 text-white md:h-24 md:w-24" />

              {/* Audio Wave Rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="border-vista-accent absolute inset-0 rounded-full border-2"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                />
              ))}
            </div>

            {/* Speech Bubbles */}
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              {voiceCommands.map((command, idx) => (
                <motion.div
                  key={idx}
                  className="border-vista-accent/20 absolute max-w-35 rounded-2xl border bg-white/90 px-2.5 py-2 shadow-lg backdrop-blur-sm sm:max-w-40 sm:px-3 md:max-w-50 md:px-4 md:py-3"
                  style={{
                    top: idx === 0 ? "10%" : idx === 1 ? "50%" : "80%",
                    left: idx === 0 ? "0%" : idx === 1 ? "auto" : "5%",
                    right: idx === 1 ? "0%" : "auto",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.8 + idx * 0.3,
                    duration: 0.5,
                  }}
                >
                  <p className="text-vista-text text-xs leading-snug font-medium md:text-sm">
                    "{command}"
                  </p>
                  <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-transparent border-t-white/90" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mark AI Chatbot Section - 100vh */}
      <section
        id="mark"
        className="bg-vista-bg relative flex min-h-screen snap-start items-center justify-center px-4 py-20 md:h-screen md:px-6"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative order-2 flex justify-center md:order-1"
          >
            <div className="shadow-soft border-vista-surface w-full max-w-md rounded-2xl border bg-white p-4 md:p-6">
              {/* Chat Header */}
              <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3 md:mb-6 md:pb-4">
                <div className="bg-vista-accent flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12">
                  <Bot className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <div>
                  <div className="text-vista-primary text-sm font-bold md:text-base">
                    Mark AI
                  </div>
                  <div className="text-xs text-gray-500">
                    Real Estate Expert
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 md:space-y-4">
                {chatMessages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.6 + idx * 0.3,
                    }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm ${message.type === "user" ? "bg-vista-primary rounded-br-sm text-white" : "text-vista-text rounded-bl-sm bg-gray-100"}`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <motion.div
                  className="flex justify-start"
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 1.5,
                  }}
                >
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 rounded-full bg-gray-400"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input Area */}
              <div className="mt-4 border-t border-gray-100 pt-3 md:mt-6 md:pt-4">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 md:px-4 md:py-3">
                  <MessageCircle className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
                  <input
                    type="text"
                    placeholder="Ask Mark anything..."
                    className="text-vista-text flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400 md:text-sm"
                    disabled
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="order-1 md:order-2"
          >
            <div className="bg-vista-accent/10 text-vista-accent mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:mb-6 md:h-12 md:w-12">
              <Bot className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h2 className="text-vista-primary mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
              Mark — Your Instant Real Estate Expert
            </h2>
            <p className="text-vista-text/70 text-base leading-relaxed md:text-lg">
              Stop hunting for information. Mark is an AI chatbot embedded
              directly in the listing. Ask natural questions and get instant
              answers about the property, neighborhood, or pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cost Section - 100vh */}
      <section
        id="cost"
        className="bg-vista-bg relative flex min-h-screen snap-start items-center justify-center px-4 py-20 md:h-screen md:px-6"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="order-2 md:order-1"
          >
            <div className="bg-vista-accent/10 text-vista-accent mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:mb-6 md:h-12 md:w-12">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h2 className="text-vista-primary mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
              Know the Cost Before You Commit
            </h2>
            <p className="text-vista-text/70 text-base leading-relaxed md:text-lg">
              As you customize interiors, Vista automatically estimates
              furniture prices based on real online listings. Validate your
              ideas before committing.
            </p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="order-1 flex justify-center md:order-2"
          >
            <div className="shadow-soft border-vista-surface relative w-full max-w-md rounded-2xl border bg-white p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3 md:mb-6 md:pb-4">
                <div className="bg-vista-accent/10 flex h-8 w-8 items-center justify-center rounded-lg md:h-10 md:w-10">
                  <ShoppingCart className="text-vista-accent h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 md:text-sm">
                    Estimated Total
                  </div>
                  <div className="text-vista-primary text-xl font-bold md:text-2xl">
                    $1,865
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-2 md:mb-6 md:space-y-3">
                {furnitureItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0"
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.6 + idx * 0.1,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="text-vista-accent h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-xs text-gray-700 md:text-sm">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-vista-primary text-xs font-semibold md:text-sm">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>

              <button className="bg-vista-accent hover:bg-vista-primary w-full rounded-xl py-2.5 text-sm font-bold text-white shadow-md transition-colors md:py-3 md:text-base">
                View Full Breakdown
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Auto Height */}
      <footer className="bg-vista-primary snap-start px-4 py-12 text-white md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-2 gap-8 md:mb-12 md:grid-cols-4 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="font-display mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Vista
              </div>
              <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                Next-generation real estate visualization powered by AI.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold md:mb-4 md:text-base">
                Product
              </h3>
              <ul className="space-y-2 text-xs text-white/70 md:text-sm">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold md:mb-4 md:text-base">
                Company
              </h3>
              <ul className="space-y-2 text-xs text-white/70 md:text-sm">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold md:mb-4 md:text-base">
                Legal
              </h3>
              <ul className="space-y-2 text-xs text-white/70 md:text-sm">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:pt-8">
            <p className="text-xs text-white/50 md:text-sm">
              © 2024 Vista. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6">
              <a
                href="#"
                className="text-xs text-white/50 transition-colors hover:text-white md:text-sm"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-xs text-white/50 transition-colors hover:text-white md:text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-xs text-white/50 transition-colors hover:text-white md:text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
