import { NextFunction, Request, Response } from "express";
import multer from "multer";

function getFilePath(request: Request, response: Response, next: NextFunction) {
  const storage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, "uploads");
    },
    filename: function (request, file, cb) {
      // Appending the extension
      const theFileNameSplit = file.originalname.split(".")
      const fileType = theFileNameSplit[theFileNameSplit.length - 1]
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileType);
    },
  });

  const upload = multer({ storage: storage });

  upload.array("files", 50)(request, response, (error) => {
    if (error) {
      response.status(400).json({
        success: false,
        message: "There is an error uploading the files, please check the file",
        error: error.message,
      });
      return;
    }

    if (!request.files || request.files.length === 0) {
      const image_file_paths: Object[] = [];
      request.body.image_file_paths = image_file_paths;
    } else {
      const files = request.files as Express.Multer.File[]; // This is contain an array of all files
      const image_file_paths: Object[] = [];

      if (files.length >= 10) {
        response.status(500).json({
          success: false,
          message:
            "There are too many files sent, the maximum number is 10 files",
        });
        return;
      }

      for (const file of files) {
        const size = file.size;
        const path = file.path;
        const mimetype = file.mimetype;
        const filename = file.filename;
        const originalname = file.originalname;

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/msword",
        ];
        if (!allowedTypes.includes(mimetype)) {
          response.status(400).json({
            success: false,
            message: `Invalid file type for file ${originalname}`,
          });
          return;
        }
        // it should not be more than 5 Mb
        const maxSize = 5 * 1024 * 1024;
        if (size > maxSize) {
          response.status(400).json({
            success: false,
            message: `File ${originalname} too large`,
          });
          return;
        }
 
        const eachArrOfFiles = {
          path,
          file_type: mimetype,
        };
        image_file_paths.push(eachArrOfFiles);
      }
      request.body.image_file_paths = image_file_paths;
    }

    next();
  });
}

export default getFilePath;
