<template>
  <svg
    :class="iconClass"
    :style="computedStyle"
    :width="iconWidth"
    :height="iconHeight"
  >
    <use :href="anchor" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: [String, Object],
      default: null
    },
    iconWidth: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: ''
    },
    iconHeight: {
      type: String,
      default: '1em'
    },
    iconClass: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: Object,
      default: null
    }
  },
  computed: {
    computedStyle() {
      if (this.color) {
        return {
          fill: this.color
        }
      }
    },
    anchor() {
      let anchor
      if (this.icon.id) {
        anchor = `#${this.icon.id}`
      } else if (this.icon[0] === '#') {
        anchor = this.icon
      }

      if (!anchor) {
        throw new Error(`Icon not found ${this.icon}.`)
      }
      return anchor
    }
  }
}
</script>
