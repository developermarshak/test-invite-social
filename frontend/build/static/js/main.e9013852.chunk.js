(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{45:function(e,t,a){e.exports=a(84)},50:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(37),o=a.n(s),c=(a(50),a(43)),i=a(19),l=a(3),u=a(5),p=a(4),m=a(6),d=a(10),f=a(14),h=a(1),g=(a(16),a(38)),b=a.n(g),v=a(11),E=a(17),O=a(2),y=a.n(O),w=a(7),j=a(9),S=(a(69),function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"loader-element"}," ")}}]),t}(r.a.Component)),x=(a(70),new(a(44).a));function P(e){x.set("token",e,{path:"/"})}function k(){return x.get("token")}function C(){x.set("token","",{path:"/"})}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var H="/api/auth/login";function N(e,t,a){return D.apply(this,arguments)}function D(){return(D=Object(w.a)(y.a.mark((function e(t,a,n){var r,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={email:t,password:a},e.next=3,n.post(H,r,F(!1));case 3:s=e.sent,P(s.data.token);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={headers:{"content-type":"application/json"}},a=null===e?k():e;return a&&(t.headers=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},t.headers,{},{authorization:"Bearer ".concat(a)})),t}var _=a(24),T=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(){var e=Object(w.a)(y.a.mark((function e(t){var n,r,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({loading:!0}),t.preventDefault(),n=a.state,r=n.email,s=n.password,N(r,s,a.props.axiosInstance).then((function(){a.props.customHistory.push("/user/me")})).finally((function(){a.setState({loading:!1})}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.setEmail=function(e){var t="";e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value),a.setState({email:t})},a.setPassword=function(e){var t="";e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value),a.setState({password:t})},a.state={email:a.props.email||"",password:a.props.password||"",errors:[],loading:!1},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=void 0!==t&&t,n=(e.customHistory,Object(E.a)(e,["className","customHistory"])),s=_("wrapper",a);return this.state.loading?r.a.createElement(S,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",Object.assign({className:s},n),r.a.createElement(h.e,{onSubmit:this.onSubmit,method:"POST",buttonText:"Login",title:"Login page"},r.a.createElement(h.f,{label:"Email",onChange:this.setEmail,type:"email"}),r.a.createElement(h.f,{label:"Password",onChange:this.setPassword,type:"password"})),r.a.createElement(h.c,null,r.a.createElement(f.a,{className:"btn btn-sm btn-success",to:"/registration"},"Registration"))))}}]),t}(r.a.Component),U=(a(75),"/api/photo"),R=a(24),B=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(){var e=Object(w.a)(y.a.mark((function e(t){var n,r,s,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=a.state.file){e.next=4;break}return e.abrupt("return");case 4:return(r=new FormData).append("photo",n),(s=F()).headers["content-type"]="multipart/form-data",e.next=10,a.props.axiosInstance.post(U,r,s);case 10:o=e.sent,a.setState({photoSrc:o.headers["x-location"]});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onChange=function(e){var t=null;e.target&&e.target.files&&e.target.files.length>0&&(t=e.target.files[0]),a.setState({file:t})},a.state={photoSrc:a.props.photoSrc,file:null,token:null},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=void 0!==t&&t,n=e.photoSrc,s=Object(E.a)(e,["className","photoSrc"]),o=this.state.photoSrc||n,c=R("wrapper",a);return r.a.createElement(h.c,Object.assign({className:c},s),r.a.createElement(h.c.Header,null,r.a.createElement(h.c.Title,null,"Your Photo")),r.a.createElement(h.c.Body,null,r.a.createElement(r.a.Fragment,null,o&&r.a.createElement("img",{className:"PhotoUpload-photo",src:"http://symfony.localhost/img/".concat(o),alt:"Profile"}),r.a.createElement(h.d.FileInput,{onChange:this.onChange}))),r.a.createElement(h.c.Footer,null,r.a.createElement(h.b,{onClick:this.onSubmit,className:"btn-block btn-primary"},"Upload Photo")))}}]),t}(r.a.Component),L="/api/stat/",M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).componentDidMount=Object(w.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.axiosInstance.get(L,F());case 2:t=e.sent,a.setState({loading:!1,registered:t.data.registered,wait:t.data.wait});case 4:case"end":return e.stop()}}),e)}))),a.render=function(){return r.a.createElement(h.c,null,r.a.createElement(h.c.Header,null,r.a.createElement(h.c.Title,null,"Statistics invites")),r.a.createElement(h.c.Body,null,a.state.loading?r.a.createElement(S,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(h.i,{color:"red",icon:"users",header:r.a.createElement(r.a.Fragment,null,a.state.registered.toString()," ",r.a.createElement("small",null,"Registered users")),footer:"".concat(a.state.wait.toString()," waited users")}),r.a.createElement(f.a,{className:"btn btn-sm btn-success",to:"/invite"},"Invite User"))))},a.state={loading:!0,registered:0,wait:0},a}return Object(m.a)(t,e),t}(r.a.Component),q=(a(76),"/api/user/me"),A=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a.setState({loading:!0}),a.put({description:a.state.user.description}).then((function(){a.setState({loading:!1})}),(function(){a.setState({loading:!1})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onSubmitPassword=function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a.setState({loadingPassword:!0}),a.put({old_password:a.state.oldPassword,password:a.state.newPassword},"/password").then((function(){a.setState({loadingPassword:!1})}),(function(){a.setState({loadingPassword:!1})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.componentDidMount=Object(w.a)(y.a.mark((function e(){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.axiosInstance.get(q,F());case 2:t=e.sent,n=t.data,a.setState({user:n,loading:!1});case 5:case"end":return e.stop()}}),e)}))),a.put=function(){var e=Object(w.a)(y.a.mark((function e(t){var n,r=arguments;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.length>1&&void 0!==r[1]?r[1]:"",e.abrupt("return",a.props.axiosInstance.put(q+n,t,F()));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.setOldPassword=function(e){var t=null;e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value),a.setState({oldPassword:t})},a.setNewPassword=function(e){var t=null;e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value),a.setState({newPassword:t})},a.setDescription=function(e){var t=null;e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value);var n=a.state.user;n.description=t,a.setState({user:n})},a.state={loading:!0,loadingPassword:!1,oldPassword:null,newPassword:null,user:{id:0,email:"loading...",description:null,photo:null}},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.axiosInstance,a=e.customHistory,n=this.state,s=n.user,o=n.loadingPassword,c=n.loading,i=s.description||"";return r.a.createElement(h.h.Content,{title:"Home User Page"},r.a.createElement(h.g.Row,{cards:!0},r.a.createElement(h.g.Col,{width:12,sm:8,lg:4},r.a.createElement(h.c,null,r.a.createElement(h.c.Header,null,r.a.createElement(h.c.Title,null,"Your Profile")),c?r.a.createElement(S,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(h.c.Body,{className:"p-6"},r.a.createElement(h.f,{label:"Id",type:"text",readOnly:!0,value:s.id}),r.a.createElement(h.f,{label:"Email",type:"text",readOnly:!0,value:s.email}),r.a.createElement(h.f,{label:"Description",type:"textarea",onChange:this.setDescription,value:i})),r.a.createElement(h.c.Footer,null,r.a.createElement(h.b,{onClick:this.onSubmit,className:"btn-block btn-primary"},"Save Profile")))),r.a.createElement(h.c,null,r.a.createElement(h.c.Header,null,r.a.createElement(h.c.Title,null,"Change Password")),o?r.a.createElement(S,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(h.c.Body,{className:"p-6"},r.a.createElement(h.f,{label:"Old Password",type:"password",onChange:this.setOldPassword}),r.a.createElement(h.f,{label:"New Password",type:"password",onChange:this.setNewPassword})),r.a.createElement(h.c.Footer,null,r.a.createElement(h.b,{onClick:this.onSubmitPassword,className:"btn-block btn-primary"},"Change"))))),r.a.createElement(h.g.Col,{width:12,sm:8,lg:4},r.a.createElement(B,{axiosInstance:t,photoSrc:s.photo})),r.a.createElement(h.g.Col,{width:12,sm:8,lg:4},r.a.createElement(M,{axiosInstance:t}),r.a.createElement(h.c,null,r.a.createElement(h.b,{className:"btn btn-block btn-dark",onClick:function(){C(),a.push("/auth/login")}},"Logout")),r.a.createElement(h.c,null,r.a.createElement(h.b,{className:"btn btn-block btn-white",onClick:function(){a.push("/user")}},"Users")))))}}]),t}(r.a.Component);a(77);function G(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var J="/api/registration",W=a(24),Y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(){var e=Object(w.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a.setState({loading:!0}),n=function(){a.setState({loading:!1})},a.tryRegistration().then((function(){N(a.state.email,a.state.password,a.props.axiosInstance).then((function(){a.props.customHistory.push("/user/me")}),n)}),n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.getData=function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.axiosInstance.get("/api/registration_invite/"+t,F());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.tryRegistration=Object(w.a)(y.a.mark((function e(){var t,n,r,s,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state,n=t.email,r=t.password,s=t.invite_code,o={email:n,password:r,invite_code:s},e.abrupt("return",a.props.axiosInstance.post(J,o,F(!1)));case 3:case"end":return e.stop()}}),e)}))),a.setStateField=function(e){return function(t){if(t.target&&t.target.value){var n=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?G(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):G(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a.state);n[e]=t.target.value,a.setState(n)}}},a.state={loading:!1,email:"",password:"",invite_code:"",errors:[]},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match,a=t&&t.params&&t.params.invite_code?t.params.invite_code:null;a&&(this.setState({loading:!0}),this.getData(a).then((function(t){e.setState({invite_code:a,email:t.data.for_email,loading:!1})}),(function(){e.setState({loading:!1})})))}},{key:"render",value:function(){var e=this.props,t=e.className,a=void 0!==t&&t,n=(e.axiosInstance,e.customHistory,e.match,e.history,e.location,Object(E.a)(e,["className","axiosInstance","customHistory","match","history","location"])),s=W("wrapper",a);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",Object.assign({className:s},n),this.state.loading?r.a.createElement(S,null):r.a.createElement(h.e,{onSubmit:this.onSubmit,method:"POST",buttonText:"Register",title:"Registration page"},r.a.createElement(h.f,{label:"Email",onChange:this.setStateField("email"),type:"text",value:this.state.email}),r.a.createElement(h.f,{label:"Password",onChange:this.setStateField("password"),type:"password"}),r.a.createElement(h.f,{label:"Invite Code",onChange:this.setStateField("invite_code"),type:"text",value:this.state.invite_code})),r.a.createElement(h.c,null,r.a.createElement(f.a,{className:"btn btn-sm btn-success",to:"/auth/login"},"Back to login"))))}}]),t}(r.a.Component),z=(a(78),"/api/user"),V=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).componentDidMount=Object(w.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.updateUsers(1);case 2:case"end":return e.stop()}}),e)}))),a.setPage=function(e){a.setState({page:e,loading:!0}),a.updateUsers(e).then((function(){a.setState({loading:!1})}))},a.updateUsers=function(){var e=Object(w.a)(y.a.mark((function e(t){var n,r,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.axiosInstance.get(z+"?page="+t,F());case 2:n=e.sent,r=n.data.users,s=n.data.pages,a.setState({users:r,pages:s,loading:!1});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={loading:!0,pages:1,page:1,users:[]},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.users,n=t.page,s=t.pages,o=t.loading,c=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(f.a,{className:"btn btn-success",to:"/user/me"},"Back To Profile"),r.a.createElement("br",null)));if(o)return r.a.createElement(h.h.Content,{title:"Users"},r.a.createElement(S,null),c);if(0===a.length)return r.a.createElement(h.h.Content,{title:"Users"},"Cannot find some user, please try again later",c);var i=[],l=function(t){return t<1?"continue":i.length>=7?"break":void i.push(r.a.createElement(h.b,{onClick:function(){e.setPage(t)}},t))};e:for(var u=n-5;u<=s;u++){switch(l(u)){case"continue":continue;case"break":break e}}return r.a.createElement(h.h.Content,{title:"Users"},r.a.createElement(h.j,null,r.a.createElement(h.j.Header,null,r.a.createElement(h.j.ColHeader,null,"Username"),r.a.createElement(h.j.ColHeader,null,"Description"),r.a.createElement(h.j.ColHeader,null,"Photo")),r.a.createElement(h.j.Body,null,a.map((function(e){return r.a.createElement(h.j.Row,null,r.a.createElement(h.j.Col,null,r.a.createElement(h.k.List,null,r.a.createElement(h.k,{color:"blue"},e.email))),r.a.createElement(h.j.Col,null,e.description),r.a.createElement(h.j.Col,null,e.photo&&r.a.createElement("img",{className:"big-img",alt:"Profile",src:(t="/img/"+e.photo,"http://symfony.localhost".concat(t))})));var t})))),r.a.createElement("div",null,i),c)}}]),t}(r.a.Component),$=a(41),K=a(42),Q=a.n(K),X=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={copied:!1},a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e,t=this,a=Object($.a)({},this.props);return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.g.Row,{cards:!0},r.a.createElement(h.g.Col,{width:12,sm:12,lg:6},r.a.createElement(h.f,{label:"Invite Code",readOnly:!0,type:"text",value:a.code})),r.a.createElement(h.g.Col,{width:12,sm:12,lg:6},r.a.createElement(h.f,{label:"To",readOnly:!0,type:"text",value:a.for_email}))),r.a.createElement(h.g.Row,{cards:!0},r.a.createElement(h.g.Col,{width:12,sm:12,lg:12},r.a.createElement(Q.a,{text:(e="/registration/"+a.code,"http://localhost:4000".concat(e)),onCopy:function(){return t.setState({copied:!0})}},r.a.createElement(h.b,{className:"btn-primary"},this.state.copied?r.a.createElement(r.a.Fragment,null,"Copied"):r.a.createElement(r.a.Fragment,null,"Copy registration link"))))),r.a.createElement("br",null))}}]),t}(r.a.Component),Z="/api/invite",ee=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(){var e=Object(w.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n={to:a.state.email},a.setState({loading:!0}),a.props.axiosInstance.post(Z,n,F()).then((function(){a.updateData()})).catch((function(){a.setState({loading:!1})}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.updateData=function(){a.props.axiosInstance.get(Z,F()).then((function(e){e.data&&a.setState({invites:e.data,loading:!1})})).catch((function(){a.setState({loading:!1})}))},a.setEmail=function(e){var t="";e.target&&e.target.value&&e.target.value.length>0&&(t=e.target.value),a.setState({email:t})},a.state={loading:!0,email:"",invites:[],errors:[]},a.updateData(),a}return Object(m.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=void 0!==t&&t,n=Object(E.a)(e,["className"]),s="wrapper "+a,o=this.state,c=o.loading,i=o.invites;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",Object.assign({className:s},n),r.a.createElement(h.e,{onSubmit:this.onSubmit,method:"POST",buttonText:"Generate",title:"Generate invite"},r.a.createElement(h.f,{label:"Person Email",onChange:this.setEmail,type:"email"})),c?r.a.createElement(S,null):i.map((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(X,{code:e.code,for_email:e.for_email}))})),r.a.createElement(h.c,null,r.a.createElement(f.a,{to:"/user/me",className:"btn btn-sm btn-success"},"Back to user page"))))}}]),t}(r.a.Component),te=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).render=function(){return r.a.createElement(d.b,Object.assign({},a.props,{render:function(e){var t=e.location;return k()?a.props.children:r.a.createElement(d.a,{to:{pathname:"/auth/login",state:{from:t}}})}}))},a}return Object(m.a)(t,e),t}(r.a.Component);a(82);function ae(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var ne=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).customHistory=void 0,a.axiosInstance=void 0,a.errorHandler=function(e){var t="Cannot do request, please try again.",n=[];if(e.response&&e.request&&e.response.status){var r=e.response.status,s=e.response.data,o=e.request.responseURL;s.error_description&&s.error_description.errors?n=s.error_description.errors.map((function(e){return e.property_path.replace("[","").replace("]","")+": "+e.message})):s.error_message?t=s.error_message:400===r?t="Validation error":401===r?-1===o.indexOf("/api/auth/login")?(t="Please login again",C(),a.customHistory.push("/auth/login")):t="Invalid credentials":413===r?t="Too big request":r>500&&(t="Internal error please try again")}return 0===n.length&&n.push(t),a.setErrors(n),Promise.reject(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ae(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ae(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e))},a.setErrors=function(e){a.setState({errors:e}),setTimeout((function(){a.setState({errors:[]})}),5e3)},a.render=function(){var e=Object(c.a)(a.state.errors);return r.a.createElement(d.c,{history:a.customHistory},r.a.createElement(h.h,null,r.a.createElement(h.h.Main,null,e.length>0&&r.a.createElement("div",{className:"errorsContainer"},e.map((function(e){return r.a.createElement(h.a,{type:"danger",icon:"alert-triangle"},e)}))),r.a.createElement(d.d,null,r.a.createElement(te,{path:"/",exact:!0},r.a.createElement(A,{customHistory:a.customHistory,axiosInstance:a.axiosInstance})),r.a.createElement(d.b,{path:"/auth/login"},r.a.createElement(T,{customHistory:a.customHistory,axiosInstance:a.axiosInstance})),r.a.createElement(d.b,{path:"/registration/:invite_code",render:function(e){return r.a.createElement(Y,Object.assign({customHistory:a.customHistory,axiosInstance:a.axiosInstance},e))}}),r.a.createElement(d.b,{path:"/registration"},r.a.createElement(Y,{customHistory:a.customHistory,axiosInstance:a.axiosInstance})),r.a.createElement(te,{path:"/user/me"},r.a.createElement(A,{customHistory:a.customHistory,axiosInstance:a.axiosInstance})),r.a.createElement(te,{path:"/user"},r.a.createElement(V,{customHistory:a.customHistory,axiosInstance:a.axiosInstance})),r.a.createElement(te,{path:"/invite"},r.a.createElement(ee,{axiosInstance:a.axiosInstance})),r.a.createElement(d.b,{path:"*"},r.a.createElement("div",null,"This page not exist :( ",r.a.createElement(f.a,{to:"/"},"Go Home!")))))))};var n=b.a.create({baseURL:"http://symfony.localhost"});return n.interceptors.response.use((function(e){return e}),(function(e){return a.errorHandler(e)})),a.axiosInstance=n,a.customHistory=Object(v.a)(),a.state={errors:[]},a}return Object(m.a)(t,e),t}(r.a.Component),re=(a(83),function(){return r.a.createElement("div",{className:"App"},r.a.createElement(ne,{className:"App-center"}))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[45,1,2]]]);
//# sourceMappingURL=main.e9013852.chunk.js.map