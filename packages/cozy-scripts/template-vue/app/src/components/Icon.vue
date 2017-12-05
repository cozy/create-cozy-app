<template>
  <svg
    v-bind:class='iconClass'
    v-bind:style='computedStyle'
    v-bind:width='iconWidth'
    v-bind:height='iconHeight'
  >
    <use v-bind:href='anchor' />
  </svg>
</template>

<script>
  export default {
    props: {
      icon: null,
      iconWidth: {
        type: String,
        default: '1em'
      },
      color: String,
      iconHeight: {
        type: String,
        default: '1em'
      },
      iconClass: String,
      iconStyle: null
    },
    computed: {
      computedStyle () {
        if (this.color) {
          if (!this.iconStyle) this.iconStyle = {}
          this.iconStyle['fill'] = this.color
        }
        return this.iconStyle
      },
      anchor () {
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
