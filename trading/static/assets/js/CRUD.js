var apipath="";
var fileTitle="";
function msgWorking(msgURL,msgMethod,msgSuccess,msgFail,msgData,msgHeader,msgSuccessURL)
{
  $.confirm({
    buttons:{
      ok:{
        keys:['enter','esc']
      }
    },
    content:function(){
      var self=this;
      if(!msgHeader)
      {
        return $.ajax({
          url:msgURL,
          data: msgData,
          dataType:'json',
          method:msgMethod
        })
        .fail(function(data){console.log(data.responseText); self.setIcon('fa fa-ban'); self.setTitle("Error"); self.setContent(msgFail); self.close();})
        .done(function(data){
          if(!msgSuccessURL)
          {self.setIcon('fa fa-info-circle'); 
          self.setTitle(productname); 
          self.setContent(msgSuccess);}
          else
          {
            self.close();
            window.location.replace(msgSuccessURL);
          }
          });
      }
      else
      {
        return $.ajax({
          url:msgURL,
          data: msgData,
          dataType:'json',
          method:msgMethod,
          beforeSend: function(xhr){xhr.setRequestHeader("Authorization", msgHeader);}
        })
        .fail(function(data){console.log(data.responseText); error_response(data); self.close();})
        .done(
          function(data)
          {
            if(!msgSuccessURL)
            {susccess_response(data); 
              self.close();}
            else{
              self.close();
              window.location.replace(msgSuccessURL);
            }
          });
      }
    }
  });
}
function msgInfo(msgContent,msgTitle)
{
  $.alert({
    icon:'fa fa-info-circle',
    type:'green',
    title:msgTitle || productname,
    content:msgContent,
    buttons:{
      ok:{
        keys:['enter','esc']
      }
    }
  });
}
function msgCritical(msgContent,msgTitle)
{
  $.alert({
    icon:'fa fa-ban',
    type:'red',
    title:msgTitle || productname,
    content:msgContent,
    buttons:{
      ok:{
        keys:['enter','esc']
      }
    }
  });
}
function msgQuestion(msgContent,okFunction,cancelFunction,msgTitle)
{
  $.confirm({
    icon:'fa fa-question-circle',
    type:'blue',
    title:msgTitle || productname,
    content:msgContent,
    buttons:{
      ok:{
        keys:['enter'],
        action:okFunction
      },
      cancel:{
        keys:['esc'],
        action:cancelFunction
      }
    }
  }
    );
}
function getTotal(table)
{
  table.columns( '.sum' ).every( function () {
    var sum = this
        .data()
        .reduce( function (a,b) {
            var x=parseFloat(a)||0;
            var y=parseFloat(b)||0;
            return x+y;
        } );
    $(this.footer()).html(sum.toFixed(2));
} );
}
function setTable()
{
  $('#workspace').empty();
  $('#workspace').html('<table id="example" class="table table-hover table-condensed"><tfoot></tfoot></table>');
    $.ajax( {
        url: apipath + '?vdate__gte=' + $("#reportrange").data('daterangepicker').startDate.format('YYYY-MM-DD') + '+00:00&vdate__lte=' + $("#reportrange").data('daterangepicker').endDate.format('YYYY-MM-DD') + '+00:00',
        beforeSend: function(request) {
                 request.setRequestHeader("Authorization", "Token " + g_auth.key);
        },
        dataType: "json",
        "success": function ( json ) {
          var table=$("#example").DataTable({
  "columns": json.columns,
  "columnDefs":json.columndefs,
  "data":[]
    });
    table.destroy();
    var clonedRow =$('#example thead tr').clone(false);
        $(clonedRow).find('th').each(function(){$(this).text('');});
        clonedRow.appendTo( '#example tfoot' );
          table=$("#example").DataTable({               
  responsive: true,
  processing: true,  
  dom: '<"html5buttons"B>lTfgitp',
  buttons: [
    
      { extend: 'copyHtml5',footer:true,exportOptions: {
        columns: "thead th:not(.noExport)"
    }},
      {extend: 'csvHtml5',footer:true, title: fileTitle,exportOptions: {
        columns: "thead th:not(.noExport)"
    }},
      {extend: 'excelHtml5',footer:true, title: fileTitle,exportOptions: {
        columns: "thead th:not(.noExport)"
    }},
      {extend: 'pdfHtml5',footer:true, title: fileTitle,exportOptions: {
        columns: "thead th:not(.noExport)"
    }},
  
                      {extend: 'print',
                       customize: function (win){
                              $(win.document.body).addClass('white-bg');
                              $(win.document.body).css('font-size', '10px');
  
                              $(win.document.body).find('table')
                                      .addClass('compact')
                                      .css('font-size', 'inherit');
                      },exportOptions: {
                        columns: "thead th:not(.noExport)"
                    }
                      }
    ],
  "order":json.order,
  "pageLength":json.pagelength,
  "columns": json.columns,
  "columnDefs":json.columndefs,
  "data":json.response
    });
    getTotal(table);
    $("#example").width("99%");
}
        });
    $("#pagearea").css('visibility','visible');
}
function setRange() {
                                            
  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
         'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb);

  cb(start, end);

}

jQuery( document ).ready(function( $ ) {  
$('form.ajax-post button[type=submit]').click(function(e){
  var form = $('form.ajax-post');
  var msgSuccess=form.attr('data-done');
  var msgFailed=form.attr('data-failed');
  var msgURL=form.attr('data-url');
  msgWorking(form.attr('action'),"POST",msgSuccess,msgFailed,form.serialize(),"",msgURL);
  return false;
});
$('form.ajax-token button[type=submit]').click(function(e){
  var form = $('form.ajax-token');
  var msgSuccess=form.attr('data-done');
  var msgFailed=form.attr('data-failed');
  var msgURL=form.attr('data-url');
  msgWorking(form.attr('action'),"POST",msgSuccess,msgFailed,form.serialize(), 'Token '+g_auth.key,msgURL);  
  return false;
});
});