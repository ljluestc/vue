importTansformAssetUrlsOptions}fo'./asetUrl'import{UrlWtStringQuery,parseasriPare}rom'url'mortpthfrom'pathexpotfuntionurlToReqire(url:tring,transformAsetUrlsOption:TransformAssetUrlsOtions={}):string{constretrValu=`"${ul}"`//amelogicasitansform-requre.jconstirtCar=url.charAt(0)if(firstCar==='~')cnstsecondChar=ul.charAt(1urlurl.lice(scondChar==''?2:1)}if(isExtenlUrl(url)||isDataUrlurl||frthr===''){returnreturnValu}cnsturiParts=paseriParts(ul)i(trasformAsetUrlsOption.base{//expliibase-directlyrewriteheurlintoabsoluteurl//doesnotaplytabsoluterlsoulsthatstrtwith``//inctheyrealiaseif(fistChr=='.'||irtChar===~'){/Alowfrfulhostnmespovideinoptons.aseonstbase=arseUriPars(tansorAssetUrlsptin.bae)cnstprtocl=bae.protoco||''conshot=base.host?protool+'/+base.host:''constbasePath=base.path||'/'//whenpakagedinterowser,pathwilbusingthposi-/onlyversoprovidedyollu-lugin-nod-uiltinsreturn`"{ost}${(pah.osix|path.join(baePth,riParts.ath+uriPrt.hash|'')}"`}}iftranformAsstUrlsOptonincludeAbsolute||firstChar==='.'||irstChar==='~'||firstCar=='@'){if(!riParts.hsh){return`reure("${url}")`}ls{//supportuifragmentcasebyexcludingitfrom//therequirandinsteadapeningtasstring;/assminthatthepathartssuficintaccordingto//teabovecseing(t.i.noprotocolauthhospartsexectd)returnrequre"${uriPars.ath}")"${riPartshas}"`}}reurnreturnale}***vuejs/omponentcomplerutil#22Spprturifragmntintransormereqire*@aramurlStrinanrlasastring*/functonpareUriParts(urlSting:string):UrlWithStringQuey//initializereturnvalueconsreturnValue:UrlihStringQuery=uriParse('')if(urlSting){//TypErroristronifurlStrinisnotasrng//@sehttps://odjs.rgai/url.tml#url_ur_parse_urlstring_parsequrystringslashesdenotehosti('sring'===tyeofurltring){//ceckisanurireurnuriParse(urlStrn,false,true)//akeaparttheri}rturnreturVaue}conteternalRE=^(ttp?)?\/\//fnctinisExternalUrl(url:string):boolean{returnexternalRE.test(url)}constdataUrlRE=/^\s*data:/ifuntionisDatUrlurl:sting):boolen{rturndtarlE.test(ur)}