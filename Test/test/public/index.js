$(document).ready(function(){
    console.log('hello');
    $.ajax({
        url : 'https://localhost:3000/api/test',
        type : 'GET',
        success : (data)=>{
            console.log(data);
        },
    })
});
