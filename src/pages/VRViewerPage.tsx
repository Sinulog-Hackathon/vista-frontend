import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { type Property } from "../types/property";
import { useState, useEffect } from "react";
import { PanoramaViewer } from "../components/PanoramaViewer";

export default function VRViewerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [property] = useState<Property | null>(
    location.state?.property || null
  );
  const [showUI, setShowUI] = useState(true);
  const [uiTimeout, setUiTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowUI(true);
      if (uiTimeout) clearTimeout(uiTimeout);
      const timeout = setTimeout(() => setShowUI(false), 3000);
      setUiTimeout(timeout);
    };

    const handleMouseLeave = () => {
      if (uiTimeout) clearTimeout(uiTimeout);
      setShowUI(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (uiTimeout) clearTimeout(uiTimeout);
    };
  }, [uiTimeout]);

  if (!property) {
    return (
      <div className="bg-vista-bg min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-vista-primary text-2xl font-bold mb-2">
              Property Not Found
            </h1>
            <button
              onClick={() => navigate("/seller/properties")}
              className="text-vista-accent hover:text-vista-primary transition-colors"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Extract panoramic images from the images array (API)
  const extractedPanoramicImages = (property.images || [])
    .filter((img: any) => img.imageType === "panoramic")
    .map((img: any) => ({
      url: img.url,
      title: img.filename || "Panoramic View",
      description: ""
    }));

  // Use extracted panoramic images if available, otherwise use the panoramicImages array (backward compatibility)
  const panoramicImages = extractedPanoramicImages.length > 0 ? extractedPanoramicImages : (property.panoramicImages || []);

  // Debug: Log the panoramic images
  console.log("Panoramic images:", panoramicImages);
  if (panoramicImages.length > 0) {
    console.log("Current image URL:", panoramicImages[currentImageIndex].url);
  }

  return (
    <div className="bg-black w-screen h-screen overflow-hidden fixed top-0 left-0">
      {/* Three.js 360 Panorama Viewer - Fullscreen */}
      {panoramicImages.length > 0 && (
        <PanoramaViewer 
          imageUrl={panoramicImages[currentImageIndex].url}
          width="100%"
          height="100%"
        />
      )}
      {panoramicImages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full text-white">
          <p>No panoramic images available</p>
        </div>
      )}

      {/* Header Overlay - Auto-hide */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 bg-linear-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <div>
              <h1 className="text-white text-xl font-bold">
                {property.name} - VR Experience
              </h1>
              <p className="text-white/70 text-sm">
                {panoramicImages.length} panoramic view
                {panoramicImages.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Panoramic Views List - Bottom Overlay - Auto-hide */}
      {panoramicImages.length > 1 && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${
            showUI ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-lg font-bold mb-4">
              Other Panoramic Views
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {panoramicImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                  className="group relative rounded-lg overflow-hidden border-2 border-white/20 hover:border-vista-accent transition-all shrink-0"
                >
                  <div className="w-24 h-24 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title || `Panoramic View ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center pb-1">
                    <p className="text-white text-xs font-medium text-center px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.title || `View ${index + 1}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
