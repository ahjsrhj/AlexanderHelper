let e=document.createElement("style");e.innerHTML=".container{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;border-radius:10px;user-select:none}.container-border{box-sizing:border-box;border:2px solid #e9ff2394}.bg-alert{background-color:#e03c8a43}.hp-line{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;margin-top:10px}.hp-name{width:150px;text-align:left;color:#fff;font-size:18px;font-weight:bolder;text-shadow:.2rem 0 .5rem #58b2dc,-.2rem 0 .5rem #58b2dc,0 .2rem .5rem #58b2dc,0 -.2rem .5rem #58b2dc}.hp-percent{color:#fff;font-size:20px;font-weight:bolder;text-shadow:.2rem 0 .5rem red,-.2rem 0 .5rem red,0 .2rem .5rem red,0 -.2rem .5rem red}.hp-disparity{font-size:30px}.hp-name-light{color:red}",document.head.appendChild(e);import{d as s,r as t,a,s as i,o as r,b as n,c as o,e as l,t as c,f as d}from"./index.aa3d6b76.js";function m(e){const s=a(e()),t=i.watch(e,e=>{s.value=e});return r(()=>{t()}),s}var p=s({setup:(e,s)=>({state:t({mainBoss:m(()=>i.getters["info/mainBoss"]),subBoss:m(()=>i.getters["info/subBoss"]),disparityHP:m(()=>i.getters["info/disparityHP"]),isP1:m(()=>i.getters["info/isP1"])}),config:t({border:m(()=>i.state.config.border),scale:m(()=>i.state.config.scale)})})});const f={key:0,class:"hp-line"},u={class:"hp-percent"},h={key:1,class:"hp-line"},b={class:"hp-percent"},v={key:2,class:"hp-line"},g=l("div",{class:"hp-name"},null,-1),x={class:"hp-percent hp-disparity"};p.render=function(e,s,t,a,i,r){return n(),o("div",{class:["container",{"bg-alert":e.state.isP1&&e.state.disparityHP>=5,"container-border":e.config.border}],style:{transform:`scale(${e.config.scale})`}},[e.state.mainBoss.value>0?(n(),o("div",f,[l("div",{class:["hp-name",{"hp-name-light":e.state.subBoss.value>0&&e.state.mainBoss.value<e.state.subBoss.value}]},c(e.state.mainBoss.name),3),l("div",u,c(e.state.mainBoss.value)+"%",1)])):d("v-if",!0),e.state.subBoss.value>0?(n(),o("div",h,[l("div",{class:["hp-name",{"hp-name-light":e.state.mainBoss.value>0&&e.state.mainBoss.value>e.state.subBoss.value}]},c(e.state.subBoss.name),3),l("div",b,c(e.state.subBoss.value)+"%",1)])):d("v-if",!0),e.state.mainBoss.value>0&&e.state.subBoss.value>0?(n(),o("div",v,[g,l("div",x,c(e.state.disparityHP)+"%",1)])):d("v-if",!0)],6)},p.__file="src/views/Home.vue";export default p;