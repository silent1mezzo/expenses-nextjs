// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { getCurrentHub, Severity } from "@sentry/nextjs"; // whatever package you're using

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

/* Uncomment for db spans
prisma.$use(async (params, next) => {
  const { model, action, runInTransaction, args } = params;
  const description = [model, action].filter(Boolean).join(".");
  const data = {
    model,
    action,
    runInTransaction,
    args,
  };

  const scope = getCurrentHub().getScope();
  const parentSpan = scope?.getSpan();
  const span = parentSpan?.startChild({
    op: "db",
    description,
    data,
  });

  // optional but nice
  scope?.addBreadcrumb({
    category: "db",
    message: description,
    data,
  });

  const result = await next(params);
  span?.finish();

  return result;
});
*/

export default prisma;