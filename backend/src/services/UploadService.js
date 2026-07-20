class UploadService {

    async uploadAvatar(file) {

        if (!file) {

            throw new Error("Không tìm thấy file.");

        }

        return {

            filename: file.filename,

            path: file.path,

            size: file.size

        };

    }

    async uploadAttachment(file) {

        if (!file) {

            throw new Error("Không tìm thấy file.");

        }

        return {

            filename: file.filename,

            path: file.path,

            size: file.size

        };

    }

}

export default new UploadService();