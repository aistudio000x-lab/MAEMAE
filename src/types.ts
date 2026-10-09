export interface CoupleProfile {
  partnerName: string;
  senderName: string;
  startDate: string; // YYYY-MM-DD
  herNickname: string;
  hisNickname: string;
  relationshipNote: string;
  songTitle: string;
  songArtist: string;
}

export interface Milestone {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  description: string;
  category: 'first-hello' | 'late-night' | 'inside-joke' | 'deep-talk' | 'milestone' | 'sweet-moment';
  tagline: string;
}

export interface ChatSnippet {
  id: string;
  sender: 'partner' | 'user';
  text?: string;
  time: string;
  date: string;
  isAudio?: boolean;
  audioDuration?: string;
  reaction?: string;
}

export interface LoveReason {
  id: number;
  text: string;
  category: 'Late Nights' | 'Inside Jokes' | 'Her Smile & Heart' | 'The Little Things' | 'Our Future';
  isFavorite?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BucketItem {
  id: string;
  title: string;
  completed: boolean;
  targetDay?: string;
}
