import React, { useState } from 'react';
import { FaBorderAll } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (event) => {
    setDepartmentName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (departmentName.trim() !== '') {
      if (editIndex !== null) {
        const updatedDepartments = [...departments];
        updatedDepartments[editIndex] = departmentName;
        setDepartments(updatedDepartments);
        setEditIndex(null);
      } else {
        setDepartments([...departments, departmentName]);
      }
      setDepartmentName('');
    }
  };

  const handleEdit = (index) => {
    setDepartmentName(departments[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDepartments = [...departments];
    updatedDepartments.splice(index, 1);
    setDepartments(updatedDepartments);
    if (index === editIndex) {
      setEditIndex(null);
      setDepartmentName('');
    }
  };

  return (
    <div className='department'>
      <h3 className='dept-heading'>
        <span><FaBorderAll /></span>
        Department
      </h3>
      <div className='dept-details'>
        <form className='add-dept' onSubmit={handleSubmit}>
          <h4>Add Department</h4>
          <hr />
          <label htmlFor='department'>Department Name</label>
          <input
            type='text'
            name='department'
            className='dept-name'
            value={departmentName}
            onChange={handleInputChange}
          />
          <div className='dept-btn'>
            <button type='submit' className='dept-save'><TiTick /> {editIndex !== null ? 'Update' : 'Save'}</button>
            <button type='button' className='dept-cancel' onClick={() => { setDepartmentName(''); setEditIndex(null); }}> Cancel</button>
          </div>
        </form>

        <div className='dept-display'>
          <h4>Departments</h4>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td>
                  {dept}
                </td>
                <td>
                  <button className='dept-edit-btn' onClick={() => handleEdit(index)}>Edit</button>
                  <button className='dept-delete-btn' onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            )
          )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Department;
