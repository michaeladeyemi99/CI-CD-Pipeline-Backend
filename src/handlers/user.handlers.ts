import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { PaginatedRequest } from "../types";


async function getAllUsers(request: Request, response: Response) {
  try {
    const userRepositiory = AppDataSource.getRepository(User);
    const allUsers = await userRepositiory.find();
    response.json(allUsers);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Something went wrong, Failed to retrieve Users" });
  }
}

async function postAUser(request: Request, response: Response) {
  try {
    const userRepositiory = AppDataSource.getRepository(User);
    const data = request.body;

    if (!data.name || !data.organization_name) {
      response
        .status(400)
        .json({ message: "One or both of the value is null" });
      return;
    }

    // Create an instance of User Class and map them to the request data
    const user = new User();

    user.name = data.name;
    user.organization_name = data.organization_name;

    const newUser = await userRepositiory.save(user);
    response
      .status(201)
      .json({ message: "User Successfully Created", user: newUser });
  } catch (error) {
    response
      .status(500)
      .json({ message: `Could not save the new user with the ${error}` });
  }
}

//========  These are the very important APIs     =========
async function getAllUsersIssues(request: Request, response: Response) {
  try {
    const paginatedRequest = request as PaginatedRequest;
    const userRepository = AppDataSource.getRepository(User);
    const { startIndex, endIndex, page, limit } = paginatedRequest.pagination;

    // This Query builder is to get all the Users that have created an Issue with their Images and File Paths if available
    const allUsersIssues = await userRepository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.issues", "issues")
      .leftJoinAndSelect("issues.image_file_paths", "image_file_paths")
      .getMany();

    if (allUsersIssues.length === 0) {
      response.status(200).json({
        success: true,
        message: "There are no Users with Issues",
        data: [],
      });
    }

    const totalNumberOfIssues = allUsersIssues.length;

    const nextPageNumber: number | null =
      endIndex < totalNumberOfIssues ? page + 1 : null;
    const prevPageNumber: number | null = startIndex > 0 ? page - 1 : null;
    const currentPageNumber = page >= 1 ? page : 1;

    const paginatedIssues = allUsersIssues.slice(startIndex, endIndex);

    response.status(200).json({
      success: true,
      message: "Users fetched Successfully",
      data: paginatedIssues,
      info: {
        currentPage: currentPageNumber,
        nextPage: nextPageNumber,
        prevPage: prevPageNumber,
        numberOfIssues: totalNumberOfIssues,
      },
    });
  } catch (error: any) {
    response.status(500).json({
      success: false,
      message: "There is an Issue get all Users and their Issue Details",
      error: error.message,
    });
  }
}



export { getAllUsers, postAUser, getAllUsersIssues };
