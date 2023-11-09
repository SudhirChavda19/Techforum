export interface Questions {
    data:[];
    fromCache:boolean;
    hasMore:boolean;
    message:string;
    nbHits:number;
    status:string;
    totalPages:number
}

export interface PostQuestion {
    data:[];
    message:string;
    status:string;
}