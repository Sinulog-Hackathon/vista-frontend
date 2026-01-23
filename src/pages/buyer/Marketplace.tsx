import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MarketplaceSearch } from "../../features/buyer/components/MarketplaceSearch";
import { PropertyCard } from "../../features/buyer/components/PropertyCard";
import type { Property } from "../../features/buyer/types/property.types";

// NOTE: In a real app, this would come from an API hook like useProperties()
const MOCK_PROPERTIES: Property[] = [
  {
    propertyId: "prop_1",
    name: "Modern Beachfront Villa",
    address: "123 Ocean Drive, Cebu City, Cebu",
    price: 15000000,
    listingType: "For Sale",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    floorArea: 250,
    lotArea: 500,
    description: "Beautiful modern villa with ocean views",
    image: {
      id: "img_1",
      filename: "villa.jpg",
      url: "https://media.istockphoto.com/id/2253745545/photo/luxurious-beachfront-villa-with-infinity-pool.jpg?s=1024x1024&w=is&k=20&c=I7VDvqlRuPW4H9PG_xi7HMS7Y--4Tc_FGF8Q3ilWm5g=",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Semi-furnished",
    parkingSlots: 2,
    yearBuilt: 2020,
    priceNegotiable: true,
  },
  {
    propertyId: "prop_2",
    name: "Luxury Condo in IT Park",
    address: "456 Park Avenue, Cebu IT Park, Cebu City",
    price: 8500000,
    listingType: "For Sale",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    floorArea: 120,
    lotArea: 0,
    description: "Modern condo unit with great amenities",
    image: {
      id: "img_2",
      filename: "condo.jpg",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Fully-furnished",
    parkingSlots: 1,
    yearBuilt: 2021,
    priceNegotiable: false,
  },
  {
    propertyId: "prop_3",
    name: "Spacious House and Lot",
    address: "789 Garden Street, Mandaue City, Cebu",
    price: 12000000,
    listingType: "For Sale",
    propertyType: "House",
    bedrooms: 5,
    bathrooms: 4,
    floorArea: 300,
    lotArea: 400,
    description: "Perfect for growing families",
    image: {
      id: "img_3",
      filename: "house.jpg",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Unfurnished",
    parkingSlots: 3,
    yearBuilt: 2019,
    priceNegotiable: true,
  },
  {
    propertyId: "prop_4",
    name: "Studio Unit for Rent",
    address: "321 Business Park, Cebu City, Cebu",
    price: 25000,
    listingType: "For Rent",
    propertyType: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 35,
    lotArea: 0,
    description: "Cozy studio perfect for professionals",
    image: {
      id: "img_4",
      filename: "studio.jpg",
      url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2000&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Fully-furnished",
    parkingSlots: 0,
    yearBuilt: 2022,
    priceNegotiable: false,
  },
  {
    propertyId: "prop_5",
    name: "Townhouse in Talamban",
    address: "555 Hillside Drive, Talamban, Cebu City",
    price: 6500000,
    listingType: "For Sale",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    floorArea: 150,
    lotArea: 80,
    description: "Affordable townhouse in a quiet neighborhood",
    image: {
      id: "img_5",
      filename: "townhouse.jpg",
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Semi-furnished",
    parkingSlots: 1,
    yearBuilt: 2021,
    priceNegotiable: true,
  },
  {
    propertyId: "prop_6",
    name: "Penthouse at Ayala Center",
    address: "888 Cebu Business Park, Cebu City, Cebu",
    price: 35000000,
    listingType: "For Sale",
    propertyType: "Condo",
    bedrooms: 3,
    bathrooms: 3,
    floorArea: 280,
    lotArea: 0,
    description: "Luxury penthouse with panoramic city views",
    image: {
      id: "img_6",
      filename: "penthouse.jpg",
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Fully-furnished",
    parkingSlots: 2,
    yearBuilt: 2023,
    priceNegotiable: false,
  },
  {
    propertyId: "prop_7",
    name: "Family Home in Lahug",
    address: "234 Sunrise Street, Lahug, Cebu City",
    price: 18000000,
    listingType: "For Sale",
    propertyType: "House",
    bedrooms: 6,
    bathrooms: 5,
    floorArea: 400,
    lotArea: 600,
    description: "Spacious family home with large garden",
    image: {
      id: "img_7",
      filename: "family-home.jpg",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Unfurnished",
    parkingSlots: 4,
    yearBuilt: 2018,
    priceNegotiable: true,
  },
  {
    propertyId: "prop_8",
    name: "Affordable Apartment",
    address: "677 Urban Street, Mabolo, Cebu City",
    price: 18000,
    listingType: "For Rent",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    floorArea: 55,
    lotArea: 0,
    description: "Budget-friendly apartment near schools",
    image: {
      id: "img_8",
      filename: "apartment.jpg",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      thumbnailUrl: null,
      imageType: "regular",
    },
    images: [],
    status: "active",
    furnishing: "Semi-furnished",
    parkingSlots: 1,
    yearBuilt: 2020,
    priceNegotiable: false,
  },
];

export default function Marketplace() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <div className="sticky top-0 z-30 w-full border-b border-gray-100 bg-white py-4 shadow-sm">
        <div className="mx-auto px-4 md:px-8">
          <MarketplaceSearch />
        </div>
      </div>

      {/* 2. Main Content */}
      <main className="mx-auto max-w-full px-4 py-8 md:px-8">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-vista-primary text-2xl font-bold">
            Popular homes in Cebu
          </h2>
        </div>

        {/* 3. Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 bg-white p-2 shadow-lg transition-all hover:border-gray-900 hover:shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 bg-white p-2 shadow-lg transition-all hover:border-gray-900 hover:shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {MOCK_PROPERTIES.map((property, index) => (
              <div
                key={property.propertyId}
                className="animate-fade-in-up w-[280px] flex-shrink-0 opacity-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
