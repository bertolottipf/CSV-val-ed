import React from "react";
import './styles/Help.css';

function Help() {
	return (
		<>
			<h2>Help</h2>

			<h3>Validation</h3>
			<p>Let's assume that we have a large csv with column headings each of which has a specific request
				and we need to check the data, you can do this by setting up such a formatted csv file:</p>

			<ul>
				<li>The name of the garment (must be the same as the fields defined in the first row of the data file)</li>
				<li>choose L, R, S, SI, U, UI (Length, Regex, Choice, ChoiceIgnorecase, Equality, EqualityIgnorecase)</li>
				<li>Comparison (&lt;, &lt;=, =, &gt; =, &gt;, used only for Length</li>
				<li>Value, the value</li>
			</ul>
			<br />

			<p>Let's see an examples:</p>

			<p>
				<code>
					"name","L","&lt;","10"<br />
					"surname","L","&gt;","10"<br />
					"age","R","","\\d&#123;1, 3&#125;"<br />
					"sex","SI","","F|M"<br />
					"programmer","U","","bertolottipf"
				</code>
			</p>

			<p>
				<em>name</em> must be length less then ten characters.<br />
				<em>surname</em> also must be length less then ten characters.<br />
				<em>age</em> must have from 1 to 3 numbers.<br />
				<em>sex</em>  must be "M" or "F" but can also be in lowercase.<br />
				<em>programmer</em> must be "bertolottipf".
				</p>

			<p>
				<strong>Into the spreadsheet you can copy cells with <em>CTRL + mouse click</em> (also dropping that one) and move from cells with <em>CTRL + ALT + arrow buttons</em>.</strong> <br />
				<strong>Right click on number rows can be usefull to delete rows.</strong>
			</p>


			<h3>Validator generator</h3>

			<p><strong>Clicking "Generate new one" beside "File VAL" file selector, it's possible generate a new file validator. Right-mouse-click can be usefull to delete or edit regulars espressions and columns.</strong></p>
		</>
	);

}

export default Help;
