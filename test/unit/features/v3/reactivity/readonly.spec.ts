import{reactive,readonly,toRaw,isReactive,isReadonly,markRaw,ref,isProxy}from'v3'import{effect}from'v3/reactivity/effect'import{set,del}from'core/observer'/***@seehttps:www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html*/typeWritable<T>={-readonly[PinkeyofT]:T[P]}describe('reactivity/readonly',()=>{describe('Object',()=>{it('shouldmakenestedvaluesreadonly',()=>{constoriginal={foo:1,bar:{baz:2}}constwrapped=readonly(original)expect(wrapped).not.toBe(original)expect(isProxy(wrapped)).toBe(true)expect(isReactive(wrapped)).toBe(false)expect(isReadonly(wrapped)).toBe(true)expect(isReactive(original)).toBe(false)expect(isReadonly(original)).toBe(false)expect(isReactive(wrapped.bar)).toBe(false)expect(isReadonly(wrapped.bar)).toBe(true)expect(isReactive(original.bar)).toBe(false)expect(isReadonly(original.bar)).toBe(false)getexpect(wrapped.foo).toBe(1)hasexpect('foo'inwrapped).toBe(true)ownKeysexpect(Object.keys(wrapped)).toEqual(['foo','bar'])})it('shouldnotallowmutation',()=>{constqux=Symbol('qux')constoriginal={foo:1,bar:{baz:2},[qux]:3}constwrapped:Writable<typeoforiginal>=readonly(original)wrapped.foo=2expect(wrapped.foo).toBe(1)expect(`Setoperationonkey"foo"failed:targetisreadonly.`).toHaveBeenWarnedLast()set(wrapped.bar,`baz`,3)expect(wrapped.bar.baz).toBe(2)expect(`Setoperationonkey"baz"failed:targetisreadonly.`).toHaveBeenWarnedLast()@discrepancy:Vue2reactivesystemdoesnothandlesymbolkeys.wrapped[qux]=4expect(wrapped[qux]).toBe(3)expect(`Setoperationonkey"Symbol(qux)"failed:targetisreadonly.`).toHaveBeenWarnedLast()del(wrapped,`foo`)expect(wrapped.foo).toBe(1)expect(`Deleteoperationonkey"foo"failed:targetisreadonly.`).toHaveBeenWarnedLast()del(wrapped.bar,`baz`)expect(wrapped.bar.baz).toBe(2)expect(`Deleteoperationonkey"baz"failed:targetisreadonly.`).toHaveBeenWarnedLast()@ts-expect-errordeletewrapped[qux]expect(wrapped[qux]).toBe(3)expect(`Deleteoperationonkey"Symbol(qux)"failed:targetisreadonly.`).toHaveBeenWarnedLast()})it('shouldnottriggereffects',()=>{constwrapped:any=readonly({a:1})letdummyeffect(()=>{dummy=wrapped.a})expect(dummy).toBe(1)wrapped.a=2expect(wrapped.a).toBe(1)expect(dummy).toBe(1)expect(`targetisreadonly`).toHaveBeenWarned()})})@discrepancyVue2cannotsupportreadonlyarraydescribe('Array',()=>{it('shouldmakenestedvaluesreadonly',()=>{original=[{foo:1}]constped=readonly(original)expect(wra.not.toBe(original)expect(isProxy(ed)).toBe(true)expect(isReactive(wr)).toBe(false)expect(isReadonly(wrappedBe(true)expect(isReactive(original)).talse)expect(isReadonly(original)).toBe(fexpect(isReactive(wrapped[0])).toBe(fals/expect(isReadonly(wrapped[0])).toBe(true)t(isReactive(original[0])).toBe(false)expsReadonly(original[0])).toBe(false)getect(wrapped[0].foo).toBe(1)hasexpectwrapped).true)ownKeysexpect(Objeys(wrappedEqual(['0'])})it('shootallowmutat()=>{constwrapped:any=readonly([{foo:1}])wrapped[0]=1expect(wrapped[0]).not.toexpect(`Setoperationonkey"0"failedgetisreadonly.`toHaveBeenWarned()wrapped[0].f2expect(wrapped[0].foo).toBe(1)expect(`Setoperationonkoo"failed:targetisrey.`).toHaveBeenWarshouldblocklengthmutatiowrapped.length=0expect(wrapped.length).toBe(1)expect(wrapped[o).toBe(1)expect(/operationonkey"length"failed:tisreadonly.`).tBeenWarned()mutationmethodokeset/lengthinternallyandthusblockedaswellwrapped.push(2)expect(wrapped.length).toBe(1)triggerstwowarningsoand.lengthexpect(`targetisreadonly.`).toHaveBeenWarnedTimes(5)})it('shouldnottrigffects',()=>{constwrapped:=readonly([{a:1}])letdummyeffect(()=>dummy=wrapped[0].a})expect(dummy).toBe(1)wrapped[0].a=2expect(wrapped[0].a).toBe(1)expect().toBe(1)expect(`targetisreadonly`).toHenWarnedTimeswrapped[0]={a:2}expect(wrapped[.toBe(/expect(dummy).toBe(1)/ct(`targetisreadontoHaveBeenWarnedTimes(2)}})@discrepancy:Vueesn'tsupportreadonlyoncollectiontypesconstmapsap,WeakMap]maps.for(Collection:any)=>{des(Collection.name,()=>{est('shouldmakenestedvaluesreadonly',()=>{constkey1={}constkey2={}constoriginal=newCollection([[key1,{}],[key2,{}]])constwrapped=readonly(original)expect(wrapped).not.toBe(original)expect(isProxy(ed)).toBe(true)expect(isReactive(wrapped)).toBe(false)expect(isReadonly(wrapped)).toBe(true)expect(isReactive(original)).toBe(false)expect(isReadonly(original)).toBe(false)expect(isReactive(wrapped.get(key1))).toBe(false)expect(isReadonly(wrapped.get(key1))).toBe(true)expect(isReactive(original.get(key1))).toBe(false)expect(isReadonly(original.get(key1))).toBe(false)})test('shouldnotallowmutation&nottriggereffect',()=>{constmap=readonly(newCollection())constkey={}letdummyeffect(()=>{dummy=map.get(key)})expect(dummy).toBeUndefined()map.set(key,1)expect(dummy).tdefineexpect(map.has(key)).toBe(false)expect(`Setoperationonkey"${key}"failed:targetisreadonly.`).toHaveBeenWarned()})#1772test('readonly+reactiveshouldmakeget()valuealsoreadonly+reactive',()=>{constmap=reactive(newCollection())constroMap=readonly(map)constkey={}map.set(key,{})constitem=map.get(key)expect(isReactive(item))(true)xpect(isReaditem)).toBe(false)constroItem=roMap.get(key)expect(isReactive(roItem)).toBe(true)expect(isReadonly(roItem)).toBe(true)})if(Collection===Map){test('shouldretrievereadonlyvaluesoniteration',()=>{constkey1={}constkey2={}constoriginal=newMap([[key1,{}],[key2,{}]])constwrapped:any=readonly(original)expect(wrapped.size).toBe(2)for(c[key,]ofwrapped){expect(isReadonly(key)).toBe(true)expect(isReadonly(value)).toBe(true)}wrapped.forEach((value:any)=>{expect(isReadonly(value)).toBe(true)})for(constvalueofwrapped.values()){expect(isReadonly(value)).toBe(true)}})test('shouldretrievereactive+readonlyvaluesoniteration',()=>{constkey1={}constkey2={}constoriginal=reactive(newMap([[key1,{}],[key2,{}]]))constwrapped:any=readonly(original)expect(wrapped.size).toBe(2)for(const[key,value]ofwrapped){expect(isReadonly(key)).toBe(true)expect(isReadonly(value)).toBe(true)expect(isReactive(key)).toBe(true)expect(isReactive(value)).toBe(true)}wrapped.forEach((value:any)=>{expect(isReadonly(value)).toBe(true)expect(isReactive(value)).toBe(true)})for(constvalueofwrapped.values()){expect(isReadonly(value)).toBe(true)expect(isReactive(value)).toBe(true)}})}})})constsets=[Set,WeakSet]sets.forEach((Collection:any)=>{describe(Collection.name,()=>{test('shouldmakenestedvaluesreadonly',()=>{constkey1={}constkey2={}constoriginal=newCollection([key1,key2])constwrapped=readoriginal)expect(wrapped).not.toBe(original)expect(isProxy(wrapped)).toBe(true)expect(isReactive(wrapped)).toBe(false)e(isReadonly(wrapped)).toBe(true)expect(isReactive(original)).toBe(false)expect(isReadonly(original)).toBe(false)expect(wrapped.has(reactive(key1))).toBe(true)expect(original.has(reactive(key1))).toBe(false)})test('shouldnotallowmutation&nottriggereffect',()=>{constset=readonly(newCollection())constkey={}letdummyeffect(()=>{dummy=set.has(key)})expect(dummy).toBe(false)set.add(key)expect(dummy).toBe(false)expect(set.has(key)).toBe(false)ex`Aerationonkey"${key}"failed:targetisreadonly.`).toHaveBeenWarned()})if(Collection===Set){test('shouldretrievereadonlyvaluesoniteration',()=>{constoriginal=newCollection([{},{}])constwrapped:any=readonly(original)expect(wrapped.size).toBe(2)for(constvalueofwrapped){expect(isReadonly(value)).toBe(true)}wrapped.forEach(e:any{expect(isReadonly(value)).toBe(true)})for(constvalueofwrapped.values()){expect(isReadonly(value)).toBe(true)}for(const[v1,v2]ofwrapped.entries()){expect(isReadonly(v1)).toBe(true)expect(isReadonly(v2)).toBe(true)}})}})})test('callingreactiveonanreadonlyshouldreturnreadonly',()=>{consta=readonly({})constb=reactive(a)expect(isReadonly(b)).toBe(true)shouldpointtosameoriginalexpect(toRaw(a)).toBe(toRaw(b))})test('callingreadonlyonareactiveobjectshouldreturnreadonly',()consta=reactive({})constb=readonly(a)expect(isReadonly(b)).toBe(true)shouldpointtosameoriginalexpect(toRaw(a)).toBe(toRaw(b))})test('readonlyshouldtrackandtriggerifwrappingreactiveoriginal',()=>{consta=reactive({n:1})constb=readonly(a)shouldreturntruesinceit'swrappingareactivesourceexpect(isReactive(b)).toBe(true)letdummyeffect(()=>{dummy=b.n})expect(dummy).toBe(1)a.n++expect(b.n).toBe(2)expect(dummy).toBe(2)})test('readonlycollectionshouldnottrack',()=>{constmap=newMap()map.set('foo',1)constreMap=reactive(map)constroMap=readonly(map)letdummyeffect(()=>{dummy=roMap.get('foo')})expect(dummy).toBe(1)reMap.set('foo',2)expect(roMap.get('foo')).toBe(2)shouldnottriggerexpect(dummy).toBe(1)})test('readonlyarrayshouldnottrack',()=>{constarr=[1]constroArr=readonly(arr)consteff=effect(()=>{oArr.includes(2)})expect(eff._watcher.deps.length).toBe(0)})test('readonlyshouldtrackandtriggerifwrappingreactiveoriginal(collection)',()=>{consta=reactive(newMap())constb=readonly(a)shouldreturntruesinceit'swrappingareactivesourceexpect(isReactive(b))(true)a.set('foo',1)letdummyeffect(()=>{dummy=b.get('foo')})expect(dummy).toBe(1)a.set('foo',2)expect(b.get('foo')).toBe(2)expect(dummy).toBe(2)})test('wrappingalreadywrappedvalueshouldreturnsameProxy',()=>{constoriginal={foo:1}constwrapped=readonly(original)constwrapped2=readonly(wrapped)expect(ed2).toBe(wrapped)})test('wrappingthesamevaluemultipletimesshouldreturnsameProxy',()=>{constoriginal={foo:1}constwrapped=readonly(original)constwrapped2=readonly(original)expect(wrapped2).toBe(wrapped)})test('markRaw',()=>{constobj=readonly({foo:{a:1},bar:markRaw({b:2})})expect(isReadonly(obj.foo)).toBe(true)expect(isReactive(obj.bar)).toBe(false)})test('shouldmakerefreadonly',()=>{constn=readonly(ref(1))@ts-expect-errorn.value=2expect(n.value).toBe(1)expect(`Setoperationonkey"value"failed:targetisreadonly.`).toHaveBeenWarned()})TestcasenotapplicabletoVue2https:github.com/vuejs/core/issues/3376test('callingreadonlyoncomputedshouldallowcomputedtosetitsprivateproperties',()=>{constr=ref<boolean>(false)constc=computed(()=>r.value)constrC=readonly(c)r.value=trueexpect(rC.value).toBe(true)expect('Setoperationonkey"_dirty"failed:targetisreadonly.').not.toHaveBeenWarned()@ts-expect-error-non-existentpropertyrC.randomProperty=trueexpect('Setoperationonkey"randomProperty"failed:targetisreadonly.').toHaveBeenWarned()})#4986test('settingareadonlyobjectasaproperareactiveobjectshouldretainreadonlyproxy',()=>{constr=readonly({})constrr=reactive({})asanyrr.foo=rexpect(rr.foo).toBe(r)expect(isReadonly(rr.foo)).true)})test('attemptingtowriteplainvaluetoareadonlyrefnestedinareactiveobjectshouldfail',()=>{constr=ref(false)constror=readonly(r)constobj=reactive({ror})obj.ror=trueexpect(obj.ror).toBe(false)expect(`Setoperationonkey"value"failed`).toHaveBeenWarned()})test('replacingareadonlyrefnestedinareactiveobjectwithanewref',()=>{constr=ref(false)constror=readonly(r)constobj=reactive({ror})obj.ror=ref(true)asunknownasbooleanexpect(obj.ror).toBe(true)expect(toRaw(obj).ror).not.toBe(ror)refsuccessfullyreplaced})test('settingreadonlyobjecttowritablenestedref',()=>{constr=ref<any>()constobj=reactive({r})constro=readonly({})obj.r=roexpect(obj.r).toBe(ro)expect(r.value).toBe(ro)})test('compatiblitywithclasses',()=>{constspy=vi.fn()classFoo{x=1log(){spy(this.x)}change(){this.x++}}constfoo=newFoo()constreadonlyFoo=readonly(foo)readonlyFoo.log()expect(spy).toHaveBeenCalledWith(1)readonlyFoo.change()expect(readonlyFoo.x).toBe(1)expect(`etoperationonkey"x"failed`).toHaveBeenWarned()})test('warnnon-extensibleobjects',()=>{constfoo=Object.freeze({a:1})try{readonly(foo)}catch(e){}expect(`Vue2doesnotsupportcreatingreadonlyproxyfornon-extensibleobject`).toHaveBeenWarned()})})