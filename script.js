// Function to encode credentials for Basic Auth
function encodeCredentials(username, password) {
  return btoa(`${username}:${password}`);
}

// Mock patient data to match the screenshot
const mockPatientData = {
  doctor: {
    name: "Dr. Jose Simmons",
    role: "General Practitioner",
    profilePicture: "/api/placeholder/40/40"
  },
  patients: [
    {
      id: 1,
      name: "Emily Williams",
      gender: "Female",
      age: 18,
      profilePicture: "/api/placeholder/40/40",
      dateOfBirth: "June 15, 2007",
      phoneNumber: "(415) 555-2398",
      emergencyContact: "(415) 555-2399",
      insurance: "BlueCross Health",
      respiratoryRate: "18 bpm",
      temperature: "98.2°F",
      heartRate: "82 bpm",
      diagnosticList: [
        {
          problem: "Seasonal Allergies",
          description: "Reaction to pollen and environmental allergens",
          status: "Active"
        },
        {
          problem: "Mild Asthma",
          description: "Exercise-induced bronchoconstriction",
          status: "Under Observation"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 120,
          diastolic: 80
        }
      }
    },
    {
      id: 2,
      name: "Ryan Johnson",
      gender: "Male",
      age: 45,
      profilePicture: "/api/placeholder/40/40",
      dateOfBirth: "March 12, 1980",
      phoneNumber: "(415) 555-3421",
      emergencyContact: "(415) 555-3422",
      insurance: "Health Partners",
      respiratoryRate: "16 bpm",
      temperature: "98.4°F",
      heartRate: "72 bpm",
      diagnosticList: [
        {
          problem: "Type 2 Diabetes",
          description: "Insulin resistance and elevated blood sugar",
          status: "Active"
        },
        {
          problem: "Hypertension",
          description: "High blood pressure requiring medication",
          status: "Under Observation"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 145,
          diastolic: 90
        }
      }
    },
    {
      id: 3,
      name: "Brandon Mitchell",
      gender: "Male",
      age: 36,
      profilePicture: "/api/placeholder/40/40",
      dateOfBirth: "May 7, 1989",
      phoneNumber: "(415) 555-4532",
      emergencyContact: "(415) 555-4533",
      insurance: "Aetna Insurance",
      respiratoryRate: "17 bpm",
      temperature: "98.6°F",
      heartRate: "68 bpm",
      diagnosticList: [
        {
          problem: "Lower Back Pain",
          description: "Chronic lumbar strain",
          status: "Active"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 128,
          diastolic: 82
        }
      }
    },
    {
      id: 4,
      name: "Jessica Taylor",
      gender: "Female",
      age: 28,
      profilePicture: "/api/placeholder/120/120",
      dateOfBirth: "August 23, 1996",
      phoneNumber: "(415) 555-1234",
      emergencyContact: "(415) 555-5678",
      insurance: "Sunrise Health Assurance",
      respiratoryRate: "20 bpm",
      temperature: "98.6°F",
      heartRate: "78 bpm",
      diagnosticList: [
        {
          problem: "Hypertension",
          description: "Chronic high blood pressure",
          status: "Under Observation"
        },
        {
          problem: "Type 2 Diabetes",
          description: "Insulin resistance and elevated blood sugar",
          status: "Cured"
        },
        {
          problem: "Asthma",
          description: "Recurrent episodes of bronchial constriction",
          status: "Inactive"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 160,
          diastolic: 78
        }
      }
    },
    {
      id: 5,
      name: "Samantha Johnson",
      gender: "Female",
      age: 56,
      profilePicture: "/api/placeholder/40/40",
      dateOfBirth: "April 2, 1969",
      phoneNumber: "(415) 555-6789",
      emergencyContact: "(415) 555-6780",
      insurance: "Blue Shield",
      respiratoryRate: "18 bpm",
      temperature: "98.8°F",
      heartRate: "74 bpm",
      diagnosticList: [
        {
          problem: "Arthritis",
          description: "Degenerative joint disease",
          status: "Active"
        },
        {
          problem: "Hypothyroidism",
          description: "Underactive thyroid requiring medication",
          status: "Under Observation"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 138,
          diastolic: 85
        }
      }
    },
    {
      id: 6,
      name: "Ashley Martinez",
      gender: "Female",
      age: 54,
      profilePicture: "/api/placeholder/40/40",
      dateOfBirth: "July 17, 1971",
      phoneNumber: "(415) 555-7890",
      emergencyContact: "(415) 555-7891",
      insurance: "Medicare Plus",
      respiratoryRate: "19 bpm",
      temperature: "98.2°F",
      heartRate: "76 bpm",
      diagnosticList: [
        {
          problem: "Osteoporosis",
          description: "Decreased bone density",
          status: "Under Observation"
        }
      ],
      diagnosisHistory: {
        bloodPressure: {
          systolic: 132,
          diastolic: 79
        }
      }
    }
  ]
};

// Export the mock data for use in components
export { mockPatientData, encodeCredentials };
