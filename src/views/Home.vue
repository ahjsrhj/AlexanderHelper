<template lang="pug">
.container( :class="{ 'bg-alert': state.isP1 && state.disparityHP >= 5 }" @click.right="onRightClick" )
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
  setup() {
    const onRightClick = () => {}
    const state = reactive({
      mainBoss: useVuex<number>(() => store.getters['info/mainBoss']),
      subBoss: useVuex<number>(() => store.getters['info/subBoss']),
      disparityHP: useVuex<number>(() => store.getters['info/disparityHP']),
      isP1: useVuex<number>(() => store.getters['info/isP1']),
    })

    return {
      state,
      onRightClick,
    }
  },
})
</script>
