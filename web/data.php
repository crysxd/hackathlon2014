<?php
  header('Access-Control-Allow-Origin: *');

  $con = mysql_connect("localhost", "root", "");
  if($con == false) {
    echo mysql_error();
  
  }
  
  $db = mysql_select_db('persons');
  if($db == false) {
    echo mysql_error();
  
  }
  /*
   *  Durchschnittliche Lebensdauer, die Maximale und minimale Lebensdauer
   * 
   * @param count               Anzahl Einträge
   * @param avg(life_span)      Durchschnittliche Lebensdauer
   * @param max(life_span)      Höchstalter
   * @param min(life_span)      Mindestalter
   */
  $return = array();
  $name = mysql_real_escape_string($_GET['name']);
  $query = "Select count(*) as count, avg(life_span) as avg_life_span, max(life_span) as max_life_span, min(life_span) as min_life_span from persons where name like '%$name%'";
  $res = mysql_query($query);
  $row = mysql_fetch_assoc($res);
  $return['personCount'] = $row['count'];
  $return['life_span'] = $row['avg_life_span'];
  $return['max_life_span'] = $row['max_life_span'];
  $return['min_life_span'] = $row['min_life_span'];

  /*
   * 10 häufigsten Berufen und die Anzahl, wieviele diesen Beruf ausübten
   *
   * @param count         Anzahl Personen die Beruf ausüben
   * @param occupation    Beruf
   */
  $query = "select count(*) as count, occupation from persons where name like '%$name%' and occupation is not null group by occupation order by count(*) desc limit 10";
  $res = mysql_query($query);
  $return['occupations'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['occupations']);
    $occupation = urlencode ($row['occupation']);
    $return['occupations'][$index] = array();
    $return['occupations'][$index]['count'] = $row['count'];
    $return['occupations'][$index]['occupation'] = $occupation;

  }
  
  /*
   * 10 häufigste geburtsorte und anzahl an personen
   * 
   * @param count             Anzahl Personen, die an Ort geboren sind
   * @param plcae_of_birth    Geburtsort
   */
  $query = "select count(*) as count, place_of_birth from persons where name like '%$name%' and place_of_birth is not null group by place_of_birth order by count(*) desc limit 10";
  $res = mysql_query($query);
  $return['place_of_birth'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['place_of_birth']);
    $occupation = urlencode ($row['place_of_birth']);
    $return['place_of_birth'][$index] = array();
    $return['place_of_birth'][$index]['count'] = $row['count'];
    $return['place_of_birth'][$index]['place_of_birth'] = $occupation;


  }
  /*
   * 10 häufigste wohnorte und anzahl personen
   *
   * @param count                 Anzahl Personen, die an Ort wohnen
   * @param place_of_activity     Stadt
   * @param geo                   Land
   */
  $query = "select count(*) as count, place_of_activity, geo from persons where name like '%$name%' and place_of_activity is not null and geo is not null group by place_of_activity order by count(*) desc limit 10";
  $res = mysql_query($query);
  $return['place_of_activity'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['place_of_activity']);
    $occupation = urlencode ($row['place_of_activity']);
    $return['place_of_activity'][$index] = array();
    $return['place_of_activity'][$index]['count'] = $row['count'];
    $return['place_of_activity'][$index]['place_of_activity'] = $occupation;


  }

/*
 * Ältester vorhandener eintrag
 *
 * @param birth                 Geburtsjahr der Person
 * @param name                  Voller Name
 * @param place_of_activity     Stadt
 * @param geo                   Land
 */
  $query = "select birth, name, place_of_activity, geo from persons where name like '%$name%' and birth is not null order by birth asc limit 1";
  $res = mysql_query($query);
  $row = mysql_fetch_assoc($res);
  $return['oldest_entry'] = $row['birth'];


/*
 * Jahr und anzahl personen die dort geboren wurden
 *
 * @param count                 Anzahl Personen
 * @param birth                 Geburtsjahr
 */
  $query = "select count(*) as count, birth from persons where name like '%$name%' and birth is not null group by birth order by birth";
  $res = mysql_query($query);
  $return['birth'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['birth']);
    $occupation = urlencode ($row['birth']);
    $return['birth'][$index] = array();
    $return['birth'][$index]['count'] = $row['count'];
    $return['birth'][$index]['birth'] = $occupation;
  }
  /*
   * Jahr und Anzahl personen in der die meisten geboren sind
   *
   * @param count       Anzahl Personen
   * @param birth       Jahr
   */
  $query = "select count(*) as count, birth from persons where name like '%$name%' and birth is not null group by birth order by count desc limit 1";
  $res = mysql_query($query);
  $return['max_birth'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['max_birth']);
    $occupation = urlencode ($row['birth']);
    $return['max_birth'][$index] = array();
    $return['max_birth'][$index]['count'] = $row['count'];
    $return['max_birth'][$index]['birth'] = $occupation;


  }

  $query = "select name, death, place_of_birth, place_of_activity, geo, occupation, gender, life_span, birth from persons where name like '%$name%' and VIP = 'TRUE'";
  $res = mysql_query($query);
  $return['vip_info'] = array();
  while($row = mysql_fetch_assoc($res)) {
    $index = sizeof($return['vip_info']);
    $birth = urlencode ($row['birth']);
    $death = urlencode($row['death']);
    $place_of_birth = urlencode($row['place_of_birth']);
    $place_of_activity = urlencode($row['place_of_activity']);
    $geo = urlencode($row['geo']);
    $occupation = urlencode($row['occupation']);
    $gender = urlencode($row['gender']);
    $name = urlencode($row['name']);
    $life_span = urlencode($row['life_span']);
    $occupation = urlencode ($row['occupation']);
    
    $return['vip_info'][$index] = array();  
    $return['vip_info'][$index]['birth'] = $birth;
    $return['vip_info'][$index]['death'] = $death;
    $return['vip_info'][$index]['place_of_birth'] = $place_of_birth;
    $return['vip_info'][$index]['place_of_activity'] = $place_of_activity;
    $return['vip_info'][$index]['geo'] = $geo;
    $return['vip_info'][$index]['occupation'] = $occupation;
    $return['vip_info'][$index]['gender'] = $gender;
    $return['vip_info'][$index]['life_span'] = $life_span;
    $return['vip_info'][$index]['name'] = $name;
     $return['vip_info'][$index]['occupation'] = $occupation;
    


  }

  echo json_encode($return);


?>