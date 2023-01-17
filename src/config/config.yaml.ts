import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const configYaml = () => {
  return yaml.load(readFileSync(join(__dirname, "/test.yaml"), 'utf8')) as Record<
  string,
  any
    >;
};

