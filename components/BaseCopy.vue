<script>
import { h } from "vue"
import textMixin from "~/mixins/textMixin"

export default {
  mixins: [textMixin],

  props: {
    tag: {
      type: String,
      default: "p",
      validator: (value) =>
        ["p", "span", "address", "strong", "label", "dt", "dd", "div"].includes(
          value
        ),
    },
  },

  computed: {
    classes() {
      return {
        BaseCopy: true,
        ...this.textClasses,
      }
    },
  },

  render() {
    return h(`${this.tag}`, { class: this.classes }, this.$slots.default())
  },
}
</script>
