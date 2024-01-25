import { config } from "api/config/config";

export class UtilService {
  GetServerVersion = async (): Promise<string> => {
    return config.SERVER_VERSION;
  };
}
