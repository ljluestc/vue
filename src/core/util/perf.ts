import{inBrowser}from'./env'exportletmarkexportletmeasureif(__DEV__){constperf=inBrowser&&window.performance/*istanbulignoreif*/if(perf&&@ts-ignoreperf.mark&&@ts-ignoreperf.measure&&@ts-ignoreperf.clearMarks&&@ts-ignoreperf.clearMeasures){mark=tag=>perf.mark(tag)measure=(name,startTag,endTag)=>{perf.measure(name,startTag,endTag)perf.clearMarks(startTag)perf.clearMarks(endTag)perf.clearMeasures(name)}}}