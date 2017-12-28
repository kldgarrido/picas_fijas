
var main_number = generate_number();
console.log(main_number);

var fijas = 0;
var number_temp = '';
var main_number_temp = '';
var picas = 0;

$( "#number" ).keydown(function(e) {
  if (e.which == 13) {
    var number = $("#number").val();
    $("#number").val('')
    if (result = validate(number)){
      show(result);  
    }
  }
});

function reset(){
  main_number = generate_number();
  console.log(main_number);
  fijas = 0;
  number_temp = '';
  main_number_temp = '';
  picas = 0;
  $('#myModal').modal('hide');
  $('tbody').children().remove();
}

function show(result){
  var line = '<tr>';
  line += '<td>' + result.numero +'</td>';
  line += '<td>' + result.picas +'</td>';
  line += '<td>' + result.fijas +'</td>';
  line += '</tr>';  
  $('tbody').append(line);

  if(result.fijas==4){
    $('#myModal').modal('show');
  }
}

function validate(number){
  if (validate_number(number)==false){
    $('span').css('color','red');
    return false;
  }
  $('span').css('color','black');
  fijas = 0;
  picas = 0;
  number_temp = '';
  main_number_temp = '';

  calculate_fijas(number);
  calculate_picas(number);

  var result = { "numero": number, "picas": picas, "fijas": fijas };
  return result;
}

function calculate_fijas(number){
  for (i = 0; i < 4; i++) { 
    if (number[i] == main_number[i]){
        fijas++;
    }
    else{
      number_temp += number[i];
      main_number_temp += main_number[i];
    }
  }
}

function calculate_picas(number){
  for (i = 0; i < number_temp.length; i++) {
    if (main_number_temp.indexOf(number_temp[i]) >= 0){
        picas++;
    } 
  }
}


function random(){
  return Math.floor(Math.random() * 9);
}

function generate_number(){
  result = '';
  for(i=0;i<4;i++){
    temp = random();
    if (result.indexOf(temp) >= 0){
        i--;
        continue;
    } 
    result += ''+temp;
  }
  return result
}


function validate_number(number) {
  if (number.length>4){
    return false;
  }

  if (validate_expresion(number) ==false) {
    return false;
  }

  if (validate_repeted_number(number) ==false) {
    return false;
  }

  return true;
}

function validate_repeted_number(number){
  for(i=0; i<4; i++){
    var temp_number = number.substring(0,i) + number.substring(i+1, number.length);
    if (temp_number.indexOf(number[i]) >= 0){
      return false;
    }
  }
  return true;
}

function validate_expresion(number){
  for(i=0; i<4; i++){
    var temp_number = number.substring(0,i) + number.substring(i+1, number.length);
    if (temp_number.indexOf(number[i]) >= 0){
      return false;
    }
  }
  return true;
}