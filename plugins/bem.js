import { paramCase } from "change-case"

const isString = (val) => val && typeof val === "string" && val.length > 0
const isNumber = (val) => typeof val === "number" && isFinite(val)

const getBlockName = (instance) => {
  instance = instance || {}
  const blockName = instance.$options.name

  if (!blockName) {
    const debugBlockName = instance.name || instance._name || ""
    throw new Error(
      `
        Attempted to use $b() where component 
        name hasn't been defined. (${debugBlockName})
      `
    )
  }

  return blockName.replace(/<|>/g, "")
}

const bem = function (...args) {
  const blockName = getBlockName(this)
  const elementName = args.length && isString(args[0]) ? args[0] : null
  const blockAndElementName = elementName
    ? `${blockName}__${elementName}`
    : `${blockName}`

  const classes = [blockAndElementName]

  args = elementName ? args.slice(1) : args
  const modifiers = args.length ? args[0] : {}
  for (const key in modifiers) {
    const val = modifiers[key]
    if (isString(val) || isNumber(val))
      classes.push(`${blockAndElementName}--${paramCase(key)}-${val}`)
    else if (val) classes.push(`${blockAndElementName}--${paramCase(key)}`)
  }

  return classes
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    methods: {
      $b: bem,
    },
  })
})
