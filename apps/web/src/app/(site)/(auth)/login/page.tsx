import { Button } from "@onelens/ui/components/button";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
	return (
		<div className="flex h-full flex-col items-center justify-center py-10 text-center">
			<Logo className="h-6 text-gray-9" />
			<div>
				<h1>Welcome to Onelens</h1>
			</div>

			<div className="">
				<Button>Continue</Button>
			</div>
		</div>
	);
}
