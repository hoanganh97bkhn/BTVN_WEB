let table;
let urlUsers = "https://jsonplaceholder.typicode.com/users?fbclid=IwAR2d0VE0aIGJbWzHMu_klntry6EMoWpPgJLXexjWO82AEjNZ4r1xvlPV5ks";
function initTableData() {
    // let data = [
    //     {
    //         "id": 3,
    //         "name": "Clementine Bauch",
    //         "email": "Nathan@yesenia.net",
    //         "address": "Douglas Extension Suite 847",
    //         "phone": "1-463-123-4447",
    //     },
    //     {
    //         "id": 4,
    //         "name": "Chelsey Dietrich",
    //         "email": "Lucio_Hettinger@annie.ca",
    //         "address": "Skiles Walks Suite 351",
    //         "phone": "(254)954-1289",
    //     },
    //     {
    //         "id": 5,
    //         "name": "Chelsey Dietrich 22",
    //         "email": "Lucio_Hettinger@annie.ca22",
    //         "address": "Skiles Walks Suite 351 22",
    //         "phone": "(254)954-1289",
    //     }
    // ];

    $.get(urlUsers,(responData)=>{
        
        table = $('#users').DataTable({
            "processing" : false,
            data : responData,
            columns:[
                { data: 'id' },		
                { data: 'name' },
                { data: 'email' },
                { data: 'address.street' },
                { data: 'phone' },
                {data : 'phone'}
            ]
        })
    });
}
$(document).ready(function (){
	initTableData();
	$("#list-header").on({
		mouseenter: function() {
			$(this).css("background-color", "lightgray");
		},
		mouseleave: function(){
        	$(this).css("background-color", "lightblue");
    	}, 
	});
});