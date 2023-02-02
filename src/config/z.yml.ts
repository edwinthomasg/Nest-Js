import { readFileSync } from "fs"
import { load } from "js-yaml"
import { join } from "path"

export const zConfig = () => {
    return load(readFileSync(join(__dirname,"/z.yaml"),'utf-8')) as Record<string,any>
}