import { Request } from "express";

interface PaginatedRequest extends Request {
  pagination: {
    startIndex: number;
    endIndex: number;
    page: number;
    limit: number;
  };
};



export { PaginatedRequest }