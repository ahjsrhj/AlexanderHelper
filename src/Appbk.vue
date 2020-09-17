<!-- @format -->

<template>
  <div
    class="container"
    :class="{ 'bg-alert': disparityHP >= 5 }"
    @click.right="onRightClick"
  >
    <div v-if="boss.maxHP > 0" class="hp-line">
      <div
        class="hp-name"
        :class="{
          'hp-name-light': handPercent > 0 && bossPercent < handPercent,
        }"
      >
        有生命活水
      </div>
      <div class="hp-percent">{{ bossPercent }}%</div>
    </div>
    <div v-if="hand.maxHP > 0" class="hp-line">
      <div
        class="hp-name"
        :class="{
          'hp-name-light': handPercent > 0 && bossPercent > handPercent,
        }"
      >
        活水之手
      </div>
      <div class="hp-percent">{{ handPercent }}%</div>
    </div>
    <div v-if="hand.maxHP > 0" class="hp-line">
      <div class="hp-name"></div>
      <div class="hp-percent" style="font-size: 30px">{{ disparityHP }}%</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Player } from './store'
import { bossHPRegexStr, handHPRegexStr, wipeRegexStr } from './const'

export default {
  name: 'App',
  data() {
    return {
      startWork: false,
      boss: {
        maxHP: 0,
        currentHP: 0,
      },
      hand: {
        maxHP: 0,
        currentHP: 0,
      },
    }
  },
  computed: {
    bossPercent() {
      if (this.boss.maxHP > 0) {
        return ((this.boss.currentHP / this.boss.maxHP) * 100).toFixed(2)
      }
      return 0
    },
    handPercent() {
      if (this.hand.maxHP > 0) {
        return ((this.hand.currentHP / this.hand.maxHP) * 100).toFixed(2)
      }
      return 0
    },
    disparityHP() {
      if (this.hand.maxHP > 0) {
        return (
          Math.abs(
            this.hand.currentHP / this.hand.maxHP -
              this.boss.currentHP / this.boss.maxHP,
          ) * 100
        ).toFixed(2)
      }
      return 0
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      document.addEventListener('onBroadcastMessage', e => {
        const {
          detail: { msg, msgtype },
        } = e
        if (msgtype === 'ChangeZone') {
          // 区域切换
          if (msg.zoneID === 887) {
            // 绝亚
            this.startWork = true
          } else {
            this.resetInfo()
            this.startWork = false
          }
        } else if (msgtype === 'SendCharName') {
          // 获取角色名字
          Player.name = msg.charName
          Player.id = msg.charID
        } else if (this.startWork && msgtype === 'Chat') {
          // 获取有生命活水&活水之手血量
          if (bossHPRegexStr.test(msg)) {
            // boss血量
            const list = bossHPRegexStr.exec(msg)
            if (list.length === 3) {
              this.boss.maxHP = list[2]
              this.boss.currentHP = list[1]
              if (this.boss.currentHP <= 0) {
                // 杀死了，用不到了
                this.resetInfo()
              }
            }
          } else if (handHPRegexStr.test(msg)) {
            // 手血量
            const list = handHPRegexStr.exec(msg)
            if (list.length === 3) {
              this.hand.maxHP = list[2]
              this.hand.currentHP = list[1]
            }
          } else if (wipeRegexStr.test(msg)) {
            // 团灭重置
            this.resetInfo()
          }
        }
      })
    },
    resetInfo() {
      this.boss.maxHP = 0
      this.boss.currentHP = 0
      this.hand.maxHP = 0
      this.hand.currentHP = 0
    },
    onRightClick() {
      console.log('right click')
    },
  },
}
</script>
<style scoped></style>
