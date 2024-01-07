import { getDirname, path } from '@vuepress/utils';
import setConfig from './config';

interface PluginOptions {
  host: string;
  apiKey: string;
  index: string;
}

const __dirname = getDirname(import.meta.url);

export const MeiliSearchPlugin = (options: PluginOptions) => {
  setConfig(options);
  return {
    name: 'vuepress-plugin-meilisearch',
    clientConfigFile: path.resolve(__dirname, './client/index.ts'),
  };
};
