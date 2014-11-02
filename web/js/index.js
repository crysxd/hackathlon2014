var personData = undefined;
var currentName = undefined;

$(function() {
  $('.bubble').hide();
  $('#toolbar').hide();
  selectTab($('#tab-stats'), true);
    
});

function selectTab(elem, noAnimation) {
  var left = elem.position().left;
  var width = elem.outerWidth();
  
  if(noAnimation) {
    $('#tab-slider').css('left', left);
    $('#tab-slider').css('width', width);
    return;
    
  }
  
  $('#tab-slider').animate({left: left+'px', width: width+'px'}, 100);
  
}

$('#btn-search').click(function() {
  loadName($('#search-field').val());

});

$('#tab-stats').click(function() {
  showStats();
  
});

$('#tab-persons').click(function() {
  showPersons();

});

function showStats() {
  selectTab($('#tab-stats'));

  fadeBubblesOut(function() {

    $('.deg315 p').html(personData.min_life_span + ' Jahre');
    $('.deg315 h4').html('Kürzeste Lebenszeit');
    $('.deg0 p').html(personData.max_life_span + ' Jahre');
    $('.deg0 h4').html('Längste Lebenszeit');
    $('.deg45 p').html(Math.round(personData.life_span) + ' Jahre');
    $('.deg45 h4').html('Durchschnittliche Lebenszeit');
    $('.deg90 p').html('Jahr ' + personData.oldest_entry);
    $('.deg90 h4').html('Erste Erscheinung');
    $('.deg270 p').html(personData.personCount);
    $('.deg270 h4').html('Anzahl Personen');
    $('.deg135 h4').html('Häufigster Beruf');
    $('.deg180 h4').html('Häufigster Geburtsort');
    $('.deg225 h4').html('Häufigster Lebensort');

    if(personData.occupations.length) {
      $('.deg135 p').html(personData.occupations[0].occupation);

    } else {
      $('.deg135 p').html('--');

    }

    if(personData.place_of_birth.length) {
      $('.deg180 p').html(personData.place_of_birth[0].place_of_birth);

    } else {
      $('.deg180 p').html('--');

    }

    if(personData.place_of_activity.length) {
      $('.deg225 p').html(personData.place_of_activity[0].place_of_activity);

    } else {
      $('.deg225 p').html('--');

    }
    
    fadeBubblesIn();
    
  });
}

function showPersons() {
  selectTab($('#tab-persons'));

  fadeBubblesOut(function() {

    $('.deg315 p').html('Name hier her');
    $('.deg315 h4').html('VIP 1');
    $('.deg0 p').html('Name hier her');
    $('.deg0 h4').html('VIP 2');
    $('.deg45 p').html('Name hier her');
    $('.deg45 h4').html('VIP 3');
    $('.deg90 p').html('Name hier her');
    $('.deg90 h4').html('VIP 4');
    $('.deg270 p').html('Name hier her');
    $('.deg270 h4').html('VIP 5');
    $('.deg135 p').html('Name hier her');
    $('.deg135 h4').html('VIP 6');
    $('.deg180 p').html('Name hier her');
    $('.deg180 h4').html('VIP 7');
    $('.deg225 p').html('Name hier her');
    $('.deg225 h4').html('VIP 8');
    
    fadeBubblesIn();
    
  });
}

function fadeBubblesOut(callback) {
  var bubbleCount = $('.bubble').length;
    $('.bubble').fadeOut(300, function() {
     bubbleCount--;
     
     if(bubbleCount == 0 && typeof callback === 'function')
       callback();
     
   });
  
  /*$('.bubble').each(function(i, el) {
    setTimeout(function() {
        el.fadeOut(300);                           

    },  100*i);
  });*/
}

function fadeBubblesIn() {
   $('.bubble').fadeIn(300);
}

function loadName(name) {
  $('#btn-search').button('loading');
  currentName = name;

  fadeBubblesOut(function() {
    loadUrl('http://192.168.1.60/data.php?name=' + name, function(json) {
      personData = json;

      $('#btn-search').button('reset');
      $('#toolbar').fadeIn(300);
      selectTab($('#tab-stats'), true);

      showStats();

    });
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