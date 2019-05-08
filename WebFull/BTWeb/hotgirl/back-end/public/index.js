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
            $(".nof-email").css({color : "#64FE2E"});
        }
        else {
            $(".nof-email").text('invalid email');
            $(".nof-email").css({color : '#FE2E2E'});
        }
    });

    $("#pwd").change(function(){
        password = $(this).val();
        if(validatePassword(password)){
            $(".nof-pwd").text('valid password');
            $(".nof-pwd").css({color : "#64FE2E"});
        }
        else {
            $(".nof-pwd").text('invalid password');
            $(".nof-pwd").css({color : '#FE2E2E'});
        }
    });
    

    $("#submit").click(function(){
        $.ajax({
            url : '/api/auth/login',
            type : 'POST',
            data : {
                email : email,
                password : password
            },
            success : (data)=>{
                console.log(data);
                if(data.success == false) {
                    $(".nof-error").text(data.message);
                    $(".nof-error").css({color : '#FE2E2E'});
                }
                else {
                    window.location.href = '/posts';
                }
            },
            error : (error)=>{
                throw error;
            }
        });
    });
    $('#register').click(function(){
        window.location.href = '/register';
    })
    

    

});