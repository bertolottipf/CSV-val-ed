class Column {
	static columns = [];

	constructor(name = "", 
			position = Column.columns.length, 
			regexs = [], 
			is_deleted = false) {
		this.name = name;
		this.position = position;
		this.regexs = regexs;
		this.is_deleted = is_deleted;
		return this;
	}

	static delete(col_n){
		var col = Column.get(col_n);
		col.is_deleted = true;
		col.regexs = [];
		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	static modify(col_n, column) {
		var col = Column.get(col_n);
		col.name = column.name;
		Column.columns[col_n] = col;
		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	static add(column) {
		Column.columns[Column.columns.length] = column;
		//// console.log(JSON.stringify( Column.columns,null, '\t' ));
	}

	static get(col_n) {
		return Column.columns[col_n];
	}

	static getAll() {
		return Column.columns;
	}
}


class Row {
	static regexs = [];

	constructor(row_n = Row.regexs.length,
			col_n = null,
			type = null,
			comparison = null,
			data = null,
			is_deleted = false){
		this.row_n = row_n;
		this.col_n = col_n;
		this.type = type;
		this.comparison = comparison;
		this.data = data;
		this.is_deleted = is_deleted;
	}

	static delete(col_n, row_n) {
		Row.get(col_n, row_n).is_deleted = true
		//Column.columns[col_n].regexs[row_n].is_deleted = true;
		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	static modify(col_n, row_n, row) {
		var r = Row.get(col_n, row_n, row);
		r.type = row.type;
		r.comparison = row.comparison;
		r.data = row.data;
		// r.is_deleted = row.is_deleted;

		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	static add(row) {
		var type = row.type;
		var comparison = row.comparison;
		var is_deleted = row.is_deleted;
		var data = row.data;
		Column.get(row.col_n).regexs.push({
				type,
				comparison,
				is_deleted,
				data
			});
		//// console.log(JSON.stringify(Column.get(row.col_n), null, '\t'));
		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	static get(col_n, row_n) {
		return Column.columns[col_n].regexs[row_n];
	}

	static getAll(col_n) {
		return Column.columns[col_n].regexs;
	}
	
}



class GUI {

	// ------- //
	// COLONNE //
	// ------- //

	// pulsante aggiuta colonna (verdino)
	static showAddColModal() {
		$('#col_add').click(function () {
			// cambio il titolo della modale
			$('#modalAddColumn').find('.modal-title').html('Add column');
			// cambio il pulsante del salvataggio
			$('#add_col_act').removeClass('d-none');
			$('#save_col_act').addClass('d-none');
			$('#modalAddColumn').modal('show');
			$('#col_position').val('');
			// imposto i valori
			$('#col_name').val('');
		});
	}

	static confirmAddCol() {
		$('#add_col_act').click(function () {
			GUI.confirmAddEditCol();
		});
	}

	// pulsante della modale di conferma aggiunta o modifica colonna
	static confirmAddEditCol(position = null) {

		// se non c'è il nome della colonna continuo a mostrare la modale e basta
		if ($('#col_name').val().trim() == "") {
			$('#req_col_name').removeClass('d-none');
			return;
		}

		// altrimenti nascondo la modale
		$('#req_col_name').addClass('d-none');
		$('#modalAddColumn').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();

		// aggiungo ad array columns il nome della colonna
		// controllando prima se mi trovo in aggiunta o in modifica
		if (position == null) {
			//// console.log("aggiungo col");

			const column = new Column(HtmlEncode($('#col_name').val()));
			Column.add(column);

			//// position = $('.column:last').data('id') === undefined ? 0 : parseInt($('.column:last').data('id').split('-')[1]) + 1;

			// inserisco la colonna
			$(`<td data-id="column-${column.position}" class="column divRightClick">\n
				${column.name}\n
			</td>`).insertBefore('#col_add_td');

			// inserisco una tabella per i validatori della colonna
			$('tr#column_validators').append(`<td data-id="column-${column.position}" class="m-0 p-0">
				<table class="column_validators_tab table">
					<thead>
						<tr>
							<th class="text-center">Type</th>
							<th class="text-center">Comparison</th>
							<th class="text-center">Data</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</td>`);

			// inserisco il pulsante per l'aggiunta dei validatori
			$('tr#column_validators_add').append(`<td class="p-0 m-0" data-id="column-${column.position}">
				<div class="col-val-add" data-target="#modalAddColValidator" role="button" data-col="${column.position}">
					<i class="bi bi-plus-circle"></i>
				</div>
			</td>`);

		} else {
			//// console.log("salva col");

			var name = HtmlEncode($('#col_name').val());
			//var position = $('#col_position').val();

			const column = new Column(name, position);

			Column.modify(position, column);

			$("table#validators tbody tr:nth-child(1)")
				.find(`td[data-id=column-${position}]`).html(name);
			$('#modalAddColumn').modal('hide');
		}

		$('#col_name').val(null);
		$('#col_position').val(null);

		//// console.log(JSON.stringify( Column.getAll(),null,'\t' ));
		
	}

	// pulsante della modale di "annulla" inserisci/modifica colonna
	static undoAddCol() {
		$('#add_col_do_nothing').click(function () {
			$('#req_col_name').addClass('d-none');

			$('#col_position').val('');
			$('#col_name').val('');

			$('#modalAddColumn').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		});
	}

	// pulsante del menù contestuale per cancellazione colonna
	static deleteColumn(position) {
		//// console.log("delete col");
		//// alert('position: ' + position);
		//Column.columns.splice(position, 1);
		
		Column.delete(position);
		$("table#validators tbody tr").find(`td[data-id=column-${position}]`).addClass('d-none');
		//// console.log(JSON.stringify(Column.columns, null, '\t'));
	}

	// pulsante del menù contestuale per modifica colonna
	static showEditColumnModal(position) {
		// cambio il titolo della modale
		$('#modalAddColumn').find('.modal-title').html('Edit column');
		// cambio il pulsante del salvataggio
		$('#add_col_act').addClass('d-none');
		$('#save_col_act').removeClass('d-none');
		$('#modalAddColumn').modal("show");
		// imposto i valori
		$('#col_position').val(position);
		$('#col_name').val(HtmlDecode(Column.columns[position].name));
	}

	// pulsante della modale di modifica colonna
	static confirmEditColumn() {
		$('#save_col_act').click(function () {
			GUI.confirmAddEditCol($('#col_position').val());
		});
	}



	// ------------------ //
	// REGOLE VALIDAZIONE //
	// ------------------ //

	// pulsante di aggiunta validazione (azzurrino)
	static showAddValidatorModal() {
		$('#validators').on('click', '.col-val-add', function () {

			// cambio il pulsante del salvataggio
			$('#save_col_val_act').addClass('d-none');
			$('#add_col_val_act').removeClass('d-none');

			$('#modalAddColumnValidator div.modal-header h5').html('Add column validator');

			// prendo la colonna corretta
			$('#col_ref').val($(this).attr('data-col'));

			const num_col = $(this).attr('data-col');
			$('#col_ref').val(num_col);
			$('#modalAddColumnValidator').modal('show');
		});
	}

	// select per la scelta del tipo di validazione
	static changeChooseValType() {
		$("#col_val_type").change(function () {
			var val = $(this).val();
			//// console.log(val);
			if (val == "L") {
				$("#fg_col_val_comparison").removeClass('d-none');
				$('#col_val_comparison').attr('required', true);
				$('#col_val_data').attr('type', 'number');
				$('#col_val_data').attr('ondrop', "return false;");
				$('#col_val_data').attr('onpaste', "return false;");
				$('#col_val_data').attr('onkeypress', "return event.charCode>=48 && event.charCode<=57");
			}
			else {
				$("#fg_col_val_comparison").addClass('d-none');
				$('#col_val_comparison').attr('required', false);
				$('#col_val_comparison').val("");
				$('#col_val_data').attr('type', 'text');
				$('#col_val_data').attr('ondrop', "");
				$('#col_val_data').attr('onpaste', "");
				$('#col_val_data').attr('onkeypress', "");
			}

			$('#fg_col_val_data').removeClass('d-none');
		});
	}

	// pulsante della modale di aggiunta validazione
	static confirmAddEditRow(n_col, n_row = null) {
		// se non c'è un valore continuo a mostrare la modale e mostro l'errore
		if ($('#col_val_type option:selected').val() === "") {
			$('#req_col_val_type').removeClass('d-none');
			////alert($('#col_val_type option:selected').val());
			return;
		} else {
			$('#req_col_val_type').addClass('d-none');
		}

		if ($('#col_val_comparison option:selected').text() === "" && $('#col_val_type option:selected').val() === "L") {
			$('#req_col_val_comparison').removeClass('d-none');
			return;
		} else {
			$('#req_col_val_comparison').addClass('d-none');
		}

		if ($('#col_val_data').val().trim() == "") {
			$('#req_col_val_data').removeClass('d-none');
			return;
		} else {
			$('#req_col_val_data').addClass('d-none');
		}

		// aggiungo ad array columns validator o corrego i dati
		//// const n_col = parseInt($('#col_ref').val());
		//// const n_row = parseInt($('#row_ref').val());
		const type = $('#col_val_type').val();
		const typeExt = $('#col_val_type :selected').text();
		const comparison = $('#col_val_comparison').val() == null ? '' : $('#col_val_comparison').val();
		const data = HtmlEncode($('#col_val_data').val());
		const is_deleted = false;
		//// console.log(JSON.stringify(Column.columns,null,'\t'));
		
		// se non è definita la riga inserisco nell'array altrimenti modifico
		if (n_row == null) {
			const row_data_id = $(`.column_validators_tab:eq(${n_col}) .rowdate:last`).data('id');
			const last_row_id =  row_data_id == undefined ? 0 : parseInt(row_data_id.split('-')[1]) + 1;
			Row.add( new Row(last_row_id, n_col, type, comparison, data, is_deleted) );
			$(`.column_validators_tab:eq(${n_col}) tbody`).append(`
				<tr data-id="row-${last_row_id}" class="divRightClick rowdate">
					<td class="text-center" data-bs-toggle="tooltip" data-bs-title="${typeExt}">${type}</td>
					<td class="text-center">${comparison === null ? '' : comparison}</td>
					<td class="text-center">${data}</td>
				</tr>`);
		} else {
			Row.modify( n_col, n_row, new Row(n_row, n_col, type, comparison, data) );
			$(`.column_validators_tab:eq(${n_col}) tbody tr[data-id=row-${n_row}] td:nth-child(1)`).attr('data-bs-title', `${ typeExt }`);
			$(`.column_validators_tab:eq(${n_col}) tbody tr[data-id=row-${n_row}] td:nth-child(1)`).html(`${ type }`);
			$(`.column_validators_tab:eq(${n_col}) tbody tr[data-id=row-${n_row}] td:nth-child(2)`).html(`${ comparison }`);
			$(`.column_validators_tab:eq(${n_col}) tbody tr[data-id=row-${n_row}] td:nth-child(3)`).html(`${ data }`);
			$('body').tooltip({
				selector: '[data-bs-toggle="tooltip"]'
			});
		}

		// nascondo la modale e la ripulisco
		$('#modalAddColumnValidator').modal('hide');
		
		$('#col_val_type').val('');
		$('#col_val_comparison').val('');
		$('#col_val_data').val('');
		$('#fg_col_val_comparison').addClass('d-none');
		$('#fg_col_val_data').addClass('d-none');

	}

	static confirmAddRow() {
		$('#add_col_val_act').click(function () {
			GUI.confirmAddEditRow( parseInt($('#col_ref').val()) );
		});
	}

	
	// pulsante della modale di modifica riga
	static confirmEditRow() {
		$('#save_col_val_act').click(function () {
			const cf = parseInt($('#col_ref').val());
			const rf = parseInt($('#row_ref').val());
			GUI.confirmAddEditRow( cf, rf );
		});
	}


	// pulsante della modale di "annulla" inserisci/modifica validazione colonna
	static undoAddRow() {
		$('#add_col_val_do_nothing').click(function () {
			$('#req_col_val_type').addClass('d-none');
			$('#req_col_val_comparison').addClass('d-none');
			$('#req_col_val_data').addClass('d-none');
			$('#fg_col_val_comparison').addClass('d-none');
			$('#fg_col_val_data').addClass('d-none');

			$('#col_val_type').val('');
			$('#col_val_comparison').val('');
			$('#col_val_data').val('');

			$('#modalAddColumnValidator').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		});
	}


	static deleteRow(positionCol, positionRow) {
		//// console.log('delete row ' + positionRow);	
		//// alert(positionCol + "-" + positionRow);
		//// console.log(   JSON.stringify(Column.getAll()[positionCol].regexs[positionRow], null, '\t')   )
		try {
			Row.delete(positionCol, positionRow);
			$(`.column_validators_tab:eq(${positionCol}) tr[data-id=row-${positionRow}]`).addClass('d-none');			
		} catch (error) {
			$(`table#spreadsheet tr td[data-id=row-${positionRow}]`).parent().remove();

			var next = positionRow+1;

			while ( $(`table#spreadsheet tr td[data-id=row-${next}]`).attr('data-id') != undefined ) {
				var value = parseInt( $(`table#spreadsheet tr td[data-id=row-${next}]`).html() ) - 1;
				$(`table#spreadsheet tr td[data-id=row-${next}]`).html( value );

				next++;
			}
		}

		
		//// console.log('delete row \n' + JSON.stringify(Column.getAll(), null, '\t'));
	}



	// function editRow(positionCol, positionRow) {
	static showEditRowModal(positionCol, positionRow) {

		// cambio il pulsante del salvataggio
		$('#add_col_val_act').addClass('d-none');
		$('#save_col_val_act').removeClass('d-none');
		
		$('#modalAddColumnValidator div.modal-header h5').html('Edit column validator');
		
		$('#modalAddColumnValidator').modal("show");

		//// console.log(Column.getAll());
		//// console.log(Column.getAll()[positionCol].regexs[positionRow]);

		// imposto i valori
		$('#col_ref').val(positionCol);
		$('#row_ref').val(positionRow);
		$('#col_val_type').val(Column.getAll()[positionCol].regexs[positionRow].type);
		$('#col_val_comparison').val(Column.getAll()[positionCol].regexs[positionRow].comparison);
		$('#col_val_data').val(HtmlDecode(Column.getAll()[positionCol].regexs[positionRow].data));

		// gestione visibilità
		if ($('#col_val_type').val() === "L") {
			$('#fg_col_val_comparison').removeClass('d-none');
		}
		if ($('#col_val_type').val() !== "") {
			$('#fg_col_val_data').removeClass('d-none');
		}
	}

}




$(function () {
	// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

	$('body').tooltip({
		selector: '[data-bs-toggle="tooltip"]'
	});
})


// ------- //
// COLONNE //
// ------- //

// pulsante aggiuta colonna (verdino)
GUI.showAddColModal();

// pulsante della modale di conferma aggiunta colonna
GUI.confirmAddCol();

// pulsante della modale di "annulla" inserisci/modifica colonna
GUI.undoAddCol();

// pulsante della modale di modifica colonna
GUI.confirmEditColumn();




// ------------------ //
// REGOLE VALIDAZIONE //
// ------------------ //

// pulsante di aggiunta validazione (azzurrino)
GUI.showAddValidatorModal();

// select per la scelta del tipo di validazione
GUI.changeChooseValType();

// pulsante della modale di aggiunta validazione
GUI.confirmAddRow();

// pulsante della modale di "annulla" inserisci/modifica validazione colonna
GUI.undoAddRow();


// pulsante della modale di modifica colonna
GUI.confirmEditRow();





function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}



$('#download_it').click(function() {
	let arr = Column.getAll();
	let text = '';
	Column.getAll().forEach(column => {
		if (!column.is_deleted) {
			column.regexs.forEach(regex => {
				if (!regex.is_deleted) {
					text += '"' + column.name + '",';
					text += '"' + regex.type + '",';
					regex.comparison != null ? text += '"' + regex.comparison + '",' : text += '"",';
					text += '"' + regex.data + '"\n';
				}
			});
		}
	});
	download("validator.csv", text);
});


function HtmlEncode(s) {
	var el = document.createElement("div");
	el.innerText = el.textContent = s;
	s = el.innerHTML;
	return s;
}

function HtmlDecode(s) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = s;
	return textArea.value;
}


// https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
