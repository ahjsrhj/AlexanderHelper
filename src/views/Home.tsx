import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    const onClick = () => {
      console.log('onClick')
    }

    return () => (
      <>
        <h1 onContextmenu={onClick}>Home</h1>
        <h1>{store.state.title}</h1>
      </>
    )
  },
})
