import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Wand2, Loader2, CheckCircle, X } from "lucide-react";
import { type Property } from "../types/property";
import { useState, useEffect } from "react";
import { PanoramaViewer } from "../components/PanoramaViewer";
import { virtualStagingService, type VirtualStagingSession, type GenerateStagingRequest, type GenerateStagingResponse } from "../services/virtualStagingService";

export default function VRViewerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [property] = useState<Property | null>(
    location.state?.property || null
  );
  const [showUI, setShowUI] = useState(true);
  const [uiTimeout, setUiTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stagingSession, setStagingSession] = useState<VirtualStagingSession | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [showStagingOverlay, setShowStagingOverlay] = useState(false);
  const [stagingPrompt, setStagingPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerateStagingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // API functions
  const createStagingSession = async (propertyId: string, userId: string, roomName: string): Promise<VirtualStagingSession> => {
    const response = await virtualStagingService.createSession({
      property_id: propertyId,
      user_id: userId,
      room_name: roomName,
      style: 'modern',
      furniture_theme: 'minimalist',
    });
    return response.staging;
  };

  const generateStaging = async (request: GenerateStagingRequest): Promise<GenerateStagingResponse> => {
    return virtualStagingService.generateStaging(request);
  };

  // Create session when component mounts
  useEffect(() => {
    const initializeSession = async () => {
      if (!property) return;

      try {
        setIsCreatingSession(true);
        setError(null);
        const session = await createStagingSession(
          property.id || property.propertyId,
          'current-user', // TODO: Get from auth context
          'Living Room' // Default room name
        );
        setStagingSession(session);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create staging session');
      } finally {
        setIsCreatingSession(false);
      }
    };

    initializeSession();
  }, [property]);

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

  // Handle staging generation
  const handleGenerateStaging = async () => {
    if (!stagingSession || !stagingPrompt.trim()) return;

    try {
      setIsGenerating(true);
      setError(null);
      const result = await generateStaging({
        session_id: stagingSession.session_id,
        image_index: currentImageIndex,
        custom_prompt: stagingPrompt,
        user_message: stagingPrompt,
      });
      setGenerationResult(result);
      setStagingPrompt("");
      setShowStagingOverlay(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate staging');
    } finally {
      setIsGenerating(false);
    }
  };

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
                {stagingSession && " • Virtual Staging Ready"}
              </p>
            </div>
          </div>
          {stagingSession && (
            <button
              onClick={() => setShowStagingOverlay(true)}
              className="bg-vista-accent hover:bg-vista-accent/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Wand2 size={18} />
              Virtual Staging
            </button>
          )}
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

      {/* Virtual Staging Overlay */}
      {showStagingOverlay && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-vista-primary text-xl font-bold">
                Virtual Staging
              </h3>
              <button
                onClick={() => setShowStagingOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-vista-text/70 text-sm mb-2">
                Describe the changes you want to make to this panoramic view:
              </p>
              <textarea
                value={stagingPrompt}
                onChange={(e) => setStagingPrompt(e.target.value)}
                placeholder="e.g., Add modern furniture, warm lighting, and contemporary decor..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-vista-accent"
                disabled={isGenerating}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateStaging}
                disabled={!stagingPrompt.trim() || isGenerating}
                className="flex-1 bg-vista-accent hover:bg-vista-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Generate Staging
                  </>
                )}
              </button>
              <button
                onClick={() => setShowStagingOverlay(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isGenerating}
              >
                Cancel
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generation Result Overlay */}
      {generationResult && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-green-500" size={24} />
              <h3 className="text-vista-primary text-xl font-bold">
                Staging Generated!
              </h3>
            </div>

            <p className="text-vista-text/70 text-sm mb-4">
              Your virtual staging has been created successfully.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGenerationResult(null);
                  // TODO: Navigate to view the staged image
                }}
                className="flex-1 bg-vista-accent hover:bg-vista-accent/90 text-white py-2 px-4 rounded-lg transition-colors"
              >
                View Result
              </button>
              <button
                onClick={() => setGenerationResult(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isCreatingSession && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 text-center">
            <Loader2 size={24} className="animate-spin mx-auto mb-2 text-vista-accent" />
            <p className="text-vista-primary font-medium">Initializing Virtual Staging...</p>
            <p className="text-vista-text/70 text-sm mt-1">Setting up your session</p>
          </div>
        </div>
      )}
    </div>
  );
}
