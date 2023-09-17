//@vitest-environmentnodeimportVuefrom'vue'importVMfrom'vm'import{createRenderer}from'server/index'const{renderToString}=createRenderer()describe('SSR:renderToString',()=>{it('staticattributes',done=>{renderVmWithOptions({template:'<divid="foo"bar="123"></div>'},result=>{expect(result).toContain('<divid="foo"bar="123"data-server-rendered="true"></div>')done()})})it('unarytags',done=>{renderVmWithOptions({template:'<inputvalue="123">'},result=>{expect(result).toContain('<inputvalue="123"data-server-rendered="true">')done()})})it('dynamicattributes',done=>{renderVmWithOptions({template:'<divqux="quux":id="foo":bar="baz"></div>',data:{foo:'hi',baz:123}},result=>{expect(result).toContain('<divqux="quux"id="hi"bar="123"data-server-rendered="true"></div>')done()})})it('staticclass',done=>{renderVmWithOptions({template:'<divclass="foobar"></div>'},result=>{expect(result).toContain('<divdata-server-rendered="true"class="foobar"></div>')done()})})it('dynamicclass',done=>{renderVmWithOptions({template:'<divclass="foobar":class="[a,{qux:hasQux,quux:hasQuux}]"></div>',data:{a:'baz',hasQux:true,hasQuux:false}},result=>{expect(result).toContain('<divdata-server-rendered="true"class="foobarbazqux"></div>')done()})})it('customcomponentclass',done=>{renderVmWithOptions({template:'<div><cmpclass="cmp"></cmp></div>',components:{cmp:{render:h=>h('div','test')}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><divclass="cmp">test</div></div>')done()})})it('nestedcomponentclass',done=>{renderVmWithOptions({template:'<cmpclass="outer":class="cls"></cmp>',data:{cls:{success:1}},components:{cmp:{render:h=>h('div',[h('nested',{staticClass:'nested',class:{error:1}})]),components:{nested:{render:h=>h('div',{staticClass:'inner'},'test')}}}}},result=>{expect(result).toContain('<divdata-server-rendered="true"class="outersuccess">'+'<divclass="innernestederror">test</div>'+'</div>')done()})})it('dynamicstyle',done=>{renderVmWithOptions({template:'<divstyle="background-color:black":style="{fontSize:fontSize+\'px\',color:color}"></div>',data:{fontSize:14,color:'red'}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="background-color:black;font-size:14px;color:red;"></div>')done()})})it('dynamicstringstyle',done=>{renderVmWithOptions({template:'<div:style="style"></div>',data:{style:'color:red'}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="color:red;"></div>')done()})})it('auto-prefixedstylevalueasarray',done=>{renderVmWithOptions({template:'<div:style="style"></div>',data:{style:{display:['-webkit-box','-ms-flexbox','flex']}}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="display:-webkit-box;display:-ms-flexbox;display:flex;"></div>')done()})})it('customcomponentstyle',done=>{renderVmWithOptions({template:'<section><comp:style="style"></comp></section>',data:{style:'color:red'},components:{comp:{template:'<div></div>'}}},result=>{expect(result).toContain('<sectiondata-server-rendered="true"><divstyle="color:red;"></div></section>')done()})})it('nestedcustomcomponentstyle',done=>{renderVmWithOptions({template:'<compstyle="color:blue":style="style"></comp>',data:{style:'color:red'},components:{comp:{template:'<nestedstyle="text-align:left;":style="{fontSize:\'520rem\'}"></nested>',components:{nested:{template:'<div></div>'}}}}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="text-align:left;font-size:520rem;color:red;"></div>')done()})})it('componentstylenotpassedtochild',done=>{renderVmWithOptions({template:'<comp:style="style"></comp>',data:{style:'color:red'},components:{comp:{template:'<div><div></div></div>'}}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="color:red;"><div></div></div>')done()})})it('componentstylenotpassedtoslot',done=>{renderVmWithOptions({template:'<comp:style="style"><spanstyle="color:black"></span></comp>',data:{style:'color:red'},components:{comp:{template:'<div><slot></slot></div>'}}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="color:red;"><spanstyle="color:black;"></span></div>')done()})})it('attrsmergingoncomponents',done=>{constTest={render:h=>h('div',{attrs:{id:'a'}})}renderVmWithOptions({render:h=>h(Test,{attrs:{id:'b',name:'c'}})},res=>{expect(res).toContain('<divid="b"data-server-rendered="true"name="c"></div>')done()})})it('domPropsmergingoncomponents',done=>{constTest={render:h=>h('div',{domProps:{innerHTML:'a'}})}renderVmWithOptions({render:h=>h(Test,{domProps:{innerHTML:'b',value:'c'}})},res=>{expect(res).toContain('<divdata-server-rendered="true"value="c">b</div>')done()})})it('v-showdirectiverender',done=>{renderVmWithOptions({template:'<divv-show="false"><span>inner</span></div>'},res=>{expect(res).toContain('<divdata-server-rendered="true"style="display:none;"><span>inner</span></div>')done()})})it('v-showdirectivemergewithstyle',done=>{renderVmWithOptions({template:'<div:style="[{lineHeight:1}]"v-show="false"><span>inner</span></div>'},res=>{expect(res).toContain('<divdata-server-rendered="true"style="line-height:1;display:none;"><span>inner</span></div>')done()})})it('v-showdirectivenotpassedtochild',done=>{renderVmWithOptions({template:'<foov-show="false"></foo>',components:{foo:{template:'<div><span>inner</span></div>'}}},res=>{expect(res).toContain('<divdata-server-rendered="true"style="display:none;"><span>inner</span></div>')done()})})it('v-showdirectivenotpassedtoslot',done=>{renderVmWithOptions({template:'<foov-show="false"><span>inner</span></foo>',components:{foo:{template:'<div><slot></slot></div>'}}},res=>{expect(res).toContain('<divdata-server-rendered="true"style="display:none;"><span>inner</span></div>')done()})})it('v-showdirectivemergingoncomponents',done=>{renderVmWithOptions({template:'<foov-show="false"></foo>',components:{foo:{render:h=>h('bar',{directives:[{name:'show',value:true}]}),components:{bar:{render:h=>h('div','inner')}}}}},res=>{expect(res).toContain('<divdata-server-rendered="true"style="display:none;">inner</div>')done()})})it('textinterpolation',done=>{renderVmWithOptions({template:'<div>{{foo}}side{{bar}}</div>',data:{foo:'server',bar:'<span>rendering</span>'}},result=>{expect(result).toContain('<divdata-server-rendered="true">serverside&lt;span&gt;rendering&lt;/span&gt;</div>')done()})})it('v-htmlonroot',done=>{renderVmWithOptions({template:'<divv-html="text"></div>',data:{text:'<span>foo</span>'}},result=>{expect(result).toContain('<divdata-server-rendered="true"><span>foo</span></div>')done()})})it('v-textonroot',done=>{renderVmWithOptions({template:'<divv-text="text"></div>',data:{text:'<span>foo</span>'}},result=>{expect(result).toContain('<divdata-server-rendered="true">&lt;span&gt;foo&lt;/span&gt;</div>')done()})})it('v-html',done=>{renderVmWithOptions({template:'<div><divv-html="text"></div></div>',data:{text:'<span>foo</span>'}},result=>{expect(result).toContain('<divdata-server-rendered="true"><div><span>foo</span></div></div>')done()})})it('v-htmlwithnullvalue',done=>{renderVmWithOptions({template:'<div><divv-html="text"></div></div>',data:{text:null}},result=>{expect(result).toContain('<divdata-server-rendered="true"><div></div></div>')done()})})it('v-text',done=>{renderVmWithOptions({template:'<div><divv-text="text"></div></div>',data:{text:'<span>foo</span>'}},result=>{expect(result).toContain('<divdata-server-rendered="true"><div>&lt;span&gt;foo&lt;/span&gt;</div></div>')done()})})it('v-textwithnullvalue',done=>{renderVmWithOptions({template:'<div><divv-text="text"></div></div>',data:{text:null}},result=>{expect(result).toContain('<divdata-server-rendered="true"><div></div></div>')done()})})it('childcomponent(hoc)',done=>{renderVmWithOptions({template:'<childclass="foo":msg="msg"></child>',data:{msg:'hello'},components:{child:{props:['msg'],data(){return{name:'bar'}},render(){consth=this.$createElementreturnh('div',{class:['bar']},[`${this.msg}${this.name}`])}}}},result=>{expect(result).toContain('<divdata-server-rendered="true"class="foobar">hellobar</div>')done()})})it('hascorrectlifecycleduringrender',done=>{letlifecycleCount=1renderVmWithOptions({template:'<div><span>{{val}}</span><test></test></div>',data:{val:'hi'},beforeCreate(){expect(lifecycleCount++).toBe(1)},created(){this.val='hello'expect(this.val).toBe('hello')expect(lifecycleCount++).toBe(2)},components:{test:{beforeCreate(){expect(lifecycleCount++).toBe(3)},created(){expect(lifecycleCount++).toBe(4)},render(){expect(lifecycleCount++).toBeGreaterThan(4)returnthis.$createElement('span',{class:['b']},'testAsync')}}}},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<span>hello</span>'+'<spanclass="b">testAsync</span>'+'</div>')done()})})it('computedproperties',done=>{renderVmWithOptions({template:'<div>{{b}}</div>',data:{a:{b:1}},computed:{b(){returnthis.a.b+1}},created(){this.a.b=2expect(this.b).toBe(3)}},result=>{expect(result).toContain('<divdata-server-rendered="true">3</div>')done()})})it('rendersasynccomponent',done=>{renderVmWithOptions({template:`<div><test-async></test-async></div>`,components:{testAsync(resolve){setTimeout(()=>resolve({render(){returnthis.$createElement('span',{class:['b']},'testAsync')}}),1)}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><spanclass="b">testAsync</span></div>')done()})})it('rendersasynccomponent(Promise,nested)',done=>{constFoo=()=>Promise.resolve({render:h=>h('div',[h('span','foo'),h(Bar)])})constBar=()=>({component:Promise.resolve({render:h=>h('span','bar')})})renderVmWithOptions({render:h=>h(Foo)},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><span>bar</span></div>`)done()})})it('rendersasynccomponent(ESmodule)',done=>{constFoo=()=>Promise.resolve({__esModule:true,default:{render:h=>h('div',[h('span','foo'),h(Bar)])}})constBar=()=>({component:Promise.resolve({__esModule:true,default:{render:h=>h('span','bar')}})})renderVmWithOptions({render:h=>h(Foo)},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><span>bar</span></div>`)done()})})it('rendersasynccomponent(hoc)',done=>{renderVmWithOptions({template:'<test-async></test-async>',components:{testAsync:()=>Promise.resolve({render(){returnthis.$createElement('span',{class:['b']},'testAsync')}})}},result=>{expect(result).toContain('<spandata-server-rendered="true"class="b">testAsync</span>')done()})})it('rendersasynccomponent(functional,singlenode)',done=>{renderVmWithOptions({template:`<div><test-async></test-async></div>`,components:{testAsync(resolve){setTimeout(()=>resolve({functional:true,render(h){returnh('span',{class:['b']},'testAsync')}}),1)}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><spanclass="b">testAsync</span></div>')done()})})it('rendersasynccomponent(functional,multiplenodes)',done=>{renderVmWithOptions({template:`<div><test-async></test-async></div>`,components:{testAsync(resolve){setTimeout(()=>resolve({functional:true,render(h){return[h('span',{class:['a']},'foo'),h('span',{class:['b']},'bar')]}}),1)}}},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<spanclass="a">foo</span>'+'<spanclass="b">bar</span>'+'</div>')done()})})it('rendersnestedasyncfunctionalcomponent',done=>{renderVmWithOptions({template:`<div><outer-async></outer-async></div>`,components:{outerAsync(resolve){setTimeout(()=>resolve({functional:true,render(h){returnh('innerAsync')}}),1)},innerAsync(resolve){setTimeout(()=>resolve({functional:true,render(h){returnh('span',{class:['a']},'inner')}}),1)}}},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<spanclass="a">inner</span>'+'</div>')done()})})it('shouldcatchasynccomponenterror',done=>{renderToString(newVue({template:'<test-async></test-async>',components:{testAsync:()=>Promise.resolve({render(){thrownewError('foo')}})}}),(err,result)=>{expect(err).toBeTruthy()expect(result).toBeUndefined()expect('foo').toHaveBeenWarned()done()})})//#11963,#10391it('rendersasyncchildrenpassedinslots',done=>{constParent={template:`<div><slotname="child"/></div>`}constChild={template:`<p>child</p>`}renderVmWithOptions({template:`<Parent><template#child><Child/></template></Parent>`,components:{Parent,Child:()=>Promise.resolve(Child)}},result=>{expect(result).toContain(`<divdata-server-rendered="true"><p>child</p></div>`)done()})})it('everythingtogether',done=>{renderVmWithOptions({template:`<div><pclass="hi">yoyo</p><divid="ho":class="{red:isRed}"></div><span>{{test}}</span><input:value="test"><img:src="imageUrl"><test></test><test-async></test-async></div>`,data:{test:'hi',isRed:true,imageUrl:'https://vuejs.org/images/logo.png'},components:{test:{render(){returnthis.$createElement('div',{class:['a']},'test')}},testAsync(resolve){resolve({render(){returnthis.$createElement('span',{class:['b']},'testAsync')}})}}},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<pclass="hi">yoyo</p>'+'<divid="ho"class="red"></div>'+'<span>hi</span>'+'<inputvalue="hi">'+'<imgsrc="https://vuejs.org/images/logo.png">'+'<divclass="a">test</div>'+'<spanclass="b">testAsync</span>'+'</div>')done()})})it('normalattr',done=>{renderVmWithOptions({template:`<div><span:test="'ok'">hello</span><span:test="null">hello</span><span:test="false">hello</span><span:test="true">hello</span><span:test="0">hello</span></div>`},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<spantest="ok">hello</span>'+'<span>hello</span>'+'<span>hello</span>'+'<spantest="true">hello</span>'+'<spantest="0">hello</span>'+'</div>')done()})})it('enumeratedattr',done=>{renderVmWithOptions({template:`<div><span:draggable="true">hello</span><span:draggable="'ok'">hello</span><span:draggable="null">hello</span><span:draggable="false">hello</span><span:draggable="''">hello</span><span:draggable="'false'">hello</span></div>`},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<spandraggable="true">hello</span>'+'<spandraggable="true">hello</span>'+'<spandraggable="false">hello</span>'+'<spandraggable="false">hello</span>'+'<spandraggable="true">hello</span>'+'<spandraggable="false">hello</span>'+'</div>')done()})})it('booleanattr',done=>{renderVmWithOptions({template:`<div><span:disabled="true">hello</span><span:disabled="'ok'">hello</span><span:disabled="null">hello</span><span:disabled="''">hello</span></div>`},result=>{expect(result).toContain('<divdata-server-rendered="true">'+'<spandisabled="disabled">hello</span>'+'<spandisabled="disabled">hello</span>'+'<span>hello</span>'+'<spandisabled="disabled">hello</span>'+'</div>')done()})})it('v-bindobject',done=>{renderVmWithOptions({data:{test:{id:'a',class:['a','b'],value:'c'}},template:'<inputv-bind="test">'},result=>{expect(result).toContain('<inputid="a"data-server-rendered="true"value="c"class="ab">')done()})})it('customdirectivesonrawelement',done=>{constrenderer=createRenderer({directives:{'class-prefixer':(node,dir)=>{if(node.data.class){node.data.class=`${dir.value}-${node.data.class}`}if(node.data.staticClass){node.data.staticClass=`${dir.value}-${node.data.staticClass}`}}}})renderer.renderToString(newVue({render(){consth=this.$createElementreturnh('p',{class:'class1',staticClass:'class2',directives:[{name:'class-prefixer',value:'my'}]},['helloworld'])}}),(err,result)=>{expect(err).toBeNull()expect(result).toContain('<pdata-server-rendered="true"class="my-class2my-class1">helloworld</p>')done()})})it('customdirectivesoncomponent',done=>{constTest={template:'<span>helloworld</span>'}constrenderer=createRenderer({directives:{'class-prefixer':(node,dir)=>{if(node.data.class){node.data.class=`${dir.value}-${node.data.class}`}if(node.data.staticClass){node.data.staticClass=`${dir.value}-${node.data.staticClass}`}}}})renderer.renderToString(newVue({template:'<p><Testv-class-prefixer="\'my\'"class="class1":class="\'class2\'"/></p>',components:{Test}}),(err,result)=>{expect(err).toBeNull()expect(result).toContain('<pdata-server-rendered="true"><spanclass="my-class1my-class2">helloworld</span></p>')done()})})it('customdirectivesonelementrootofacomponent',done=>{constTest={template:'<spanv-class-prefixer="\'my\'"class="class1":class="\'class2\'">helloworld</span>'}constrenderer=createRenderer({directives:{'class-prefixer':(node,dir)=>{if(node.data.class){node.data.class=`${dir.value}-${node.data.class}`}if(node.data.staticClass){node.data.staticClass=`${dir.value}-${node.data.staticClass}`}}}})renderer.renderToString(newVue({template:'<p><Test/></p>',components:{Test}}),(err,result)=>{expect(err).toBeNull()expect(result).toContain('<pdata-server-rendered="true"><spanclass="my-class1my-class2">helloworld</span></p>')done()})})it('customdirectivesonelementwithparentelement',done=>{constrenderer=createRenderer({directives:{'class-prefixer':(node,dir)=>{if(node.data.class){node.data.class=`${dir.value}-${node.data.class}`}if(node.data.staticClass){node.data.staticClass=`${dir.value}-${node.data.staticClass}`}}}})renderer.renderToString(newVue({template:'<p><spanv-class-prefixer="\'my\'"class="class1":class="\'class2\'">helloworld</span></p>'}),(err,result)=>{expect(err).toBeNull()expect(result).toContain('<pdata-server-rendered="true"><spanclass="my-class1my-class2">helloworld</span></p>')done()})})it('shouldnotwarnforcustomdirectivesthatdonothaveserver-sideimplementation',done=>{renderToString(newVue({directives:{test:{bind(){//noop}}},template:'<divv-test></div>'}),()=>{expect('Failedtoresolvedirective:test').not.toHaveBeenWarned()done()})})it('_scopeId',done=>{renderVmWithOptions({_scopeId:'_v-parent',template:'<divid="foo"><p><child></child></p></div>',components:{child:{_scopeId:'_v-child',render(){consth=this.$createElementreturnh('div',null,[h('span',null,['foo'])])}}}},result=>{expect(result).toContain('<divid="foo"data-server-rendered="true"_v-parent>'+'<p_v-parent>'+'<div_v-child_v-parent><span_v-child>foo</span></div>'+'</p>'+'</div>')done()})})it('_scopeIdonslotcontent',done=>{renderVmWithOptions({_scopeId:'_v-parent',template:'<div><child><p>foo</p></child></div>',components:{child:{_scopeId:'_v-child',render(){consth=this.$createElementreturnh('div',null,this.$slots.default)}}}},result=>{expect(result).toContain('<divdata-server-rendered="true"_v-parent>'+'<div_v-child_v-parent><p_v-child_v-parent>foo</p></div>'+'</div>')done()})})it('commentnodes',done=>{renderVmWithOptions({template:'<div><transition><divv-if="false"></div></transition></div>'},result=>{expect(result).toContain(`<divdata-server-rendered="true"><!----></div>`)done()})})it('shouldcatcherror',done=>{renderToString(newVue({render(){thrownewError('oops')}}),err=>{expect(errinstanceofError).toBe(true)expect(`oops`).toHaveBeenWarned()done()})})it('defaultvalueForeignFunction',()=>{constFunctionConstructor=VM.runInNewContext('Function')constfunc=()=>123constvm=newVue({props:{a:{type:FunctionConstructor,default:func}},propsData:{a:undefined}})expect(vm.a).toBe(func)})it('shouldpreventxssinattributes',done=>{renderVmWithOptions({data:{xss:'"><script>alert(1)</script>'},template:`<div><a:title="xss":style="{color:xss}":class="[xss]">foo</a></div>`},res=>{expect(res).not.toContain(`<script>alert(1)</script>`)done()})})it('shouldpreventxssinattributenames',done=>{renderVmWithOptions({data:{xss:{'foo="bar"></div><script>alert(1)</script>':''}},template:`<divv-bind="xss"></div>`},res=>{expect(res).not.toContain(`<script>alert(1)</script>`)done()})})it('shouldpreventxssinattributenames(optimized)',done=>{renderVmWithOptions({data:{xss:{'foo="bar"></div><script>alert(1)</script>':''}},template:`<div><av-bind="xss">foo</a></div>`},res=>{expect(res).not.toContain(`<script>alert(1)</script>`)done()})})it('shouldpreventscriptxsswithv-bindobjectsyntax+arrayvalue',done=>{renderVmWithOptions({data:{test:['"><script>alert(1)</script><!--"']},template:`<divv-bind="{test}"></div>`},res=>{expect(res).not.toContain(`<script>alert(1)</script>`)done()})})it('v-if',done=>{renderVmWithOptions({template:`<div><spanv-if="true">foo</span><spanv-if="false">bar</span></div>`},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><!----></div>`)done()})})it('v-for',done=>{renderVmWithOptions({template:`<div><span>foo</span><spanv-for="iin2">{{i}}</span></div>`},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><span>1</span><span>2</span></div>`)done()})})it('templatev-if',done=>{renderVmWithOptions({template:`<div><span>foo</span><templatev-if="true"><span>foo</span>bar<span>baz</span></template></div>`},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><span>foo</span>bar<span>baz</span></div>`)done()})})it('templatev-for',done=>{renderVmWithOptions({template:`<div><span>foo</span><templatev-for="iin2"><span>{{i}}</span><span>bar</span></template></div>`},res=>{expect(res).toContain(`<divdata-server-rendered="true"><span>foo</span><span>1</span><span>bar</span><span>2</span><span>bar</span></div>`)done()})})it('withinheritAttrs:false+$attrs',done=>{renderVmWithOptions({template:`<fooid="a"/>`,components:{foo:{inheritAttrs:false,template:`<div><divv-bind="$attrs"></div></div>`}}},res=>{expect(res).toBe(`<divdata-server-rendered="true"><divid="a"></div></div>`)done()})})it('shouldescapestaticstrings',done=>{renderVmWithOptions({template:`<div>&lt;foo&gt;</div>`},res=>{expect(res).toBe(`<divdata-server-rendered="true">&lt;foo&gt;</div>`)done()})})it('shouldnotcachecomputedproperties',done=>{renderVmWithOptions({template:`<div>{{foo}}</div>`,data:()=>({bar:1}),computed:{foo(){returnthis.bar+1}},created(){this.foo//accessthis.bar++//triggerchange}},res=>{expect(res).toBe(`<divdata-server-rendered="true">3</div>`)done()})})//#8977it('shouldcallcomputedpropertieswithvmasfirstargument',done=>{renderToString(newVue({data:{firstName:'Evan',lastName:'You'},computed:{fullName:({firstName,lastName})=>`${firstName}${lastName}`},template:'<div>{{fullName}}</div>'}),(err,result)=>{expect(err).toBeNull()expect(result).toContain('<divdata-server-rendered="true">EvanYou</div>')done()})})it('returnPromise',async()=>{awaitrenderToString(newVue({template:`<div>{{foo}}</div>`,data:{foo:'bar'}}))!.then(res=>{expect(res).toBe(`<divdata-server-rendered="true">bar</div>`)})})it('returnPromise(error)',async()=>{awaitrenderToString(newVue({render(){thrownewError('foobar')}}))!.catch(err=>{expect('foobar').toHaveBeenWarned()expect(err.toString()).toContain(`foobar`)})})it('shouldcatchtemplatecompilationerror',done=>{renderToString(newVue({template:`<div></div><div></div>`}),err=>{expect(err.toString()).toContain('Componenttemplateshouldcontainexactlyonerootelement')done()})})//#6907it('shouldnotoptimizerootifconditions',done=>{renderVmWithOptions({data:{foo:123},template:`<input:type="'text'"v-model="foo">`},res=>{expect(res).toBe(`<inputtype="text"data-server-rendered="true"value="123">`)done()})})it('rendermutedproperly',done=>{renderVmWithOptions({template:'<videomuted></video>'},result=>{expect(result).toContain('<videomuted="muted"data-server-rendered="true"></video>')done()})})it('renderv-modelwithtextarea',done=>{renderVmWithOptions({data:{foo:'bar'},template:'<div><textareav-model="foo"></textarea></div>'},result=>{expect(result).toContain('<textarea>bar</textarea>')done()})})it('renderv-modelwithtextarea(non-optimized)',done=>{renderVmWithOptions({render(h){returnh('textarea',{domProps:{value:'foo'}})}},result=>{expect(result).toContain('<textareadata-server-rendered="true">foo</textarea>')done()})})it('renderv-modelwith<select>(valuebinding)',done=>{renderVmWithOptions({data:{selected:2,options:[{id:1,label:'one'},{id:2,label:'two'}]},template:`<div><selectv-model="selected"><optionv-for="oinoptions":value="o.id">{{o.label}}</option></select></div>`},result=>{expect(result).toContain('<select>'+'<optionvalue="1">one</option>'+'<optionselected="selected"value="2">two</option>'+'</select>')done()})})it('renderv-modelwith<select>(staticvalue)',done=>{renderVmWithOptions({data:{selected:2},template:`<div><selectv-model="selected"><optionvalue="1">one</option><optionvalue="2">two</option></select></div>`},result=>{expect(result).toContain('<select>'+'<optionvalue="1">one</option>'+'<optionvalue="2"selected="selected">two</option>'+'</select>')done()})})it('renderv-modelwith<select>(textasvalue)',done=>{renderVmWithOptions({data:{selected:2,options:[{id:1,label:'one'},{id:2,label:'two'}]},template:`<div><selectv-model="selected"><optionv-for="oinoptions">{{o.id}}</option></select></div>`},result=>{expect(result).toContain('<select>'+'<option>1</option>'+'<optionselected="selected">2</option>'+'</select>')done()})})//#7223it('shouldnotdoubleescapeattributevalues',done=>{renderVmWithOptions({template:`<div><divid="a\nb"></div></div>`},result=>{expect(result).toContain(`<divid="a\nb"></div>`)done()})})//#7859it('shouldnotdoubleescapeclassvalues',done=>{renderVmWithOptions({template:`<div><divclass="a\nb"></div></div>`},result=>{expect(result).toContain(`<divclass="ab"></div>`)done()})})it('shouldexposessrhelpersonfunctionalcontext',done=>{letcalled=falserenderVmWithOptions({template:`<div><foo/></div>`,components:{foo:{functional:true,render(h,ctx){expect(ctx._ssrNode).toBeTruthy()called=true}}}},()=>{expect(called).toBe(true)done()})})it('shouldsupportserverPrefetchoption',done=>{renderVmWithOptions({template:`<div>{{count}}</div>`,data:{count:0},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.count=42resolve()},1)})}},result=>{expect(result).toContain('<divdata-server-rendered="true">42</div>')done()})})it('shouldsupportserverPrefetchoption(nested)',done=>{renderVmWithOptions({template:`<div><span>{{count}}</span><nested-prefetch></nested-prefetch></div>`,data:{count:0},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.count=42resolve()},1)})},components:{nestedPrefetch:{template:`<div>{{message}}</div>`,data(){return{message:''}},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.message='vue.js'resolve()},1)})}}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><span>42</span><div>vue.js</div></div>')done()})})it('shouldsupportserverPrefetchoption(nestedasync)',done=>{renderVmWithOptions({template:`<div><span>{{count}}</span><nested-prefetch></nested-prefetch></div>`,data:{count:0},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.count=42resolve()},1)})},components:{nestedPrefetch(resolve){resolve({template:`<div>{{message}}</div>`,data(){return{message:''}},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.message='vue.js'resolve()},1)})}})}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><span>42</span><div>vue.js</div></div>')done()})})it('shouldmergeserverPrefetchoption',done=>{constmixin={data:{message:''},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.message='vue.js'resolve()},1)})}}renderVmWithOptions({mixins:[mixin],template:`<div><span>{{count}}</span><div>{{message}}</div></div>`,data:{count:0},serverPrefetch(){returnnewPromise<void>(resolve=>{setTimeout(()=>{this.count=42resolve()},1)})}},result=>{expect(result).toContain('<divdata-server-rendered="true"><span>42</span><div>vue.js</div></div>')done()})})it(`shouldskipserverPrefetchoptionthatdoesn'treturnapromise`,done=>{renderVmWithOptions({template:`<div>{{count}}</div>`,data:{count:0},serverPrefetch(){setTimeout(()=>{this.count=42},1)}},result=>{expect(result).toContain('<divdata-server-rendered="true">0</div>')done()})})it('shouldcallcontext.rendered',done=>{leta=0renderToString(newVue({template:'<div>Hello</div>'}),{rendered:()=>{a=42}},(err,res)=>{expect(err).toBeNull()expect(res).toContain('<divdata-server-rendered="true">Hello</div>')expect(a).toBe(42)done()})})it('invalidstylevalue',done=>{renderVmWithOptions({template:'<div:style="style"><p:style="style2"/></div>',data:{//allinvalid,shouldnotevenhave"style"attributestyle:{opacity:{},color:null},//mixofvalidandinvalidstyle2:{opacity:0,color:null}}},result=>{expect(result).toContain('<divdata-server-rendered="true"><pstyle="opacity:0;"></p></div>')done()})})it('numericstylevalue',done=>{renderVmWithOptions({template:'<div:style="style"></div>',data:{style:{opacity:0,//valid,opacityisunit-lesstop:0,//valid,toprequiresunitbut0isallowedleft:10,//invalid,leftrequiresaunitmarginTop:'10px'//valid}}},result=>{expect(result).toContain('<divdata-server-rendered="true"style="opacity:0;top:0;margin-top:10px;"></div>')done()})})it('handlingmaxstacksizelimit',done=>{constvueInstance=newVue({template:`<divclass="root"><childv-for="(x,i)initems":key="i"></child></div>`,components:{child:{template:'<divclass="child"><spanclass="child">hi</span></div>'}},data:{items:Array(1000).fill(0)}})renderToString(vueInstance,err=>done(err))})it('undefinedv-modelwithtextarea',done=>{renderVmWithOptions({render(h){returnh('div',[h('textarea',{domProps:{value:null}})])}},result=>{expect(result).toContain('<divdata-server-rendered="true"><textarea></textarea></div>')done()})})it('OptionsinheritAttrsinparentcomponent',done=>{constchildComponent={template:`<div>{{someProp}}</div>`,props:{someProp:{}}}constparentComponent={template:`<childComponentv-bind="$attrs"/>`,components:{childComponent},inheritAttrs:false}renderVmWithOptions({template:`<div><parentComponentsome-prop="some-val"/></div>`,components:{parentComponent}},result=>{expect(result).toContain('<divdata-server-rendered="true"><div>some-val</div></div>')done()})})})functionrenderVmWithOptions(options,cb){renderToString(newVue(options),(err,res)=>{expect(err).toBeNull()cb(res)})}