import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons"; // Import Bootstrap icon
import "./QuestionCard.css";

const QuestionCard = ({ question, correctAnswer, onCorrect }) => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCheck, setShowCheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      setShowCheck(true); // Show checkmark icon

      // After 1 second, trigger the transition
      setTimeout(() => {
        setShowCheck(false);
        onCorrect();
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <Card className="custom-card">
      <Card.Body>
        {showCheck ? (
          <div className="checkmark-container">
            <CheckCircleFill className="checkmark-icon" />
          </div>
        ) : (
          <>
            <h3 className="question-title">{question}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="answer-input"
                />
              </Form.Group>
              <Button type="submit" className="submit-btn">Submit</Button>
            </Form>
            {isCorrect === false && <p className="error-msg">Incorrect, try again!</p>}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
