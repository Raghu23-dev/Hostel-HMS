import React, { useRef, useEffect } from 'react';
import heroVideo from "../../../assets/Hero.mp4";
// Define styles for the HeroSection
const styles = {
  container: {
    height: '90vh', // Full viewport height
    width: '100vw',  // Full viewport width
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '120%', // Scale the width to create a zoom-out effect
    height: '120%', // Scale the height to create a zoom-out effect
    objectFit: 'cover',
    transform: 'translate(-50%, -50%) scale(1)', // Center the video and apply zoom-out effect
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better text visibility
    zIndex: 1,
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    zIndex: 2,
  },
};

function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Adjust this value to change video speed
    }
  }, []);

  return (
    <main style={styles.container}>
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        style={styles.video}
      />
    </main>
  );
}

export { HeroSection };
