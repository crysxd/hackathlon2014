var personData = undefined;

$(function() {
   
    
});

$('#btn-search').click(function() {
  loadName($('#search-field').val());

});

function loadName(name) {
  $('#btn-search').button('loading');

  loadUrl('http://192.168.1.93/data.php?name=' + name, function(json) {
    personData = json;
    alert(json.personCount);
    
    $('#btn-search').button('reset');
    
  });
}

function loadUrl(url, callback) {
  var xmlhttp;
  
  // code for IE7+, Firefox, Chrome, Opera, Safari
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  
  // code for IE6, IE5
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  
  }
  
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      try {
        callback(JSON.parse(xmlhttp.responseText));
        
      } catch(e) {
        xmlhttp.onerror();
        console.log(e);
          
      }
    }
  }
  
  xmlhttp.onerror = function() {
    alert("Ein Fehler ist passiert, das ist doof :(");
    
  }
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  
}