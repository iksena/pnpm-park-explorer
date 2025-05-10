import { Column, Entity, Geometry, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Park {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  geometry: Geometry;
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    geometry: Geometry,
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
