const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const DEEPAI_API_KEY = import.meta.env.VITE_DEEPAI_API_KEY;

export async function summarizeWithOpenRouter(content: string): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize the following note in one paragraph:' },
        { role: 'user', content },
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No summary generated.';
}

export async function sentimentWithHuggingFace(content: string): Promise<string> {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: content }),
    }
  );

  const data = await response.json();
  const label = data?.[0]?.label || 'UNKNOWN';
  return label === 'POSITIVE' ? '😊' : label === 'NEGATIVE' ? '😞' : '😐';
}

export async function summarizeWithDeepAI(content: string): Promise<string> {
  const response = await fetch('https://api.deepai.org/api/summarization', {
    method: 'POST',
    headers: {
      'Api-Key': DEEPAI_API_KEY!,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(content)}`,
  });

  const data = await response.json();
  return data.output || 'No summary generated.';
}

export const generateTitleFromContent = async (content: string): Promise<string> => {
  if (!content || content.trim().length === 0) return 'Untitled Note';

  const lines = content.trim().split('\n').filter(Boolean);
  const firstLine = lines[0];
  const firstSentence = firstLine.split('. ')[0];

  const cleanTitle = firstSentence.length > 60
    ? firstSentence.slice(0, 60).trim() + '...'
    : firstSentence.trim();

  return cleanTitle || 'Untitled Note';
};

