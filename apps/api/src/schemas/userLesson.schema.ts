import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
	@Prop()
		id: number;
	@Prop()
		name: string;
	@Prop({type: MongoSchema.Types.Decimal128})
		// we don't need a completed we can just check if its 1
		progress: number; // 0 -> 1 (perc)

}

export const LessonSchema = SchemaFactory.createForClass(Lesson);