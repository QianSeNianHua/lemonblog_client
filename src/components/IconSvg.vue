<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
/**
 * svg雪碧图
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class IconSvg extends Vue {
  @Prop({ type: String, required: true })
  iconClass

  get iconName () {
    return `#icon-${this.iconClass}`
  }
}

export default IconSvg
</script>

<style>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
