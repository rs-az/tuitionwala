import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTeacherAuth } from '../../context/TeacherAuthContext';
import { getFirebaseStorage } from '../../lib/firebase';
import TutorFormFields from '../../components/tutor/TutorFormFields';
import TutorProfileView from '../../components/tutor/TutorProfileView';
import {
  STATUS_OPTIONS,
  BOARD_OPTIONS,
  EXPERIENCE_OPTIONS,
  FLUENCY_OPTIONS,
  REGISTRATION_STEPS,
  SLOT_OPTIONS,
  displayValue,
  formToProfilePayload,
  isFieldLocked,
  labelsFor,
  profileToForm,
  validateStep,
} from '../../lib/tutorForm';
import './TutorForm.css';
import './TeacherProfile.css';

const TeacherProfile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfileData, firebaseReady } = useTeacherAuth();
  const storage = useMemo(() => getFirebaseStorage(), []);

  const [isSaving, setIsSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingStep, setEditingStep] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(() => profileToForm(profile, user));

  useEffect(() => {
    if (profile) setForm(profileToForm(profile, user));
  }, [profile, user]);

  const locked = useMemo(() => {
    const flags = {};
    ['name', 'email', 'phone', 'gender', 'dob', 'agreeConsultancy', 'agreeDemo', 'agreeNoBypass', 'agreeVerification', 'signatureName', 'signatureDate'].forEach(
      (key) => {
        flags[key] = isFieldLocked(key, {
          registrationCompleted: Boolean(profile?.registrationCompleted),
          isIdentitySaved: true,
        });
      },
    );
    return flags;
  }, [profile]);

  const handleAvatar = async (file) => {
    if (!file || !firebaseReady || !user?.uid || !storage) return;
    setError('');
    setSuccess('');
    setAvatarUploading(true);
    try {
      const path = `teacherProfiles/${user.uid}/avatar_${Date.now()}_${file.name}`;
      const r = storageRef(storage, path);
      await uploadBytes(r, file);
      const url = await getDownloadURL(r);
      await updateProfileData({ avatarUrl: url });
      setSuccess('Profile photo updated.');
    } catch (err) {
      console.error(err);
      setError('Failed to upload profile picture.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const startEdit = (step) => {
    setForm(profileToForm(profile, user));
    setEditingStep(step);
    setErrors({});
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firebaseReady || !user?.uid || !editingStep) return;
    const nextErrors = validateStep(editingStep, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setError('Please fix the highlighted fields before saving.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      const payload = formToProfilePayload(form);
      await updateProfileData({
        ...payload,
        name: profile?.name || payload.name,
        email: profile?.email || user?.email || payload.email,
        phone: profile?.phone || payload.phone,
        gender: profile?.gender || payload.gender,
        dob: profile?.dob || payload.dob,
        agreeConsultancy: profile?.agreeConsultancy,
        agreeDemo: profile?.agreeDemo,
        agreeNoBypass: profile?.agreeNoBypass,
        agreeVerification: profile?.agreeVerification,
        signatureName: profile?.signatureName,
        signatureDate: profile?.signatureDate,
      });
      setEditingStep(null);
      setSuccess('Profile updated.');
    } catch (err) {
      console.error(err);
      setError('Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const verified = Boolean(profile?.verified);
  const initials = (profile?.name || user?.displayName || 'T').slice(0, 1).toUpperCase();

  return (
    <div className="page-container tutor-wizard-page tutor-profile-page">
      <div className="tutor-profile-shell">
        <section className="tutor-profile-hero">
          <div className="tutor-profile-hero-bg" />
          <div className="tutor-profile-hero-body">
            <label className="tutor-avatar">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile?.name || 'Tutor'} />
              ) : (
                <span>{initials}</span>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={!firebaseReady || avatarUploading}
                onChange={(e) => handleAvatar(e.target.files?.[0])}
              />
              <span className="tutor-avatar-cam">
                <i className={`fas ${avatarUploading ? 'fa-spinner fa-spin' : 'fa-camera'}`}></i>
              </span>
            </label>

            <div className="tutor-profile-identity">
              <div className="tutor-profile-kicker">Tutor profile</div>
              <h1>{profile?.name || user?.displayName || 'Tutor'}</h1>
              <p className="tutor-profile-meta">
                {profile?.locality || 'Locality not set'}
                {profile?.pincode ? ` · ${profile.pincode}` : ''}
              </p>
              <div className="tutor-profile-badges">
                <span className={`tutor-badge ${verified ? 'is-success' : 'is-warn'}`}>
                  <i className={`fas ${verified ? 'fa-check-circle' : 'fa-clock'}`}></i>
                  {verified ? 'Verified tutor' : 'Pending verification'}
                </span>
                {profile?.currentStatus && (
                  <span className="tutor-badge">{displayValue(STATUS_OPTIONS, profile.currentStatus)}</span>
                )}
              </div>
            </div>

            <div className="tutor-profile-hero-actions">
              <button className="btn btn-outline-primary" onClick={() => navigate('/teacher')}>
                Dashboard
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
                Browse jobs
              </button>
            </div>
          </div>
        </section>

        <div className="tutor-profile-stats">
          <div className="tutor-stat">
            <span>Experience</span>
            <strong>{displayValue(EXPERIENCE_OPTIONS, profile?.tutoringExperience)}</strong>
          </div>
          <div className="tutor-stat">
            <span>English</span>
            <strong>{displayValue(FLUENCY_OPTIONS, profile?.englishFluency)}</strong>
          </div>
          <div className="tutor-stat">
            <span>Boards</span>
            <strong>{labelsFor(BOARD_OPTIONS, profile?.boards)}</strong>
          </div>
          <div className="tutor-stat">
            <span>Slots</span>
            <strong>{labelsFor(SLOT_OPTIONS, profile?.availableSlots)}</strong>
          </div>
        </div>

        {error && <div className="tutor-banner-error">{error}</div>}
        {success && <div className="tutor-banner-success">{success}</div>}

        <div className="tutor-profile-contact">
          <div>
            <i className="fas fa-envelope"></i>
            <span>{profile?.email || user?.email || '—'}</span>
          </div>
          <div>
            <i className="fas fa-phone"></i>
            <span>{profile?.phone || '—'}</span>
          </div>
          <div>
            <i className="fab fa-whatsapp"></i>
            <span>{profile?.whatsapp || '—'}</span>
          </div>
        </div>

        {editingStep ? (
          <section className="tutor-profile-edit-card">
            <div className="tutor-profile-edit-head">
              <h2>Edit {REGISTRATION_STEPS.find((s) => s.id === editingStep)?.title}</h2>
              <p className="text-muted">Name, email, phone, gender, date of birth and signed terms stay locked.</p>
            </div>
            <form className="tutor-form" onSubmit={handleSubmit}>
              <TutorFormFields
                step={editingStep}
                form={form}
                errors={errors}
                locked={locked}
                showAccountFields={editingStep === 1}
                onChange={(next) => {
                  setForm(next);
                  setErrors({});
                }}
              />
              <div className="wizard-actions">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setEditingStep(null);
                    setError('');
                    setForm(profileToForm(profile, user));
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!firebaseReady || isSaving}>
                  {isSaving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <>
            <div className="tutor-profile-section-actions">
              {REGISTRATION_STEPS.map((item) => (
                <button key={item.id} type="button" className="btn btn-outline-primary btn-sm" onClick={() => startEdit(item.id)}>
                  <i className="fas fa-pen"></i> Edit {item.short}
                </button>
              ))}
            </div>
            <TutorProfileView profile={profile} />
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
