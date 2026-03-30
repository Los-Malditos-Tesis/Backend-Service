import path from "path"

const LOGGER_DIR = path.sep + "logger" + path.sep

export function getSource() {
    const err = new Error()
    const stack = err.stack?.split("\n") || []

    for (const line of stack) {
        
        // ignorar node internals
        if (
            line.includes("node:internal") ||
            line.includes("node_modules") ||
            line.includes("ModuleJob.run")
        ) {
            continue
        }

        // ignorar archivos del logger
        if (line.includes(LOGGER_DIR)) {
            continue
        }

        const match = line.match(/at (.+) \((.+):(\d+):(\d+)\)/)
        if (!match) continue

        const fn = match[1]
        const file = match[2].split("/").pop()
        const lineNo = match[3]

        return `${fn} [${file}:${lineNo}]`
    }

    return "unknown"
}
