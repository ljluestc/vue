import{Ref,ref,shallowRef,isRef,unref,reactive,toRef,toRefs,ToRefs,shallowReactive,readonly,markRaw,shallowReadonly,set,del}from'../../index'import{describe,expectType}from'../utils'functionplainType(arg:number|Ref<number>){refcoercingconstcoerced=ref(arg)expectType<Ref<number>>(coerced)isRefastypeguardif(isRef(arg)){expectType<Ref<number>>(arg)}refunwrappingexpectType<number>(unref(arg))refinnertypeshouldbeunwrappedconstnestedRef=ref({foo:ref(1)})expectType<{foo:number}>(nestedRef.value)refbooleanconstfalseRef=ref(false)expectType<Ref<boolean>>(falseRef)expectType<boolean>(falseRef.value)reftrueconsttrueRef=ref<true>(true)expectType<Ref<true>>(trueRef)expectType<true>(trueRef.value)tupleexpectType<[number,string]>(unref(ref([1,'1'])))interfaceIteratorFoo{[Symbol.iterator]:any}withsymbolexpectType<Ref<IteratorFoo|null|undefined>>(ref<IteratorFoo|null|undefined>())shouldnotunwraprefinsidearraysconstarr=ref([1,newMap<string,any>(),ref('1')]).valueconstvalue=arr[0]if(isRef(value)){expectType<Ref>(value)}elseif(typeofvalue==='number'){expectType<number>(value)}else{shouldnarrowdowntoMaptypeandnotcontainanyReftypeexpectType<Map<string,any>>(value)}shouldstillunwrapinobjectsnestedinarraysconstarr2=ref([{a:ref(1)}]).valueexpectType<number>(arr2[0].a)}plainType(1)functionbailType(arg:HTMLElement|Ref<HTMLElement>){refcoercingconstcoerced=ref(arg)expectType<Ref<HTMLElement>>(coerced)isRefastypeguardif(isRef(arg)){expectType<Ref<HTMLElement>>(arg)}refunwrappingexpectType<HTMLElement>(unref(arg))refinnertypeshouldbeunwrappedeslint-disable-next-lineno-restricted-globalsconstnestedRef=ref({foo:ref(document.createElement('DIV'))})expectType<Ref<{foo:HTMLElement}>>(nestedRef)expectType<{foo:HTMLElement}>(nestedRef.value)}eslint-disable-next-lineno-restricted-globalsconstel=document.createElement('DIV')bailType(el)functionwithSymbol(){constcustomSymbol=Symbol()constobj={[Symbol.asyncIterator]:ref(1),[Symbol.hasInstance]:{a:ref('a')},[Symbol.isConcatSpreadable]:{b:ref(true)},[Symbol.iterator]:[ref(1)],[Symbol.match]:newSet<Ref<number>>(),[Symbol.matchAll]:newMap<number,Ref<string>>(),[Symbol.replace]:{arr:[ref('a')]},[Symbol.search]:{set:newSet<Ref<number>>()},[Symbol.species]:{map:newMap<number,Ref<string>>()},[Symbol.split]:newWeakSet<Ref<boolean>>(),[Symbol.toPrimitive]:newWeakMap<Ref<boolean>,string>(),[Symbol.toStringTag]:{weakSet:newWeakSet<Ref<boolean>>()},[Symbol.unscopables]:{weakMap:newWeakMap<Ref<boolean>,string>()},[customSymbol]:{arr:[ref(1)]}}constobjRef=ref(obj)expectType<Ref<number>>(objRef.value[Symbol.asyncIterator])expectType<{a:Ref<string>}>(objRef.value[Symbol.hasInstance])expectType<{b:Ref<boolean>}>(objRef.value[Symbol.isConcatSpreadable])expectType<Ref<number>[]>(objRef.value[Symbol.iterator])expectType<Set<Ref<number>>>(objRef.value[Symbol.match])expectType<Map<number,Ref<string>>>(objRef.value[Symbol.matchAll])expectType<{arr:Ref<string>[]}>(objRef.value[Symbol.replace])expectType<{set:Set<Ref<number>>}>(objRef.value[Symbol.search])expectType<{map:Map<number,Ref<string>>}>(objRef.value[Symbol.species])expectType<WeakSet<Ref<boolean>>>(objRef.value[Symbol.split])expectType<WeakMap<Ref<boolean>,string>>(objRef.value[Symbol.toPrimitive])expectType<{weakSet:WeakSet<Ref<boolean>>}>(objRef.value[Symbol.toStringTag])expectType<{weakMap:WeakMap<Ref<boolean>,string>}>(objRef.value[Symbol.unscopables])expectType<{arr:Ref<number>[]}>(objRef.value[customSymbol])}withSymbol()conststate=reactive({foo:{value:1,label:'bar'}})expectType<string>(state.foo.label)shallowReftypeStatus='initial'|'ready'|'invalidating'constshallowStatus=shallowRef<Status>('initial')if(shallowStatus.value==='initial'){expectType<Ref<Status>>(shallowStatus)expectType<Status>(shallowStatus.value)shallowStatus.value='invalidating'}constrefStatus=ref<Status>('initial')if(refStatus.value==='initial'){expectType<Ref<Status>>(shallowStatus)expectType<Status>(shallowStatus.value)refStatus.value='invalidating'}proxyRefs:shouldreturn`reactive`directlyconstr1=reactive({k:'v'})constp1=proxyRefs(r1)expectType<typeofr1>(p1)proxyRefs:`ShallowUnwrapRef`constr2={a:ref(1),obj:{k:ref('foo')}}constp2=proxyRefs(r2)expectType<number>(p2.a)expectType<Ref<string>>(p2.obj.k)toRefandtoRefs{constobj:{a:numberb:Ref<number>c:number|string}={a:1,b:ref(1),c:1}toRefexpectType<Ref<number>>(toRef(obj,'a'))expectType<Ref<number>>(toRef(obj,'b'))ShouldnotdistributeRefsoverunionexpectType<Ref<number|string>>(toRef(obj,'c'))toRefsexpectType<{a:Ref<number>b:Ref<number>ShouldnotdistributeRefsoverunionc:Ref<number|string>}>(toRefs(obj))BothshouldnotdoanyunwrappingconstsomeReactive=shallowReactive({a:{b:ref(42)}})consttoRefResult=toRef(someReactive,'a')consttoRefsResult=toRefs(someReactive)expectType<Ref<number>>(toRefResult.value.b)expectType<Ref<number>>(toRefsResult.a.value.b)#5188constprops={foo:1}as{foo:any}const{foo}=toRefs(props)expectType<Ref<any>>(foo)}toRefdefaultvalue{constobj:{x?:number}={}constx=toRef(obj,'x',1)expectType<Ref<number>>(x)}readonly()+ref()expectType<Readonly<Ref<number>>>(readonly(ref(1)))#2687interfaceAppData{state:'state1'|'state2'|'state3'}constdata:ToRefs<AppData>=toRefs(reactive({state:'state1'}))switch(data.state.value){case'state1':data.state.value='state2'breakcase'state2':data.state.value='state3'breakcase'state3':data.state.value='state1'break}#3954functiontestUnrefGenerics<T>(p:T|Ref<T>){expectType<T>(unref(p))}testUnrefGenerics(1)#4771describe('shallowreactiveinreactive',()=>{constbaz=reactive({foo:shallowReactive({a:{b:ref(42)}})})constfoo=toRef(baz,'foo')expectType<Ref<number>>(foo.value.a.b)expectType<number>(foo.value.a.b.value)})describe('shallowrefinreactive',()=>{constx=reactive({foo:shallowRef({bar:{baz:ref(123),qux:reactive({z:ref(123)})}})})expectType<Ref<number>>(x.foo.bar.baz)expectType<number>(x.foo.bar.qux.z)})describe('refinshallowref',()=>{constx=shallowRef({a:ref(123)})expectType<Ref<number>>(x.value.a)})describe('reactiveinshallowref',()=>{constx=shallowRef({a:reactive({b:ref(0)})})expectType<number>(x.value.a.b)})describe('shouldsupportDeepReadonly',()=>{constr=readonly({obj:{k:'v'}})@ts-expect-errorexpectError((r.obj={}))@ts-expect-errorexpectError((r.obj.k='x'))})#4180describe('readonlyref',()=>{constr=readonly(ref({count:1}))expectType<Ref>(r)})describe('shouldsupportmarkRaw',()=>{classTest<T>{item={}asRef<T>}consttest=newTest<number>()constplain={ref:ref(1)}constr=reactive({class:{raw:markRaw(test),reactive:test},plain:{raw:markRaw(plain),reactive:plain}})expectType<Test<number>>(r.class.raw)@ts-expect-erroritshouldunwrapexpectType<Test<number>>(r.class.reactive)expectType<Ref<number>>(r.plain.raw.ref)@ts-expect-erroritshouldunwrapexpectType<Ref<number>>(r.plain.reactive.ref)})describe('shallowReadonlyrefunwrap',()=>{constr=shallowReadonly({count:{n:ref(1)}})@ts-expect-errorr.count=2expectType<Ref>(r.count.n)r.count.n.value=123})describe('set/del',()=>{set({},1,'hi')set([],1,'bye')del({},'foo')del([],1)@ts-expect-errorset({},1)@ts-expect-errordel([],'fse',123)})