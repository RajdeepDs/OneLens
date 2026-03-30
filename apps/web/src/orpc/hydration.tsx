import {
	dehydrate,
	HydrationBoundary,
	type QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { createQueryClient } from "./client";

/**
 * Cached QueryClient factory for React Server Components
 * Ensures a single QueryClient instance per request
 */
export const getQueryClient = cache(createQueryClient);

/**
 * HydrationBoundary wrapper component for client-side hydration
 * Automatically dehydrates the query client state for the client
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   const queryClient = getQueryClient();
 *   await queryClient.prefetchQuery(orpc.planet.list.queryOptions());
 *
 *   return (
 *     <HydrateClient>
 *       <PlanetList />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	);
}

/**
 * Custom HydrationBoundary wrapper that accepts a QueryClient
 * Useful when you need more control over the QueryClient instance
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   const queryClient = getQueryClient();
 *   await queryClient.prefetchQuery(orpc.planet.list.queryOptions());
 *
 *   return (
 *     <HydrateClientWithQueryClient client={queryClient}>
 *       <PlanetList />
 *     </HydrateClientWithQueryClient>
 *   );
 * }
 * ```
 */
export function HydrateClientWithQueryClient(props: {
	children: React.ReactNode;
	client: QueryClient;
}) {
	return (
		<HydrationBoundary state={dehydrate(props.client)}>
			{props.children}
		</HydrationBoundary>
	);
}

/**
 * Prefetch utility for single queries in Server Components
 * Returns the QueryClient for chaining or additional prefetching
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   await prefetch(orpc.planet.find.queryOptions({ input: { id: 1 } }));
 *
 *   return (
 *     <HydrateClient>
 *       <PlanetDetail />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export async function prefetch(queryOptions: unknown): Promise<QueryClient> {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		queryOptions as Parameters<QueryClient["prefetchQuery"]>[0]
	);
	return queryClient;
}

/**
 * Prefetch utility for infinite queries in Server Components
 * Returns the QueryClient for chaining or additional prefetching
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   await prefetchInfinite(
 *     orpc.planet.list.infiniteOptions({
 *       input: (offset) => ({ offset, limit: 10 }),
 *       initialPageParam: 0,
 *       getNextPageParam: (lastPage) => lastPage.nextOffset,
 *     })
 *   );
 *
 *   return (
 *     <HydrateClient>
 *       <InfinitePlanetList />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export async function prefetchInfinite(
	queryOptions: unknown
): Promise<QueryClient> {
	const queryClient = getQueryClient();
	await queryClient.prefetchInfiniteQuery(
		queryOptions as Parameters<QueryClient["prefetchInfiniteQuery"]>[0]
	);
	return queryClient;
}

/**
 * Batch prefetch multiple queries in parallel
 * More efficient than calling prefetch multiple times sequentially
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   await batchPrefetch([
 *     orpc.planet.list.queryOptions(),
 *     orpc.planet.find.queryOptions({ input: { id: 1 } }),
 *     orpc.user.me.queryOptions(),
 *   ]);
 *
 *   return (
 *     <HydrateClient>
 *       <Dashboard />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export async function batchPrefetch(queries: unknown[]): Promise<QueryClient> {
	const queryClient = getQueryClient();
	await Promise.all(
		queries.map((queryOptions) =>
			queryClient.prefetchQuery(
				queryOptions as Parameters<QueryClient["prefetchQuery"]>[0]
			)
		)
	);
	return queryClient;
}

/**
 * Batch prefetch multiple infinite queries in parallel
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   await batchPrefetchInfinite([
 *     orpc.planet.list.infiniteOptions({
 *       input: (offset) => ({ offset, limit: 10 }),
 *       initialPageParam: 0,
 *       getNextPageParam: (lastPage) => lastPage.nextOffset,
 *     }),
 *     orpc.star.list.infiniteOptions({
 *       input: (offset) => ({ offset, limit: 20 }),
 *       initialPageParam: 0,
 *       getNextPageParam: (lastPage) => lastPage.nextOffset,
 *     }),
 *   ]);
 *
 *   return (
 *     <HydrateClient>
 *       <InfiniteLists />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export async function batchPrefetchInfinite(
	queries: unknown[]
): Promise<QueryClient> {
	const queryClient = getQueryClient();
	await Promise.all(
		queries.map((queryOptions) =>
			queryClient.prefetchInfiniteQuery(
				queryOptions as Parameters<QueryClient["prefetchInfiniteQuery"]>[0]
			)
		)
	);
	return queryClient;
}

/**
 * Batch prefetch mixed query types (regular and infinite) in parallel
 * Automatically handles both query types
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   await batchPrefetchMixed({
 *     queries: [
 *       orpc.planet.find.queryOptions({ input: { id: 1 } }),
 *       orpc.user.me.queryOptions(),
 *     ],
 *     infiniteQueries: [
 *       orpc.planet.list.infiniteOptions({
 *         input: (offset) => ({ offset, limit: 10 }),
 *         initialPageParam: 0,
 *         getNextPageParam: (lastPage) => lastPage.nextOffset,
 *       }),
 *     ],
 *   });
 *
 *   return (
 *     <HydrateClient>
 *       <ComplexPage />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export async function batchPrefetchMixed(options: {
	queries?: unknown[];
	infiniteQueries?: unknown[];
}): Promise<QueryClient> {
	const queryClient = getQueryClient();

	const prefetchPromises: Promise<void>[] = [];

	if (options.queries) {
		prefetchPromises.push(
			...options.queries.map((queryOptions) =>
				queryClient.prefetchQuery(
					queryOptions as Parameters<QueryClient["prefetchQuery"]>[0]
				)
			)
		);
	}

	if (options.infiniteQueries) {
		prefetchPromises.push(
			...options.infiniteQueries.map((queryOptions) =>
				queryClient.prefetchInfiniteQuery(
					queryOptions as Parameters<QueryClient["prefetchInfiniteQuery"]>[0]
				)
			)
		);
	}

	await Promise.all(prefetchPromises);
	return queryClient;
}

/**
 * Advanced prefetch utility with manual QueryClient management
 * Useful for custom prefetch scenarios
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   const queryClient = getQueryClient();
 *
 *   await withQueryClient(queryClient, async (qc) => {
 *     await qc.prefetchQuery(orpc.planet.list.queryOptions());
 *     await qc.prefetchQuery(orpc.user.me.queryOptions());
 *
 *     // Custom logic
 *     const data = qc.getQueryData(orpc.planet.list.queryKey());
 *     if (data && data.length > 0) {
 *       await qc.prefetchQuery(
 *         orpc.planet.find.queryOptions({ input: { id: data[0].id } })
 *       );
 *     }
 *   });
 *
 *   return (
 *     <HydrateClient>
 *       <ConditionalPage />
 *     </HydrateClient>
 *   );
 * }
 * ```
 */
export function withQueryClient<T>(
	queryClient: QueryClient,
	callback: (queryClient: QueryClient) => Promise<T>
): Promise<T> {
	return callback(queryClient);
}
