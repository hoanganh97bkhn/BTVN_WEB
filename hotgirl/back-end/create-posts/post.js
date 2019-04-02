$(document).ready(function(){
    $('#submit').click(function(){
        let title = $('#title').val();
        let content = $('#content').val();
        console.log(content);
        $.ajax({
            url : '/api/posts',
            type : 'POST',
            data: {
                title : title,
                content : content,
            },
            success : (data)=>{
                if(data.success == false) {
                    window.location.href = '/home';
                    alert('you need login');
                }
                else {

                    $('#nof-posts').text('Post success!');

                    let text = `
                  <div class="container-fluid mb-4">
                    <h4 style="color:#5183b9">${data.name}</h4>
                    <p style="color : green">${data.newPost.title}</p>
                    <p style="color : white">${data.newPost.content}</p>
                    <hr class="my-4" width="80%">
                  </div>`;
                    $('#add-news').prepend(text);
                }
            },
            error : (error)=>{
                throw error;
            },
        })
    });
});