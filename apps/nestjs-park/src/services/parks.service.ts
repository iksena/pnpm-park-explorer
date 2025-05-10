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
        const park = this.parksRepository.create(createParkDto);
        return this.parksRepository.save(park);
    }
}