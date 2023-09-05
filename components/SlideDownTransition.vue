<template>
  <transition
    v-if="!group"
    :name="transitionName"
    :appear="appear"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>

  <transition-group
    v-else
    :name="transitionName"
    :appear="appear"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  props: {
    appear: { type: Boolean, default: false },
    group: { type: Boolean, default: false },
    transitionName: {
      type: String,
      default: 'SlideDownTransition',
      validator: value => [
        '',
        'SlideDownTransition',
        'SlideDownTransitionSlower'
      ].includes(value)
    }
  },

  methods: {
    enter (element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    },
    leave (element) {
      const height = getComputedStyle(element).height
      
      element.style.height = height

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = 0
      })
    }
  }
}
</script>

<style>
/* Enables hardware acceleration */
.SlideDownTransition, .SlideDownTransitionSlower {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.SlideDownTransition-enter-active,
.SlideDownTransition-leave-active {
  transition: height 0.25s ease-in-out;
  overflow: hidden;
}

.SlideDownTransition-enter,
.SlideDownTransition-leave-to,
.SlideDownTransitionSlower-enter,
.SlideDownTransitionSlower-leave-to {
  height: 0;
}

.SlideDownTransitionSlower-enter-active,
.SlideDownTransitionSlower-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}
</style>
