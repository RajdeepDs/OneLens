export type { QueryClient } from "@tanstack/react-query";

export { createQueryClient } from "./client";

export {
	batchPrefetch,
	batchPrefetchInfinite,
	batchPrefetchMixed,
	getQueryClient,
	HydrateClient,
	HydrateClientWithQueryClient,
	prefetch,
	prefetchInfinite,
	withQueryClient,
} from "./hydration";
export { serializer } from "./serializer";
