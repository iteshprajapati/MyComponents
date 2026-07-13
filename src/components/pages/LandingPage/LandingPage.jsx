import React, { useState } from 'react';
import { ArrowRight, Check, Star, Shield, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge/Badge';
import './LandingPage.scss';

export const LandingPage = ({
  onStartClick,
  className = '',
  ...props
}) => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const features = [
    { title: 'Smart Task Scheduling', desc: 'Real-time optimized resource allocations that adapt to active workloads.', icon: <Zap /> },
    { title: 'Performance Diagnostics', desc: 'Preventative monitoring alerts that track system performance parameters.', icon: <ShieldCheck /> },
    { title: 'Financial Analytics', desc: 'Automated expense tracking and operational budget analytics dashboards.', icon: <Star /> }
  ];

  return (
    <div className={`landing-page-wrapper ${className}`} {...props}>
      {/* 1. Navbar */}
      <header className="landing-navbar">
        <div className="landing-brand">
          <span className="brand-logo">▲</span>
          <span className="brand-name">Platform</span>
        </div>
        <div className="landing-nav-links-row">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <Button variant="solid" size="sm" onClick={onStartClick}>
          Launch App
        </Button>
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero-section">
        <Badge variant="soft" color="primary" className="hero-badge">
          🚀 Next-Gen Workspace Control ERP
        </Badge>
        <h1 className="hero-main-title">
          Streamlining Team <br />
          <span className="gradient-highlight-text">Operations & Analytics</span>
        </h1>
        <p className="hero-sub-description">
          A unified cockpit for Managers, Financial Analysts, and Project Coordinators. Coordinate schedules, track expenses, and reduce operational overheads automatically.
        </p>
        <div className="hero-cta-buttons-row">
          <Button variant="solid" size="lg" rightIcon={<ArrowRight size={18} />} onClick={onStartClick}>
            Get Started Free
          </Button>
          <Button variant="outline" size="lg">
            Book a Demo
          </Button>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="landing-features-section">
        <div className="section-headings">
          <h2 className="section-main-title">Standardized Operational Efficiency</h2>
          <p className="section-sub-desc">Everything your team needs to optimize project execution in one centralized dashboard.</p>
        </div>

        <div className="features-cards-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feat-grid-card">
              <div className="feat-icon-badge">{feat.icon}</div>
              <h4 className="feat-card-title">{feat.title}</h4>
              <p className="feat-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section id="pricing" className="landing-pricing-section">
        <div className="section-headings">
          <h2 className="section-main-title">Simple, Flexible Pricing</h2>
          <p className="section-sub-desc">No hidden fees. Choose a plan that suits your operational scale.</p>
          
          <div className="billing-cycle-toggle-wrapper">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`cycle-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`cycle-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
            >
              Yearly <span className="discount-badge">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="pricing-cards-container">
          {/* Plan 1 */}
          <div className="pricing-card">
            <h4 className="plan-name">Starter Workspace</h4>
            <div className="plan-price-row">
              <span className="price-number">
                {billingCycle === 'monthly' ? '$49' : '$39'}
              </span>
              <span className="price-suffix">/mo</span>
            </div>
            <p className="plan-description">Ideal for small local operations with up to 10 team members.</p>
            <div className="plan-divider" />
            <ul className="plan-checklist">
              <li><Check size={16} /> 10 Active Members limit</li>
              <li><Check size={16} /> Real-time task scheduling</li>
              <li><Check size={16} /> Basic financial logs & reports</li>
              <li><Check size={16} /> Email support alerts</li>
            </ul>
            <Button variant="outline" fullWidth onClick={onStartClick}>
              Start Trial
            </Button>
          </div>

          {/* Plan 2 - Promoted */}
          <div className="pricing-card card-promoted">
            <div className="promoted-ribbon">Most Popular</div>
            <h4 className="plan-name">Professional Portal</h4>
            <div className="plan-price-row">
              <span className="price-number">
                {billingCycle === 'monthly' ? '$149' : '$119'}
              </span>
              <span className="price-suffix">/mo</span>
            </div>
            <p className="plan-description">Comprehensive analytics cockpit for active scaling enterprises.</p>
            <div className="plan-divider" />
            <ul className="plan-checklist">
              <li><Check size={16} /> Unlimited Members & Workspaces</li>
              <li><Check size={16} /> Advanced performance diagnostics</li>
              <li><Check size={16} /> Financial expense charts integration</li>
              <li><Check size={16} /> Priority 24/7 dedicated support</li>
            </ul>
            <Button variant="solid" color="primary" fullWidth onClick={onStartClick}>
              Scale Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
