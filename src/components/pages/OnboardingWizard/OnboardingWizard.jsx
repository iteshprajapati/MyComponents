import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Switch } from '../../atoms/Selection/Selection';
import './OnboardingWizard.scss';

export const OnboardingWizard = ({
  onComplete,
  className = '',
  ...props
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fleetName: '',
    vehicleCount: '',
    alertsEnabled: true,
    weeklyReports: false
  });

  const steps = [
    { title: 'Company Identity', desc: 'Register fleet brand' },
    { title: 'Fleet Scale', desc: 'Specify assets size' },
    { title: 'Diagnostics Config', desc: 'Setup alert limits' }
  ];

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (onComplete) onComplete(formData);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const isStepValid = () => {
    if (currentStep === 0) return !!formData.fleetName.trim();
    if (currentStep === 1) return !!formData.vehicleCount.trim() && !isNaN(formData.vehicleCount);
    return true;
  };

  return (
    <div className={`onboarding-wizard-wrapper ${className}`} {...props}>
      <div className="onboarding-wizard-container">
        {/* 1. Step Indicator Bar */}
        <div className="wizard-step-progress-row">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`wizard-step-node ${
                idx === currentStep ? 'active' : idx < currentStep ? 'completed' : ''
              }`}
            >
              <div className="node-circle">
                {idx < currentStep ? <Check size={14} /> : idx + 1}
              </div>
              <div className="node-text-block">
                <span className="step-num-label">Step {idx + 1}</span>
                <span className="step-title-lbl">{step.title}</span>
              </div>
              {idx < steps.length - 1 && <div className="step-connecting-bar" />}
            </div>
          ))}
        </div>

        {/* 2. Step Form Body */}
        <div className="wizard-form-body">
          {currentStep === 0 && (
            <div className="wizard-form-pane animation-slide-in">
              <h3 className="pane-heading">Name your workspace</h3>
              <p className="pane-sub-desc">Provide a workspace name so your team members can join the dashboard.</p>
              <Input
                label="Workspace/Company Name"
                placeholder="e.g. Acme Corporation"
                value={formData.fleetName}
                onChange={(e) => handleInputChange('fleetName', e.target.value)}
                required
                fullWidth
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="wizard-form-pane animation-slide-in">
              <h3 className="pane-heading">Scale your team</h3>
              <p className="pane-sub-desc">Tell us how many active users will be joining your platform registry.</p>
              <Input
                label="Total Team Members"
                placeholder="e.g. 15"
                type="number"
                value={formData.vehicleCount}
                onChange={(e) => handleInputChange('vehicleCount', e.target.value)}
                required
                fullWidth
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="wizard-form-pane animation-slide-in">
              <h3 className="pane-heading">Set Alerts & Reporting preferences</h3>
              <p className="pane-sub-desc">Configure parameters for automatic email reporting and diagnostic alerts.</p>
              <div className="toggles-form-stack">
                <Switch
                  label="Enable real-time SMS status alerts"
                  checked={formData.alertsEnabled}
                  onChange={(e) => handleInputChange('alertsEnabled', e.target.checked)}
                />
                <Switch
                  label="Auto-generate weekly progress reports"
                  checked={formData.weeklyReports}
                  onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Wizard Buttons Footer */}
        <div className="wizard-buttons-footer">
          <Button
            variant="ghost"
            disabled={currentStep === 0}
            onClick={handlePrev}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <Button
            variant="solid"
            color="primary"
            disabled={!isStepValid()}
            onClick={handleNext}
            rightIcon={currentStep === steps.length - 1 ? <Check size={16} /> : <ArrowRight size={16} />}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default OnboardingWizard;
