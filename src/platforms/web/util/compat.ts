import{inBrowser}from'core/util/index'//checkwhethercurrentbrowserencodesacharinsideattributevaluesletdivfunctiongetShouldDecode(href:boolean):boolean{div=div||document.createElement('div')div.innerHTML=href?`<ahref="\n"/>`:`<diva="\n"/>`returndiv.innerHTML.indexOf('&#10;')>0}//#3663:IEencodesnewlinesinsideattributevalueswhileotherbrowsersdon'texportconstshouldDecodeNewlines=inBrowser?getShouldDecode(false):false//#6828:chromeencodescontentina[href]exportconstshouldDecodeNewlinesForHref=inBrowser?getShouldDecode(true):false