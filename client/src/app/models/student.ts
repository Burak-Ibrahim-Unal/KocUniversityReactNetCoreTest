export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentNumber?: number;
}

export interface StudentParams {
    searchTerm?: string;
    currentPage: number;
    pageSize: number;
}