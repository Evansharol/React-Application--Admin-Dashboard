import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/Staff.css';

const Staff = ({ theme }) => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Sample staff data
  useEffect(() => {
    const sampleStaff = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        contact: '360-943-7332',
        joiningDate: '23 Jul, 2025',
        role: 'Super Admin',
        status: 'Active',
        published: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Marion V. Parker',
        email: 'marion@gmail.com',
        contact: '713-675-8613',
        joiningDate: '23 Jul, 2025',
        role: 'Admin',
        status: 'Inactive',
        published: false,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b95eb09d?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 3,
        name: 'Stacey J. Meikle',
        email: 'stacey@gmail.com',
        contact: '616-738-0407',
        joiningDate: '23 Jul, 2025',
        role: 'CEO',
        status: 'Inactive',
        published: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 4,
        name: 'Shawn E. Palmer',
        email: 'shawn@gmail.com',
        contact: '949-202-2913',
        joiningDate: '23 Jul, 2025',
        role: 'Manager',
        status: 'Active',
        published: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 5,
        name: 'Corrie H. Cates',
        email: 'corrie@gmail.com',
        contact: '914-623-6873',
        joiningDate: '23 Jul, 2025',
        role: 'Accountant',
        status: 'Active',
        published: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 6,
        name: 'Alice B. Porter',
        email: 'alice@gmail.com',
        contact: '708-488-9728',
        joiningDate: '23 Jul, 2025',
        role: 'Cashier',
        status: 'Active',
        published: true,
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 7,
        name: 'Dorothy R. Brown',
        email: 'dorothy@gmail.com',
        contact: '708-628-3122',
        joiningDate: '23 Jul, 2025',
        role: 'Security Guard',
        status: 'Active',
        published: true,
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face'
      }
    ];
    setStaff(sampleStaff);
    setFilteredStaff(sampleStaff);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, roleFilter);
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    applyFilters(searchTerm, role);
  };

  const applyFilters = (search, role) => {
    let filtered = [...staff];

    if (search.trim() !== '') {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase()) ||
        member.contact.includes(search)
      );
    }

    if (role && role !== '') {
      filtered = filtered.filter(member =>
        member.role.toLowerCase() === role.toLowerCase()
      );
    }

    setFilteredStaff(filtered);
  };

  const handleFilter = () => {
    applyFilters(searchTerm, roleFilter);
  };

  const handleReset = () => {
    setSearchTerm('');
    setRoleFilter('');
    setFilteredStaff(staff);
  };

  const handleTogglePublished = (id) => {
    const updatedStaff = staff.map(member => {
      if (member.id === id) {
        return {
          ...member,
          published: !member.published,
          status: !member.published ? 'Active' : 'Inactive'
        };
      }
      return member;
    });
    setStaff(updatedStaff);
    
    // Update filtered staff as well
    const updatedFiltered = filteredStaff.map(member => {
      if (member.id === id) {
        return {
          ...member,
          published: !member.published,
          status: !member.published ? 'Active' : 'Inactive'
        };
      }
      return member;
    });
    setFilteredStaff(updatedFiltered);
  };

  const handleViewStaff = (staffMember) => {
    alert(`Viewing staff: ${staffMember.name}`);
  };

  const handleEditStaff = (staffMember) => {
    alert(`Editing staff: ${staffMember.name}`);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updatedStaff = staff.filter(member => member.id !== id);
      setStaff(updatedStaff);
      setFilteredStaff(updatedStaff.filter(member =>
        (searchTerm === '' || 
         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         member.contact.includes(searchTerm)) &&
        (roleFilter === '' || member.role.toLowerCase() === roleFilter.toLowerCase())
      ));
    }
  };

  const handleAddStaff = () => {
    alert('Add Staff functionality would open a modal here');
  };

  return (
    <div className={`staff-page ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="staff-container">
        <div className="staff-header">
          <h1>All Staff</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="staff-filters">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by name/email/phone"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="role-filter">
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value)}
              className="role-select"
            >
              <option value="">Staff Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="CEO">CEO</option>
              <option value="Manager">Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="Cashier">Cashier</option>
              <option value="Security Guard">Security Guard</option>
            </select>
          </div>

          <div className="action-buttons">
            <button className="add-staff-btn" onClick={handleAddStaff}>
              <FaPlus />
              Add Staff
            </button>
            <button className="filter-btn" onClick={handleFilter}>Filter</button>
            <button className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="staff-table-container">
          {filteredStaff.length > 0 ? (
            <table className="staff-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>CONTACT</th>
                  <th>JOINING DATE</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>PUBLISHED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id}>
                    <td className="staff-name">
                      <div className="name-cell">
                        <img src={member.avatar} alt={member.name} className="staff-avatar" />
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="staff-email">{member.email}</td>
                    <td className="staff-contact">{member.contact}</td>
                    <td className="joining-date">{member.joiningDate}</td>
                    <td className="staff-role">{member.role}</td>
                    <td className="staff-status">
                      <span className={`status-badge ${member.status.toLowerCase()}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="published-toggle">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={member.published}
                          onChange={() => handleTogglePublished(member.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </td>
                    <td className="staff-actions">
                      <button 
                        className="action-btn view-btn" 
                        title="View Staff"
                        onClick={() => handleViewStaff(member)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit Staff"
                        onClick={() => handleEditStaff(member)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete Staff"
                        onClick={() => handleDeleteStaff(member.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-staff-found">
              <div className="no-staff-content">
                <h3>No staff found</h3>
                <p>No staff members match your current search criteria. Try adjusting your search or resetting the filters.</p>
                <button className="reset-search-btn" onClick={handleReset}>
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
