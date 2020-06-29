/*$(function () {  
    if ($('textarea#ta').length) {
      console.log($('#ta'));
      ClassicEditor.create(document.querySelector( '#ta' ),{
        fontColor: {
            colors: [
                {
                    color: 'hsl(0, 0%, 0%)',
                    label: 'Black'
                }, ]
            },
      }).then(() => {
        console.log('editor initialized');
      }).catch((err) => {
        console.log(err);
      });
    }
  });*/

  $(function () {  
    if ($('textarea#ta').length) {
CKEDITOR.replace('ta');
    }
    $('a.confirmDeletion').on('click',function(){
        if(!confirm('confirm deletion'))
        return false;
    });

    if($("[data-fancybox]").length){
      $("[data-fancybox]").fancybox();
    }
});
