export const MOCK_PATIENT_DATA = {
  name: "Alex Johnson",
  metrics: {
    steps: 6500,
    water: 4,
    sleep: 7,
  },
  reminders: [
    { id: 1, title: "Annual Blood Test", date: "Oct 12, 2025", urgent: true },
    { id: 2, title: "Dental Checkup", date: "Nov 05, 2025", urgent: false },
  ],
  healthTip: "Drinking 500ml of water before meals can boost metabolism by 24-30%.",
};

export const MOCK_PROVIDER_DATA = [
  { id: 1, name: "Alex Johnson", lastCheckup: "2024-10-01", compliance: true, status: "Active" },
  { id: 2, name: "Sarah Smith", lastCheckup: "2023-12-15", compliance: false, status: "Missed Checkup" },
  { id: 3, name: "Mike Brown", lastCheckup: "2024-09-20", compliance: true, status: "Active" },
  { id: 4, name: "Emily Davis", lastCheckup: "2024-01-10", compliance: false, status: "Action Needed" },
];