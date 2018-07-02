$(".login").click(function (e) {
  $.ajax({
    type: "POST",
    url: "/carrots-admin-ajax/a/login",
    data: {
      name: $("[type='text']").val(),
      pwd: $("[type='password']").val()
    },
    success: function (response) {
      response = response.trim();
      var status = JSON.parse(response);
      console.log(status);
      if (status.code != 0) {
        $(".prompt").css("color", "red");
        $(".prompt").html(status.message);
      } else if (status.code == 0) {
        $(".prompt").css("color", "green");
        $(".prompt").html(status.message);
      }
    }
  });
});


// $.post("http://localhost/carrots-admin-ajax/", data,
//   function (data, textStatus, jqXHR) {

//   },
//   "dataType"
// );