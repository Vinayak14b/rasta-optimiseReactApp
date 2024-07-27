export const getUserLocation = () => {
  const locationArray = [];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Store the coordinates in the array
        locationArray.push({ latitude, longitude });

        // Now, you can send this location data to your server or perform any other actions
      },
      (error) => {
        console.error(`Error getting user location: ${error.message}`);
        // Handle errors, e.g., display a message to the user
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser');
    // Handle the case where geolocation is not supported
  }

  // Return the array containing latitude and longitude
  return locationArray;
};
