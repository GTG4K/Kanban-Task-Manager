<template>
  <h2 :class="headingStyle">
    <slot></slot>
  </h2>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(['size']);

const headingStyle = computed(() => {
  return {
    xl: props.size.toLowerCase() === 'xl',
    l: props.size.toLowerCase() === 'l',
    m: props.size.toLowerCase() === 'm',
    s: props.size.toLowerCase() === 's',
  };
});
</script>

<style scoped>
h2 {
  --heading-weight-100: 700;
  --heading-size-xl: 28px;
  --heading-size-l: 20px;
  --heading-size-m: 16px;
  --heading-size-s: 14px;
  --heading-spacing: 3px;

  font-family: var(--font-family);
  color: var(--heading-color);
}
.light h2 {
  --heading-color: var(--heading-color-light-100);
}
.dark h2 {
  --heading-color: var(--heading-color-dark-100);
}
.xl {
  font-weight: var(--heading-weight-100);
  font-size: var(--heading-size-xl);
}
.l {
  font-weight: var(--heading-weight-100);
  font-size: var(--heading-size-l);
}
.m {
  font-weight: var(--heading-weight-100);
  font-size: var(--heading-size-m);
  line-height: 1.2;
}
.s {
  font-weight: var(--heading-weight-100);
  font-size: var(--heading-size-s);
  color: var(--heading-color-200);
  letter-spacing: var(--heading-spacing);
}
</style>
