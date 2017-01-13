$(document).ready(function(){

  var gabarits        = $( '.gabarit' );
  var gabarit_default = $( '#gabarit0' );
  var inputs          = $( '#schnapsit input, #schnapsit select' );
  var mockup_place    = $( '[id="mockup-place"]' );
  var custom_choices  = $( '.choices' );
  var audioplaying    = false;

  /*-----------------------------------------------------------------------------*\
   *                  On cache les éléments au chargement de la page             *
  \*-----------------------------------------------------------------------------*/

   $('#result, .reg, .choice, .ifMockup').hide();

  /*
   * Check "HTML only" by default
   */

   gabarit_default.prop('checked', true);

   /*-----------------------------------------------------------------------------*\
    *                              Audio                                           *
   \*-----------------------------------------------------------------------------*/

   $('#tts1').on('ended', function() {
     $('.js-audio').val('version audio');
     audioplaying = false;
   });
   $('.js-audio').on('click', function(e) {
     if(audioplaying) {
       $(this).val('version audio');
       $('#tts1').get(0).pause();
       $('#tts1').get(0).currentTime = 0;
       audioplaying = false;
     } else {
       $(this).val('stop');
       $('#tts1').get(0).play();
       audioplaying = true;
     }
   });

  /*-----------------------------------------------------------------------------*\
   *                              Hijack link click                              *
  \*-----------------------------------------------------------------------------*/

   $('fieldset a').on('click', function(e){
     e.preventDefault();
   });

   inputs.each(function(){
    $(this).on('change', function(e){
     return false;
   });
  });

   $('body').on('click', function(){
    custom_choices.hide();
    $( '.picked' ).removeClass( 'picked' );
  });

   mockup_place.on('click',function(e) {
    e.stopPropagation();
  });

  /*-----------------------------------------------------------------------------*\
   *                               Choix du gabarit                              *
  \*-----------------------------------------------------------------------------*/

   gabarits.each(function(){

    $(this).on('click', function(e){

     var gabarit_input    = $(this).find('input');
     var gabarit_input_val = gabarit_input.val();

      /*
       * Remove custom CSS box
       */

      $('.choice').hide();

      /*
       * Remove CSS class from all items except selected
       */

      gabarits.removeClass('gabaritselected');
      $(this).addClass('gabaritselected');

      /*
       * Check selected radio
       */

      gabarit_input.prop('checked', true);

      /*
       * Si gabarit différent du "sans gabarit"
       */

      if( gabarit_input_val && gabarit_input_val != '00' ) {

        $('.ifMockup').show();
        $('textarea').hide();

        /*
         * Load HTML template
         */

         mockup_place.load( 'gabarits/' + gabarit_input_val + '.html', function( response, status, xhr ) {

           if ( status == "error" ) {
            mockup_place.html( '<p class="error">Votre template n\'a pas pu être téléchargé.</p>' );
          }

          /*
           * Function performed if load complete
           * Handle click on HTML template elements
           */

          $('.edit').each(function(e){

          /*
           * Set default values
           */

           var default_values = {
             'mar' : '',
             'pad' : 'pam',
             'lar' : 'auto',
             'txt' : 'txtleft'
           };

           for (i in default_values) {
             $( '[name="'+ i +'"][value="'+ default_values[i] +'"]' ).next( 'label' ).addClass( 'selected' );
           }

            /*
             * Customisation des éléments edit
             */

             $(this).on('click', function(e){

               var edit          = $(this);
               var leftPosition = e.pageX;
               var topPosition  = edit.offset().top + 20;
               var radio_inputs = {
                'mar' : [ 'mal', 'mam', 'mas', 'ma0' ],
                'pad' : [ 'pal', 'pam', 'pas', 'pas0' ],
                'lar' : [ 'w10', 'w20', 'w25', 'w30', 'w33', 'w40', 'w50', 'w60', 'w66', 'w70', 'w75', 'w80', 'w90', 'w100' ],
                'txt' : [ 'txtcenter', 'txtright', 'txtleft' ]
              };

              /*
               * Target picked item
               */

              $( '.picked' ).removeClass('picked');
              edit.addClass('picked');

              /*
               * Display custom box near picked item
               */

              custom_choices.show().css({
                left: leftPosition,
                top: topPosition
              });

              $.each(radio_inputs, function(index, val) {
                $( '[type=radio][name=' + index + ']' ).next('label').on('click', function() {

                 var radio         = $(this).prev('[type=radio]');
                 var radio_value   = radio.prop( 'value' );
                 var picked_element = $('.mockup-body').find('.picked');

                  /*
                   * Check correct radio button
                   */

                  radio.prop('checked', 'true');

                  /*
                   * Add CSS class to the picked element label
                   */

                  $('[type=radio][name=' + index + ']').next('label').removeClass( 'selected' );
                  $(this).addClass( 'selected' );

                  /*
                   * Add picked CSS class to the element or style attr if width:auto
                   */

                  if( radio_value == 'auto' ) {
                    picked_element.removeClass( val.join( ' ' ) ).css('width', 'auto');
                  } else {
                    picked_element.removeAttr('style').removeClass( val.join( ' ' ) ).addClass( radio_value );
                  }
                  return false;
                });
              });

              // Gérer la suppression
              custom_choices.find( '.suppression' ).on('click', function(e){
                $( '.mockup-body' ).find( '.picked' ).remove();
                custom_choices.hide();
                return false;
              });

                // Quitter
                custom_choices.find('.quit').on('click', function(e){
                  $( '.picked' ).removeClass( 'picked' );
                  custom_choices.hide();
                  return false;
                });
               return false;
             });
           });
        });
       }

      // Si gabarit "sans gabarit"
      if(gabarit_input_val == '00') {
        mockup_place.empty();

        $.post('html.php', { compression: false, googleAnalytics : $('#ga').prop('checked'), datas : $('#schnapsit').serialize() }, function(data,status){
          $('#result').show().val(data);
        });

        inputs.each(function(){
          $(this).on('change', function(e){
            return false;
          });
        });
      }
      return false;
    });
});

  /*-----------------------------------------------------------------------------*\
   *                Téléchargement du code généré et des fichiers                *
  \*-----------------------------------------------------------------------------*/

   $('#download a').on('click',function(e) {

    /*
     * Get mockup HTML
     */

     var codehtml = mockup_place.clone();

     var attr_cleanup = {
       id : {
        'mockup-header'     : 'header',
        'mockup-footer'     : 'footer',
        'mockup-main'       : 'main',
        'mockup-navigation' : 'navigation'
      },
      class : {
        'mockup-content' : 'content',
        'mockup-aside'   : 'aside'
      }
    };

    /*
     * HTML cleanup
     */

    codehtml.find( '*' ).each(function(e) {

      that = $(this);
      that.removeProp('style').removeAttr('style').removeClass('edit picked');

      $.each(attr_cleanup.id, function(index, val) {
        if( that.attr( 'id' ) === index ) {
          that.attr( 'id', val );
        }
      });

     $.each(attr_cleanup.class, function(index, val) {
        if( that.hasClass( index ) ) {
         that.addClass( val );
         that.removeClass( index );
       }
     });

    });

    codehtml = codehtml.contents().unwrap().html();

    $.post( 'html.php', { compression : true, googleAnalytics : $('#ga').prop('checked'), codehtml : codehtml, datas : $('#schnapsit').serialize() })
      .done(function(dossier) {
        document.location.href='download.php?gab='+dossier; })
      .fail(function(){
        console.log('test');
      });

     return false;
  });

});
