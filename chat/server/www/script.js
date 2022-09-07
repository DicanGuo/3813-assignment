// call the function when page loaded
$( document ).ready(function(){
    $("#loginform").submit(function(event){
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost(){
        var formData = {
            email: $("#email").val(),
            password: $('#password').val()
        }
        // ajax post
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location + "api/login",
            data: JSON.stringify(formData),
            dataType: 'json',
            // change color depends on the success of post
            success: function(customer){
                if (customer.valid == true){
                    $("#loginform").removeClass("fail");
                    $("#loginform").addClass("success");
                } else {
                    $("#loginform").removeClass("success");
                    $("#loginform").addClass("fail");
                }
                $("#postResultDiv").html("<p>" + "Post Successfully <br>" + "Email Address: " + customer.email + "<br>" + "Password: " + customer.password + "<br>" + "Valid User: " + customer.valid + "</p>");
            },
            error : function(e){
                alert("Error!")
                console.log("Error: ", e);
            }
        });
        // reset after post
        resetData();
    }

    function resetData(){
        $("email").val("");
        $("password").val("");
    }
});

$( document ).ready(function() {
    console.log( "ready!" );
    });