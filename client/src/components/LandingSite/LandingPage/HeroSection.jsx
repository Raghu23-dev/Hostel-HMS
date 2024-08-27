import React from "react";

// Define the keyframes and text gradient styles using inline CSS
const styles = {
  textGradient: {
    background: 'linear-gradient(90deg, #ff0081, #ff8c00, #00d084, #00aaff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    animation: 'gradientText 2s linear infinite',
  },
  container: {
    height: '82vh', // Full viewport height
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
    padding: '0 1rem',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    display: 'inline-block',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  requestButton: {
    backgroundColor: 'transparent',
    border: '2px solid #3b82f6',
    color: '#3b82f6',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

// Keyframes for gradient text animation
const gradientTextKeyframes = `
@keyframes gradientText {
  0% { color: #ff0081; }
  25% { color: #ff8c00; }
  50% { color: #00d084; }
  75% { color: #00aaff; }
  100% { color: #ff0081; }
}
`;

// Add keyframes to the document head
const addKeyframes = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(gradientTextKeyframes));
  document.head.appendChild(style);
};

// Execute keyframes addition
addKeyframes();

function HeroSection() {
  return (
    <main style={styles.container}>
      <h1 style={{ ...styles.heading, ...styles.textGradient }}>
        Hostel <span style={{ color: '#3b82f6' }}>Management</span> System
      </h1>
      <div style={styles.buttonContainer}>
        <a
          href="/auth/login"
          style={{ ...styles.button, ...styles.loginButton }}
          className="hover:scale-105 hover:shadow-lg"
        >
          Login
        </a>
        <a
          href="/auth/request"
          style={{ ...styles.button, ...styles.requestButton }}
          className="hover:scale-105 hover:shadow-lg"
        >
          Request Registration
        </a>
      </div>
    </main>
  );
}

export { HeroSection };
