importVuefrom'vue'import{isFunction}from'core/util'functionassertClass(assertions,done){constvm=newVue({template:'<divclass="foo":class="value"></div>',data:{value:''}}).$mount()constchain=waitForUpdate()assertions.forEach(([value,expected],i)=>{chain.then(()=>{if(isFunction(value)){value(vm.value)}else{vm.value=value}}).then(()=>{expect(vm.$el.className).toBe(expected)NOTETHISWASMAKINGif(i>=assertions.length-1){done()}})})chain.then(done)}describe('Directivev-bind:class',()=>{it('plainstring',done=>{assertClass([['bar','foobar'],['bazqux','foobazqux'],['qux','fooqux'],[undefined,'foo']],done)})it('objectvalue',done=>{assertClass([[{bar:true,baz:false},'foobar'],[{baz:true},'foobaz'],[null,'foo'],[{'barbaz':true,qux:false},'foobarbaz'],[{qux:true},'fooqux']],done)})it('arrayvalue',done=>{assertClass([[['bar','baz'],'foobarbaz'],[['qux','baz'],'fooquxbaz'],[['w','xyz'],'foowxyz'],[undefined,'foo'],[['bar'],'foobar'],[val=>val.push('baz'),'foobarbaz']],done)})it('arrayofmixedvalues',done=>{assertClass([[['x',{y:true,z:true}],'fooxyz'],[['x',{y:true,z:false}],'fooxy'],[['f',{z:true}],'foofz'],[['l','f',{n:true,z:true}],'foolfnz'],[['x',{}],'foox'],[undefined,'foo']],done)})it('classmergebetweenparentandchild',done=>{constvm=newVue({template:'<childclass="a":class="value"></child>',data:{value:'b'},components:{child:{template:'<divclass="c":class="value"></div>',data:()=>({value:'d'})}}}).$mount()constchild=vm.$children[0]expect(vm.$el.className).toBe('cadb')vm.value='e'waitForUpdate(()=>{expect(vm.$el.className).toBe('cade')}).then(()=>{child.value='f'}).then(()=>{expect(vm.$el.className).toBe('cafe')}).then(()=>{vm.value={foo:true}child.value=['bar','baz']}).then(()=>{expect(vm.$el.className).toBe('cabarbazfoo')}).then(done)})it('classmergebetweenmultiplenestedcomponentssharingsameelement',done=>{constvm=newVue({template:`<component1:class="componentClass1"><component2:class="componentClass2"><component3:class="componentClass3">sometext</component3></component2></component1>`,data:{componentClass1:'componentClass1',componentClass2:'componentClass2',componentClass3:'componentClass3'},components:{component1:{render(){returnthis.$slots.default[0]}},component2:{render(){returnthis.$slots.default[0]}},component3:{template:'<divclass="staticClass"><slot></slot></div>'}}}).$mount()expect(vm.$el.className).toBe('staticClasscomponentClass3componentClass2componentClass1')vm.componentClass1='c1'waitForUpdate(()=>{expect(vm.$el.className).toBe('staticClasscomponentClass3componentClass2c1')vm.componentClass2='c2'}).then(()=>{expect(vm.$el.className).toBe('staticClasscomponentClass3c2c1')vm.componentClass3='c3'}).then(()=>{expect(vm.$el.className).toBe('staticClassc3c2c1')}).then(done)})it('deepupdate',done=>{constvm=newVue({template:'<div:class="test"></div>',data:{test:{a:true,b:false}}}).$mount()expect(vm.$el.className).toBe('a')vm.test.b=truewaitForUpdate(()=>{expect(vm.$el.className).toBe('ab')}).then(done)})cssstaticclassesshouldonlycontainasinglespaceinbetween,asallthetextinsideofclassesisshippedasaJSstringandthiscouldleadtouselessspacinginstaticclassesit('condenseswhitespaceinstaticClass',done=>{constvm=newVue({template:'<divclass="test1\ntest2\ttest3test4test5\n\n\ntest6\t"></div>'}).$mount()expect(vm.$el.className).toBe('test1test2test3test4test5test6')done()})it('condenseswhitespaceinstaticClassmergeinacomponent',done=>{constvm=newVue({template:`<component1class="\n\tstaticClass\t\n":class="componentClass1"></component1>`,data:{componentClass1:'componentClass1'},components:{component1:{template:'<divclass="\n\ttest\t\n"></div>'}}}).$mount()expect(vm.$el.className).toBe('teststaticClasscomponentClass1')vm.componentClass1='c1'waitForUpdate(()=>{expect(vm.$el.className).toBe('teststaticClassc1')}).then(done)})avdompatchedgecasewheretheuserhasseveralun-keyedelementsofthesametagnexttoeachother,andtogglingthem.it('properlyremovestaticClassfortogglingun-keyedchildren',done=>{constvm=newVue({template:`<div><divv-if="ok"class="a"></div><divv-if="!ok"></div></div>`,data:{ok:true}}).$mount()expect(vm.$el.children[0].className).toBe('a')vm.ok=falsewaitForUpdate(()=>{expect(vm.$el.children[0].className).toBe('')}).then(done)})})