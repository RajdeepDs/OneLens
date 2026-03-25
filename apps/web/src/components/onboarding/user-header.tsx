import { auth } from "@onelens/auth";
import { headers } from "next/headers";

export async function UserHeader() {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	const userEmail = session?.user.email || "";
	return (
		<div className="hidden flex-col items-start text-body-small-spaced sm:flex">
			<h1 className="text-gray-10">Logged in as:</h1>
			<p>{userEmail}</p>
		</div>
	);
}
