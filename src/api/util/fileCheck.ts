import fs from 'fs';

export class FileCheck {
    static checkExists(destination: string): boolean {
        if (fs.existsSync(destination)) {
            return true;
        } else return false;
    }

    static deleteFile(destination: string) {
        fs.unlink(destination, (err) => {
            if (err) throw err;
        });
    }
}

export default FileCheck;
