// ─────────────────────────────────────────────────────────────
// ✏️  EDIT EVERYTHING HERE — this is the ONLY file you need to
// touch to update the biodata content shown across the site.
// ─────────────────────────────────────────────────────────────

export const biodata = {
  name: 'Nitu Kumari',
  nameHindi: 'नितू कुमारी',
  dob: '05 January 2000',
  age: 25,
  height: "5'7\"",
  weight: '60 Kg',
  education: 'B.A. Final — Psychology Honours 2024',
  occupation: 'Studying',
  religion: 'Hindu',
  caste: 'Bhumihar',
  birthTime: '07:20 AM',
  birthPlace: 'Hajipur',
  complexion: 'Fair / White',
  motherTongue: 'Hindi',
  languages: ['Hindi', 'English'],
  hobbies: ['Reading Books'],
  maritalStatus: 'Unmarried',
  family: {
    father: {
      name: 'Satyendra Kumar Singh',
      occupation: 'Teacher',
    },
    mother: {
      name: 'Ramila Devi',
      occupation: 'Homemaker',
    },
    brothers: [
      { name: 'Er. Sushant Singh', note: 'Engineer · Unmarried' },
      { name: 'Prashant Singh', note: 'Unmarried' },
    ],
    grandfather: 'Ramnandan Singh',
    grandmother: 'Rukhmani Devi',
  },
  address: {
    village: 'Dudhaila Gachi',
    post: 'Sonepur',
    district: 'Saran',
    state: 'Bihar',
    pin: '841101',
  },
  contact: {
    primary: '8651247624',
    father: '7646064010',
    // This is where "Request to Connect" form submissions are sent (also
    // overridable via the BREVO_TO_EMAIL environment variable — see .env.example)
    email: 'satyendrakumarsingh.father@gmail.com',
  },
}

export type Biodata = typeof biodata