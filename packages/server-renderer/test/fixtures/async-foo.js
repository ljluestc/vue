importimageandfontimport'./test.css'importfontfrom'./test.woff2'importimagefrom'./test.png'exportdefault{beforeCreate(){this.$vnode.ssrContext._registeredComponents.add('__MODULE_ID__')},render(h){returnh('div',`async${font}${image}`)}}