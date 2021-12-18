// Put Types and interfaces here


export type UserCourse = {
	name: string;
	ref: Course;
	lessons: Lesson[];
	user: User;
	status: number;  // 0 (not started) | 1 (started, not completed) | 2 (completed)
};

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	courses: UserCourse[];
	id: number;
};

export type Course = {
	id: string;
	name: string;
	authors: Author[];
	description: string;
	difficulty: string;
	completionTime: string;
	image?: string;
	lessons: Lesson[];
};

export type Author = {
	object: string;
	id: string;
	name: string;
	avatar_url: string;
	type: string;
	person: Person;
};

export type Person = {
	email: string;
};

export type Lesson = {
	id: number;
	courseId?: string;
	blockId?: string;
	name: string;
	length: number;
	videoUrl: string;
	nextLesson: Lesson;
	previousLesson: Lesson;
};

export type FileObj = {
	url: string;
	/**
	 * in ISO 8601 date time
	 */
	expiry_time?: string;
};
