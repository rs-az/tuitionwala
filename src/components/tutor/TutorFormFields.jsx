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
} from '../../lib/tutorForm';

const toggleValue = (list, value) => {
  const next = new Set(list || []);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return Array.from(next);
};

const ChoiceGroup = ({ legend, options, value, onChange, multiple = false, disabled = false, error }) => (
  <div className="form-group">
    <div className="tutor-choice-legend">{legend}</div>
    <div className="tutor-choice-group">
      {options.map((opt) => {
        const selected = multiple ? (value || []).includes(opt.value) : value === opt.value;
        return (
          <label key={opt.value} className={`tutor-choice ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(multiple ? toggleValue(value, opt.value) : opt.value)}
            />
            {opt.label}
          </label>
        );
      })}
    </div>
    {error && <div className="tutor-error">{error}</div>}
  </div>
);

const Field = ({ label, locked, error, children }) => (
  <div className="form-group">
    <label>
      {label}
      {locked && <span className="locked-hint"> (locked)</span>}
    </label>
    {children}
    {error && <div className="tutor-error">{error}</div>}
  </div>
);

const TutorFormFields = ({ step, form, errors = {}, locked = {}, showAccountFields = false, onChange }) => {
  const set = (key, value) => onChange({ ...form, [key]: value });
  const setEducation = (rowKey, field, value) => {
    onChange({
      ...form,
      education: {
        ...form.education,
        [rowKey]: { ...form.education[rowKey], [field]: value },
      },
    });
  };

  if (step === 1) {
    return (
      <>
        <h2 className="tutor-section-title">Personal, contact & emergency details</h2>
        <Field label="Full Name *" locked={locked.name} error={errors.name}>
          <input value={form.name} disabled={locked.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <div className="form-row">
          <ChoiceGroup
            legend="Gender *"
            options={GENDER_OPTIONS}
            value={form.gender}
            disabled={locked.gender}
            onChange={(v) => set('gender', v)}
            error={errors.gender}
          />
          <Field label="Date of Birth *" locked={locked.dob} error={errors.dob}>
            <input type="date" value={form.dob} disabled={locked.dob} onChange={(e) => set('dob', e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Calling Number *" locked={locked.phone} error={errors.phone}>
            <input value={form.phone} disabled={locked.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="WhatsApp Number *" error={errors.whatsapp}>
            <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
          </Field>
        </div>
        {showAccountFields && (
          <div className="form-row">
            <Field label="Email *" locked={locked.email} error={errors.email}>
              <input type="email" value={form.email} disabled={locked.email} onChange={(e) => set('email', e.target.value)} />
            </Field>
            {!locked.email && (
              <Field label="Password *" error={errors.password}>
                <input type="password" value={form.password} minLength={6} onChange={(e) => set('password', e.target.value)} />
              </Field>
            )}
          </div>
        )}
        <Field label="Current Address *" error={errors.currentAddress}>
          <textarea rows="2" value={form.currentAddress} onChange={(e) => set('currentAddress', e.target.value)} />
        </Field>
        <div className="form-row">
          <Field label="Locality / Landmark *" error={errors.locality}>
            <input value={form.locality} onChange={(e) => set('locality', e.target.value)} />
          </Field>
          <Field label="Pincode *" error={errors.pincode}>
            <input value={form.pincode} onChange={(e) => set('pincode', e.target.value)} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Emergency Contact Person *" error={errors.emergencyName}>
            <input value={form.emergencyName} onChange={(e) => set('emergencyName', e.target.value)} />
          </Field>
          <Field label="Relation *" error={errors.emergencyRelation}>
            <input value={form.emergencyRelation} onChange={(e) => set('emergencyRelation', e.target.value)} />
          </Field>
        </div>
        <Field label="Emergency Contact Number *" error={errors.emergencyPhone}>
          <input value={form.emergencyPhone} onChange={(e) => set('emergencyPhone', e.target.value)} />
        </Field>
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <h2 className="tutor-section-title">Education history, teaching profile & commute</h2>
        <p className="tutor-choice-legend">1. Complete academic qualifications</p>
        {errors.education && <div className="tutor-error">{errors.education}</div>}
        <div className="education-table-wrap">
          <table className="education-table">
            <thead>
              <tr>
                <th>Qualification</th>
                <th>Board / University</th>
                <th>College / School</th>
                <th>Major Subjects / Stream</th>
                <th>Passing Year</th>
                <th>% / CGPA</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION_ROWS.map((row) => {
                const item = form.education[row.key] || {};
                return (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    <td>
                      <input value={item.board} onChange={(e) => setEducation(row.key, 'board', e.target.value)} />
                    </td>
                    <td>
                      <input value={item.school} onChange={(e) => setEducation(row.key, 'school', e.target.value)} />
                    </td>
                    <td>
                      <input value={item.subjects} onChange={(e) => setEducation(row.key, 'subjects', e.target.value)} />
                    </td>
                    <td>
                      <input value={item.year} onChange={(e) => setEducation(row.key, 'year', e.target.value)} />
                    </td>
                    <td>
                      <input value={item.score} onChange={(e) => setEducation(row.key, 'score', e.target.value)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="tutor-section-block">
          <p className="tutor-choice-legend">2. Experience, fluency & commitment</p>
          <ChoiceGroup legend="Current Status *" options={STATUS_OPTIONS} value={form.currentStatus} onChange={(v) => set('currentStatus', v)} error={errors.currentStatus} />
          <ChoiceGroup legend="Total Tutoring Experience *" options={EXPERIENCE_OPTIONS} value={form.tutoringExperience} onChange={(v) => set('tutoringExperience', v)} error={errors.tutoringExperience} />
          <ChoiceGroup legend="English Speaking Fluency *" options={FLUENCY_OPTIONS} value={form.englishFluency} onChange={(v) => set('englishFluency', v)} error={errors.englishFluency} />
          <ChoiceGroup legend="Medium of Instruction *" options={MEDIUM_OPTIONS} value={form.medium} onChange={(v) => set('medium', v)} error={errors.medium} />
          <ChoiceGroup legend="Ready to provide a 1-day demo/trial class at student's home? *" options={YES_NO_OPTIONS} value={form.demoReady} onChange={(v) => set('demoReady', v)} error={errors.demoReady} />
          <ChoiceGroup legend="Minimum Service Commitment *" options={COMMITMENT_OPTIONS} value={form.commitment} onChange={(v) => set('commitment', v)} error={errors.commitment} />
          <Field label="Minimum Expected Fee (₹ per student/subject) *" error={errors.expectedFee}>
            <input value={form.expectedFee} onChange={(e) => set('expectedFee', e.target.value)} />
          </Field>
        </div>

        <div className="tutor-section-block">
          <p className="tutor-choice-legend">3. Target boards & class/subject selection</p>
          <ChoiceGroup legend="Boards *" options={BOARD_OPTIONS} value={form.boards} multiple onChange={(v) => set('boards', v)} error={errors.boards} />
          {errors.classes && <div className="tutor-error">{errors.classes}</div>}
          <div className="tutor-choice-group" style={{ marginBottom: 12 }}>
            <label className="tutor-choice">
              <input type="checkbox" checked={form.classLkg2} onChange={(e) => set('classLkg2', e.target.checked)} />
              LKG to 2nd (All Subjects)
            </label>
            <label className="tutor-choice">
              <input type="checkbox" checked={form.class3to6} onChange={(e) => set('class3to6', e.target.checked)} />
              3rd to 6th (All Subjects)
            </label>
            <label className="tutor-choice">
              <input type="checkbox" checked={form.class7to8} onChange={(e) => set('class7to8', e.target.checked)} />
              7th & 8th (All Subjects)
            </label>
            <label className={`tutor-choice ${form.class9to10 ? 'selected' : ''}`}>
              <input type="checkbox" checked={form.class9to10} onChange={(e) => set('class9to10', e.target.checked)} />
              9th & 10th
            </label>
            <label className={`tutor-choice ${form.class11to12 ? 'selected' : ''}`}>
              <input type="checkbox" checked={form.class11to12} onChange={(e) => set('class11to12', e.target.checked)} />
              11th & 12th / Competitive
            </label>
          </div>
          {form.class9to10 && (
            <ChoiceGroup legend="9th & 10th subjects *" options={SUBJECTS_9_10} value={form.subjects9to10} multiple onChange={(v) => set('subjects9to10', v)} error={errors.subjects9to10} />
          )}
          {form.class11to12 && (
            <ChoiceGroup legend="11th & 12th / competitive subjects *" options={SUBJECTS_11_12} value={form.subjects11to12} multiple onChange={(v) => set('subjects11to12', v)} error={errors.subjects11to12} />
          )}
        </div>

        <div className="tutor-section-block">
          <p className="tutor-choice-legend">4. Commute & availability</p>
          <ChoiceGroup legend="Own Vehicle *" options={VEHICLE_OPTIONS} value={form.vehicle} onChange={(v) => set('vehicle', v)} error={errors.vehicle} />
          <ChoiceGroup legend="Max Travel Distance *" options={TRAVEL_OPTIONS} value={form.maxTravel} onChange={(v) => set('maxTravel', v)} error={errors.maxTravel} />
          <Field label="Preferred Localities / Areas *" error={errors.preferredAreas}>
            <input value={form.preferredAreas} onChange={(e) => set('preferredAreas', e.target.value)} />
          </Field>
          <ChoiceGroup legend="Available Slots *" options={SLOT_OPTIONS} value={form.availableSlots} multiple onChange={(v) => set('availableSlots', v)} error={errors.availableSlots} />
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="tutor-section-title">About you, consultancy terms & replacement policy</h2>
      <Field label="Tell us about yourself & why you are the perfect fit *" error={errors.aboutYou}>
        <textarea rows="5" value={form.aboutYou} onChange={(e) => set('aboutYou', e.target.value)} />
      </Field>

      <p className="tutor-choice-legend">Consultancy terms & replacement rules</p>
      <table className="terms-table">
        <thead>
          <tr>
            <th>Tuition Category</th>
            <th>Consultancy Charges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard Tuition</td>
            <td>50% (½) of 1st Month Fee (one-time placement fee)</td>
          </tr>
          <tr>
            <td>Premium High-Fee Tuition</td>
            <td>50% of 1st Month Fee + ₹1,000 extra (flat)</td>
          </tr>
          <tr>
            <td>2nd Month Onwards</td>
            <td>0% commission (100% fee directly to tutor)</td>
          </tr>
        </tbody>
      </table>
      <p className="terms-notes">Premium tuitions (high fee brackets, senior specialized subjects, or prime locations) carry an additional flat fee of ₹1,000.</p>
      <p className="terms-notes">
        If a tuition is discontinued by the parent within the 1st month due to unforeseen reasons (and not tutor negligence), the platform will adjust or allocate a replacement tuition lead.
      </p>

      <div className="undertaking">
        <label className={locked.agreeConsultancy ? 'disabled' : ''}>
          <input type="checkbox" checked={form.agreeConsultancy} disabled={locked.agreeConsultancy} onChange={(e) => set('agreeConsultancy', e.target.checked)} />
          I agree to the 50% first-month consultancy fee (and ₹1,000 extra on premium assignments).
        </label>
        {errors.agreeConsultancy && <div className="tutor-error">{errors.agreeConsultancy}</div>}
        <label className={locked.agreeDemo ? 'disabled' : ''}>
          <input type="checkbox" checked={form.agreeDemo} disabled={locked.agreeDemo} onChange={(e) => set('agreeDemo', e.target.checked)} />
          I agree to give a 1-day demo class and commit to the agreed teaching schedule and duration.
        </label>
        {errors.agreeDemo && <div className="tutor-error">{errors.agreeDemo}</div>}
        <label className={locked.agreeNoBypass ? 'disabled' : ''}>
          <input type="checkbox" checked={form.agreeNoBypass} disabled={locked.agreeNoBypass} onChange={(e) => set('agreeNoBypass', e.target.checked)} />
          I will not bypass the platform or negotiate private offline fee deals directly with assigned parents.
        </label>
        {errors.agreeNoBypass && <div className="tutor-error">{errors.agreeNoBypass}</div>}
        <label className={locked.agreeVerification ? 'disabled' : ''}>
          <input type="checkbox" checked={form.agreeVerification} disabled={locked.agreeVerification} onChange={(e) => set('agreeVerification', e.target.checked)} />
          I agree to complete offline verification as instructed before lead allocation.
        </label>
        {errors.agreeVerification && <div className="tutor-error">{errors.agreeVerification}</div>}
      </div>

      <div className="form-row">
        <Field label="Signature of Tutor *" locked={locked.signatureName} error={errors.signatureName}>
          <input value={form.signatureName} disabled={locked.signatureName} onChange={(e) => set('signatureName', e.target.value)} placeholder="Type your full name" />
        </Field>
        <Field label="Date *" locked={locked.signatureDate} error={errors.signatureDate}>
          <input type="date" value={form.signatureDate} disabled={locked.signatureDate} onChange={(e) => set('signatureDate', e.target.value)} />
        </Field>
      </div>
    </>
  );
};

export default TutorFormFields;
