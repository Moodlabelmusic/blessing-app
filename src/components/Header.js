import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bicycle } from "react-bootstrap-icons";
import "./Header.css";

const steps = Array.from({ length: 12 }, (_, i) => i + 1);

const Header = ({ currentStep }) => {
  const progress = currentStep / (steps.length - 1);
  const pathRef = useRef(null);
  const [bikePosition, setBikePosition] = useState({ x: 0, y: 0, angle: 0 });

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(progress * pathLength);
      const nextPoint = pathRef.current.getPointAtLength((progress * pathLength) + 1);

      // Adjusted offset to keep bike above the path
      const offsetY = -100;

      // Calculate angle for natural movement
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      
      setBikePosition({ x: point.x, y: point.y + offsetY, angle });
    }
  }, [progress]);

  return (
    <div className="header-container">
      <svg 
        className="roller-coaster" 
        viewBox="0 0 1250 500" // Increased width to 1200 to prevent clipping
        preserveAspectRatio="xMidYMid meet"
      >
        
        {/* Track now has more space at the end */}
        <path
          ref={pathRef}
          d="M 50 350 C 250 150, 500 350, 750 180 S 950 150, 1150 350"
          stroke="#ccc"
          strokeWidth="5"
          fill="transparent"
          id="trackPath"
        />

        {/* Bigger Bike - Now Fully Visible Without Clipping */}
        <motion.g
          animate={{
            x: bikePosition.x,
            y: bikePosition.y,
            rotate: bikePosition.angle
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <Bicycle size={100} color="blue" /> {/* Bike is now larger and never clipped */}
        </motion.g>
        
      </svg>
    </div>
  );
};

export default Header;
