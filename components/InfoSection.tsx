
import React from 'react';
import { Card } from './Card';

export const InfoSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <h2 className="text-2xl font-bold text-teal-700 mb-3">Welcome!</h2>
        <p className="text-slate-600">
          This application is a guide to help the Banjara community understand and access benefits under the Scheduled Tribe (ST) reservation category in India.
        </p>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold text-slate-800 mb-3">What is ST Reservation?</h3>
        <p className="text-slate-600">
          ST reservation is a form of affirmative action by the Government of India for communities classified as Scheduled Tribes. It provides reserved quotas in government jobs, educational institutions, and legislative bodies to promote their representation and upliftment.
        </p>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold text-slate-800 mb-3">How this App Helps</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <span className="font-semibold">Eligibility Checker:</span> Get a quick idea if you might be eligible.
          </li>
          <li>
            <span className="font-semibold">FAQs:</span> Answers to common questions about the process.
          </li>
          <li>
            <span className="font-semibold">Latest News:</span> Stay updated on important announcements.
          </li>
          <li>
            <span className="font-semibold">Resources:</span> Quick links to official websites.
          </li>
        </ul>
      </Card>
      <div className="text-center text-sm text-slate-500 pt-4">
        <p className="font-semibold">Disclaimer</p>
        <p>This app provides information and AI-generated guidance. It is not a substitute for official government sources or legal advice.</p>
      </div>
    </div>
  );
};
