import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import EnrollDto from 'src/dto/enroll.dto';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserCourse, UserCourseDocument } from 'src/schemas/userCourse.schema';
import { Lesson, LessonDocument } from 'src/schemas/userLesson.schema';

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,

		@InjectModel(Course.name)
		private courseModel: Model<CourseDocument>,

		@InjectModel(UserCourse.name)
		private userCourseModel: Model<UserCourseDocument>,

		@InjectModel(Lesson.name)
		private lessonModel: Model<LessonDocument>
	) { }

	/* Lookups */
	public async findOne_Course(courseId: string) {
		const course = this.courseModel.findOne({ id: courseId });
		if (!course) throw new NotFoundException('Course not found');
		return course;
	}

	public async findOne_User(email: string): Promise<Partial<User & Document>> {
		const user = await this.userModel.findOne({ email });
		if (!user) throw new NotFoundException('Buy a lottery ticket because you just triggered the fattest race condition known to man');
		return user;
	}

	public async findOne_UserCourse(user: User, id: string) {
		// TODO: keeps throwing not found | the user object id is not working please fix
		const userCourse = await this.userCourseModel.findOne({ /*user: user._id,*/ id });
		if (!userCourse) throw new NotFoundException('User Course not found');
		return userCourse;
	}

	public async find_UserCourses(user: User) {
		// TODO: keeps throwing not found | the user object id is not working please fix
		const userCoursesWithoutName = await this.userCourseModel.find(/*{ user: user._id }*/);
		if (!userCoursesWithoutName.length) throw new NotFoundException('No User Courses found');

		// loop through all userCourses and add the course name
		const userCourses = await Promise.all(userCoursesWithoutName.map(async uc => {
			const course = await this.courseModel.findOne({ id: uc.id });
			if (!course) throw new NotFoundException('Course not found');
			return { ...uc.toObject(), name: course.name };
		}));
		if (!userCourses) throw new NotFoundException('No User Courses found');

		return userCourses;
	}

	public async setCurrentLesson(user: User, courseId: string, lessonId: string) {
		const userCourse = await this.findOne_UserCourse(user, courseId);
		userCourse.currentLesson = lessonId;
		return userCourse.save();
	}

	/* Helpers */
	public async enroll(email: string, dto: EnrollDto) {
		const old = await this.userModel.findOne({ email });
		const has = await this.userCourseModel.findOne({
			$and: [
				{
					id: dto.id
				},
				{
					user: old._id
				}
			]
		});

		if (has) throw new ConflictException('User already enrolled');
		const courseRef = await this.courseModel.findOne({ id: dto.id });
		if (!courseRef) throw new NotFoundException('Course not found');

		const lessons: Lesson[] = courseRef.lessons.map((lesson, i) => ({
			id: i,
			completed: false,
			progress: 0,
			name: lesson,
		}
		));

		// const lessonsRes = await this.lessonModel.insertMany(lessons);
		// console.log(lessonsRes);
		// if (!lessonsRes) throw new InternalServerErrorException('Failed to create lessons');

		const inserted = await this.userCourseModel.insertMany([{
			lessons: lessons,
			currentLesson: lessons[0].id,
			id: courseRef.id,
			ref: courseRef._id,
			completed: false,
			user: old._id
		}]);

		old.courses.push(inserted[0]._id);
		await old.save();
	}

	public async progress(
		email: string,
		courseId: string,
		lessonId: number,
		progress: number
	) {
		const user = await this.userModel.findOne({ email });
		if (!user) /* wtf */ throw new InternalServerErrorException('buy a lottery ticket');
		const userCourse = await this.findOne_UserCourse(user, courseId);
		if (!userCourse) throw new NotFoundException('Course not found');
		// make sure we don't query out of range
		if (userCourse.lessons.length <= lessonId || lessonId < 0) throw new NotFoundException('Lesson not found');

		// store the lesson etc.
		const lesson = userCourse.lessons[lessonId];
		console.log(progress);
		console.log(lesson);
		if (lesson) {
			lesson.progress = progress;
			lesson.completed = progress >= 1;
			return userCourse.save();
		}
	}

	public async updateCourse(
		course: Course
	) {
		await this.courseModel.updateOne(
			{ id: course.id, },
			{
				id: course.id,
				name: course.name,
				lessons: course.lessons
			},
			{ upsert: true }
		);
		// TODO: update all userCourses that reference this course (lessons)
	}

	public async getProgress(
		user: User
	) {
		const courses = await Promise.all(user.courses.map(async i => this.userCourseModel.findById(i))) as UserCourse[];

		const lessons = new Map<UserCourse, Lesson[]>();
		courses.forEach(i => lessons.set(i, i.lessons));
		const nextLessons: Record<string, Lesson> = {};

		for (const [k, v] of lessons) {
			if (!k.completed) {
				nextLessons[k.id] = (
					await Promise.all(
						v.map(i =>
							this.lessonModel.findById(i)
						)
					)
				).find(i => i.progress < 1);
			}
		}

		return nextLessons;
	}
}
