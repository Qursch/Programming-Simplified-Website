import Stats from "@components/home/stats";
import CoursesSection from "@components/home/courses";
import Faq from "@components/home/faq";
import Features from "@components/home/features";
import Footer from "@components/home/footer";
import Header from "@components/home/header";
import Hero from "@components/home/hero";
import Language from "@components/home/language";
import Testimonials from "@components/home/testimonials";
import { Course } from "types";
import { getCourses } from "api/notion";


export default function Home({ courses }: { courses: Course[] }) {
	return (
		<main style={{ color: "#101010" }}>
			<Header />
			
			<Hero />
			<Stats />
			<Features />
			<CoursesSection courses={courses} />
			<Language />
			<Testimonials />
			<Faq />

			<Footer />
		</main>
	);
}

export async function getStaticProps() {
	return {
		props: {
			courses: (await getCourses()).reverse(),
		},
		revalidate: 3600,
	};
}
