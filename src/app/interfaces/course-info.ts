export interface CourseInfo {
    id: string;
    title: string;
    description: string;
    origin: string;
    regions: string[];
    imageUrls: string[];
    stats: {
      speakers: string;
      difficulty: string;
      popularity: string;
    };
  }
  
