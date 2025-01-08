import { createResolver, installModule, useNuxt } from '@nuxt/kit';

export default function installTailwind(
    nuxt = useNuxt(),
    resolve = createResolver(import.meta.url).resolve
): Promise<void> {
    const runtimeDir = resolve('./runtime');

    return (
        installModule('@nuxtjs/tailwindcss', {
            exposeConfig: true,
            config: {
                content: {
                    files: [
                        resolve(resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}')),
                        resolve(resolve(runtimeDir, '*.{mjs,js,ts}'))
                    ]
                }
            }
        })
    );
};
