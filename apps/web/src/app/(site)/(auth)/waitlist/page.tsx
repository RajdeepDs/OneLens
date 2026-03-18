"use client";

import { Button, buttonVariants } from "@onelens/ui/components/button";
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
			<div className="flex w-full flex-col items-center justify-center gap-7">
				<div className="space-y-2 text-center">
					<h1 className="font-medium text-[18px]">What's your email?</h1>
					<p className="text-[15px] text-gray-10">
						We&apos;ll let you know when we are ready.
					</p>
				</div>
				<div className="space-y-4">
					<Input placeholder="name@company.com" />
					<Button className={"w-full"}>Submit</Button>
				</div>
			</div>
			<div>
				<p className="text-[13px] text-gray-10">
					Already been invited?{" "}
					<Link
						className={buttonVariants({ variant: "link", size: "default" })}
						href={"/login" as Route}
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
