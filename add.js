function add(a, b, callback){
  var answer = a+b;
  callback(answer);
}

add(1, 2, function(result){
  console.log(result);
});
