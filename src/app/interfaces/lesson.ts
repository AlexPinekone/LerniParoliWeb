  export interface Lesson {
    _id: string;
    title: string;
    description: string;
    image: string;
    theoryId: string;
    practiceId: string;
    idCourse: string;
    completed?: boolean;
  }