$(document).ready(function(){
  
  $('form').on('submit', function(){

      var item = $('form input[name=act]');
      var date = $('form input[name=date]').val();
      var time = $('form input[name=time]').val();
      var dateString = date + " " + time;
      var inputDate = new Date(dateString);
      var todo = {act: item.val(), time: inputDate};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;
  });

  $('li').on('click', function(){
      var act = $(this).text().split('[')[0].replace(/ /g, "-"); //g is global flag; replaces all blank spaces with -
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + act,
        success: function(data){
          location.reload();
        }
      });
  });

});
