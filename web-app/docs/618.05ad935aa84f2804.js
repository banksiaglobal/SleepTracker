"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[618],{5480:(x,u,c)=>{c.d(u,{L:()=>f});var e=c(8505),o=c(3151),m=c(4650),g=c(570),p=c(529),_=c(9299);let f=(()=>{class n{constructor(d,i,s){this.auth=d,this.httpClient=i,this.router=s,this.api="http://sleeptracker.banksiaglobal.com:9000/"}addSleepSettings(d){return this.httpClient.post(this.api+"sleeps",d).pipe((0,e.b)(i=>{i.id&&this.onGoToAdvice(i.id)}),(0,o.d)())}changeSleepSettings(d,i){return this.httpClient.put(this.api+"sleeps/"+d,i).pipe((0,e.b)(s=>{s.id&&this.onGoToAdvice(s.id)}),(0,o.d)())}allSleeps(){return this.httpClient.get(this.api+"sleeps").pipe((0,o.d)())}getSleepById(d){return this.httpClient.get(this.api+"sleeps/"+d).pipe((0,o.d)())}getSleepAdviceById(d){return this.httpClient.get(this.api+"sleeps/prediction/"+d).pipe((0,o.d)())}onGoToAdvice(d){this.router.navigate(["/advice",d])}}return n.\u0275fac=function(d){return new(d||n)(m.LFG(g.e),m.LFG(p.eN),m.LFG(_.F0))},n.\u0275prov=m.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},3546:(x,u,c)=>{c.d(u,{$j:()=>C,QW:()=>E,a8:()=>d,dk:()=>v,dn:()=>b,hq:()=>M,n5:()=>i});var e=c(4650),o=c(6895),m=c(3238);const g=["*"],f=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],n=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"],h=new e.OlP("MAT_CARD_CONFIG");let d=(()=>{class t{constructor(a){this.appearance=a?.appearance||"raised"}}return t.\u0275fac=function(a){return new(a||t)(e.Y36(h,8))},t.\u0275cmp=e.Xpm({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:4,hostBindings:function(a,l){2&a&&e.ekj("mat-mdc-card-outlined","outlined"===l.appearance)("mdc-card--outlined","outlined"===l.appearance)},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:g,decls:1,vars:0,template:function(a,l){1&a&&(e.F$t(),e.Hsn(0))},styles:['.mdc-card{display:flex;flex-direction:column;box-sizing:border-box}.mdc-card::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card{position:relative;border-radius:var(--mdc-elevated-card-container-shape, var(--mdc-shape-medium, 4px));background-color:var(--mdc-elevated-card-container-color, transparent);border-width:0;border-style:solid;border-color:var(--mdc-elevated-card-container-color, transparent)}.mat-mdc-card .mdc-card::after{border-radius:var(--mdc-elevated-card-container-shape, var(--mdc-shape-medium, 4px))}.mat-mdc-card-outlined{border-width:var(--mdc-outlined-card-outline-width, 1px);border-style:solid;border-color:var(--mdc-outlined-card-outline-color, transparent)}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}'],encapsulation:2,changeDetection:0}),t})(),i=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=e.lG2({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=e.lG2({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]}),t})(),C=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=e.lG2({type:t,selectors:[["mat-card-subtitle"],["","mat-card-subtitle",""],["","matCardSubtitle",""]],hostAttrs:[1,"mat-mdc-card-subtitle"]}),t})(),M=(()=>{class t{constructor(){this.align="start"}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275dir=e.lG2({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(a,l){2&a&&e.ekj("mat-mdc-card-actions-align-end","end"===l.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),t})(),v=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:n,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(a,l){1&a&&(e.F$t(f),e.Hsn(0),e.TgZ(1,"div",0),e.Hsn(2,1),e.qZA(),e.Hsn(3,2))},encapsulation:2,changeDetection:0}),t})(),E=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[m.BQ,o.ez,m.BQ]}),t})()}}]);