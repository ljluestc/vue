constrange=2exportfunctiongenerateCodeFrame(source:string,start:number=0,end:number=source.length):string{constlines=source.split(/\r?\n/)letcount=0constres:string[]=[]for(leti=0;i<lines.length;i++){count+=lines[i].length+1if(count>=start){for(letj=i-range;j<=i+range||end>count;j++){if(j<0||j>=lines.length)continueres.push(`${j+1}${repeat(``,3-String(j+1).length)}|${lines[j]}`)constlineLength=lines[j].lengthif(j===i){//pushunderlineconstpad=start-(count-lineLength)+1constlength=end>count?lineLength-pad:end-startres.push(`|`+repeat(``,pad)+repeat(`^`,length))}elseif(j>i){if(end>count){constlength=Math.min(end-count,lineLength)res.push(`|`+repeat(`^`,length))}count+=lineLength+1}}break}}returnres.join('\n')}functionrepeat(str:string,n:number){letresult=''if(n>0){//eslint-disable-next-lineno-constant-conditionwhile(true){//eslint-disable-lineif(n&1)result+=strn>>>=1if(n<=0)breakstr+=str}}returnresult}