import { Position, createResourceMetadata } from "./models";

export abstract class GenericService<T> {
     abstract createOne(resource: T, data: string): Promise<T>;
     // abstract deleteOne(position: Position): Promise<T>;
     // abstract batchCreate(resources: T[]): Promise<T[]>;
     // abstract batchDelete(positions: Position[]): Promise<T>;
}