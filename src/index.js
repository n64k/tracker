/*
 * Next steps
 * - Warning: Each child in a list should have a unique "key" prop
 * - Entire grid changing color even though indexes are correct
 * - - Fixed this, but the fix is troubling. Seems to hinge on
 * - - the nuke variable being set to false
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
	return(
		<div className={"cell " + props.value} onClick={props.onClick}>
			<div className="dot"></div>
		</div>
	)
}


let columns = 9
let rows = 7 * 2

class Grid extends React.Component {
	
	
	constructor (props) {
		super(props)
		let grid = JSON.parse(localStorage.getItem("grid"))

		if (!grid) {
			grid = new Array(rows * columns).fill({
				color: "empty",
				bar: false
			})
		}
			
		this.state = {
			cellColors: ["empty", "yellow", "orange", "red", "blue", "purple", "marker"],
			grid: grid
		}
		localStorage.setItem("grid", JSON.stringify(grid))
	}
	
	nukeGrid() {
		let emptyGrid = new Array(rows * columns).fill({
			color: "empty",
			bar: false
		})
		this.setState({
			grid: emptyGrid
		})
		localStorage.setItem("grid", JSON.stringify(emptyGrid))
	}
	
	handleClick(i) {
		let grid = this.state.grid.slice()
		let cellColors = this.state.cellColors
		
		// Cycle through colors
		let colorIndex = cellColors.indexOf(grid[i].color)
		let newColorIndex = colorIndex + 1
		if (newColorIndex >= cellColors.length) {
			newColorIndex = 0
		}
		grid[i].color = cellColors[newColorIndex]
		console.log(i)
		
		this.setState({
			grid: grid
		})
		
		localStorage.setItem("grid", JSON.stringify(grid))
	}

	renderCell(i) {
		return (
			<Cell
				value={this.state.grid[i].color}
				onClick={() => this.handleClick(i)}
				key={i}
			/>
		)
	}
	
	render() {
		return(
			<>
			<div className="grid">
				{
					this.state.grid.slice().map( (cell, i) => {	
						return this.renderCell(i)
					})
				}
			</div>
			<button className="nuke" onClick={() => this.nukeGrid()}>Nuke Grid</button>
			</>
		)
	}
}

ReactDOM.render(
	<Grid />,
	document.getElementById("root")
)



