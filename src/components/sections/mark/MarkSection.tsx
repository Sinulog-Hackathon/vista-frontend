import { motion } from "framer-motion";
import { Bot, MessageCircle } from "lucide-react";

interface ChatMessage {
  type: "user" | "mark";
  text: string;
}

const chatMessages: ChatMessage[] = [
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

export function MarkSection() {
  return (
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
                <div className="text-xs text-gray-500">Real Estate Expert</div>
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
  );
}
