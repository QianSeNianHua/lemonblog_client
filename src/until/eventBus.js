/**
 * 自动销毁的消息订阅
 */
import Vue$ from 'vue'
const Vue = Vue$

// 事件器
// { _uid: { event: {} } }
const EventStore = {}
const Bus = new Vue()

// 移除事件
const destroyHandler = function () {
  // this表示此组件
  const eventObj = EventStore[this._uid]

  if (!eventObj) return

  for (let event in eventObj) {
    // 解绑事件
    if (event.indexOf(',') < 0) {
      Bus.$off(event)
    } else {
      Bus.$off(event.split(','))
    }
  }

  // 删除事件器
  delete EventStore[this._uid]
}

const EventBus = function () {
  // 组件的 desroyed 钩子
  const destroyed = this.$options.beforeDestroy
  // 组件的唯一标识
  const uid = this._uid
  // 初始化事件器
  EventStore[uid] = {}
  // 为组件挂在destroyed钩子
  !destroyed.includes(destroyHandler) && destroyed.push(destroyHandler)

  return {
    $on: (event, handler) => {
      const key = Array.isArray(event) ? event.join(',') : event

      EventStore[uid][key] = {}
      Bus.$on(event, handler)
    },
    $off: (...params) => Bus.$off(...params),
    $once: (...params) => Bus.$once(...params),
    $emit: (...params) => Bus.$emit(...params)
  }
}

export default EventBus
