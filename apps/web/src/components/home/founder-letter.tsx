export function FounderLetter() {
	return (
		<section className="inset-shadow-xs mx-auto my-28 max-w-2xl rounded-lg bg-white p-4 shadow-2xs sm:p-12 dark:bg-gray-1">
			<div className="flex flex-col">
				<h2 className="font-semibold text-foreground text-lg">
					Introducing OneLens
				</h2>
				<hr className="my-4" />

				<div className="flex flex-col gap-6 text-[15px] text-gray-11">
					<p>
						Engineering teams spend a significant part of their week not
						building but preparing to build, waiting to ship, explaining what
						they built.
					</p>
					<p>
						We&apos;ve accepted this. We&apos;ve built entire workflows around
						it. Standup rituals to explain what should be obvious. Review
						processes that bottleneck on whoever is least busy. CI pipelines
						that produce output nobody fully understands. Habits layered on top
						of habits, all treating the symptom while the problem stays
						untouched.
					</p>
					<p>
						<strong className="font-medium text-foreground">
							We&apos;ve professionalized the ceremony of shipping software.
						</strong>{" "}
						And somewhere along the way, convinced ourselves this is just what
						engineering looks like.
					</p>
					<p>But why?</p>
					<p>
						The information needed to eliminate most of this work already
						exists. It lives in your commits, your tickets, your test history,
						your codebase. The context is there. The knowledge is there.{" "}
						<em>It just never gets used,</em> so humans fill the gap, manually,
						every day, at every team.
					</p>
					<p>
						We think that&apos;s worth fixing. Not with another integration. Not
						with another layer of tooling on top of already broken tooling. But
						by building something that actually owns the problem, with the craft
						and conviction it deserves.
					</p>
					<p>
						We&apos;re just getting started. If this resonates, we&apos;d love
						to hear from you.
					</p>
				</div>

				<div className="flex flex-col gap-1 pt-8 text-gray-11 text-sm">
					<span className="text-base text-foreground">Rajdeep</span>
					<span>Founder, OneLens</span>
				</div>
			</div>
		</section>
	);
}
