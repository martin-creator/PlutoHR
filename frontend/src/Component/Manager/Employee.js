import { useEffect, useState } from 'react';
import { FaEdit, FaList, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setselectedEmployee] = useState(null)
  const [activeTab, setActiveTab] = useState(0);

  const handleAddEmployee = (newEmployee) => {
    if (selectedEmployee) {
      const updatedEmployees = employees.map(employee =>
        employee.id === selectedEmployee.id ? newEmployee : employee
      );
      setEmployees(updatedEmployees);
      setselectedEmployee(null); 
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setActiveTab(0); 
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  }; 

  const handleEditEmployee = (employee)=>{
    setselectedEmployee(employee);
    setActiveTab(1)
  }

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='employee'>
      <h3 className='employee-heading'>
        <span><FaUsers /></span>
        Employee
      </h3>

      <div className='employee-details'> 
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabList>
            <Tab><FaUsers />Employee List</Tab>
            <Tab><FaPlus />Add Employee</Tab>
          </TabList>

          <TabPanel>
            <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} onEdit={handleEditEmployee}/>
          </TabPanel>
          <TabPanel>
            <AddEmployee onSubmit={handleAddEmployee} formData={selectedEmployee} setActiveTab={setActiveTab}/>
          </TabPanel>
          
        </Tabs>   
      </div>
    </div>
  )
}

export default Employee;

function EmployeeTable({ employees, onDelete, onEdit }){
  const handleDelete = (id) => {
    onDelete(id);
  }

  const handleEdit = (employee)=>{
    onEdit(employee);
  }
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
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td><a href={`mailto: ${employee.email}`}>{employee.email}</a></td>
                  <td>{employee.tel}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.address}</td>
                  <td className='employee-action-buttons'>
                    <button className='employee-edit-button' onClick={()=>handleEdit(employee)}><FaEdit /></button>
                    <button className='employee-delete-button' onClick={()=>handleDelete(employee.id)}><FaTrash /> </button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
  )
}

function AddEmployee({ onSubmit, formData, setActiveTab}){
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

  useEffect(() => {
    if (formData) {
      setEmployeeData(formData);
    }
  }, [formData]);

  const handleChange = (event) => {
    setEmployeeData({ ...employeeData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    onSubmit(employeeData);
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
    setActiveTab(0);
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
          <h4><span><FaUsers /></span>{formData ? 'Edit Employee' : 'Add Employee'}</h4>
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
          <input type='submit' value={formData ? 'Update Employee' : 'Add Employee'} />
        </form>
  )
}