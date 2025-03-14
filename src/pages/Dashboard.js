import React, { useEffect, useState, useTransition } from "react";
import Login from "../components/Login";
import QuestionCard from "../components/QuestionCard";
import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import { isAuthenticated } from "../services/auth";
import "./Dashboard.css";
import { getState, updateState } from "../services/data";

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [question, setQuestion] = useState();

  const handleNextStep = async () => {
    const updatedQuestion = {
      ...question,
      isDone: true,
    }
    const result = await updateState(updatedQuestion);
    if (result) {
      startTransition(() => setQuestion(updatedQuestion)); // Ensures smooth UI transition
    }
  };

  const getCurrentState = async () => {
    const state = await getState();
    setStep(state.id)
    setQuestion(state);
  }

  useEffect(() => {
    getCurrentState();
  }, [])

  return (
    <div className="dashboard-container">
      {/* Hide steps on login page */}
      {isAuthenticated() && <Header currentStep={step} />}

      <div className={`content-container ${isPending ? "fading" : ""}`}>
        {/* Render only the active component */}
        {!isAuthenticated() && <Login onLogin={getCurrentState}/>}
        {isAuthenticated() && !question?.isDone && (
          <QuestionCard 
            question={question?.question}
            correctAnswer={question?.answer}
            onCorrect={() => handleNextStep()} 
          />
        )}

        {isAuthenticated() && question?.isDone && (
          <MediaCard mediaType="image" mediaSrc="https://pngimg.com/d/mario_PNG53.png" type="image" targetDate="2025-12-31T23:59:59"/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
