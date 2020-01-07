var apipath="",fileTitle="",g_auth=localStorage.getItem("auth");if(g_auth)try{g_auth=JSON.parse(g_auth)}catch(t){g_auth=null}var initLogin=function(){g_auth?(localStorage.setItem("auth",JSON.stringify(g_auth)),window.location.replace(rooturl)):(removeLocal(),window.location.replace(rooturl+g_urls.login))};function removeLocal(){localStorage.removeItem("auth"),sessionStorage.removeItem("auth"),localStorage.setItem("logout-event","logout"+Math.random())}function getFirstKeyValue(t){var e;for(e in t);return t[e][0]}function easyuiOptions(t){var e=null;return $.ajax({headers:{Authorization:"JWT "+g_auth.key},async:!1,url:t,dataType:"json",success:function(t){var a=t.response,o=$.map(a,function(t,e){return t.id?{id:t.id,name:t.name}:{id:e+1,name:t.name}});e=o}}),e}function setOptions(t,e){$.ajax({headers:{Authorization:"JWT "+g_auth.key},url:t,dataType:"json",success:function(t){t.response.forEach(function(t,a){$(e).append('<option value="'+t.id+'">'+t.name+"</option>")})}})}function msgWorking(t,e,a,o,n,r,i){$.confirm({buttons:{ok:{keys:["enter","esc"]}},content:function(){var s=this;return r?$.ajax({headers:{"X-CSRFToken":csrf_token,Authorization:r},url:t,data:n,dataType:"json",method:e}).fail(function(t){s.setIcon("fa fa-ban"),s.setTitle("Error"),s.setContent(o+"<br /><br />"+getFirstKeyValue(t.responseJSON))}).done(function(t){i?(s.close(),a&&msgInfo(a),window.location.replace(i)):(s.setIcon("fa fa-info-circle"),s.setTitle(productname),s.setContent(a))}):$.ajax({url:t,data:n,dataType:"json",method:e}).fail(function(t){s.setIcon("fa fa-ban"),s.setTitle("Error"),s.setContent(o+"<br /><br />"+getFirstKeyValue(t.responseJSON))}).done(function(t){i?(s.close(),a&&msgInfo(a),window.location.replace(i)):(s.setIcon("fa fa-info-circle"),s.setTitle(productname),s.setContent(a))})}})}function msgFormula(msgTarget){$.confirm({icon:"fa fa-calculator",type:"blue",title:"Formula Calculator",content:'<form action="" class="frmPrompt"><div class="form-group"><label>Please enter a formula to be calculated</label><input type="text" placeholder="3000+(2000*2)+(9399/3)" class="name form-control" required /></div></form>',buttons:{ok:{keys:["enter"],action:function(){var rtnValue=this.$content.find(".name").val();if(!rtnValue)return $.alert("Please provide a valid value !"),!1;var y=eval(rtnValue);$(msgTarget).val(y)}},cancel:{keys:["esc"],action:function(){}}}})}function msgInfo(t,e){$.confirm({icon:"fa fa-info-circle",type:"green",title:e||productname,content:t,buttons:{ok:{keys:["enter","esc"]}}})}function msgCritical(t,e){$.alert({icon:"fa fa-ban",type:"red",title:e||productname,content:t,buttons:{ok:{keys:["enter","esc"]}}})}function msgQuestion(t,e,a,o){$.confirm({icon:"fa fa-question-circle",type:"blue",title:o||productname,content:t,buttons:{ok:{keys:["enter"],action:e},cancel:{keys:["esc"],action:a}}})}function getTotal(t){t.columns(".sum").every(function(){var t=this.data().reduce(function(t,e){return(parseFloat(t)||0)+(parseFloat(e)||0)});$(this.footer()).html(t.toFixed(2))})}function setTable(){$("#workspace").empty(),$("#workspace").html('<table id="example" class="table table-hover table-condensed"><tfoot></tfoot></table>'),$.ajax({url:apipath+"?vdate__gte="+$("#reportrange").data("daterangepicker").startDate.format("YYYY-MM-DD")+"+00:00&vdate__lte="+$("#reportrange").data("daterangepicker").endDate.format("YYYY-MM-DD")+"+00:00",beforeSend:function(t){t.setRequestHeader("Authorization","Token "+g_auth.key)},dataType:"json",success:function(t){var e=$("#example").DataTable({columns:t.columns,columnDefs:t.columndefs,data:[]});e.destroy();var a=$("#example thead tr").clone(!1);$(a).find("th").each(function(){$(this).text("")}),a.appendTo("#example tfoot"),getTotal(e=$("#example").DataTable({responsive:!0,processing:!0,dom:'<"html5buttons"B>lTfgitp',buttons:[{extend:"copyHtml5",footer:!0,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"csvHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"excelHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"pdfHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"print",customize:function(t){$(t.document.body).addClass("white-bg"),$(t.document.body).css("font-size","10px"),$(t.document.body).find("table").addClass("compact").css("font-size","inherit")},exportOptions:{columns:"thead th:not(.noExport)"}}],order:t.order,pageLength:t.pagelength,columns:t.columns,columnDefs:t.columndefs,data:t.response})),$("#example").width("99%")}}),$("#pagearea").css("visibility","visible")}function setRange(){var t=moment().subtract(29,"days"),e=moment();function a(t,e){$("#reportrange span").html(t.format("MMMM D, YYYY")+" - "+e.format("MMMM D, YYYY"))}$("#reportrange").daterangepicker({startDate:t,endDate:e,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 Days":[moment().subtract(6,"days"),moment()],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]}},a),a(t,e)}window.addEventListener("storage",function(t){"logout-event"==t.key&&window.location.replace(rooturl+g_urls.login)}),jQuery(document).ready(function(t){t(document).on("click","a.frm",function(e){e.preventDefault(),t("#pagearea").css("visibility","hidden"),fileTitle=t(this).text(),t(".title h4").text(fileTitle),t("#workspace").empty(),t("#workspace").load(t(this).attr("data-menuapi")),t("#filter").css("visibility","hidden"),document.title=productname+" | "+fileTitle,t("#pagearea").css("visibility","visible")}),t(document).on("click","a.report",function(e){e.preventDefault(),t("#pagearea").css("visibility","hidden"),t("#filter").empty(),t("#filter").load(t(this).attr("data-filterapi"),function(){fileTitle=t(this).text(),t(".title h4").text(fileTitle),apipath=rooturl+t(this).attr("data-menuapi"),setRange(),setTable(),t("#filter").css("visibility","visible"),document.title=productname+" | "+fileTitle,t("#pagearea").css("visibility","visible")})}),t("#workspace").on("click","form.ajax-post button[type=submit]",function(e){var a=t("form.ajax-post"),o=a.attr("data-done"),n=a.attr("data-fail"),r=a.attr("data-url");return msgWorking(a.attr("action"),"POST",o,n,a.serialize(),"",r),!1}),t("#workspace").on("click","form.ajax-token button[type=submit]",function(e){e.preventDefault();var a=t("form.ajax-token"),o=a.attr("data-done"),n=a.attr("data-fail"),r=a.attr("data-url");return msgWorking(a.attr("action"),"POST",o,n,a.serialize(),"Token "+g_auth.key,r),!1}),t(".logout").click(function(e){return e.preventDefault(),t.ajax({type:"POST",datatype:"json",url:g_urls.logout,data:{csrfmiddlewaretoken:g_csrftoken},success:function(t){g_auth=null,initLogin()},error:function(t,e,a){g_auth=null,initLogin()}}),!1})});
