import { Router } from "express";
import { getIssues, updateUserRewards, postAnIssue} from "../handlers/issue.handlers";
import getFilePath from "../middleware/imagesAndFiles.middleware";
import multer from "multer";



const router = Router()

const upload = multer();

// Update the Rewards for a Specific User where the id is the Issue ID
router.patch("/api/users/issues/rewards/:issueId", upload.none(),updateUserRewards)

// This is for Each user to be able to post an Issue to the Database
router.post("/api/users/:userId/issue", getFilePath, postAnIssue)

/// This is the Pull the Issues themselves
router.get("/api/users/issues", getIssues)

export default router