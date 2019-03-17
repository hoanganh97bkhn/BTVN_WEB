window.onload = () => {
    document.getElementById("search").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("search");
        const form = document.getElementById("search");

        

        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${form.keyword.value}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            type:"GET",
            success: (data) => {
                console.log(data);
                document.getElementById('result-list').innerText='';
                $('#result-list').html('');
                data.items.forEach((items)=>{
                    const itemLink =
                `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${items.id.videoId}?autoplay=true" target="_blank">
                    <img src="${items.snippet.thumbnails.medium.url}" alt="">
                    <div class="video_info">
                        <h2 class="title">${items.snippet.title}</h2>
                        <p class="description">${items.snippet.description}</p>
                        <span>View >></span>
                    </div>
                </a>`
                $('#result-list').append(itemLink);

                $(window).scroll(function() {
                    if($(window).scrollTop() + $(window).height() == $(document).height()) {
                        $.ajax({
                            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`,
                            type:"GET",
                            success: (_data)=>{
                                _data.items.forEach((items)=>{
                                    const itemLink = `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${items.id.videoId}?autoplay=true" target="_blank">
                                    <img src="${items.snippet.thumbnails.medium.url}" alt="">
                                    <div class="video_info">
                                        <h2 class="title">${items.snippet.title}</h2>
                                        <p class="description">${items.snippet.description}</p>
                                        <span>View >></span>
                                    </div>
                                </a>`
                                $('#result-list').append(itemLink);
                                });
                            },
                            error: (error) =>{}
                        })
                    }
                 });
               

                });  
            },
            error: (error) => {}
          });
    });
}

