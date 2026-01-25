/**
 * Staging Session Storage Utility
 * Manages virtual staging sessions in localStorage to avoid creating duplicate sessions
 */

interface StagingSessionData {
  sessionId: string;
  propertyId: string;
  createdAt: number;
  lastAccessedAt: number;
}

const STORAGE_PREFIX = "vista_staging_session_";
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Get session ID for a property from localStorage
 */
export const getStagingSessionId = (propertyId: string): string | null => {
  const storageKey = `${STORAGE_PREFIX}${propertyId}`;
  const stored = localStorage.getItem(storageKey);

  if (!stored) return null;

  try {
    const data: StagingSessionData = JSON.parse(stored);

    // Check if session has expired
    if (Date.now() - data.createdAt > SESSION_EXPIRY_MS) {
      console.log("🔄 Staging session expired, removing from storage");
      localStorage.removeItem(storageKey);
      return null;
    }

    // Update last accessed time
    data.lastAccessedAt = Date.now();
    localStorage.setItem(storageKey, JSON.stringify(data));

    return data.sessionId;
  } catch (error) {
    console.error("Failed to parse stored session data:", error);
    localStorage.removeItem(storageKey);
    return null;
  }
};

/**
 * Store a new staging session in localStorage
 */
export const storeStagingSession = (
  propertyId: string,
  sessionId: string
): void => {
  const storageKey = `${STORAGE_PREFIX}${propertyId}`;
  const data: StagingSessionData = {
    sessionId,
    propertyId,
    createdAt: Date.now(),
    lastAccessedAt: Date.now(),
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    console.log("✅ Stored staging session:", sessionId);
  } catch (error) {
    console.error("Failed to store session:", error);
  }
};

/**
 * Remove a staging session from localStorage
 */
export const removeStagingSession = (propertyId: string): void => {
  const storageKey = `${STORAGE_PREFIX}${propertyId}`;
  try {
    localStorage.removeItem(storageKey);
    console.log("✅ Removed staging session from storage");
  } catch (error) {
    console.error("Failed to remove session:", error);
  }
};

/**
 * Clear all staging sessions from localStorage
 */
export const clearAllStagingSessions = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log("✅ Cleared all staging sessions");
  } catch (error) {
    console.error("Failed to clear sessions:", error);
  }
};
