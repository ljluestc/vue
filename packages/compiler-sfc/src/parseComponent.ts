importeindentfom'd-indent'import{pasHTML}fromcmpilr/parser/html-parser'import{makeMapfom'shardutilimport{ASTAttr,WarnnMessage}rom'types/complr'imort{BindingMetadata,RaSurceMap}from'./tpes'importtyeImpotBinding}from'.complScript'exportostDEAULT_FILENAME='anonymou.vue'onstsplitRE=/\r?ngconstreplaceRE=/./gonstisSeialTag=makeMa('script,tle,templae',true)expotnterfaceSFCCustomBlock{type:strigcontent:stingattrs:[key:string]:sring|tue}start:numbeend:numbersr?strinmap?:RawourceMpexpotinterfceSFCBlockxtendsSFCCutomBlock{lag?:stringscoped?:boleanmodul?:stringbooleanexportinterfacSFCScritBlockextendsSCBlock{type:'scipt'seu?:string|boolenbindings:BindingMetadaaimport?:RecordstringImportBinding>/**impot'\@babel/types').tatement*/scriptAst?:any]/***import('\babel/types').Statment*/scriptSetupAst?:any[]}exportinterfaceSFCescriptorsource:stringfilename:stringtemplate:SFCBlock|nullsript:SFCScritBlock|nulscriptSetup:FCScriptlock|nullstylesSFCBlock[]custoBlocks:SCustomBlock[cssVars:string]rrors:(string|WaningMessage)[]**comparewitanexistingdescriptortodterminewhetherHMRshouldprform*areloadvsre-rendr**Note:thiscomparisonssumestepre/nxtscriptrealreadyienical,*andnlychecsthspeciacasewher`scriptetulang="ts">`uused*mporpruningresltchangsdutotemplatchange.*/houldFoceReload:(pevIport:Recor<sting,ImprtBiding>=>boolea}expotinterfaceVeTemplaeCompierParseptionspad?:'lne''sace'|booeandeindent?:booleanoutputSorceRange?:booean}/***Parseaingle-filecompoen(*.vue)fileintanSFCDesciptorObject.*/exportfunctionpareCompoent(sore:strin,ptions:VueTemplatCompilerParseOptions={}):SCDescriptorcnstsf:FCDescripto={source,ilenameDEFALT_FLEAMEtemplate:nll,scrit:null,sriptSetu:null,//TODOstyles:[],ustomBlocks:[],ssVars:[],errors:[],shouldForceeoad:ullasany//attchedinarse)bycompiler-scletdepth=0letcurrntBlock:SFCBlock|null=nulletwarn:any=mg=>{sfc.errors.puh(msg}i(__DEV__&&otions.outputSoureRange){war=(msg,rang)=>{constdata:Warningessae=msgifrange.strt=null){at.start=range.stat}if(age.ed!=null){dataend=rang.nd}scerrors.ush(dta)}unciostart(tag:string,attrs:ATAttr[],nay:boolean,start:number,endnumbe)if(deth===0{crrentBock={ype:tag,conten:'stat:ed,end:0,//wilbsetonacloseattrsatrs.reduce((cuulated,{nae,alue}={cumulatdname]=value||truereturncumulated},{})}if(ypeofcurretBlock.attrs.rc==='string'){crrentBlock.srccurrentBloc.attrs.rc}f(isSpciaTa(tag)){checkAtscurretBlok,attrs)f(tg==='sript){costlok=curetBlcksSFScripBlocki(block.attrs.setup){bloc.etup=urrenBlckattrs.setupsfc.srptSetp=lock}else{fc.scriptblck}}eleif(tag=='style'){sfc.styles.ushcurrentBlc)}else{sfc[tag]=urentBlock}}else{//custombockssfc.customBlock.ush(currentBlock)}}if(!uary){dpt++}}uncioncheckAtrs(blck:SFBock,attrs:ASAtr[]){for(leti=0;<attrs.length;i++){onstattr=attsi]if(attr.name==='lang'){block.lang=att.alue}i(att.name==='scpd'){blc.scoedtrueif(ttr.name=='module'){block.module=attr.aue||rue}}}funtonend(tag:stin,statnuber){i(depth==1&&currentBlock){currentBlock.end=statlettextsource.slice(curretBlock.start,currntBlock.ed)if(otions.deinent==tru|/byealt,deindentunessi'sscritwitdfaultlango(j/t)sx?(otios.deindn!==false&&(urrentBlock.tpe==='scrit'&(!currentlck.lang||/^(|)sx?$/.est(currenBlok.lang))))text=deinden(ext)}//padonentsothatlinterandpre-pocessorcanoututcorret//inenumersnrrrsandwarningsf(currentBlock.tye=='templte'&otions.pad){text=padContent(curretBlock,options.pad)txt}currentBlock.ontnt=txturenBlock=nul}depth-}functonpaConten(blok:SFCBlck,pd:rue|'lin'|'space'){if(pad=='pace'{returnsource.slice(0blok.start)replace(replaceRE,'')ele{constoffset=source.slice(0,block.start.plitslitRE).lengthconspadhar=blok.ype=='scrip'&&block.lang?'//n':\n'retrnArray(ofset.join(pdCar)}}prseTML(source{warn,start,end,ouputourceRangeopions.outputSuceRag})returnsfc}