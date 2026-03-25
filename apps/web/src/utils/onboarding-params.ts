import { parseAsInteger } from "nuqs";
import { z } from "zod";

export const onboardingParamsSchema = z.object({
	step: z.coerce.number().min(0).max(3).default(0),
});

export type OnboardingParams = z.infer<typeof onboardingParamsSchema>;

export const parsers = {
	step: parseAsInteger.withDefault(0),
};
