import React from "react";

type SpinnerSize = "small" | "medium" | "large";

interface SpinnerProps {
  size?: SpinnerSize;
}

export default function Spinner({
  size = "medium",
}: SpinnerProps): JSX.Element {
  return (
    <div className="loader">
      <div className={`spinning-loader ${size}`} />
    </div>
  );
}
