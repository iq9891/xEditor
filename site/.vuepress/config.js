const base = process.env.GH ? '/xEditor/' : '/'

module.exports = {
  title: 'xeditor',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'iq9891/xEditor',
    searchMaxSuggestions: 5,
    docsDir: 'site',
  }
}
