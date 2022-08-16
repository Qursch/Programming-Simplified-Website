// Put Types and interfaces here

export type UserCourse = {
	name: string;
	ref: Course;
	lessons: Lesson[];
	user: User;
	status: number; // 0 (not started) | 1 (started, not completed) | 2 (completed)
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
	codePostId?: Object;
	codePostInvite?: Object;
	codePostUrl?: Object;
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
	assignmentId?: string;
};

export type FileObj = {
	url: string;
	/**
	 * in ISO 8601 date time
	 */
	expiry_time?: string;
};

/**
 * A type that represents a job posting pulled from the Applications database on Notion
 * Any values that are not included in the listing will be given the value of null
 */
export type JobPosting = {
	/**
	 * An array of rich text objects that represents the description of the posting.
	 * Please use the parseText in notion.ts to convert this any[] into a React element
	 */
	requirements: string;
	responsibilities: string;
	/**
	 * The rank of this posting, as a string
	 */
	rank: string;
	/**
	 * The URL to the form to this posting, as a string
	 */
	form: string;
	/**
	 * The programs that this posting's job is a part of, as a string
	 */
	programs: string[];
	/**
	 * An image that accompanies this posting.
	 * Stored as a Notion file object
	 */
	image: FileObj;
	/**
	 * The area of expertise that this job demands the most of, as a string
	 */
	area: string;
	/**
	 * The name of the job for this posting, as a string
	 */
	name: string;
};
