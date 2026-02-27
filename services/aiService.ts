
import { GoogleGenAI, Type, GenerateContentParameters } from "@google/genai";
import { UserPreferences } from "../App";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYLLABUS_CONSTRAINT = `
STRICT RULES:
1. Answer ONLY from the provided syllabus or implied class-level textbook knowledge.
2. NO EXTERNAL KNOWLEDGE. If a query is unrelated to the school syllabus, respond exactly: "This topic is outside your syllabus."
3. TONE: Calm, encouraging, student-friendly, and helpful. Use local examples (e.g., local markets, village scenes) where possible.
`;

const getLanguageInstruction = (language: string) => {
  if (language === 'English') {
    return `EXPLANATION STRUCTURE:
    1. First, provide a simple, intuitive explanation in conversational English.
    2. Then, provide a formal, academic English explanation (exam-oriented phrasing).
    Separate these with "---".`;
  }
  return `EXPLANATION STRUCTURE (Language: ${language}):
  1. First, provide a simple, intuitive, and conversational explanation in ${language}. Use common local terms.
  2. Then, provide a formal academic English explanation (exam-ready phrasing).
  Separate these with "---".`;
};

export const aiService = {
  async generateLessonContent(lessonTitle: string, unitName: string, subject: string, preferences: UserPreferences) {
    const ai = getAI();
    const { selectedClass, language, learningGoal, specificGoal, learningStyle } = preferences;
    
    const prompt = `Act as an expert Grade ${selectedClass} ${subject} teacher. 
    Topic: "${lessonTitle}" (Unit: "${unitName}").
    Primary Language: ${language}.
    
    STUDENT CONTEXT:
    - Mode: ${learningGoal}
    - Specific Objective: ${specificGoal}
    - Style: ${learningStyle}

    ${SYLLABUS_CONSTRAINT}
    ${getLanguageInstruction(language)}

    Generate JSON for:
    1. "analogy": Use the Explanation Structure.
    2. "core_concept": Use the Explanation Structure.
    3. "examples": Array of 2 strings (each following the Explanation Structure).
    4. "summary": List of key takeaways (in ${language}).
    5. "bridge": List of 3 key English technical terms and their meaning in ${language}.
    6. "interactive_challenge": A thought-provoking question in ${language}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analogy: { type: Type.STRING },
            core_concept: { type: Type.STRING },
            examples: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.ARRAY, items: { type: Type.STRING } },
            bridge: { type: Type.ARRAY, items: { type: Type.STRING } },
            interactive_challenge: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text);
  },

  async generateQuiz(unitName: string, subject: string, classGrade: number, quizType: string, preferences: UserPreferences, lessonTitle?: string) {
    const ai = getAI();
    const { language } = preferences;
    const context = lessonTitle ? `Lesson: "${lessonTitle}"` : `Unit: "${unitName}"`;

    const prompt = `Generate 15 MCQs for Grade ${classGrade} ${subject}, ${context}.
    Type: "${quizType}".
    
    ${SYLLABUS_CONSTRAINT}
    ${getLanguageInstruction(language)}

    CRITICAL: For 'optionExplanations', use the Explanation Structure (Mother Tongue + English). 
    The tone must be encouraging for wrong answers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.NUMBER },
              text: { type: Type.STRING, description: `Question text in ${language}` },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER },
              optionExplanations: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  },

  async generateFlashcards(unitName: string, preferences: UserPreferences) {
    const ai = getAI();
    const { language, selectedClass } = preferences;
    
    const prompt = `Generate 5 flashcards for Grade ${selectedClass}, Topic: ${unitName}.
    ${SYLLABUS_CONSTRAINT}
    ${getLanguageInstruction(language)}

    The 'front' should be a question in ${language}.
    The 'back' MUST follow the Explanation Structure (Mother Tongue + English).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              front: { type: Type.STRING },
              back: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  },

  async generateMindMap(unitName: string, preferences: UserPreferences) {
    const ai = getAI();
    const { language } = preferences;
    
    const prompt = `Create mind map data for: ${unitName}.
    ${SYLLABUS_CONSTRAINT}
    ${getLanguageInstruction(language)}

    Node 'label' should be in ${language}.
    Node 'details' MUST follow the Explanation Structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  type: { type: Type.STRING },
                  details: { type: Type.STRING }
                }
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { from: { type: Type.STRING }, to: { type: Type.STRING } }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  },

  async sendMessageStream(message: string, history: any[], systemInstruction: string) {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: { 
        systemInstruction: `${systemInstruction}\n${SYLLABUS_CONSTRAINT}`,
        thinkingConfig: { thinkingBudget: 4000 } 
      }
    });

    return await chat.sendMessageStream({ message });
  }
};
