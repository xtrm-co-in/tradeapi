var apipath="",fileTitle="",g_auth=localStorage.getItem("auth");if(g_auth)try{g_auth=JSON.parse(g_auth)}catch(t){g_auth=null}var initLogin=function(){g_auth?(localStorage.setItem("auth",JSON.stringify(g_auth)),window.location.replace(rooturl)):(removeLocal(),window.location.replace(rooturl+g_urls.login))};function removeLocal(){localStorage.removeItem("auth"),sessionStorage.removeItem("auth"),localStorage.setItem("logout-event","logout"+Math.random())}function getFirstKeyValue(t){var e;for(e in t);return t[e][0]}function getOptions(t){var e;return $.ajax({headers:{Authorization:"JWT "+g_auth.key},url:t,dataType:"json",success:function(t){var o=t.response,n=$.map(o,function(t,e){return{id:t.id,name:t.name}});e=n}}),e}function setOptions(t,e){$.ajax({headers:{Authorization:"JWT "+g_auth.key},url:t,dataType:"json",success:function(t){t.response.forEach(function(t,o){$(e).append('<option value="'+t.id+'">'+t.name+"</option>")})}})}function msgWorking(t,e,o,n,a,r,i){$.confirm({buttons:{ok:{keys:["enter","esc"]}},content:function(){var s=this;return r?$.ajax({headers:{"X-CSRFToken":csrf_token,Authorization:r},url:t,data:a,dataType:"json",method:e}).fail(function(t){s.setIcon("fa fa-ban"),s.setTitle("Error"),s.setContent(n+"<br /><br />"+getFirstKeyValue(t.responseJSON))}).done(function(t){i?(s.close(),o&&msgInfo(o),window.location.replace(i)):(s.setIcon("fa fa-info-circle"),s.setTitle(productname),s.setContent(o))}):$.ajax({url:t,data:a,dataType:"json",method:e}).fail(function(t){s.setIcon("fa fa-ban"),s.setTitle("Error"),s.setContent(n+"<br /><br />"+getFirstKeyValue(t.responseJSON))}).done(function(t){i?(s.close(),o&&msgInfo(o),window.location.replace(i)):(s.setIcon("fa fa-info-circle"),s.setTitle(productname),s.setContent(o))})}})}function msgFormula(msgTarget){$.confirm({icon:"fa fa-calculator",type:"blue",title:"Formula Calculator",content:'<form action="" class="frmPrompt"><div class="form-group"><label>Please enter a formula to be calculated</label><input type="text" placeholder="3000+(2000*2)+(9399/3)" class="name form-control" required /></div></form>',buttons:{ok:{keys:["enter"],action:function(){var rtnValue=this.$content.find(".name").val();if(!rtnValue)return $.alert("Please provide a valid value !"),!1;var y=eval(rtnValue);$(msgTarget).val(y)}},cancel:{keys:["esc"],action:function(){}}}})}function msgInfo(t,e){$.confirm({icon:"fa fa-info-circle",type:"green",title:e||productname,content:t,buttons:{ok:{keys:["enter","esc"]}}})}function msgCritical(t,e){$.alert({icon:"fa fa-ban",type:"red",title:e||productname,content:t,buttons:{ok:{keys:["enter","esc"]}}})}function msgQuestion(t,e,o,n){$.confirm({icon:"fa fa-question-circle",type:"blue",title:n||productname,content:t,buttons:{ok:{keys:["enter"],action:e},cancel:{keys:["esc"],action:o}}})}function getTotal(t){t.columns(".sum").every(function(){var t=this.data().reduce(function(t,e){return(parseFloat(t)||0)+(parseFloat(e)||0)});$(this.footer()).html(t.toFixed(2))})}function setTable(){$("#reportrange").css("visibility","visible"),$("#workspace").empty(),$("#workspace").html('<table id="example" class="table table-hover table-condensed"><tfoot></tfoot></table>'),$.ajax({url:apipath+"?format=datatables",beforeSend:function(t){t.setRequestHeader("Authorization","Token "+g_auth.key)},dataType:"json",success:function(t){var e=$("#example").DataTable({columns:t.options.columns,columnDefs:t.options.columndefs,data:[]});e.destroy();var o=$("#example thead tr").clone(!1);$(o).find("th").each(function(){$(this).text("")}),o.appendTo("#example tfoot"),getTotal(e=$("#example").DataTable({responsive:!0,processing:!0,dom:'<"html5buttons"B>lTfgitp',buttons:[{extend:"copyHtml5",footer:!0,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"csvHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"excelHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"pdfHtml5",footer:!0,title:fileTitle,exportOptions:{columns:"thead th:not(.noExport)"}},{extend:"print",customize:function(t){$(t.document.body).addClass("white-bg"),$(t.document.body).css("font-size","10px"),$(t.document.body).find("table").addClass("compact").css("font-size","inherit")},exportOptions:{columns:"thead th:not(.noExport)"}}],order:t.options.order,pageLength:t.options.pagelength,columns:t.options.columns,columnDefs:t.options.columndefs,data:t.options.response})),$("#example").width("99%")}}),$("#pagearea").css("visibility","visible")}function setRange(){var t=moment().subtract(29,"days"),e=moment();function o(t,e){$("#reportrange span").html(t.format("MMMM D, YYYY")+" - "+e.format("MMMM D, YYYY"))}$("#reportrange").daterangepicker({startDate:t,endDate:e,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 Days":[moment().subtract(6,"days"),moment()],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]}},o),o(t,e)}window.addEventListener("storage",function(t){"logout-event"==t.key&&window.location.replace(rooturl+g_urls.login)}),jQuery(document).ready(function(t){t(document).on("click","a.frm",function(e){e.preventDefault(),fileTitle=t(this).text(),document.title=productname+" | "+fileTitle,t(".title h4").text(fileTitle),t("#workspace").empty(),t("#workspace").load(t(this).attr("data-menuapi")),t("#reportrange").css("visibility","hidden"),t("#pagearea").css("visibility","visible")}),t("#workspace").on("click","form.ajax-post button[type=submit]",function(e){var o=t("form.ajax-post"),n=o.attr("data-done"),a=o.attr("data-fail"),r=o.attr("data-url");return msgWorking(o.attr("action"),"POST",n,a,o.serialize(),"",r),!1}),t("#workspace").on("click","form.ajax-token button[type=submit]",function(e){e.preventDefault();var o=t("form.ajax-token"),n=o.attr("data-done"),a=o.attr("data-fail"),r=o.attr("data-url");return msgWorking(o.attr("action"),"POST",n,a,o.serialize(),"Token "+g_auth.key,r),!1})});
