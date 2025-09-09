
import React from 'react';
import type { ResourceItem } from '../types';
import { Card } from './Card';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';


const resources: ResourceItem[] = [
  {
    title: 'National Commission for Scheduled Tribes',
    description: 'The official body for safeguarding the interests of Scheduled Tribes in India.',
    url: 'https://ncst.nic.in/',
  },
  {
    title: 'Ministry of Tribal Affairs',
    description: 'The nodal ministry for the overall policy, planning, and coordination of programs for the development of STs.',
    url: 'https://tribal.nic.in/',
  },
  {
    title: 'State Tribal Welfare Departments',
    description: 'Each state has its own department. Search for your state\'s specific portal for local information.',
    url: 'https://www.google.com/search?q=state+tribal+welfare+department',
  },
  {
    title: 'National Tribal Research Institute',
    description: 'Provides research, training, and information on tribal issues.',
    url: 'https://ntri.tribal.gov.in/',
  },
];

export const Resources: React.FC = () => {
  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Official Resources</h2>
        <div className="space-y-4">
            {resources.map((resource, index) => (
                <Card key={index}>
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                                {resource.title}
                            </h3>
                            <ExternalLinkIcon />
                        </div>
                        <p className="text-slate-600 mt-1">{resource.description}</p>
                    </a>
                </Card>
            ))}
        </div>
    </div>
  );
};
