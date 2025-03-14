import React, { useState, useTransition } from "react";
import Login from "../components/Login";
import QuestionCard from "../components/QuestionCard";
import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import { isAuthenticated } from "../auth";
import "./Dashboard.css";

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleNextStep = (nextStep) => {
    startTransition(() => setStep(nextStep)); // Ensures smooth UI transition
  };

  return (
    <div className="dashboard-container">
      {/* Hide steps on login page */}
      {isAuthenticated() && <Header currentStep={step} />}

      <div className={`content-container ${isPending ? "fading" : ""}`}>
        {/* Render only the active component */}
        {!isAuthenticated() && <Login />}
        {isAuthenticated() && step !== 12 && (
          <QuestionCard 
            question="What is the capital of France?" 
            correctAnswer="Paris" 
            onCorrect={() => handleNextStep(step+1)} 
          />
        )}
        {step === 12 && (
          <MediaCard mediaType="image" mediaSrc="https://pngimg.com/d/mario_PNG53.png" type="image" targetDate="2025-12-31T23:59:59"/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
