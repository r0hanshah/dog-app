import React, { useState } from 'react';

const Quiz = ({ setSelectedBreeds }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [breedScores, setBreedScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [resultBreed, setResultBreed] = useState('');

  const questions = [
    {
      question: "What's your favorite activity?",
      options: [
        { answer: 'Running outdoors', breeds: ['Terrier'] },
        { answer: 'Sleeping on the couch', breeds: ['Bulldog'] },
        { answer: 'Playing fetch', breeds: ['Retriever'] },
        { answer: 'Learning new tricks', breeds: ['Husky'] },
        { answer: 'Socializing with friends', breeds: ['Poodle'] },
      ],
    },
    {
      question: 'How would your friends describe you?',
      options: [
        { answer: 'Energetic', breeds: ['Terrier'] },
        { answer: 'Laid-back', breeds: ['Bulldog'] },
        { answer: 'Loyal', breeds: ['Retriever'] },
        { answer: 'Intelligent', breeds: ['Husky'] },
        { answer: 'Friendly', breeds: ['Poodle'] },
      ],
    },
    {
      question: "What's your ideal environment?",
      options: [
        { answer: 'Open spaces', breeds: ['Terrier'] },
        { answer: 'Cozy indoors', breeds: ['Bulldog'] },
        { answer: 'By the water', breeds: ['Retriever'] },
        { answer: 'In a classroom', breeds: ['Husky'] },
        { answer: 'At a party', breeds: ['Poodle'] },
      ],
    },
  ];

  const handleAnswerSelection = (selectedBreeds) => {
    // Update breed scores
    const newScores = { ...breedScores };
    selectedBreeds.forEach((breed) => {
      newScores[breed] = (newScores[breed] || 0) + 1;
    });
    setBreedScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Determine the breed with the highest score
      const maxScore = Math.max(...Object.values(newScores));
      const topBreeds = Object.keys(newScores).filter(
        (breed) => newScores[breed] === maxScore
      );

      const finalBreed = topBreeds[0]; // If tie, pick the first one
      console.log('finalBreed:', finalBreed);
      setResultBreed(finalBreed);
      setSelectedBreeds([finalBreed]);
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>You are a {resultBreed}!</h2>
        <p>Here are some pictures of {resultBreed}s</p>
        {/* The Gallery component will display the images */}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <h1>What Dog are you Quiz:</h1> {/* Added the header here */}
      <h2>{currentQuestion.question}</h2>
      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className="quiz-option-button"
            onClick={() => handleAnswerSelection(option.breeds)}
          >
            {option.answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
