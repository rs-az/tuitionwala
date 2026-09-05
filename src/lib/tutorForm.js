export const EDUCATION_ROWS = [
  { key: 'class10', label: 'Class 10th' },
  { key: 'class12', label: 'Class 12th' },
  { key: 'ug', label: 'Graduation (UG)' },
  { key: 'pg', label: 'Post Graduation (PG)' },
  { key: 'bed', label: 'B.Ed / D.El.Ed' },
  { key: 'phd', label: 'Ph.D / Research' },
  { key: 'other', label: 'Other / Certifications' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const STATUS_OPTIONS = [
  { value: 'full_time', label: 'Full-time Home Tutor' },
  { value: 'school_teacher', label: 'School/College Teacher' },
  { value: 'professional', label: 'Working Professional' },
  { value: 'student', label: 'Student / Aspirant' },
];

export const EXPERIENCE_OPTIONS = [
  { value: 'fresher', label: 'Fresher (<1 yr)' },
  { value: '1-3', label: '1–3 Years' },
  { value: '3-5', label: '3–5 Years' },
  { value: '5+', label: '5+ Years' },
];

export const FLUENCY_OPTIONS = [
  { value: '50', label: '50% (Basic)' },
  { value: '75', label: '75% (Fluent)' },
  { value: '100', label: '100% (Expert/Native)' },
];

export const MEDIUM_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'bilingual', label: 'Bilingual (English + Hindi)' },
  { value: 'hindi', label: 'Hindi' },
];

export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const COMMITMENT_OPTIONS = [
  { value: '3-6', label: '3–6 Months' },
  { value: 'full_session', label: 'Till Final Exams (Full Session)' },
];

export const BOARD_OPTIONS = [
  { value: 'icse', label: 'ICSE / ISC' },
  { value: 'cbse', label: 'CBSE' },
  { value: 'state', label: 'UP / State Board' },
  { value: 'all', label: 'All Boards' },
];

export const SUBJECTS_9_10 = [
  { value: 'maths', label: 'Maths' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
  { value: 'sst', label: 'S.St' },
  { value: 'computer', label: 'Computer' },
  { value: 'hindi', label: 'Hindi' },
];

export const SUBJECTS_11_12 = [
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'maths', label: 'Maths' },
  { value: 'biology', label: 'Biology' },
  { value: 'accounts', label: 'Accounts' },
  { value: 'economics', label: 'Economics' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'computer', label: 'Computer' },
  { value: 'iit_jee', label: 'IIT-JEE' },
  { value: 'neet', label: 'NEET' },
];

export const VEHICLE_OPTIONS = [
  { value: 'two', label: 'Two-Wheeler' },
  { value: 'four', label: 'Four-Wheeler' },
  { value: 'none', label: 'None' },
];

export const TRAVEL_OPTIONS = [
  { value: '3', label: 'Up to 3 km' },
  { value: '3-6', label: '3–6 km' },
  { value: '6-10', label: '6–10 km' },
  { value: '10+', label: '10+ km' },
];

export const SLOT_OPTIONS = [
  { value: 'morning', label: 'Morning (6–9 AM)' },
  { value: 'afternoon', label: 'Afternoon (2–4 PM)' },
  { value: 'evening', label: 'Evening (4–7 PM)' },
  { value: 'night', label: 'Night (7–9 PM)' },
];

export const REGISTRATION_STEPS = [
  { id: 1, title: 'Personal & Contact', short: 'Personal' },
  { id: 2, title: 'Education & Teaching', short: 'Education' },
  { id: 3, title: 'About & Terms', short: 'Terms' },
];

/** Identity / legal fields tutors cannot change after they are saved. */
export const LOCKED_FIELD_KEYS = [
  'name',
  'email',
  'phone',
  'gender',
  'dob',
  'agreeConsultancy',
  'agreeDemo',
  'agreeNoBypass',
  'agreeVerification',
  'signatureName',
  'signatureDate',
];

const emptyEducationRow = () => ({
  board: '',
  school: '',
  subjects: '',
  year: '',
  score: '',
});

export function emptyTutorForm() {
  return {
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    phone: '',
    whatsapp: '',
    currentAddress: '',
    locality: '',
    pincode: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    education: Object.fromEntries(EDUCATION_ROWS.map((row) => [row.key, emptyEducationRow()])),
    currentStatus: '',
    tutoringExperience: '',
    englishFluency: '',
    medium: '',
    demoReady: '',
    commitment: '',
    expectedFee: '',
    boards: [],
    classLkg2: false,
    class3to6: false,
    class7to8: false,
    class9to10: false,
    class11to12: false,
    subjects9to10: [],
    subjects11to12: [],
    vehicle: '',
    maxTravel: '',
    preferredAreas: '',
    availableSlots: [],
    aboutYou: '',
    agreeConsultancy: false,
    agreeDemo: false,
    agreeNoBypass: false,
    agreeVerification: false,
    signatureName: '',
    signatureDate: '',
  };
}

function mergeEducation(saved) {
  const base = emptyTutorForm().education;
  if (!saved || typeof saved !== 'object') return base;
  EDUCATION_ROWS.forEach((row) => {
    base[row.key] = { ...emptyEducationRow(), ...(saved[row.key] || {}) };
  });
  return base;
}

export function profileToForm(profile = {}, user = null) {
  const blank = emptyTutorForm();
  return {
    ...blank,
    ...profile,
    email: profile?.email || user?.email || '',
    name: profile?.name || user?.displayName || '',
    phone: profile?.phone || '',
    education: mergeEducation(profile?.education),
    boards: Array.isArray(profile?.boards) ? profile.boards : [],
    subjects9to10: Array.isArray(profile?.subjects9to10) ? profile.subjects9to10 : [],
    subjects11to12: Array.isArray(profile?.subjects11to12) ? profile.subjects11to12 : [],
    availableSlots: Array.isArray(profile?.availableSlots) ? profile.availableSlots : [],
    password: '',
  };
}

