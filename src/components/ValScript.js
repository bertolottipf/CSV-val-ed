const ValScript = (csvData, valData) => {
	
	return (
		<script id="valScript">
			{ console.log("!!!!!!!!!!!!!!!! " + JSON.stringify(csvData)) }
			{ console.log("???????????????? " + JSON.stringify(valData)) }
			

			{/*Array.isArray(csvData) ? csvData[0].map((csvItem, csvIndex) => (
				container.append(
					getValidator(csvItem, csvIndex)
					)
				)) : ""*/}
			{
				//Array.isArray(csvData) ? console.log("è un array" + JSON.stringify(csvData)) : console.log("NON È UN ARRAY")
			}
				
		</script>
	)
}

export default ValScript;