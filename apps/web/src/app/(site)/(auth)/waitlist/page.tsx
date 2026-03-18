import { Button } from "@onelens/ui/components/button";
import { Input } from "@onelens/ui/components/input";
import type { Route } from "next";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function EarlyAccessPage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-between">
			<Link href={"/" as Route}>
				<Logo className="size-6 text-gray-8" />
			</Link>
			<div className="flex w-sm flex-col items-center justify-center gap-7">
				<div className="space-y-2 text-center">
					<h1 className="font-medium text-xl leading-7">Join the waitlist</h1>
					<p className="text-[15px] text-gray-10">
						We&apos;ll reach out when we open access.
					</p>
				</div>
				<div className="w-full space-y-4">
					<Input
						className="h-9 placeholder:text-[13px] placeholder-shown:pb-2"
						placeholder="name@company.com"
					/>
					<Button className={"w-full"} size={"lg"}>
						Submit
					</Button>
				</div>
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
