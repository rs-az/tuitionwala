import {
  BOARD_OPTIONS,
  COMMITMENT_OPTIONS,
  EDUCATION_ROWS,
  EXPERIENCE_OPTIONS,
  FLUENCY_OPTIONS,
  GENDER_OPTIONS,
  MEDIUM_OPTIONS,
  SLOT_OPTIONS,
  STATUS_OPTIONS,
  SUBJECTS_11_12,
  SUBJECTS_9_10,
  TRAVEL_OPTIONS,
  VEHICLE_OPTIONS,
  YES_NO_OPTIONS,
  displayValue,
  labelsFor,
} from '../../lib/tutorForm';

const KV = ({ label, value }) => (
  <div className="profile-kv">
    <dt>{label}</dt>
    <dd>{value || '—'}</dd>
  </div>
);

const TutorProfileView = ({ profile }) => {
  if (!profile) return <div className="text-muted">No registration data yet.</div>;

  const classList = [
    profile.classLkg2 ? 'LKG to 2nd (All Subjects)' : null,
    profile.class3to6 ? '3rd to 6th (All Subjects)' : null,
    profile.class7to8 ? '7th & 8th (All Subjects)' : null,
    profile.class9to10 ? `9th & 10th: ${labelsFor(SUBJECTS_9_10, profile.subjects9to10)}` : null,
    profile.class11to12 ? `11th & 12th / Competitive: ${labelsFor(SUBJECTS_11_12, profile.subjects11to12)}` : null,
  ].filter(Boolean);

  return (
    <div className="tutor-profile-view">
      <section className="tutor-view-section">
        <h3>Personal & contact</h3>
        <div className="profile-grid">
          <KV label="Full Name" value={profile.name} />
          <KV label="Email" value={profile.email} />
          <KV label="Gender" value={displayValue(GENDER_OPTIONS, profile.gender)} />
          <KV label="Date of Birth" value={profile.dob} />
          <KV label="Calling Number" value={profile.phone} />
          <KV label="WhatsApp" value={profile.whatsapp} />
          <KV label="Current Address" value={profile.currentAddress} />
          <KV label="Locality / Landmark" value={profile.locality} />
          <KV label="Pincode" value={profile.pincode} />
          <KV label="Emergency Contact" value={profile.emergencyName} />
          <KV label="Relation" value={profile.emergencyRelation} />
          <KV label="Emergency Number" value={profile.emergencyPhone} />
        </div>
      </section>

      <section className="tutor-view-section">
        <h3>Education & teaching</h3>
        <div className="education-table-wrap">
          <table className="education-table">
            <thead>
              <tr>
                <th>Qualification</th>
                <th>Board / University</th>
                <th>College / School</th>
                <th>Subjects / Stream</th>
                <th>Year</th>
                <th>% / CGPA</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION_ROWS.map((row) => {
                const item = profile.education?.[row.key] || {};
                return (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    <td>{item.board || '—'}</td>
                    <td>{item.school || '—'}</td>
                    <td>{item.subjects || '—'}</td>
                    <td>{item.year || '—'}</td>
                    <td>{item.score || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="profile-grid" style={{ marginTop: 12 }}>
          <KV label="Current Status" value={displayValue(STATUS_OPTIONS, profile.currentStatus)} />
          <KV label="Tutoring Experience" value={displayValue(EXPERIENCE_OPTIONS, profile.tutoringExperience)} />
          <KV label="English Fluency" value={displayValue(FLUENCY_OPTIONS, profile.englishFluency)} />
          <KV label="Medium" value={displayValue(MEDIUM_OPTIONS, profile.medium)} />
          <KV label="Demo Class" value={displayValue(YES_NO_OPTIONS, profile.demoReady)} />
          <KV label="Commitment" value={displayValue(COMMITMENT_OPTIONS, profile.commitment)} />
          <KV label="Expected Fee" value={profile.expectedFee} />
          <KV label="Boards" value={labelsFor(BOARD_OPTIONS, profile.boards)} />
          <KV label="Classes & Subjects" value={classList.join(' · ') || '—'} />
          <KV label="Vehicle" value={displayValue(VEHICLE_OPTIONS, profile.vehicle)} />
          <KV label="Max Travel" value={displayValue(TRAVEL_OPTIONS, profile.maxTravel)} />
          <KV label="Preferred Areas" value={profile.preferredAreas} />
          <KV label="Available Slots" value={labelsFor(SLOT_OPTIONS, profile.availableSlots)} />
        </div>
      </section>

      <section className="tutor-view-section">
        <h3>About & terms</h3>
        <div className="profile-grid">
          <KV label="About" value={profile.aboutYou} />
          <KV label="Agreed consultancy fee" value={profile.agreeConsultancy ? 'Yes' : 'No'} />
          <KV label="Agreed demo & schedule" value={profile.agreeDemo ? 'Yes' : 'No'} />
          <KV label="Will not bypass platform" value={profile.agreeNoBypass ? 'Yes' : 'No'} />
          <KV label="Agreed offline verification" value={profile.agreeVerification ? 'Yes' : 'No'} />
          <KV label="Signature" value={profile.signatureName} />
          <KV label="Signed on" value={profile.signatureDate} />
        </div>
      </section>
    </div>
  );
};

export default TutorProfileView;
