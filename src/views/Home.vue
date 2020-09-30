<template lang="pug">
.container(
  :class="{ 'bg-alert': state.isP1 && state.disparityHP >= 5, 'container-border': config.border }"
  :style="{transform: `scale(${config.scale})`}"
)
  .hp-line(v-if="state.mainBoss.value > 0")
    .hp-name(
      :class="{ 'hp-name-light': state.subBoss.value > 0 && state.mainBoss.value < state.subBoss.value }"
    ) {{state.mainBoss.name}}
    .hp-percent {{state.mainBoss.value}}%
  .hp-line(v-if="state.subBoss.value > 0")
    .hp-name(
      :class="{ 'hp-name-light': state.mainBoss.value > 0 && state.mainBoss.value > state.subBoss.value }"
    ) {{state.subBoss.name}}
    .hp-percent {{state.subBoss.value}}%
  .hp-line(v-if="state.mainBoss.value > 0 && state.subBoss.value > 0")
    .hp-name
    .hp-percent.hp-disparity {{state.disparityHP}}%

  
</template>
<script lang="ts">
import { reactive, ref, defineComponent, Ref, onUnmounted } from 'vue'
import store from '../store'
import router from '../router'
import '../style/home.css'

function useVuex<T>(getState: () => T): Ref<T> {
  const data = ref<T>(getState()) as Ref<T>
  const unwatch = store.watch<T>(getState, (newVal: T) => {
    data.value = newVal
  })
  onUnmounted(() => {
    unwatch()
  })
  return data
}

export default defineComponent({
  setup(props, contextany) {
    const state = reactive({
      mainBoss: useVuex<any>(() => store.getters['info/mainBoss']),
      subBoss: useVuex<any>(() => store.getters['info/subBoss']),
      disparityHP: useVuex<number>(() => store.getters['info/disparityHP']),
      isP1: useVuex<boolean>(() => store.getters['info/isP1']),
    })
    const config = reactive({
      border: useVuex<boolean>(() => store.state.config.border),
      scale: useVuex<number>(() => store.state.config.scale),
    })
    return {
      state,
      config,
    }
  },
})
</script>
