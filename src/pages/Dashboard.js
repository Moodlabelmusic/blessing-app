import React, { useEffect, useState, useTransition } from "react";
import Login from "../components/Login";
import QuestionCard from "../components/QuestionCard";
import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import { isAuthenticated } from "../services/auth";
import "./Dashboard.css";
import { getState, updateState } from "../services/data";
import Title from "../components/Title";

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [question, setQuestion] = useState();
  const [nextQuestion, setNextQuestion] = useState();

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
    try {
      const { question, nextQuestion } = await getState();
      setStep(question?.id ?? nextQuestion?.id)
      setQuestion(question);
      setNextQuestion(nextQuestion);
    } catch (err) {
    }
  }

  useEffect(() => {
    getCurrentState();
  }, [])

  return (
    <div className="dashboard-container">
      <Title />
      {/* Hide steps on login page */}
      {isAuthenticated() && <Header currentStep={step} />}

      <div className={`content-container ${isPending ? "fading" : ""}`}>
        {/* Render only the active component */}
        {!isAuthenticated() && <Login onLogin={getCurrentState}/>}
        {isAuthenticated() && question && !question?.isDone && (
          <QuestionCard 
            question={question?.question}
            correctAnswer={question?.answer}
            onCorrect={() => handleNextStep()} 
          />
        )}

        {isAuthenticated() && ((question && question.isDone) || !question) && (
          <MediaCard mediaType={question?.media ? "video" : ""} mediaSrc={question?.media} type="image" targetDate={nextQuestion?.startDate}/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
