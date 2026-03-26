import { StandardRPCJsonSerializer } from "@orpc/client/standard";

export const serializer = new StandardRPCJsonSerializer({
	customJsonSerializers: [
		// Add custom serializers here if needed
	],
});
