import { Button } from "@onelens/ui/components/button";
import type { Route } from "next";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
	return (
		<div className="flex h-full w-full max-w-sm flex-col items-center justify-between gap-8 py-12">
			<Link href={"/" as Route}>
				<Logo className="size-6 text-gray-8" />
			</Link>
			<div className="flex w-full flex-col items-center justify-center gap-7">
				<div className="text-center">
					<h1 className="font-medium text-xl leading-7">Welcome to OneLens</h1>
				</div>
				<div className="w-full">
					<Button className={"w-full"} size={"lg"}>
						Sign in with Google
					</Button>
				</div>
				<div className="text-center text-[13px] text-gray-11">
					<p>
						By signing in, you agree to our{" "}
						<strong className="font-medium underline underline-offset-2">
							Terms of Service
						</strong>{" "}
						and{" "}
						<strong className="font-medium underline underline-offset-2">
							Privacy Policy
						</strong>
					</p>
				</div>
			</div>
			<div>
				<p className="text-[13px] text-gray-10">
					Don&apos;t have an account?{" "}
					<Link
						className="text-gray-12 underline underline-offset-2"
						href={"/waitlist" as Route}
					>
						Join waitlist
					</Link>
				</p>
			</div>
		</div>
	);
}
