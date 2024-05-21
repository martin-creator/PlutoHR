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
      const response = await axios.get('/api/v1/employee/list');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      if (selectedEmployee) {
        const response = await axios.put(`/api/v1/employee/${selectedEmployee.employee_id}/`, newEmployee);
        const updatedEmployees = employees.map(employee =>
          employee.employee_id === selectedEmployee.employee_id ? response.data : employee
        );
        setEmployees(updatedEmployees);
        setSelectedEmployee(null);
      } else {
        const response = await axios.post('/api/v1/employee/register/', newEmployee);
        setEmployees([...employees, response.data]);
      }
      setActiveTab(0);
    } catch (error) {
      console.error('Error adding/updating employee:', error);
    }
  };
  

  const handleDeleteEmployee = async (employee_id) => {
    try {
      await axios.delete(`/api/v1/employee/detail/${employee_id}/`);
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
            <AddEmployee onSubmit={handleAddEmployee} formData={selectedEmployee} setActiveTab={setActiveTab} />
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
            <th>Job Status</th>
            <th>Department</th>
            <th>Role</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.username}</td>
              <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              <td>{employee.phone_number}</td>
              <td>{employee.job_title}</td>
              <td>{employee.job_status}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.address}</td>
              <td className='employee-action-buttons'>
                <button className='employee-edit-button' onClick={() => handleEdit(employee)}><FaEdit /></button>
                <button className='employee-delete-button' onClick={() => handleDelete(employee.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function AddEmployee({ onSubmit, formData, setActiveTab }) {
  const departmentOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Admin', label: 'Admin' },
  ];

  const jobStatusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Leave', label: 'Leave' },
    { value: 'Suspended', label: 'Suspended' },
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
    job_status: jobStatusOptions[0].value,
    department: departmentOptions[0].value,
    role: roleOptions[0].value,
    address: '',
    password: ''
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
      job_status: jobStatusOptions[0].value,
      department: departmentOptions[0].value,
      role: roleOptions[0].value,
      address: '',
      password: ''
    });
    setActiveTab(0);
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
            value={employeeData.id}
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
            required
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
          <label htmlFor='job_status'>Job Status</label>
          <select name='job_status' value={employeeData.job_status} onChange={handleChange} required>
            {jobStatusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
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
