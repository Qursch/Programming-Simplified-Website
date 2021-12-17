/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Put, UseGuards, HttpCode, Get, Post, Req } from '@nestjs/common';
import EnrollDto from 'src/dto/enroll.dto';
import { JwtAuthGuard } from 'src/guards/auth/jwt.guard';
import { User } from 'src/schemas/user.schema';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
	constructor(private courseService: CourseService) { }

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	@HttpCode(200)
	async getCourse(@Req() req) {
		console.log(JSON.stringify(req.params));
		return this.courseService.findOne_UserCourse(req.user, req.params['id']).catch((res) => { console.log(res); });
	}

	@UseGuards(JwtAuthGuard)
	@Post('progress')
	async postProgress(@Req() req, @Body() data) {
		await this.courseService.progress(
			req.user.email,
			data.courseId,
			data.lessonId - 1,
			data.progress
		);
	}

	@UseGuards(JwtAuthGuard)
	@Put('enroll')
	@HttpCode(201)
	async enroll(@Req() req, @Body() addCourseDto: EnrollDto) {
		await this.courseService.enroll(req.user.email, addCourseDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('progress')
	@HttpCode(200)
	async getProgress(@Req() req) {
		const user = await this.courseService.findOne_User(req.user.email) as User;
		return this.courseService.getProgress(user).catch((res) => { console.log(res); });
	}

	// @Put('newCourse')
	// async newCourse(@Body() course: Course) {
	// 	await this.courseService.newCourse(course);
	// }
}
