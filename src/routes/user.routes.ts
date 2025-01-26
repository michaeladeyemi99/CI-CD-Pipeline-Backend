import { Router } from "express";
import {getAllUsers, postAUser, getAllUsersIssues } from "../handlers/user.handlers";
import paginationMiddleware from "../middleware/pagination.middleware";


const router = Router()


// This is to get all users and also to post a User
router.get( "/api/users", getAllUsers )
router.post( "/api/users", postAUser )



// Get Users along Issue Details
router.get( "/api/users/issues/paths", paginationMiddleware, getAllUsersIssues)



export default router
