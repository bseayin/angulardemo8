$(document).ready(function(){	
	$("#submitBtn").click(
            function () {
               
                submitblog();
            }
        )
        function submitblog() {
            var  title = $("#blogtitle").val();
            var  summary=$("#blogkind").val();
            var content = $("#content").val();
            var htmlContent = $("#htmlContent").val();
            $.ajax({
                url: "submit",
                data: {title: title,summary:summary,content:content,htmlContent:htmlContent},
                success:function () {
                    alert("发布成功");
                },
                error:function () {
                    alert("发布失败");
                }
            })
        }
});