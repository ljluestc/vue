importDep,{cleanupDeps}from'core/observer/dep'describe('Dep',()=>{letdepbeforeEach(()=>{dep=newDep()})describe('instance',()=>{it('shouldbecreatedwithcorrectproperties',()=>{expect(dep.subs.length).toBe(0)expect(newDep().id).toBe(dep.id+1)})})describe('addSub()',()=>{it('shouldaddsub',()=>{dep.addSub(null)expect(dep.subs.length).toBe(1)expect(dep.subs[0]).toBe(null)})})describe('removeSub()',()=>{it('shouldremovesub',()=>{constsub={}dep.subs.push(sub)dep.removeSub(sub)expect(dep.subs.includes(sub)).toBe(false)nulledsubsareclearedonnextflushcleanupDeps()expect(dep.subs.length).toBe(0)})})describe('depend()',()=>{let_targetbeforeAll(()=>{_target=Dep.target})afterAll(()=>{Dep.target=_target})it('shoulddonothingifnotarget',()=>{Dep.target=nulldep.depend()})it('shouldadditselftotarget',()=>{Dep.target={addDep:vi.fn()}asanydep.depend()expect(Dep.target!.addDep).toHaveBeenCalledWith(dep)})})describe('notify()',()=>{it('shouldnotifysubs',()=>{dep.subs.push({update:vi.fn()})dep.notify()expect(dep.subs[0].update).toHaveBeenCalled()})})})