$(document).ready(function(){

	var gabarits		= $( '.gabarit' );
	var gabarit_default = $('#gabarit0');
	var inputs			= $('#schnapsit input, #schnapsit select');

	// On cache les éléments au chargement de la page
 	$('#result, .reg, .choice, .ifMockup').hide();
 	$('#ua').prev('label').hide();

 	// Check "HTML only" by default
 	gabarit_default.prop('checked', true);

 	// hijack link click
 	$('fieldset a').on('click', function(e){
 		e.preventDefault();
 	});

	inputs.each(function(){
		$(this).on('change', function(e){
			e.preventDefault();
			e.stopPropagation();
		});
	});

	// Affichage de l'input en cas de google analytics
	$('#ga').on('click', function(){
		if( $('#ga').is(':checked') ) {
			$('#ua').prev('label').show();
			$('#ua').show();
		}
		else {
			$('#ua').prev('label').hide();
			$('#ua').hide();
		}
	});

	// Choix du gabarit
	gabarits.each(function(){
		
		$(this).on('click', function(e){

			// Variables
			var gabarit_input 	  = $(this).find('input');
			var gabarit_input_val = gabarit_input.val();

			// Remove custom CSS box
			$('.choice').hide();

			// Remove CSS class from all items except selected 
			gabarits.removeClass('gabaritselected');
			$(this).addClass('gabaritselected');

			// Check selected radio
			gabarit_input.prop('checked', true);

			// Si gabarit différent du "sans gabarit"
			if( gabarit_input_val && gabarit_input_val != 'gabarit0' ) {

				$('.ifMockup').show();
				$('textarea').hide();

				$('#mockup-place').load('gabarits/' + gabarit_input_val + '.php', function(){

					$('.edit').each(function(e){

						// Customisation des éléments edit
						$(this).on('click', function(e){

							var edit = $(this);

							$('[type=radio]').each(function(e){
								if(edit.hasClass($(this).val())) {
									$(this).next('label').css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
								} 
								if(!edit.hasClass('txtcenter') && !edit.hasClass('txtright')) {
									$('[type=radio][name=txt][value=txtleft]').next('label').css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
								}
								if(!edit.hasClass('mal') && !edit.hasClass('mam') && !edit.hasClass('mas') && !edit.hasClass('ma0')) {
									$('[type=radio][name=mar][value=""]').next('label').css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
								}
								if(!edit.hasClass('pal') && !edit.hasClass('pam') && !edit.hasClass('pas') && !edit.hasClass('pa0')) {
									$('[type=radio][name=pad][value=""]').next('label').css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
								}             
								if(!edit.hasClass('w10') && !edit.hasClass('w20') && !edit.hasClass('w25') && !edit.hasClass('w30') && !edit.hasClass('w33') && !edit.hasClass('w40') && !edit.hasClass('w50') && !edit.hasClass('w60') && !edit.hasClass('w66') && !edit.hasClass('w70') && !edit.hasClass('w75') && !edit.hasClass('w80') && !edit.hasClass('w90') && !edit.hasClass('w100')) {
									$('[type=radio][name=lar][value="auto"]').next('label').css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
								}
							});

							$('.picked').removeClass('picked');
							$(this).addClass('picked');
								var leftPosition = e.pageX ; /*$(this).offset().left + 40;*/
								var topPosition = $(this).offset().top + 20;

								$('.choice').show().css({
									left: leftPosition,
									top: topPosition
								});

								// Gérer le margin 
								$('[type=radio][name=mar]').next('label').on('click', function(){
									$(this).prev('[type=radio]').prop('checked', 'true');
									var mar = $(this).prev('[type=radio]').prop('value');
									
									$('[type=radio][name=mar]').next('label').not(this).css({
										backgroundColor: 'white',
										color: '#3A3A3A'
									});
								 	$(this).css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
									$('.mockup-body').find('.picked').removeClass('mal mam mas ma0');
									$('.mockup-body').find('.picked').addClass(mar);
									return false;
								});	

								// Gérer le padding 
								$('[type=radio][name=pad]').next('label').on('click', function(){
									$(this).prev('[type=radio]').prop('checked', 'true');
									var pad = $(this).prev('[type=radio]').prop('value');
									$('[type=radio][name=pad]').next('label').not(this).css({
										backgroundColor: 'white',
										color: '#3A3A3A'
									});
								 	$(this).css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
									$('.mockup-body').find('.picked').removeClass('pal pam pas pa0');
									$('.mockup-body').find('.picked').addClass(pad);
									return false;
								});	

								// Gérer la largeur 
								$('[type=radio][name=lar]').next('label').on('click', function(){
									
									$(this).prev('[type=radio]').prop('checked', 'true');
									
									var lar = $(this).prev('[type=radio]').prop('value');
									
									$('[type=radio][name=lar]').next('label').not(this).css({
										backgroundColor: 'white',
										color: '#3A3A3A'
									});

								 	$(this).css({
										backgroundColor: '#EA3852',
										color: 'white'
									});
									if(lar == 'auto') {
										$('.mockup-body').find('.picked').removeClass('w10 w20 w25 w30 w33 w40 w50 w60 w66 w70 w75 w80 w90 w100').css('width', 'auto');
									}
									else {
										$('.mockup-body').find('.picked').removeProp('style').removeAttr('style').removeClass('w10 w20 w25 w30 w33 w40 w50 w60 w66 w70 w75 w80 w90 w100').addClass(lar);
									}
									return false;
								});
								
								// Gérer la supression 
								$('.choice').find('.supression').on('click', function(e){
									e.preventDefault();
									$('.mockup-body').find('.picked').remove();
									$('.choice').hide();
									return false;
								});

								// Gérer les alignements
								$('[type=radio][name=txt]').next('label').on('click', function(){
									$(this).prev('[type=radio]').prop('checked', 'true');
									var txt = $(this).prev('[type=radio]').prop('value');
									$('[type=radio][name=txt]').next('label').not(this).css({
										backgroundColor: 'white',
										color: '#3A3A3A'
									});

								 	$(this).css({
										backgroundColor: '#EA3852',
										color: 'white'
									});

									$('.mockup-body').find('.picked').removeClass('txtcenter txtright txtleft');
									$('.mockup-body').find('.picked').addClass(txt);
									return false;
								});	

								// Quitter 
								$('.choice').find('.quit').on('click', function(e){
									e.preventDefault();
									$('*').removeClass('picked');
									$('.choice').hide();
									return false;
								});
							return false;
						});	
					});
				});
			}
			// Si gabarit "sans gabarit"
			if(gabarit_input_val == 'gabarit0') {
				$("#generer").trigger('click');
				$('.reg').hide();
				$('#mockup-place').empty();
				$('.ifNotMockup').show();
				$('.ifMockup').hide();

				$('#monForm input, #monForm select').each(function(){	
		 			$(this).on('change', function(e){
						e.preventDefault();
						e.stopPropagation();
						$('#generer').trigger('click');
			 		});
			 	});
			}
			return false;			
		});
	});

	$('body').on('click', function(e){
		$('.choice').hide();
	});

	$("#mockup-place").on("click",function(e) {
		e.stopPropagation();
	});

	// Téléchargement du code généré et des fichiers
	$('#download').on('click',function(e) {
		e.preventDefault();

		var codehtml = $('#mockup-place').clone();

		// Nettoyage du code téléchargé par rapport à celui proposé
		codehtml.find('*').each(function(e) {
			$(this).removeProp('style').removeAttr('style').removeClass('edit grey1 grey2 grey3 grey4 picked txtchange');

			if($(this).attr('id') == 'mockup-footer'){
				$(this).attr('id', 'footer');
			}

			if($(this).attr('id') == 'mockup-header'){
				$(this).attr('id', 'header');
			}

			if($(this).attr('id') == 'mockup-navigation'){
				$(this).attr('id', 'navigation');
			}

			if($(this).attr('id') == 'mockup-main'){
				$(this).attr('id', 'main');
			}

			if($(this).hasClass('mockup-content')){
				$(this).addClass('content');
				$(this).removeClass('mockup-content')
			}

			if($(this).hasClass('mockup-aside')){
				$(this).addClass('aside');
				$(this).removeClass('mockup-aside')
			}

			if($(this).hasClass('choice')) {
				$(this).remove();
			}
		});

		codehtml = codehtml.contents().unwrap().html();

		$.post('html.php',{
			compression : true,
			googleAnalytics : $('#google-analytics').prop('checked'),
			codehtml:codehtml,
			datas : $('#monForm').serialize()
		},function(dossier) {
			if(dossier.length==16) {
				document.location.href='download.php?gab='+dossier;
			}
		},'text');

		return false;
	});

});
