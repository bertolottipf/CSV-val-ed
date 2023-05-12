import $ from 'jquery';


// gestione delle icone da mostrare
function lockIconsDelimiters() {
	if ($("#valdelimiter").prop("disabled") === true) {
			$("#lockDelimiters .bi-lock-fill").show();
			$("#lockDelimiters .bi-unlock-fill").hide();
	} else {
			$("#lockDelimiters .bi-unlock-fill").show();
			$("#lockDelimiters .bi-lock-fill").hide();
	}
}

function lockIconsEnclosures() {
	if ($("#valenclosure").prop("disabled")===true) {
			$("#lockEnclosures .bi-lock-fill").show();
			$("#lockEnclosures .bi-unlock-fill").hide();
	} else {
			$("#lockEnclosures .bi-unlock-fill").show();
			$("#lockEnclosures .bi-lock-fill").hide();
	}
}


// gestione lucchetti
// ...disabilita campi e controlla il carattere |
function lockEnclosures() {
	$('#lockEnclosures').click(function () {
			$("#valenclosure").val($("#dataenclosure").val());
			$("#valenclosure").prop("disabled", !$("#valenclosure").prop("disabled"));

			if ($("#valenclosure").prop("disabled") === true) {
					syncroDelimiterLookFields();

			}
			$('#enclosuresMsg .close').trigger('click');

			if ($('#valenclosure').val() === "|") {
					let msg = "if <em>enclosure</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#enclosuresMsg"), msg);
			}

			lockIconsEnclosures();
	});
}

// ...disabilita campi e controlla il carattere |
function lockDelimiters() {
	$('#lockDelimiters').click(function () {
			$("#valdelimiter").val($("#datadelimiter").val());
			$("#valdelimiter").prop("disabled", !$("#valdelimiter").prop("disabled"));

			if ($("#valdelimiter").prop("disabled") === true) {
					syncroDelimiterLookFields();
			}
			$('#delimitersMsg .close').trigger('click');

			if ($('#valdelimiter').val() === "|") {
					let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#delimitersMsg"), msg);
			}

			lockIconsDelimiters();
	})
}

// ...sincronizzazione campi enclosures bloccati
function syncroEnclosuresLookFields() {
	$('#dataenclosure').keyup(function () {
			let isDisabled = $('#valenclosure').is(':disabled')
			if (isDisabled) {
					$('#valenclosure').val($('#dataenclosure').val());
					pipeValEnclosureCheck();
			}
	});
}

// ...sincronizzazione campi delimiters bloccati
function syncroDelimiterLookFields() {
	$('#datadelimiter').keyup(function () {
			let isDisabled = $('#valdelimiter').is(':disabled')
			if (isDisabled) {
					$('#valdelimiter').val($('#datadelimiter').val());
					pipeValDelimiterCheck();
			}
	});
}

// mostro un alert nell'elemento el col messaggio msg
function showAlert(el, msg) {
	$(el).html('<div class="alert alert-info show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
}

// controllo che valdelimiter non sia | e se lo è mostro un alert
function pipeValDelimiterCheck() {

	$('#datadelimiter').keyup(function () {
			if ($('#datadelimiter').val() === "|" && $('#valdelimiter').is(':disabled')) {
					let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#delimitersMsg"), msg);
			}
	});
	$('#valdelimiter').keyup(function () {
			$('#delimitersMsg .close').trigger('click');
			if ($('#valdelimiter').val() === "|") {
					let msg = "if <em>valdelimiter</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#delimitersMsg"), msg);
			}
	});
}

// controllo che valenclosure non sia | e se lo è mostro un alert
function pipeValEnclosureCheck() {

	$('#dataenclosure').keyup(function () {
			if ($('#dataenclosure').val() === "|" && $('#valenclosure').is(':disabled')) {
					let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#enclosuresMsg"), msg);
			}
	});
	$('#valenclosure').keyup(function () {
			$('#enclosuresMsg .close').trigger('click');
			if ($('#valenclosure').val() === "|") {
					let msg = "if <em>valenclosure</em> is <em>\"|\"<em>, the validation may not work.";
					showAlert($("#enclosuresMsg"), msg);
			}
	});
}

function setReset() {
	$('input[data-default-readonly]').each(function (index) {
			$(this).prop('disabled', $(this).data('default-readonly'));
	});
	$('[data-default-open]').each(function (index) {
			//// console.log($(this));
			if ($(this).data('default-open')) {
					$(this).find('.bi-unlock-fill').hide();
					$(this).find('.bi-lock-fill').show();
			} else {
					$(this).find('.bi-unlock-fill').show();
					$(this).find('.bi-lock-fill').hide();
			}
	});
	$('.alert .close').trigger("click");

}

$(function () {
	lockIconsDelimiters();
	lockIconsEnclosures();

	lockEnclosures();
	lockDelimiters();

	syncroEnclosuresLookFields();
	syncroDelimiterLookFields();

	pipeValDelimiterCheck();
	pipeValEnclosureCheck();

})


export  { setReset }






