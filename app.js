var ifQueried = false;

$("input").on("keypress",function(event){
	if(event.which === 13){
		if(ifQueried){
			$("#searchqueries").html('');
		}
		var searchQuery = $("input").val();
		$(this).val("");
		$.getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&' + '&origin=*' + '&srsearch=' + searchQuery + '&srlimit=8&format=json', function(data){
			linksData = data.query.search;
			links = new Array();
			for(var i = 0;i<linksData.length;i++){
				links.push(linksData[i])
			}
			for(var i = 0;i<links.length;i++){
				var textInfo = links[i].snippet.replace( /(<([^>]+)>)/ig, '');
				$("#searchqueries").append('<div class="ui raised segment hvr-grow" id="searchitems"><a target="_blank" href="https://en.wikipedia.org/?curid=' + String(links[i].pageid) + '">' + links[i].title + '</a><p>' + textInfo + '</p></div>');
			}
			ifQueried = true;
		});
	}
});

$("#reset").on("click",function(){
	$("#searchqueries").html('');
});
