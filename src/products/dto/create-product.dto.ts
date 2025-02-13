import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @MaxLength(255)
	@IsString()
	@IsNotEmpty()
    name: string;

    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    price: number

    @Min(1)
    @IsInt()
    @IsNotEmpty()
    categoryId: number
}
