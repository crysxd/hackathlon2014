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
  
  $('#tab-slider').animate({left: left+'px', width: width+'px'}, 400);
  
}

$('#btn-search').click(function() {
  loadName($('#search-field').val());

});

$('#search-field').keydown(function(e) {
  if(e.keyCode == 13)
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
    $('.deg315 img').attr('src', 'i315.png');
    $('.deg0 p').html(personData.max_life_span + ' Jahre');
    $('.deg0 h4').html('Längste Lebenszeit');
    $('.deg0 img').attr('src', 'i0.png');
    $('.deg45 p').html(Math.round(personData.life_span) + ' Jahre');
    $('.deg45 h4').html('Durchschnitts Lebenszeit');
    $('.deg45 img').attr('src', 'i45.png');
    $('.deg90 p').html('Jahr ' + personData.oldest_entry);
    $('.deg90 h4').html('Erste Erscheinung');
    $('.deg90 img').attr('src', 'i90.png');
    $('.deg270 p').html(personData.personCount);
    $('.deg270 h4').html('Anzahl Personen');
    $('.deg270 img').attr('src', 'i270.png');
    $('.deg135 h4').html('Häufigster Beruf');
    $('.deg135 img').attr('src', 'i135.png');
    $('.deg180 h4').html('Häufigster Geburtsort');
    $('.deg180 img').attr('src', 'i180.png');
    $('.deg225 h4').html('Häufigster Lebensort');
    $('.deg225 img').attr('src', 'i225.png');

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
  if(personData.vip_info.length <= 0) {
    alert("Leider wurden keine VIPs gefunden");
    return;
    
  }
  
  selectTab($('#tab-persons'));

  fadeBubblesOut(function() {
    console.log(personData.vip_info);
    $('.deg315 p').html(personData.vip_info[0].birth);
    $('.deg315 h4').html(decode(personData.vip_info[0].name));
    $('.deg315 img').attr('src', 'p315.jpg');
    $('.deg0 p').html(personData.vip_info[1].birth);
    $('.deg0 h4').html(decode(personData.vip_info[1].name));
    $('.deg0 img').attr('src', 'p0.jpg');
    $('.deg45 p').html(personData.vip_info[2].birth);
    $('.deg45 h4').html(decode(personData.vip_info[2].name));
    $('.deg45 img').attr('src', 'p45.jpg');
    $('.deg90 p').html(personData.vip_info[3].birth);
    $('.deg90 h4').html(decode(personData.vip_info[3].name));
    $('.deg90 img').attr('src', 'p90.jpg');
    $('.deg270 p').html(personData.vip_info[4].birth);
    $('.deg270 h4').html(decode(personData.vip_info[4].name));
    $('.deg270 img').attr('src', 'p270.jpg');
    $('.deg135 p').html(personData.vip_info[5].birth);
    $('.deg135 h4').html(decode(personData.vip_info[5].name));
    $('.deg135 img').attr('src', 'p135.jpg');
    $('.deg180 p').html(personData.vip_info[6].birth);
    $('.deg180 h4').html(decode(personData.vip_info[6].name));
    $('.deg180 img').attr('src', 'p180.jpg');
    $('.deg225 p').html(personData.vip_info[7].birth);
    $('.deg225 h4').html(decode(personData.vip_info[7].name));
    $('.deg225 img').attr('src', 'p225.jpg');

    fadeBubblesIn();
    
  });
}

function decode(str) {
  console.log(str);
  return decodeURIComponent((str+'')).replace(/\+/g, '<br>');
  
}

function fadeBubblesOut(callback) {
  var bubbleCount = $('.bubble').length;
    $('.bubble').fadeOut(400, function() {
     bubbleCount--;
     
     if(bubbleCount == 0 && typeof callback === 'function')
       callback();
     
   });
  /*$('.bubble').each(function(i, e) {
    e.fadeOut(300);                  
                  
  });*/
}

function fadeBubblesIn() {
   $('.bubble').fadeIn(300);
}

function loadName(name) {
  $('#btn-search').button('loading');
  selectTab($('#tab-stats'));
  currentName = name;

  fadeBubblesOut(function() {
    loadUrl('data.php?name=' + name, function(json) {
      personData = json;

      $('#heading').fadeOut(400, function() {
        $('#btn-search').button('reset');
        $('#toolbar').fadeIn(400);
        selectTab($('#tab-stats'), true);

        showStats();
      });
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