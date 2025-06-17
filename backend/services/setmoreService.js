const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Handle node-fetch v3 ESM import
const fetchModule = fetch.default || fetch;

const SETMORE_API_KEY = process.env.SETMORE_API_KEY;
const SETMORE_BASE_URL = 'https://developer.setmore.com/api/v1';

const createSetmoreAppointment = async ({ customerName, customerPhone, customerEmail, appointmentTime, serviceType = 'Test Drive', notes }) => {
  try {
    console.log('📅 Creating Setmore appointment...');
    
    // First, create or find the customer
    const customer = await createOrFindCustomer({
      name: customerName,
      phone: customerPhone,
      email: customerEmail
    });

    if (!customer.success) {
      throw new Error('Failed to create/find customer in Setmore');
    }

    // Create the appointment
    const appointmentData = {
      start_time: appointmentTime,
      end_time: new Date(new Date(appointmentTime).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour appointment
      customer_details: {
        key: customer.customerKey
      },
      service_key: await getServiceKey(serviceType),
      staff_key: await getStaffKey('Troy'), // Default to Troy
      comment: notes || `Vehicle interest discussed via AI Agent call`
    };

    const response = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/appointments`, {
      method: 'POST',
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Setmore API error: ${response.status} - ${errorText}`);
    }

    const appointment = await response.json();
    console.log('✅ Setmore appointment created:', appointment);

    return {
      success: true,
      appointmentId: appointment.key,
      appointmentTime: appointment.start_time,
      customerKey: customer.customerKey
    };

  } catch (error) {
    console.error('❌ Setmore appointment creation failed:', error);
    return { success: false, error: error.message };
  }
};

const createOrFindCustomer = async ({ name, phone, email }) => {
  try {
    // Try to find existing customer first
    const searchResponse = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/customers?email=${encodeURIComponent(email)}`, {
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
      },
    });

    if (searchResponse.ok) {
      const customers = await searchResponse.json();
      if (customers.customers && customers.customers.length > 0) {
        return { success: true, customerKey: customers.customers[0].key };
      }
    }

    // Create new customer if not found
    const customerData = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || '',
      email_id: email,
      cell_phone: phone
    };

    const createResponse = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/customers`, {
      method: 'POST',
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create customer: ${createResponse.statusText}`);
    }

    const newCustomer = await createResponse.json();
    return { success: true, customerKey: newCustomer.key };

  } catch (error) {
    console.error('❌ Customer creation/search failed:', error);
    return { success: false, error: error.message };
  }
};

const getServiceKey = async (serviceType) => {
  try {
    const response = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/services`, {
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
      },
    });

    if (response.ok) {
      const services = await response.json();
      const service = services.services?.find(s => s.service_name.toLowerCase().includes(serviceType.toLowerCase()));
      return service?.key || services.services?.[0]?.key; // Return first service if specific not found
    }
  } catch (error) {
    console.error('❌ Error getting service key:', error);
  }
  return null;
};

const getStaffKey = async (staffName) => {
  try {
    const response = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/staff`, {
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
      },
    });

    if (response.ok) {
      const staff = await response.json();
      const staffMember = staff.staff?.find(s => s.first_name.toLowerCase().includes(staffName.toLowerCase()));
      return staffMember?.key || staff.staff?.[0]?.key; // Return first staff if specific not found
    }
  } catch (error) {
    console.error('❌ Error getting staff key:', error);
  }
  return null;
};

const getUpcomingAppointments = async (staffName = 'Troy') => {
  try {
    const staffKey = await getStaffKey(staffName);
    const today = new Date().toISOString().split('T')[0];
    
    const response = await fetchModule(`${SETMORE_BASE_URL}/bookingapi/appointments?staff_key=${staffKey}&start_date=${today}`, {
      headers: {
        'X-API-KEY': SETMORE_API_KEY,
      },
    });

    if (response.ok) {
      const appointments = await response.json();
      return { success: true, appointments: appointments.appointments || [] };
    }

    throw new Error(`Failed to fetch appointments: ${response.statusText}`);
  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createSetmoreAppointment,
  getUpcomingAppointments
};
