export interface Practice {
    id: string;
    title: string;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    description: string;
    image: string;
    theoryId: string;
    practices: Practice[];
    progress: number;
    courseId: string;
  }