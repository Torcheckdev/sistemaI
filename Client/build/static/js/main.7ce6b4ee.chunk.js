(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{35:function(t,e,n){},63:function(t,e,n){"use strict";n.r(e);var i=n(0),c=n.n(i),r=n(27),a=n.n(r),s=(n(35),n(9)),l=n(10),o=n(12),d=n(15),j=n.n(d),h=n(1);function b(){var t=Object(i.useState)({usuario:"","contrase\xf1a":"",pword:""}),e=Object(o.a)(t,2),n=e[0],c=e[1];function r(t){c(Object(l.a)(Object(l.a)({},n),{},Object(s.a)({},t.target.id,t.target.value)))}return Object(h.jsx)("div",{style:{display:"flex",width:"100vw",height:"100vh",justifyContent:"center"},children:Object(h.jsx)("div",{style:{display:"flex",marginTop:"30vh",height:"40vh",backgroundColor:"white",alignItems:"center",borderRadius:"7px",border:" 3px solid black"},children:Object(h.jsxs)("form",{onSubmit:function(t){return function(t){t.preventDefault(),j.a.post("http://localhost:8080/api/auth/signup",{Email:n.Email,Pword:n.Pword},{withCredentials:!0}).then((function(t){console.log(t)}),(function(t){console.log(t)}))}(t)},children:[Object(h.jsxs)("table",{style:{padding:"3vw"},children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{align:"right",children:"Email:"}),Object(h.jsxs)("td",{align:"left",children:[Object(h.jsx)("input",{id:"Email",onChange:function(t){return r(t)}})," "]})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{align:"right",children:"Contrase\xf1a:"}),Object(h.jsxs)("td",{align:"left",children:[Object(h.jsx)("input",{id:"Pword",onChange:function(t){return r(t)}})," "]})]})]}),Object(h.jsx)("button",{style:{marginInlineStart:"18em",width:"4.5em"},children:" Entrar"})]})})})}function u(){var t=Object(i.useState)({usuario:"",pword:""}),e=Object(o.a)(t,2),n=e[0],c=e[1],r=Object(i.useState)(""),a=Object(o.a)(r,2),d=(a[0],a[1]);function u(t){c(Object(l.a)(Object(l.a)({},n),{},Object(s.a)({},t.target.id,t.target.value)))}return Object(h.jsxs)("div",{style:{display:"flex",width:"100vw",height:"100vh",justifyContent:"center"},children:[Object(h.jsx)("div",{style:{display:"flex",marginTop:"30vh",height:"40vh",backgroundColor:"white",alignItems:"center",borderRadius:"7px",border:" 3px solid black"},children:Object(h.jsxs)("form",{onSubmit:function(t){return function(t){t.preventDefault(),j.a.post("http://localhost:8080/api/auth/signin",{Email:n.Email,Pword:n.Pword},{withCredentials:!0}).then((function(t){console.log(t.data),console.log(t.data.accessToken),d(t.data.accessToken)}),(function(t){console.log(t)}))}(t)},children:[Object(h.jsxs)("table",{style:{padding:"3vw"},children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{align:"right",children:"Usuario:"}),Object(h.jsxs)("td",{align:"left",children:[Object(h.jsx)("input",{id:"Email",onChange:function(t){return u(t)}})," "]})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{align:"right",children:"Contrase\xf1a:"}),Object(h.jsxs)("td",{align:"left",children:[Object(h.jsx)("input",{id:"Pword",onChange:function(t){return u(t)}})," "]})]})]}),Object(h.jsx)("button",{style:{marginInlineStart:"18em",width:"4.5em"},children:" Entrar"})]})}),Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(b,{})})]})}var g=n(28),O=n(2);var x=function(){return Object(h.jsx)("div",{children:Object(h.jsx)(g.a,{children:Object(h.jsxs)(O.c,{children:[Object(h.jsx)(O.a,{exact:!0,path:"/",children:Object(h.jsx)(u,{})}),Object(h.jsx)(O.a,{exact:!0,path:"/signup",children:Object(h.jsx)(b,{})})]})})})},f=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,r=e.getLCP,a=e.getTTFB;n(t),i(t),c(t),r(t),a(t)}))};a.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(x,{})}),document.getElementById("root")),f()}},[[63,1,2]]]);
//# sourceMappingURL=main.7ce6b4ee.chunk.js.map