import './scss/main.scss';


$(document).ready(function() {

    $.ajax({
        url: "https://nit.tron.net.ua/api/category/list",
        dataType: "json",
        type: "GET",
        success: function(data, status) {
            let categories = "<li class=\"nav-item\"> <a id=\"1\" class=\"nav-link\" href=\"#\">All</a></li>";
            for (let i = 1; i < data.length; ++i) {
                categories += "<li class=\"nav-item\"> <a id=\"" + data[i].id + "\" class=\"nav-link\" href=\"#\">" +
                    data[i].name + "</a></li>";
            }
            categories += '<!-- Button to Open the Modal -->'+
  '<button type="button" id="cart" class="btn btn-primary" data-toggle="modal" data-target="#cartModal">' +
  	'Кошик <span class="badge badge-light"></span>'+
  '</button>';
            $("#navBar").children().html(categories);
        },
        error: function(xhr, status, error) {

        },
        complete: function(){
        	$("#navBar").find("a").click(
        function() {
        	
            if ($(this).attr("id") == 1) {
                showAll();
            } else {
            	$("#productGrid").html("");
                $.ajax({
                    url: "https://nit.tron.net.ua/api/product/list/category/" + $(this).attr("id"),
                    dataType: "json",
                    type: "GET",
                    success: function(data){
            			createCards(data);
           			 }
                });
            }

        });
        }


    });

    function createCards(data){
                        //console.log(data);
                        let cards = "";
                        for (let i = 0; i < data.length; ++i) {
                            cards += "<section class=\"productCard\">" +
                                "<img class=\"productImage\" src=\"" + data[i].image_url + "\" alt=\"" + data[i].name + "\">" +
                                "<section class=\"card-body\">" +
                                "<section class=\"cardTitle\">" + data[i].name + "</section>" +
                                "<section class=\"cardText\">" + data[i].description + "</section>" +
                                "<button class=\"btn btn-primary\">До кошика</button>" +
                                "</section>" +
                                "</section>";
                        }
                        $("#productGrid").html(cards);
                        $("#productGrid").find("button").click(
                        	function(){
                        
                        		//$(this).parent().parent().clone().prependTo("#cartModal");
                        		let clone = $(this).parent().parent().clone();
                        		clone.find("button").remove();
                        		clone.prependTo("modal-body");
                        		//$("#cartModal").find("modal-body").prepend(clone);
                        		//$("#cartModal").find("modal-body").prepend(clone);

                        		$("#cart").find("span").text(1 + Number($("#cart").find("span").text()));
                        	});
                    }
    

    function showAll() {
        $.ajax({
            url: "https://nit.tron.net.ua/api/product/list",
            dataType: "json",
            type: "GET",
            success: function(data){
            	createCards(data);
            }
        });
    }
    showAll();

});