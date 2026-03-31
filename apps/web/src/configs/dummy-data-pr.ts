export const yourQueue = [
	{
		id: "PR-142",
		title: "Refactor Stripe webhook retry logic to prevent duplicate charges",
		repo: "payments/api",
		status: "fail",
		risk: "high",
		author: "AK",
		time: "3h",
		ci: {
			state: "failed",
			reason: "Webhook retry test failing (non-flaky)",
		},
	},
	{
		id: "PR-139",
		title: "Add rate limiting middleware for auth endpoints",
		repo: "api/auth",
		status: "pass",
		risk: "medium",
		author: "MT",
		time: "5h",
		ci: {
			state: "passed",
			reason: "All checks green",
		},
	},
	{
		id: "PR-136",
		title: "Migrate user preferences to new JSON schema",
		repo: "core/db",
		status: "flaky",
		risk: "medium",
		author: "RN",
		time: "8h",
		ci: {
			state: "flaky",
			reason: "2 tests failing intermittently (seen 14% historically)",
		},
	},
] as const;

export const mergeReady = [
	{
		id: "PR-131",
		title: "Update onboarding copy and CTA button hierarchy",
		repo: "web/onboarding",
		status: "ready",
		risk: "low",
		author: "LC",
		time: "1d",
		approvals: 2,
		ci: {
			state: "passed",
			reason: "Stable across last 25 runs",
		},
	},
	{
		id: "PR-128",
		title: "Fix pagination offset bug in dashboard list view",
		repo: "web/dashboard",
		status: "ready",
		risk: "low",
		author: "AP",
		time: "22h",
		approvals: 1,
		ci: {
			state: "passed",
			reason: "No regressions detected",
		},
	},
] as const;

export const needsChanges = [
	{
		id: "PR-125",
		title: "Replace legacy feature flag system with new SDK",
		repo: "core/config",
		status: "changes_requested",
		risk: "medium",
		author: "RN",
		time: "2d",
		comments: 5,
		blockingReason: "Missing fallback for disabled flags",
	},
] as const;

export const merged = [
	{
		id: "PR-120",
		title: "Add CSV export to analytics page",
		repo: "web/analytics",
		status: "merged",
		risk: "low",
		author: "JS",
		mergedAt: "Mar 28",
		deploy: {
			state: "success",
			duration: "2m 14s",
		},
	},
	{
		id: "PR-118",
		title: "Upgrade React to 19.1 across all packages",
		repo: "web/core",
		status: "merged",
		risk: "medium",
		author: "LC",
		mergedAt: "Mar 27",
		deploy: {
			state: "success",
			duration: "3m 02s",
		},
	},
] as const;
