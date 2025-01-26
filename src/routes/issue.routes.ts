import { Router } from "express";
import { updateUserRewards } from "../handlers/issue.handlers";
import { postAnIssue } from "../handlers/issue.handlers";
import getFilePath from "../middleware/imagesAndFiles.middleware";
import multer from "multer";



const router = Router()

const upload = multer();

// Update the Rewards for a Specific User where the id is the Issue ID
router.patch("/api/users/issues/rewards/:issueId", upload.none(),updateUserRewards)

// This is for Each user to be able to post an Issue to the Database
router.post("/api/users/:userId/issue", getFilePath, postAnIssue)

/// Pull Rewards from USers

export default router