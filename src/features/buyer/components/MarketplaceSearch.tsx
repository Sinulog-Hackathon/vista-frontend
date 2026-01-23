import { Search } from "lucide-react";

export function MarketplaceSearch() {
  return (
    <div className="shadow-soft mx-auto flex w-full max-w-4xl items-center rounded-full border border-gray-200 bg-white px-2 py-1 transition-shadow hover:shadow-md">
      {/* Location */}
      <div className="flex-1 cursor-pointer border-r border-gray-200 px-4 py-1.5 hover:bg-gray-50">
        <div className="text-xs font-semibold text-gray-800">Location</div>
        <div className="truncate text-sm text-gray-500">City or Address</div>
      </div>

      {/* Property Type */}
      <div className="flex-1 cursor-pointer border-r border-gray-200 px-4 py-1.5 hover:bg-gray-50">
        <div className="text-xs font-semibold text-gray-800">Type</div>
        <div className="truncate text-sm text-gray-500">House, Condo...</div>
      </div>

      {/* Price Range */}
      <div className="flex-1 cursor-pointer border-r border-gray-200 px-4 py-1.5 hover:bg-gray-50">
        <div className="text-xs font-semibold text-gray-800">Price</div>
        <div className="truncate text-sm text-gray-500">Any range</div>
      </div>

      {/* Bedrooms */}
      <div className="flex flex-1 cursor-pointer items-center justify-between pr-2 pl-4 hover:bg-gray-50">
        <div className="flex flex-col py-1.5">
          <div className="text-xs font-semibold text-gray-800">Bedrooms</div>
          <div className="truncate text-sm text-gray-500">Any</div>
        </div>

        {/* Search Button */}
        <button className="bg-vista-primary hover:bg-opacity-90 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors">
          <Search className="h-4 w-4 font-bold" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
