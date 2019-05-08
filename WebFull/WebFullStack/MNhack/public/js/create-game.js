window.onload = ()=>{
    const form = document.getElementById('create-game-form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const players = [
            form.player1.value,
            form.player2.value,
            form.player3.value,
            form.player4.value
        ]
    });
    $.ajax({
        type:'POST',
        url : '/api/games',
        data : {
            players : players,
        },
        success : (data)=>{},
        error : (err)=>{},
    })
}