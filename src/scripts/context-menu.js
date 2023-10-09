$(document).ready(function () {

	var idPlace;
	var place;

	// disable right click and show custom context menu
	$("div").on('contextmenu', '.divRightClick', function (e) {

		place = $(e.target);
		idPlace = $(e.target).attr('data-id') == null ? $(e.target).parent().attr('data-id') : $(e.target).attr('data-id');
		//// console.log( idPlace );

		var id = this.id;
		$("#txt_id").val(id);

		var top = e.pageY + 5;
		var left = e.pageX;

		// Show edit only if there's not noEdit class
		if ( $(this).hasClass('noEdit') ) {
			$('#edit').parent().hide();
		} else {
			$('#edit').parent().show();
		}

		// Show contextmenu
		$("#context-menu").toggle(100).css({
			top: top + "px",
			left: left + "px"
		});

		// disable default context menu
		return false;
	});

	// Hide context menu
	$(document).on('contextmenu click', function () {
		$("#context-menu").hide();
		$("#txt_id").val("");
	});

	// disable context-menu from custom menu
	$('#context-menu').on('contextmenu', function () {
		return false;
	});

	// Clicked context-menu item
	$('#context-menu li').click(function (e) {

		var idAct = $(e.target).closest('div').attr("id");

		if (idPlace != null && idPlace.split('-')[0] == "column") {
			contextMenuLocation = 'column';
			contextMenuPosition = idPlace.split('-')[1];
			if (idAct == 'delete') {
				GUI.deleteColumn(contextMenuPosition);
			} else if (idAct == 'edit') {
				GUI.showEditColumnModal(contextMenuPosition);
			}
		} else if (idPlace != null && idPlace.split('-')[0] == "row") {
			contextMenuLocation = 'regexs';
			contextMenuPositionCol = parseInt(  place.parent().parent().parent().parent().attr('data-id').split('-')[1]  );
			contextMenuPositionRow = parseInt( idPlace.split('-')[1] );
			if (idAct == 'delete') {
				GUI.deleteRow(contextMenuPositionCol, contextMenuPositionRow);
			} else if (idAct == 'edit') {
				GUI.showEditRowModal(contextMenuPositionCol, contextMenuPositionRow);
			}
		}

		$("#context-menu").hide();
	});

});
