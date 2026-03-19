import type { Route } from "next";
import Link from "next/link";
import { JoinWaitlistForm } from "@/components/auth";
import { Logo } from "@/components/ui";

export default function EarlyAccessPage() {
	return (
		<div className="flex h-full w-full max-w-sm flex-col items-center justify-between gap-8 py-12">
			<Link href={"/" as Route}>
				<Logo className="size-6 text-gray-8" />
			</Link>
			<div className="flex w-full flex-col items-center justify-center gap-7">
				<div className="space-y-2 text-center">
					<h1 className="font-medium text-xl leading-7">Join the waitlist</h1>
					<p className="text-[15px] text-gray-10">
						We&apos;ll reach out when we open access.
					</p>
				</div>
				<JoinWaitlistForm />
			</div>
			<div>
				<p className="text-[13px] text-gray-10">
					Already been invited?{" "}
					<Link
						className="text-gray-12 underline underline-offset-2"
						href={"/login" as Route}
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
