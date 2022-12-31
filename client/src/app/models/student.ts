export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentNumber?: number;
    birthDate: Date;
}

export interface StudentParams {
    searchTerm?: string;
    currentPage: number;
    pageSize: number;
}