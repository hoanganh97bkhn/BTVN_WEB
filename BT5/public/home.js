$(document).ready(() => {
    // const pathname = window.location.pathname;
    // const questionId=pathname.split('/')[pathname.split('/').length-1];
    let question;
    let temp = false;

    $('#questionOther').click(() => {
        $.ajax({
            url:'/home/reload',
            type:'GET',
            success: (data) => {
                console.log(data);
                question = data;
                if(data.id){
                    temp = true;
                    document.getElementById('question').innerText = data.content;
                    document.getElementById('true').innerText = 'Dung/Co/Phai';
                    document.getElementById('false').innerText = 'Sai/Khong/Trai';
                    document.getElementById('sum').innerText=``;
                    document.getElementById('voteYes').innerText=``;
                    document.getElementById('voteNo').innerText=``;
                }
            },
            error:(err) =>{
                console.log(err);
            },
        });
    });

    $('#true').click(() => {
        if(temp){
            $.ajax({
                url:`/get-vote?questionId=${question.id}&vote=yes`,
                type: 'GET',
                success: (data) =>{
                    if(data.id){
                        console.log(data);
                        document.getElementById('true').innerText = '(yes)';
                    }
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
                url:`/get-vote?questionId=${question.id}&vote=false`,
                type: 'GET',
                success: (data) =>{
                    if(data.id){
                        console.log(data);
                        document.getElementById('false').innerText = '(no)';
                    }
                },
                error:(err) =>{
                    Console.log(err);
                },
    
            });
            temp =false;
        }
        else {
            document.getElementById('false').innerText = 'No Success';
        }
        
    });

    console.log(question);

    // $('#voteResult').click(() => {
    //     const yes = question.yes;
    //     const no = question.no;

    //     document.getElementById('sum').innerText=`Sum : ${yes+no}`;
    //     document.getElementById('voteYes').innerText=`Yes : ${yes/(yes+no)}%`;
    //     document.getElementById('voteNo').innerText=`Sum : ${no/(yes+no)}%`;
    // })

})