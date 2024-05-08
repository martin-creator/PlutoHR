import { useState } from 'react';
import { FaEdit, FaList, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';

const Employee = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEmployeeList, setShowEmployeeList] = useState(true);
  const [employees, setEmployees] = useState([]);

  const toggleAddEmployee = ()=>{
    setShowAddEmployee(!showAddEmployee);
    setShowEmployeeList(false)
  }

  const toggleEmployeeList = ()=>{
    setShowEmployeeList(!showEmployeeList);
    setShowAddEmployee(false)
  }

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]); 
    setShowAddEmployee(false);
  };

  const handleEmployeeListOpen = ()=>{
    setShowEmployeeList(true)
  }

  return (
    <div className='employee'>
      <h3 className='employee-heading'>
        <span><FaUsers /></span>
        Employee
      </h3>
      <div className='employee-details'> 
        <div className='employee-buttons'>
          <button 
            className='add-employee-button' 
            onClick={toggleAddEmployee}
            disabled={showAddEmployee}
          > <FaPlus /> Add Employee</button>
          <button 
            className='employee-list-button' 
            onClick={toggleEmployeeList}
            disabled={showEmployeeList}
          > <FaList /> Employee List</button>
        </div>    
        {showEmployeeList ? <EmployeeTable employees={employees} /> : null} 
        {showAddEmployee ? <AddEmployee onSubmit={handleAddEmployee} onEmployeeAdd={handleEmployeeListOpen} /> : null} 
      </div>
    </div>
  )
}

export default Employee;

function EmployeeTable({ employees }){
  return(
    <div className='employee-display'>
          <h4><span><FaList /></span> Employee List</h4>
          <table >
            <thead>
            <tr>
              <th>EmployeeID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              employees.map((employee)=>(
                <tr key={employees.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td><a href={`mailto: ${employee.email}`}>{employee.email}</a></td>
                  <td>{employee.tel}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.address}</td>
                  <td className='employee-action-buttons'>
                    <button className='employee-edit-button'><FaEdit /></button>
                    <button className='employee-delete-button'><FaTrash /> </button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
  )
}

function AddEmployee({ onSubmit, onEmployeeAdd }){
  const [employeeData, setEmployeeData] = useState({
    id: '',
    name: '',
    email: '',
    tel: '',
    position: '',
    department: '',
    gender: '',
    address: '',
  });

  const handleChange = (event) => {
    setEmployeeData({ ...employeeData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    onSubmit(employeeData);
    onEmployeeAdd();
    setEmployeeData({
      id: '',
      name: '',
      email: '',
      tel: '',
      position: '',
      department: '',
      gender: '',
      address: '',
    })

  }

  const departmentOptions = [
    { value: 'Software', label: 'Software' },
    { value: 'Accounts', label: 'Accounts' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Drilling', label: 'Drilling' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return(
    <form className='add-employee-form' onSubmit={handleSubmit}>
          <h4><span><FaUsers /></span>Add Employee</h4>
          <hr />
          <div className='add-employee-input-container'>
            <div>
              <label htmlFor='id'>EmployeeID</label>
              <input
                type='number'
                name='id'
                value={employeeData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='name'>Employee Name</label>
              <input
                type='text'
                name='name'
                value={employeeData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='tel'>Phone</label>
              <input
                type='tel'
                name='tel'
                value={employeeData.tel}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='position'>Position</label>
              <input
                type='text'
                name='position'
                value={employeeData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='department'>Department</label>
              <select name='department' value={employeeData.department} onChange={handleChange} required>
                {departmentOptions.map((dept)=>(
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='gender'>Gender</label>
              <select name='gender' value={employeeData.gender} onChange={handleChange} required>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                value={employeeData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <input type='submit' value="Add Employee" />
        </form>
  )
}