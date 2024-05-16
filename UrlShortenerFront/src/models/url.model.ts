export interface urlDTO{
    id: string;
    shortUrl: string;
    url:string;
};

export interface urlDetailsDTO{
    url:string    
    shortUrl: string;
    createdAt:Date;
    createdBy:string;
}