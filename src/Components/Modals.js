/** @format */

import React, {
	useEffect,
	useState,
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Journal from "../Components/Journal";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
const useStyles = makeStyles(theme => ({
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
		padding: theme.spacing(1, 4, 3),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 200,
	},
}));

export default function Modals({
	open,
	handleClose,
	search,
}) {
	const classes = useStyles();

	const [data, setData] = useState({
		name: "",
		date: new Date(),
		time: "",
		//tags: [],
	});
	const [journal, setJournal] = useState([]);
	//create new journal
	const handleSubmit = () => {
		const newJournal = [...journal];
		newJournal.push(data);
		setJournal(newJournal);
		setData({
			name: "",
			date: "",
			time: "",
		});
		localStorage.setItem(
			"journalEntries",
			JSON.stringify(newJournal)
		);
	};
	useEffect(() => {
		if (localStorage == null) {
			localStorage.setItem(
				"journalEntries",
				JSON.stringify(journal)
			);
		}
	}, [journal]);

	return (
		<div>
			<Journal
				j={JSON.parse(
					localStorage.getItem("journalEntries")
				)}
				search={search}
			/>
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
						<Button
							style={{ float: "right" }}
							onClick={handleClose}>
							<CloseOutlinedIcon />
						</Button>
						<form
							className={classes.container}
							noValidate>
							<TextField
								required
								id='standard-required'
								label='Journal'
								value={data.name}
								onChange={e =>
									setData({
										...data,
										name: e.target.value,
									})
								}
								defaultValue='Name the journal'
							/>
							<TextField
								id='date'
								label='The date'
								value={data.date}
								onChange={e =>
									setData({
										...data,
										date: e.target.value,
									})
								}
								type='date'
								defaultValue='2017-05-24'
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id='time'
								label='Alarm clock'
								type='time'
								value={data.time}
								onChange={e =>
									setData({
										...data,
										time: e.target.value,
									})
								}
								defaultValue='07:30'
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300, // 5 min
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
	);
}
