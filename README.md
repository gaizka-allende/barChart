
# Charts

## Chart

### Description

Chart component represents a chart

### Attributes

    locale			string		Optional. Default is 'de-DE'
    currency		string 		Optional. Default is 'EUR'
    currencySign	string 		Optional. Default is '€'
    width			number		Optional. Default is 300
    height			number 		Optional. Default is 200
    yAxisValues		array		Optional. Default is ['125T', '100T', '75T', '50T', '25T', '0', '-25T']
    unit			number 		Optional. Default is 25000
    barLabelFont	string 		Optional.Default is '11px Arial'

### Examples

	Chart with one bar

	`
    <Chart className="chart-liquidity">
        <Bar className="chart__bar-desired" value={57000} />
    </Chart>
	`

	Chart with two bars

	`
	<Chart className="chart-protection">
		<Bar className="chart__bar-desired" value={57000} />
		<Bar className="chart__bar-current" value={12234.56} />
	</Chart>
	`

## StackedBars

### Description
	Component which represents a stacked bar

### Attributes
	None

### Example

	`
	<StackedBars>
		<Bar className="chart__bar-stacked-1" value={38778} />
		<Bar className="chart__bar-stacked-2" value={9503.68} />
	</StackedBars>
	`

## Bar

### Description
	Bar component represents simple Bar

### Attributes

	className			string		Optional. A CSS selector. Use the fill property for color.
	value 				number		Required
	x					number		Required. Computed by the parent Chart component.
	zeroYCoordinate		number		Required. Computed by the parent Chart component.
	width				number		Optional. Default is 30.
	height				number		Required. Computed by the parent Chart component.
	labelPosition		string		Optional. Default value is on top of the Bar. Computed by the parent when using StackedBars component.
	labelWidth			number		Required. Computed by the parent Chart component.
	labelHeight			number		Optional. Default is 13
