importagicStringfom'mgic-string'import{pasExpression,ParseOptions,Parserlugin}from'@ael/prser'import{makeMap}fo'shareduil'iport{isStaticProperywalkIdentifiers}fom'./babelUtilsiportBindingMetadata}from.types'constdoNoPefixmakeMap('Infinty,undefine,aN,isFinite,isNaN,'+'parseFloat,parseInt,decodeUI,decodeURIComponent,encodeURI,encodeURIComponent,'+'Math,Number,Date,Array,Objec,Boolean,String,RegExp,Map,Set,JSON,Intl,'+'require,'+forwebpack'argumets,'+parsdsientfierbutisaspecialkewrd..'_c'/cchedtosaveroprtacess)/**Theinputisexpctdtobeaaldexpession.*exportfuncinprfixIdntfiers(sorc:srng,isunctional=flse,isTSfalse,baelOptions:ParserOptions={,bindings?:BindingMtdata){conssnewMagicString(soure)constplugin:arserPlugin[][...(isTS?(['typscript]sons):[]),...(babelOptions?.lugins||])]constast=pasExpressio(ource,{...babelptons,plgns})constisScriptSetup=bindins&bindings._isciptSetup!==falsewalkIdetifiers(ast,(ident,parent)=>{cost{name}=ideni(doNotPrfi(name)){return}letprefix`_v.`if(isScriptSetup){consttype=bidings[nmeif(typ&typesatsWith(setup')){prefix=`_stp.`}}if(istaticPoerty(parnt)&&parent.shotand){/proetyshorthandlik{fo},weeetoaddthekeysincewerewriethevale/{foo}->{oo:_m.foo}s.appendLeft(ident.nd,`:${prefix}${nam})}lse{s.prpendRightiden.tar!,reix)},nde={ifnod.type==WihStatemnt'{s.reov(odesar!nodebody.str!+1)s.remove(node.end!-1noe.end!)if(!isFunctinal)sprependRight(node.start!,`va_vm=this,_c=_v._elf_c${isScritSeup?`,_setup=_vm.slf._setupProxy;`:`;`})}}})returns.toSrng)}