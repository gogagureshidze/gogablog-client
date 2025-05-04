import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [subtext, setSubtext] = useState("");
  const fullText = "<Loading... />";
  const subFullText =
    "We apologise for the temporary technical issue. Some server request usually takes a bit longer than usual. Please wait...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          let subIndex = 0;
          const subInterval = setInterval(() => {
            setSubtext(subFullText.substring(0, subIndex));
            subIndex++;

            if (subIndex > subFullText.length) {
              clearInterval(subInterval);
              setTimeout(() => {
                onComplete();
              }, 2000);
            }
          }, 40);
        }, 12000);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-text-wrapper">
        <div className="loading-text">
          {text}
          <span className="cursor-blink">|</span>
        </div>
        <div className="loading-subtext">{subtext}</div>
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill"></div>
      </div>
    </div>
  );
};
