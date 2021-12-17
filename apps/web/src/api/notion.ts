import { Course, Lesson } from "types";
import { Client } from "@notionhq/client";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

export async function getCourses() {
	const coursesDatabase = await notion.databases.query({
		database_id: "7210e0a2a2704059903a42e5c0b78fe0",
	});

	// @ts-ignore
	return coursesDatabase?.results?.map((course) => {
		return {
			id: course?.id,
			//@ts-ignore
			name: course.properties?.Name?.title[0]?.plain_text || null,
			//@ts-ignore
			authors: course.properties?.Author?.people || null,
			//@ts-ignore
			image: `/courses/${course?.id}.png`,
			//@ts-ignore
			difficulty: course.properties?.Difficulty?.select?.name || null,
			completionTime:
				//@ts-ignore
				course.properties?.CompletionTime?.rich_text?.[0]?.plain_text ||
				null,
		};
	});
}

export async function getCourse(page_id: string) {
	let course: Course = {
		id: "",
		name: "",
		authors: [],
		description: "",
		difficulty: "",
		completionTime: "",
		lessons: []
	};

	await Promise.all([await notion.pages.retrieve({
		page_id,
	}), await notion.blocks.children.list({
		block_id: page_id,
	})]).then(async ([coursePage, blockChildren]) => {
		const { results: lessonPages } = await notion.databases.query({
			database_id: blockChildren.results[0].id,
		});
		course = {
			id: page_id,
			//@ts-ignore
			name: coursePage.properties?.Name?.title?.[0]?.plain_text || null,
			authors:
				//@ts-ignore
				coursePage.properties?.Author?.people || null,
			description:
				//@ts-ignore
				coursePage.properties?.Description?.rich_text?.[0]?.plain_text ||
				null,
			//@ts-ignore
			difficulty: coursePage.properties?.Difficulty?.select?.name || null,
			completionTime:
				//@ts-ignore
				coursePage.properties?.CompletionTime?.rich_text?.[0]?.plain_text ||
				null,
			//@ts-ignore
			image: `/courses/${page_id}.png`,

			lessons: parseLessons(lessonPages),
		};
	});

	return course;
}

export async function getLessons(page_id: string) {
	const blockChildren = await notion.blocks.children.list({
		block_id: page_id,
	});
	const { results: lessonPages } = await notion.databases.query({
		database_id: blockChildren.results[0].id,
	});

	return parseLessons(lessonPages);
}

export function parseLessons(lessonPages) {
	lessonPages.sort((a, b) =>
		a.properties.Name.title?.[0]?.plain_text.localeCompare(
			b.properties.Name?.title?.[0]?.plain_text
		)
	);
	return lessonPages.map((lessonPage) => {
		const nextLesson = lessonPages?.[lessonPages.indexOf(lessonPage) + 1];
		const previousLesson =
			lessonPages?.[lessonPages.indexOf(lessonPage) - 1];
		return {
			id: (lessonPages.indexOf(lessonPage) + 1).toString(),
			blockId: lessonPage.id,
			name: lessonPage.properties?.Name?.title?.[0]?.plain_text || null,
			videoUrl:
				lessonPage.properties.Video?.files?.[0]?.file?.url || null,
			nextLesson: nextLesson
				? {
					id: (lessonPages.indexOf(nextLesson) + 1).toString(),
					name:
						nextLesson?.properties?.Name?.title?.[0]
							?.plain_text || null,
				}
				: null,
			previousLesson: previousLesson
				? {
					id: (
						lessonPages.indexOf(previousLesson) + 1
					).toString(),
					name:
						previousLesson?.properties?.Name?.title?.[0]
							?.plain_text || null,
				}
				: null,
		};
	});
}

export async function getLesson(page_id: string, lessonId: string) {

	let lessons = [];
	let course = {};
	await Promise.all([getLessons(page_id), getCourse(page_id)]).then(([lessonsResolved, courseResolved]) => {
		lessons = lessonsResolved;
		course = courseResolved;
	});


	const lesson: Lesson = {
		id: lessonId,
		courseId: page_id,
		blockId: lessons[parseInt(lessonId) - 1]?.blockId,
		name: lessons[parseInt(lessonId) - 1].name,
		// length: lessons[lessonNumber - 1].length,
		videoUrl: lessons[parseInt(lessonId) - 1].videoUrl,
		length: 3600,
		nextLesson: lessons[parseInt(lessonId) - 1].nextLesson,
		previousLesson: lessons[parseInt(lessonId) - 1].previousLesson,
	};
	return { lesson, course };
}

export async function getLessonContent(lesson_id: string) {
	return {
		blocks: (
			await notion.blocks.children.list({
				block_id: lesson_id,
			})
		).results,
	};
}
