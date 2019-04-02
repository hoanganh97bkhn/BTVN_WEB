
function isEmail(inputEmail){
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(inputEmail);
}
function validatePassword(inputPassword){
    return inputPassword.length > 4;
}

$(document).ready(function(){
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
        let firstName = $('#firstname').val().trim();
        let lastName = $('#lastname').val().trim();
        if(!firstName) $('#nof').text('firstName isnt empty!');
        else if(!lastName) $('#nof').text('lastName isnt empty!');
        else {
            $.ajax({
                url : '/api/auth/register',
                type : 'POST',
                data : {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password
                },
                success : (data)=>{
                    if(data.success == false) {
                        $('#nof').text(data.message);
                        $('#nof').css({color : '#FE2E2E'});
                    }
                    else {
                        $('#nof').text('Register success');
                        $('#nof').css({color : '#64FE2E'});
                    }
                },
                error : (error)=>{
                    throw error;
                }
            });
        }
    });
    $('#login').click(function(){
        window.location.href = '/home'
    })
});