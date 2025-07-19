import React from "react";

const LoadingAnimation = () => {
  return (
    <>
      <style>{`
        @keyframes loading-wave-animation {
          0% { height: 10px; }
          50% { height: 50px; }
          100% { height: 10px; }
        }

        .loading-bar {
          animation: loading-wave-animation 1s ease-in-out infinite;
        }

        .loading-bar:nth-child(2) {
          animation-delay: 0.1s;
        }

        .loading-bar:nth-child(3) {
          animation-delay: 0.2s;
        }

        .loading-bar:nth-child(4) {
          animation-delay: 0.3s;
        }
      `}</style>

      <div className="fixed flex-col inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-secondary">
        <div className="flex items-center justify-center w-[300px] h-[100px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`loading-bar w-5 h-[10px] mx-[5px] bg-primary rounded-md`}
            />
          ))}
        </div>
        <p className="text-secondary px-4 py-2 bg-primary rounded-xl">
          Loading...{" "}
        </p>
      </div>
    </>
  );
};

export default LoadingAnimation;
