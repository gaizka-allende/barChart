
Charts
=====================


Chart

Description
	Bar component represents simple Bar

Attributes

	m 				string 		
	x 				boolean		Indicates wether button is clickable. Default false
	onMouseOver		func		Event handler for mouse over event

    locale:
    	Optional
    	Default is 'de-DE'
    currency:
        Optional
    	Default is 'EUR',
    currencySign:
    	Optional
    	Default is '€',
    width:
    	Optional
    	Default is 300,
    height:
    	Optional
    	Default is 200,
    yAxisValues:
    	Optional
    	Default is ['125T', '100T', '75T', '50T', '25T', '0', '-25T'],
    unit:
    	Optional
    	Default is 25000,
    barLabelFont:
    	Optional
    	Default is '11px Arial'

Example

	Simple Chart with two bars

    <Chart className="chart-liquidity">
        <Bar className="chart__bar-desired" value={57000} />
        <Bar className="chart__bar-current" value={12234.56} />
    </Chart>



-------------------------------------


Bar

Description
	Bar component represents simple Bar

Attributes

	m 				string 		
	x 				boolean		Indicates wether button is clickable. Default false
	onMouseOver		func		Event handler for mouse over event

Example

	Simple Chart

	<Chart />
