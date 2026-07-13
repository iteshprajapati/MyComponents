import React, { useState, useEffect, useRef } from 'react';
import { 
  Copy, Check, Code, Play, RefreshCw, Sun, Moon, Info,
  Layers, Package, Grid, FileCode, CheckCircle 
} from 'lucide-react';

/* Import Atoms */
import { Button } from '../components/atoms/Button/Button';
import { Input } from '../components/atoms/Input/Input';
import { Checkbox, Radio, Switch } from '../components/atoms/Selection/Selection';
import { Badge } from '../components/atoms/Badge/Badge';
import { Spinner, LinearProgress } from '../components/atoms/Progress/Progress';
import { Divider } from '../components/atoms/Divider/Divider';

/* Import Molecules */
import { StatCard } from '../components/molecules/StatCard/StatCard';
import { SearchBar } from '../components/molecules/SearchBar/SearchBar';
import { TabStrip } from '../components/molecules/TabStrip/TabStrip';
import { Tooltip } from '../components/molecules/Tooltip/Tooltip';
import { Timeline } from '../components/molecules/Timeline/Timeline';
import { Avatar, AvatarGroup } from '../components/molecules/AvatarGroup/AvatarGroup';

/* Import Organisms */
import { ModalDrawer } from '../components/organisms/ModalDrawer/ModalDrawer';
import { EventCalendar } from '../components/organisms/EventCalendar/EventCalendar';
import { UserProfileCard } from '../components/organisms/UserProfileCard/UserProfileCard';
import { AccordionGroup } from '../components/organisms/AccordionGroup/AccordionGroup';
import { ToastContainer, NotificationsBell } from '../components/organisms/NotificationCenter/NotificationCenter';

/* Import Templates */
import { SmartDataTable } from '../components/templates/SmartDataTable/SmartDataTable';
import { AnalyticsDashboard } from '../components/templates/AnalyticsDashboard/AnalyticsDashboard';
import { KanbanBoard } from '../components/templates/KanbanBoard/KanbanBoard';
import { ChatHub } from '../components/templates/ChatHub/ChatHub';
import { MediaDropzone } from '../components/templates/MediaDropzone/MediaDropzone';

/* Import Pages */
import { DashboardLayout } from '../components/pages/DashboardLayout/DashboardLayout';
import { LandingPage } from '../components/pages/LandingPage/LandingPage';
import { OnboardingWizard } from '../components/pages/OnboardingWizard/OnboardingWizard';
import { AuthScreens } from '../components/pages/AuthScreens/AuthScreens';
import { SystemViews } from '../components/pages/SystemViews/SystemViews';

import './ShowcaseApp.scss';

