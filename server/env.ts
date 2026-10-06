import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().positive().int().max(65535).default(8080),
  DATABASE_URL: z.url({
    protocol: /^postgres(ql)?$/,
    hostname: /^.+$/,
  }),
  SALT_ROUNDS: z.coerce.number().min(10).max(20).int().default(10),
  JWT_SECRET: z.string().min(32, "Must be at least 32 characters"),
  JWT_EXPIRES_IN: z.literal("7d").default("7d"),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Invalid env variables");

    error.issues.forEach((err) => {
      const path = err.path.join(".");
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1);
  }

  throw error;
}

export { env };
export default env;
