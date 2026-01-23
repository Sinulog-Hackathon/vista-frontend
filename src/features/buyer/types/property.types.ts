export interface PropertyImage {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string | null;
  imageType: "regular" | "panoramic";
}

export interface NearbyPlace {
  name: string;
  distance: string;
}

export interface Property {
  propertyId: string;
  name: string;
  address: string;
  price: number;
  listingType: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  lotArea: number;
  description: string;
  image: PropertyImage;
  images: PropertyImage[];
  status: string;
  availabilityDate?: string;
  furnishing?: string;
  parkingSlots?: number;
  parkingAvailable?: boolean;
  yearBuilt?: number;
  priceNegotiable?: boolean;
  storeys?: number;
  floorLevel?: number | null;
  condition?: string;

  // Amenities & Features
  amenities?: string[];
  buildingAmenities?: string[];
  interiorFeatures?: string[];
  utilities?: string[];

  // Terms & Policies
  terms?: string[];
  petPolicy?: string;
  smokingPolicy?: string;
  minimumLeasePeriod?: string;

  // Financial
  associationDues?: number;
  taxStatus?: string;
  ownershipStatus?: string;

  // Agent Info
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentBio?: string;
  agentExperience?: number;

  // Developer Info
  hasDeveloper?: boolean;
  developerName?: string;
  developerPhone?: string;
  developerEmail?: string;
  developerWebsite?: string;
  developerBio?: string;
  developerYears?: number;

  // Location
  latitude?: number;
  longitude?: number;
  nearbySchools?: NearbyPlace[];
  nearbyMalls?: NearbyPlace[];
  nearbyHospitals?: NearbyPlace[];
  nearbyOffices?: NearbyPlace[];
  nearbyTransport?: NearbyPlace[];

  // Metadata
  regularImageCount?: number;
  panoramicImageCount?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}
