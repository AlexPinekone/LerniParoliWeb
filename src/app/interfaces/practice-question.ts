export interface PracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface PracticeLesson {
  idCourse: string;
  idLesson: string;
  questions: PracticeQuestion[];
}