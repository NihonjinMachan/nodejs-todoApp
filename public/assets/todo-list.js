$(document).ready(function(){
  
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {act: item.val()};

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
      var act = $(this).text().replace(/ /g, "-"); //g is global flag; replaces all blank spaces with -
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + act,
        success: function(data){
          location.reload();
        }
      });
  });

});
