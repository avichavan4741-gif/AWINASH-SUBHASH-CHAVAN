
import React, { useState } from 'react';
import { Card } from './Card';
import { checkEligibility } from '../services/contentService';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './LoadingSpinner';

const questions = [
  {
    id: 'state',
    text: 'What is your state of domicile (the state you live in)?',
    options: ['Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Other'],
  },
  {
    id: 'certificate',
    text: 'Do you have a "Banjara" community certificate issued by a competent authority?',
    options: ['Yes', 'No'],
  },
  {
    id: 'subCaste',
    text: 'Is your specific Banjara sub-caste or synonym listed in your state\'s official list of Scheduled Tribes?',
    options: ['Yes', 'No', 'I don\'t know'],
  },
];

export const EligibilityChecker: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = { ...answers, [questions[currentQuestionIndex].id]: option };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const eligibilityResult = await checkEligibility(finalAnswers);
      setResult(eligibilityResult);
    } catch (e) {
      setError('Failed to get eligibility result. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetChecker = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setError(null);
    setIsLoading(false);
  }

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="animate-fade-in">
        <Card>
            <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Eligibility Checker</h2>
            { !result && !isLoading && (
              <>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s' }}></div>
                </div>
                <div className="text-center mb-6">
                    <p className="text-lg font-semibold text-slate-700">{questions[currentQuestionIndex].text}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestionIndex].options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="w-full bg-white border-2 border-teal-500 text-teal-600 font-semibold py-3 px-4 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            {option}
                        </button>
                    ))}
                </div>
              </>
            )}

            {isLoading && <LoadingSpinner text="Analyzing your answers with AI..." />}
            
            {error && <div className="text-center text-red-500">{error}</div>}

            {result && (
              <div className="text-center animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-xl font-semibold text-slate-800 mb-4">
                  <SparklesIcon />
                  <span>AI-Powered Assessment</span>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg text-slate-700 space-y-3">
                   {result.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                </div>
                <button
                  onClick={resetChecker}
                  className="mt-6 bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  Start Over
                </button>
              </div>
            )}
        </Card>
    </div>
  );
};
