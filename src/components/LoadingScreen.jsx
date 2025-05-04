import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [errorText, setErrorText] = useState(""); // State for error text animation
  const [error, setError] = useState(false); // State to track loading error
  const fullText = "<Loading... />";
  const errorFullText =
    "<We apologise for the temporary technical issue. The first server request usually takes a bit longer than usual. Please wait... />"; // Full error text for animation

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 120);

    // Set timeout to show error after 10 seconds and animate it similarly
    const timeout = setTimeout(() => {
      setError(true); // Show error after 10 seconds
      let errorIndex = 0;
      const errorInterval = setInterval(() => {
        setErrorText(errorFullText.substring(0, errorIndex));
        errorIndex++;

        if (errorIndex > errorFullText.length) {
          clearInterval(errorInterval);
        }
      }, 70);
    }, 10000);

    // Cleanup timeout and interval on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-text">
        {text}
        <span className="cursor-blink">|</span>
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill"></div>
      </div>
      {error && (
        <div className="loading-text-wrapper">
          <div className="loading-subtext">
            {errorText}
            <span className="cursor-blink">|</span>
          </div>
        </div>
      )}
    </div>
  );
};
