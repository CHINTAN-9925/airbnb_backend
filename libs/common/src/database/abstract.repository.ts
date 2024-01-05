import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "@app/common";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected readonly logger = new Logger();
    constructor(protected readonly model: Model<TDocument>) { }

    async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
        const newDocument = new this.model({ ...document, _id: new Types.ObjectId() });
        return ((await newDocument.save()).toJSON() as unknown) as TDocument;
    }
    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filterQuery).lean<TDocument[]>(true);
    }
    async findOne(id: string): Promise<TDocument> {
        try {
            const objectId = new Types.ObjectId(id);
            const document = await this.model.findOne({ _id: objectId }).lean<TDocument>(true);

            if (!document) {
                const errorMessage = `Document not found with _id: ${id}`;
                this.logger.warn(errorMessage);
                throw new NotFoundException(errorMessage);
            }
            return document;
        } catch (error) {
            this.logger.error(`Error in findOneById: ${error.message}`);
            throw error;
        }
    }
    async findOneAndUpdateById(id: string, update: UpdateQuery<TDocument>): Promise<TDocument> {
        try {
            const objectId = new Types.ObjectId(id);
            const updatedDocument = await this.model.findOneAndUpdate({ _id: objectId }, update, { new: true }).lean<TDocument>(true);

            if (!updatedDocument) {
                const errorMessage = `Document not found with _id: ${id}`;
                this.logger.warn(errorMessage);
                throw new NotFoundException(errorMessage);
            }
            return updatedDocument;
        } catch (error) {
            this.logger.error(`Error in findOneAndUpdateById: ${error.message}`);
            throw error;
        }
    }
    async findOneAndDeleteById(id: string): Promise<TDocument> {
        try {
            const objectId = new Types.ObjectId(id);
            const deletedDocument = await this.model.findOneAndDelete({ _id: objectId });

            if (!deletedDocument) {
                const errorMessage = `Document not found with _id: ${id}`;
                this.logger.warn(errorMessage);
                throw new NotFoundException(errorMessage);
            }

            return deletedDocument;
        } catch (error) {
            this.logger.error(`Error in findOneAndDeleteById: ${error.message}`);
            throw error;
        }
    }

}