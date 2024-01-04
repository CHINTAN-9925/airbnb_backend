import { Logger } from "@nestjs/common";
import { AbstractocDument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractocDument> {
    private readonly logger = new Logger();
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
        const newDocument = new this.model({ ...document,_id: new Types.ObjectId() });  
        return ((await newDocument.save()).toJSON() as unknown) as TDocument;
    }
    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true);
    }
    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document= this.model.findOne(filterQuery).lean<TDocument >(true);
        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new Error('Document not found');
        }
        return document;
    }
    async findOneAndupdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const updatedDocument = await this.model.findOneAndUpdate(filterQuery, update, { new: true }).lean<TDocument>(true);
        if (!updatedDocument) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new Error('Document not found');
        }
        return updatedDocument;
    }
    async findOneAnDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const deletedDocument = await this.model.findOneAndDelete(filterQuery);
        if (!deletedDocument) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new Error('Document not found');
        }
        return deletedDocument;
    }
}