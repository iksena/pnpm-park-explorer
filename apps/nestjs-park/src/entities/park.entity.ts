import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  geometry: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    geometry: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.geometry = geometry;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
