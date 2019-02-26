import React from 'react'

//Container
import { ContainerRow, ColCard } from './../../grid/GridBootstrap'
//Reactstrap
import { Button } from 'reactstrap'
//Component
import { DataTable } from './DataTable'
import { DataModal } from './DataModal'
export class ArrObjCrudModal extends React.Component{
	state = {
		users: [],
		modal: false,
		userId: '',
		name: '',
		username: '',
		email: '',
		phone: '',
		website: ''
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => this.setState({
			users: data
		}))
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal
		})
	}

	toggleTable = (user) => {
		this.setState({
			modal: !this.state.modal,
			userId: user.id,
			name: user.name,
			username: user.username,
			email: user.email,
			phone: user.phone,
			website: user.website
		})
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	addData = (e) => {
		e.preventDefault();
		const { users } = this.state 
		const { name, username, email, phone, website } = this.state
		const newData = { 
			id: new Date(),
			name, 
			username, 
			email, 
			phone, 
			website 
		}

		if(name === '' || username === '' || email === '' || phone === '' || website === ''){
			return alert('Data Masih Ada Yang Kosong')
		}
		else{
			users.unshift(newData)	
			this.setState({
				users: users,
				modal: !this.state.modal,
				name: '',
				username: '',
				email: '',
				phone: '',
				website: ''
			})
		}
	}

	updateData = (e) => {
		const { users } = this.state
		const { userId, name, username, email, phone, website } = this.state
		const check = window.confirm('Update?')
		if(check === true){
			for(let i = 0; i < users.length; i++){
				if(users[i].id && users[i].id === userId){
					users[i].id = userId
					users[i].name = name
					users[i].username = username
					users[i].email = email
					users[i].phone = phone
					users[i].website = website
					//Update View
					this.setState({
						users: users,
						modal: !this.state.modal,
						userId: '',
						name: '',
						username: '',
						email: '',
						phone: '',
						website: ''
					})
				}
			}
		}
		else{
			return null
		}
	}

	deleteData = () => {
		const { users, userId } = this.state
		const check = window.confirm('Delete?')
		if(check === true){
			for(let i = 0; i < users.length; i++){
				if(users[i].id && users[i].id === userId){
					users.splice(i,1)
					//Update View
					this.setState({
						users: users,
						modal: !this.state.modal,
						userId: '',
						name: '',
						username: '',
						email: '',
						phone: '',
						website: ''
					})
				}
			}
		}
		else{
			return null
		}
	}

	resetForm = () => {
		this.setState({
			modal: !this.state.modal,
			userId: '',
			name: '',
			username: '',
			email: '',
			phone: '',
			website: ''
		})
	}
	render(){
		const { users, modal } = this.state
		const { userId, name, username, email, phone, website } = this.state
		const value = { userId, name, username, email, phone, website }
		return(
			<div id='ArrObjCrudModal'>
				<ContainerRow>
					<ColCard lgCol='12' mdCol='12' smCol='12' xsCol='12' brCard='mb-3' tlCard='Data Table'>
						<DataTable 
							users={users}
							toggleTable={this.toggleTable}
						/>
						<Button color='primary' onClick={this.toggleModal}> + </Button>
					</ColCard>
				</ContainerRow>
				<DataModal 
					modal={modal}
					value={value}
					toggleModal={this.toggleModal}
					toggleTable={this.toggleTable}
					onChange={this.onChange}
					addData={this.addData}
					updateData={this.updateData}
					deleteData={this.deleteData}
					resetForm={this.resetForm}
				/>
			</div>
		)
	}
}