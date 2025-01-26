import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Issue } from "../entities/Issue";
import { User } from "../entities/User";
import { Image_File_Paths } from "../entities/Image_file_paths";

async function updateUserRewards(request: Request, response: Response) {
  try {
    const issueRepository = AppDataSource.getRepository(Issue);

    // Logging statements
    console.log(request.body);

    const issueId = parseInt(request.params.issueId);
    const newReward: number = request.body.reward;

    // Logging statements
    console.log(newReward);
    if (!request.body.reward) {
      response.status(400).json({
        success: false,
        message: "Reward value is missing",
      });
      return;
    }
    if (isNaN(issueId) || issueId <= 0) {
      response
        .status(400)
        .json({ success: false, message: "Not a Valid number" });
      return;
    }

    const issue = await issueRepository
      .createQueryBuilder("issue")
      .update()
      .set({ rewards: newReward })
      .where("id = :issueId", { issueId })
      .execute();

    if (issue.affected === 0) {
      response.status(400).json({
        success: false,
        message: "IssueId is not present the databse",
      });
      return;
    }
    response.status(200).json({
      success: true,
      message: "Success posting Reward",
      newReward: newReward,
    });
  } catch (error: any) {
    response.status(500).json({
      success: false,
      message: "Problem encountered post Reward",
      error: error.message,
    });
  }
}

async function postAnIssue(request: Request, response: Response) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const issueRepository = AppDataSource.getRepository(Issue);
    const imageFilePathRepository =
      AppDataSource.getRepository(Image_File_Paths);
    const {
      issue_category,
      issue_description,
      additional_comments,
      resolution_time,
      impact_scale,
      country,
      // This would be going to the Image_file_paths table
      image_file_paths, // it will have the form [ { path: value, file_type:value } ]
    } = request.body;

    const userId = parseInt(request.params.userId);

    if (isNaN(userId) || userId <= 0) {
      response
        .status(400)
        .json({ success: false, message: "The UserId is incorrect" });
      return;
    }

    if (!issue_category || !issue_description || !country || !userId) {
      response
        .status(400)
        .json({ success: false, message: "Some Important values are missing" });
      return;
    }

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      response
        .status(400)
        .json({ success: false, message: "User does not exist in database" });
      return;
    }

    const issue = new Issue();
    issue.issue_category = issue_category;
    issue.issue_description = issue_description;
    issue.additional_comments = additional_comments;
    issue.resolution_time = resolution_time;
    issue.impact_scale = impact_scale || null;
    issue.country = country;
    issue.user = user;

    const newIssue = await issueRepository.save(issue);

    // This is check if Images are present in there or not!!!
    if (newIssue && image_file_paths.length > 0) {
      // Path and type might be sent as an array becaue there might be multiple files

      for (const pathType of image_file_paths) {
        const imageFilePath = new Image_File_Paths();
        imageFilePath.path = pathType.path;
        imageFilePath.file_type = pathType.file_type;
        imageFilePath.issue = newIssue;

        const newImagePaths = await imageFilePathRepository.save(imageFilePath);
      }
      response.status(201).json({
        success: true,
        message: "Issue Created Successfully with Images and File types",
        newIssue,
        image_file_paths,
      });
      return;
    }

    response.status(201).json({
      success: true,
      message: "Issue Created Successfully",
      newIssue,
    });
  } catch (error: any) {
    response.status(500).json({
      success: false,
      message: "Could not Post the User Issue",
      error: error.message,
    });
  }
}

export { updateUserRewards, postAnIssue };
