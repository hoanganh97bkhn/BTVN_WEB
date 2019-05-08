function isEmail(inputEmail){
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(inputEmail);
}
function validatePassword(inputPassword){
    return inputPassword.length > 4;
}
$(document).ready(function (){
    let email,password;

    $('#email').change(function(){
        email = $(this).val().trim();
        if(isEmail(email)){
            $(".nof-email").text('valid email');
            $(".nof-email").css({color : "#0040FF"});
        }
        else {
            $(".nof-email").text('invalid email');
            $(".nof-email").css({color : '#FE2E2E'});
        }
    });

    $("#pwd").change(function(){
        password = $(this).val();
        console.log(password)
        if(validatePassword(password)){
            $(".nof-pwd").text('valid password');
            $(".nof-pwd").css({color : "#0040FF"});
        }
        else {
            $(".nof-pwd").text('invalid password');
            $(".nof-pwd").css({color : '#FE2E2E'});
        }
    });
    $.ajax({
        url : '/api/auth/cc',
        type : 'GET',
        
        success : (data)=>{
            console.log(data);
            // if(data.success == false) {
            //     $(".nof-error").text(data.message);
            //     $(".nof-error").css({color : '#FE2E2E'});
            // }
            // else {
            //     $(".nof-error").text(data.message);
            // }
        },
        error : (error)=>{
            throw error;
        }
    });
    $("#submit").click(function(){
        
    });
    
    

    

});