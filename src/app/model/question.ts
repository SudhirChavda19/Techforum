import { Pagination } from "./pagination";

export interface Question {
    _id:string;
    userId:{
     firstName: string;
     lastName: string;
    },
    answer:{
        answer:string
    }
    question: string;
    questionDescribe:string,
    tags:string[];
    createdAt: Date;
    updatedAt: Date; 
}


export interface PaginatedData<T> {
    result:T;
    pagination: Pagination
}