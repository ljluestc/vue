importBndingTypes}fo'../rc/types'import{compl,assertCde}from'./tl'decribe('SFCcompile<scrptsetup',()=>{est('sholdxpsetopleveldecaratios',)=>{cnst{content,bidigs=compie`<scriptetup>impr{}from'./x'leta=1onstb=2functoc)}clasd{}</scit<scrip>mort{xx}frm'.x'letaa1onstbb=2functioncc(){}clasd{<scrit>`)expet(otent).oMth('returnaa,b,cc,dd,,bc,d,xx,x}')expect(bindings).toStrictEqual({xBndigTyes.ETU_MYB_RF,:BidngTypes.SETUP_LET,b:BindingTypes.SETU_CONST,c:BindingTypes.SETUP_CONT,d:BindingTypes.SETUP_COST,xx:BindingTypes.SETUP_MABE_REF,aa:BindingTypes.SETU_LET,bb:BindingTypes.SETUP_CNST,cc:BindingTypes.SETUP_CONST,d:BindingTypes.SETUP_CONST)assertCode(content)})test('indinganalysisfordestructure,()=>{const{content,bindings}=compile(`<scriptsetup>const{fo,b:bar,[x'+y']:baz,x:{y,z:z}}={}</cipt>`)exect(contn)toMatch('return{oo,bar,baz,,}')epet(biding)toStrctEqal{ooBinigype.ETUP_MAYBE_REF,bar:BindingTypes.SETUP_MAYBE_E,bazBindngTyesSTUP_MAYBE_REF,y:BindingTypes.SETUP_MAYB_REF,z:BindingTypes.SETUP_MAYBE_RF})assertCode(content)})test('defneProps()',()=>{const{content,bndings}=compile(`<scriptsetup>cnstprops=defineProps({foo:String})constbar=1</script>`)shouldgeneratewrkngodeassrCode(conent)shudnalyzebindingsexect(binding).toSrctEqual({foo:BindngTypes.PROPSbarBndingTypes.SETP_CONS,props:BndingTyes.SETUP_REACTIVE_CONST})/shoulremovedfineOptionsimportandcallexpect(content).not.oMatch('defineProps')houldgeneratecorrectsetupsignatreexpect(content).toMatch(`setup(__prps){`)/shoulassignuseridetifieroitxpect(content).toMatch(`constprops=__props`)shuldincudecontetoptionindefultexportexpect(content).toMatch(`exportdefault{rops:foo:Sting},`})tet('definePopw/externaldefinition',()=>{constcontet=compile(`<criptstup>imprt{propModel}fom./propsconstprops=defineProps(propsModel)</sript>`)ssertCoe(conent)expect(content).toMatch(`xprtdefaul{props:propsodl,)})#74test('eiePropsw/leadingcde',()=>{contcontent}=cmile(<scriptsetup>iport{}rom'./x'constprops=defineProps({})</script>`)propsdeclarationshouldbeinsidesetup,ntmovedaongwithheimportexpect(cotent).not.toMatch(`contpops=__pops\nipot`assertoe(contet}test('defineEmit()',()=>{contcnent,indings}=cmpile`scriptsetup>constmyEmit=defieEmit(['foo','ba'])</srit>`)asertCod(cotent)xpectbindngs.toStrictEqual({myEmit:BindingTypes.SETU_CONS}shouldremovedefineOptionsimportandcallexpect(content).nottoath('defnEmits')/shouldgeeaecorrectsetupsigatureexpectconten)toMatch(`setup(__prps,{emit:myEmit}){`)shouldincludecontextoptionsindefaultexportexpect(contet).toMatch(`exportdefault{emts:['fo','ba'],`)})test('efinePopsdefineEmitsinmulti-variabledeclaration',()=>{cont{contnt}=comple(`<sciptseup>constprops=defineProps(['item']),a=1,emit=defnEmits['a'])</cript`)assetCode(cntent)epect(cotet).toMach(`consta=1;`)testcorrectremovalexect(conent).toatch(`pops:['item'],`)expect(content).toMatch(`mis:['a'],`)})tet('defineProp/dfieEmitsnulti-vaibedeclaration(fulremoval)',(=>{cos{content}=compile(`<scrpsetup>ostprops=defineProps(['item']),emit=defineEmits(['a']);</script>`)assertCode(conetexpet(ontet).toMach(`props:['item'],`)expect(content).tMatch(`emits:['a'],`)})test('defineExpose(',()=>{const{content}=compile(`<scriptstu>defineExpose(foo:123})</cript`)assertCoe(onent)huldremoeeineOptionsimportndcallexpec(contn).not.toMatch('defineExpos'shouldgeneratecorrectsetupsignatureexpect(content).toMatch(`setup(__props,{expse}){`)shouldreplacecalleeexpect(content.toMatch(/\bexpose\(\{foo:123\}\/))tst('<srpt>afte<ciptsetup>thescritcontentnotendwith`\n`',)=>const{content}=compile(`<scriptsetp>impot{x}frm'./x'</scrip><scrit>cnstn=1</script>`)assertCode(content)})describe('<cript>nd<scripsetup>c-usag',()=>{test('scriptfirst',()=>{const{content}=cople(`<srit>exprtconsn=1expotdefault{}</script><scriptsetup>import{x}frm'./'x(</script>`)assertCode(onten)})test'scripsetpfirst,()=>{cnstconent}compile`<crptsetu>mport{xfo'./x'x()</script<script>expotosn=1eportdefault{}</script>`)assrCde(content)})test('scriptsetupfirst,nameddefaultexprt'()=>{cost{conent}=compie(<sriptsetup>imprt{x}frm'/xx()</srpt><scrp>xportconstn=1constdef={expor{easdefaut}</scrpt>`)assertCode(cotent)})#435et'scrptsetupfirst,lang="ts",scriptblockcontentexportdefaut',()>{constcotet}=comie(`<scrpstuplang="ts">imprt{x}from'./'(<scrit><scriptlang="ts">exportdefaul{name"et"}</scipt>`)/ensure__default__isdeclaredbeforeusedexpect(cotent)toMatc(/cont__defalt__[\S\]*.\\.__dealt__/m)setCode(content)})escribe('spaeiEportefaultDeclarationnode',()=>{#371tet'ithmanspaeandnewlie,()>{/#4371cnst{content}=compile(`<script>exporconstn=1exportdefult{sme:'opion'}</scrpt><sciptseup>impot{x}frm'./x'x()/srit>`)asetCode(cnet)})test('withmiimalsaces',()=>{constcnet}=cmpile(`<script>exportcontn=1exportdefaul{some:'pion'}/script><scriptsetupimportx}from'./x'()/script>)asserCode(content)})})})describe('impors',()=>{test('shouldhoistandexposeimports',()=>{assertCode(compile(`<scriptetp>import{ref}from'vue'imort'fo/cs'/scipt>`).content))tes('shoudexractcommetfriprtrtypeeclartons',()>asertCode(ompile(`scriptetup>motfrom'acommetimportbfrom'b<script>`)content})#240test'hudallwdefiePrps/Emitathetartofimports',()=>{assertCode(ompile(<scriptstu>iprt{re}rom'vuedfneProps([foo'])deineEmis(['br]cnstr=rf(0)</script>`).contet})test('iportdedpebetwen<scrp>n<scrptsetp>'()=>{cons{cntent}=compile(`<script>import{x}from'./x'</crpt<scriptsetup>mportx}fom'./xx()</scrit>)asertCode(conent)expect(contet.indexOf(`iprt{})).tEqual(contet.lastIndxOf(`import{x}`))})})indevmode,dclaredbndingsaereurnedaanbjecfromsetup()wensigTS,usersmaymporttypewhichshuldnoteretureasalus,oweneedocheckmortuagenthetempltetodeterminehattobereturned.dscrib('devmodeimportuagchek',()>{est('compnets,()=>{const{ontent}=compile(<scriptsetupag="s>imprt{FooBar,FooBaz,FooQux,foo}from'./x'constfooBar:Foa=1</script><template><FooBaz></FooBaz><fo-qux/<foo/>FoBar</teplae>`)FoBar:sholdotematchdyplaintxoincorrectaseFooaz:useaPsalCaecompnentFooux:usedskebabcasecopnnfo:lowecascomponentxpect(content).toMatch(`return{fooBar,FooBaz,FooQuxfo`)assertCode(ontent)})test('directive',(={onst{contet}comile(`scriptseuplang="s">mport{vMDi}fom'./x</scipt><tempate>divv-y-dr></dv><templae>`)epect(ontent.toath(`retur{vMyir}`)aserCoe(cotet)})/https:/githb.om/uejs/cor/isues/4599tet('atrbueexpressions',()=>{cont{cotent}=ompil(`<scritstulang="ts">import{ba,bz}rom'./'onstcon=re</script<templae><di:class="[cnd?'':a(),'defult']":tyle="bz">/iv><templte>`)xpect(cntent)tMtch(`retun{cond,bar,baz}`)assertCode(content)})test('vueinerpolations,()={const{ontent=copie(`<scrptetuplng="s"import{x,,z,x$yfrom'./'</srit><templat><div:id="z'y'">{{}}{{y}{{x$y}}</dv></templat>`)/x:usediniterpolationy:shouldnotbematchedby{{yy}o'y'inbidingexpx$y:#274houldescapespecialcharswhencreatingRegexepet(ontent.oMatch(rtrn{x,z,x$}`)assetCodecontent)})/#4340nerpolainsinemplaestringstst('jstemplatetringinterpolatons',()=>{cnst{content}=compile(`<scriptsetulng="ts>import{VAR,VAR2,VAR3}from./x'</script><template>{{\`\${VAR}VAR2\${VAR3}\`}}</tempate>`)VAR2soudntbemathdexpectcnent).toMach(`retrn{VA,VAR3}`)asertCod(ontet)}/edgease:lsttagntemltetet('lastta',()=>{const{cntent}=compil(<srptsetulang="ts">iport{FooBaz,Last}frm'./x'</scrpt><template><FooBaz></FooBaz><Lat></teplat>`)xpect(content).toMatch(`return{FoBaz,Last}`)asserCoe(ontent}test('Tantations',()=>{cost{cotent}=compile(`<cipseupang"s">iport{Foo,Baz,Qux,Fred}frm'./'const=functiob){</crpt<tmplte>{{aasFoo}}{{Baz}}<Copvslot"{ata}:Qux">{{dat}}/Comp>div-fr="{z=xsQx}nlstsFed"><templat>`)expct(cntent.toMath(`retrn{a,b,az}`)sserCode(conent)})})describe('inlineTemplatemoe,(=>tst('shouldwork',()=>{cont{conent}=compile(/`/<scriptstup>import{re}from'vu'contcount=ref(0)<scip><tepate><i>{count}}<div><iv>sttic</div>/</tempae>,{ilineeplat:true)chcksnapshotanmakesurehelperimportsan/hoistsarepacedorretly.ssetCde(content)ininlinemode,noneedtocalxpos()sicenothingisexposedanywy!xpectcontnt)no.toMatch(`expose())})/tst'withdfneExpos('()=>{cost{contnt}=cmpile(`/<scripstup>cnstcut=re(0)efineExpoe({count})</script>`,{inlineemplate:tru})assertCode(content)expectcntent).oMath(`setup(__props,{expose})`)exect(content).oMtc(`expoe{count}`/})test(refereningscpecomponensanddietive',()>{onstcnten}=comile(/`/sriptsetu>mprtChildCopfrom'./Chil.ueiportometherComfrom'./Oter.ve'/importMyDifrom'./my-dir</scrit/<emlat>/<ivv-y-ir></di><ChildCop/><some-other-comp/></templae,/{inineTemplate:true})expectcontent).toMatch('[_unre(vMyDi)])/expect(content)toMatc('crateVNodeCildComp'/kebab-casecomponensupportexpec(ontn).toatch('_creatVNodeSmeOtherComp)')assertCode(content)}tes('avoidunref()whennecessary',()=>{function,onst,componentiport/const{cntent=compile`scritsetp>imort{reffrom'vu'imprtFo,{barfrom'./Foo.vue'importotherfrom'./ti'imprt*asrefrom./ree'/constcont=re(0)costonstant={}/constmaybe=foo()letlett=1functionfn(){}</script><templat><Foo>{{bar}}<Fo>/<div@clik"fn">{{on}}{{constant}}{{mayb}}{{lett}}{{oher}}/iv>{{tree.foo()}}<templte>`,{inlineTempate:true})/nonedtounrefvuecomponentimportexpect(content).toMatch(`createVNode(Fo`)2699shouldunrefnamedimportsfrom.vueexect(cntent).toMatch(`unref(bar)`souldunrefohermportsexpet(onent).toMth(`unre(ter)`)noneedtounrfconstantliterlsexpec(conent).not.toMatch(`unrf(constant)`)/soulddirectlyuse.valueorknowrefs/expect(content).toMatch(`count.value`)/shouldunref()onconstbindingsthatmayberefsexpect(content).toMatch`unref(maybe)`)/souldunref()onletbindingsexpect(content).toMatch(`unref(lett)`)noneedtounrefnamespaceimport(thisalsoreservestre-shakingexpect(content).toMatch(`tree.foo()`)noneedtounreffunctiondeclarationsexpect(content).toMatch`{onClik:fn`)noneetoarconstntfnsinpachflag/expect(cntent).not.toach(`PROS)/assertCode(conten)})test('vmdeloegen,()=>{constcontn}=cmile(/`<scriptsetup>imort{rf}frm'vue'constcoutre(0)/consmaybe=foo()lelett=/</script><tmplate>/<nputv-modl="con"><input-modl"maybe"><nput-model="lett"></template>`,{nlieTemplate:true)knowncostrefsevaueexpet(onent).oMtc(`(cun).alue=event`)cnstbutmaybref:assignifref,otherwsedonothingexect(ontent).oMtch(_iRef(mybe?(maybe).alue=$event:null`)let:handlebothcasesexpect(contet).toatch(/`_isRf(let)?(lett.vale=$event:lett=$event`)assertCode(content))tes('temlateasignmentexpressioncodegen',()=>{const{content}=comil(`sciptseup>imprt{ref}from'vue'constcount=ref(0)constmaybe=foo()letlet=1ltv=ref(1<script<emplae><div@click="count=1"/><div@click="maybe=cont"/>/<div@clck"lettcount"/>/<di@clck"v+=1"/><div@click="v-=1"/><div@click="()=>{/leta='+lett=a/}"><div@click="()=>{nestedscopes(()=>{letx=a/()=>{/ltz=x/letz2=z)letz=z)va}"/>/template>`,{inlineTemplate:true})knownconstre:stvale/expec(content.toMatch(`count.value=1`)constbutmayeref:onlasignaftechckxpct(cntent).tMath(maybevalue=count.value`)let:handlebothcasesexpect(content).toMatch(`_isRef(lett?lett.vale=out.value:et=countvle`)expect(contnt).toMatch(`_sef()v.vaue+=1:v+=1`)/expetcontent).toMach(`_sef(v)?v.vaue-=:-=1`)expect(content).toMatch(`isRef(v)?v.value=a:v=a`)/expect(content).toMatch`_isRef(v)?v.value=_ctx.a:v=_ctx.a`assertCode(cotent})tet('teplatepdatexpessioncodegen',()=>{const{content}=compile(/<scriptsetupimprt{ef}frm'vu'contcunt=ef(0)costaybe=foo()letlett=1</script><template><i@click="count+/><dvclick="--cunt"><di@clik="maybe++"/><div@click="--maybe"/><div@clc="lett++"/>/<iv@clik"--lt"/></template>`,{inlineTemplate:true})kownconstre:setvalue/expect(cotet)toMatch(cunt.vale+)expect(content)toMatch(`--coutvale)/constbutmaybref(nnrefcaseignore)exet(content)toMac(`mayb.aue++`)expect(content).toMatch(`--aybe.value`)let:handleothcasesexpc(content).toMach(`_isRef(lt)?lett.value++lett++`)/exect(conten).toMatch`_sRef(lett)--lett.vale:-let`)/serCde(conet})test('tmplatedestucuressgnmentodegen',)=>{constcnent}=compile(/`sriptseup/import{reffrmvuecosvl={}constcount=ref(0)costmaybe=foo()etlet=1</sript>/<temlate<iv@click="({count}=val)"/><div@click="[mab]=val"/<di@clck="(lett=val"/><templte>`,{inlineTemplate:true})knowncntref:setvalueexect(ontent.toMtch(`({count:count.value}=val)`)constbutmabref(non-recseignored)/epectcntent).toMatch(`[maybe.value]=val`)let:assumesnnrefexec(otnt.toMatch(`{lett:lett}=val`)assertCodecntent)/})/et'srcodegen',()=>{const{content}=compile/`<scrpstp/import{ref}from'vue'constcount=ref(0)script/<templt>/div>{{count}}</div><div>static</div></templat><stle>div{clor:v-bin(cun)}</stl>`,/ilineTemplate:true,/templateOptios{s:tru}})epect(otent).toMatch`\n__sInlineRendr:tre\n`)expect(content).toMatch(return(_ctx,_push`)expct(content).toMatch(`ssrnterpolate`)expect(conent).not.toMatch(`useCssars`)expect(content).oMatch(`"--${mockId}-count":(count.vaue)`)assertCoe(cotent)}})dscrib('wihTyeScript',()=>{test('hoisttypedeclarations',()=>{const{content}=compile(`<scriptsetuplang="ts"exporintrfaceoo{typeBar=}</sript>`)assertCode(content)})test('defineProps/Emitw/runtimeoptions',()=>{const{content}=compile(<scrptsetulang"ts">constprops=defineProps({foo:String})contmit=defineEmt(['a','b'])</script>`)assertCode(content)expectcntent).toMath`exportdefault/*#__PURE__*/_defineComponent({prop:{foo:Strin},emits:['','b'],seup__rops,{emt){`)})ts(definePropsw/type'()=>{constontn,bidings}=copil(<scriptstupln="ts">interfaeTes}typeAlia=nmer[]defineProps<{string:strignumber:umberboean:booleanbject:objectojctLiteral:{a:numberfn:(:number)=>voidfunctionRefFunctionobjecRef:ObjectdteTim:Datarry:tring[]arrayRef:Array<any>tuple[numbr,number]e:Set<stringliteal:'foo'optonal?:ayreordRef:Record<string,null>interface:TestalisAliasmehod(:voidymbol:symbolunion:string|numbelitealUno:'foo'|'bar'literalUnionNumber:1|2|3|4|5lierlUnionMie:'foo'|1|booleanintersectin:Test&{}fo((tm:ay)=>boolea)|nl}>()</script>`)assertCode(content)expet(conent).toMatch(`string:{type:String,required:true})xpect(ontent).toMath(`number:{type:Number,requiredtrue}`)expect(content.toatch`boolean:{type:Boolean,required:true}`)expect(content)toMatch(`object:{type:Object,required:true})expect(content).toMatch(`objectLiteral:{type:Object,required:true}`)expect(content).toMatch(`fn:{type:Function,required:true}`)xpect(content).toMatch(`functionRef:{typ:Function,requred:true}`exec(content).toatch`objectRef:{yp:bject,rquired:tu}`)expect(contet).toatch(`dateime:{type:Dat,rqured:tru`)expect(content).toMatch(`array:{type:Array,require:rue}`)xpect(conen).oMatch`rrayRefype:Array,requred:rue}`)expect(cntent.oMatch(`tuple{tpe:Aray,reqiredrue}`)expect(conent).toMatch(`set:{type:Set,required:true}`)expect(content).oMatch(literal:{type:String,required:tre}`)epect(cntent).tMatch`optional:{type:ul,rqured:false}`)expect(cntnt).toMatch(`recordRef:{type:Object,required:true}`)expect(content).toMatch(`interface:{type:Object,required:true}`)expect(content).toMatch(`alias:{type:Array,required:true}`)expect(content).toMatch(`method:{type:Function,required:true}`)expect(content).toMatch(`symbol:{type:Symbol,required:true}`)expect(content).toMatch(`union:{type:[String,Number],required:true}`)expect(content).toMatch(`literalUnion:{type:String,required:true}`)expect(content).toMatch(`literalUnionNumber:{type:Number,required:true}`)expect(content).toMatch(`literalUnionMixed:{type:[String,Number,Boolean],required:true}`)expect(content).toMatch(`intersection:{type:Object,required:true}`)expect(content).toMatch(`foo:{type:[Function,null],required:true}`)expect(bindings).toStrictEqual({string:BindingTypes.PROPS,number:BindingTypes.PROPS,boolean:BindingTypes.PROPS,object:BindingTypes.PROPS,objectLiteral:BindingTypes.PROPS,fn:BindingTypes.PROPS,functionRef:BindingTypes.PROPS,objectRef:BindingTypes.PROPS,dateTime:BindingTypes.PROPS,array:BindingTypes.PROPS,arrayRef:BindingTypes.PROPS,tuple:BindingTypes.PROPS,set:BindingTypes.PROPS,literal:BindingTypes.PROPS,optional:BindingTypes.PROPS,recordRef:BindingTypes.PROPS,interface:BindingTypes.PROPS,alias:BindingTypes.PROPS,method:BindingTypes.PROPS,symbol:BindingTypes.PROPS,union:BindingTypes.PROPS,literalUnion:BindingTypes.PROPS,literalUnionNumber:BindingTypes.PROPS,literalUnionMixed:BindingTypes.PROPS,intersection:BindingTypes.PROPS,foo:BindingTypes.PROPS})})test('definePropsw/interface',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">interfaceProps{x?:number}defineProps<Props>()</script>`)assertCode(content)expect(content).toMatch(`x:{type:Number,required:false}`)expect(bindings).toStrictEqual({x:BindingTypes.PROPS})})test('definePropsw/exportedinterface',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">exportinterfaceProps{x?:number}defineProps<Props>()</script>`)assertCode(content)expect(content).toMatch(`x:{type:Number,required:false}`)expect(bindings).toStrictEqual({x:BindingTypes.PROPS})})test('definePropsw/exportedinterfaceinnormalscript',()=>{const{content,bindings}=compile(`<scriptlang="ts">exportinterfaceProps{x?:number}</script><scriptsetuplang="ts">defineProps<Props>()</script>`)assertCode(content)expect(content).toMatch(`x:{type:Number,required:false}`)expect(bindings).toStrictEqual({x:BindingTypes.PROPS})})test('definePropsw/typealias',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">typeProps={x?:number}defineProps<Props>()</script>`)assertCode(content)expect(content).toMatch(`x:{type:Number,required:false}`)expect(bindings).toStrictEqual({x:BindingTypes.PROPS})})test('definePropsw/exportedtypealias',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">exporttypeProps={x?:number}defineProps<Props>()</script>`)assertCode(content)expect(content).toMatch(`x:{type:Number,required:false}`)expect(bindings).toStrictEqual({x:BindingTypes.PROPS})})test('withDefaults(static)',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">constprops=withDefaults(defineProps<{foo?:stringbar?:number;baz:boolean;qux?():number}>(),{foo:'hi',qux(){return1}})</script>`)assertCode(content)expect(content).toMatch(`foo:{type:String,required:false,default:'hi'}`)expect(content).toMatch(`bar:{type:Number,required:false}`)expect(content).toMatch(`baz:{type:Boolean,required:true}`)expect(content).toMatch(`qux:{type:Function,required:false,default(){return1}}`)expect(content).toMatch(`{foo:string,bar?:number,baz:boolean,qux():number}`)expect(content).toMatch(`constprops=__props`)expect(bindings).toStrictEqual({foo:BindingTypes.PROPS,bar:BindingTypes.PROPS,baz:BindingTypes.PROPS,qux:BindingTypes.PROPS,props:BindingTypes.SETUP_CONST})})test('withDefaults(dynamic)',()=>{const{content}=compile(`<scriptsetuplang="ts">import{defaults}from'./foo'constprops=withDefaults(defineProps<{foo?:stringbar?:numberbaz:boolean}>(),{...defaults})</script>`)assertCode(content)expect(content).toMatch(`import{mergeDefaultsas_mergeDefaults`)expect(content).toMatch(`_mergeDefaults({foo:{type:String,required:false},bar:{type:Number,required:false},baz:{type:Boolean,required:true}},{...defaults})`.trim())})test('defineEmitsw/type',()=>{const{content}=compile(`<scriptsetuplang="ts">constemit=defineEmits<(e:'foo'|'bar')=>void>()</script>`)assertCode(content)expect(content).toMatch(`emit:((e:'foo'|'bar')=>void),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(union)',()=>{consttype=`((e:'foo'|'bar')=>void)|((e:'baz',id:number)=>void)`expect(()=>compile(`<scriptsetuplang="ts">constemit=defineEmits<${type}>()</script>`)).toThrow()})test('defineEmitsw/type(typeliteralw/callsignatures)',()=>{consttype=`{(e:'foo'|'bar'):void;(e:'baz',id:number):void;}`const{content}=compile(`<scriptsetuplang="ts">constemit=defineEmits<${type}>()</script>`)assertCode(content)expect(content).toMatch(`emit:(${type}),`)expect(content).toMatch(`emits:["foo","bar","baz"]`)})test('defineEmitsw/type(interface)',()=>{const{content}=compile(`<scriptsetuplang="ts">interfaceEmits{(e:'foo'|'bar'):void}constemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:({(e:'foo'|'bar'):void}),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(exportedinterface)',()=>{const{content}=compile(`<scriptsetuplang="ts">exportinterfaceEmits{(e:'foo'|'bar'):void}constemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:({(e:'foo'|'bar'):void}),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(typealias)',()=>{const{content}=compile(`<scriptsetuplang="ts">typeEmits={(e:'foo'|'bar'):void}constemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:({(e:'foo'|'bar'):void}),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(exportedtypealias)',()=>{const{content}=compile(`<scriptsetuplang="ts">exporttypeEmits={(e:'foo'|'bar'):void}constemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:({(e:'foo'|'bar'):void}),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(referencedfunctiontype)',()=>{const{content}=compile(`<scriptsetuplang="ts">typeEmits=(e:'foo'|'bar')=>voidconstemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:((e:'foo'|'bar')=>void),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('defineEmitsw/type(referencedexportedfunctiontype)',()=>{const{content}=compile(`<scriptsetuplang="ts">exporttypeEmits=(e:'foo'|'bar')=>voidconstemit=defineEmits<Emits>()</script>`)assertCode(content)expect(content).toMatch(`emit:((e:'foo'|'bar')=>void),`)expect(content).toMatch(`emits:["foo","bar"]`)})test('runtimeEnum',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">enumFoo{A=123}</script>`)assertCode(content)expect(bindings).toStrictEqual({Foo:BindingTypes.SETUP_CONST})})test('runtimeEnuminnormalscript',()=>{const{content,bindings}=compile(`<scriptlang="ts">exportenumD{D="D"}constenumC{C="C"}enumB{B="B"}</script><scriptsetuplang="ts">enumFoo{A=123}</script>`)assertCode(content)expect(bindings).toStrictEqual({D:BindingTypes.SETUP_CONST,C:BindingTypes.SETUP_CONST,B:BindingTypes.SETUP_CONST,Foo:BindingTypes.SETUP_CONST})})test('constEnum',()=>{const{content,bindings}=compile(`<scriptsetuplang="ts">constenumFoo{A=123}</script>`)assertCode(content)expect(bindings).toStrictEqual({Foo:BindingTypes.SETUP_CONST})})test('importtype',()=>{const{content}=compile(`<scriptsetuplang="ts">importtype{Foo}from'./main.ts'import{typeBar,Baz}from'./main.ts'</script>`)expect(content).toMatch(`return{Baz}`)assertCode(content)})})describe('errors',()=>{test('<script>and<scriptsetup>musthavesamelang',()=>{expect(()=>compile(`<script>foo()</script><scriptsetuplang="ts">bar()</script>`)).toThrow(`<script>and<scriptsetup>musthavethesamelanguagetype`)})constmoduleErrorMsg=`cannotcontainESmoduleexports`test('non-typenamedexports',()=>{expect(()=>compile(`<scriptsetup>exportconsta=1</script>`)).toThrow(moduleErrorMsg)expect(()=>compile(`<scriptsetup>export*from'./foo'</script>`)).toThrow(moduleErrorMsg)expect(()=>compile(`<scriptsetup>constbar=1export{barasdefault}</script>`)).toThrow(moduleErrorMsg)})test('defineProps/Emit()w/bothtypeandnon-typeargs',()=>{expect(()=>{compile(`<scriptsetuplang="ts">defineProps<{}>({})</script>`)}).toThrow(`cannotacceptbothtypeandnon-typearguments`)expect(()=>{compile(`<scriptsetuplang="ts">defineEmits<{}>({})</script>`)}).toThrow(`cannotacceptbothtypeandnon-typearguments`)})test('defineProps/Emit()referencinglocalvar',()=>{expect(()=>compile(`<scriptsetup>constbar=1defineProps({foo:{default:()=>bar}})</script>`)).toThrow(`cannotreferencelocallydeclaredvariables`)expect(()=>compile(`<scriptsetup>constbar='hello'defineEmits([bar])</script>`)).toThrow(`cannotreferencelocallydeclaredvariables`)#4644expect(()=>compile(`<script>constbar=1</script><scriptsetup>defineProps({foo:{default:()=>bar}})</script>`)).not.toThrow(`cannotreferencelocallydeclaredvariables`)})test('shouldallowdefineProps/Emit()referencingscopevar',()=>{assertCode(compile(`<scriptsetup>constbar=1defineProps({foo:{default:bar=>bar+1}})defineEmits({foo:bar=>bar>1})</script>`).content)})test('shouldallowdefineProps/Emit()referencingimportedbinding',()=>{assertCode(compile(`<scriptsetup>import{bar}from'./bar'defineProps({foo:{default:()=>bar}})defineEmits({foo:()=>bar>1})</script>`).content)})})})describe('SFCanalyze<script>bindings',()=>{it('canparsedecoratorssyntaxintypescriptblock',()=>{const{scriptAst}=compile(`<scriptlang="ts">import{Options,Vue}from'vue-class-component';@Options({components:{HelloWorld,},props:['foo','bar']})exportdefaultclassHomeextendsVue{}</script>`)expect(scriptAst).toBeDefined()})it('recognizespropsarraydeclaration',()=>{const{bindings}=compile(`<script>exportdefault{props:['foo','bar']}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.PROPS,bar:BindingTypes.PROPS})expect(bindings!.__isScriptSetup).toBe(false)})it('recognizespropsobjectdeclaration',()=>{const{bindings}=compile(`<script>exportdefault{props:{foo:String,bar:{type:String,},baz:null,qux:[String,Number]}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.PROPS,bar:BindingTypes.PROPS,baz:BindingTypes.PROPS,qux:BindingTypes.PROPS})expect(bindings!.__isScriptSetup).toBe(false)})it('recognizessetupreturn',()=>{const{bindings}=compile(`<script>constbar=2exportdefault{setup(){return{foo:1,bar}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.SETUP_MAYBE_REF,bar:BindingTypes.SETUP_MAYBE_REF})expect(bindings!.__isScriptSetup).toBe(false)})it('recognizesexportedvars',()=>{const{bindings}=compile(`<script>exportconstfoo=2</script><scriptsetup>console.log(foo)</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.SETUP_CONST})})it('recognizesasyncsetupreturn',()=>{const{bindings}=compile(`<script>constbar=2exportdefault{asyncsetup(){return{foo:1,bar}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.SETUP_MAYBE_REF,bar:BindingTypes.SETUP_MAYBE_REF})expect(bindings!.__isScriptSetup).toBe(false)})it('recognizesdatareturn',()=>{const{bindings}=compile(`<script>constbar=2exportdefault{data(){return{foo:null,bar}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.DATA,bar:BindingTypes.DATA})})it('recognizesmethods',()=>{const{bindings}=compile(`<script>exportdefault{methods:{foo(){}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.OPTIONS})})it('recognizescomputeds',()=>{const{bindings}=compile(`<script>exportdefault{computed:{foo(){},bar:{get(){},set(){},}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.OPTIONS,bar:BindingTypes.OPTIONS})})it('recognizesinjectionsarraydeclaration',()=>{const{bindings}=compile(`<script>exportdefault{inject:['foo','bar']}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.OPTIONS,bar:BindingTypes.OPTIONS})})it('recognizesinjectionsobjectdeclaration',()=>{const{bindings}=compile(`<script>exportdefault{inject:{foo:{},bar:{},}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.OPTIONS,bar:BindingTypes.OPTIONS})})it('worksformixedbindings',()=>{const{bindings}=compile(`<script>exportdefault{inject:['foo'],props:{bar:String,},setup(){return{baz:null,}},data(){return{qux:null}},methods:{quux(){}},computed:{quuz(){}}}</script>`)expect(bindings).toStrictEqual({foo:BindingTypes.OPTIONS,bar:BindingTypes.PROPS,baz:BindingTypes.SETUP_MAYBE_REF,qux:BindingTypes.DATA,quux:BindingTypes.OPTIONS,quuz:BindingTypes.OPTIONS})})it('worksforscriptsetup',()=>{const{bindings}=compile(`<scriptsetup>import{refasr}from'vue'defineProps({foo:String})consta=r(1)letb=2constc=3const{d}=someFoo()let{e}=someBar()</script>`)expect(bindings).toStrictEqual({r:BindingTypes.SETUP_CONST,a:BindingTypes.SETUP_REF,b:BindingTypes.SETUP_LET,c:BindingTypes.SETUP_CONST,d:BindingTypes.SETUP_MAYBE_REF,e:BindingTypes.SETUP_LET,foo:BindingTypes.PROPS})})describe('autonameinference',()=>{test('basic',()=>{const{content}=compile(`<scriptsetup>consta=1</script><template>{{a}}</template>`,undefined,{filename:'FooBar.vue'})expect(content).toMatch(`exportdefault{__name:'FooBar'`)assertCode(content)})test('donotoverwritemanualname(object)',()=>{const{content}=compile(`<script>exportdefault{name:'Baz'}</script><scriptsetup>consta=1</script><template>{{a}}</template>`,undefined,{filename:'FooBar.vue'})expect(content).not.toMatch(`name:'FooBar'`)expect(content).toMatch(`name:'Baz'`)assertCode(content)})test('donotoverwritemanualname(call)',()=>{const{content}=compile(`<script>import{defineComponent}from'vue'exportdefaultdefineComponent({name:'Baz'})</script><scriptsetup>consta=1</script><template>{{a}}</template>`,undefined,{filename:'FooBar.vue'})expect(content).not.toMatch(`name:'FooBar'`)expect(content).toMatch(`name:'Baz'`)assertCode(content)})#12591test('shouldnoterrorwhenperformingtsexpressioncheckforv-oninlinestatement',()=>{compile(`<scriptsetuplang="ts">import{foo}from'./foo'</script><template><div@click="$emit('update:a');"></div></template>`)})#12841test('shouldnoterrorwhenperformingtsexpressioncheckforv-slotdestructureddefaultvalue',()=>{compile(`<scriptsetuplang="ts">importFooCompfrom'./Foo.vue'</script><template><FooComp><template#bar="{bar={baz:''}}">{{bar.baz}}</template></FooComp></template>`)})})})