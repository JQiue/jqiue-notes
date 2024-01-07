interface PluginOptions {
  host: string;
  apiKey: string;
  index: string;
}

export let pluginConfig: PluginOptions = {
  host: '',
  apiKey: '',
  index: '',
};

export default (config: PluginOptions) => {
  pluginConfig = config;
};
