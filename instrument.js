const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://<your_dsn>@sentry.io/<project_id>",
  tracesSampleRate: 1.0,
  integrations: [
    nodeProfilingIntegration(),
  ],
  profilesSampleRate: 1.0,
});

process.on("unhandledRejection", (reason) => {
  Sentry.captureException(reason);
});

process.on("uncaughtException", (error) => {
  Sentry.captureException(error);
});
