import { IsNotEmpty } from "class-validator"



export class CreateStockDto {

    @IsNotEmpty()
    public productId: string

}
