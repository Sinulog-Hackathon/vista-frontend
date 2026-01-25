import React from "react";
import type { PropertyCardData } from "../context/MarkAIContext";

interface UserSelectedPropertyCardProps {
  property: PropertyCardData;
}

export const UserSelectedPropertyCard: React.FC<
  UserSelectedPropertyCardProps
> = ({ property }) => {
  return (
    <div className="border-vista-primary flex w-full max-w-xs flex-col rounded-xl border bg-white p-4 shadow-lg">
      <div className="text-vista-primary mb-2 text-xs font-semibold">
        You selected this property
      </div>
      <div className="flex gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {property.image?.url ? (
            <img
              src={property.image.url}
              alt={property.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div
            className="line-clamp-1 text-sm font-semibold text-gray-900"
            title={property.name}
          >
            {property.name}
          </div>
          <div
            className="line-clamp-1 text-xs text-gray-600"
            title={property.address}
          >
            {property.address}
          </div>
          <div className="mt-1 text-xs text-gray-800">
            ₱{property.price.toLocaleString()}
          </div>
          <div className="mt-1 flex gap-2 text-xs text-gray-500">
            {property.bedrooms !== undefined && (
              <span>{property.bedrooms} BR</span>
            )}
            {property.bathrooms !== undefined && (
              <span>{property.bathrooms} BA</span>
            )}
            {property.floorArea !== undefined && (
              <span>{property.floorArea} sqm</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Type: {property.propertyType}
      </div>
    </div>
  );
};
