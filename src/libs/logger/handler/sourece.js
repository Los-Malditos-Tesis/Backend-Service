import path from "path"

const LOGGER_DIR = path.sep + "logger" + path.sep
export function getSource() {
    const obj = {}
    Error.captureStackTrace(obj, getSource)

    const stack = obj.stack?.split("\n") || []

    for (const rawLine of stack) {
        const line = rawLine.replace(/\\/g, "/")

        if (
            line.includes("node:internal") ||
            line.includes("node_modules")
        ) continue

        if (line.includes("/logger/")) continue

        const match = line.match(/at\s+(?:(.+?)\s+\()?(.+):(\d+):(\d+)\)?/)
        if (!match) continue

        const fn = match[1] || "anonymous"
        const file = path.basename(match[2])
        const lineNo = match[3]

        return `${fn} [${file}:${lineNo}]`
    }

    return "unknown"
}