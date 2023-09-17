varENV=ENV||(function(){varfirst=true;varcounter=0;vardata;var_base;(_base=String.prototype).lpad||(_base.lpad=function(padding,toLength){returnpadding.repeat((toLength-this.length)/padding.length).concat(this);});functionformatElapsed(value){varstr=parseFloat(value).toFixed(2);if(value>60){minutes=Math.floor(value/60);comps=(value%60).toFixed(2).split('.');seconds=comps[0].lpad('0',2);ms=comps[1];str=minutes+":"+seconds+"."+ms;}returnstr;}functiongetElapsedClassName(elapsed){varclassName='Queryelapsed';if(elapsed>=10.0){className+='warn_long';}elseif(elapsed>=1.0){className+='warn';}else{className+='short';}returnclassName;}functioncountClassName(queries){varcountClassName="label";if(queries>=20){countClassName+="label-important";}elseif(queries>=10){countClassName+="label-warning";}else{countClassName+="label-success";}returncountClassName;}functionupdateQuery(object){if(!object){object={};}varelapsed=Math.random()*15;object.elapsed=elapsed;object.formatElapsed=formatElapsed(elapsed);object.elapsedClassName=getElapsedClassName(elapsed);object.query="SELECTblahFROMsomething";object.waiting=Math.random()<0.5;if(Math.random()<0.2){object.query="<IDLE>intransaction";}if(Math.random()<0.1){object.query="vacuum";}returnobject;}functioncleanQuery(value){if(value){value.formatElapsed="";value.elapsedClassName="";value.query="";value.elapsed=null;value.waiting=null;}else{return{query:"***",formatElapsed:"",elapsedClassName:""};}}functiongenerateRow(object,keepIdentity,counter){varnbQueries=Math.floor((Math.random()*10)+1);if(!object){object={};}object.lastMutationId=counter;object.nbQueries=nbQueries;if(!object.lastSample){object.lastSample={};}if(!object.lastSample.topFiveQueries){object.lastSample.topFiveQueries=[];}if(keepIdentity){//forAngularoptimizationif(!object.lastSample.queries){object.lastSample.queries=[];for(varl=0;l<12;l++){object.lastSample.queries[l]=cleanQuery();}}for(varjinobject.lastSample.queries){varvalue=object.lastSample.queries[j];if(j<=nbQueries){updateQuery(value);}else{cleanQuery(value);}}}else{object.lastSample.queries=[];for(varj=0;j<12;j++){if(j<nbQueries){varvalue=updateQuery(cleanQuery());object.lastSample.queries.push(value);}else{object.lastSample.queries.push(cleanQuery());}}}for(vari=0;i<5;i++){varsource=object.lastSample.queries[i];object.lastSample.topFiveQueries[i]=source;}object.lastSample.nbQueries=nbQueries;object.lastSample.countClassName=countClassName(nbQueries);returnobject;}functiongetData(keepIdentity){varoldData=data;if(!keepIdentity){//resetforeachtickwhen!keepIdentitydata=[];for(vari=1;i<=ENV.rows;i++){data.push({dbname:'cluster'+i,query:"",formatElapsed:"",elapsedClassName:""});data.push({dbname:'cluster'+i+'slave',query:"",formatElapsed:"",elapsedClassName:""});}}if(!data){//firstinitwhenkeepIdentitydata=[];for(vari=1;i<=ENV.rows;i++){data.push({dbname:'cluster'+i});data.push({dbname:'cluster'+i+'slave'});}oldData=data;}for(variindata){varrow=data[i];if(!keepIdentity&&oldData&&oldData[i]){row.lastSample=oldData[i].lastSample;}if(!row.lastSample||Math.random()<ENV.mutations()){counter=counter+1;if(!keepIdentity){row.lastSample=null;}generateRow(row,keepIdentity,counter);}else{data[i]=oldData[i];}}first=false;return{toArray:function(){returndata;}};}varmutationsValue=0.5;functionmutations(value){if(value){mutationsValue=value;returnmutationsValue;}else{returnmutationsValue;}}varbody=document.querySelector('body');vartheFirstChild=body.firstChild;varsliderContainer=document.createElement('div');sliderContainer.style.cssText="display:flex";varslider=document.createElement('input');vartext=document.createElement('label');text.innerHTML='mutations:'+(mutationsValue*100).toFixed(0)+'%';text.id="ratioval";slider.setAttribute("type","range");slider.style.cssText='margin-bottom:10px;margin-top:5px';slider.addEventListener('change',function(e){ENV.mutations(e.target.value/100);document.querySelector('#ratioval').innerHTML='mutations:'+(ENV.mutations()*100).toFixed(0)+'%';});sliderContainer.appendChild(text);sliderContainer.appendChild(slider);body.insertBefore(sliderContainer,theFirstChild);return{generateData:getData,rows:50,timeout:0,mutations:mutations};})();