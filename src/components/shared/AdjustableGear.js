import React, {useState, useEffect} from "react";

const AdjustableGear = ({
  initialTeethCount = 12,
  initialSizeMm = 100,
  maxTeeth = 100,
  initialInnerCircleColor = "#555555",
  initialInnerCircleDiameterMm = 32.8, // Initial inner circle diameter in mm
}) => {
  const [teeth, setTeeth] = useState(initialTeethCount);
  const [sizeMm, setSizeMm] = useState(initialSizeMm);
  const [svgSize, setSvgSize] = useState(183); // Initial SVG size
  const [innerCircleColor, setInnerCircleColor] = useState(
    initialInnerCircleColor
  );
  const [innerCircleDiameterMm, setInnerCircleDiameterMm] = useState(
    initialInnerCircleDiameterMm
  );

  useEffect(() => {
    setSvgSize(sizeMm * (183 / 100)); // Scale SVG size proportionally
  }, [sizeMm]);

  const pitchRadius = svgSize * 0.3825; // Average of inner and outer radius
  const addendum = svgSize * 0.0545; // Difference between pitch and outer radius
  const dedendum = svgSize * 0.0545; // Difference between pitch and inner radius
  const innerCircleRadius = (innerCircleDiameterMm / sizeMm) * (svgSize / 2);

  const generateGearPath = (teeth, pitchRadius, addendum, dedendum) => {
    const center = svgSize / 2;
    let path = "";

    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / teeth) * Math.PI * 2;

      // Outer points
      const outerX1 = center + (pitchRadius + addendum) * Math.cos(angle);
      const outerY1 = center + (pitchRadius + addendum) * Math.sin(angle);
      const outerX2 = center + (pitchRadius + addendum) * Math.cos(nextAngle);
      const outerY2 = center + (pitchRadius + addendum) * Math.sin(nextAngle);

      // Inner points
      const innerX1 =
        center + (pitchRadius - dedendum) * Math.cos(angle + 0.05);
      const innerY1 =
        center + (pitchRadius - dedendum) * Math.sin(angle + 0.05);
      const innerX2 =
        center + (pitchRadius - dedendum) * Math.cos(nextAngle - 0.05);
      const innerY2 =
        center + (pitchRadius - dedendum) * Math.sin(nextAngle - 0.05);

      if (i === 0) {
        path += `M ${outerX1} ${outerY1} `;
      }

      path += `L ${innerX1} ${innerY1} `;
      path += `L ${innerX2} ${innerY2} `;
      path += `L ${outerX2} ${outerY2} `;
    }

    path += "Z";
    return path;
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={generateGearPath(teeth, pitchRadius, addendum, dedendum)}
          fill="url(#gearGradient)"
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={innerCircleRadius}
          fill={innerCircleColor}
        />
        <defs>
          <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8B8B8" />
            <stop offset="100%" stopColor="#7A7A7A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-4 w-full max-w-xs">
        <label
          htmlFor="teethSlider"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Number of teeth: {teeth}
        </label>
        <input
          id="teethSlider"
          type="range"
          min="4"
          max={maxTeeth}
          value={teeth}
          onChange={(e) => setTeeth(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="mt-4 w-full max-w-xs">
        <label
          htmlFor="sizeSlider"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gear Size: {sizeMm} mm
        </label>
        <input
          id="sizeSlider"
          type="range"
          min="50"
          max="200"
          value={sizeMm}
          onChange={(e) => setSizeMm(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="mt-4 w-full max-w-xs">
        <label
          htmlFor="innerCircleColor"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Inner Circle Color
        </label>
        <input
          id="innerCircleColor"
          type="color"
          value={innerCircleColor}
          onChange={(e) => setInnerCircleColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
      <div className="mt-4 w-full max-w-xs">
        <label
          htmlFor="innerCircleDiameterSlider"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Inner Circle Diameter: {innerCircleDiameterMm.toFixed(1)} mm
        </label>
        <input
          id="innerCircleDiameterSlider"
          type="range"
          min="1"
          max={sizeMm - 1}
          step="0.1"
          value={innerCircleDiameterMm}
          onChange={(e) => setInnerCircleDiameterMm(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AdjustableGear;
