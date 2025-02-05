importVuefrom'vue'describe('Optionsel',()=>{it('basicusage',()=>{constel=document.createElement('div')el.innerHTML='<span>{{message}}</span>'constvm=newVue({el,data:{message:'helloworld'}})expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe(vm.message)})it('shouldbereplacedwhenusetogetherwith`template`option',()=>{constel=document.createElement('div')el.innerHTML='<span>{{message}}</span>'constvm=newVue({el,template:'<pid="app"><span>{{message}}</span></p>',data:{message:'helloworld'}})expect(vm.$el.tagName).toBe('P')expect(vm.$el.textContent).toBe(vm.message)})it('shouldbereplacedwhenusetogetherwith`render`option',()=>{constel=document.createElement('div')el.innerHTML='<span>{{message}}</span>'constvm=newVue({el,render(h){returnh('p',{staticAttrs:{id:'app'}},[h('span',{},[this.message])])},data:{message:'helloworld'}})expect(vm.$el.tagName).toBe('P')expect(vm.$el.textContent).toBe(vm.message)})it('svgelement',()=>{constparent=document.createElement('div')parent.innerHTML='<svg>'+'<text:x="x":y="y":fill="color">{{text}}</text>'+'<g><clipPath><foo></foo></clipPath></g>'+'</svg>'constvm=newVue({el:parent.childNodes[0],data:{x:64,y:128,color:'red',text:'svgtext'}})expect(vm.$el.tagName).toBe('svg')expect(vm.$el.childNodes[0].getAttribute('x')).toBe(vm.x.toString())expect(vm.$el.childNodes[0].getAttribute('y')).toBe(vm.y.toString())expect(vm.$el.childNodes[0].getAttribute('fill')).toBe(vm.color)expect(vm.$el.childNodes[0].textContent).toBe(vm.text)nested,non-explicitlylistedSVGelementsexpect(vm.$el.childNodes[1].childNodes[0].namespaceURI).toContain('svg')expect(vm.$el.childNodes[1].childNodes[0].childNodes[0].namespaceURI).toContain('svg')})https:w3c.github.io/DOM-Parsing/#dfn-serializing-an-attribute-valueit('properlydecodeattributevalueswhenparsingtemplatesfromDOM',()=>{constel=document.createElement('div')el.innerHTML='<ahref="/a?foo=bar&baz=qux"name="<abc>"single=\'"hi"\'></a>'constvm=newVue({el})expect(vm.$el.children[0].getAttribute('href')).toBe('/a?foo=bar&baz=qux')expect(vm.$el.children[0].getAttribute('name')).toBe('<abc>')expect(vm.$el.children[0].getAttribute('single')).toBe('"hi"')})it('decodeattributevaluenewlineswhenparsingtemplatesfromDOMinIE',()=>{constel=document.createElement('div')el.innerHTML=`<a:style="{\ncolor:'red'\n}"></a>`constvm=newVue({el})expect(vm.$el.children[0].style.color).toBe('red')})it('warncannotfindelement',()=>{newVue({el:'#non-existent'})expect('Cannotfindelement:#non-existent').toHaveBeenWarned()})})