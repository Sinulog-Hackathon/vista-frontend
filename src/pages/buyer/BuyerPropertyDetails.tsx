import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  BedDouble,
  Bath,
  Home,
  Car,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  School,
  ShoppingBag,
  Star,
  Check,
  Sparkles,
  FileText,
  CreditCard,
  Calendar,
  PawPrint,
  Cigarette,
  Building2,
  Globe,
  Clock,
  Hospital,
  Bus,
  Briefcase,
  Wand2,
} from "lucide-react";
import type { Property, PropertyImage } from "../../types/property";
import { getProperty } from "../../services/propertyService";
import { virtualStagingService } from "../../services/virtualStagingService";
import {
  getStagingSessionId,
  storeStagingSession,
} from "../../utils/stagingSessionStorage";

// Header Component
function PropertyHeader() {
  return (
    <div className="bg-vista-bg/80 sticky top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <button
          onClick={() => window.history.back()}
          className="text-vista-text/50 hover:text-vista-primary group flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
      </div>
    </div>
  );
}

// Property Title Section
function PropertyTitleSection({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-vista-accent rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          {property.listingType}
        </span>
        <span className="text-vista-text/40 text-xs">•</span>
        <span className="text-vista-text/60 text-sm">
          {property.propertyType}
        </span>
      </div>

      <h1 className="text-vista-primary text-3xl leading-tight font-bold tracking-tight md:text-4xl">
        {property.name}
      </h1>

      <div className="text-vista-text/60 flex items-center gap-1.5">
        <MapPin className="h-4 w-4" />
        <p className="text-sm">{property.address}</p>
      </div>
    </motion.div>
  );
}

