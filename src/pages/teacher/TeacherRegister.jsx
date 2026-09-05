import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTeacherAuth } from '../../context/TeacherAuthContext';
import TutorFormFields from '../../components/tutor/TutorFormFields';
import {
  REGISTRATION_STEPS,
  emptyTutorForm,
  formToProfilePayload,
  profileToForm,
  validateStep,
} from '../../lib/tutorForm';
import './TeacherAuth.css';
import './TutorForm.css';

const TeacherRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, updateProfileData, logout, user, profile, profileLoading, initializing, setError, error, firebaseReady } =
    useTeacherAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(emptyTutorForm);
  const [hydrated, setHydrated] = useState(false);

  const identitySaved = Boolean(user && (profile?.phone || profile?.name));
  const completedStep = Number(profile?.registrationStep || 0);

  useEffect(() => {
    if (initializing || profileLoading) return;
    if (user && profile?.registrationCompleted) {
      navigate('/teacher/profile', { replace: true });
      return;
    }
    if (user && profile && !hydrated) {
      setForm(profileToForm(profile, user));
      setStep(Math.min(Math.max((profile?.registrationStep || 0) + 1, 1), 3));
      setHydrated(true);
    }
  }, [user, profile, profileLoading, initializing, navigate, hydrated]);

  const locked = useMemo(
    () => ({
      name: identitySaved,
      email: Boolean(user),
      phone: identitySaved,
      gender: Boolean(profile?.gender),
      dob: Boolean(profile?.dob),
    }),
    [identitySaved, user, profile],
  );

  const goNext = async () => {
    setError('');
    const requirePassword = !user && step === 1;
    const nextErrors = validateStep(step, form, { requirePassword });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsLoading(true);
    try {
      const payload = formToProfilePayload(form);
      if (step === 1 && !user) {
        await register({ ...payload, password: form.password, registrationStep: 1, registrationCompleted: false });
      } else {
        await updateProfileData({
          ...payload,
          registrationStep: Math.max(completedStep, step),
          registrationCompleted: step === 3,
        });
      }

      if (step === 3) {
        const params = new URLSearchParams(location.search);
        navigate(params.get('next') || '/teacher');
        return;
      }
      if (step === 2) {
        setForm((f) => ({
          ...f,
          signatureName: f.signatureName || f.name,
          signatureDate: f.signatureDate || new Date().toISOString().slice(0, 10),
        }));
      }
      setStep((s) => s + 1);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Could not save this step. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container tutor-wizard-page">
      <div className="tutor-wizard-card">
        <h1>
          Home Tutor <span className="text-gradient">Registration</span>
        </h1>
        <p className="teacher-auth-subtitle">Complete all 3 steps in order. Your progress is saved after each step.</p>

        <div className="tutor-steps">
          {REGISTRATION_STEPS.map((item) => {
            const done = completedStep >= item.id || step > item.id;
            const active = step === item.id;
            const clickable = item.id < step;
            return (
              <button
                type="button"
                key={item.id}
                className={`tutor-step ${active ? 'active' : ''} ${done && !active ? 'done' : ''} ${clickable ? 'clickable' : ''}`}
                onClick={() => clickable && setStep(item.id)}
              >
                <div className="tutor-step-index">Step {item.id}</div>
                <div className="tutor-step-title">{item.short}</div>
              </button>
            );
          })}
        </div>

        {!firebaseReady && (
          <div className="teacher-auth-error">
            Firebase is not configured. Add your keys to <code>.env.local</code> and restart the dev server.
          </div>
        )}
        {user && profileLoading && <p className="text-muted">Loading your saved progress…</p>}
        {error && <div className="teacher-auth-error">{error}</div>}

        <div className="tutor-form">
          <TutorFormFields
            step={step}
            form={form}
            errors={errors}
            locked={locked}
            showAccountFields={step === 1}
            onChange={(next) => {
              setForm(next);
              setErrors({});
            }}
          />
        </div>

        <div className="wizard-actions">
          <button type="button" className="btn btn-outline-primary" disabled={step === 1 || isLoading} onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={async () => {
                  await logout();
                  navigate('/teacher/login');
                }}
              >
                Use another account
              </button>
            ) : (
              <Link to="/teacher/login">Already have an account? Sign in</Link>
            )}
            <button className="btn btn-primary" type="button" disabled={isLoading || !firebaseReady || (user && profileLoading)} onClick={goNext}>
              {isLoading ? 'Saving...' : step === 3 ? 'Submit registration' : 'Save & continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
