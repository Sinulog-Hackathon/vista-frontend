import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Wand2, Loader2, CheckCircle, X } from "lucide-react";
import { type Property } from "../types/property";
import { useState, useEffect } from "react";
import { PanoramaViewer } from "../components/PanoramaViewer";
import {
  virtualStagingService,
  type VirtualStagingSession,
  type GenerateStagingRequest,
  type GenerateStagingResponse,
} from "../services/virtualStagingService";

export default function VRViewerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [property] = useState<Property | null>(
    location.state?.property || null
  );
  const [showUI, setShowUI] = useState(true);
  const [uiTimeout, setUiTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stagingSession, setStagingSession] =
    useState<VirtualStagingSession | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [showStagingOverlay, setShowStagingOverlay] = useState(true);
  const [stagingPrompt, setStagingPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] =
    useState<GenerateStagingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // API functions
  const createStagingSession = async (
    propertyId: string,
    userId: string,
    roomName: string
  ): Promise<VirtualStagingSession> => {
    const response = await virtualStagingService.createSession({
      property_id: propertyId,
      user_id: userId,
      room_name: roomName,
      style: "modern",
      furniture_theme: "minimalist",
    });
    return response.staging;
  };

  const generateStaging = async (
    request: GenerateStagingRequest
  ): Promise<GenerateStagingResponse> => {
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
          "current-user", // TODO: Get from auth context
          "Living Room" // Default room name
        );
        setStagingSession(session);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to create staging session"
        );
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
      setError(
        err instanceof Error ? err.message : "Failed to generate staging"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!property) {
    return (
      <div className="bg-vista-bg flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-vista-primary mb-2 text-2xl font-bold">
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
      description: "",
    }));

  // Use extracted panoramic images if available, otherwise use the panoramicImages array (backward compatibility)
  const panoramicImages =
    extractedPanoramicImages.length > 0
      ? extractedPanoramicImages
      : property.panoramicImages || [];

  // Debug: Log the panoramic images
  console.log("Panoramic images:", panoramicImages);
  if (panoramicImages.length > 0) {
    console.log("Current image URL:", panoramicImages[currentImageIndex].url);
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-black">
      {/* Three.js 360 Panorama Viewer - Fullscreen */}
      {panoramicImages.length > 0 && (
        <PanoramaViewer
          imageUrl={panoramicImages[currentImageIndex].url}
          width="100%"
          height="100%"
        />
      )}
      {panoramicImages.length === 0 && (
        <div className="flex h-full w-full items-center justify-center text-white">
          <p>No panoramic images available</p>
        </div>
      )}

      {/* Header Overlay - Auto-hide */}
      <div
        className={`absolute top-0 right-0 left-0 z-20 bg-linear-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showUI ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">
                {property.name} - VR Experience
              </h1>
              <p className="text-sm text-white/70">
                {panoramicImages.length} panoramic view
                {panoramicImages.length !== 1 ? "s" : ""} available
                {stagingSession && " • Virtual Staging Ready"}
              </p>
            </div>
          </div>
          {stagingSession && (
            <button
              onClick={() => setShowStagingOverlay(true)}
              className="bg-vista-accent hover:bg-vista-accent/80 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
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
          className={`absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${
            showUI ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-lg font-bold text-white">
              Other Panoramic Views
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {panoramicImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                  className="group hover:border-vista-accent relative shrink-0 overflow-hidden rounded-lg border-2 border-white/20 transition-all"
                >
                  <div className="h-24 w-24 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title || `Panoramic View ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-1 transition-colors group-hover:bg-black/40">
                    <p className="px-1 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
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
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-vista-primary text-xl font-bold">
                Virtual Staging
              </h3>
              <button
                onClick={() => setShowStagingOverlay(false)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-vista-text/70 mb-2 text-sm">
                Describe the changes you want to make to this panoramic view:
              </p>
              <textarea
                value={stagingPrompt}
                onChange={(e) => setStagingPrompt(e.target.value)}
                placeholder="e.g., Add modern furniture, warm lighting, and contemporary decor..."
                className="focus:ring-vista-accent h-24 w-full resize-none rounded-lg border border-gray-300 p-3 focus:ring-2 focus:outline-none"
                disabled={isGenerating}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateStaging}
                disabled={!stagingPrompt.trim() || isGenerating}
                className="bg-vista-accent hover:bg-vista-accent/90 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
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
                className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
                disabled={isGenerating}
              >
                Cancel
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generation Result Overlay */}
      {generationResult && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <h3 className="text-vista-primary text-xl font-bold">
                Staging Generated!
              </h3>
            </div>

            <p className="text-vista-text/70 mb-4 text-sm">
              Your virtual staging has been created successfully.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGenerationResult(null);
                  // TODO: Navigate to view the staged image
                }}
                className="bg-vista-accent hover:bg-vista-accent/90 flex-1 rounded-lg px-4 py-2 text-white transition-colors"
              >
                View Result
              </button>
              <button
                onClick={() => setGenerationResult(null)}
                className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isCreatingSession && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
          <div className="rounded-2xl bg-white p-6 text-center">
            <Loader2
              size={24}
              className="text-vista-accent mx-auto mb-2 animate-spin"
            />
            <p className="text-vista-primary font-medium">
              Initializing Virtual Staging...
            </p>
            <p className="text-vista-text/70 mt-1 text-sm">
              Setting up your session
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