function optionLabel(options, value) {
  return options.find((o) => o.value === value)?.label || value || '—';
}

export function labelsFor(options, values) {
  if (!Array.isArray(values) || values.length === 0) return '—';
  return values.map((v) => optionLabel(options, v)).join(', ');
}

export function experienceToYears(value) {
  if (value === 'fresher') return 0;
  if (value === '1-3') return 2;
  if (value === '3-5') return 4;
  if (value === '5+') return 5;
  return '';
}

export function deriveSubjects(form) {
  const subjects = [];
  if (form.classLkg2) subjects.push('LKG–2 (All Subjects)');
  if (form.class3to6) subjects.push('3rd–6th (All Subjects)');
  if (form.class7to8) subjects.push('7th–8th (All Subjects)');
  (form.subjects9to10 || []).forEach((s) => {
    const label = SUBJECTS_9_10.find((o) => o.value === s)?.label;
    if (label) subjects.push(`9–10 ${label}`);
  });
  (form.subjects11to12 || []).forEach((s) => {
    const label = SUBJECTS_11_12.find((o) => o.value === s)?.label;
    if (label) subjects.push(`11–12 ${label}`);
  });
  return subjects;
}

export function formToProfilePayload(form) {
  const {
    password,
    id,
    uid,
    verified,
    createdAt,
    status,
    avatarUrl,
    registrationCompleted,
    registrationStep,
    ...rest
  } = form;
  void password;
  void id;
  void uid;
  void verified;
  void createdAt;
  void status;
  void avatarUrl;
  void registrationCompleted;
  void registrationStep;
  return {
    ...rest,
    city: form.locality || '',
    subjects: deriveSubjects(form),
    bio: form.aboutYou || '',
    experienceYears: experienceToYears(form.tutoringExperience),
  };
}

function hasEducationEntry(form) {
  return EDUCATION_ROWS.some((row) => {
    const item = form.education?.[row.key] || {};
    return Object.values(item).some((v) => String(v || '').trim());
  });
}

export function validateStep(step, form, { requirePassword = false } = {}) {
  const errors = {};
  const need = (key, message) => {
    const value = form[key];
    if (value === true) return;
    if (typeof value === 'string' && value.trim()) return;
    if (Array.isArray(value) && value.length) return;
    errors[key] = message;
  };

  if (step === 1) {
    need('name', 'Full name is required.');
    need('gender', 'Select gender.');
    need('dob', 'Date of birth is required.');
    need('phone', 'Calling number is required.');
    need('whatsapp', 'WhatsApp number is required.');
    need('email', 'Email is required.');
    if (requirePassword) need('password', 'Password is required (min 6 characters).');
    if (requirePassword && form.password && form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    need('currentAddress', 'Current address is required.');
    need('locality', 'Locality / landmark is required.');
    need('pincode', 'Pincode is required.');
    need('emergencyName', 'Emergency contact person is required.');
    need('emergencyRelation', 'Relation is required.');
    need('emergencyPhone', 'Emergency contact number is required.');
  }

  if (step === 2) {
    if (!hasEducationEntry(form)) {
      errors.education = 'Add at least one academic qualification.';
    }
    need('currentStatus', 'Select current status.');
    need('tutoringExperience', 'Select tutoring experience.');
    need('englishFluency', 'Select English fluency.');
    need('medium', 'Select medium of instruction.');
    need('demoReady', 'Please confirm demo class availability.');
    need('commitment', 'Select minimum service commitment.');
    need('expectedFee', 'Minimum expected fee is required.');
    need('boards', 'Select at least one board.');
    if (!form.classLkg2 && !form.class3to6 && !form.class7to8 && !form.class9to10 && !form.class11to12) {
      errors.classes = 'Select at least one class group.';
    }
    if (form.class9to10 && !(form.subjects9to10 || []).length) {
      errors.subjects9to10 = 'Select subjects for 9th & 10th.';
    }
    if (form.class11to12 && !(form.subjects11to12 || []).length) {
      errors.subjects11to12 = 'Select subjects for 11th & 12th / competitive.';
    }
    need('vehicle', 'Select vehicle option.');
    need('maxTravel', 'Select max travel distance.');
    need('preferredAreas', 'Preferred localities are required.');
    need('availableSlots', 'Select at least one available slot.');
  }

  if (step === 3) {
    need('aboutYou', 'Please tell us about yourself.');
    if (!form.agreeConsultancy) errors.agreeConsultancy = 'You must agree to consultancy charges.';
    if (!form.agreeDemo) errors.agreeDemo = 'You must agree to the demo class and schedule.';
    if (!form.agreeNoBypass) errors.agreeNoBypass = 'You must agree not to bypass the platform.';
    if (!form.agreeVerification) errors.agreeVerification = 'You must agree to offline verification.';
    need('signatureName', 'Signature name is required.');
    need('signatureDate', 'Date is required.');
  }

  return errors;
}

export function isFieldLocked(key, { registrationCompleted, isIdentitySaved }) {
  if (!LOCKED_FIELD_KEYS.includes(key)) return false;
  if (key === 'name' || key === 'email' || key === 'phone' || key === 'gender' || key === 'dob') {
    return Boolean(isIdentitySaved);
  }
  return Boolean(registrationCompleted);
}

export function displayValue(options, value) {
  return optionLabel(options, value);
}
