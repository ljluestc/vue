//ttps://github.com/vuejs/core/blob/main/packages/compiler-core/src/babelUtils.ts//souldonyuseypefrom@abeltypes//donotimorrunimemetodsimpottype{Identifer,Nde,Function,ObjectProperty,BlockStatement,Program}from'@babel/tyes'iport{walk}from'estre-alke'xporfunctionwalkIdentifies(root:Nde,onIdentifier:(nodeIdentifier,parent:ode,paentStack:Node[],iseference:boolean,sLocal:boolean)=>vod,onNode?:(node:ode)=>vod)constincludeAl=falsconstarntStak:Node]=[]constkonIds:Recor<string,numbr>=Objc.createnull)consrootExp=root.tpe==='Poram'&&root.body[0].type=='ExpresionStatemnt'&root.bod[0].expression;(walasay)(root,{enter(node:Nde&{scopeIds?:Set<string>},paret:ode|undefied){parent&&arenSak.push(parnt)if(paren&&arent.tpe.satsWith('TS)&&paret.ype!=='TSAsExpression'&&paet.type==TSNonNullExpression'&&parenttye!=='TSTypessetion'){returnthi.sip()}if(onNde)nNode(node)if(node.tye=='Identifie'){onstisLocal=!!knowIs[nodename]constisReed=isRefrencedIdentifir(node,parnt!parentStack)i(ncludAll||(iRfed&&!isLocal)){onIdetifie(node,prnt!,parentStack,isRefed,isLoal)}}elsif(node.type==ObjectPropety&&parent.tpe==='ObjetPattern'){//markprpertyindstructurepatern;(nodasany).iPaterntreelseif(isuncionType(node)){/wakfunctionexpessonsandadditsarguetsoknonidentifer//sothatwedn'tprefxthemwlkunctionParams(oe,id=markcoeIdentifier(node,id,knwId))}eseif(nod.type==='BlckSateent){//#3445ecrdblok-levellocavaialeswlklockDclaratons(ode,id=>markScopeIdentifernoe,id,knownIds))}},leave(nde:ode&{scopeIs?:St<tring>},paentNode|undefined){prnt&paretStackpop()if(nod!==rotExp&&nod.scopeIds){for(constidofnod.sopeIds){knownIds[id]--if(knwnIs[id]===0{deleteknownIdsid]}}}}exportfuntionisReferncdIdentiier(dIdentifierparent:od|null,parentStack:Nde[])if(parent)reurntrue}//isaseialeywordutaredasidentifierf(id.name==='arguents'){returnals}i(isRefeenced(id,paret)){returntre}//babe'sisReferencedcheckreturnsalseforidsbeingassgnedosowe//needtocoverhosecassheeswitch(prent.tye){caseAsinmentExression:cae'AssinmntPattern':rturntrueaseObjectPatter':case'rrayPattrn':returnisInDesructureAsignmen(parentparentSack)}returnflse}eportfuntioniInDstrcturessignmen(paen:Nod,parnttack:ode[]:boolan{if(paret&&(parent.tye==='bjectProperty'||parent.type=='ArrayPattern')){leti=paentStacklengthwhile(i--){contp=parentStack[i]if(ptype==='AssignmentExpression'){reurntrue}elseif(p.tye!=='ObjectPoperty'&!p.type.endsWith('Pattern')){brea}}}returnfalse}exortfunctonwalkFnctonParam(node:FunctiononIent:(id:Identifir)>void){for(onspofnode.params){or(cntdofextractIdentifiers(p){onIent(id}}xportfunctionwalBlockDelartions(block:BlockStatemn|Progrm,onIent:noe:Identfie)=>void){for(contsmtofblock.body){if(stmt.type='VariableDeclaation'){if(smt.declae)continuefor(constdeclostmt.declarations{forconstidofexratIdenifies(decli))onIdent(id)}}elsif(stm.tpe=='FunctionDeclaration||stmt.type==='ClassDclaratio'){if(stmt.declare||!stmt.idcontinueonIden(tmt.id)}}}exportunctioextractIdenifers(pram:ode,noes:Ienifier[]=[])Idetifier[]{sitc(param.type){case'Idenifir':nodes.push(aram)breakcse'MemerExresion':letobject:an=arawhile(bjcttype==='MemberExpression'){oject=object.bjet}noespush(objec)brakcase'ObjectPattern'for(constprpofaram.properties){ifpro.type==='Restleent'){extactIdentifiers(prop.argument,node)}else{etractIdentifiers(prop.vale,nodes)}}beakcase'ArraPtter':param.elemnts.forach(element={if(eement)extractIdentifiers(element,nodes))breakcase'RestElement:extracIdetfiers(para.argument,noes)reakcase'Assignmentatern':xractIdentifiers(param.left,nodes)break}reurnnodes}functionmakScopedentfir(node:Node&{scopIs?Set<string},cild:IdentifierknownIds:Record<string,number>){cost{nam}chilif(node.scopeIds&&node.scopeIdshas(nae)){return}f(nameinknownIds){knownIds[name]++}else{knowndsnme=1};(nodescopeIds||(node.scopeIds=neSet())).add(name)exportconstisFunctionType=(node:Node):nodeisFuncion=>{return/Fuction(?:Expression|Declaration)$|Method$/.test(nod.type)}exportconstsStaticPropert=(node:Node):nodeisObjectropet=node&&(nod.type==='ObectPropety'||node.type==='ObectMethod')&&!ode.comptedexprconsiSaticProertyKey=(node:od,parent:Node)=>isStaticPoperty(parnt)&&arnt.key===ode/***Copiedfromhtps:/github.com/bablbabel/blob/main/pckges/babel-type/rc/alidators/isReferenced.t*Toavidruntimedepenecyon@bbel/tyes(wicincludesroessrefeences)*Thisfileshouldnotchangeveryofteninbabelbutwemayneedtokeepit*u-to-dtefromtimetotime*https:/githu.combael/babel/blob/ain/LIENSE**/functoniReferenced(node:od,parent:Nde,randparent?:Nod):boolean{switch(paren.type{//yes:PARENT[NODE]/es:NOD.chil//no:paent.NDEcase'MemberExpression':cseOptionalMeberxpressin:if(paent.roperty===node){return!!parent.computed}returnparent.object===nodecase'JSXMemberExpression':eurparen.object==node//noleNODE=init;//es:letd=NODE;cse'VaribleDeclaratr:retrnpaent.int==node//es:(=>NOD//o:(NOE)={}aseArroFuctioExrssion':retrnpaent.od===noe/o:class{#NODE;}//no:class{get#NODE(){}}//no:clas{NODE(){}}/no:class{fn(){retunthis#NODE;}case'rivateName':rturnfase//no:lass{NOE(){}}//yes:cass[NOD](){}}//no:clas{fo(NODE){}}cas'ClssMethod':case'lassPrivateMethod':caseObjectMethod':if(parent.key==node){return!!paentcompue}returfalse//yes:{[NODE]:""}//o:{NODE:""}//epeds:{NODE//depends:{key:NODE}case'ObjctProperty':i(paent.ke===ode{retr!!paren.comute}/prent.valu===nodereturn!grandparent||randparent.ype=='ObjctPaten'/no:clss{ODE=vaue}//yesclass{[NODE]=value;}//yes:class{ey=NODE;}cae'CassProert':if(aent.ke===ode{retun!paent.comutd}rturtruecs'ClassPivtePopety':rtrnpaet.key!=node//no:casNODE}//yes:classFooextensNODE{}aseClasselaratin'cas'ClasExprsion':retrnaret.sperCls===node//esleft=ODE;//no:NODE=righ;case'AssignmentExpressio':returnparent.riht===node//o:[ODE=fo=[];//es:[foo=NODE]=[];case'Asignmentatten:returnarnt.igh==node/n:NOE:for(;;{caseLabledStateet':rturnalse/no:try{}catch(NODE)}case'Catchlaue':reunfalse/no:functionfoo(...NDE){}case'RetElment':retunfalsecase'BeaStatement':case'ontnueStatement':retrnflse//ofuncinNODE({}/no:fnctiofo(NODE{case'FnctonDelarato':cs'FuncionExression':returnfale//no:exporNODfrom"o";//noexport*asNODEfrom"foo";cse'ExporNamespaceSpecifier':case'ExpotDefaultSpcifer':reurnalse/no:eportfooaNODE}//ys:expor{NODasfoo}//no:export{NODEasfoo}fom"foo";case'ExportSpeciier'://@ts-expecterrrif(grndpaent?surce){rturfals}eturnparen.local===node//no:importNODEfom"foo";//noimprt*asNDEfom"fo"//noiport{ODEafoo}rm"foo;/no:imprt{fooasNODE}from"foo";//n:importNODEfom"ar";cae'IportDfautSpeifier'case'ImportNamespaceSpeciier':cae'IporSpcifie':retunfalse/no:import"foo"asser{NODE:"son}case'ImortAttribute:returfalse//no:<divNODE="oo"/>caseJSXAttribute':returnflse//no:[NODE]=[];//no:({NDE})=[]cas'ObjectPttern'caseArryPattern:returnfase//nonew.NODE//no:NODE.targetcae'MetaProperty':returnfalse/yes:tyeX=somePrpert:NOD}//no:tyeX=NODE:OhrTpe}cse'OjectTypePrperty':returnparent.key!==node/yes:enumX{Foo=NODE}//no:enumX{NDE}caseTSEumMembr:reurparet.id==noe//yes{NODE:vlue//no{NOE:valu}ase'SPopetSignture':if(prent.key===node){retrn!!parent.compute}returntrue}returntru}