import { ref, get, update } from 'firebase/database';

const DEMO_SEEDED_PATH = '_meta/seeded';

function nowIso() {
  return new Date().toISOString();
}

export async function seedDemoDataIfEmpty(db) {
  const seededSnap = await get(ref(db, DEMO_SEEDED_PATH));
  if (seededSnap.exists()) return false;

  const createdAt = nowIso();

  const updates = {};

  // Subjects / categories shown on ExploreSubjects + Admin
  updates['subjects/categories/primary'] = {
    title: 'Primary (Class 1-5)',
    description: 'Building a strong foundation in core subjects with interactive learning.',
    icon: 'fa-child',
    color: 'var(--primary)',
    subjects: ['All Subjects', 'Mathematics', 'EVS / Science', 'English', 'Hindi'],
    status: 'active',
    createdAt,
  };
  updates['subjects/categories/middle'] = {
    title: 'Middle School (Class 6-8)',
    description: 'Developing conceptual clarity and critical thinking skills.',
    icon: 'fa-book-open',
    color: '#10b981',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    status: 'active',
    createdAt,
  };
  updates['subjects/categories/high'] = {
    title: 'High School (Class 9-10)',
    description: 'Comprehensive preparation for board exams with expert guidance.',
    icon: 'fa-graduation-cap',
    color: '#f59e0b',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Social Science'],
    status: 'active',
    createdAt,
  };
  updates['subjects/categories/senior'] = {
    title: 'Senior Secondary (Class 11-12)',
    description: 'Specialized tutoring for science, commerce, and humanities streams.',
    icon: 'fa-university',
    color: '#ef4444',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Accountancy', 'Economics', 'Business Studies', 'History'],
    status: 'active',
    createdAt,
  };

  // Jobs shown on home carousel + Admin
  updates['jobPosts/100465'] = {
    area: 'Kursi Road, Lucknow',
    parentName: 'Aastha Srivastava',
    classAndSubject: '8th - All Subjects',
    preference: 'Female Tutor',
    requirement: 'Want teacher for class 8th (DPS). Need a good explainer.',
    status: 'active',
    createdAt,
  };
  updates['jobPosts/100454'] = {
    area: 'Matiyari, Lucknow',
    parentName: 'Akansha Bora',
    classAndSubject: '5th - All Subjects',
    preference: 'Any',
    requirement: 'Want teacher for both of my wards. Should be patient.',
    status: 'active',
    createdAt,
  };
  updates['jobPosts/100388'] = {
    area: 'Vikas Nagar, Lucknow',
    parentName: 'Manisha',
    classAndSubject: '10th - Science, Maths',
    preference: 'Female Tutor',
    requirement: 'Need a good experienced teacher having good board exam track record.',
    status: 'closed',
    createdAt,
  };

  // Demo requests (queries) shown in Admin demo requests table
  updates['demoRequests/demo-1'] = {
    parentName: 'Ravi Kumar',
    studentName: 'Aaryan Kumar',
    phone: '9876543210',
    subject: 'Mathematics',
    grade: '10th',
    message: 'Need help with algebra basics and weekly tests.',
    status: 'Pending',
    createdAt,
  };
  updates['demoRequests/demo-2'] = {
    parentName: 'Priya Singh',
    studentName: 'Riya Singh',
    phone: '9123456789',
    subject: 'Science',
    grade: '8th',
    message: 'Looking for concept clarity and doubts solving.',
    status: 'Contacted',
    createdAt,
  };

  updates[DEMO_SEEDED_PATH] = true;

  await update(ref(db), updates);
  return true;
}

