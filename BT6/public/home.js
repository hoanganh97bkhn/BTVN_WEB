$(document).ready(() => {
    let question;
    let temp = false;

    $('#questionOther').click(() => {
        $.ajax({
            url:'/home/reload',
            type:'GET',
            success: (data) => {
                
                    question = data;
                    temp = true;
                    document.getElementById('question').innerText = data.content;
                    document.getElementById('true').innerText = 'Dung/Co/Phai';
                    document.getElementById('false').innerText = 'Sai/Khong/Trai';
            },
            error:(err) =>{
                console.log(err);
            },
        });
    });

    $('#true').click(() => {
        if(temp){
            $.ajax({
                url:`/get-vote?questionId=${question._id}&vote=yes`,
                type: 'GET',
                success: (data) =>{
                        console.log(data);
                        document.getElementById('true').innerText = '(yes)';
                },
                error:(err) =>{
                    console.log(err);
                },
    
            });
            temp = false;
        }
        else {
            document.getElementById('true').innerText = 'No Success';
        }
        
    });

    $('#false').click(() => {
        if(temp){
            $.ajax({
                url:`/get-vote?questionId=${question._id}&vote=false`,
                type: 'GET',
                success: (data) =>{
                        console.log(data);
                        document.getElementById('false').innerText = '(no)';
                },
                error:(err) =>{
                    console.log(err);
                },
    
            });
            temp =false;
        }
        else {
            document.getElementById('false').innerText = 'No Success';
        }
        
    });

    console.log(question);


})