export const ShowcaseApp = () => {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('atoms');
  const [activeComponent, setActiveComponent] = useState('Button');
  const [copied, setCopied] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1e293b'); // default slate-800
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customHex, setCustomHex] = useState('#1E293B');
  const pickerRef = useRef(null);

  const presetColors = [
    { name: 'Slate', hex: '#1e293b' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Violet', hex: '#7c3aed' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Amber', hex: '#d97706' },
    { name: 'Crimson', hex: '#dc2626' },
    { name: 'Rose', hex: '#db2777' },
    { name: 'Teal', hex: '#0d9488' }
  ];

  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  };

  const hexToRgb = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const updateThemeColors = (hexColor) => {
    const { h, s, l } = hexToHsl(hexColor);
    const rgb = hexToRgb(hexColor);

    document.documentElement.style.setProperty('--primary-base', `${h}, ${s}%, ${l}%`);
    document.documentElement.style.setProperty('--primary', `hsl(${h}, ${s}%, ${l}%)`);
    document.documentElement.style.setProperty('--primary-hover', `hsl(${h}, ${s}%, ${Math.max(l - 8, 10)}%)`);
    document.documentElement.style.setProperty('--primary-active', `hsl(${h}, ${s}%, ${Math.max(l - 15, 5)}%)`);
    document.documentElement.style.setProperty('--primary-light', `rgba(${rgb}, 0.08)`);
    document.documentElement.style.setProperty('--border-focus', `hsl(${h}, ${s}%, ${l}%)`);
  };

  const handleSelectPreset = (hex) => {
    setPrimaryColor(hex);
    setCustomHex(hex.toUpperCase());
    updateThemeColors(hex);
  };

  const handleHexInputChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('#') && val.length > 0) {
      val = '#' + val;
    }
    setCustomHex(val);

    const isValidHex = /^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val);
    if (isValidHex) {
      setPrimaryColor(val);
      updateThemeColors(val);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Mock states for playground rendering */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState('home');
  const [toasts, setToasts] = useState([]);
  
  const triggerToast = (type, title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message, duration: 3000 }]);
  };

  const handleCloseToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    { id: 'atoms', label: 'Atoms (Tiny UI)', icon: <Package size={16} /> },
    { id: 'molecules', label: 'Molecules (Small)', icon: <Layers size={16} /> },
    { id: 'organisms', label: 'Organisms (Medium)', icon: <Grid size={16} /> },
    { id: 'templates', label: 'Templates (Large)', icon: <FileCode size={16} /> },
    { id: 'pages', label: 'Pages (Full views)', icon: <Layers size={16} /> }
  ];

  const componentRegistry = {
    atoms: [
      {
        name: 'Button',
        desc: 'Interactive action buttons supporting outline, ghost, loading spinners, and sizing.',
        code: `import { Button } from './components/atoms/Button/Button';\n\n<Button variant="solid" color="primary">Click Me</Button>`,
        render: () => (
          <div className="showcase-element-group">
            <Button variant="solid" color="primary">Primary Button</Button>
            <Button variant="outline" color="secondary">Outline Secondary</Button>
            <Button variant="ghost" color="danger">Danger Ghost</Button>
            <Button variant="solid" color="success" isLoading>Loading State</Button>
          </div>
        )
      },
      {
        name: 'Input',
        desc: 'Floating-label inputs supporting status warnings, icons, and error labels.',
        code: `import { Input } from './components/atoms/Input/Input';\n\n<Input label="Email" placeholder="you@company.com" required />`,
        render: () => (
          <div className="showcase-element-group vertical">
            <Input label="Username" placeholder="e.g. jdoe" helperText="Choose a unique username" />
            <Input label="Secure Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters" />
          </div>
        )
      },
      {
        name: 'Selection Controls',
        desc: 'Checkboxes, Radio selectors, and toggle switches with smooth animations.',
        code: `import { Checkbox, Radio, Switch } from './components/atoms/Selection/Selection';\n\n<Switch label="Enable Active Dispatch alerts" checked={true} />`,
        render: () => {
          const [checkVal, setCheckVal] = useState(true);
          const [radioVal, setRadioVal] = useState('yes');
          const [switchVal, setSwitchVal] = useState(false);
          return (
            <div className="showcase-element-group vertical">
              <Checkbox label="I accept terms and conditions" checked={checkVal} onChange={(e)=>setCheckVal(e.target.checked)} />
              <div style={{ display: 'flex', gap: '16px' }}>
                <Radio name="opt" label="Yes" value="yes" checked={radioVal === 'yes'} onChange={(e)=>setRadioVal(e.target.value)} />
                <Radio name="opt" label="No" value="no" checked={radioVal === 'no'} onChange={(e)=>setRadioVal(e.target.value)} />
              </div>
              <Switch label="Turn off all automated alerts" checked={switchVal} onChange={(e)=>setSwitchVal(e.target.checked)} />
            </div>
          );
        }
      },
      {
        name: 'Badge',
        desc: 'Status indicators supporting solid, outline, and soft pastel shades.',
        code: `import { Badge } from './components/atoms/Badge/Badge';\n\n<Badge variant="soft" color="success">Verified</Badge>`,
        render: () => (
          <div className="showcase-element-group">
            <Badge variant="soft" color="primary">Soft Primary</Badge>
            <Badge variant="solid" color="success">Solid Success</Badge>
            <Badge variant="outline" color="danger">Outline Danger</Badge>
            <Badge variant="soft" color="warning">Warning Status</Badge>
          </div>
        )
      },
      {
        name: 'Progress',
        desc: 'Spinners and linear track metrics showing percentage or infinite logs.',
        code: `import { LinearProgress } from './components/atoms/Progress/Progress';\n\n<LinearProgress value={75} showValue />`,
        render: () => (
          <div className="showcase-element-group vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Spinner size="sm" />
              <Spinner size="md" color="success" />
              <Spinner size="lg" color="danger" />
            </div>
            <LinearProgress value={60} showValue />
            <LinearProgress indeterminate color="secondary" />
          </div>
        )
      },
      {
        name: 'Divider',
        desc: 'Horizontal and vertical visual separators with aligned labels.',
        code: `import { Divider } from './components/atoms/Divider/Divider';\n\n<Divider>OR</Divider>`,
        render: () => (
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '0.85rem' }}>Top Section</p>
            <Divider>Separation Rule</Divider>
            <p style={{ fontSize: '0.85rem' }}>Bottom Section</p>
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span>Left</span>
              <Divider orientation="vertical" />
              <span>Right</span>
            </div>
          </div>
        )
      }
    ],
    molecules: [
      {
        name: 'StatCard',
        desc: 'Metrics card showing totals, color trend badges, and icons.',
        code: `import { StatCard } from './components/molecules/StatCard/StatCard';\n\n<StatCard title="Revenue" value="$4,200.00" trend="+12%" trendDirection="up" />`,
        render: () => (
          <div className="showcase-element-group" style={{ width: '100%' }}>
            <StatCard title="Weekly Orders" value="842" trend="+14.2%" trendDirection="up" />
            <StatCard title="Avg Incident rate" value="0.04%" trend="-3.5%" trendDirection="down" />
          </div>
        )
      },
      {
        name: 'SearchBar',
        desc: 'Interactive search bar with dynamic auto-completion lists.',
        code: `import { SearchBar } from './components/molecules/SearchBar/SearchBar';\n\n<SearchBar suggestions={['Apple', 'Orange']} />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <SearchBar 
              suggestions={['Cargo route A', 'Cargo route B', 'Warehouse North', 'Warehouse South', 'HQ Operations']}
              onSelect={(val) => triggerToast('info', 'Search Select', `You selected: ${val}`)}
            />
          </div>
        )
      },
      {
        name: 'TabStrip',
        desc: 'Sliding line underline navigations or tab pills.',
        code: `import { TabStrip } from './components/molecules/TabStrip/TabStrip';\n\n<TabStrip tabs={[{ id: 'h', label: 'Home' }]} activeTabId="h" />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <TabStrip
              tabs={[
                { id: 'home', label: 'General Info' },
                { id: 'docs', label: 'Documentation', badge: 3 },
                { id: 'settings', label: 'Configurations' }
              ]}
              activeTabId={activeTabId}
              onChange={(id) => setActiveTabId(id)}
            />
          </div>
        )
      },
      {
        name: 'Tooltip',
        desc: 'Context floating label menu triggered on hover.',
        code: `import { Tooltip } from './components/molecules/Tooltip/Tooltip';\n\n<Tooltip content="Hover hint text"><button>Hover</button></Tooltip>`,
        render: () => (
          <div className="showcase-element-group">
            <Tooltip content="This triggers profile edits" position="top">
              <Button variant="outline">Tooltip Top</Button>
            </Tooltip>
            <Tooltip content="Information popup menu details" position="right">
              <Button variant="outline">Tooltip Right</Button>
            </Tooltip>
          </div>
        )
      },
      {
        name: 'Timeline',
        desc: 'Horizontal or vertical progress connector steps.',
        code: `import { Timeline } from './components/molecules/Timeline/Timeline';\n\n<Timeline items={[{ title: 'Step 1' }]} />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <Timeline
              items={[
                { title: 'Cargo Checked In', date: '10:30 AM', status: 'complete', description: 'Package scanned at warehouse.' },
                { title: 'Dispatched to Transit', date: '11:15 AM', status: 'active', description: 'Driver assigned to vehicle #TX-8294.' },
                { title: 'Destination Delivery', date: 'Pending', status: 'upcoming', description: 'Estimated arrival in 4 hours.' }
              ]}
            />
          </div>
        )
      },
      {
        name: 'Avatar Group',
        desc: 'Overlapping stacks representing user groups with initial fallbacks.',
        code: `import { AvatarGroup } from './components/molecules/AvatarGroup/AvatarGroup';\n\n<AvatarGroup users={[{ name: 'John Doe' }]} />`,
        render: () => (
          <div className="showcase-element-group">
            <Avatar name="Alexander Wright" />
            <AvatarGroup
              users={[
                { name: 'Alexander Wright' },
                { name: 'John Doe' },
                { name: 'Jane Smith' },
                { name: 'Alice Johnson' },
                { name: 'Bob Carter' }
              ]}
              max={3}
            />
          </div>
        )
      }
    ],
    organisms: [
      {
        name: 'Modal & Drawer',
        desc: 'Responsive backdrop overlay cards and slide-over side drawers.',
        code: `import { ModalDrawer } from './components/organisms/ModalDrawer/ModalDrawer';\n\n<ModalDrawer isOpen={true} title="Dialog">Content</ModalDrawer>`,
        render: () => (
          <div className="showcase-element-group">
            <Button variant="solid" onClick={() => setIsModalOpen(true)}>Open Modal Dialog</Button>
            <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>Open Right Drawer</Button>

            <ModalDrawer
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="System Checkpoint"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="solid" onClick={() => { setIsModalOpen(false); triggerToast('success', 'Approved', 'Checklist approved successfully'); }}>Approve</Button>
                </>
              }
            >
              <p>Review the log checklist. This checklist commits approvals directly to the workspace database.</p>
            </ModalDrawer>

            <ModalDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              type="drawer"
              position="right"
              title="System Configuration Panel"
            >
              <p style={{ marginBottom: '16px' }}>Configure real-time safety and diagnostic tracking parameters.</p>
              <Switch label="Active diagnostics monitoring" checked={true} />
            </ModalDrawer>
          </div>
        )
      },
      {
        name: 'Event Calendar',
        desc: 'Days calculation grid highlighting event calendars.',
        code: `import { EventCalendar } from './components/organisms/EventCalendar/EventCalendar';\n\n<EventCalendar events={[]} />`,
        render: () => (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <EventCalendar
              events={[
                { id: 1, date: new Date().toISOString().split('T')[0], title: 'Project Code Review', type: 'warning' },
                { id: 2, date: new Date().toISOString().split('T')[0], title: 'Team Sync Meeting', type: 'primary' }
              ]}
            />
          </div>
        )
      },
      {
        name: 'User Profile Card',
        desc: 'Verified user details display card with toggling edits view.',
        code: `import { UserProfileCard } from './components/organisms/UserProfileCard/UserProfileCard';\n\n<UserProfileCard />`,
        render: () => (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <UserProfileCard 
              onSave={(data) => triggerToast('success', 'Profile Updated', `Successfully updated profile details for ${data.name}`)}
            />
          </div>
        )
      },
      {
        name: 'Accordion Group',
        desc: 'Interactive accordion lists with caret rotation height animations.',
        code: `import { AccordionGroup } from './components/organisms/AccordionGroup/AccordionGroup';\n\n<AccordionGroup items={[]} />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <AccordionGroup
              items={[
                { id: 1, title: 'How does system caching update?', content: 'Cache nodes communicate with Redis servers every 15 seconds to evaluate record invalidation.' },
                { id: 2, title: 'What is the limit for bulk record exports?', content: 'System Administrator accounts possess query capabilities of up to 10,000 logs in single downloads.' }
              ]}
            />
          </div>
        )
      },
      {
        name: 'Notification Center',
        desc: 'Stackable toasts overlay alerts and header drop-down bells.',
        code: `import { ToastContainer } from './components/organisms/NotificationCenter/NotificationCenter';\n\n// Trigger toast alerts dynamically`,
        render: () => (
          <div className="showcase-element-group">
            <Button variant="solid" color="success" onClick={() => triggerToast('success', 'Operation Complete', 'Task #8472 completed.')}>
              Success Toast
            </Button>
            <Button variant="solid" color="danger" onClick={() => triggerToast('danger', 'System Alert', 'Memory utilization warning #9204.')}>
              Danger Toast
            </Button>
            <NotificationsBell 
              notifications={[
                { id: 1, title: 'Server Space Low', description: 'Node B requires disk cleanup.', time: '1h ago', unread: true },
                { id: 2, title: 'Session Started', description: 'User Jane logged in.', time: '2h ago', unread: false }
              ]}
              onClearAll={() => alert('Clear')}
            />
          </div>
        )
      }
    ],
    templates: [
      {
        name: 'Smart Data Table',
        desc: 'Interactive sorting table with searching and page listings.',
        code: `import { SmartDataTable } from './components/templates/SmartDataTable/SmartDataTable';\n\n<SmartDataTable columns={[]} data={[]} />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <SmartDataTable
              columns={[
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'User Name', sortable: true },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Active' ? 'success' : 'danger'}>{row.status}</Badge> }
              ]}
              data={[
                { id: 1, name: 'Alexander Wright', role: 'Developer', status: 'Active' },
                { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' },
                { id: 3, name: 'John Doe', role: 'Support Supervisor', status: 'Inactive' },
                { id: 4, name: 'Bob Carter', role: 'Product Lead', status: 'Active' }
              ]}
              pageSize={3}
            />
          </div>
        )
      },
      {
        name: 'Analytics Dashboard',
        desc: 'Metrics grids, visual bar charts patterns, and live feeds.',
        code: `import { AnalyticsDashboard } from './components/templates/AnalyticsDashboard/AnalyticsDashboard';\n\n<AnalyticsDashboard />`,
        render: () => (
          <div style={{ width: '100%', maxHeight: '450px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '12px' }}>
            <AnalyticsDashboard />
          </div>
        )
      },
      {
        name: 'Kanban Board',
        desc: 'Columns board rendering tasks with moveable options.',
        code: `import { KanbanBoard } from './components/templates/KanbanBoard/KanbanBoard';\n\n<KanbanBoard />`,
        render: () => (
          <div style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <KanbanBoard />
          </div>
        )
      },
      {
        name: 'ChatHub',
        desc: 'Dual search sidebars, message bubble grids, and attachments toolbar.',
        code: `import { ChatHub } from './components/templates/ChatHub/ChatHub';\n\n<ChatHub />`,
        render: () => (
          <div style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
            <ChatHub />
          </div>
        )
      },
      {
        name: 'Media Dropzone',
        desc: 'Drag zones with file lists and upload progress.',
        code: `import { MediaDropzone } from './components/templates/MediaDropzone/MediaDropzone';\n\n<MediaDropzone />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <MediaDropzone />
          </div>
        )
      }
    ],
    pages: [
      {
        name: 'Dashboard Layout',
        desc: 'ERP navigation frames with bell alerts and toggle options.',
        code: `import { DashboardLayout } from './components/pages/DashboardLayout/DashboardLayout';\n\n<DashboardLayout>Content</DashboardLayout>`,
        render: () => (
          <div style={{ width: '100%', height: '350px', border: '1px solid var(--border-color)', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}>
            <DashboardLayout
              activeItemId="dash"
              onLogout={() => triggerToast('danger', 'Logout', 'Session destroyed.')}
            >
              <div style={{ padding: '16px' }}>
                <h3>Overview Controls</h3>
                <p>Inner dashboard contents go here.</p>
              </div>
            </DashboardLayout>
          </div>
        )
      },
      {
        name: 'Landing Page',
        desc: 'Hero titles, feature grids, and pricing cycles.',
        code: `import { LandingPage } from './components/pages/LandingPage/LandingPage';\n\n<LandingPage />`,
        render: () => (
          <div style={{ width: '100%', height: '400px', border: '1px solid var(--border-color)', overflow: 'auto', borderRadius: '12px' }}>
            <LandingPage onStartClick={() => triggerToast('info', 'Routing', 'Redirect to login screen.')} />
          </div>
        )
      },
      {
        name: 'Onboarding Wizard',
        desc: 'Forms step wizard timelines.',
        code: `import { OnboardingWizard } from './components/pages/OnboardingWizard/OnboardingWizard';\n\n<OnboardingWizard />`,
        render: () => (
          <div style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <OnboardingWizard onComplete={(data) => triggerToast('success', 'Wizard Completed', `Registered ${data.fleetName}`)} />
          </div>
        )
      },
      {
        name: 'Auth Screens',
        desc: 'Login credentials forms cards with reset passwords screens.',
        code: `import { AuthScreens } from './components/pages/AuthScreens/AuthScreens';\n\n<AuthScreens />`,
        render: () => (
          <div style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: 'var(--bg-app)' }}>
            <AuthScreens 
              onLoginSuccess={(data) => triggerToast('success', 'Logged In', `Welcome ${data.email}`)}
            />
          </div>
        )
      },
      {
        name: 'System Views',
        desc: 'Fallback error details cards for 404, 500, and 403 screens.',
        code: `import { SystemViews } from './components/pages/SystemViews/SystemViews';\n\n<SystemViews type="404" />`,
        render: () => {
          const [viewType, setViewType] = useState('404');
          return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button variant={viewType === '404' ? 'solid' : 'outline'} size="sm" onClick={() => setViewType('404')}>404 view</Button>
                <Button variant={viewType === '403' ? 'solid' : 'outline'} size="sm" onClick={() => setViewType('403')}>403 view</Button>
                <Button variant={viewType === '500' ? 'solid' : 'outline'} size="sm" onClick={() => setViewType('500')}>500 view</Button>
              </div>
              <SystemViews type={viewType} onBack={() => triggerToast('info', 'Redirect', 'Routing home.')} />
            </div>
          );
        }
      }
    ]
  };

  const selectedCompData = componentRegistry[activeCategory]?.find(
    c => c.name === activeComponent
  ) || componentRegistry[activeCategory]?.[0];

  return (
    <div className="showcase-shell">
      {/* 1. Global Toasts Layer */}
      <ToastContainer toasts={toasts} onCloseToast={handleCloseToast} />

      {/* 2. Top Header Toolbar */}
      <header className="showcase-header">
        <div className="header-branding">
          <span className="brand-logo-glow">▲</span>
          <h2>Hackathon Component Library</h2>
        </div>
        <div className="header-controls">
          <div className="custom-color-picker-wrapper" ref={pickerRef}>
            <button 
              type="button" 
              className="color-picker-trigger-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <div className="selected-color-swatch-circle" style={{ backgroundColor: primaryColor }} />
              <span className="picker-trigger-label">Accent Color</span>
            </button>

            {showColorPicker && (
              <div className="custom-color-picker-dropdown">
                <div className="picker-dropdown-header">Preset Accents</div>
                <div className="preset-colors-grid">
                  {presetColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      className={`preset-swatch-btn ${primaryColor.toLowerCase() === color.hex ? 'is-active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleSelectPreset(color.hex)}
                    >
                      {primaryColor.toLowerCase() === color.hex && <Check size={12} className="swatch-check-mark" />}
                    </button>
                  ))}
                </div>
                <div className="picker-dropdown-divider" />
                <div className="custom-hex-input-section">
                  <span className="input-label">Custom HEX</span>
                  <input
                    type="text"
                    value={customHex}
                    onChange={handleHexInputChange}
                    placeholder="#1E293B"
                    className="hex-text-input"
                  />
                </div>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            onClick={toggleTheme} 
            leftIcon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>
      </header>

      {/* 3. Main Workspace */}
      <div className="showcase-workspace">
        {/* Left Side: Sidebar categories & Component index */}
        <aside className="showcase-sidebar">
          {categories.map(cat => (
            <div key={cat.id} className="sidebar-group-box">
              <div 
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveComponent(componentRegistry[cat.id][0].name);
                }}
                className={`sidebar-group-title ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </div>
              {activeCategory === cat.id && (
                <ul className="sidebar-components-list">
                  {componentRegistry[cat.id].map(comp => (
                    <li
                      key={comp.name}
                      onClick={() => setActiveComponent(comp.name)}
                      className={`component-list-item ${activeComponent === comp.name ? 'is-active' : ''}`}
                    >
                      {comp.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        {/* Middle and Right: Interactive Playground & Code Viewer */}
        <main className="showcase-viewport">
          {selectedCompData ? (
            <div className="viewport-grid">
              {/* Left Sandbox Pane */}
              <section className="viewport-sandbox-panel">
                <div className="sandbox-panel-header">
                  <div className="sandbox-header-text">
                    <h3 className="sandbox-comp-title">{selectedCompData.name}</h3>
                    <p className="sandbox-comp-desc">{selectedCompData.desc}</p>
                  </div>
                </div>
                <div className="sandbox-live-renderer">
                  {selectedCompData.render()}
                </div>
              </section>

              {/* Right Code/Usage Pane */}
              <section className="viewport-code-panel">
                <div className="code-panel-header">
                  <div className="code-header-icon-row">
                    <Code size={18} />
                    <span>Usage Instructions</span>
                  </div>
                  <button 
                    className="copy-code-action-btn"
                    onClick={() => handleCopyCode(selectedCompData.code)}
                  >
                    {copied ? <Check size={16} className="copied-tick" /> : <Copy size={16} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="integration-guide-box">
                  <div className="integration-guide-title">
                    <span>Component Integration Guide</span>
                  </div>
                  <div className="integration-guide-steps">
                    <div className="integration-step">
                      <div className="step-number">1</div>
                      <div className="step-text">
                        <strong>Locate Source Files:</strong> Open the folder <code>src/components/{activeCategory}/{activeComponent}/</code> in this repository.
                      </div>
                    </div>
                    <div className="integration-step">
                      <div className="step-number">2</div>
                      <div className="step-text">
                        <strong>Copy to Project:</strong> Copy the component's <code>.jsx</code> and <code>.scss</code> files into your project's components directory.
                      </div>
                    </div>
                    <div className="integration-step">
                      <div className="step-number">3</div>
                      <div className="step-text">
                        <strong>Import & Render:</strong> Copy the code block below, import the component in your layout, and mount it.
                      </div>
                    </div>
                  </div>
                </div>

                <pre className="code-editor-box">
                  <code>{selectedCompData.code}</code>
                </pre>
              </section>
            </div>
          ) : (
            <div className="showcase-empty-viewport">
              <Info size={40} />
              <h4>Select a component to inspect details</h4>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default ShowcaseApp;
