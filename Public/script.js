$("#form").submit(function(event){
	event.preventDefault();
	var url = "http://localhost:3000/product";
	var value = $("#search").val();

	$.ajax({
		url:"http://localhost:3000/products/"+value,
		dataType:"json",
		success: function(DataFromJSON){
            $("#products-output").empty();
            for (var i = 0; i < DataFromJSON.length; i++) {
                $("#products-output").append("<tr>");
                $("#products-output").append("<td>" +DataFromJSON[i].name + "</td>");
                $("#products-output").append("<td>" +DataFromJSON[i].price + "</td>");
                $("#products-output").append("<td>" +DataFromJSON[i].instock + "</td>");
                $("#products-output").append("</tr>");
            }

        },
        error: function(){
            console.log("Something went wrong")
        }
    })
})