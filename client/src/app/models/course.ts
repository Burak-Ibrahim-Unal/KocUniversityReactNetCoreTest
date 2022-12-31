export interface Course {
    id: number;
    courseId: string;
    courseName: string;
}

export interface CourseParams {
    searchTerm?: string;
    currentPage: number;
    pageSize: number;
}