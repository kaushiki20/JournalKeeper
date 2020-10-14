/** @format */

import React, { useState } from "react";
import Modals from "../Components/Modals";
import Button from "@material-ui/core/Button";
import Journal from "../Components/Journal";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
	fade,
	makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},

	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(
			theme.palette.common.white,
			0.15
		),
		"&:hover": {
			backgroundColor: fade(
				theme.palette.common.white,
				0.25
			),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(
			4
		)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));
const Home = () => {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = useState("");
	const classes = useStyles();
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSearch = e => {
		setSearch(e.target.value);
	};
	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					marginTop: "5vh",
				}}>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search…'
						name='search'
						type='text'
						value={search}
						onChange={handleSearch}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{
							"aria-label": "search",
						}}
					/>
				</div>
				<div>
					<Button
						style={{
							borderRadius: "5px",
						}}
						onClick={handleOpen}
						variant='outlined'
						color='primary'>
						Add New Journal
					</Button>
				</div>
			</div>
			<Journal />

			<Modals
				open={open}
				handleClose={handleClose}
				search={search}
			/>
		</div>
	);
};

export default Home;
