import { auth } from "@onelens/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Protect the welcome route
	if (pathname === "/welcome" || pathname.startsWith("/welcome?")) {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		// If user is authenticated and has completed onboarding, redirect to dashboard
		if (
			session?.user &&
			(session.user as Record<string, unknown>).onboardingCompleted
		) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}

		// If user is not authenticated, redirect to login
		if (!session?.user) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	// Protect the login route
	if (pathname === "/login" || pathname.startsWith("/login?")) {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		// If user is already authenticated, redirect to welcome (to complete onboarding) or dashboard
		if (session?.user) {
			const redirectTo = (session.user as Record<string, unknown>)
				.onboardingCompleted
				? "/dashboard"
				: "/welcome";
			return NextResponse.redirect(new URL(redirectTo, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
