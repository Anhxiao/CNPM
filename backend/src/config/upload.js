import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folder) => {

    const uploadPath = `src/uploads/${folder}`;

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return multer.diskStorage({

        destination(req, file, cb) {

            cb(null, uploadPath);

        },

        filename(req, file, cb) {

            const ext = path.extname(file.originalname);

            const fileName =
                Date.now() +
                "-" +
                Math.round(Math.random() * 1e9) +
                ext;

            cb(null, fileName);

        }

    });

};

export const avatarUpload = multer({

    storage: createStorage("avatars"),

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

export const attachmentUpload = multer({

    storage: createStorage("attachments"),

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});