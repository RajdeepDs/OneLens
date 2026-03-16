import { Button } from "@onelens/ui/components/button";
import Footer from "@/components/footer";

export default function Home() {
	return (
		<main className="flex flex-col">
			<section className="container mx-auto px-6 sm:max-w-7xl">
				<div className="mt-32 flex flex-col gap-8 text-balance sm:max-w-lg md:max-w-3xl">
					<div className="flex items-center text-wrap">
						<h1 className="font-semibold text-4xl leading-10 tracking-tight md:text-[56px] md:leading-13 md:tracking-normal">
							The PR workflow is broken.{" "}
							<span className="text-4xl text-gray-11 text-semibold italic md:text-5xl">
								We&apos;re fixing it.
							</span>
						</h1>
					</div>
					<p className="text-[15px] text-gray-11 leading-6 tracking-tight md:leading-7">
						Every engineering team spends human effort on work that shouldn't
						require humans. We're building the product that changes that.
					</p>
				</div>
				<div className="mt-8">
					<Button className="h-10 px-4 font-medium text-[15px]" size={"lg"}>
						Join Waitlist
					</Button>
				</div>

				<section className="inset-shadow-xs mx-auto mt-25 mb-20 max-w-2xl rounded-lg bg-white p-4 shadow-2xs sm:p-12 dark:bg-gray-1">
					<div className="flex flex-col">
						<h2 className="font-semibold text-foreground text-lg">
							Introducing OneLens
						</h2>
						<hr className="my-4" />
						<div className="flex flex-col gap-6 text-[15px] text-gray-11">
							<p>
								Engineering teams spend a significant part of their week not
								building — preparing to build, waiting to ship, explaining what
								they built.
							</p>
							<p>
								We've accepted this. We've built entire workflows around it.
								Standup rituals to explain what should be obvious. Review
								processes that bottleneck on whoever is least busy. CI pipelines
								that produce output nobody fully understands. Habits layered on
								top of habits, all treating the symptom while the problem stays
								untouched.
							</p>
							<p>
								<strong className="font-medium text-foreground">
									We've professionalized the ceremony of shipping software.
								</strong>{" "}
								And somewhere along the way, convinced ourselves this is just
								what engineering looks like.
							</p>
							<p>But why?</p>
							<p>
								The information needed to eliminate most of this work already
								exists. It lives in your commits, your tickets, your test
								history, your codebase. The context is there. The knowledge is
								there. <em>It just never gets used,</em> so humans fill the gap,
								manually, every day, at every team.
							</p>
							<p>
								We think that's worth fixing. Not with another integration. Not
								with another layer of tooling on top of already broken tooling.
								But by building something that actually owns the problem, with
								the craft and conviction it deserves.
							</p>
							<p>
								We're just getting started. If this resonates, we'd love to hear
								from you.
							</p>
						</div>

						<div className="flex flex-col gap-1 pt-8 text-gray-11 text-sm">
							<span className="text-base text-foreground">Rajdeep</span>
							<span className="">Founder, OneLens</span>
						</div>
					</div>
				</section>
			</section>
			<Footer />
		</main>
	);
}
