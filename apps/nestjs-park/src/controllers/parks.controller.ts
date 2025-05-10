import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { CreateParkDto, UpdateParkDto } from "src/dtos";
import { ParkEntity } from "src/entities";
import { ParksService } from "src/services";

@Controller("parks")
export class ParksController {

    constructor(private readonly parksService: ParksService) {}

    @Post()
    async createPark(@Body() createParkDto: CreateParkDto): Promise<ParkEntity> {
        return this.parksService.createPark(createParkDto);
    }

    @Get()
    async findAll(): Promise<ParkEntity[]> {
        return this.parksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ParkEntity | null> {
        const foundPark = await this.parksService.findOne(id);
        if (!foundPark) {
            throw new NotFoundException(`Park with id ${id} not found`);
        }
        return foundPark;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto): Promise<ParkEntity | null> {
        return this.parksService.update(id, updateParkDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.parksService.remove(id);
    }
}