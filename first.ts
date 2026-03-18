// infer extracts the array item type
type DeepReadonly<T> = T extends (infer U)[]
    // if it is an array
    ? ReadonlyArray<DeepReadonly<U>>
    // if it is an object
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

type Config = { db: { host: string; port: number }; flags: string[] }
type FrozenConfig = DeepReadonly<Config>

const sampleConfig: FrozenConfig = {
  db: { host: "localhost", port: 5432 },
  flags: ["beta", "dark-mode"]
}

function printFrozenConfig(config: FrozenConfig): void {
  console.log("db host:", config.db.host)
  console.log("db port:", config.db.port)
  console.log("flags:", config.flags.join(", "))
}

printFrozenConfig(sampleConfig)
