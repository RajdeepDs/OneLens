import { FounderLetter } from "@/components/home/founder-letter";
import { HomeHero } from "@/components/home/home-hero";
import { Footer } from "@/components/layout";

export default function HomePage() {
	return (
		<main className="flex flex-col">
			<section className="container mx-auto px-6 sm:max-w-7xl">
				<HomeHero />
				<FounderLetter />
			</section>
			<Footer />
		</main>
	);
}
