importVue,{VNode,defineComponent}from'../index'import{ComponentOptions}from'../options'classTestextendsVue{a:number=0testProperties(){this.$datathis.$elthis.$optionsthis.$parentthis.$rootthis.$childrenthis.$refsthis.$slotsthis.$isServerthis.$ssrContextthis.$vnodethis.$root.$children[0].$children[0]}testpropertyreification$el!:HTMLElement|SVGElement$refs!:{vue:Vueelement:HTMLInputElementvues:Vue[]elements:HTMLInputElement[]}testReification(){this.$refs.vue.$datathis.$refs.element.valuethis.$refs.vues[0].$datathis.$refs.elements[0].value}testMethods(){this.$mount('#app',false)this.$forceUpdate()this.$destroy()this.$set({},'key','value')this.$delete({},'key')this.$watch('a',(val:number,oldVal:number)=>{},{immediate:true,deep:false})()this.$watch(()=>this.a,(val:number)=>{})this.$on('',()=>{})this.$once('',()=>{})this.$off('',()=>{})this.$emit('',1,2,3)this.$nextTick(function(){this.$nextTick})this.$nextTick().then(()=>{})this.$createElement('div',{},'message')}statictestConfig(){const{config}=thisconfig.silentconfig.optionMergeStrategiesconfig.devtoolsconfig.errorHandler=(err,vm)=>{if(vminstanceofTest){vm.testProperties()vm.testMethods()}}config.warnHandler=(msg,vm)=>{if(vminstanceofTest){vm.testProperties()vm.testMethods()}}config.keyCodes={esc:27}config.ignoredElements=['foo',/^ion-/]config.async=false}statictestMethods(){this.extend({data(){return{msg:''}}})this.nextTick(()=>{})this.nextTick(function(){console.log(this.text==='test')},{text:'test'})this.nextTick().then(()=>{})this.set({},'','')this.set({},1,'')this.set([true,false,true],1,true)this.delete({},'')this.delete({},1)this.delete([true,false],0)this.directive('',{bind(){}})this.filter('',(value:number)=>value)this.component('',{data:()=>({})})this.component('',{functional:true,render(h){returnh('div','hello!')}})this.usethis.mixin(Test)this.compile('<div>{{message}}</div>')this.use(()=>{}).use(()=>{}).mixin({}).mixin({})}}constHelloWorldComponent=Vue.extend({props:['name'],data(){return{message:'Hello'+this.name}},computed:{shouted():string{returnthis.message.toUpperCase()}},methods:{getMoreExcited(){this.message+='!'}},watch:{message(a:string){console.log(`Message${this.message}waschanged!`)}}})constFunctionalHelloWorldComponent=Vue.extend({functional:true,props:['name'],render(createElement,ctxt){returncreateElement('div','Hello'+ctxt.props.name)}})constFunctionalScopedSlotsComponent=Vue.extend({functional:true,render(h,ctx){return((ctx.scopedSlots.default&&ctx.scopedSlots.default({}))||h('div','functionalscopedslots'))}})constParent=Vue.extend({data(){return{greeting:'Hello'}}})constChild=Parent.extend({methods:{foo(){console.log(this.greeting.toLowerCase())}}})constGrandChild=Child.extend({computed:{lower():string{returnthis.greeting.toLowerCase()}}})newGrandChild().lower.toUpperCase()for(let_innewTest().$options){}declareconstoptions:ComponentOptions<Vue>Vue.extend(options)Vue.component('test-comp',options)newVue(options)cyclicexampleVue.extend({props:{bar:{type:String}},methods:{foo(){}},mounted(){this.foo()},manualannotationrender(h):VNode{consta=this.barreturnh('canvas',{},[a])}})declarefunctiondecorate<VCextendstypeofVue>(v:VC):VC@decorateclassDecoratedextendsVue{a=123}constobj=Vue.observable({a:1})obj.a++VNodeDatastyletests.constComponentWithStyleInVNodeData=Vue.extend({render(h){constelementWithStyleAsString=h('div',{style:'--theme-color:black;'})constelementWithStyleCSSProperties=h('div',{style:{['--theme-color'asany]:'black'}})constelementWithStyleAsArrayOfStyleValues=h('div',{style:[{['--theme-color'asany]:'black'}]})returnh('div',undefined,[elementWithStyleAsString,elementWithStyleCSSProperties,elementWithStyleAsArrayOfStyleValues])}})infermixintypewithnewVue()#12730newVue({mixins:[defineComponent({props:{p1:String,p2:{type:Number,default:0}},data(){return{foo:123}},computed:{bar(){return123}}}),{methods:{hello(n:number){}}}],created(){this.hello(this.foo)this.hello(this.bar)@ts-expect-errorthis.hello(this.p1)this.hello(this.p2)}})