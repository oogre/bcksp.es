$(document).ready(function(){
	$("form").validate({
		onKeyup : true,
		eachValidField : function() {
			$(this).closest('div').removeClass('has-error').addClass('has-success');
		},
		eachInvalidField : function() {
			$(this).closest('div').removeClass('has-success').addClass('has-error');
		},
		conditional : {
			confirmation : function() {
				return $(this).val() == $('#password').val();
			}
		}
	});
});