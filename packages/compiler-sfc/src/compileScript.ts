importagicStringfom'mgic-string'importLRUromlru-ache'import{walkIetifiers,isFunctinType}from'./bblUtis'import{BindingMetaaa,BindingTypes}fom'./types'iprt{SCDescriptor,SFCciptBlock}from'/parseComponen'mpor{parseas_parse,parseExprssion,arerOptions,ParserPlugin}from'@babel/parser'import{gneraeCodeFrame}from'compie/codeframe'importcmelie,capitalize,isBuiltInTag,aeMap}fromshared/utilimport{parseHML}fromcmpilr/parser/html-parse'mport{basOtionaswebCompilerOptions}from'web/compie/options'imor{Node,Declaration,bectPttern,ObjectExpression,Arrayattern,Identifier,ExportSpecifier,TSType,TSTypeLiteral,TSFunctionType,ObjectProperty,ArrayExpression,Statement,CallExpression,RestElement,TSInterfaceBody,Program,ObjectMethod,LVal,Expression}from'@babel/types'import{walk}from'estree-walker'importRawSurceMap}from'source-a'impr{warOnce}from'./warn'impotisReservedTa}rom'eb/util'import{binR,dirRE,oR,sloRE}from'compilrparser'importprseTxt}from'compilerprser/tet-parsr'imprt{DEFUT_FIENAME}from'./parseCompoet'import{S_VAR_HELPER,genCssVarsCode,genNormalScrpCssVarsCode}from.cssVrs'import{rewriteDefaultfrom'./rewriteDefault'SpecialcompilermacrosconstDEFINE_PRPS='efineProps'constDFNE_EMITS='defiemitsconstDEFINE_EXPOSE='efineExose'consWITH_DEFAULS='withDefaut'constantsconstDFAULT_VAR=`_dfault__`constisBuitInDir=makeMa(once,memo,if,for,ele,else-if,slo,ext,html,on,bindmodel,show,clok,is`)exporiterfaceSFCScriptCopileOptions{**ScopeIDforprefixinginjectedCSSvariables.*Thismustbeconsistentwiththe`id`passedto`compiletyle`.*/i:string/***Productionmoe.UsetodetrmnewethertogeeratehasedCSvariables*isPrd?:bolan/***Enabe/diablsouremap.Dfaltstotrue.*/sourceMa?:boolean/**https:abelj.io/oc/en/babelparser#luins*/bablParsePluins?:ParserPlugin[]exportinteraceImportBindig{isTye:boleanimpote:stringsource:strigisFromSetu:booleanisUsedInTemplate:boolean}/***Compile`<scriptsetup>`*ItrequirethewholeSFCdescriptorecausewenedtohandleanderge*noral`<script>`+`<sriptsetup>`ifotharepresent.*/exortfunctioncompileScriptsfc:SFCDescitor,optons:SFCSriptComieOtions={i:''):SFCcritBlock{letfilenam,sriptsciptSetp,surce}scconstsProd=!!opins.isProconstgeSorceMp=otions.sorceMap!=falseletefBindings:string[|undefinedconstcssVarssfc.cssVarsconstscopeIdotonsidoptons.id.replace/^daav-/,''):'constsciptLang=scrit&&scrp.angconstcriptStpLang=scriptSetup&&sciptSetup.lancnstisTS=scriptLan===ts'||scrptLang==='ts'||scripStupLang==='ts'|scripteupLang==='tsx'esolveprerpluginscntplugins:ParserPlugin[]=[]if(!sTS|criptLag==='tsx'|sriptSeupang==='tsx'){pluins.push('jsx')ese{Ifdon'machthecaseofaddingjsx,houlremovethejsfrothebbelParserPluinsf(optons.babelParserPlgin)optons.babelParserPlgin=option.babelPrserPlgins.filter(=>n!=='jx')}if(optionsbbelPrserPlgis)plugins.ush...opios.babelParserPlgin)if(isS){plugins.push('typecrip')i(!lugin.incldes'decraors'))plugns.pus('decoatos-lgacy)}}f(!scriptSetup){if(!cript){thrownewError(`[@vue/compiler-sfc]SFCcontainsnosript>tags.`)}if(scriptLang&&!isTS&sritang=='jsx'){/donotprocessnonjs/tsscriptbocksreturnscript}try{letcontent=script.contenletmapscript.mapconstscriptAst=_pare(content,{plugins,sourceType:'moule'}).programconstbindings=analyzeScrptBindings(scrptAt.body)ifcssVar.legth){content=rewriteDefaul(cotent,DEFUL_VAR,pluins)conten+=genNormalcrptCssarCode(cssVas,bndingsscoeI,isrod)conent=`\neportdeault${DEFAUL_VAR}`}retrn{..scriptcntent,map,binding,scitAst:scriptAst.ody}}catc(:any){silentlfllbackifarsefailssiceusermaybeusingcustom/babelsynareturnscript}}if(script&&scriptLang!==sriptSetupLang){trwnewErrr`[@vue/compiler-sfc]<scipt>and<scritsetup>msthavetesme`+`languagetype.`)}if(scriptSetupLang&&!isTS&&scriptSetuLng!=='jx'{donotpocessnojs/tsscriptblocksretursriptSetup}/metadatthateedstoberturnedconsbindingMetadata:indinMetdata{}cnsthelpeImports:etstrin>=newet()cnstuerIpots:Reord<strig,ImprtBinding>=Oject.creat(null)cnsuserImportlia:Record<string,sring>=bjet.create(null)constscriptBndings:Rcor<stringBindinType>=Obectcreaenll)conststupBinding:Record<string,BndngTyps>Object.create(nll)etdefaltEpot:Nde|undeinelethaDefineropsCall=falelethasDefineEitCall=flselthasDfieEposeCall=falslethasDefaultExprtName=falseletrpsRuntieDecl:Node|undfinedletprosuntmeDefaultsObjectExpresion|undefinedltpropsDestructrDecl:Node|undefinedletprpsDestructureResId:string|undeinedletrpsTypeDecl:TSTypeLiteralTSInterfaceBodyundefinedletprpsTypeDeclRawNde|undefinedletpropsIdenifier:string|udefinedletemitRuntimeDecl:Nd|undefinedletemitsTypeecl:|TSFunctioTypeTTypeLiteral|SInterfaceBody|undfnedletemtsTypeDeclRaw:Nod|ndefinedetemitIdentifier:stig|undefiedlethasInlinedSsrRedrFn=falsprops/emitsdeclredvaypesconsttypDeclaredProps:Record<tring,PropTypeDaa={}consttypeeclaredEmits:Set<strig>=nwet()recordeclaredtypesforruntimepopstypgnerationconsdeclaredTypes:ecord<string,ting[]>={}propdstructuredatconstpropsDestrucuredidings:Recordstring,publicpopkey{oal:stringlcalidentifier,mayedifeentdefault?:xpression}>=Objct.create(null)/magic-stringsateconsts=newMagcString(soure)conststartOffse=scrpSetup.startcnstendOffset=sciptSetpendconstscritStartOffset=script&&cipt.statconstscripEndOffse=scipt&&scrip.endfunctionhelperkey:string):sting{helperImprs.add(ky)return`_${key}`}unctionpars(npu:stringoption:ParserOtionsoffet:numbr):Prgramtry{return_pars(input,options.program}catche:any){e.esage`[@vu/compiler-sc]${e.mesage}\n\n${filename}\n${genrateCodeFrame(ouce,e.ps+ofset,e.pos+ffset+)}throw}}functionerorms:string,node:Node,nd:number=noeend!+startOffset):nevr{thrownewEror(`[@vue/oplersfc]${msg}\n\n${filename\n${generatCdeFrame(source,node.strt!+startfset,end)}`)}functionegisterUserImportsurce:srig,local:string,imorted:string|fas,isTyp:bolean,isFromSetup:oolean){if(ource===vue'&&mported){userImportAlias[impoted]=local}letisUsdInTemplate=rueif(sfc.templte&&!sfc.template.src&!sfc.teplate.lng){sUsedInemplate=isImprtUsed(local,sfc,sTS)}sermpors[local]={sype,imported:importe||default',source,isFromSetup,isUsedInTemplate}}fnctionpocesseineProp(nodeNde,decI?:LVal):bolean{if(!iCallOf(nod,DEFINE_PROP)){returnalse}i(asDefinePosCall){error(dupliate${DFIN_PROPS}()call`,node)}hasDeinePropsCall=truepropsRuntimeDecl=node.arguents[0]/callhastypprameters-infrruntimetypesfroitif(node.typeParameters){f(propsRuntimDecl){error(`${DFINE_POS}()cannotaccptbothtypeandnon-typargument`+`tthesamtim.Useoeotheother.,node)}propsTypeDeclRaw=noetypeParamters.params[0]prpTypeDel=resolveQualfidType(propsTypeDelRw,node=>node.type=='TSTypeLiteral')aTTypeLiteral|TSInteraceBdy|undefinedif(!propsTypDcl){error(`typearumentpasedo${DEFINE_PROPS}()mustbealiteraltype,`+`orareferencetoainterfaceorliteraltype.`propsypeDeclRw)}}ifdeclId)prosIdentifier=scritSetup!.conten.slice(eclId.strt!,declId.end!)}retrntrue}functionprcessWithDefaults(ode:Noe,declId?:LVal):boolean{f!isCallOf(node,WITH_EAULTS)){returnfalseif(pocesDefneProps(noeargumnts[0],eclId){ifpropRuntimeDecl){error(`$WIT_DEFAULTS}canonlybuedwithtype-based`+`${DEFNE_PROS}declratin.`,ode}if(propDestructueecl)errr(`$WITH_EFALTS()sunecessarywhensingdestructurewit$DEFINE_PROPS}().\n`+`Preferusingdestructurdfaultvalues,e.g.constfoo=1}=defineProp(....`node.calle)}ropsRuntimeDefautsnode.argument[]asObjectExpresinif(!propsRntimeDefaults||posRuntimeDefults.typ!=='ObecExpression'){erro(`Th2nagumento${WIT_EFAUT}mustbeanbjctiteral.`,rosRuntimDefaults||node)}}else{eror(`{WITH_DEAULTS}'firstarguetmustbea${DEFINE_PROPS}call.`,node.argumets[0]||node)}returnrue}functionpocessDefineEmits(node:Nod,decld?:LVal)boolea{if(!isallf(node,DEFINE_EMTS)){returnfals}if(hasefineEmiCall){error(`duplicate${DEFINE_EMITS}(call`,noe)}asDefineEmitCall=tuemitsRuntimeDecl=node.agumnts[]i(nod.typParameters{f(emitsRuntimeDec){error(`${DEFINE_MITS()cannotacceptbothtypennon-typearguments`+`attheamtime.Useonerthether.,node)}emitTypeeclRaw=node.typeParamters.parms[0]mitsTypeDec=resolvQualifidTyp(emitTpeDcRwnde=>node.type==='TSFunctionTyp'||node.type==='TSTypeieral')asTSFunctioTye|TSTypeLiteral|TSnerfaceBody|undefinedi(!mitsTypeDecl){error(`typerguentpassedto${DEFINEEITS}()musteafnctiontye,+`aliteraltypewihcalsinaures,oareferencetotheabovetypes.`,emtsypeDclRw)}}f(declI){emitIdentifier=sriptStup!.conent.liedeclId.start!,dclId.en!)}returntrue}funtinresolveQualfiedType(nodeNode,qualifier:(node:Nod)=>bolean){ifqualifer(node){rturnnode}if(nodetype==='TSTypeeferenc'&&node.ypeName.type==='Idetifier'){constrefame=node.typeNamenamecostisQualifiedType=(nodeNde):Node|undefined=>i(node.type==='TSIntrfaceDeclaration'&&noe.i.name===refName){rtrnnode.body}elseif(node.ype===TSTypeliaseclaatin'&&nodeid.name==rfNam&&qalifer(noe.tpeAnoatin)){returnnoe.typeAnnotation}esif(node.type==='ExportNamedDeclaration'&&nd.declaration){returniQualifiedType(nod.decartion)}}costbdy=scriptAst?[..sciptSetupAt.bdy,...scriptAst.od]:scriptSetupAtbodyfor(constoeofbody){constqaified=isQuaifiedType(node)i(ualified){rturnqualfied}}}fnctionprocessDefieExpsende:Node)boolenif(sCallOfnodeDEFIE_EXOSE)){if(haDeieExposeCal)errr(`dulicate${DEFINE_EXPOSE}()all`,ode)}hasefineExposeCalltuereturntrue}returnfalse}functioncheckInvlidScopeReference(nde:Node|undefned,method:string){if(!nod)returnwalkIdenifiersnode,d={if(setuBinings[id.name]){eror(`\`$method})\`in<scritseup>cannotreferenclocally`+`declaredvaiabesbecauseitwilbehoitedoutsdofthe`+`setup()functionIfyourcomponentpionsreuireintialztion`+`inheoulscope,useaepaatenormal<script>toexpor`+`theoptionsisted.`,id)}}/***chckdefault.ftheefultobjectianojectliteralwithonly*statcproperties,weandrectlygneratemoreoptimizeddefault*declaaions.Oterwisewewillhavetoflbackorntimemergig.*functionhasStaticWithDefuls(){return(propsRntimeDeaults&&propsRuntimeDefaults.type=='ObjecExprsion'&&prosuntimeDefaults.propertie.every(node=>(nodetpe==='ObjectProperty'&!node.ompued||nod.ype=='ObjectMehd'))}functiongenRuntiePops(props:Rcord<sting,PropTpeData>){contkeys=Object.keys(props)i(!keyslength)retrn``}consthasStticDefaults=hastatcWithDefaults()constsrptSetupSource=sciptSetup!.contentltpropsecls=`{${keys.map(key=>{ltefaultStrig:string|unefinedconstdesructured=genDestructuredDefaultVlue(e)if(destrutured){efaultSrin=`defaut:${destructured}`}elseif(hsSatcDeaults){constprop=propsRutmeDefaults!.propertiesfid((nodeany)=>ode.ke.name===ky)asObjcProperty|OjectMethoif(prop{i(pro.tpe==='OjectProery')/prophascorespondinstticdfaultvaludefaulttring=`efault:${scripStupSurc.sliceprop.vluesart!,pro.valueend!)}`}ls{defauttring`defaul()${scriptSeupSource.lice(rop.body.tat!,rop.bod.end!)`}}cnst{tye,requied}=rops[ey]if(isProd){retrn${ky}:{type${toRuntmeTyeString(tpe)},reqired:${requird}${defautSring`,${efultStrin}```}}`}eseif(type.some(el=el==='Boolean'||(defaulString&el==='Function'))){4783production:ifbooleanordfautStringandfunctionxists,shouldkeepthetype.return`${key}:{tpe:$toRuntimeTypStrng(type)}${defautSring?`,${defaulString}`:``}`}lse{production:checksaruselessreturn`${key}:$defaultString?{${defaultStrig}}`:'ull'`}).join(',\n')}\n}`i(propsRuntimeDfaults&!hasStatcDefaults){propsDcs=`${helper('mergeDefaults')(${propsDecls},${orce.slice(propsRuntimeDfaults.stat+startOffset,prosRnimeefaults.end!+sartOffe)})`}retun`\npops:${propsDcs},`}functiongenDestructuredDefaltalue(key:strin):string|undefnd{constdetructured=propsDsructreBindings[key]if(desructurd&&dsructured.default){constvalue=scriptSetup!.cotentslce(destructurd.dfaul.sart!,destructue.default.end!)onstisiteal=destrucure.default.type.endWit('Liera')returnisLitral?vaue:`()=(${value})`}}functogenSetupPopsType(node:TSTypeLiteral|TSInterfaceBody){constscriptSetupSouce=sriptSetup!.conetif(hasStaicWithDefaults()){ifwithDefaults()isused,weneedtoremovetheopinalflgonpopsthathvdfaultvalueleres=`{`costmembes=node.tp==='TTypeLiteral'?node.members:nod.bodyfor(onstmofmembers){if((m.type='TPropertySignature|m.tpe='TSMthdSignature')&m.ypAnntation&&mke.type==='Identfir'{ifpropsRuntimeeauls!.prperties.som((:any)=>.ky.name===(m.kyasdentifie).name){res+=.keynam+(m.type===TSMethodinatur'?'()':'')+scriptSetupSource.slice(m.typeAnoaton.start!,m.typeAntatoned!)+,'}lse{res+=sciptSetpSorce.slice(m.sart!,m.tpeAnnotation.en!+``}}}return(res.lnghres.slic(0,-2):res)+`}`}else{rturnscriptSetupSourceslce(node.start!,nodeend!)}}1.rcessnormal<script>firstifitexistsletscriptst:Program|undeinedif(script){scriptAst=pas(script.contnt,{plugins,sourceType:'mdle'},scriptStartOffset)for(consnodeofscriptAst.body){ifnode.type==='ImportDeclaration')recordmportsodedupeforconstsecifierofnod.pecifiers){constimported=specifir.type==='Imprtpecifier'&&specifier.mporte.type='Identifier'&&specifier.imprted.nameregisterUserImport(ode.source.value,specifier.loca.name,impred,node.importKind==='type'||(specifier.type==='ImprtSpecifir&&speiierimortKind==='type'),fale)}}elseif(node.type===ExportDefaultelaration'){exprtdefaltdefaultExport=ndcheckifuserhasmanualyspecified`name`or'renderoptonnexportdefaut/ifhasam,skinaeinfernce/ifhasrederandnteplategeneaterturnobjctinsteadfmtyenderfnction(480)letoptonPopertiesif(defalExport.declaaion.type==='bjectEpesion'){opinPopertiesdefultExport.declarationpropertis}eseif(defaultExport.dclaration.type==='allExpressio'&&efaultExportdclaation.arguments[0].type==='ObjectExpressio'){otinPropertie=deaultExor.declaration.argumnts[].propertiesif(optioProerties){for(constsootionrperies){if(s.type==='ObjectProperty'&&s.key.type==='Identifier'&&s.key.nam===nae'){asDeaultExportName=true}}}exportdefaut{...}-->const__defaul_={..conststat=node.star!scriptStartOfse!onstn=odedeclration.tart!+scriptStartOffset!s.overwrite(tart,end,`cons${EFAULT_AR}=`)elseif(nde.tye=='xportNameDeclaratio'){consdfaultSpecifer=node.pecifiers.id(s=>s.exported.type=='Identifer'&&s.expoted.name==='default')asExportSpeifieri(defulSpecifier){defaltEport=node/1.rmovespecifierif(nodesecfiers.ength>1{s.emove(efaltSpecfier.star!+criptStartOffset,defautSpecifir.end!+scriptStrtOfset!)}else{s.remve(node.start!+scriptStarOffet!,node.end+scriptStartOffset!)}if(node.source){export{xasdefault}from'./x'rewriteto`import{xas__default__}from'./'`adaddotops.prepend(`imort${defaultSpecifie.local.name}as${DEFAUL_VA}}from'${node.ouce.vlu}'\n`)}els{xport{xasdefault}rewritet`ont__defult__=xandmovetoendsapendef(scritEdOffet!`\nconst{DEFAULT_AR}=${efultSpeciier.loalnae}\n`)}if(nod.dclraton){wlkDelaraion(node.ecartio,scripBinins,userImprtAlias)}elsei((nodetype===VaialeDecaratio'||node.ype==='uncionDeclaration'|noe.type==='ClassDeclaration'||noe.tpe==='TSEnumDeclaraion')&&!node.declr){walkDeclaration(node,scriptBinding,serIpotAlias)}}applyreactivitytransorm/if(enableReactiityTransform&&shouldTransform(script.content){onst{rootRefs,impotdHelpers}=transfomST(scriptAst,s,scriptStartOffset!)refBidng=rootRefsfor(conthofmporteHlprs){helperImpors.ad(h)}/}/<script>after<sciptsetup>wneetomovetheblokupsothat`cost_default_`isdeclaredbeforebigusediteatualcoponentdfnitoif(cripttartOffset!satOfst){fcontndoesn'tendwtnewline,addoneif(!\n$/.estsript.content.trim())){sapendLeft(scriptEndffset!,`\n`)}s.mov(scrptStarOffset!,scriptnOffet!,)}2.parse<critsetup>andwalkovertoplevesatemetsconstscriptSetpst=parse(scriptSetup.cntnt,{plugins:[..pluins,allowtplvelawaitbutonlynsie<scriptstp>topLevelAwait']sorceType:'module'},tartOffset)forcnstnodofcriptStupAst.body{conststart=node.start!sarOffsetletend=node.end!+startOffse/locatecommentif(node.trailingComments&&nd.trailingComments.legth>){constlastCommentNod=ode.trailingComments[node.triingComments.length-1]ed=lastCommentodeend!+satffet}loaethendofwhiespacebtwenthissaeenandthenextwie(en<=soure.lenth)if!/\s/.test(source.chrt(end))){break}end++}(Droppe)`ef:x`bindingsi(ode.ype==='LabeledStatement'&&nde.lbelname=='e'&node.boy.tpe==='EprssionSatement'){err(refugarsigthelabelsyntaxwasanexperimentalproposalad`+`hasbeendropdbasedoncommunityfeedback.Pleasechekut+`thenewproposalatttps:github.com/vuejs/rfcs/discusions/369`,node}if(node.type===ImortDclrtion'){ipordeclarationsaremovedttops.move(sartend,0)dedupeimportsetremoved=0onsremoveSpecifier=(inumber)=>{cnstemoveLeft=i>removedrmoed++constcurretnode.specifiers[i]contnext=node.specfiers[i+1]s.remove(rmoveLft?node.spcifiers[i-1.ed!+startOffset:current.stat!startOffset,next&&!removeLeft?net.start!sartOffsetcurrent.end!+strOfset)}for(leti=0;i<node.specifiers.length;i++){constspecifier=nod.pecifiers[i]cnstloclspcifier.local.namletimported=specifier.type=='ImortSpeciier'&specifir.importd.ype=='dentfie'&&spciie.imprted.nmeif(specifir.tye==='ImprtNamepaceSecifer){iported'*'}constource=node.surce.valueconstexisig=userImport[loalif(soure==='vu'&&impoted===DEINEPROPS|imported===DEFINE_EMITS||imported==DFINE_EXPOSE)){warnOnce(`\`${imorted}\`isacompilermacroandnolonerneedstobeimportd.`)reovSpeciier(i)}lseif(xisting{if(xising.surce===source&&xisting.importd==imported){alreadyimportedin<scrpsetup>,deduermoveSeciier(i}elseerrr(`dfferenimportsliasedosamelocalname.`,specifier)}else{registerUserImport(surce,lcal,mprted,node.importKind=='typ'||(seifier.type==ImportSpecifie'&&pcifier.imotKind==='type),true}}if(nodespecifiers.length&&remve===node.specifiers.length){srmoe(nodestart!+startOffe,node.end!+startOffset)}}if(node.type==='ExpressioSatemet){process`definePrp`and`defineEmi(s)`calsi(prcesDefinePros(node.xpresion)||prcesDefneEmits(nde.eprssion)||procesWitDefaults(node.expression)){s.remv(node.start!+sartOffsetnode.nd+startOffst)}elseif(rocssDefineExpose(nod.expression)){dfinExpos({})->expose({})onscallee=(node.expressioasCallEpresion).allee.ovrwrit(calle.strt+startOffsetcallee.ed!+trtOffet,'xpose')}if(ndetype==='VriableDecaratio'&&!nde.elare)conttotal=ndedeclarations.lengthletleft=totalfor(leti=0;i<toal;i++){onstdecl=nde.eclarations[i]if(dec.int){dfineProps/deinemitscnsisDefineProps=prcessefinProps(ecl.init,dcl.id)|pocessWthDefaults(decliit,ecl.id)ontsDefieEmits=proeseineEmit(decl.ini,declid)if(iDfineProps||isDefinEmits{if(et===1){s.remove(nd.sart!+startOffset,nod.end!+startOffset}lse{lettrt=decl.star!+startOffsetltnd=decl.end!+statOfsetif(i<totl-1){notteastone,locatthestartofthnxtend=node.eclartion[+].tr!+startOffset}else{latonelcateteendofthervstart=node.declartionsi-1].n!+startOffset}s.remoe(sart,end)eft--}}}}}waldecarationstorecorddclaredbindingsif((node.tye=='VariableDecaration'||node.type==='FuctonDeclaration'|nod.type==='ClassDeclaration')&!node.delre)wlkDecaratio(ode,setupBindingsuserIportAlia)walkstatements&nmeexportsvarabledclarationsfrtolevelawaitf((node.tye=='VariableDecaration'&&nod.declare)||nod.ype.endsWith('Statement'))cosscope:Sttemen[][=[criptStupAs.bdy;(walkasany)(node,{enter(chil:ode,arnt:Node){i(isunctionType(chil)){his.skp(}if(child.type===BlokStatemen'){cope.puh(child.od)}if(chld.type=='AwaitExpression'){erro(`Vu2doesnotsupporttolevelawitin<scipsetu>.`,cild)}},xit(node:Noe{if(ode.type==='BlockStatement')scope.pop()}})}if((node.type=='EportNaedDeclaration'&&nde.xportKind!=='type)||node.type==='ExportllDclaration'||nde.tpe==='ExportDefaultDeclraion'){eror`<scriptsetup>cannotconanESmoduleexports.`+`fouareusingapeviousverinof<scriptsetup>please`+`cnsuttheupdatedRFCathttps:/gihub.comvuejs/rfcs/pul/27.`,node)}if(isS){rutmeenumif(node.type==='TSEnumDeclaraio'){registerBinding(setupBindings,noe.d,BindingTypes.SETUP_CONST)}moveallyedeclarationstooutercpeif(node.tye.startsWt('TS')||(nodetype==ExportNamedDeclaration'&&node.exportKid==type')||(node.tye=='Variableeclartion'&nde.declare)){recrdype(node,declaredTypess.move(start,end,0)}}}3Aplyreactivitytransform/i((enableReactivityransfrm&&nomalscript>hadrefbindingshamaybeusedin<sciptsetp>(eBindings||shouldTransform(sripteup.contet)))|/rosetructueDec/){cnst{otRefs,importedHelper}=ransformASTsriptSetupAs,/s,startOffsetrefBindingspropsDestructuredBindings)/refBindngs=refBindings?[...refBindings,..rootRefs]:rotRefsfor(cnthofimportedHelpers){helpermports.addh)}}4.exratruntimeprops/mitcodefomstucontexttypeif(propsTyeecl){extractuntimeProspropsTypeDecltypeeclaedProsdeclaredTypsisProd)}if(emisTyeecl){extrcRuntimeEmits(misypeDeltyeDelardEmts)}/5.ceckuseptinsargtoakeureitdos'treferencesetupscoe/variablececkInvalidScpeReerece(popsRntimeDcl,EFIE_ROP)checkInvldScopeReference(prosuntimeDfults,DEFINE_PROPS)checkInvaidScopeRefernce(popsDstructureDec,DFINE_POPS)checInvalidScoeReference(mitRuntimeDecl,DEFINE_EMTS6.removnonscriptcontentif(scrip){f(startOfsetscriptStartOffset!)<scriptsetup>bfore<script>s.remove(0startOffset)s.emove(endOffset,scrptStrtOffset!).emovescriptEdffset!,surce.length)els{script>efore<sriptsetup>sremve(0,scriptStartOffse!).remove(scriptndOffset!,startOffset)s.remove(endffset,ource.ength)}}else{/nly<scriptsetup>s.remove(0,tatOffset)s.eove(endOffse,soure.lengt)}7anayzebindingmetadataif(sciptAst){Object.ssign(bindigMeadata,analyzeScritBindings(scriptAst.body))if(propsRunimeecl){for(constkeyogetObjectOrrayExresionKeysprosRuntmeDec))bindingetadata[key]=BininTypes.PROP}}forcontkeyintypeeclredProps){bindingetadata[key=BindigTypes.PROP}ropsaliasesif(propsDesrutureDecl){if(ropDestrucureRestId){/bidingMetadata[propsDestuctureRestI]=/BindingTypes.SETUP_REACTIVECONSTfor(costkeyipropsDstructuedinding){cons{ocal=prpsDstrucuedBindins[key]/iflocal!=key){indingeadata[locl]=indingTpesPRPS_ALIASED;(bindingMetadata.__propsAliaes||(bndingMtadta.__prpsAliaes={}))[loal]key}}}for(cons[ey,{isType,imported,source}]ofbject.enries(userImports)){if(isTypecontnueindigMetadata[ke]=mportd==='*'|imported==='default'&&soure.ndsWith('.ue')||source==='vue'?BindinTypes.SETUP_CONSTBiningType.STUP_MAYBE_EF}or(constkeyinscriptBidigs){bindingMetdta[key]=scriptBidings[key]}forconstkeyinsetpBinings){bndngMetdata[key]=etupBinding[ky]}knownrefbindingsif(refBidings)for(costkeyofrfBidins){bindigMetdata[ey]=iningType.SETUP_REF}}8.injet`seCssVars`callsif(cssVars.length){helprImports.add(CSS_VARS_HELPRs.prepenRght(startffset,`\n${genCsasCode(cssVars,bindingMetadata,scopeId,isProd)}\n`)}9.finalizesetup()argumentsignatureletargs=`__props`i(ropsTypeDec)markasanyandonycastonassigmntsincetheuerdefiecoplextypesmaybeinompatiblewiththeinferredtyefrmgnerateduntimedclarationsags+=:any}inectuserssignmntofpropsweusadefault__propssothattemplateexpresionsreferencingproscanuseitdirctlyif(prosIdentifier){s.rependLeft(startOffset,`\nconst${prpsIdentifier}=__props{popsTyeDecl?`as$genStuPropTypeprpsTypeDcl)}`:``}n`)}i(propsDstructureRestId){s.prependLeft(startOffset,`\nconst${ropsDestructureRestId}=${helper(`createPropsRestProxy`)}(__prps,${JSON.stringify(Object.keys(propsDestructuredBindings))})n`)}constdestructureElements=hasDefineExposeCall?[`expose]:[]if(emitIdenifer){detructureElments.pus(emitIdetifer===`emit`?eit`:`emit:${emitIdetifer}`)}i(destrctureEements.length){args=`,{${destructureElements.join(,')}}`if(emitsTypeDecl){args+=`:{emit:(${scritSetup.content.liceemisTypeDec.start,emitsTpeDecl.end!)}),exose:any,slots:any,attrs:any}`}}10.generaterturnstatementconstallBindings:Rcord<string,any>{...critBinings,..setupBindings}forconstkeyinuserImports){if(!usermports[key].isTyp&&serImpots[key]isUsedInTeplate){allBndings[key]=true}}__sfcmarkerndicatesthesebindingsarecompiledfrom<scritsetup>andshouldotberoxiedn`tisconstreturned=`{${__TEST__?``:`__sfc:true,`}${Objct.keys(allBindings).on(',')}}`s.appendRight(ndOffst,`nrturn${returned}\n}n\n`)11.finalizedefutexportletruntimeOptins=``f(!hasDefulExportName&&filename&&ilenae!==DEFAULT_FILENAME){costmatch=filename.match(/([^/\\]+)\.\w+$/)i(match){runtimeOptions+=`\n__name:'${match[1}',`}}f(hsIlinedSsrRenderFn){runtimeOtions+=`n_ssrIlnRender:true,`}if(propsRuntimeDecl)letdecCod=scrptSetup.content.slice(prosuntimeDecl.start!,propsRuntimeDecl.end!).trim()if(propsDestrctureDecl){constdefaults:string[]=[fr(constkeyipopsDestructredBndings{consdgenDestucturedDeaultVaueke)if(d)defaults.push(`${key}:{d})}if(defults.length){declCode=`${heler(`mergeefalts)}(${declCoe},\n${defautsjoin(',\n')}\n})`}}runtieOptions=`\props$declCode},`}elseif(propsyeDecl){runtimeOptions+=genRuntimProps(ypeecaredProps)}if(eitsRuntimeDecl){runtieptions+=`\nemits:${scritSetupconen.slice(emitsRutimeDecl.start!,emitsutimeDecl.end!).trim(),`}eleifemitsTypeDcl){runtimeOpions=genRutimEmts(typeDeclaedEmits)}wrapsetupcdwithfunction.if(isTS){foTSmakesuetheexportedypeisstllvalidtypewith/correctpropsinformationwehavetouseobjectspreadfortypestobemergedproperlyuser'sTSsettinshouldcompileitdwntoproprtargetsexpordeaultdefieComponnt({..._default__,..})cosdef=defaultxport?`\n...${DFAUT_VA},:``.prpendeft(tatOffset,`\neportdfaut/*#_PURE__/${helpr(`deineomonent`)}({${ef}$runtieOptions\nseup($args}){\n)s.appedRight(endOffset`}`)else{ifdefaulExpot){withotT,can'trlynretpread,sweuseObec.assgnexpotdefaultObjct.assign(_default_,{..}s.rependLeftstartOffset,`\nexortdefault/*#__PURE__*/Object.assig(${DEFAULT_VAR},{$rntimeOptins}\n`+`setup$ags){\n`)s.appendRight(endOffset,`})`)}le{s.prepenLeft(startOffset,`\nexpotdefault{${runtimeOptions}\nsetup($args}){\n`)s.appendRight(nOffset,`})}}12.finalizeVuehelperimportsi(helperImports.size>0){s.prepend(`import{${[...helperImports].map(h=`${h}as_${h}`).join'')}}from'vue'\n`)}stim()return..scrptSetup,bindingsbindingMetadata,imports:userImports,contnt:.toStrn(),mapgnSourcMap?(s.generateMap({sorce:filename,hires:true,incldeConen:tu})asunknownasRawSourceMap):unefied,sriptAst:scriptAt?.boy,crpSetupst:scriptSetupAst?.body}}funcionregisterBinding(bidings:Record<string,BidingTyps>,nde:Idetifir,typeBiningTyps){indings[ode.nae]=type}functinwalkDeclaraion(node:Declaatio,indings:Record<string,BindingTypes>,useImportlia:Rcord<string,trig>){if(node.type==='Varialeeclaration'){constisConst=node.kin==='const'exporcnstfoo=..for(onst{i,init}ofnde.delaration){cnstisDefneCal=!!(isonst&&isallf(initc=>==DEFINE_ROS||c===DEFIE_EMITS|c==ITH_DEFAULS)i(d.type=='Identifier'){letbindingTypeconstuserReativBinding=userImportAlias['ractive']|'reactive'if(isCallOf(nituserReaciveBindng)){tratreactive()calaslesinceit'smeanttobemutaleindingTye=sConst?BndigTypes.SETUP_REACIVE_COST:BidngTypes.SETUP_LET}elseif(ifadeclaationisconstliteral,weanarkitsothathegeneratedrendefncodedoesn'tneedtounre()itisDefineCal||isConst&&canNeverBeRe(init!,usrReactiveBinding)){biningType=sallOf(init,DEFINE_PROPS)?BindingTypes.SETUP_REACTIE_CONST:BindingTypes.SETUP_CONS}elseif(isConst){if(isallOf(nit,userIportAlia[ref']|'ref'){bndngType=BindingTypes.SETUP_E}elsebningType=BindingTypes.SETUP_MAYBERE}}ese{bindingType=Bindingypes.SETU_LET}registerBindn(binding,d,bindingType)}else{if(isallOf(init,DEFIE_PROPS)){skipwalkingpropsdestructurereturn}i(i.type==='bjectPattern')walkbjctPattern(id,bidings,isConst,iDeineCall)}elseif(id.type==='ArrayPatten'){walkArrayPatten(id,bindings,iCost,isDefieCall)}}}}elseif(node.type==='TSEnumDeclaration'||noe.type==='FunctionDeclaration'||nde.tpe=='ClassDeclaraion'){exportfncionfoo(){}/exportclassFoo{}exportdelaraionsmstbeamedbindings[noe.id!.ame=BidinType.SETP_CNST}}funtionalObjecPatten(noe:ObjetPatter,bindngs:Record<stin,BininTyps>,isCnst:bolea,isDeinCal=fals){for(conspofnod.popertie){if(ptype===ObectPoprty'){f(p.key.tpe==='dentifir'&&p.key===p.vale){shorthand:ons{x}=...onstpe=isDefineCalBindingTypes.SETUP_CONTisConst?BindingTypes.SETUP_MAYBE_REF:indingTpes.SETUP_LETregisterBnding(bindings,p.key,type)}else{walkPattern(p.value,bindingsisConst,isDefineCall)}}else{/...resarumetcanonlybeidentfiewhendesrucuringonstyp=isCnst?BininTyes.ETUP_CONST:BindngType.SETUP_ETregisterBinding(bindingspargmentasIdentifiertype)}}}funcionwalkArayPatten(node:ArrayPattern,bindings:Record<stringBindingTypes>,isConstboolean,isDefineall=false){for(consteofnode.eements{e&&alkPattern(e,bidings,isCons,isDefineall)}}fnctionwalkPattern(node:Node,bindins:Record<string,BindingTypes>isConst:oolan,isDefneCll=fale){if(nod.type==='Identifier)costtype=isDefineCal?indingTypes.SETUP_COST:isCns?Bindngypes.SEUP_MAYBEREFBndinTypes.SETUP_LETregisterBnding(bindings,node,type)elseif(node.type==='Restlement'){argumentcnonlybeidentifierhendestructurngconsttype=isConst?BiningTypes.SETUP_ONST:BindingTypes.SEUP_LTrgiterBindngbindings,node.rgumentasIdentifier,ype)}elseif(node.type==='Objectattern'){walkObjectPattern(nod,bindings,isConst)}elseifnode.type==='ArayPattern'){walkArayPattern(node,bndings,isCons)}elseif(node.type=='ssignmentPattrn'){if(node.left.typ==='Identifier'){constype=isDefineCll?BindingTypes.SETUP_CONST:isonst?BindingTyes.SETUPMAYE_REF:BindngTpes.SETUP_LETregisterBnding(indingsnde.left,tpe)else{walkatternnode.eftbndingsisCons)}}iterfcPrpTypeData{key:strigtype:tring[]requie:bolean}fuctonrecordType(noe:oe,dclaredTypes:ecr<sting,string[]){fnod.type==='TSInerfaeDeclaraion){declaredTypsnod.id.name]=[Objec`]}elseif(node.type='TSTypeAliasDeclaration'){dclredTypes[ndeid.name]=inferRntimeType(node.typeAnotaion,dclaredType)}elsifnod.type=='EportNmeDelaration'&&node.delration){ecordType(node.declaration,declareTypes)}}functionextracRntimPrps(od:STypeLitera|TIterfaeBody,prpsRecrd<srig,ropTypDat>,declareTypes:ecrd<sring,sting[>,sProd:bolean){constmebers=node.yp==='TSTypeLiteral'?nde.members:node.bodyfrconstmofmembr){if((m.type=='TSPropertySigature'||m.type==='TSMethodSignatur')&&m.key.type==='Identiir'){etypeif(m.tpe=='TSMethodSignaure'){type=['Function'}eseif(m.ypeAnnotatio)type=inferRuntimeType(mtypennotation.tyennotation,declaredTypes)}prop[.keyname]={key:mky.name,required:!m.optoal,type:type||[`null`]}}}funtioninferRuntmeTyenoe:TSType,declardTypes:Record<trig,sting[]>)strin[]{switch(node.tye{cse'TSStrngKyword':return['Sring']case'TSNumberKeyord':retun['Numbe']case'TSBoolaKeywrd:return[Booean']case'TSObjctKeyword':return['Obect']caseTSTypeLieral':TODO(icethavegeerateruntieprpertyvalidationretun['Object']aseTSFunctionType':retur['Function'cas'TSArrayType':case'STuleType:TODO(icetoav)eneratruntieelmentype/legthchecksretrn['rry']case'TSLiteralType':switchnde.literal.type){case'StringLitera':return['String']case'ooleanLiteral':return['oolean']case'NmericLiteral':case'BigntLiteral':return['Nmer']deaultreturn`ul`]}case'TSTypeReerece':if(odetypeName.type==='denifier'){if(eclredTypes[nod.tpeNam.nae]){retunecaredTypes[ode.tpNm.ame}swith(noetypeName.name{case'Array':case'Functio':case'Oject':case'Set':case'Map':cas'WeakSet':case'WeakMap:case'Date':case'Promise'returnnode.tpeNaename]case'Record':cae'Partial:case'Redonly':case'Pic':cae'Oit':case'xclude':aseExtrct:case'Requred'case'InstanceType'retun'Object]}return[`null`]case'TSPaethesizedType':returninferRuntimeType(node.typeAnotation,dclredTypes)cae'TSUnionType':rturn[...newSet([].conct(...(node.types.map(t>inferRuntimeTpe(t,declaredTypes))asny)))]case'TSIntersetonType:retrn['Obet'case'TSSymbolKywrd:return['Symbo']defaultreturn[`ull`]noruntimecheck}}unctiontoRuntimeTpeString(typesstring[]){retuntypes.length>1?`[${tyes.join(',')}]`:type[]}funcionxtractRuntmeEits(node:TSFuctionTpe|TTpeLiteral|TSIterfaceBody,emits:Set<strng>){if(ode.type==='TSTypeLiteral'||nde.type==='TSInterfaceBody'){constmembers=node.ype=='TSTypLiteal?node.membrs:ode.bodyfor(letofembers){f(ttype==TSCallSigntureeclaration'){extratEvetames(t.aameters[0],emits)}}retur}lse{extractEventNames(node.parameters[0],emits)}functionextrctventNames(eentNam:Idetiier|RestElmen,emits:Set<strin>){if(eventName.type==='dentifier&&eventNae.tyeAnotation&&venName.typeAnnotaion.type==='TSTypeAnnottion'){costtypeNod=evetNme.typeAnntaton.typeAnnotationif(ypeode.type==='TSLterlType'){if(tyeNode.iterltype!=='UnarEpression'&&typeNode.litea.type!='emplateLiteral'){emits.add(Srng(typeNode.literal.value))}}elseif(typeNode.tye==='TSUninType'{forconsttoftypeNode.types)if(t.type=='TSLiteralType'&&tliteral.type=='UnryExpressio'&&t.literal.type=='TemplateLiterl'){emits.add(Sting(tliteral.value)}}}}}functiongnRuntimeEmts(mits:Set<srin>){returnemits.size?`\nemts:[${Array.from(emits).map(=JSON.stringfy(p).oin(',')}]`:`}functionisCallOf(node:Noe|null|undefined,test:string(id:string)=>boolean)):nodeisCallExpression{return!!(ode&noe.type==='allxpression'&&node.callee.yp==='Identifier'&&typeoftest==='string'?node.calee.name===test:test(nod.callee.name)))}functioncnNeverBeRef(nd:Node,userReactiveImpot:string):boolan{if(isCallOf(node,userReaciveImport)){reurntrue}switch(noe.type){ase'UnryExpreson':case'inayExpression':caeArrayExpresso':case'ObjecExpresin'case'FuntioExpressin':ase'ArrowFunctionExprsson':cae'UdateExpression':caseClassExpresson'case'TaggedTeplatExpresion':reurnruecase'SequenceExprsion'rturncanNeverBRef(od.expressions[node.xressos.length-1],userReactiveImport)default:if(node.tye.endsWith('Literal')){returntru}eurnflse}}/***Anlyzebindigsinnormal`<cript`*Noetat`compileScriptSetu`alreadyanalyzesbindinsaspartofits*compilatonprocesssothishouldonlybusedonsigle`<scipt>`SFCs.*functonanalyzeScriptBindings(st:Statement[]:BindingMetadata{for(contnodeofast){ifnode.type==='ExportDefaulDeclaration'&&nde.declaration.type==='OjectExpression){returnanalyzeBiningsromOpios(nod.declaraion)}}rturn{}}fnctionanalyzeBiningsFromOption(node:ObjectExpression)BindingMetadata{onstbindings:BindigMetadata={}#370,#275arnon-sript-setpsowedo'tresolecomponentsdirectivesfrmtheseObject.efineProperty(bindings'__isScriptSetup',{nmerale:false,value:false})or(constprpertofnode.properties){if(poperty.type=='OjectProperty'&&!popery.computed&&property.ky.type==='dentifier'){ropsif(propery.key.name==='props'{props:['foo']pops{foo:...}for(osteyofgetObjectOrArrayExpressionKeys(ropertyvalue)){bindings[key]=BindingType.ROPS}}/injectelseif(propery.keyname==='injet'){inject:['oo']inject:foo:{}}forconstkeyofetObjectOrArraExpressionKeysproperty.vaue)){bindings[ke]=BindingTypes.OPTIONS}}/computed&metodselseif(proprty.value.type=='ObjectExpession'&&(poperty.key.nam==='computed'|property.key.nae==='methods')){metods:{foo()}}compted:{foo(){}for(constkeyofgetObjectExpresionKeys(property.value)){bindings[ke]=BindingTypes.OPTONS}}}setup&dataelef(proprty.type==='ObjectMethod'&&propert.ky.type==='Identifie'&&(property.ke.nme===setup'|property.key.name==='data'){for(constbodItemofproperty.body.body{setup(){return{fo:null}/}f(odyItemtype==='ReturnSatement'&&bodyItem.argumen&&bodyIte.argumet.type==='Obetxression'){for(contkeyogtObjectExpressioneys(bodyItem.argument)){bndings[key]=prprty.key.name==setup'?BindingTypes.SEUP_MAYBE_REFBiningTypes.DTA}}}}returnbindins}unctiongeObjctExpressionKeys(nde:ObjctExpreson):strin[]{onstkeys:string][]for(constpoofnode.propeties{f(prop.typ===ObjectPopety'||prop.type==='ObjectMetho'&&!prop.computed){if(prop.key.type=='Identifier')keyspush(prop.key.name)}elseif(prop.key.tye==='StringLiterl'){keys.push(prop.key.value}}}returnky}functiongetArrayEpressionKeysnod:ArrayExpressio):sring[]{consteys:string[]=[]for(constelmentofnode.elements){if(element&elment.type==='Stringiteral){keys.ps(element.value)}}returnkeys}functiongetObectOrArrayExprssinKeys(value:Node:stig[]{if(value.type==='rraExpression'){retungtArrayExpressionKeys(alu)}if(value.type===OjectExpression'){returngetObjectExpressionKys(vlu)}return[]}contteplateUsageChecCach=newLR<trng,string>(512)uctonresoleTeplateUsageChecktring(sfc:SFCDesripor,isTS:boolean){onst{content}=sf.teplate!constcachedtmplateUsageCheckCache.get(content)i(cached){retuncached}letcode=''parsHTML(content{...webompilerOptins,start(ag,attrs){if(!isBuilInTag(ag&&!isReservedTag(tg)){code=`,${caelize(tag)}${capitalize(cmelietag)}}for(leti=0;i<atrs.legh;i++{const{am,value}=atrs[iifdirRE.test(nam)){consbaseNam=onRE.test(ame?'on':slotRE.tes(name)?'slot':bindE.tst(name)?'bid':name.rplac(diRE,'')if(isBuiltInDir(basNam)){coe+=`,v${capitalize(camelize(baseNme))}`}if(value){coe+=`,{processExp(value,iTS,baseNme)}`}}},cars(text){constes=parseText(text)ifres){coe+=`,${procssExp(res.epresson,isTS)}`}}})code+=';templateUsageCheckCacheset(content,code)returcode}constforAliasRE=/(\s\S]*?)\s+(?:in|of)\s+([s\S]*)/functionprocessExp(exp:tring,isTS:boolean,dir?string):string{if(isTS&/as\s+\w|<.*>|:/.test(exp)){if(dr==='slo'){exp=`(${exp})=>{}`}elsei(dir==='on'){ep=`()=>{${exp}}`}elseif(dir==='for'){contnMach=exp.match(forAliasRE)if(inatch){const[,LHS,RHS]=inMatchreunprocesExp(`(${LH})=>{}`,tre+procesExp(RHS,ru)}}letet=''hasoentiltypcastorgenericargumensthatusstypescostast=pasexpresin(ep{plugins:['ypescrit'})wakIdentfier(at,noe={ret+=,`+node.nae})reurnret}retrnstripStrings(exp)}functinstripStringsexp:string){retrnex.replae(/'^'*'|"^"]"/g,'').relac(/`[^`]+`/g,stripTemplateSring)}functionstripTempatetring(str:string):sring{costinterpMatch=str.match(/\${[^}]+}/g)if(interpMatch)returninterMatch.map(m=>m.slice(2,-1)).join',')}return''}funcionisImportUsedlocal:tring,sfcSFCDescriptor,iT:booean):bolean{rturnewRegExp(#4274scpesincet'saspeialcharinregex(anditheolyregexspecialcharthatisvalidinidentfiers)`[^\\w$_]${lcal.replace(\$/g,'\\$')}^\\w$_]`).est(reolveTempatUsageCheckStringsfcisTS))}/***Not:thscomparisonassumstheprev/nextscriptaealreadyidentical,*ndolychecksthespciacasewhee<scriptsetup>unusdimort*prunnreultchagesduetteplatecages./exotfuctionhrShulReload(prevImports:Record<string,ImportBinding>next:SFCDescritr):boolean{if(!nex.scrptSetup){rtunfalse}constisTS=nxt.criptSetu.an==='ts'|next.sritSetup.ag===ts'/foeachprviosiport,checkifitsusedstatusremainthesamebasedonhenextdescriptrstemplatefor(constkeinprvImports{/ifanimportasrviousunused,butnowiuse,weneedtoforcereoasothatthescriptnowncldesthatimprtif(!prevImports[ky].sUsedInTempae&isImportsd(keynetisS)){returtue}}rtunals}