$(function() {
	// (Optional) Active an item if it has the class "is-active"	
	$(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();
	
	$(".accordion > .accordion-item").click(function() {
		// Cancel the siblings
		$(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
		// Toggle the item
		$(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
	});

	$(document).on('change', '.variant-dropdown', function(e){
		console.log($(this).val());
		$('#' + $(this).val()).trigger('click');
	})
});