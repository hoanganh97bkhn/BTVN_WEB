$(document).ready(() =>{
    const pathname = window.location.search;
    console.log(pathname);

    $.ajax({
        url:`/get-create${pathname}`,
        type:'GET',
        success: (data) => {

        },
        error : (err) => {
            console.log(err);
        }
    })
})