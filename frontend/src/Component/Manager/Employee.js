import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaList, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://plutohr-yh2n.onrender.com/api/v1/employee/list/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      if (selectedEmployee) {
        const response = await axios.put(`https://plutohr-yh2n.onrender.com/api/v1/employee/detail/${selectedEmployee.id}/`, employeeData);
        const updatedEmployees = employees.map(employee =>
          employee.id === selectedEmployee.id ? response.data : employee
        );
        setEmployees(updatedEmployees);
        setSelectedEmployee(null);
      } else {
        const response = await axios.post('https://plutohr-yh2n.onrender.com/api/v1/employee/register/', employeeData);
        setEmployees([...employees, response.data]);
      }
      setActiveTab(0);
    } catch (error) {
      console.error('Error adding/updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (employee_id) => {
    try {
      await axios.delete(`https://plutohr-yh2n.onrender.com/api/v1/employee/detail/${employee_id}/`);
      const updatedEmployees = employees.filter((employee) => employee.employee_id !== employee_id);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };  

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab(1);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (index === 1 && selectedEmployee) {
      setSelectedEmployee(null);
    }
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
            <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} onEdit={handleEditEmployee} />
          </TabPanel>
          <TabPanel>
            <AddEmployee onSubmit={handleAddEmployee} formData={selectedEmployee} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Employee;

function EmployeeTable({ employees, onDelete, onEdit }) {
  
  const handleDelete = (employee_id) => {
    onDelete(employee_id);
  };

  const handleEdit = (employee) => {
    onEdit(employee);
  };

  return (
    <div className='employee-display'>
      <h4><span><FaList /></span> Employee List</h4>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Role</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employee_id}</td>
              <td>{employee.username}</td>
              <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              <td>{employee.phone_number}</td>
              <td>{employee.job_title}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.address}</td>
              <td className='employee-action-buttons'>
                <button className='employee-edit-button' onClick={() => handleEdit(employee)}><FaEdit /></button>
                <button className='employee-delete-button' onClick={() => handleDelete(employee.employee_id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddEmployee({ onSubmit, formData }) {
  const departmentOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Admin', label: 'Admin' },
  ];

  const roleOptions = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Employee', label: 'Employee' },
  ];

  const [employeeData, setEmployeeData] = useState({
    employee_id: '',
    username: '',
    email: '',
    phone_number: '',
    job_title: '',
    department: departmentOptions[0].value,
    role: roleOptions[0].value,
    address: '',
    password: '',
    photo:null,
  });

  useEffect(() => {
    if (formData) {
      setEmployeeData(formData);
    }
  }, [formData]);

  const handleChange = (event) => {
    setEmployeeData({ ...employeeData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(employeeData);
    setEmployeeData({
      employee_id: '',
      username: '',
      email: '',
      phone_number: '',
      job_title: '',
      department: departmentOptions[0].value,
      role: roleOptions[0].value,
      address: '',
      password: '',
      photo:null
    });
  };

  return (
    <form className='add-employee-form' onSubmit={handleSubmit}>
      <h4><span><FaUsers /></span>{formData ? 'Edit Employee' : 'Add Employee'}</h4>
      <hr />
      <div className='add-employee-input-container'>
        <div>
          <label htmlFor='employee_id'>EmployeeID</label>
          <input
            type='number'
            name='employee_id'
            value={employeeData.employee_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='username'>Employee Name</label>
          <input
            type='text'
            name='username'
            value={employeeData.username}
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
          <label htmlFor='phone_number'>Phone</label>
          <input
            type='text'
            name='phone_number'
            value={employeeData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={employeeData.password}
            onChange={handleChange}
            required={!formData} // Password is required only when adding a new employee
          />
        </div>
        <div>
          <label htmlFor='job_title'>Job Title</label>
          <input
            type='text'
            name='job_title'
            value={employeeData.job_title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='department'>Department</label>
          <select name='department' value={employeeData.department} onChange={handleChange} required>
            {departmentOptions.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='role'>Role</label>
          <select name='role' value={employeeData.role} onChange={handleChange} required>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
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
      <button type='submit'>{formData ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
}