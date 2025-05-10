import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateParkDto } from "src/dtos";
import { ParkEntity } from "src/entities";

@Injectable()
export class ParksService {
    constructor(
        @Inject('PARK_DATA_SOURCE')
        private readonly parksRepository: Repository<ParkEntity>,
    ) {}

    async createPark(createParkDto: CreateParkDto): Promise<ParkEntity> {
        const park = await this.parksRepository.create(createParkDto);
        return this.parksRepository.save(park);
    }

    async findAll(): Promise<ParkEntity[]> {
        return await this.parksRepository.find();
    }

    async findOne(id: string): Promise<ParkEntity | null> {
        return await this.parksRepository.findOneBy({ id });
    }

    async update(id: string, updateParkDto: CreateParkDto): Promise<ParkEntity | null> {
        await this.parksRepository.update(id, updateParkDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.parksRepository.delete(id);
    }
}