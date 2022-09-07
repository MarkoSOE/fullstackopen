const Notification = ({error, success}) => {
	const errorStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	const successStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	if(error === null && success === null){
		return null
	}
	else if(error){
		return (
			<div style = {errorStyle}>
				{error}
			</div>	
		)
	}
	else if(success){
		return (
			<div style={successStyle}>
				{success}
			</div>
		)
	}
  }

export default Notification