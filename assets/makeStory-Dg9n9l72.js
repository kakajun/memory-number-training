import{ae as ze,g as me,z as ge,af as Me,ag as C,ah as Ie,ai as G,d as J,E as Ke,m as we,r as U,aj as Ve,n as x,ak as ee,q as ue,o as de,al as Le,f as u,c as w,a4 as ve,u as a,I as _,am as Y,B as le,O as I,e as E,an as ne,R as Ne,l as _e,ao as se,ap as ce,J as A,K as V,aq as Oe,ar as $e,M as K,as as Ue,at as je,aa as xe,D as te,A as Re,T as oe,j as Ye,a as y,L as W,t as $,au as qe,Q as We,Y as Ge,av as fe,F as He,b as Je,ab as ae,ac as Qe,ad as Xe,_ as Ze}from"./index-CRLgQtT8.js";import{E as ke,a as be}from"./input-CE9_ZbSY.js";import{E as et}from"./button-D-uwqjGw.js";import{a as tt,g as at}from"./tool-DJRDAhHu.js";import{n as nt}from"./numImg-ChZr9KzX.js";import{C as H,I as j,U as L,a as Te,b as Se,c as Ee,d as st}from"./use-form-item-A_3nZlVS.js";const ot=o=>["",...ze].includes(o),lt=100,it=600,he={beforeMount(o,n){const d=n.value,{interval:s=lt,delay:k=it}=me(d)?{}:d;let b,c;const p=()=>me(d)?d():d.handler(),g=()=>{c&&(clearTimeout(c),c=void 0),b&&(clearInterval(b),b=void 0)};o.addEventListener("mousedown",P=>{P.button===0&&(g(),p(),document.addEventListener("mouseup",()=>g(),{once:!0}),c=setTimeout(()=>{b=setInterval(()=>{p()},s)},k))})}},rt=ge({id:{type:String,default:void 0},step:{type:Number,default:1},stepStrictly:Boolean,max:{type:Number,default:Number.POSITIVE_INFINITY},min:{type:Number,default:Number.NEGATIVE_INFINITY},modelValue:Number,readonly:Boolean,disabled:Boolean,size:Me,controls:{type:Boolean,default:!0},controlsPosition:{type:String,default:"",values:["","right"]},valueOnClear:{type:[String,Number,null],validator:o=>o===null||C(o)||["min","max"].includes(o),default:null},name:String,placeholder:String,precision:{type:Number,validator:o=>o>=0&&o===Number.parseInt(`${o}`,10)},validateEvent:{type:Boolean,default:!0},...Ie(["ariaLabel"])}),ut={[H]:(o,n)=>n!==o,blur:o=>o instanceof FocusEvent,focus:o=>o instanceof FocusEvent,[j]:o=>C(o)||G(o),[L]:o=>C(o)||G(o)},ct=J({name:"ElInputNumber"}),dt=J({...ct,props:rt,emits:ut,setup(o,{expose:n,emit:d}){const s=o,{t:k}=Ke(),b=we("input-number"),c=U(),p=Ve({currentValue:s.modelValue,userInput:null}),{formItem:g}=Te(),P=x(()=>C(s.modelValue)&&s.modelValue<=s.min),D=x(()=>C(s.modelValue)&&s.modelValue>=s.max),q=x(()=>{const e=i(s.step);return ee(s.precision)?Math.max(i(s.modelValue),e):(e>s.precision,s.precision)}),M=x(()=>s.controls&&s.controlsPosition==="right"),R=Se(),F=Ee(),O=x(()=>{if(p.userInput!==null)return p.userInput;let e=p.currentValue;if(G(e))return"";if(C(e)){if(Number.isNaN(e))return"";ee(s.precision)||(e=e.toFixed(s.precision))}return e}),v=(e,l)=>{if(ee(l)&&(l=q.value),l===0)return Math.round(e);let m=String(e);const h=m.indexOf(".");if(h===-1||!m.replace(".","").split("")[h+l])return e;const X=m.length;return m.charAt(X-1)==="5"&&(m=`${m.slice(0,Math.max(0,X-1))}6`),Number.parseFloat(Number(m).toFixed(l))},i=e=>{if(G(e))return 0;const l=e.toString(),m=l.indexOf(".");let h=0;return m!==-1&&(h=l.length-m-1),h},N=(e,l=1)=>C(e)?v(e+s.step*l):p.currentValue,B=()=>{if(s.readonly||F.value||D.value)return;const e=Number(O.value)||0,l=N(e);r(l),d(j,p.currentValue),re()},T=()=>{if(s.readonly||F.value||P.value)return;const e=Number(O.value)||0,l=N(e,-1);r(l),d(j,p.currentValue),re()},t=(e,l)=>{const{max:m,min:h,step:f,precision:z,stepStrictly:X,valueOnClear:Z}=s;m<h&&_e("InputNumber","min should not be greater than max.");let S=Number(e);if(G(e)||Number.isNaN(S))return null;if(e===""){if(Z===null)return null;S=se(Z)?{min:h,max:m}[Z]:Z}return X&&(S=v(Math.round(S/f)*f,z)),ee(z)||(S=v(S,z)),(S>m||S<h)&&(S=S>m?m:h,l&&d(L,S)),S},r=(e,l=!0)=>{var m;const h=p.currentValue,f=t(e);if(!l){d(L,f);return}h===f&&e||(p.userInput=null,d(L,f),h!==f&&d(H,f,h),s.validateEvent&&((m=g==null?void 0:g.validate)==null||m.call(g,"change").catch(z=>ce())),p.currentValue=f)},ie=e=>{p.userInput=e;const l=e===""?null:Number(e);d(j,l),r(l,!1)},Q=e=>{const l=e!==""?Number(e):"";(C(l)&&!Number.isNaN(l)||e==="")&&r(l),re(),p.userInput=null},Ae=()=>{var e,l;(l=(e=c.value)==null?void 0:e.focus)==null||l.call(e)},Pe=()=>{var e,l;(l=(e=c.value)==null?void 0:e.blur)==null||l.call(e)},Be=e=>{d("focus",e)},De=e=>{var l;p.userInput=null,d("blur",e),s.validateEvent&&((l=g==null?void 0:g.validate)==null||l.call(g,"blur").catch(m=>ce()))},re=()=>{p.currentValue!==s.modelValue&&(p.currentValue=s.modelValue)},Fe=e=>{document.activeElement===e.target&&e.preventDefault()};return ue(()=>s.modelValue,(e,l)=>{const m=t(e,!0);p.userInput===null&&m!==l&&(p.currentValue=m)},{immediate:!0}),de(()=>{var e;const{min:l,max:m,modelValue:h}=s,f=(e=c.value)==null?void 0:e.input;if(f.setAttribute("role","spinbutton"),Number.isFinite(m)?f.setAttribute("aria-valuemax",String(m)):f.removeAttribute("aria-valuemax"),Number.isFinite(l)?f.setAttribute("aria-valuemin",String(l)):f.removeAttribute("aria-valuemin"),f.setAttribute("aria-valuenow",p.currentValue||p.currentValue===0?String(p.currentValue):""),f.setAttribute("aria-disabled",String(F.value)),!C(h)&&h!=null){let z=Number(h);Number.isNaN(z)&&(z=null),d(L,z)}f.addEventListener("wheel",Fe,{passive:!1})}),Le(()=>{var e,l;const m=(e=c.value)==null?void 0:e.input;m==null||m.setAttribute("aria-valuenow",`${(l=p.currentValue)!=null?l:""}`)}),n({focus:Ae,blur:Pe}),(e,l)=>(u(),w("div",{class:_([a(b).b(),a(b).m(a(R)),a(b).is("disabled",a(F)),a(b).is("without-controls",!e.controls),a(b).is("controls-right",a(M))]),onDragstart:ne(()=>{},["prevent"])},[e.controls?ve((u(),w("span",{key:0,role:"button","aria-label":a(k)("el.inputNumber.decrease"),class:_([a(b).e("decrease"),a(b).is("disabled",a(P))]),onKeydown:Y(T,["enter"])},[le(e.$slots,"decrease-icon",{},()=>[E(a(K),null,{default:A(()=>[a(M)?(u(),V(a(Oe),{key:0})):(u(),V(a($e),{key:1}))]),_:1})])],42,["aria-label","onKeydown"])),[[a(he),T]]):I("v-if",!0),e.controls?ve((u(),w("span",{key:1,role:"button","aria-label":a(k)("el.inputNumber.increase"),class:_([a(b).e("increase"),a(b).is("disabled",a(D))]),onKeydown:Y(B,["enter"])},[le(e.$slots,"increase-icon",{},()=>[E(a(K),null,{default:A(()=>[a(M)?(u(),V(a(Ue),{key:0})):(u(),V(a(je),{key:1}))]),_:1})])],42,["aria-label","onKeydown"])),[[a(he),B]]):I("v-if",!0),E(a(ke),{id:e.id,ref_key:"input",ref:c,type:"number",step:e.step,"model-value":a(O),placeholder:e.placeholder,readonly:e.readonly,disabled:a(F),size:a(R),max:e.max,min:e.min,name:e.name,"aria-label":e.ariaLabel,"validate-event":!1,onKeydown:[Y(ne(B,["prevent"]),["up"]),Y(ne(T,["prevent"]),["down"])],onBlur:De,onFocus:Be,onInput:ie,onChange:Q},null,8,["id","step","model-value","placeholder","readonly","disabled","size","max","min","name","aria-label","onKeydown"])],42,["onDragstart"]))}});var pt=Ne(dt,[["__file","input-number.vue"]]);const mt=xe(pt),vt=ge({modelValue:{type:[Boolean,String,Number],default:!1},disabled:Boolean,loading:Boolean,size:{type:String,validator:ot},width:{type:[String,Number],default:""},inlinePrompt:Boolean,inactiveActionIcon:{type:te},activeActionIcon:{type:te},activeIcon:{type:te},inactiveIcon:{type:te},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},beforeChange:{type:Re(Function)},id:String,tabindex:{type:[String,Number]},...Ie(["ariaLabel"])}),ft={[L]:o=>oe(o)||se(o)||C(o),[H]:o=>oe(o)||se(o)||C(o),[j]:o=>oe(o)||se(o)||C(o)},Ce="ElSwitch",bt=J({name:Ce}),ht=J({...bt,props:vt,emits:ft,setup(o,{expose:n,emit:d}){const s=o,{formItem:k}=Te(),b=Se(),c=we("switch"),{inputId:p}=st(s,{formItemContext:k}),g=Ee(x(()=>s.loading)),P=U(s.modelValue!==!1),D=U(),q=U(),M=x(()=>[c.b(),c.m(b.value),c.is("disabled",g.value),c.is("checked",i.value)]),R=x(()=>[c.e("label"),c.em("label","left"),c.is("active",!i.value)]),F=x(()=>[c.e("label"),c.em("label","right"),c.is("active",i.value)]),O=x(()=>({width:Ye(s.width)}));ue(()=>s.modelValue,()=>{P.value=!0});const v=x(()=>P.value?s.modelValue:!1),i=x(()=>v.value===s.activeValue);[s.activeValue,s.inactiveValue].includes(v.value)||(d(L,s.inactiveValue),d(H,s.inactiveValue),d(j,s.inactiveValue)),ue(i,t=>{var r;D.value.checked=t,s.validateEvent&&((r=k==null?void 0:k.validate)==null||r.call(k,"change").catch(ie=>ce()))});const N=()=>{const t=i.value?s.inactiveValue:s.activeValue;d(L,t),d(H,t),d(j,t),Ge(()=>{D.value.checked=i.value})},B=()=>{if(g.value)return;const{beforeChange:t}=s;if(!t){N();return}const r=t();[fe(r),oe(r)].includes(!0)||_e(Ce,"beforeChange must return type `Promise<boolean>` or `boolean`"),fe(r)?r.then(Q=>{Q&&N()}).catch(Q=>{}):r&&N()},T=()=>{var t,r;(r=(t=D.value)==null?void 0:t.focus)==null||r.call(t)};return de(()=>{D.value.checked=i.value}),n({focus:T,checked:i}),(t,r)=>(u(),w("div",{class:_(a(M)),onClick:ne(B,["prevent"])},[y("input",{id:a(p),ref_key:"input",ref:D,class:_(a(c).e("input")),type:"checkbox",role:"switch","aria-checked":a(i),"aria-disabled":a(g),"aria-label":t.ariaLabel,name:t.name,"true-value":t.activeValue,"false-value":t.inactiveValue,disabled:a(g),tabindex:t.tabindex,onChange:N,onKeydown:Y(B,["enter"])},null,42,["id","aria-checked","aria-disabled","aria-label","name","true-value","false-value","disabled","tabindex","onKeydown"]),!t.inlinePrompt&&(t.inactiveIcon||t.inactiveText)?(u(),w("span",{key:0,class:_(a(R))},[t.inactiveIcon?(u(),V(a(K),{key:0},{default:A(()=>[(u(),V(W(t.inactiveIcon)))]),_:1})):I("v-if",!0),!t.inactiveIcon&&t.inactiveText?(u(),w("span",{key:1,"aria-hidden":a(i)},$(t.inactiveText),9,["aria-hidden"])):I("v-if",!0)],2)):I("v-if",!0),y("span",{ref_key:"core",ref:q,class:_(a(c).e("core")),style:We(a(O))},[t.inlinePrompt?(u(),w("div",{key:0,class:_(a(c).e("inner"))},[t.activeIcon||t.inactiveIcon?(u(),V(a(K),{key:0,class:_(a(c).is("icon"))},{default:A(()=>[(u(),V(W(a(i)?t.activeIcon:t.inactiveIcon)))]),_:1},8,["class"])):t.activeText||t.inactiveText?(u(),w("span",{key:1,class:_(a(c).is("text")),"aria-hidden":!a(i)},$(a(i)?t.activeText:t.inactiveText),11,["aria-hidden"])):I("v-if",!0)],2)):I("v-if",!0),y("div",{class:_(a(c).e("action"))},[t.loading?(u(),V(a(K),{key:0,class:_(a(c).is("loading"))},{default:A(()=>[E(a(qe))]),_:1},8,["class"])):a(i)?le(t.$slots,"active-action",{key:1},()=>[t.activeActionIcon?(u(),V(a(K),{key:0},{default:A(()=>[(u(),V(W(t.activeActionIcon)))]),_:1})):I("v-if",!0)]):a(i)?I("v-if",!0):le(t.$slots,"inactive-action",{key:2},()=>[t.inactiveActionIcon?(u(),V(a(K),{key:0},{default:A(()=>[(u(),V(W(t.inactiveActionIcon)))]),_:1})):I("v-if",!0)])],2)],6),!t.inlinePrompt&&(t.activeIcon||t.activeText)?(u(),w("span",{key:1,class:_(a(F))},[t.activeIcon?(u(),V(a(K),{key:0},{default:A(()=>[(u(),V(W(t.activeIcon)))]),_:1})):I("v-if",!0),!t.activeIcon&&t.activeText?(u(),w("span",{key:1,"aria-hidden":!a(i)},$(t.activeText),9,["aria-hidden"])):I("v-if",!0)],2)):I("v-if",!0)],10,["onClick"]))}});var yt=Ne(ht,[["__file","switch.vue"]]);const gt=xe(yt);async function It(o="",n={}){try{return(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sk-209f142d213640c9aee1a8a6a9ce145e"},body:JSON.stringify(n)})).json()}catch(d){console.error("Error fetching data:",d)}}async function wt(o){try{return await It("/app/api/v1/services/aigc/text-generation/generation",o)}catch(n){console.error("Error fetching data:",n)}}const pe=o=>(Qe("data-v-bcc28cb5"),o=o(),Xe(),o),Vt={class:"flex items-center flex-col p-20px"},Nt={class:"flex items-center mb-10px"},_t=pe(()=>y("div",{class:"mr-10px"},"消失时间:",-1)),xt={class:"mb-10px"},kt={class:"w-4/5 max-w-2xl mt-10px pb-10px"},Tt={class:"flex justify-between"},St={class:"pb-10px"},Et=pe(()=>y("span",{class:"text-left text-3xl pb-10px"},"检验: ",-1)),Ct={class:"text-left text-3xl pb-10px"},At={class:"flex"},Pt={class:"text-xl my-5px"},Bt={class:"pl10px text-xl my-5px"},Dt={class:"flex justify-center flex-wrap gap-15px"},Ft={key:0,class:"grid grid-cols-4 gap-10px w-full max-w-2xl"},zt={key:0,class:"text-4xl font-bold mb-10px"},Mt=["src","alt"],Kt={key:0,class:"w-4/5 max-w-2xl mt-20px"},Lt=pe(()=>y("div",{class:"text-left text-3xl pb-10px"},"记忆攻略:",-1)),ye=10,Ot=4,$t=J({__name:"makeStory",setup(o){const n=Ve({count:0,storyType:!0,show:!1,numShow:!0,displayedImages:[],storyText:"思考中.......",currentNumber:"00",checkText:"",cacheTemp:[],correctCount:0,wrongCount:0,timerID:null}),d=U(4),s=U(ye),k=U(null),b=()=>{n.numShow=!0,n.timerID=setTimeout(()=>{n.show=!1,n.numShow=!1},s.value*1e3)},c=()=>{n.show=!n.show},p=async()=>{const v=tt(n.currentNumber);n.currentNumber=v,Number(v)>99&&(n.currentNumber="00"),n.count++,P()},g=()=>{n.displayedImages=[...n.cacheTemp]},P=async()=>{n.cacheTemp=await at(n.currentNumber,d.value),g(),n.checkText="",n.show?clearTimeout(n.timerID):b(),R(),D()},D=async()=>{var B;n.storyText="思考中.......";const v=n.displayedImages.map(T=>{var t;return(t=nt.find(r=>r.id===T.name))==null?void 0:t.name}),i={model:"qwen-turbo",input:{messages:[{role:"system",content:"You are a helpful assistant."},{role:"user",content:(n.storyType?'你是记忆大师, 教我用连锁法,简短的按顺序串联记忆: "':'你是记忆大师, 教我用故事法,简短的按顺序串联记忆: "')+v.join('","')+'"'}]},group:1,parameters:{}},N=await wt(i);N&&(n.storyText=(B=N.output)==null?void 0:B.text)},q=()=>{d.value+=Ot,s.value+=ye,P()},M=()=>{const v=n.checkText.replace(/\s/g,""),i=n.displayedImages.map(N=>N.name).join("");v===i?(be.success("正确!"),n.correctCount++):(be.error("错误!"),n.wrongCount++),n.checkText="",p()},R=()=>{setTimeout(()=>{var v;(v=k.value)==null||v.focus(),console.log("获取焦点!!")},100)},F=x({get(){return O(n.checkText)},set(v){n.checkText=v.replace(/\s/g,"")}}),O=v=>!v||!/\d/.test(v)?v:v.replace(/\d{2}(?=\d)/g,"$& ");return de(()=>{P()}),(v,i)=>{const N=mt,B=gt,T=et,t=ke;return u(),w("div",Vt,[y("div",Nt,[_t,E(N,{class:"mr-6",modelValue:s.value,"onUpdate:modelValue":i[0]||(i[0]=r=>s.value=r),min:1},null,8,["modelValue"]),E(B,{modelValue:n.storyType,"onUpdate:modelValue":i[1]||(i[1]=r=>n.storyType=r),class:"m-2","active-text":"连锁法","inactive-text":"故事法"},null,8,["modelValue"])]),y("div",xt,[E(T,{onClick:c},{default:A(()=>[ae("显示图片")]),_:1}),E(T,{onClick:p},{default:A(()=>[ae("换一组")]),_:1}),E(T,{onClick:q},{default:A(()=>[ae("加一组")]),_:1}),E(T,{onClick:M},{default:A(()=>[ae("提交")]),_:1})]),y("div",kt,[y("div",Tt,[y("div",St,[Et,y("span",Ct,$(n.count)+" 组",1)]),y("div",At,[y("p",Pt,"正确: "+$(n.correctCount),1),y("p",Bt,"错误: "+$(n.wrongCount),1)])]),E(t,{ref_key:"myInput",ref:k,class:"check-input text-2xl px-20px",modelValue:F.value,"onUpdate:modelValue":i[2]||(i[2]=r=>F.value=r),onKeyup:Y(M,["enter"])},null,8,["modelValue"])]),y("div",Dt,[n.numShow||n.show?(u(),w("div",Ft,[(u(!0),w(He,null,Je(n.displayedImages,r=>(u(),w("div",{key:r.name,class:"image-cell"},[n.show?(u(),w("div",zt,$(r.name),1)):I("",!0),y("img",{class:"w-full h-auto cursor-pointer border-2px border-solid divide-transparent transition duration-300 ease-in-out border hover:border-blue-500",src:r.url,alt:r.name,onClick:p},null,8,Mt)]))),128))])):I("",!0)]),n.show?(u(),w("div",Kt,[Lt,E(t,{modelValue:n.storyText,"onUpdate:modelValue":i[3]||(i[3]=r=>n.storyText=r),readonly:!0,type:"textarea",autosize:""},null,8,["modelValue"])])):I("",!0)])}}}),Gt=Ze($t,[["__scopeId","data-v-bcc28cb5"]]);export{Gt as default};
