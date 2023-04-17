"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[454],{6454:(m,g,i)=>{i.r(g),i.d(g,{AboutComponent:()=>b});var r=i(6895),e=i(4650);function p(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"div",6)(1,"div",7)(2,"div",8),e._uU(3," Boost your sleep. "),e.qZA(),e.TgZ(4,"div",9),e._uU(5," Start using 'Sheep's galaxy' today. "),e.qZA()(),e.TgZ(6,"div",10)(7,"button",11),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.clickGoToRegistrePage())}),e._uU(8," Sign up for free "),e.qZA(),e.TgZ(9,"button",11),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.clickGoToLoginPage())}),e._uU(10," Login "),e.qZA()()()}}let c=(()=>{class o{constructor(){this.goToLoginPage=new e.vpe,this.goToRegistrePage=new e.vpe}ngOnInit(){this.isUser=!!localStorage.getItem("user")}clickGoToLoginPage(){this.goToLoginPage.emit()}clickGoToRegistrePage(){this.goToRegistrePage.emit()}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-about-view"]],inputs:{isUserLogout:"isUserLogout",isUserLogin:"isUserLogin"},outputs:{goToLoginPage:"goToLoginPage",goToRegistrePage:"goToRegistrePage"},standalone:!0,features:[e.jDz],decls:57,vars:1,consts:[[1,"page-light"],[1,"main-container"],[1,"page"],[1,"content"],["href","https://github.com/banksiaglobal/SleepTracker","target","_blank"],["class","registre-box",4,"ngIf"],[1,"registre-box"],[1,"registre-box-title"],[1,"registre-box-title","white-font","title-mini","bolder-weight"],[1,"registre-box-title","dark-gray-font","title-mini","bolder-weight"],[1,"registre-box-btns"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h3"),e._uU(5,"About:"),e.qZA(),e.TgZ(6,"h5"),e._uU(7," Example of using InterSystems IRIS Cloud SQL and IntegratedML to build a sleep analysis applicaion "),e.qZA(),e.TgZ(8,"p"),e._uU(9," This project demonstrates an application for sleep quality monitoring and analysis. Client side: TypeScript with Angular framework. Server side: Python with FastAPI and DB-API to connect to the database. Database: The database is hosted in InterSystems IRIS Cloud SQL, and we used one of its features, IntegratedML, to predict sleep quality. "),e.qZA(),e.TgZ(10,"h5"),e._uU(11,"InterSystems IRIS Cloud SQL"),e.qZA(),e.TgZ(12,"p"),e._uU(13," To do this, set up a deployment in the IRIS Cloud SQL portal and write the connection parameters into docker-compose file in the environment section. "),e.qZA(),e.TgZ(14,"h5"),e._uU(15,"Filling with data"),e.qZA(),e.TgZ(16,"p"),e._uU(17,' The "sleeps" table of our database is populated with the generated data. To do this, run the following commands in the docker terminal:'),e._UZ(18,"br"),e.qZA(),e.TgZ(19,"p"),e._uU(20,"/opt/venv/bin/activate - activate virtual environment"),e.qZA(),e.TgZ(21,"p"),e._uU(22,"cd src"),e.qZA(),e.TgZ(23,"p"),e._uU(24,"python.\\sleepTrack\\db_init.py - create tables"),e.qZA(),e.TgZ(25,"p"),e._uU(26,"python.\\sleepTrack\\generator.py - generate data"),e.qZA(),e.TgZ(27,"h5"),e._uU(28,"IntegratedML"),e.qZA(),e.TgZ(29,"p"),e._uU(30," The following sql queries are required to implement machine learning algorithms: "),e.qZA(),e.TgZ(31,"p"),e._uU(32,"Create model sleep predicting (quality) from SQLUser.Sleeps"),e.qZA(),e.TgZ(33,"p"),e._uU(34,"Train model sleeps"),e.qZA(),e.TgZ(35,"p"),e._uU(36,' Here we create a machine learning model based on the Sleeps database table. For prediction, we specify the field "quality" ("quality of sleep", the user\'s sensation after sleep). As a result of training, we get prediction and probability_quality fields, which we use later, for example, in such a sql query: '),e.qZA(),e.TgZ(37,"p"),e._uU(38," SELECT PREDICT(sleeps use sleeps) as prediction, quality, PROBABILITY(sleeps use sleeps for '3') as probability_quality, * FROM SQLUser.Sleeps where user_id = 1 and id = 1 "),e._UZ(39,"br"),e._uU(40,' where the prediction field contains a prediction of the quality of sleep, the probability_quality field contains the probability that the dream will be "qualitative" based on its entered characteristics. '),e.qZA(),e.TgZ(41,"div")(42,"h5"),e._uU(43,"Developers of project:"),e.qZA(),e.TgZ(44,"p"),e._uU(45,"/team ob Banksia Global/"),e.qZA(),e.TgZ(46,"p"),e._uU(47,"Backend: Maria Gladkova"),e.qZA(),e.TgZ(48,"p"),e._uU(49,"Backend: Maria Nesterenko"),e.qZA(),e.TgZ(50,"p"),e._uU(51,"Frontend: Katsiaryna Shaustruk"),e.qZA()(),e.TgZ(52,"h5"),e._uU(53," Documentation: "),e.TgZ(54,"a",4),e._uU(55,"github"),e.qZA()()(),e.YNc(56,p,11,0,"div",5),e.qZA()()()),2&t&&(e.xp6(56),e.Q6J("ngIf",!n.isUser))},dependencies:[r.ez,r.O5],styles:[".page[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;position:relative}.content[_ngcontent-%COMP%]{margin-bottom:20px;color:var(--base-dark-color)}.registre-box[_ngcontent-%COMP%]{padding:30px;background-color:var(--base-dark-color);box-shadow:0 3px 25px -2px #0003,0 2px 2px #00000024,0 -2px 5px #0000001f}.registre-box-title[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center;color:var(--accent-color)}.registre-box-btns[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap;gap:10px}.registre-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:155px;background-color:var(--accent-color);font-weight:600}.title-logo__icon[_ngcontent-%COMP%]{margin:40px}h3[_ngcontent-%COMP%]{text-align:center}a[_ngcontent-%COMP%]{text-decoration:none;color:var(--base-dark-color)}h5[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{text-align:justify}"]}),o})();var l=i(9646),u=i(4004),d=i(570),h=i(9299);let b=(()=>{class o{constructor(t,n){this.auth=t,this.router=n,this.isUserLogin$=(0,l.of)(!1)}ngOnInit(){this.ckeckIsLogin()}ckeckIsLogin(){this.auth.isLoggedIn$.pipe((0,u.U)(t=>{this.isUserLogin$=(0,l.of)(t)})).subscribe()}goToLoginPage(){this.router.navigate(["/signin"])}goToRegistrePage(){this.router.navigate(["/signup"])}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(d.e),e.Y36(h.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-about"]],standalone:!0,features:[e.jDz],decls:2,vars:3,consts:[[3,"isUserLogin","goToRegistrePage","goToLoginPage"]],template:function(t,n){1&t&&(e.TgZ(0,"app-about-view",0),e.NdJ("goToRegistrePage",function(){return n.goToRegistrePage()})("goToLoginPage",function(){return n.goToLoginPage()}),e.ALo(1,"async"),e.qZA()),2&t&&e.Q6J("isUserLogin",e.lcZ(1,1,n.isUserLogin$))},dependencies:[r.ez,r.Ov,c]}),o})()}}]);