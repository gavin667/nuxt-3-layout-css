export const useExampleStore = defineStore('example', {
  state: () => {
    return {
      activeSidebar: ''
    }
  },
  getters: () => {
    return { activeSidebar: this.activeSidebar }
  },
  actions: {
    toggleCountrySelector() {
      this.activeSidebar = this.activeSidebar ? '' : 'country-selector'
    },
    setActiveSidebar(slug) {
      this.activeSidebar = slug
    }
  }
})
