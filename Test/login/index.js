// function isEmail(inputEmail){
//     let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     return regex.test(inputEmail);
// }
// function validatePassword(inputPassword){
//     return inputPassword.length() > 4;
// }
$(document).ready(()=>{
    $('#email').change(function(){
        let email = $(this).val().trim();
        alert(`email = ${JSON.stringify(email)}`);
        // if(!isEmail(email)){
        //     alert(`email khong hop le`);
        // }
        // else {
        //     alert(`email = ${JSON.stringify(email)}`);
        // }
    });

    $('#password').change(()=>{
        let password = $(this).val();
    });
});