import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import emptyRoomImg from "../../../assets/landing/empty_room.png";
import furnishedRoomImg from "../../../assets/landing/non_empty_room.png";

export function HeroSection() {
  return (
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
            Start Virtual Tour <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
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
          <BeforeAfterSlider
            beforeImage={emptyRoomImg}
            afterImage={furnishedRoomImg}
          />
        </motion.div>
      </div>
    </section>
  );
}
