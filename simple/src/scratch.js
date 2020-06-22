var login;
var api="";
var apikey="";
function setup()
{
    var button=select('#submit');
    button.mousePessed(perfomtask);
    input=select('#email');

}
function performtask()
{
    var url=api+input.value();+apikey;
    loadJSON(url,gotData);
}
function gotData()
{
    login=data;
}
function Draw()
{
    if(login)
    {

    }
}