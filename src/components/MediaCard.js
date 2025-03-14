import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./MediaCard.css";

const MediaCard = ({ mediaType, mediaSrc, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="custom-card">
      <Card.Body>
        <h3 className="countdown-title">Time Left:</h3>
        <div className="countdown-timer">
          <span>{String(timeLeft.days).padStart(2, "0")}d</span>
          <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
          <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
          <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
        </div>

        {mediaType === "image" ? (
          <img src={mediaSrc} alt="Media" className="media-content" />
        ) : mediaType === "video" ? (
          <video controls className="media-content">
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No media available.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
