function Loader() {
    return (
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 mr-2 text-blue-600"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect
            x="15"
            y="40"
            width="10"
            height="20"
            fill="currentColor"
            className="animate-bar1"
          />
          <rect
            x="35"
            y="40"
            width="10"
            height="20"
            fill="currentColor"
            className="animate-bar2"
          />
          <rect
            x="55"
            y="40"
            width="10"
            height="20"
            fill="currentColor"
            className="animate-bar3"
          />
          <rect
            x="75"
            y="40"
            width="10"
            height="20"
            fill="currentColor"
            className="animate-bar4"
          />
        </g>
        <style jsx>{`
          @keyframes bar1 {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.5); }
          }
          @keyframes bar2 {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.5); }
          }
          @keyframes bar3 {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.5); }
          }
          @keyframes bar4 {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.5); }
          }
          .animate-bar1 {
            animation: bar1 1.2s infinite ease-in-out;
          }
          .animate-bar2 {
            animation: bar2 1.2s infinite ease-in-out;
            animation-delay: 0.2s;
          }
          .animate-bar3 {
            animation: bar3 1.2s infinite ease-in-out;
            animation-delay: 0.4s;
          }
          .animate-bar4 {
            animation: bar4 1.2s infinite ease-in-out;
            animation-delay: 0.6s;
          }
        `}</style>
      </svg>
    );
  }
  
  export { Loader };
  