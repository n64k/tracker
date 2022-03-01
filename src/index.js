

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
	return(
		<div className={"cell " + props.value} onClick={props.onClick}>
			<div className="dot"></div>
			
			<div className="bar-container">
			  <div className="bar-relative">
				<div className="bar"></div>
			  </div>
			</div>
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

			let foo = []
			for (let i = 0; i < rows * columns; i++) {
				foo.push({
					color: "empty"
				})
			}
			grid = foo
		}
			
		this.state = {
			cellColors: ["empty", "yellow", "orange", "red", "blue", "purple", "marker"],
			grid: grid
		}
		localStorage.setItem("grid", JSON.stringify(grid))
	}
	
	nukeGrid() {
		let emptyGrid = this.state.grid
		emptyGrid.forEach(e => e.color = "empty")
		
		this.setState({
			grid: emptyGrid
		})
		localStorage.setItem("grid", JSON.stringify(emptyGrid))
		// Why doesn’t the below work as expected?
		// localStorage.setItem("grid", JSON.stringify(this.state.grid))
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