"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleConfig = {
    db: { host: "localhost", port: 5432 },
    flags: ["beta", "dark-mode"]
};
function printFrozenConfig(config) {
    console.log("db host:", config.db.host);
    console.log("db port:", config.db.port);
    console.log("flags:", config.flags.join(", "));
}
printFrozenConfig(sampleConfig);
//# sourceMappingURL=first.js.map