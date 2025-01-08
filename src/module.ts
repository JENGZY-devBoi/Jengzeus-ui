import { defineNuxtModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit';
import { name, version } from '../package.json';
import { installTailwind } from './common';
import type { JengzeusElement } from './common/types/jengzeus.interface';

export interface ModuleOptions {
    prefix?: string;
    global?: boolean;
}

declare module '@nuxt/schema' {
    interface AppConfigInput {
        // @ts-ignore
        jengzeus: JengzeusElement;
    }
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: name,
        configKey: 'ui',
        compatibility: {
            nuxt: '>=3.15.0'
        },
        version: version
    },

    defaults: {
        prefix: 'J'
    },

    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);
        const runtimeDir = resolve('./runtime');

        nuxt.options.build.transpile.push(runtimeDir);

        nuxt.options.alias['#jengzeus'] = runtimeDir;

        await installTailwind(nuxt, resolve);

        addComponentsDir({
            path: resolve(runtimeDir, 'components'),
            prefix: options.prefix,
            global: options.global,
            watch: false
        });

        addImportsDir(resolve(runtimeDir, 'utils'));
        addImportsDir(resolve(runtimeDir, 'composables'));
    }
});
