import { Request, Response, NextFunction } from "express";
import { PaginatedRequest } from "../types";

// This file is name pagination.middleware.ts
// I want write a middleware function to handle pagination for the Data being collected

function paginationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  const paginatedRequest = request as PaginatedRequest
  const page = parseInt(request.query.page as string) || 1;
  const limit = parseInt(request.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  paginatedRequest.pagination = {startIndex, endIndex, page, limit} 
  
  next()
}

export default paginationMiddleware;
