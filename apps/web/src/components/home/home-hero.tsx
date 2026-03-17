import { Button } from "@onelens/ui/components/button";

export function HomeHero() {
	return (
		<>
			<div className="mt-32 flex flex-col gap-8 text-balance sm:max-w-lg md:max-w-3xl">
				<div className="flex items-center text-wrap">
					<h1 className="font-semibold text-4xl leading-10 tracking-tight md:text-[56px] md:leading-13 md:tracking-normal">
						The PR workflow is broken.{" "}
						<span className="text-4xl text-gray-11 text-semibold italic md:text-5xl">
							We&apos;re fixing it.
						</span>
					</h1>
				</div>
				<p className="text-[15px] text-gray-11 leading-6 md:leading-7">
					Every engineering team spends human effort on work that shouldn&apos;t
					require humans. We&apos;re building the product that changes that.
				</p>
			</div>

			<div className="mt-8">
				<Button className="h-10 px-4 font-medium text-[15px]" size="lg">
					Join Waitlist
				</Button>
			</div>
		</>
	);
}
