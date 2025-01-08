import { computed } from 'vue';
import type { Elements } from '../common/types/element';
import cn from '../utils/cn';
// @ts-expect-error
import appConfig from '#build/app.config';

const base = (element: Elements, defaults: string) => {
    const jengzeus = appConfig.jengzeus;

    return computed(() => {
        if (jengzeus && 'base' in jengzeus[element]) {
            return jengzeus[element]['base'];
        }
        return defaults;
    });
};

const variant = (element: Elements, defaults: string, variant?: string) => {
    const jengzeus = appConfig.jengzeus;

    return computed(() => {
        if (variant && jengzeus && variant in jengzeus[element]) {
            return jengzeus[element][variant] || defaults;
        }

        return defaults;
    });
};

const variants = (element: Elements, defaults: string, variants?: string[]) => {
    const jengzeus = appConfig.jengzeus;

    return computed(() => {
        if (variants && variants.length && jengzeus) {
            const variantMap: string[] = (variants as string[]).map((variant) => {
                if (variant !== 'base' && variant.trim() !== '' && variant in jengzeus[element]) {
                    return jengzeus[element][variant] || '';
                }
            });

            const jointest = cn(...variantMap);

            return jointest;
        }

        return defaults;
    });
};

const useGenStyle = {
    base,
    variant,
    variants
};

export default useGenStyle;
