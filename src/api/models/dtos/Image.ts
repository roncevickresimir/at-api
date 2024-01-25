import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ImageCreate {

    @IsString()
    @IsNotEmpty()
    stationId: string;

    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    fileExt: string;

    @IsString()
    @IsNotEmpty()
    filePath: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
export class QRCode_ImageCreate {

    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    fileExt: string;

    @IsString()
    @IsNotEmpty()
    filePath: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