// Quick Stats Component
function PropertyQuickStats({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="border-vista-text/10 flex items-center justify-between border-y py-6"
    >
      {[
        { icon: BedDouble, value: property.bedrooms, label: "Beds" },
        { icon: Bath, value: property.bathrooms, label: "Baths" },
        { icon: Home, value: `${property.floorArea}m²`, label: "Area" },
        { icon: Car, value: property.parkingSlots || 0, label: "Parking" },
      ].map((stat, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <stat.icon className="text-vista-accent h-5 w-5" />
          <div>
            <p className="text-vista-primary text-lg font-semibold">
              {stat.value}
            </p>
            <p className="text-vista-text/50 text-xs">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// About Section
function PropertyAbout({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <h2 className="text-vista-primary text-xl font-semibold">About</h2>
      <p className="text-vista-text/70 text-[15px] leading-relaxed">
        {property.description || "No description available for this property."}
      </p>
    </motion.div>
  );
}

// Details Section
function PropertyDetails({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="space-y-5"
    >
      <h2 className="text-vista-primary text-xl font-semibold">Details</h2>
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        {[
          { label: "Property Type", value: property.propertyType },
          { label: "Furnishing", value: property.furnishing || "Unfurnished" },
          { label: "Condition", value: property.condition || "N/A" },
          {
            label: "Lot Area",
            value: property.lotArea ? `${property.lotArea}m²` : "N/A",
          },
          { label: "Year Built", value: property.yearBuilt || "N/A" },
          { label: "Storeys", value: property.storeys || "N/A" },
        ].map((detail, idx) => (
          <div
            key={idx}
            className="border-vista-text/5 flex items-center justify-between border-b py-2"
          >
            <span className="text-vista-text/50 text-sm">{detail.label}</span>
            <span className="text-vista-primary text-sm font-medium">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Features & Amenities Section
function PropertyFeaturesAmenities({ property }: { property: Property }) {
  if (
    !(
      (property.amenities && property.amenities.length > 0) ||
      (property.buildingAmenities && property.buildingAmenities.length > 0) ||
      (property.interiorFeatures && property.interiorFeatures.length > 0) ||
      (property.utilities && property.utilities.length > 0)
    )
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="shadow-vista-primary/5 space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-vista-primary text-xl font-semibold">
        Features & Amenities
      </h2>

      {property.amenities && property.amenities.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-vista-text/60 text-xs font-medium tracking-wider uppercase">
            General Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="bg-vista-accent/5 text-vista-text/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
              >
                <Check className="text-vista-accent h-3.5 w-3.5" />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.interiorFeatures && property.interiorFeatures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-vista-text/60 text-xs font-medium tracking-wider uppercase">
            Interior Features
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.interiorFeatures.map((feature, idx) => (
              <span
                key={idx}
                className="bg-vista-accent/5 text-vista-text/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
              >
                <Check className="text-vista-accent h-3.5 w-3.5" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.buildingAmenities && property.buildingAmenities.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-vista-text/60 text-xs font-medium tracking-wider uppercase">
            Building / Community
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.buildingAmenities.map((amenity, idx) => (
              <span
                key={idx}
                className="bg-vista-accent/5 text-vista-text/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
              >
                <Check className="text-vista-accent h-3.5 w-3.5" />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.utilities && property.utilities.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-vista-text/60 text-xs font-medium tracking-wider uppercase">
            Utilities Included
          </h3>
          <div className="flex flex-wrap gap-2">
            {property.utilities.map((utility, idx) => (
              <span
                key={idx}
                className="bg-vista-accent/5 text-vista-text/80 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
              >
                <Check className="text-vista-accent h-3.5 w-3.5" />
                {utility}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Nearby Section
function PropertyNearby({ property }: { property: Property }) {
  const nearbyCategories = [
    {
      key: "schools",
      label: "Schools",
      icon: School,
      data: property.nearbySchools,
    },
    {
      key: "hospitals",
      label: "Hospitals",
      icon: Hospital,
      data: property.nearbyHospitals,
    },
    {
      key: "malls",
      label: "Shopping / Malls",
      icon: ShoppingBag,
      data: property.nearbyMalls,
    },
    {
      key: "transport",
      label: "Public Transport",
      icon: Bus,
      data: property.nearbyTransport,
    },
    {
      key: "offices",
      label: "Offices / Business",
      icon: Briefcase,
      data: property.nearbyOffices,
    },
  ];

  // Check if at least one category has data
  const hasAnyData = nearbyCategories.some(
    (cat) => cat.data && cat.data.length > 0
  );

  if (!hasAnyData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="shadow-vista-primary/5 space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-vista-primary text-xl font-semibold">
        Nearby Establishments
      </h2>
      <div className="space-y-5">
        {nearbyCategories.map((category) => (
          <div key={category.key} className="flex items-start gap-3">
            <category.icon className="text-vista-accent mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-vista-text/60 mb-1 text-sm">
                {category.label}
              </p>
              {category.data && category.data.length > 0 ? (
                <div className="space-y-1">
                  {category.data.map((place, idx) => (
                    <p
                      key={idx}
                      className="text-vista-primary text-sm font-medium"
                    >
                      {place.distance} - {place.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-vista-text/40 text-sm italic">None listed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Financial Section
function PropertyFinancial({ property }: { property: Property }) {
  if (
    !property.ownershipStatus &&
    !property.taxStatus &&
    !property.associationDues &&
    (!property.terms || property.terms.length === 0)
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="shadow-vista-primary/5 space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-vista-primary text-xl font-semibold">
        Legal & Financial
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {property.ownershipStatus && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Ownership Status</p>
              <p className="text-vista-primary font-medium">
                {property.ownershipStatus}
              </p>
            </div>
          </div>
        )}

        {property.taxStatus && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Tax Status</p>
              <p className="text-vista-primary font-medium">
                {property.taxStatus}
              </p>
            </div>
          </div>
        )}

        {property.associationDues && property.associationDues > 0 && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <CreditCard className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Association Dues</p>
              <p className="text-vista-primary font-medium">
                ₱{property.associationDues.toLocaleString()}/mo
              </p>
            </div>
          </div>
        )}
      </div>

      {property.terms && property.terms.length > 0 && (
        <div className="border-vista-text/10 border-t pt-4">
          <p className="text-vista-text/60 mb-3 text-xs font-medium tracking-wider uppercase">
            Terms & Conditions
          </p>
          <ul className="space-y-2">
            {property.terms.map((term, idx) => (
              <li
                key={idx}
                className="text-vista-text/70 flex items-start gap-2 text-sm"
              >
                <Check className="text-vista-accent mt-0.5 h-4 w-4 shrink-0" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

// Availability Section
function PropertyAvailability({ property }: { property: Property }) {
  if (
    !property.availabilityDate &&
    !property.minimumLeasePeriod &&
    !property.petPolicy &&
    !property.smokingPolicy
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="shadow-vista-primary/5 space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-vista-primary text-xl font-semibold">
        Availability & Policies
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {property.availabilityDate && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Calendar className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Available From</p>
              <p className="text-vista-primary font-medium">
                {new Date(property.availabilityDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        )}

        {property.minimumLeasePeriod && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Clock className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Minimum Lease</p>
              <p className="text-vista-primary font-medium">
                {property.minimumLeasePeriod}
              </p>
            </div>
          </div>
        )}

        {property.petPolicy && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <PawPrint className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Pet Policy</p>
              <p className="text-vista-primary font-medium">
                {property.petPolicy}
              </p>
            </div>
          </div>
        )}

        {property.smokingPolicy && (
          <div className="flex items-center gap-3">
            <div className="bg-vista-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Cigarette className="text-vista-accent h-5 w-5" />
            </div>
            <div>
              <p className="text-vista-text/50 text-xs">Smoking Policy</p>
              <p className="text-vista-primary font-medium">
                {property.smokingPolicy}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Developer Section
function PropertyDeveloper({ property }: { property: Property }) {
  if (!property.hasDeveloper || !property.developerName) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="shadow-vista-primary/5 space-y-5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-vista-primary text-xl font-semibold">
        Developer Information
      </h2>

      <div className="flex items-center gap-4">
        <div className="from-vista-primary to-vista-accent flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br">
          <Building2 className="h-7 w-7 text-white" />
        </div>
        <div>
          <h3 className="text-vista-primary text-lg font-semibold">
            {property.developerName}
          </h3>
          {property.developerYears && (
            <p className="text-vista-text/50 text-sm">
              {property.developerYears} years in business
            </p>
          )}
        </div>
      </div>

      {property.developerBio && (
        <p className="text-vista-text/70 text-sm leading-relaxed">
          {property.developerBio}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {property.developerPhone && (
          <a
            href={`tel:${property.developerPhone}`}
            className="bg-vista-primary hover:bg-vista-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
          >
            <Phone className="h-4 w-4" />
            {property.developerPhone}
          </a>
        )}
        {property.developerEmail && (
          <a
            href={`mailto:${property.developerEmail}`}
            className="bg-vista-text/5 text-vista-primary hover:bg-vista-text/10 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        )}
        {property.developerWebsite && (
          <a
            href={property.developerWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-vista-text/5 text-vista-primary hover:bg-vista-text/10 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
          >
            <Globe className="h-4 w-4" />
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
}

// Price Card Component
function PriceCard({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="shadow-vista-primary/5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <p className="text-vista-text/50 mb-1 text-xs tracking-wider uppercase">
          {property.listingType === "For Rent" ? "Monthly Rent" : "Price"}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-vista-primary text-3xl font-bold">
            ₱{property.price.toLocaleString()}
          </span>
          {property.listingType === "For Rent" && (
            <span className="text-vista-text/40 text-sm">/mo</span>
          )}
        </div>
        {property.priceNegotiable && (
          <span className="text-vista-accent mt-2 inline-block text-xs font-medium">
            Price negotiable
          </span>
        )}
        {property.associationDues && property.associationDues > 0 && (
          <p className="text-vista-text/50 mt-2 text-xs">
            + ₱{property.associationDues.toLocaleString()}/mo association dues
          </p>
        )}
      </div>

      <div className="space-y-3">
        <button className="bg-vista-primary hover:bg-vista-primary/90 hover:shadow-vista-primary/20 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg">
          Schedule a Visit
        </button>
        <button className="bg-vista-primary/5 text-vista-primary hover:bg-vista-primary/10 w-full rounded-xl py-3.5 text-sm font-semibold transition-all">
          Contact Agent
        </button>
      </div>
    </motion.div>
  );
}

// AI Staging Card Component
function AIVirtualStagingCard({
  property,
  navigate,
  sessionStatus,
  sessionError,
  onGeneratingChange,
}: {
  property: Property;
  navigate: ReturnType<typeof useNavigate>;
  sessionStatus: "idle" | "creating" | "created" | "error";
  sessionError: string | null;
  onGeneratingChange: (isGenerating: boolean) => void;
}) {
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  const handleUseCurrentSession = async () => {
    try {
      setIsLoadingSession(true);
      onGeneratingChange(true);
      setIsLoadingSession(true);

      // Get the stored session ID
      const sessionId = getStagingSessionId(property.propertyId);
      if (!sessionId) {
        console.error("No session ID found");
        return;
      }

      // Fetch the latest session data to get updated panoramic images
      const sessionResponse = await virtualStagingService.getSession(sessionId);

      // Extract panoramic images from the session
      const panoramicImages = sessionResponse.session?.panoramic_images || [];

      console.log("📸 Panoramic images from session:", panoramicImages);

      // Navigate to VR viewer with panoramic images from session
      navigate(`/vr-viewer/${property.propertyId}`, {
        state: {
          property,
          startIndex: 0,
          panoramicImagesFromSession: panoramicImages,
        },
      });
    } catch (error) {
      console.error("Error loading session data:", error);
    } finally {
      setIsLoadingSession(false);
      onGeneratingChange(false);
    }
  };

  const handleCreateNewSession = async () => {
    try {
      setIsLoadingSession(true);
      onGeneratingChange(true);

      // Navigate to VR viewer with flag to create new session
      navigate(`/vr-viewer/${property.propertyId}`, {
        state: {
          property,
          startIndex: 0,
          createNewSession: true, // Signal to create new session in VR viewer
        },
      });
    } catch (error) {
      console.error("Error navigating to VR viewer:", error);
    } finally {
      setIsLoadingSession(false);
      onGeneratingChange(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="from-vista-accent to-vista-primary relative overflow-hidden rounded-2xl bg-linear-to-br p-6 text-white"
    >
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-semibold">AI Virtual Staging</h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-white/80">
          Transform empty rooms into beautifully designed spaces with AI-powered
          staging.
        </p>

        {/* Session Status */}
        <div className="mb-4 rounded-lg bg-white/10 px-3 py-2 text-xs backdrop-blur-sm">
          {sessionStatus === "creating" && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              <span>Preparing staging session...</span>
            </div>
          )}
          {sessionStatus === "created" && (
            <div className="flex items-center gap-2 text-green-200">
              <Check className="h-4 w-4" />
              <span>Session ready</span>
            </div>
          )}
          {sessionStatus === "error" && (
            <div className="flex flex-col gap-1">
              <div className="text-red-200">
                {sessionError || "Failed to prepare session"}
              </div>
            </div>
          )}
          {sessionStatus === "idle" && <span>Loading...</span>}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <button
            onClick={handleUseCurrentSession}
            disabled={sessionStatus !== "created" || isLoadingSession}
            className="text-vista-primary flex-1 rounded-xl bg-white py-3 text-sm font-semibold transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingSession
              ? "Loading..."
              : sessionStatus === "creating"
                ? "Preparing..."
                : "Use Current Session"}
          </button>
          <button
            onClick={handleCreateNewSession}
            disabled={sessionStatus !== "created" || isLoadingSession}
            className="flex-1 rounded-xl border border-white/30 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingSession ? "Loading..." : "Create New Session"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Agent Card Component
function AgentCard({ property }: { property: Property }) {
  if (!property.agentName) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="shadow-vista-primary/5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <p className="text-vista-text/50 mb-4 text-xs tracking-wider uppercase">
        Listed by
      </p>
      <div className="mb-5 flex items-center gap-4">
        <div className="from-vista-accent to-vista-primary flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
          <span className="text-lg font-semibold text-white">
            {property.agentName.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="text-vista-primary font-semibold">
            {property.agentName}
          </h4>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-vista-text/50 text-sm">
              Real Estate Agent
            </span>
            {property.agentExperience && (
              <>
                <span className="text-vista-text/30">•</span>
                <span className="text-vista-text/50 flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {property.agentExperience}y exp
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {property.agentPhone && (
          <a
            href={`tel:${property.agentPhone}`}
            className="bg-vista-primary hover:bg-vista-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        )}
        {property.agentEmail && (
          <a
            href={`mailto:${property.agentEmail}`}
            className="bg-vista-text/5 text-vista-primary hover:bg-vista-text/10 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        )}
      </div>
    </motion.div>
  );
}
// Image Gallery Modal
function ImageGalleryModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: PropertyImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      if (e.key === "ArrowRight")
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
    };

    console.log(images[currentIndex]?.label);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:rotate-90 hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
        }}
        className="absolute left-6 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image Label - Upper Right Corner */}
      {images[currentIndex]?.label && (
        <div className="absolute top-6 right-20 z-10">
          <div className="rounded-lg bg-black/70 px-6 py-3 backdrop-blur-sm">
            <p className="text-xl font-bold text-white">
              {images[currentIndex].label}
            </p>
          </div>
        </div>
      )}

      <motion.img
        key={currentIndex}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        src={images[currentIndex]?.url}
        alt={`Property image ${currentIndex + 1}`}
        className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
        }}
        className="absolute right-6 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span>
            {currentIndex + 1} / {images.length}
          </span>
          {images[currentIndex]?.label && (
            <span className="text-vista-accent">
              • {images[currentIndex].label}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// Modern Image Gallery
function PropertyImageGallery({
  property,
  onImageExpanded,
}: {
  property: Property;
  onImageExpanded: (expanded: boolean, imageIndex: number) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const allImages: PropertyImage[] = property.images || [];
  const images = allImages.filter((img) => img.imageType === "regular");
  const panoramicImages = allImages.filter(
    (img) => img.imageType === "panoramic"
  );
  const navigate = useNavigate();
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  if (images.length === 0) {
    return (
      <div className="bg-vista-bg flex aspect-video items-center justify-center rounded-2xl">
        <p className="text-vista-text/40">No images available</p>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Main Image */}
      <div className="bg-vista-bg relative h-[600px] w-full overflow-hidden">
        <motion.img
          key={currentImageIndex}
          initial={{
            opacity: 0,
            scale: 1.02,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          src={images[currentImageIndex]?.url}
          alt={property.name}
          className="h-full w-full object-cover"
        />

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
            >
              <ChevronLeft className="text-vista-primary h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
            >
              <ChevronRight className="text-vista-primary h-5 w-5" />
            </button>
          </>
        )}

        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setIsLiked(!isLiked)}
            className={`rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all ${isLiked ? "bg-red-500 text-white" : "text-vista-text bg-white/90 hover:bg-white"}`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </motion.button>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="text-vista-text rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-md transition-all hover:bg-white"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
          <div className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            {currentImageIndex + 1} / {images.length}
          </div>
          <button
            onClick={() => onImageExpanded(true, currentImageIndex)}
            className="rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-all hover:bg-black/60"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Panoramic Thumbnails + VR Button */}
      {panoramicImages.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-vista-primary text-sm font-medium">
              Panoramic Views
            </h3>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {panoramicImages.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() =>
                  navigate(`/vr-viewer/${property.propertyId}`, {
                    state: { property, startIndex: idx },
                  })
                }
                className="group hover:border-vista-accent relative shrink-0 overflow-hidden rounded-lg border-2 border-white/20 transition-all"
              >
                <div className="h-40 w-40 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.id || `Panorama ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-1 transition-colors group-hover:bg-black/40">
                  <p className="px-1 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {img.label || img.id || `View ${idx + 1}`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// AI Staging Generation Modal
function AIStagingGenerationModal({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="from-vista-primary to-vista-accent relative w-full max-w-sm rounded-3xl bg-gradient-to-br p-8 text-center shadow-2xl"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Animated Magic Wand */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
                >
                  <Wand2 className="h-8 w-8 text-white" />
                </motion.div>
              </motion.div>

              {/* Text */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  Staging Your Space
                </h2>
                <p className="text-sm text-white/80">
                  AI is transforming your room with beautiful furniture...
                </p>
              </div>

              {/* Animated progress bar */}
              <div className="space-y-2">
                <div className="h-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full w-1/3 rounded-full bg-white"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  />
                </div>
              </div>

              {/* Fun message */}
              <p className="text-xs text-white/70 italic">
                ✨ Creating magic, please wait...
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BuyerPropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);
  const [sessionStatus, setSessionStatus] = useState<
    "idle" | "creating" | "created" | "error"
  >("idle");
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await getProperty(id);
        setProperty(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property"
        );
        console.error("Error loading property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Initialize virtual staging session when property loads
  useEffect(() => {
    if (!property) return;

    const initializeStagingSession = async () => {
      try {
        setSessionStatus("creating");
        setSessionError(null);

        // Check if session already exists in localStorage
        const existingSessionId = getStagingSessionId(property.propertyId);

        if (existingSessionId) {
          // Session exists, verify it's still valid
          try {
            await virtualStagingService.getSession(existingSessionId);
            console.log("✅ Existing staging session is valid");
            setSessionStatus("created");
            return;
          } catch (error) {
            console.warn("⚠️ Stored session invalid, creating new one");
          }
        }

        // Create new session
        const response = await virtualStagingService.createSession({
          property_id: property.propertyId,
          user_id: "guest",
          room_name: "Main Room",
        });

        storeStagingSession(property.propertyId, response.session_id);
        console.log(
          "✅ Created and stored staging session:",
          response.session_id
        );
        setSessionStatus("created");
      } catch (error: any) {
        console.error("Failed to initialize staging session:", error);
        setSessionStatus("error");
        setSessionError(error.message || "Failed to create session");
      }
    };

    initializeStagingSession();
  }, [property?.propertyId]);

  const allImages: PropertyImage[] = property?.images || [];
  if (loading) {
    return (
      <div className="bg-vista-bg flex min-h-screen items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="border-vista-accent h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
          <p className="text-vista-text/50 text-sm">Loading property...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-vista-bg flex min-h-screen items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center"
        >
          <h1 className="text-vista-primary mb-2 text-2xl font-semibold">
            Error Loading Property
          </h1>
          <p className="text-vista-text/50 mb-6 text-sm">{error}</p>
          <button
            onClick={() => navigate("/buyer/marketplace")}
            className="text-vista-accent hover:text-vista-primary text-sm font-medium transition-colors"
          >
            ← Back to Marketplace
          </button>
        </motion.div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-vista-bg flex min-h-screen items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center"
        >
          <h1 className="text-vista-primary mb-2 text-2xl font-semibold">
            Property Not Found
          </h1>
          <p className="text-vista-text/50 mb-6 text-sm">
            This property doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/buyer/marketplace")}
            className="text-vista-accent hover:text-vista-primary text-sm font-medium transition-colors"
          >
            ← Back to Marketplace
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="bg-vista-bg min-h-screen">
      {/* AI Staging Generation Modal */}
      <AIStagingGenerationModal isOpen={isGenerating} />

      <AnimatePresence>
        {isImageExpanded && (
          <ImageGalleryModal
            images={allImages}
            currentIndex={expandedImageIndex}
            onClose={() => setIsImageExpanded(false)}
            onNavigate={setExpandedImageIndex}
          />
        )}
      </AnimatePresence>

      <PropertyHeader />

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-10 lg:col-span-7">
            <PropertyTitleSection property={property} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PropertyImageGallery
                property={property}
                onImageExpanded={(expanded, imageIndex) => {
                  setIsImageExpanded(expanded);
                  setExpandedImageIndex(imageIndex);
                }}
              />
            </motion.div>

            <PropertyQuickStats property={property} />
            <PropertyAbout property={property} />
            <PropertyDetails property={property} />
            <PropertyFeaturesAmenities property={property} />
            <PropertyNearby property={property} />
            <PropertyFinancial property={property} />
            <PropertyAvailability property={property} />
            <PropertyDeveloper property={property} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 space-y-5">
              <PriceCard property={property} />
              <AIVirtualStagingCard
                property={property}
                navigate={navigate}
                sessionStatus={sessionStatus}
                sessionError={sessionError}
                onGeneratingChange={setIsGenerating}
              />
              <AgentCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
