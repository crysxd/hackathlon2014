var personData = undefined;

$(function() {
   
    
});

function loadName(name) {
  loadUrl('http://192.168.1.87/data.php?name=' + name, function(json) {
    personData = json;
    alert(json.personCount);
    
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