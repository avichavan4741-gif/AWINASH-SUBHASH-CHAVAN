
import { GoogleGenAI, Type } from "@google/genai";
import type { FaqItem, NewsItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const checkEligibility = async (answers: Record<string, string>): Promise<string> => {
  const prompt = `
    You are an expert on Indian reservation policies. A user from the Banjara community is checking their eligibility for Scheduled Tribe (ST) reservation benefits. Based on their answers below, provide a simple eligibility assessment.

    User's Answers:
    - State of Domicile: ${answers.state}
    - Has Community Certificate: ${answers.certificate}
    - Sub-caste in state's ST list: ${answers.subCaste}

    Provide your assessment in one clear paragraph. Start with a bolded "Likely Eligible," "Potentially Eligible," or "Likely Not Eligible" followed by a brief explanation. Do NOT ask for more information.
    IMPORTANT: Conclude with this exact disclaimer: "This is an AI-generated assessment and not legal advice. Please consult official government sources and a legal expert for accurate guidance."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return "There was an error processing your request. Please try again later.";
  }
};


export const getFaqs = async (): Promise<FaqItem[]> => {
  const prompt = `
    You are a helpful assistant creating content for an app about ST reservations for the Banjara community in India. Generate a list of 5 frequently asked questions (FAQs) and their answers. The answers should be clear, concise, and easy for a layperson to understand.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'The frequently asked question.'
              },
              answer: {
                type: Type.STRING,
                description: 'The answer to the question.'
              },
            },
            required: ['question', 'answer'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const faqs = JSON.parse(jsonText);
    return faqs as FaqItem[];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [
        { question: 'Error', answer: 'Could not load FAQs at this time. Please check your connection and try again.' }
    ];
  }
};

export const getNews = async (): Promise<NewsItem[]> => {
  const prompt = `
    You are a helpful assistant generating content for an app about ST reservations for the Banjara community in India. Create 3 fictional but realistic news updates or announcements related to ST reservations that would be relevant to the community. For each, provide a headline, a short summary, and a recent date.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: {
                type: Type.STRING,
                description: 'The news headline.'
              },
              summary: {
                type: Type.STRING,
                description: 'A brief summary of the news.'
              },
              date: {
                type: Type.STRING,
                description: 'A recent, realistic date for the news item (e.g., "July 15, 2024").'
              },
            },
            required: ['headline', 'summary', 'date'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const news = JSON.parse(jsonText);
    return news as NewsItem[];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [{
        headline: "Could Not Load News",
        summary: "There was an issue fetching the latest updates. Please try again later.",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }];
  }
};
