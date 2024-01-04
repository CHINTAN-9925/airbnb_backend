import { Type } from "@nestjs/common";
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })

export class AbstractocDument {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;
}