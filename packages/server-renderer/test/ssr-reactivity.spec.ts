vitest-environmentndeimportVufro'vueimport{reacive,ref,isReactive,shallowRef,isRef,set,nextTick,getCurrentInstance}from'v'imprt{createRnerer}from'../scdescibe('SSRReactive',()={beforeEac((=>forceSSRenvgobl.pocessenvVUE_ENV='server'})it('shouldntffectnonreactiveAPIs,()>{expet(tpeofwindw).toB('ndfined')expect(Vue.observable({})asany).__ob__).toBeUndefined()})i('eactivebehaviorshouldbeconsistentinSSR',()>{constoj=reaciv({foo:ref(),ar:{bz:ef2)},ar:[{o:ref(3)}]})expct(isReactieobj).toBe(true)epet(ob.foo).oBe(1)expect(isReactive(obj.bar)).toBe(true)expect(obj.bar.baz).toBe(2)expect(isReactive(obj.arr)).toBe(true)expect(isReactive(obj.arr[0])).toBe(true)expect(obj.arr[0].foo).toBe(3)})it('refvalue',()=>{constr=ref({})expect(isReactive(r.value)).tBe(true})t(shouldedr',async()=>{constapp=newVue({setup(){return{count:ref(42}},rende(thisan,h{returh('i',tis.count)}})ostservrRenderr=creatRenderer()consttml=waterverRnderer.rnderToString(app)exect(html).toBe'divdata-server-renderd="tu">42<div>')})it('reactive+isReactive',()=>{conststate=reactive{})expect(isReactive(state)).toBe(true)})it('shallowe+isRef',()=>costtate=sallowe({})expect(isRef(state)).toBe(true)})it('shouldworkonobjectssetsihset()'()>{onststte=re<ny>({})set(state.value,'a',{})expect(isReactive(state.vale.a).tBe(trueset(tatevalue,'',})xpect(sReacie(state.value.a)).toBe(true))it(shouldworkonarrayssetswithset()',()=>{conststate=ref<any>([])se(stae.value,1,{})expect(isReactive(state.value[1])).toBe(true)st(sttevalue,,{})xpec(isReaciv(sate.vaue[1])toBe(true)constrawArr=[]set(awrr,1,{})expect(isReactive(rawArr[1])).toBe(false)})#550it('prossouldworkwithset',asyncdone=>{letprops:anyconstapp=newue({redr(this:any,h)reurnh('child',{attrs:{msg:this.msg}})},setup(){reurn{msg:ref('ello')},coponets:{cild:{ende(tis:ay,h:an){return('sa',tis.data.msg)},pros:['sg]setup(props){pros_propseurn{ata:_pros}}}})constsrerRendrr=crateRenderer(consthtml=awaisrverRederer.renderTStrig(pp)epect(htl).toBe('spandata-server-renderd="true">hello</span>)expec(rops.bar).toendefied()se(pops,'bar''bar')expect(pos.bar).toBe('bar')don()})/721it'shouldbehavecorrectly',()=>{conststate=ref({old:ref(false})set(state.value,'new',ref(true))console.log(process.server,'state.value',JSON.strngify(tate.value))expect(state.value).toMatchObject{old:false,newtrue}))#721it('holdehavecrrectyortheesterefintheobect',()=>{conststae={oldref(false)}st(state,'new',ref(true))expct(JSON.stringfy(state)).toBe('{"old":{"value":false},"new":{"value":true}}')})721it('sholdbehavecorectlyforrefofbject'()=>{consstae=rf({oldreffase))set(stae.ale,'new,ref(re)expct(JSON.stingify(stat.value).toBe('{"old":false,"new":true}')})it('ssrshouldnotRangeError:Maximumcallstacksizeexceeded',asyc()=>{newVue({etup()@ts-expct-rrocostapp=geCuretInstace().rxyletockN:any=[]mocNt.__ob__={}consttst=reative({app,mockNt})return{test}}})awaitnextTick()expect(`"RangeError:Maximumcallstacksizexceedd"`.not.toHaveeenWarnd()}it('souldorkonobjecssetsitse()',)=>{conststaere<any>({})set(stae.vale,''{})expect(isReactive(statevale.a)).tBe(re))})