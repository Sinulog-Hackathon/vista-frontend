import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";

interface PanoramaViewerProps {
  imageUrl: string;
  width?: string | number;
  height?: string | number;
  onReady?: () => void;
}

function PanoramaScene({ imageUrl, onTextureLoaded }: { imageUrl: string; onTextureLoaded?: () => void }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const hasCalledOnLoad = useRef(false);

  useEffect(() => {
    hasCalledOnLoad.current = false;
    setLoadError(null);
    
    console.log("Loading panorama texture from:", imageUrl);
    
    // Use images.weserv.nl - reliable image proxy with CORS headers
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}`;
    
    console.log("Using proxy URL:", proxyUrl);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      console.log("✅ Image loaded, creating texture. Size:", img.width, "x", img.height);
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
      setLoadError(null);
      if (!hasCalledOnLoad.current) {
        hasCalledOnLoad.current = true;
        onTextureLoaded?.();
      }
    };
    
    img.onerror = (err) => {
      console.error("❌ Image load failed:", err);
      setLoadError("Failed to load panoramic image.");
    };
    
    img.src = proxyUrl;
  }, [imageUrl, onTextureLoaded]);

  if (loadError) {
    return (
      <mesh>
        <boxGeometry args={[100, 100, 100]} />
        <meshBasicMaterial color={new THREE.Color(0x333333)} />
      </mesh>
    );
  }

  if (!texture) {
    return null;
  }

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function DeviceOrientationController() {
  const { camera } = useThree();
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const alpha = useRef(0);
  const beta = useRef(0);
  const gamma = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if device supports orientation
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      isMobile.current = true;
      alpha.current = THREE.MathUtils.degToRad(event.alpha || 0); // Z axis rotation
      beta.current = THREE.MathUtils.degToRad(event.beta || 0);   // X axis rotation
      gamma.current = THREE.MathUtils.degToRad(event.gamma || 0); // Y axis rotation
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent !== "undefined" && (DeviceOrientationEvent as any).requestPermission) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permission: string) => {
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        })
        .catch(() => {
          console.log("Device orientation permission denied");
        });
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  useFrame(() => {
    if (isMobile.current) {
      // Set euler angles and convert to quaternion
      euler.current.set(beta.current, alpha.current, -gamma.current, "YXZ");
      camera.quaternion.setFromEuler(euler.current);
    }
  });

  return null;
}

export function PanoramaViewer({
  imageUrl,
  width = "100%",
  height = "100%",
  onReady,
}: PanoramaViewerProps) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div style={{ width, height, touchAction: "none", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        style={{ width: "100%", height: "100%", display: "block" }}
        gl={{ antialias: true }}
      >
        <PanoramaScene imageUrl={imageUrl} onTextureLoaded={onReady} />
        {isMobile && <DeviceOrientationController />}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          rotateSpeed={0.4}
          zoomSpeed={1}
        />
        <Preload all />
      </Canvas>
    </div>
  );
}
