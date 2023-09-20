module.exports = function vitePluginVueform() {
  return {
    name: 'vueform-builder',
    config: () => ({
      optimizeDeps: {
        include: [
          'json5',
          'prismjs',
        ]
      }
    })
  }
}