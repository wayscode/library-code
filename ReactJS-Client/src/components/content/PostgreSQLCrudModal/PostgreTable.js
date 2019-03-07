import React from 'react'

//Reactstrap
import { Table } from 'reactstrap'
export const PostgreTable = (props) => {
	const { employees } = props
	let no = 1
	return(
		<Table hover bordered striped responsive size='sm'>
			<thead>
				<tr>
					<th> No </th>
					<th> First Name </th>
					<th> Last Name </th>
					<th> Age </th>
					<th> Gender </th>
					<th> Email </th>
					<th> Country </th>
					<th> City </th>
					<th> Address </th>
					<th> Education </th>
					<th> Join date </th>
				</tr>
			</thead>
			<tbody>
				{employees && employees.map((employee)=>{
					return(
						<tr key={employee.id} onClick={() => props.getDataRow(employee)}>
							<td> {no++} </td>
							<td> {employee.firstname} </td>
							<td> {employee.lastname} </td>
							<td> {employee.age} </td>
							<td> {employee.gender} </td>
							<td> {employee.email} </td>
							<td> {employee.country} </td>
							<td> {employee.city} </td>
							<td> {employee.address} </td>
							<td> {employee.education} </td>
							<td> {employee.joindate} </td>
						</tr>
					)
				})}
				
			</tbody>
		</Table>
	)
}