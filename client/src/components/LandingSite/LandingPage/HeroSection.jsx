import React, { useRef, useEffect } from 'react'; // Import React, useRef, and useEffect hooks
import heroVideo from "../../../assets/Hero.mp4"; // Import the video file for the hero section

// Define styles for the HeroSection
const styles = {
  container: {
    height: '90vh', // Full viewport height
    width: '100vw',  // Full viewport width
    position: 'relative', // Position relative for child absolute positioning
    overflow: 'hidden', // Hide overflow to avoid scroll bars
    display: 'flex', // Use flexbox to center content
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    textAlign: 'center', // Center text alignment
    color: 'white', // Set text color to white
  },
  video: {
    position: 'absolute', // Position video absolutely to cover the container
    top: '50%', // Center video vertically
    left: '50%', // Center video horizontally
    width: '120%', // Scale the width to create a zoom-out effect
    height: '120%', // Scale the height to create a zoom-out effect
    objectFit: 'cover', // Ensure the video covers the container without distortion
    transform: 'translate(-50%, -50%) scale(1)', // Center the video and apply zoom-out effect
    zIndex: -1, // Place video behind other content
  },
  overlay: {
    position: 'absolute', // Position overlay absolutely to cover the container
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better text visibility
    zIndex: 1, // Place overlay above the video
  },
  heading: {
    fontSize: '3rem', // Set font size for the heading
    marginBottom: '1.5rem', // Add space below the heading
    fontWeight: 'bold', // Set font weight to bold
    textTransform: 'uppercase', // Transform text to uppercase
    zIndex: 2, // Place heading above other content
  },
};

function HeroSection() {
  const videoRef = useRef(null); // Create a ref for the video element

  // Effect to adjust video playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Set the playback rate to 1.5x speed
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <main style={styles.container}>
      <video
        ref={videoRef} // Attach ref to video element
        src={heroVideo} // Set video source
        autoPlay // Automatically play the video
        loop // Loop the video indefinitely
        muted // Mute the video
        style={styles.video} // Apply video styles
      />
    </main>
  );
}

export { HeroSection }; // Export the HeroSection component
