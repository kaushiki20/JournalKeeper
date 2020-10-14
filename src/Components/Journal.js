/** @format */

import React, {
	useEffect,
	useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 275,
		width: 300,
		marginTop: 45,
		marginLeft: 45,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 6,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
	},
	paper: {
		backgroundColor:
			theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 200,
	},
	tag: {
		backgroundColor: "#efefef",
		padding: "0.3em 0.5em",
		borderRadius: "0.2em",
		margin: "0 0.3em",
		height: "1em",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	span: {
		fontSize: "0.7em",
		cursor: "pointer",
		marginLeft: "0.4em",
	},
	input: {
		boxSizing: "content-box",
		// background: gray;
		texIndent: "0.5em",
		border: "none",
		height: "90%",
		width: "6em",
		outline: "0",
	},
}));

const Journal = ({ j, search }) => {
	const [data, setData] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [edit, setEdit] = useState({});
	const [
		requiredIndex,
		setRequiredIndex,
	] = useState(0);

	const classes = useStyles();
	useEffect(() => {
		if (j) {
			setData(j);
		}
		console.log(search);
	}, [j, search]);

	useEffect(() => {
		if (search) {
			if (search === "") {
				setData(j);
			} else {
				const filtered = data.filter(entry =>
					Object.values(entry).some(
						val =>
							typeof val === "string" &&
							val.includes(search)
					)
				);
				setData(filtered);
			}
		}
	}, [search]);
	//delete journal
	const handleDelete = idx => {
		const newdata = data.filter((d, index) => {
			return idx !== index;
		});
		console.log(newdata);
		setData(newdata);
		localStorage.setItem(
			"journalEntries",
			JSON.stringify(newdata)
		);
	};
	const handleOpen = idx => {
		setRequiredIndex(idx);
		setEdit(data[idx]);
		setOpen(true);
	};
	//update journal
	const handleSubmit = () => {
		const state = [...data];
		state[requiredIndex] = edit;
		setData(state);
		localStorage.setItem(
			"journalEntries",
			JSON.stringify(state)
		);
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
		console.log(data);
	};

	return (
		<div>
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}>
					{data
						.sort(
							(a, b) =>
								parseFloat(b.date) -
								parseFloat(a.date)
						)
						.map((j, idx) => {
							return (
								<Card
									className={classes.root}
									variant='outlined'>
									<CardContent>
										<Typography
											variant='h5'
											component='h2'>
											{j.name}
										</Typography>

										<Typography
											className={classes.pos}
											color='textSecondary'>
											{j.date}
										</Typography>
										<Typography
											className={classes.pos}
											color='textSecondary'>
											{j.time}
										</Typography>
									</CardContent>
									<CardActions
										style={{
											display: "flex",
											justifyContent:
												"space-around",
										}}>
										<Button
											size='small'
											onClick={() =>
												handleOpen(idx)
											}>
											edit
										</Button>
										<Button
											size='small'
											onClick={() =>
												handleDelete(idx)
											}>
											delete
										</Button>
									</CardActions>
								</Card>
							);
						})}

					<div>
						<Modal
							aria-labelledby='transition-modal-title'
							aria-describedby='transition-modal-description'
							className={classes.modal}
							open={open}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}>
							<Fade in={open}>
								<div className={classes.paper}>
									<form
										className={classes.container}
										noValidate>
										<TextField
											required
											id='standard-required'
											label='Journal'
											value={edit.name}
											onChange={e =>
												setEdit({
													...edit,
													name: e.target.value,
												})
											}
											defaultValue='Name the journal'
										/>
										<TextField
											id='date'
											label='The date'
											value={edit.date}
											onChange={e =>
												setEdit({
													...edit,
													date: e.target.value,
												})
											}
											type='date'
											defaultValue='2017-05-24'
											className={
												classes.textField
											}
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<TextField
											id='time'
											label='Alarm clock'
											type='time'
											value={edit.time}
											onChange={e =>
												setEdit({
													...edit,
													time: e.target.value,
												})
											}
											defaultValue='07:30'
											className={
												classes.textField
											}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												step: 300,
											}}
										/>

										<Button
											onClick={handleSubmit}
											variant='outlined'
											color='primary'>
											Submit
										</Button>
									</form>
								</div>
							</Fade>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Journal;
