import { readFileSync } from "fs"
import { load } from "js-yaml"
import { join } from "path"

export const movieConfig = () => {
    return load(readFileSync(join(__dirname,"/movie.yaml"), 'utf-8')) as Record<string, any>
}