
import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../types';
import { getNews } from '../services/contentService';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';

export const NewsUpdates: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedNews = await getNews();
        setNews(fetchedNews);
      } catch (e) {
        setError('Failed to load news updates.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Latest Updates</h2>
        {isLoading && <Card><LoadingSpinner text="Fetching latest news..." /></Card>}
        {error && <Card><div className="text-center text-red-500">{error}</div></Card>}
        {!isLoading && !error && (
            <div className="space-y-4">
                {news.map((item, index) => (
                    <Card key={index}>
                        <p className="text-sm text-slate-500 mb-1">{item.date}</p>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{item.headline}</h3>
                        <p className="text-slate-600">{item.summary}</p>
                    </Card>
                ))}
            </div>
        )}
    </div>
  );
};
