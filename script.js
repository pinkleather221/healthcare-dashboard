// Fixed updateDiagnosticList function to correctly render diagnostic list
function updateDiagnosticList(patient) {
  const diagnosticList = document.getElementById('diagnostic-list');
  diagnosticList.innerHTML = '';
  
  document.getElementById('loading-diagnostics').style.display = 'block';
  
  setTimeout(() => {
    if (patient.diagnosticList && patient.diagnosticList.length > 0) {
      patient.diagnosticList.forEach(diagnosis => {
        const row = document.createElement('tr');
        
        // Create status class based on status text
        let statusClass = 'status-normal';
        if (diagnosis.status.toLowerCase().includes('active')) {
          statusClass = 'status-active';
        } else if (diagnosis.status.toLowerCase().includes('observation')) {
          statusClass = 'status-observation';
        } else if (diagnosis.status.toLowerCase().includes('cured') || diagnosis.status.toLowerCase().includes('inactive')) {
          statusClass = 'status-cured';
        }
        
        row.innerHTML = `
          <td>${diagnosis.problem}</td>
          <td>${diagnosis.description}</td>
          <td><span class="status ${statusClass}">${diagnosis.status}</span></td>
        `;
        
        diagnosticList.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3" class="no-data">No diagnostic data available</td>';
      diagnosticList.appendChild(row);
    }
    
    document.getElementById('loading-diagnostics').style.display = 'none';
  }, 300); // Small timeout for better user experience
}
// Update doctor information in the header
function updateDoctorInfo(doctor) {
  document.getElementById('doctor-name').textContent = doctor.name;
  document.getElementById('doctor-role').textContent = doctor.role;
  
  const doctorAvatar = document.getElementById('doctor-avatar');
  if (doctorAvatar && doctor.profilePicture) {
    doctorAvatar.src = doctor.profilePicture;
  }
}

// Populate the patient list in the sidebar
function populatePatientList(patients) {
  const patientList = document.getElementById('patient-list');
  patientList.innerHTML = '';
  
  patients.forEach(patient => {
    const patientItem = document.createElement('li');
    patientItem.className = 'patient-item';
    patientItem.dataset.patientId = patient.id;
    
    patientItem.innerHTML = `
      <img src="${patient.profilePicture}" alt="${patient.name}" class="patient-avatar">
      <div class="patient-info">
        <span class="patient-name">${patient.name}</span>
        <span class="patient-details">${patient.gender}, ${patient.age}</span>
      </div>
    `;
    
    patientItem.addEventListener('click', () => selectPatient(patient.id));
    patientList.appendChild(patientItem);
  });
}

// Setup patient search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById('patient-search');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    const patientItems = document.querySelectorAll('.patient-item');
    patientItems.forEach(item => {
      const patientName = item.querySelector('.patient-name').textContent.toLowerCase();
      const patientDetails = item.querySelector('.patient-details').textContent.toLowerCase();
      
      if (patientName.includes(searchTerm) || patientDetails.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Setup time range selector for the chart
function setupTimeRangeSelector() {
  const timeRange = document.getElementById('time-range');
  
  timeRange.addEventListener('change', () => {
    if (selectedPatient) {
      updateBloodPressureChart(selectedPatient);
    }
  });
}

// Select a patient and update the UI
function selectPatient(patientId) {
  // Find the patient in our data
  selectedPatient = patientData.patients.find(p => p.id === patientId);
  if (!selectedPatient) return;
  
  // Highlight the selected patient in the sidebar
  const patientItems = document.querySelectorAll('.patient-item');
  patientItems.forEach(item => {
    if (parseInt(item.dataset.patientId) === patientId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Update patient profile information
  updatePatientProfile(selectedPatient);
  
  // Update diagnostic list
  updateDiagnosticList(selectedPatient);
  
  // Update blood pressure chart
  updateBloodPressureChart(selectedPatient);
  
  // Update vital signs
  updateVitalSigns(selectedPatient);
  
  // Update lab results
  updateLabResults(selectedPatient);
}

// Update the patient profile section
function updatePatientProfile(patient) {
  document.getElementById('selected-patient-name').textContent = patient.name;
  document.getElementById('selected-patient-avatar').src = patient.profilePicture;
  document.getElementById('patient-dob').textContent = patient.dateOfBirth;
  document.getElementById('patient-gender').textContent = patient.gender;
  document.getElementById('patient-phone').textContent = patient.phoneNumber;
  document.getElementById('patient-emergency').textContent = patient.emergencyContact;
  document.getElementById('patient-insurance').textContent = patient.insurance;
}

// Update the diagnostic list table
function updateDiagnosticList(patient) {
  const diagnosticList = document.getElementById('diagnostic-list');
  diagnosticList.innerHTML = '';
  
  document.getElementById('loading-diagnostics').style.display = 'block';
  
  setTimeout(() => {
    if (patient.diagnosticList && patient.diagnosticList.length > 0) {
      patient.diagnosticList.forEach(diagnosis => {
        const row = document.createElement('tr');
        
        // Create status class based on status text
        let statusClass = 'status-normal';
        if (diagnosis.status.toLowerCase().includes('active')) {
          statusClass = 'status-active';
        } else if (diagnosis.status.toLowerCase().includes('observation')) {
          statusClass = 'status-observation';
        } else if (diagnosis.status.toLowerCase().includes('cured') || diagnosis.status.toLowerCase().includes('inactive')) {
          statusClass = 'status-cured';
        }
        
        row.innerHTML = `
          <td>${diagnosis.problem}</td>
          <t// Patient Data Service
const patientDataService = {
  // API Configuration
  apiConfig: {
    baseUrl: 'https://fedskillstest.coalitiontechnologies.workers.dev',
    auth: {
      username: 'coalition',
      password: 'skills-test'
    },

  // Get doctor information
  getDoctorInfo: async function() {
    try {
      const response = await fetch(`${this.apiConfig.baseUrl}/doctor`, {
        method: 'GET',
        headers: this.apiConfig.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching doctor information:', error);
      // Return fallback doctor info
      return {
        name: "Dr. Sarah Miller",
        role: "Primary Care Physician",
        profilePicture: "/images/doctor.jpg"
      };
    }
  }
};

// Main dashboard functionality
// Global variables
let patientData = {};
let selectedPatient = null;
let bpChart = null;

// Fetch all required data
async function fetchPatientData() {
  try {
    // Get doctor information
    const doctorInfo = await patientDataService.getDoctorInfo();
    
    // Get all patients
    const patients = await patientDataService.getAllPatients();
    
    // Combine data
    return {
      doctor: doctorInfo,
      patients: patients
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Fallback to mock data if API fails
    return {
      doctor: {
        name: "Dr. Sarah Miller",
        role: "Primary Care Physician",
        profilePicture: "/images/doctor.jpg"
      },
      patients: patientDataService.getMockPatients()
    };
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Display loading indicators
  document.getElementById('loading-patients').style.display = 'block';
  
  try {
    // Fetch patient data from API
    patientData = await fetchPatientData();
    
    // Update doctor information
    updateDoctorInfo(patientData.doctor);
    
    // Populate patient list
    populatePatientList(patientData.patients);
    
    // Search functionality
    setupSearchFunctionality();
    
    // Time range selector for chart
    setupTimeRangeSelector();
    
    // Select first patient by default
    if (patientData.patients.length > 0) {
      selectPatient(patientData.patients[0].id);
    }
  } catch (error) {
    console.error('Failed to initialize dashboard:', error);
    alert('There was an error loading the dashboard. Please try again later.');
  } finally {
    // Hide loading indicator
    document.getElementById('loading-patients').style.display = 'none';
  }
});

// Update doctor information in the header
function updateDoctorInfo(doctor) {
  document.getElementById('doctor-name').textContent = doctor.name;
  document.getElementById('doctor-role').textContent = doctor.role;
  
  const doctorAvatar = document.getElementById('doctor-avatar');
  if (doctorAvatar && doctor.profilePicture) {
    doctorAvatar.src = doctor.profilePicture;
  }
}

// Populate the patient list in the sidebar
function populatePatientList(patients) {
  const patientList = document.getElementById('patient-list');
  patientList.innerHTML = '';
  
  patients.forEach(patient => {
    const patientItem = document.createElement('li');
    patientItem.className = 'patient-item';
    patientItem.dataset.patientId = patient.id;
    
    patientItem.innerHTML = `
      <img src="${patient.profilePicture}" alt="${patient.name}" class="patient-avatar">
      <div class="patient-info">
        <span class="patient-name">${patient.name}</span>
        <span class="patient-details">${patient.gender}, ${patient.age}</span>
      </div>
    `;
    
    patientItem.addEventListener('click', () => selectPatient(patient.id));
    patientList.appendChild(patientItem);
  });
}

// Setup patient search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById('patient-search');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    const patientItems = document.querySelectorAll('.patient-item');
    patientItems.forEach(item => {
      const patientName = item.querySelector('.patient-name').textContent.toLowerCase();
      const patientDetails = item.querySelector('.patient-details').textContent.toLowerCase();
      
      if (patientName.includes(searchTerm) || patientDetails.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Setup time range selector for the chart
function setupTimeRangeSelector() {
  const timeRange = document.getElementById('time-range');
  
  timeRange.addEventListener('change', () => {
    if (selectedPatient) {
      updateBloodPressureChart(selectedPatient);
    }
  });
}

// Select a patient and update the UI
function selectPatient(patientId) {
  // Find the patient in our data
  selectedPatient = patientData.patients.find(p => p.id === patientId);
  if (!selectedPatient) return;
  
  // Highlight the selected patient in the sidebar
  const patientItems = document.querySelectorAll('.patient-item');
  patientItems.forEach(item => {
    if (parseInt(item.dataset.patientId) === patientId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Update patient profile information
  updatePatientProfile(selectedPatient);
  
  // Update diagnostic list
  updateDiagnosticList(selectedPatient);
  
  // Update blood pressure chart
  updateBloodPressureChart(selectedPatient);
  
  // Update vital signs
  updateVitalSigns(selectedPatient);
  
  // Update lab results
  updateLabResults(selectedPatient);
}

// Update the patient profile section
function updatePatientProfile(patient) {
  document.getElementById('selected-patient-name').textContent = patient.name;
  document.getElementById('selected-patient-avatar').src = patient.profilePicture;
  document.getElementById('patient-dob').textContent = patient.dateOfBirth;
  document.getElementById('patient-gender').textContent = patient.gender;
  document.getElementById('patient-phone').textContent = patient.phoneNumber;
  document.getElementById('patient-emergency').textContent = patient.emergencyContact;
  document.getElementById('patient-insurance').textContent = patient.insurance;
}

// Update the diagnostic list table
function updateDiagnosticList(patient) {
  const diagnosticList = document.getElementById('diagnostic-list');
  diagnosticList.innerHTML = '';
  
  document.getElementById('loading-diagnostics').style.display = 'block';
  
  setTimeout(() => {
    if (patient.diagnosticList && patient.diagnosticList.length > 0) {
      patient.diagnosticList.forEach(diagnosis => {
        const row = document.createElement('tr');
        
        // Create status class based on status text
        let statusClass = 'status-normal';
        if (diagnosis.status.toLowerCase().includes('active')) {
          statusClass = 'status-active';
        } else if (diagnosis.status.toLowerCase().includes('observation')) {
          statusClass = 'status-observation';
        } else if (diagnosis.status.toLowerCase().includes('cured') || diagnosis.status.toLowerCase().includes('inactive')) {
          statusClass = 'status-cured';
        }
        
        row.innerHTML = `
          <td>${diagnosis.problem}</td>
          <td>${diagnosis.description}</td>
          <td><span class="status ${statusClass}">${diagnosis.status}</span></td>
        `;
        
        diagnosticList.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3" class="no-data">No diagnostic data available</td>';
      diagnosticList.appendChild(row);
    }
    
    document.getElementById('loading-diagnostics').style.display = 'none';
  }, 300); // Small timeout for better user experience
}

// Update the blood pressure chart
function updateBloodPressureChart(patient) {
  const ctx = document.getElementById('bp-chart').getContext('2d');
  
  // Get selected time range
  const timeRange = parseInt(document.getElementById('time-range').value);
  
  // Use history data if available
  let chartData = [];
  
  if (patient.fullDiagnosisHistory && patient.fullDiagnosisHistory.length > 0) {
    // Use the actual diagnosis history
    const limitedHistory = patient.fullDiagnosisHistory.slice(0, timeRange);
    
    // Format data for Chart.js
    const labels = limitedHistory.map(record => `${record.month} ${record.year}`).reverse();
    const systolicData = limitedHistory.map(record => record.blood_pressure.systolic.value).reverse();
    const diastolicData = limitedHistory.map(record => record.blood_pressure.diastolic.value).reverse();
    
    // Update current values display
    const latestRecord = patient.fullDiagnosisHistory[0];
    if (latestRecord) {
      document.getElementById('systolic-value').textContent = latestRecord.blood_pressure.systolic.value;
      document.getElementById('diastolic-value').textContent = latestRecord.blood_pressure.diastolic.value;
      
      // Update status indicators
      document.getElementById('systolic-status').querySelector('span').textContent = 
        latestRecord.blood_pressure.systolic.levels;
      document.getElementById('diastolic-status').querySelector('span').textContent = 
        latestRecord.blood_pressure.diastolic.levels;
      
      // Update icons based on levels
      updateStatusIcon('systolic-status', latestRecord.blood_pressure.systolic.levels);
      updateStatusIcon('diastolic-status', latestRecord.blood_pressure.diastolic.levels);
    }
    
    // Create or update chart
    if (bpChart) {
      bpChart.data.labels = labels;
      bpChart.data.datasets[0].data = systolicData;
      bpChart.data.datasets[1].data = diastolicData;
      bpChart.update();
    } else {
      bpChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Systolic',
              data: systolicData,
              borderColor: '#FF6B6B',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Diastolic',
              data: diastolicData,
              borderColor: '#4E9BFF',
              backgroundColor: 'rgba(78, 155, 255, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 40,
              max: 200,
              grid: {
                display: true,
                drawBorder: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          maintainAspectRatio: false,
          responsive: true
        }
      });
    }
  } else {
    // Use basic data from diagnosisHistory if full history is not available
    if (bpChart) {
      bpChart.destroy();
      bpChart = null;
    }
    
    // Show basic info
    document.getElementById('systolic-value').textContent = patient.diagnosisHistory.bloodPressure.systolic || '--';
    document.getElementById('diastolic-value').textContent = patient.diagnosisHistory.bloodPressure.diastolic || '--';
    
    // Create simple chart with just the current values
    bpChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Current'],
        datasets: [
          {
            label: 'Systolic',
            data: [patient.diagnosisHistory.bloodPressure.systolic],
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Diastolic',
            data: [patient.diagnosisHistory.bloodPressure.diastolic],
            borderColor: '#4E9BFF',
            backgroundColor: 'rgba(78, 155, 255, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 40,
            max: 200,
            grid: {
              display: true,
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
}

// Update status icon based on level
function updateStatusIcon(elementId, level) {
  const element = document.getElementById(elementId);
  const icon = element.querySelector('i');
  
  if (level.toLowerCase().includes('higher')) {
    icon.className = 'fas fa-arrow-up';
    icon.style.color = '#FF6B6B';
  } else if (level.toLowerCase().includes('lower')) {
    icon.className = 'fas fa-arrow-down';
    icon.style.color = '#4E9BFF';
  } else {
    icon.className = 'fas fa-equals';
    icon.style.color = '#00BFA6';
  }
}

// Update vital signs display
function updateVitalSigns(patient) {
  let respiratoryRate = patient.respiratoryRate;
  let temperature = patient.temperature;
  let heartRate = patient.heartRate;
  let respiratoryStatus = 'Normal';
  let temperatureStatus = 'Normal';
  let heartRateStatus = 'Normal';
  
  // If we have full diagnosis history, use the latest entry for more detailed info
  if (patient.fullDiagnosisHistory && patient.fullDiagnosisHistory.length > 0) {
    const latest = patient.fullDiagnosisHistory[0];
    
    respiratoryRate = `${latest.respiratory_rate.value} bpm`;
    temperature = `${latest.temperature.value}°F`;
    heartRate = `${latest.heart_rate.value} bpm`;
    
    respiratoryStatus = latest.respiratory_rate.levels;
    temperatureStatus = latest.temperature.levels;
    heartRateStatus = latest.heart_rate.levels;
  }
  
  // Update the DOM
  document.getElementById('respiratory-rate').textContent = respiratoryRate;
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('heart-rate').textContent = heartRate;
  
  document.getElementById('respiratory-status').textContent = respiratoryStatus;
  document.getElementById('temperature-status').textContent = temperatureStatus;
  document.getElementById('heart-rate-status').textContent = heartRateStatus;
  
  // Update status indicators
  updateStatusIndicator('respiratory-rate', respiratoryStatus);
  updateStatusIndicator('temperature', temperatureStatus);
  updateStatusIndicator('heart-rate', heartRateStatus);
}

// Update status indicator styling
function updateStatus,
    getHeaders() {
      const authString = `${this.auth.username}:${this.auth.password}`;
      const base64Auth = btoa(authString);
      return {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
      };
    }
  },
  
  // Fetch all patients from the API
  getAllPatients: async function() {
    try {
      const response = await fetch(`${this.apiConfig.baseUrl}/patients`, {
        method: 'GET',
        headers: this.apiConfig.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return [];
    }
  },
  
  // Fetch a specific patient by ID
  getPatientById: async function(patientId) {
    try {
      const response = await fetch(`${this.apiConfig.baseUrl}/patients/${patientId}`, {
        method: 'GET',
        headers: this.apiConfig.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching patient with ID ${patientId}:`, error);
      return null;
    }
  },
  
  // Update patient information
  updatePatient: async function(patientId, patientData) {
    try {
      const response = await fetch(`${this.apiConfig.baseUrl}/patients/${patientId}`, {
        method: 'PUT',
        headers: this.apiConfig.getHeaders(),
        body: JSON.stringify(patientData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update patient: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },
  
  // For demo purposes - fallback to mock data if API is unavailable
  getMockPatients: function() {
    return [
      {
        id: 1,
        name: "John Smith",
        age: 45,
        gender: "Male",
        dateOfBirth: "1980-03-15",
        phoneNumber: "(555) 123-4567",
        emergencyContact: "Mary Smith: (555) 765-4321",
        insurance: "Blue Cross #BC98765432",
        profilePicture: "/images/patient1.jpg",
        condition: "Hypertension",
        status: "Stable",
        lastCheckup: "2025-04-15",
        nextAppointment: "2025-05-20",
        respiratoryRate: "18 bpm",
        temperature: "98.6°F",
        heartRate: "72 bpm",
        diagnosticList: [
          {
            problem: "Hypertension",
            description: "Stage 1 hypertension, controlled with medication",
            status: "Active"
          },
          {
            problem: "Hypercholesterolemia",
            description: "Moderate elevation, diet controlled",
            status: "Under Observation"
          }
        ],
        diagnosisHistory: {
          bloodPressure: {
            systolic: 130,
            diastolic: 85
          }
        },
        fullDiagnosisHistory: [
          {
            month: "Apr",
            year: "2025",
            blood_pressure: {
              systolic: { value: 130, levels: "Normal" },
              diastolic: { value: 85, levels: "Normal" }
            },
            heart_rate: { value: 72, levels: "Normal" },
            respiratory_rate: { value: 18, levels: "Normal" },
            temperature: { value: 98.6, levels: "Normal" }
          },
          {
            month: "Mar",
            year: "2025",
            blood_pressure: {
              systolic: { value: 135, levels: "Higher than average" },
              diastolic: { value: 88, levels: "Higher than average" }
            },
            heart_rate: { value: 75, levels: "Normal" },
            respiratory_rate: { value: 19, levels: "Normal" },
            temperature: { value: 98.4, levels: "Normal" }
          },
          {
            month: "Feb",
            year: "2025",
            blood_pressure: {
              systolic: { value: 142, levels: "Higher than average" },
              diastolic: { value: 92, levels: "Higher than average" }
            },
            heart_rate: { value: 78, levels: "Normal" },
            respiratory_rate: { value: 20, levels: "Higher than average" },
            temperature: { value: 98.7, levels: "Normal" }
          }
        ],
        labResults: [
          "Blood Work (April 2025)",
          "Lipid Panel (April 2025)",
          "Metabolic Panel (March 2025)"
        ]
      },
      {
        id: 2,
        name: "Emma Johnson",
        age: 32,
        gender: "Female",
        dateOfBirth: "1993-07-22",
        phoneNumber: "(555) 987-6543",
        emergencyContact: "David Johnson: (555) 456-7890",
        insurance: "Aetna #AE12345678",
        profilePicture: "/images/patient2.jpg",
        condition: "Pregnancy",
        status: "Monitoring",
        lastCheckup: "2025-04-28",
        nextAppointment: "2025-05-12",
        respiratoryRate: "20 bpm",
        temperature: "98.8°F",
        heartRate: "78 bpm",
        diagnosticList: [
          {
            problem: "Pregnancy",
            description: "28 weeks, normal progression",
            status: "Active"
          },
          {
            problem: "Mild Anemia",
            description: "Iron supplementation prescribed",
            status: "Under Observation"
          }
        ],
        diagnosisHistory: {
          bloodPressure: {
            systolic: 118,
            diastolic: 75
          }
        },
        fullDiagnosisHistory: [
          {
            month: "Apr",
            year: "2025",
            blood_pressure: {
              systolic: { value: 118, levels: "Normal" },
              diastolic: { value: 75, levels: "Normal" }
            },
            heart_rate: { value: 78, levels: "Normal" },
            respiratory_rate: { value: 20, levels: "Normal" },
            temperature: { value: 98.8, levels: "Normal" }
          },
          {
            month: "Mar",
            year: "2025",
            blood_pressure: {
              systolic: { value: 116, levels: "Normal" },
              diastolic: { value: 74, levels: "Normal" }
            },
            heart_rate: { value: 76, levels: "Normal" },
            respiratory_rate: { value: 19, levels: "Normal" },
            temperature: { value: 98.6, levels: "Normal" }
          },
          {
            month: "Feb",
            year: "2025",
            blood_pressure: {
              systolic: { value: 115, levels: "Normal" },
              diastolic: { value: 72, levels: "Normal" }
            },
            heart_rate: { value: 75, levels: "Normal" },
            respiratory_rate: { value: 18, levels: "Normal" },
            temperature: { value: 98.5, levels: "Normal" }
          }
        ],
        labResults: [
          "Prenatal Screening (April 2025)",
          "Glucose Challenge Test (March 2025)",
          "Complete Blood Count (February 2025)"
        ]
      },
      {
        id: 3,
        name: "Robert Chen",
        age: 67,
        gender: "Male",
        dateOfBirth: "1958-11-03",
        phoneNumber: "(555) 234-5678",
        emergencyContact: "Lisa Chen: (555) 876-5432",
        insurance: "Medicare #MC87654321",
        profilePicture: "/images/patient3.jpg",
        condition: "Diabetes Type 2",
        status: "Needs Attention",
        lastCheckup: "2025-04-10",
        nextAppointment: "2025-05-05",
        respiratoryRate: "19 bpm",
        temperature: "99.1°F",
        heartRate: "85 bpm",
        diagnosticList: [
          {
            problem: "Diabetes Type 2",
            description: "Uncontrolled, medication adjustment needed",
            status: "Active"
          },
          {
            problem: "Hypertension",
            description: "Stage 2, medication controlled",
            status: "Active"
          },
          {
            problem: "Cataracts",
            description: "Early stage, monitoring",
            status: "Under Observation"
          }
        ],
        diagnosisHistory: {
          bloodPressure: {
            systolic: 145,
            diastolic: 90
          }
        },
        fullDiagnosisHistory: [
          {
            month: "Apr",
            year: "2025",
            blood_pressure: {
              systolic: { value: 145, levels: "Higher than average" },
              diastolic: { value: 90, levels: "Higher than average" }
            },
            heart_rate: { value: 85, levels: "Higher than average" },
            respiratory_rate: { value: 19, levels: "Normal" },
            temperature: { value: 99.1, levels: "Higher than average" }
          },
          {
            month: "Mar",
            year: "2025",
            blood_pressure: {
              systolic: { value: 140, levels: "Higher than average" },
              diastolic: { value: 88, levels: "Higher than average" }
            },
            heart_rate: { value: 82, levels: "Higher than average" },
            respiratory_rate: { value: 18, levels: "Normal" },
            temperature: { value: 98.9, levels: "Normal" }
          },
          {
            month: "Feb",
            year: "2025",
            blood_pressure: {
              systolic: { value: 138, levels: "Higher than average" },
              diastolic: { value: 86, levels: "Higher than average" }
            },
            heart_rate: { value: 80, levels: "Normal" },
            respiratory_rate: { value: 18, levels: "Normal" },
            temperature: { value: 98.7, levels: "Normal" }
          }
        ],
        labResults: [
          "HbA1c Test (April 2025)",
          "Kidney Function Panel (April 2025)",
          "Lipid Panel (March 2025)",
          "Eye Examination (February 2025)"
        ]
      }
        diagnosticList.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3" class="no-data">No diagnostic data available</td>';
      diagnosticList.appendChild(row);
    }
    
    document.getElementById('loading-diagnostics').style.display = 'none';
  }, 300); // Small timeout for better user experience
}

// Update the blood pressure chart
function updateBloodPressureChart(patient) {
  const ctx = document.getElementById('bp-chart').getContext('2d');
  
  // Get selected time range
  const timeRange = parseInt(document.getElementById('time-range').value);
  
  // Use history data if available
  let chartData = [];
  
  if (patient.fullDiagnosisHistory && patient.fullDiagnosisHistory.length > 0) {
    // Use the actual diagnosis history
    const limitedHistory = patient.fullDiagnosisHistory.slice(0, timeRange);
    
    // Format data for Chart.js
    const labels = limitedHistory.map(record => `${record.month} ${record.year}`).reverse();
    const systolicData = limitedHistory.map(record => record.blood_pressure.systolic.value).reverse();
    const diastolicData = limitedHistory.map(record => record.blood_pressure.diastolic.value).reverse();
    
    // Update current values display
    const latestRecord = patient.fullDiagnosisHistory[0];
    if (latestRecord) {
      document.getElementById('systolic-value').textContent = latestRecord.blood_pressure.systolic.value;
      document.getElementById('diastolic-value').textContent = latestRecord.blood_pressure.diastolic.value;
      
      // Update status indicators
      document.getElementById('systolic-status').querySelector('span').textContent = 
        latestRecord.blood_pressure.systolic.levels;
      document.getElementById('diastolic-status').querySelector('span').textContent = 
        latestRecord.blood_pressure.diastolic.levels;
      
      // Update icons based on levels
      updateStatusIcon('systolic-status', latestRecord.blood_pressure.systolic.levels);
      updateStatusIcon('diastolic-status', latestRecord.blood_pressure.diastolic.levels);
    }
    
    // Create or update chart
    if (bpChart) {
      bpChart.data.labels = labels;
      bpChart.data.datasets[0].data = systolicData;
      bpChart.data.datasets[1].data = diastolicData;
      bpChart.update();
    } else {
      bpChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Systolic',
              data: systolicData,
              borderColor: '#FF6B6B',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Diastolic',
              data: diastolicData,
              borderColor: '#4E9BFF',
              backgroundColor: 'rgba(78, 155, 255, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 40,
              max: 200,
              grid: {
                display: true,
                drawBorder: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          maintainAspectRatio: false,
          responsive: true
        }
      });
    }
  } else {
    // Use basic data from diagnosisHistory if full history is not available
    if (bpChart) {
      bpChart.destroy();
      bpChart = null;
    }
    
    // Show basic info
    document.getElementById('systolic-value').textContent = patient.diagnosisHistory.bloodPressure.systolic || '--';
    document.getElementById('diastolic-value').textContent = patient.diagnosisHistory.bloodPressure.diastolic || '--';
    
    // Create simple chart with just the current values
    bpChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Current'],
        datasets: [
          {
            label: 'Systolic',
            data: [patient.diagnosisHistory.bloodPressure.systolic],
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Diastolic',
            data: [patient.diagnosisHistory.bloodPressure.diastolic],
            borderColor: '#4E9BFF',
            backgroundColor: 'rgba(78, 155, 255, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 40,
            max: 200,
            grid: {
              display: true,
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
}

// Update status icon based on level
function updateStatusIcon(elementId, level) {
  const element = document.getElementById(elementId);
  const icon = element.querySelector('i');
  
  if (level.toLowerCase().includes('higher')) {
    icon.className = 'fas fa-arrow-up';
    icon.style.color = '#FF6B6B';
  } else if (level.toLowerCase().includes('lower')) {
    icon.className = 'fas fa-arrow-down';
    icon.style.color = '#4E9BFF';
  } else {
    icon.className = 'fas fa-equals';
    icon.style.color = '#00BFA6';
  }
}

// Update vital signs display
function updateVitalSigns(patient) {
  let respiratoryRate = patient.respiratoryRate;
  let temperature = patient.temperature;
  let heartRate = patient.heartRate;
  let respiratoryStatus = 'Normal';
  let temperatureStatus = 'Normal';
  let heartRateStatus = 'Normal';
  
  // If we have full diagnosis history, use the latest entry for more detailed info
  if (patient.fullDiagnosisHistory && patient.fullDiagnosisHistory.length > 0) {
    const latest = patient.fullDiagnosisHistory[0];
    
    respiratoryRate = `${latest.respiratory_rate.value} bpm`;
    temperature = `${latest.temperature.value}°F`;
    heartRate = `${latest.heart_rate.value} bpm`;
    
    respiratoryStatus = latest.respiratory_rate.levels;
    temperatureStatus = latest.temperature.levels;
    heartRateStatus = latest.heart_rate.levels;
  }
  
  // Update the DOM
  document.getElementById('respiratory-rate').textContent = respiratoryRate;
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('heart-rate').textContent = heartRate;
  
  document.getElementById('respiratory-status').textContent = respiratoryStatus;
  document.getElementById('temperature-status').textContent = temperatureStatus;
  document.getElementById('heart-rate-status').textContent = heartRateStatus;
  
  // Update status indicators
  updateStatusIndicator('respiratory-rate', respiratoryStatus);
  updateStatusIndicator('temperature', temperatureStatus);
  updateStatusIndicator('heart-rate', heartRateStatus);
}

// Update status indicator styling
function updateStatusIndicator(parentClass, status) {
  const container = document.querySelector(`.${parentClass}`);
  const indicator = container.querySelector('.status-indicator');
  
  // Remove all status classes
  indicator.classList.remove('normal', 'higher-than-average', 'lower-than-average');
  
  // Add appropriate class
  if (status.toLowerCase().includes('higher')) {
    indicator.classList.add('higher-than-average');
  } else if (status.toLowerCase().includes('lower')) {
    indicator.classList.add('lower-than-average');
  } else {
    indicator.classList.add('normal');
  }
}

// Update lab results list
function updateLabResults(patient) {
  const container = document.getElementById('lab-results-container');
  container.innerHTML = '';
  
  document.getElementById('loading-lab-results').style.display = 'block';
  
  setTimeout(() => {
    if (patient.labResults && patient.labResults.length > 0) {
      patient.labResults.forEach(labResult => {
        const resultItem = document.createElement('div');
        resultItem.className = 'lab-result-item';
        
        resultItem.innerHTML = `
          <span class="lab-result-name">${labResult}</span>
          <button class="download-btn">
            <i class="fas fa-download"></i>
          </button>
        `;
        
        container.appendChild(resultItem);
      });
    } else {
      const noResults = document.createElement('div');
      noResults.className = 'no-data';
      noResults.textContent = 'No lab results available';
      container.appendChild(noResults);
    }
    
    document.getElementById('loading-lab-results').style.display = 'none';
  }, 300); // Small timeout for better user experience
}

// Show all information button handler
document.querySelector('.show-all-btn').addEventListener('click', function() {
  alert('This feature is not implemented in the demo.');
});