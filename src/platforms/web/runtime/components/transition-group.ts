//Providestransitionsupportforlistitems.//supportsmovetransitionsusingtheFLIPtechnique.//Becausethevdom'schildrenupdatealgorithmis"unstable"-i.e.//itdoesn'tguaranteetherelativepositioningofremovedelements,//weforcetransition-grouptoupdateitschildrenintotwopasses://inthefirstpass,weremoveallnodesthatneedtoberemoved,//triggeringtheirleavingtransition;inthesecondpass,weinsert/move//intothefinaldesiredstate.Thiswayinthesecondpassremoved//nodeswillremainwheretheyshouldbe.import{warn,extend}from'core/util/index'import{addClass,removeClass}from'web/runtime/class-util'import{transitionProps,extractTransitionData}from'./transition'import{setActiveInstance}from'core/instance/lifecycle'import{hasTransition,getTransitionInfo,transitionEndEvent,addTransitionClass,removeTransitionClass}from'web/runtime/transition-util'importVNodefrom'core/vdom/vnode'import{VNodeWithData}from'types/vnode'import{getComponentName}from'core/vdom/create-component'constprops=extend({tag:String,moveClass:String},transitionProps)deleteprops.modeexportdefault{props,beforeMount(){constupdate=this._updatethis._update=(vnode,hydrating)=>{constrestoreActiveInstance=setActiveInstance(this)//forceremovingpassthis.__patch__(this._vnode,this.kept,false,//hydratingtrue//removeOnly(!important,avoidsunnecessarymoves))this._vnode=this.keptrestoreActiveInstance()update.call(this,vnode,hydrating)}},render(h:Function){consttag:string=this.tag||this.$vnode.data.tag||'span'constmap:Record<string,any>=Object.create(null)constprevChildren:Array<VNode>=(this.prevChildren=this.children)constrawChildren:Array<VNode>=this.$slots.default||[]constchildren:Array<VNode>=(this.children=[])consttransitionData=extractTransitionData(this)for(leti=0;i<rawChildren.length;i++){constc:VNode=rawChildren[i]if(c.tag){if(c.key!=null&&String(c.key).indexOf('__vlist')!==0){children.push(c)map[c.key]=c;(c.data||(c.data={})).transition=transitionData}elseif(__DEV__){constopts=c.componentOptionsconstname:string=opts?getComponentName(opts.Ctor.optionsasany)||opts.tag||'':c.tagwarn(`<transition-group>childrenmustbekeyed:<${name}>`)}}}if(prevChildren){constkept:Array<VNode>=[]constremoved:Array<VNode>=[]for(leti=0;i<prevChildren.length;i++){constc:VNode=prevChildren[i]c.data!.transition=transitionData//@ts-expect-error.getBoundingClientRectisnottypedinNodec.data!.pos=c.elm.getBoundingClientRect()if(map[c.key!]){kept.push(c)}else{removed.push(c)}}this.kept=h(tag,null,kept)this.removed=removed}returnh(tag,null,children)},updated(){constchildren:Array<VNodeWithData>=this.prevChildrenconstmoveClass:string=this.moveClass||(this.name||'v')+'-move'if(!children.length||!this.hasMove(children[0].elm,moveClass)){return}//wedividetheworkintothreeloopstoavoidmixingDOMreadsandwrites//ineachiteration-whichhelpspreventlayoutthrashing.children.forEach(callPendingCbs)children.forEach(recordPosition)children.forEach(applyTranslation)//forcereflowtoputeverythinginposition//assigntothistoavoidbeingremovedintree-shaking//$flow-disable-linethis._reflow=document.body.offsetHeightchildren.forEach((c:VNode)=>{if(c.data!.moved){constel:any=c.elmconsts:any=el.styleaddTransitionClass(el,moveClass)s.transform=s.WebkitTransform=s.transitionDuration=''el.addEventListener(transitionEndEvent,(el._moveCb=functioncb(e){if(e&&e.target!==el){return}if(!e||/transform$/.test(e.propertyName)){el.removeEventListener(transitionEndEvent,cb)el._moveCb=nullremoveTransitionClass(el,moveClass)}}))}})},methods:{hasMove(el:any,moveClass:string):boolean{/*istanbulignoreif*/if(!hasTransition){returnfalse}/*istanbulignoreif*/if(this._hasMove){returnthis._hasMove}//Detectwhetheranelementwiththemoveclassappliedhas//CSStransitions.Sincetheelementmaybeinsideanentering//transitionatthisverymoment,wemakeacloneofitandremove//allothertransitionclassesappliedtoensureonlythemoveclass//isapplied.constclone:HTMLElement=el.cloneNode()if(el._transitionClasses){el._transitionClasses.forEach((cls:string)=>{removeClass(clone,cls)})}addClass(clone,moveClass)clone.style.display='none'this.$el.appendChild(clone)constinfo:any=getTransitionInfo(clone)this.$el.removeChild(clone)return(this._hasMove=info.hasTransform)}}}functioncallPendingCbs(c:VNodeWithData&{elm?:{_moveCb?:Function;_enterCb?:Function}}){/*istanbulignoreif*/if(c.elm!._moveCb){c.elm!._moveCb()}/*istanbulignoreif*/if(c.elm!._enterCb){c.elm!._enterCb()}}functionrecordPosition(c:VNodeWithData){c.data!.newPos=c.elm.getBoundingClientRect()}functionapplyTranslation(c:VNodeWithData){constoldPos=c.data.posconstnewPos=c.data.newPosconstdx=oldPos.left-newPos.leftconstdy=oldPos.top-newPos.topif(dx||dy){c.data.moved=trueconsts=c.elm.styles.transform=s.WebkitTransform=`translate(${dx}px,${dy}px)`s.transitionDuration='0s'}}