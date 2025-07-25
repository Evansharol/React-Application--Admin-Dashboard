import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Customers.css';

const Customers = ({ theme }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample customers data
  useEffect(() => {
    const sampleCustomers = [
      {
        id: 'E129',
        joiningDate: 'Jul 23, 2025',
        name: 'Axune Tex',
        email: 'temurbekshukurov0707@gmail.com',
        phone: '+998901234567'
      },
      {
        id: '1D3C',
        joiningDate: 'Jul 23, 2025',
        name: '3069_Ridhibrata Das',
        email: 'ridhibratadas@gmail.com',
        phone: '+919876543210'
      },
      {
        id: 'CA5D',
        joiningDate: 'Jul 23, 2025',
        name: 'Danh Nguyễn',
        email: 'contactbydanh@gmail.com',
        phone: '+84987654321'
      },
      {
        id: '2920',
        joiningDate: 'Jul 18, 2025',
        name: 'Vishnu Prasad',
        email: 'vpmoothikkal@gmail.com',
        phone: '+919123456789'
      },
      {
        id: '216D',
        joiningDate: 'Jul 18, 2025',
        name: 'ankittny',
        email: 'tny3infotech@gmail.com',
        phone: '+918765432109'
      },
      {
        id: 'A47B',
        joiningDate: 'Jul 15, 2025',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@gmail.com',
        phone: '+4412345678'
      },
      {
        id: '8F2E',
        joiningDate: 'Jul 12, 2025',
        name: 'Mike Johnson',
        email: 'mike.johnson@gmail.com',
        phone: '+14155551234'
      },
      {
        id: '5C9A',
        joiningDate: 'Jul 10, 2025',
        name: 'Emma Davis',
        email: 'emma.davis@gmail.com',
        phone: '+61234567890'
      }
    ];
    setCustomers(sampleCustomers);
    setFilteredCustomers(sampleCustomers);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase()) ||
        customer.email.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone.includes(value)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleFilter = () => {
    // Filter functionality can be enhanced here
    handleSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredCustomers(customers);
  };

  const handleViewCustomer = (customer) => {
    alert(`Viewing customer: ${customer.name}`);
  };

  const handleEditCustomer = (customer) => {
    alert(`Editing customer: ${customer.name}`);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      ));
    }
  };

  return (
    <div className={`customers-page ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="customers-container">
        <div className="customers-header">
          <h1>Customers</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="customers-filters">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by name/email/phone"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-actions">
            <button className="filter-btn" onClick={handleFilter}>Filter</button>
            <button className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-container">
          {filteredCustomers.length > 0 ? (
            <table className="customers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>JOINING DATE</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="customer-id">{customer.id}</td>
                    <td className="joining-date">{customer.joiningDate}</td>
                    <td className="customer-name">{customer.name}</td>
                    <td className="customer-email">{customer.email}</td>
                    <td className="customer-phone">{customer.phone}</td>
                    <td className="customer-actions">
                      <button 
                        className="action-btn view-btn" 
                        title="View Customer"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit Customer"
                        onClick={() => handleEditCustomer(customer)}
                        style={{
                          background: '#3b82f6 !important',
                          color: 'white !important',
                          border: 'none !important',
                          borderRadius: '6px !important',
                          width: '36px !important',
                          height: '36px !important',
                          display: 'flex !important',
                          alignItems: 'center !important',
                          justifyContent: 'center !important',
                          cursor: 'pointer !important',
                          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3) !important'
                        }}
                      >
                        <FaEdit style={{ color: 'white !important', fontSize: '16px !important' }} />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete Customer"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-customers-found">
              <div className="no-customers-content">
                <h3>No customers found</h3>
                <p>No customers match your current search criteria. Try adjusting your search or resetting the filter.</p>
                <button className="reset-search-btn" onClick={handleReset}>
                  Reset Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
