<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
import cn from '../utils/cn';
import useVariant from '../composables/useVariant';

interface ButtonProps {
    type?: ButtonHTMLAttributes['type'];
    class?: string;
    disabled?: boolean;
    variant?: string;
    variants?: string[];
}

const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    disabled: false
});

const emits = defineEmits<{
    click: [];
    blur: [];
    dbclick: [];
}>();

const ELEMENT_NAME = 'button';

const baseDefault = 'px-3 py-1 flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:bg-gray-400 text-white';
const variantDefault = 'bg-blue-500 hover:bg-blue-600';

const baseStyle = useVariant.base(ELEMENT_NAME, baseDefault);
const variantStyle = useVariant.variant(ELEMENT_NAME, variantDefault, props.variant);
const variantsStyle = useVariant.variants(ELEMENT_NAME, variantDefault, props.variants);
</script>

<template>
    <button
        :disabled="disabled"
        v-bind="$attrs"
        :type="type"
        :class="cn(
            baseStyle,
            props.variants ? variantsStyle : variantStyle,
            props.class
        )"
        @click="emits('click')"
        @dbclick="emits('dbclick')"
        @blur="emits('blur')"
    >
        <slot></slot>
    </button>
</template>
