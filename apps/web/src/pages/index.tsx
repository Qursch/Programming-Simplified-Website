import Stats from "@components/home/stats";
import Courses from "@components/home/courses";
import Faq from "@components/home/faq";
import Features from "@components/home/features";
import Footer from "@components/home/footer";
import Header from "@components/home/header";
import Hero from "@components/home/hero";
import Language from "@components/home/language";
import Testimonials from "@components/home/testimonials";

export default function Home() {
	return (
		<main style={{ color: "#101010" }}>
			<Header />

			<Hero />
			<Stats />
			<Features />
			<Courses />
			<Language />
			<Testimonials />
			<Faq />

			<Footer />
		</main>
	);
}
