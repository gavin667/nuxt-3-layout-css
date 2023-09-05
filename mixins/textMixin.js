const sizeToClassMap = {
  h1: "t-h1",
  "h1-lg": "t-h1-lg",
  h2: "t-h2",
  h3: "t-h3",
  h4: "t-h4",
  "h4-base": "t-h4-base",
  h5: "t-h5",
  body: "t-body",
  "body-sm": "t-body-sm",
  base: "t-base",
}

export default {
  props: {
    size: {
      type: String,
      default: "h2",
      validator: (value) =>
        [
          "h1",
          "h1-lg",
          "h2",
          "h3",
          "h4",
          "h4-base",
          "h5",
          "body",
          "body-sm",
          "base",
        ].includes(value),
    },

    alignment: {
      type: [String, Boolean],
      default: false,
      validator: (value) => [false, "left", "center", "right"].includes(value),
    },

    fontDecoration: {
      type: [String, Boolean],
      default: false,
      validator: (value) =>
        [false, "line-through", "underline"].includes(value),
    },

    fontStyle: {
      type: [String, Boolean],
      default: false,
      validator: (value) => [false, "italic"].includes(value),
    },

    textTransform: {
      type: [String, Boolean],
      default: false,
      validator: (value) => [false, "uppercase", "capitalize"].includes(value),
    },
  },

  computed: {
    textClasses() {
      return {
        [`${sizeToClassMap[this.size]}`]: this.size,
        [`text-${this.alignment}`]: this.alignment,
        [`${this.fontDecoration}`]: this.fontDecoration,
        [`${this.fontStyle}`]: this.fontStyle,
        [`${this.textTransform}`]: this.textTransform,
      }
    },
  },
}
