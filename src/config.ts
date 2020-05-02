const prefix = "MAILBACKUP_";

export type EnvName =
  | "CRON_SCHEDULE"
  | "DB_CONNECTION_STRING"
  | "SMTP_CONFIG"
  | "FROM_MAIL"
  | "TO_MAIL";

const envConfigs = [
  { name: "CRON_SCHEDULE", default: "0 5 * * 0" },
  {
    name: "DB_CONNECTION_STRING",
    default: "postgresql://postgres:admin@localhost:5432/postgres",
  },
  { name: "SMTP_CONFIG" },
  { name: "FROM_MAIL" },
  { name: "TO_MAIL" },
];

export function checkEnvVariablesAreProvided() {
  let missingEnvVariables = getMissingEnvVariables();
  if (missingEnvVariables.length > 0) {
    throw new Error(
      "the following env variables are missing: " +
        missingEnvVariables.join(", ")
    );
  }
}

export function getConfig(name: EnvName) {
  const fullName = prefix + name;
  return process.env[fullName] !== undefined
    ? process.env[fullName]!
    : envConfigs.find((conf) => conf.name === name)!.default!;
}

function getMissingEnvVariables() {
  let missingEnvVariables = [];
  for (let envConfig of envConfigs) {
    const fullName = prefix + envConfig.name;
    if (
      envConfig.default === undefined &&
      process.env[fullName] === undefined
    ) {
      missingEnvVariables.push(fullName);
    }
  }
  return missingEnvVariables;
}
