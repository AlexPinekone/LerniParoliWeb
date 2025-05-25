export type TheoryBlock =
  | { type: 'title'; content: string }
  | { type: 'subtitle'; content: string }
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'code'; language: string; content: string }
  | { type: 'interactive'; component: 'quiz' | 'button' | 'alert'; data?: any };

export interface Theory {
  idCourse: string;
  idLesson: string;
  title?: string;
  blocks: TheoryBlock[];
}