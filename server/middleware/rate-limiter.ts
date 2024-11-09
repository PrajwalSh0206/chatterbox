import { Context } from "@oak/oak";
import { CONSTANTS } from "../constants/index.ts";
import { Status } from "@oak/oak";
const { RATE_LIMIT, TIMEFRAME } = CONSTANTS;

// In-memory storage for rate limiting (stores IP and request count + timestamp)
const requestCounts = new Map<string, { count: number; timestamp: number }>();

export default async function rateLimiter(ctx: Context, next: () => Promise<unknown>) {
  const ip = ctx.request.ip;

  // Get current time and IP request data
  const currentTime = Date.now();
  const requestData = requestCounts.get(ip);

  // Check if IP has made requests within the timeframe
  if (requestData) {
    const { count, timestamp } = requestData;

    // Reset the counter if timeframe has elapsed
    if (currentTime - timestamp > TIMEFRAME) {
      requestCounts.set(ip, { count: 1, timestamp: currentTime });
    } else if (count >= RATE_LIMIT) {
      // If request count exceeds the limit, block the request
      ctx.response.status = Status.TooManyRequests;
      ctx.response.body = { error: "Too many requests. Please try again later." };
      return;
    } else {
      // Increment the count if within the timeframe
      requestCounts.set(ip, { count: count + 1, timestamp });
    }
  } else {
    // Initialize IP with first request if it's not already tracked
    requestCounts.set(ip, { count: 1, timestamp: currentTime });
  }

  await next(); // Proceed with the next middleware
}
