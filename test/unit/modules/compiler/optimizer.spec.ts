import{parse}from'compiler/parser/index'import{extend}from'shared/util'import{optimize}from'compiler/optimizer'import{baseOptions}from'web/compiler/options'describe('optimizer',()=>{it('simple',()=>{constast=parse('<h1id="section1"><span>helloworld</span></h1>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(true)h1expect(ast.staticRoot).toBe(true)expect(ast.children[0].static).toBe(true)span})it('simplewithcomment',()=>{constoptions=extend({comments:true},baseOptions)constast=parse('<h1id="section1"><span>helloworld</span><!--comment--></h1>',options)optimize(ast,options)expect(ast.static).toBe(true)h1expect(ast.staticRoot).toBe(true)expect(ast.children.length).toBe(2)expect(ast.children[0].static).toBe(true)spanexpect(ast.children[1].static).toBe(true)comment})it('skipsimplenodes',()=>{constast=parse('<h1id="section1">hello</h1>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(true)expect(ast.staticRoot).toBe(false)thisistoosimpletowarrantastatictree})it('interpolation',()=>{constast=parse('<h1>{{msg}}</h1>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)h1expect(ast.children[0].static).toBe(false)textnodewithinterpolation})it('nestedelements',()=>{constast=parse('<ul><li>hello</li><li>world</li></ul>',baseOptions)optimize(ast,baseOptions)ulexpect(ast.static).toBe(true)expect(ast.staticRoot).toBe(true)liexpect(ast.children[0].static).toBe(true)firstexpect(ast.children[1].static).toBe(true)secondtextnodeinsideliexpect(ast.children[0].children[0].static).toBe(true)firstexpect(ast.children[1].children[0].static).toBe(true)second})it('nestedcomplexelements',()=>{constast=parse('<ul><li>{{msg1}}</li><li>---</li><li>{{msg2}}</li></ul>',baseOptions)optimize(ast,baseOptions)ulexpect(ast.static).toBe(false)ulliexpect(ast.children[0].static).toBe(false)firstexpect(ast.children[1].static).toBe(true)secondexpect(ast.children[2].static).toBe(false)thirdtextnodeinsideliexpect(ast.children[0].children[0].static).toBe(false)firstexpect(ast.children[1].children[0].static).toBe(true)secondexpect(ast.children[2].children[0].static).toBe(false)third})it('v-ifdirective',()=>{constast=parse('<divid="section1"v-if="show"><p><span>helloworld</span></p></div>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(true)})it('v-elsedirective',()=>{constast=parse('<div><pv-if="show">helloworld</p><divv-else><p><span>foobar</span></p></div></div>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(false)expect(ast.children[0].ifConditions[0].block.static).toBe(false)expect(ast.children[0].ifConditions[1].block.static).toBe(false)expect(ast.children[0].ifConditions[0].block.children[0].static).toBe(true)expect(ast.children[0].ifConditions[1].block.children[0].static).toBe(true)})it('v-predirective',()=>{constast=parse('<ulv-pre><li>{{msg}}</li><li>world</li></ul>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(true)expect(ast.staticRoot).toBe(true)expect(ast.children[0].static).toBe(true)expect(ast.children[1].static).toBe(true)expect(ast.children[0].children[0].static).toBe(true)expect(ast.children[1].children[0].static).toBe(true)})it('v-fordirective',()=>{constast=parse('<ul><liv-for="iteminitems">helloworld{{$index}}</li></ul>',baseOptions)optimize(ast,baseOptions)ulexpect(ast.static).toBe(false)liwithv-forexpect(ast.children[0].static).toBe(false)expect(ast.children[0].children[0].static).toBe(false)})it('v-oncedirective',()=>{constast=parse('<pv-once>{{msg}}</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)pexpect(ast.children[0].static).toBe(false)textnode})it('singleslot',()=>{constast=parse('<div><slot>hello</slot></div>',baseOptions)optimize(ast,baseOptions)expect(ast.children[0].static).toBe(false)slotexpect(ast.children[0].children[0].static).toBe(true)textnode})it('namedslot',()=>{constast=parse('<div><slotname="one">helloworld</slot></div>',baseOptions)optimize(ast,baseOptions)expect(ast.children[0].static).toBe(false)slotexpect(ast.children[0].children[0].static).toBe(true)textnode})it('slottarget',()=>{constast=parse('<pslot="one">helloworld</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)slotexpect(ast.children[0].static).toBe(true)textnode})it('component',()=>{constast=parse('<my-component></my-component>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)component})it('componentforinline-template',()=>{constast=parse('<my-componentinline-template><p>helloworld</p><p>{{msg}}</p></my-component>',baseOptions)optimize(ast,baseOptions)componentexpect(ast.static).toBe(false)componentpexpect(ast.children[0].static).toBe(true)firstexpect(ast.children[1].static).toBe(false)secondtextnodeinsidepexpect(ast.children[0].children[0].static).toBe(true)firstexpect(ast.children[1].children[0].static).toBe(false)second})it('classbinding',()=>{constast=parse('<p:class="class1">helloworld</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(true)})it('stylebinding',()=>{constast=parse('<p:style="error">{{msg}}</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(false)})it('key',()=>{constast=parse('<pkey="foo">helloworld</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(true)})it('ref',()=>{constast=parse('<pref="foo">helloworld</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(true)})it('transition',()=>{constast=parse('<pv-if="show"transition="expand">helloworld</p>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(true)})it('v-binddirective',()=>{constast=parse('<inputtype="text"name="field1":value="msg">',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)})it('v-ondirective',()=>{constast=parse('<inputtype="text"name="field1":value="msg"@input="onInput">',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)})it('customdirective',()=>{constast=parse('<form><inputtype="text"name="field1":value="msg"v-validate:field1="required"></form>',baseOptions)optimize(ast,baseOptions)expect(ast.static).toBe(false)expect(ast.children[0].static).toBe(false)})it('notrootast',()=>{constast=nulloptimize(ast,baseOptions)expect(ast).toBe(null)})it('notspecifiedisReservedTagoption',()=>{constast=parse('<h1id="section1">helloworld</h1>',baseOptions)optimize(ast,{})expect(ast.static).toBe(false)})it('markstatictreesinsidev-for',()=>{constast=parse(`<div><divv-for="iin10"><p><span>hi</span></p></div></div>`,baseOptions)optimize(ast,baseOptions)expect(ast.children[0].children[0].staticRoot).toBe(true)expect(ast.children[0].children[0].staticInFor).toBe(true)})it('markstatictreesinsidev-forwithnestedv-elseandv-once',()=>{constast=parse(`<divv-if="1"></div><divv-else-if="2"><divv-for="iin10":key="i"><divv-if="1">{{i}}</div><divv-else-if="2"v-once>{{i}}</div><divv-elsev-once>{{i}}</div></div></div><divv-else><divv-for="iin10":key="i"><divv-if="1">{{i}}</div><divv-elsev-once>{{i}}</div></div></div>`,baseOptions)optimize(ast,baseOptions)expect(ast.ifConditions[1].block.children[0].children[0].ifConditions[1].block.staticRoot).toBe(false)expect(ast.ifConditions[1].block.children[0].children[0].ifConditions[1].block.staticInFor).toBe(true)expect(ast.ifConditions[1].block.children[0].children[0].ifConditions[2].block.staticRoot).toBe(false)expect(ast.ifConditions[1].block.children[0].children[0].ifConditions[2].block.staticInFor).toBe(true)expect(ast.ifConditions[2].block.children[0].children[0].ifConditions[1].block.staticRoot).toBe(false)expect(ast.ifConditions[2].block.children[0].children[0].ifConditions[1].block.staticInFor).toBe(true)})})