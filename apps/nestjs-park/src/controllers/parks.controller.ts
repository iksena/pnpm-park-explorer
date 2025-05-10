import { Body, Controller, Post } from "@nestjs/common";
import { CreateParkDto } from "src/dtos";
import { ParkEntity } from "src/entities";
import { ParksService } from "src/services";

@Controller("parks")
export class ParksController {
    constructor(private readonly parksService: ParksService) {}
    @Post()
    async createPark(@Body() createParkDto: CreateParkDto): Promise<ParkEntity> {
        return this.parksService.createPark(createParkDto);
    }
}