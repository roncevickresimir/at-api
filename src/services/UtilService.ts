import { SERVER_VERSION } from "../config";

export default class UtilService {
    GetServerVersion = async (): Promise<string> => {
        return SERVER_VERSION;
    };

};