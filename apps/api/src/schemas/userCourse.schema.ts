import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';
import { User } from './user.schema';
import { Lesson } from './userLesson.schema';

export type UserCourseDocument = thing & Document;

export class thing {
	
	id: string;	
	ref: Course;
	
	lessons: Lesson[];
	user: Partial<User>;
	
	completed: boolean;
	
	currentLesson: number; // lesson id
}

export type UserCourse = thing;