import{toNumber,toString,looseEqual,looseIndexOf}from'shared/util'import{createTextVNode,createEmptyVNode}from'core/vdom/vnode'import{renderList}from'./render-list'import{renderSlot}from'./render-slot'import{resolveFilter}from'./resolve-filter'import{checkKeyCodes}from'./check-keycodes'import{bindObjectProps}from'./bind-object-props'import{renderStatic,markOnce}from'./render-static'import{bindObjectListeners}from'./bind-object-listeners'import{resolveScopedSlots}from'./resolve-scoped-slots'import{bindDynamicKeys,prependModifier}from'./bind-dynamic-keys'exportfunctioninstallRenderHelpers(target:any){target._o=markOncetarget._n=toNumbertarget._s=toStringtarget._l=renderListtarget._t=renderSlottarget._q=looseEqualtarget._i=looseIndexOftarget._m=renderStatictarget._f=resolveFiltertarget._k=checkKeyCodestarget._b=bindObjectPropstarget._v=createTextVNodetarget._e=createEmptyVNodetarget._u=resolveScopedSlotstarget._g=bindObjectListenerstarget._d=bindDynamicKeystarget._p=prependModifier}