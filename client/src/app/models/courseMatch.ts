export interface CourseMatch {
    id: number;
    studentTableId: number;
    courseTableId: number;
    studentFirstName: string,
    studentLastName: string,
    studentNumber: string,
    courseId: string,
    courseName: string,
}

export interface CourseMatchParams {
    searchTerm?: string;
    currentPage: number;
    pageSize: number;
}