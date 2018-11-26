$(document).ready(function() {
	yonit();
	function yonit(){
		$.post("findBlog",
		          function(data){
				  $("#title").append(data.title);
		          $("#doc-content").append(data.htmlContent);
		          });
	}

});