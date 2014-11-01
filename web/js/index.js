var personData = undefined;
var currentName = undefined;

$(function() {
  $('.bubble').hide();

    
});

$('#btn-search').click(function() {
  loadName($('#search-field').val());

});

function loadName(name) {
  $('#btn-search').button('loading');

  $('.bubble').fadeOut(400); 
  currentName = name;

  loadUrl('http://192.168.1.93/data.php?name=' + name, function(json) {
    personData = json;

    $('.deg315 h4').html('Kürzeste Lebensdauer');
    $('.deg315 p').html(json.min_life_span + ' Jahre');
    $('.deg0 h4').html('Längste Lebensdauer');
    $('.deg0 p').html(json.max_life_span + ' Jahre');
    $('.deg45 h4').html('Durschnittliche Lebensdauer');
    $('.deg45 p').html(Math.round(json.life_span) + ' Jahre');
    $('.deg90 h4').html('Erste Erscheinung');
    $('.deg90 p').html('Jahr ' + json.oldest_entry);
    
    $('.deg135 h4').html('Häufigster Beruf');
    if(json.occupations.length) {
      $('.deg135 p').html(json.occupations[0].occupation);
      
    } else {
      $('.deg135 p').html('--');

    }
    
    $('.deg180 h4').html('Häufigster Geburtsort');
    if(json.place_of_birth.length) {
      $('.deg180 p').html(json.place_of_birth[0].place_of_birth);
      
    } else {
      $('.deg180 p').html('--');

    }
    
    $('.deg225 h4').html('Häufigster Lebensort');
      if(json.place_of_activity.length) {
      $('.deg225 p').html(json.place_of_activity[0].place_of_activity);
      
    } else {
      $('.deg225 p').html('--');

    }
    
    $('.deg270 h4').html('Anzahl Personen');
    $('.deg270 p').html(json.personCount);

    $('#btn-search').button('reset');
    $('.bubble').fadeIn(400);

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