
import React, { useState, useEffect } from 'react';
import type { FaqItem } from '../types';
import { getFaqs } from '../services/contentService';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const FaqItemComponent: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <span className="font-semibold text-slate-800">{item.question}</span>
        <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-slate-50 rounded-b-lg text-slate-600">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};


export const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedFaqs = await getFaqs();
        setFaqs(fetchedFaqs);
      } catch (e) {
        setError('Failed to load FAQs.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
        <Card>
            <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Frequently Asked Questions</h2>
            {isLoading && <LoadingSpinner text="Loading FAQs..." />}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!isLoading && !error && (
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FaqItemComponent key={index} item={faq} />
                    ))}
                </div>
            )}
        </Card>
    </div>
  );
};
