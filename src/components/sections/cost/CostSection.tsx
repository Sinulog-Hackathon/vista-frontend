import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Check } from "lucide-react";

interface FurnitureItem {
  name: string;
  price: string;
}

const furnitureItems: FurnitureItem[] = [
  { name: "Wooden Chair", price: "$120" },
  { name: "Blue Velvet Sofa", price: "$850" },
  { name: "Modern Standing Lamp", price: "$210" },
  { name: "Glass Coffee Table", price: "$340" },
  { name: "Minimalist Bookshelf", price: "$280" },
  { name: "Ceramic Vase Set", price: "$65" },
];

export function CostSection() {
  return (
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
          className="order-1 md:order-2"
        >
          <div className="bg-vista-accent/10 text-vista-accent mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:mb-6 md:h-12 md:w-12">
            <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <h2 className="text-vista-primary mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
            Know the Cost Before You Commit
          </h2>
          <p className="text-vista-text/70 text-base leading-relaxed md:text-lg">
            As you customize interiors, Vista automatically estimates furniture
            prices based on real online listings. Validate your ideas before
            committing.
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
          className="order-2 flex justify-center md:order-1"
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
  );
}
