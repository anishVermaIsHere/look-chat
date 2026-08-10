
// Function to get current coordinates
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy // In meters
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true, // Use GPS if available
          timeout: 5000,            // Wait 5 sec max
          maximumAge: 0             // Force fresh location, no cache
        }
      );
    }
  });
}