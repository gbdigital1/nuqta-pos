import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Trash2, UserPlus, AlertCircle,
  Sparkles, Mail, Phone, MapPin, Download,
  Building2, Zap, RotateCcw, X, Check, MessageSquare,
  ArrowRight, Lock, LogOut, Bell, Key, Eye, EyeOff, CheckCircle2,
  BarChart3, PieChart, Sliders, Settings, Home, Plus, Activity,
  TrendingUp, Layers, HelpCircle, Menu, ChevronDown, SlidersHorizontal,
  ArrowUpDown, Globe, Calendar, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  vertical: string;
  customVertical?: string;
  outlets: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed_won' | 'closed_lost';
  score: number;
  source: string;
  region: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'admin' | 'manager' | 'support';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
}

interface AdminProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'NQ-LEAD-59201',
    name: 'Youssef Benjelloun',
    email: 'youssef@venezia.ma',
    phone: '+212 661-492049',
    vertical: 'restaurant',
    customVertical: '',
    outlets: '3',
    message: 'Looking for a seamless KDS kitchen display screen setup for our 3 branches in Marrakech Gueliz. Need speed.',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000 * 24).toISOString(),
    status: 'qualified',
    score: 88,
    source: 'Web Contact Form',
    region: 'Marrakech'
  },
  {
    id: 'NQ-LEAD-81029',
    name: 'Sofia Amrani',
    email: 'sofia@amraniboutique.com',
    phone: '+212 662-819301',
    vertical: 'cafe',
    customVertical: 'High-end Fashion Concept Store',
    outlets: '1',
    message: 'Requesting a demo of the tablet POS with integrated credit card reader and RFID barcode scanner. Need boutique theme.',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000 * 24).toISOString(),
    status: 'new',
    score: 75,
    source: 'Web Contact Form',
    region: 'Tangier'
  },
  {
    id: 'NQ-LEAD-10394',
    name: 'Anas El Alami',
    email: 'a.alami@patisserielamartine.ma',
    phone: '+212 655-204910',
    vertical: 'restaurant',
    customVertical: 'Artisanal Bakery & Tea Room',
    outlets: '2',
    message: 'Need a stable checkout that works when the store WiFi is down. Casablanca Gauthier location. Multi-cashier management is crucial.',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000 * 24).toISOString(),
    status: 'contacted',
    score: 82,
    source: 'Demo Request Portal',
    region: 'Casablanca'
  }
];

const SIMULATION_POOL: Partial<Lead>[] = [
  {
    name: 'Driss Bennani',
    email: 'driss@moroccanrugs.co',
    phone: '+212 660-394819',
    vertical: 'cafe',
    customVertical: 'Bazaar & Handcrafts Boutique',
    outlets: '2',
    message: 'We sell high-end Berber carpets in Marrakech Medina. Need credit card terminal integrations with multi-currency support.',
    score: 85,
    region: 'Marrakech',
    source: 'Live Simulator'
  },
  {
    name: 'Meryem Oudghiri',
    email: 'meryem.o@cafesofa.ma',
    phone: '+212 654-204910',
    vertical: 'restaurant',
    customVertical: 'Gourmet Brunch Café',
    outlets: '1',
    message: 'Opening a high-volume coffee shop in Rabat Hay Riad. Need fast printer triggers and Apple Pay support.',
    score: 76,
    region: 'Rabat',
    source: 'Live Simulator'
  },
  {
    name: 'Othmane Chraibi',
    email: 'ceo@chraibi-holding.ma',
    phone: '+212 661-829302',
    vertical: 'other',
    customVertical: 'Cosmetics Chain Store',
    outlets: '8',
    message: 'Evaluating Nuqta POS for roll-out across 8 stores in Morocco. We have strict multi-warehouse inventory guidelines.',
    score: 98,
    region: 'Casablanca',
    source: 'Partnership Program'
  },
  {
    name: 'Souad El Fassi',
    email: 's.elfassi@fassispa.com',
    phone: '+212 612-493019',
    vertical: 'retail',
    customVertical: 'Luxury Hammam & Wellness',
    outlets: '3',
    message: 'Need automated booking calendar syncing for our therapists and automatic client SMS reminders.',
    score: 87,
    region: 'Fes',
    source: 'Live Simulator'
  }
];

export default function Admin({ lang, onPageChange }: AdminProps) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!sessionStorage.getItem('nuqta_admin_token');
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab/Page: 'list' | 'analytics' | 'simulator' | 'settings'
  const [activeTab, setActiveTab] = useState<'list' | 'analytics' | 'simulator' | 'settings' | 'users'>('list');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Leads & Core State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'outlets'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modals & Notifications
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeBanner, setActiveBanner] = useState<Lead | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [seenLeadIds, setSeenLeadIds] = useState<string[]>(() => {
    const local = localStorage.getItem('nuqta_seen_lead_ids');
    try {
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  // Manual Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    vertical: 'cafe',
    customVertical: '',
    outlets: '1',
    message: '',
    region: 'Casablanca'
  });

  // Users & Team Management State
  const [users, setUsers] = useState<User[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'support' as User['role'],
    password: ''
  });

  const authFetch = (url: string, options: RequestInit = {}) => {
    const token = sessionStorage.getItem('nuqta_admin_token');
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Load leads from API on login
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchLeads = async () => {
      try {
        const res = await authFetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          const normalized = data.map((l: any) => ({
            ...l,
            id: l.id || l._id?.toString()
          }));
          setLeads(normalized);
        }
      } catch (err) {
        console.error('Failed to fetch leads:', err);
        setLeads(INITIAL_MOCK_LEADS);
      }
    };
    fetchLeads();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchUsers = async () => {
      try {
        const res = await authFetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data.map((u: any) => ({ ...u, id: u.id || u._id?.toString() })));
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, [isLoggedIn]);

  // Poll API every 10s for new leads
  useEffect(() => {
    if (!isLoggedIn) return;

    const pollLeads = async () => {
      try {
        const res = await authFetch('/api/leads');
        if (!res.ok) return;
        const data = await res.json();
        const normalized: Lead[] = data.map((l: any) => ({
          ...l,
          id: l.id || l._id?.toString()
        }));
        const currentIds = new Set(leads.map(l => l.id));
        const newLeads = normalized.filter(l => !currentIds.has(l.id));
        if (newLeads.length > 0) {
          setLeads(normalized);
          triggerNewLeadNotification(newLeads[0]);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    const interval = setInterval(pollLeads, 10000);
    return () => clearInterval(interval);
  }, [isLoggedIn, leads]);

  // Audio & Banner notification alert
  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);
    } catch {
      // Ignored if blocked by browser autoplay policy
    }
  };

  const triggerNewLeadNotification = (lead: Lead) => {
    playNotificationSound();
    setActiveBanner(lead);
    setTimeout(() => {
      setActiveBanner(prev => prev?.id === lead.id ? null : prev);
    }, 6000);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const markAsRead = (id: string) => {
    setSeenLeadIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('nuqta_seen_lead_ids', JSON.stringify(next));
      return next;
    });
  };

  // Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem('nuqta_admin_token', data.token);
        sessionStorage.setItem('nuqta_admin_user', JSON.stringify(data.user));
        setIsLoggedIn(true);
        showToast(lang === 'en' ? 'Access granted. Welcome back!' : 'Accès autorisé. Bienvenue !', 'success');
      } else {
        setLoginError(data.error || (lang === 'en' ? 'Incorrect credentials.' : 'Identifiants incorrects.'));
      }
    } catch (err) {
      console.error('Login failed:', err);
      setLoginError(lang === 'en' ? 'Server error. Please try again.' : 'Erreur serveur.');
    }

    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nuqta_admin_token');
    sessionStorage.removeItem('nuqta_admin_user');
    setIsLoggedIn(false);
    showToast(lang === 'en' ? 'Logged out successfully' : 'Déconnexion réussie', 'info');
  };

  const handleMarkAllAsRead = () => {
    const allIds = leads.map(l => l.id);
    setSeenLeadIds(allIds);
    localStorage.setItem('nuqta_seen_lead_ids', JSON.stringify(allIds));
    showToast(lang === 'en' ? 'All contacts marked as read' : 'Tous les contacts ont été marqués lus', 'success');
  };

  // Reset demo records
  const handleResetData = () => {
    if (window.confirm(lang === 'en' ? 'Are you sure you want to reset records to original demo state?' : 'Voulez-vous vraiment réinitialiser les données ?')) {
      setLeads(INITIAL_MOCK_LEADS);
      setSelectedLead(null);
      setSeenLeadIds([]);
      localStorage.setItem('nuqta_seen_lead_ids', '[]');
      showToast(lang === 'en' ? 'CRM reset to demo view' : 'CRM réinitialisé (vue démo)', 'info');
    }
  };

  // Delete permanent lead
  const handleDeleteLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'en' ? 'Permanently delete this client contact?' : 'Supprimer définitivement ce prospect ?')) {
      try {
        await authFetch(`/api/leads/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Delete failed:', err);
      }
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      showToast(lang === 'en' ? 'Client record deleted' : 'Fiche client supprimée', 'error');
    }
  };

  // Status Change Selector
  const handleStatusChange = async (id: string, newStatus: Lead['status'], e: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await authFetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('Status update failed:', err);
    }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    showToast(lang === 'en' ? 'Status updated successfully' : 'Statut mis à jour', 'success');
  };

  // Simulate Landing Page Submission
  const handleSimulateIncomingLead = () => {
    const randomIndex = Math.floor(Math.random() * SIMULATION_POOL.length);
    const template = SIMULATION_POOL[randomIndex];

    const newLead: Lead = {
      id: 'NQ-LEAD-' + Math.floor(Math.random() * 90000 + 10000),
      name: template.name!,
      email: template.email!,
      phone: template.phone!,
      vertical: template.vertical!,
      customVertical: template.customVertical || '',
      outlets: template.outlets || '1',
      message: template.message || 'No custom requirements specified.',
      createdAt: new Date().toISOString(),
      status: 'new',
      score: template.score || 70,
      source: template.source || 'Live Simulator',
      region: template.region || 'Casablanca'
    };

    setLeads(prev => [newLead, ...prev]);
    triggerNewLeadNotification(newLead);

    showToast(
      lang === 'en'
        ? `⚡ Simulation: New client ${newLead.name} submitted contact form!`
        : `⚡ Simulation : Nouveau message reçu de ${newLead.name} !`,
      'success'
    );
  };

  // Manual Lead Creation
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email || !newLeadForm.phone) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    const newLead: Lead = {
      id: 'NQ-LEAD-' + Math.floor(Math.random() * 90000 + 10000),
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      vertical: newLeadForm.vertical,
      customVertical: newLeadForm.customVertical,
      outlets: newLeadForm.outlets || '1',
      message: newLeadForm.message || 'Manual admin entry',
      createdAt: new Date().toISOString(),
      status: 'new',
      score: Math.floor(Math.random() * 30 + 70), // Score between 70 and 100
      source: 'Admin Portal',
      region: newLeadForm.region
    };

    try {
      await authFetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (err) {
      console.error('Create lead failed:', err);
    }
    setLeads(prev => [newLead, ...prev]);
    setIsAddModalOpen(false);

    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      vertical: 'cafe',
      customVertical: '',
      outlets: '1',
      message: '',
      region: 'Casablanca'
    });

    showToast(lang === 'en' ? 'New client contact added' : 'Nouveau client ajouté', 'success');
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    if (editingUserId) {
      try {
        await authFetch(`/api/users/${editingUserId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newUserForm.name,
            email: newUserForm.email,
            phone: newUserForm.phone,
            role: newUserForm.role
          })
        });
      } catch (err) {
        console.error('Update user failed:', err);
      }
      setUsers(prev => prev.map(u => u.id === editingUserId
        ? { ...u, name: newUserForm.name, email: newUserForm.email, phone: newUserForm.phone, role: newUserForm.role }
        : u));
      showToast(lang === 'en' ? 'User updated' : 'Utilisateur mis à jour', 'success');
    } else {
      const newUser: User = {
        id: 'NQ-USER-' + Math.floor(Math.random() * 90000 + 10000),
        name: newUserForm.name,
        email: newUserForm.email,
        phone: newUserForm.phone,
        role: newUserForm.role,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      try {
        const res = await authFetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newUser, password: newUserForm.password })
        });
        if (!res.ok) {
          const errData = await res.json();
          showToast(errData.error || 'Failed to create user', 'error');
          return;
        }
      } catch (err) {
        console.error('Create user failed:', err);
      }

      setUsers(prev => [newUser, ...prev]);
      showToast(lang === 'en' ? 'New team member added' : 'Nouveau membre ajouté', 'success');
    }

    setIsAddUserModalOpen(false);
    setEditingUserId(null);
    setNewUserForm({ name: '', email: '', phone: '', role: 'support', password: '' });
  };

  const handleDeleteUser = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(lang === 'en' ? 'Permanently delete this user account?' : 'Supprimer définitivement ce compte ?')) return;
    try {
      await authFetch(`/api/users/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Delete user failed:', err);
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(lang === 'en' ? 'User deleted' : 'Utilisateur supprimé', 'error');
  };

  const handleUserStatusChange = async (id: string, newStatus: User['status'], e?: React.MouseEvent | React.ChangeEvent) => {
    if (e) e.stopPropagation();
    try {
      await authFetch(`/api/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('User status update failed:', err);
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    showToast(
      lang === 'en' ? `User marked as ${newStatus}` : `Utilisateur marqué ${newStatus}`,
      newStatus === 'banned' ? 'error' : 'success'
    );
  };

  const handleUserRoleChange = async (id: string, newRole: User['role'], e?: React.ChangeEvent) => {
    if (e) e.stopPropagation();
    try {
      await authFetch(`/api/users/${id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
    } catch (err) {
      console.error('User role update failed:', err);
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    showToast(lang === 'en' ? 'Role updated' : 'Rôle mis à jour', 'success');
  };

  const openEditUserModal = (user: User, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingUserId(user.id);
    setNewUserForm({ name: user.name, email: user.email, phone: user.phone || '', role: user.role, password: '' });
    setIsAddUserModalOpen(true);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Sector', 'Outlets', 'Status', 'City', 'Created Date'];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.email,
      l.phone,
      l.customVertical || l.vertical,
      l.outlets,
      l.status,
      l.region,
      new Date(l.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nuqta_clients_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(lang === 'en' ? 'Exported successfully' : 'Exportation réussie', 'success');
  };

  // Calculations for simple stats
  const totalLeadsCount = leads.length;
  const unreadLeadsCount = leads.filter(l => !seenLeadIds.includes(l.id)).length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const totalOutletsCount = leads.reduce((acc, l) => acc + (parseInt(l.outlets) || 1), 0);
  const avgLeadScore = leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0;

  // Filters & Sorting logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.customVertical || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || lead.region === regionFilter;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let valA: any = a.createdAt;
    let valB: any = b.createdAt;

    if (sortBy === 'score') {
      valA = a.score;
      valB = b.score;
    } else if (sortBy === 'outlets') {
      valA = parseInt(a.outlets) || 1;
      valB = parseInt(b.outlets) || 1;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const uniqueRegions = Array.from(new Set(leads.map(l => l.region)));

  // Auto-mark as read on selection
  useEffect(() => {
    if (selectedLead) {
      markAsRead(selectedLead.id);
    }
  }, [selectedLead]);

  // Analytics Helpers
  const getCityBreakdown = () => {
    const cities: { [key: string]: number } = {};
    leads.forEach(l => {
      cities[l.region] = (cities[l.region] || 0) + 1;
    });
    return Object.keys(cities).map(city => ({
      name: city,
      count: cities[city],
      percentage: Math.round((cities[city] / Math.max(leads.length, 1)) * 100)
    })).sort((a, b) => b.count - a.count);
  };

  const getVerticalBreakdown = () => {
    const verticals: { [key: string]: number } = {};
    leads.forEach(l => {
      verticals[l.vertical] = (verticals[l.vertical] || 0) + 1;
    });
    const verticalLabels: { [key: string]: string } = {
      cafe: lang === 'en' ? 'Boutique & Retail' : 'Mode & Commerce',
      restaurant: lang === 'en' ? 'Café & Restaurant' : 'Café & Restaurant',
      salon: lang === 'en' ? 'Beauty Salon & Spa' : 'Salon & Spa',
      retail: lang === 'en' ? 'Supermarket' : 'Supermarché',
      other: lang === 'en' ? 'Other verticals' : 'Autres commerces'
    };
    return Object.keys(verticals).map(vert => ({
      name: verticalLabels[vert] || vert,
      count: verticals[vert],
      percentage: Math.round((verticals[vert] / Math.max(leads.length, 1)) * 100)
    })).sort((a, b) => b.count - a.count);
  };

  // Group leads by date (last 7 days) to display growth/trend
  const getTrendPoints = () => {
    const days = [];
    const totals = [];
    let cumulative = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { weekday: 'short', day: 'numeric' });
      days.push(dayStr);

      // Count total leads created up to this specific day (cumulative)
      const countUpToDay = leads.filter(l => {
        const leadDate = new Date(l.createdAt);
        // Set both to midnight for accurate comparison
        const dMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const leadMidnight = new Date(leadDate.getFullYear(), leadDate.getMonth(), leadDate.getDate()).getTime();
        return leadMidnight <= dMidnight;
      }).length;

      totals.push(countUpToDay);
    }

    return { labels: days, values: totals };
  };

  const trendData = getTrendPoints();
  const maxTrendValue = Math.max(...trendData.values, 5);

  // LOGIN SCREEN (White elegant background)
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] overflow-hidden font-sans">
        {/* Soft glowing ambient orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] rounded-full bg-blue-100/50 blur-[100px] animate-pulse duration-[7000ms]" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-[120px] animate-pulse duration-[9000ms]" />
        </div>

        {/* Apple-style minimalist card container */}
        <div className="relative z-10 w-full max-w-md px-6 py-10 mx-4 bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.04)] transition-all duration-300">

          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm mb-4">
              <img
                src="https://res.cloudinary.com/dozujlxeg/image/upload/v1781264016/nuqta_icon_zfdxjl.svg"
                alt="Nuqta Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
              {lang === 'en' ? 'Nuqta Portal' : 'Portail Admin Nuqta'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {lang === 'en' ? 'Admin Dashboard' : 'Espace Administration'}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {lang === 'en' ? 'Username' : "Nom d'utilisateur"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Entrez Votre Email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006AFF]/20 focus:border-[#006AFF] transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                {lang === 'en' ? 'Secret Key' : 'Mot de passe'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006AFF]/20 focus:border-[#006AFF] transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3.5 px-4 bg-[#006AFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              {isAuthenticating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{lang === 'en' ? 'Unlock CRM' : 'Déverrouiller'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    );
  }

  // ACTIVE MAIN ADMIN DASHBOARD WITH PERSISTENT SIDEBAR
  return (
    <div className="bg-[#F8FAFC] min-h-screen relative font-sans text-slate-700 flex flex-col lg:flex-row">

      {/* Real-time drop-down banner alert for incoming contacts */}
      <AnimatePresence>
        {activeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-blue-400 animate-bounce" />
              </div>
              <div className="space-y-1 flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    {lang === 'en' ? 'New Web Message' : 'Nouveau Message'}
                  </span>
                  <span className="text-[9px] text-slate-400">{lang === 'en' ? 'Just now' : "À l'instant"}</span>
                </div>
                <h3 className="text-xs font-bold text-white truncate">{activeBanner.name}</h3>
                <p className="text-[10px] text-slate-300">📍 {activeBanner.region} • {activeBanner.customVertical || activeBanner.vertical}</p>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedLead(activeBanner);
                      setActiveTab('list');
                      setActiveBanner(null);
                    }}
                    className="px-2.5 py-1 bg-[#006AFF] hover:bg-blue-600 text-white font-bold text-[9px] rounded-lg cursor-pointer transition-colors"
                  >
                    {lang === 'en' ? 'Review client' : 'Consulter'}
                  </button>
                  <button
                    onClick={() => setActiveBanner(null)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-[9px] rounded-lg cursor-pointer transition-colors"
                  >
                    {lang === 'en' ? 'Dismiss' : 'Fermer'}
                  </button>
                </div>
              </div>
              <button onClick={() => setActiveBanner(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating System Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in flex items-center gap-2 bg-white border border-slate-200 px-4 py-3.5 rounded-2xl shadow-xl max-w-sm">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          <p className="text-xs font-bold text-slate-800">{toast.message}</p>
        </div>
      )}

      {/* MOBILE TOP BAR (Hidden on Desktop) */}
      <div className="lg:hidden bg-white border-b border-slate-200 h-16 px-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpenMobile(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dozujlxeg/image/upload/v1781264016/nuqta_icon_zfdxjl.svg"
              alt="Nuqta Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-slate-900 text-sm tracking-tight">Nuqta CRM</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadLeadsCount > 0 && (
            <span className="bg-blue-100 text-[#006AFF] font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">
              {unreadLeadsCount} {lang === 'en' ? 'new' : 'neuf'}
            </span>
          )}
          <button
            onClick={() => onPageChange('home')}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl transition-all"
          >
            {lang === 'en' ? 'Exit' : 'Quitter'}
          </button>
        </div>
      </div>

      {/* SIDEBAR FOR DESKTOP & MOBILE MENU SLIDEOUT */}
      <AnimatePresence>
        {(isSidebarOpenMobile || true) && (
          <motion.aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://res.cloudinary.com/dozujlxeg/image/upload/v1781264016/nuqta_icon_zfdxjl.svg"
                    alt="Nuqta logo"
                    className="w-8 h-8 object-contain cursor-pointer"
                    onClick={() => onPageChange('home')}
                  />
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 leading-none">Nuqta CRM</h2>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">
                      {lang === 'en' ? 'Admin Portal' : 'Espace Admin'}
                    </span>
                  </div>
                </div>

                <button
                  className="lg:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  onClick={() => setIsSidebarOpenMobile(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Tabs Links */}
              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                  {lang === 'en' ? 'Navigation' : 'Menu Principal'}
                </div>

                {/* Tab: Inquiries List */}
                <button
                  onClick={() => {
                    setActiveTab('list');
                    setIsSidebarOpenMobile(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'list'
                    ? 'bg-blue-50 text-[#006AFF]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{lang === 'en' ? 'Client Inquiries' : 'Demandes Clients'}</span>
                  </div>
                  {unreadLeadsCount > 0 && (
                    <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full shrink-0">
                      {unreadLeadsCount}
                    </span>
                  )}
                </button>

                {/* Tab: Analytics */}
                <button
                  onClick={() => {
                    setActiveTab('analytics');
                    setIsSidebarOpenMobile(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'analytics'
                    ? 'bg-blue-50 text-[#006AFF]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 shrink-0" />
                    <span>{lang === 'en' ? 'Insights & Analytics' : 'Analyses & Graphes'}</span>
                  </div>
                  <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">
                    Live
                  </span>
                </button>

                {/* Tab: Simulator */}
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                    setIsSidebarOpenMobile(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'simulator'
                    ? 'bg-blue-50 text-[#006AFF]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 shrink-0 text-amber-500 animate-pulse" />
                    <span>{lang === 'en' ? 'Simulation Sandbox' : 'Bac à Sable (Démo)'}</span>
                  </div>
                </button>

                {/* Tab: Settings */}
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsSidebarOpenMobile(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'settings'
                    ? 'bg-blue-50 text-[#006AFF]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>{lang === 'en' ? 'System Settings' : 'Configuration'}</span>
                  </div>
                </button>

                {/* Tab: Users */}
                <button
                  onClick={() => { setActiveTab('users'); setIsSidebarOpenMobile(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'users' ? 'bg-blue-50 text-[#006AFF]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>{lang === 'en' ? 'User Management' : 'Gestion Utilisateurs'}</span>
                  </div>
                  <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
                    {users.length}
                  </span>
                </button>

                <div className="h-px bg-slate-100 my-6" />

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                  {lang === 'en' ? 'Shortcut Links' : 'Liens Rapides'}
                </div>

                <button
                  onClick={() => onPageChange('home')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer text-left"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>{lang === 'en' ? 'View Nuqta Website' : 'Voir le site Nuqta'}</span>
                </button>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="flex items-center gap-2.5 px-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-[#006AFF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 truncate">Admin Account</p>
                    <p className="text-[10px] text-slate-400 font-bold truncate">Morocco Division</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 rounded-xl transition-all cursor-pointer text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Sign Out' : 'Déconnexion'}</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR BACKDROP */}
      {isSidebarOpenMobile && (
        <div
          onClick={() => setIsSidebarOpenMobile(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* MAIN LAYOUT CONTENT WRAPPER */}
      <main className="flex-1 min-w-0 overflow-y-auto h-screen relative flex flex-col">

        {/* TOP STATUS RIBBON */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-extrabold text-slate-900">
                {activeTab === 'list' && (lang === 'en' ? 'Contacts Directory' : 'Répertoire des prospects')}
                {activeTab === 'analytics' && (lang === 'en' ? 'Insights Dashboard' : 'Tableau de bord d’Analyses')}
                {activeTab === 'simulator' && (lang === 'en' ? 'Simulation Sandbox' : 'Simulateur d’Envois')}
                {activeTab === 'settings' && (lang === 'en' ? 'System Configuration' : 'Configuration Système')}
                {activeTab === 'users' && (lang === 'en' ? 'User Management' : 'Gestion des Utilisateurs')}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-bold">
              {lang === 'en' ? 'Nuqta POS Management Suite' : 'Portail d’administration de la suite Nuqta POS'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 font-mono bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg">
              UTC: 2026-06-24 14:45
            </span>
            <button
              onClick={() => activeTab === 'users' ? setIsAddUserModalOpen(true) : setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#006AFF] hover:bg-blue-600 text-white rounded-xl text-xs font-black transition-all active:scale-97 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{activeTab === 'users' ? (lang === 'en' ? 'New User' : 'Nouvel Utilisateur') : (lang === 'en' ? 'New Contact' : 'Nouveau Prospect')}</span>
            </button>
          </div>
        </div>

        {/* PAGE BODY SWITCH */}
        <div className="p-6 space-y-6 flex-1 max-w-7xl w-full mx-auto pb-24">

          {/* TAB 1: LIST DATABASE */}
          {activeTab === 'list' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Simple, visual minimalist metrics bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Total Contacts' : 'Total Prospects'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{totalLeadsCount}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Unread Messages' : 'Non lus'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                      {unreadLeadsCount}
                      {unreadLeadsCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                      )}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'New Status' : 'Nouveaux'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{newLeadsCount}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Outlets Represented' : 'Points de vente'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{totalOutletsCount}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* CRM Directory Block */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] overflow-hidden">

                {/* Filters Toolbar */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/30 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                      <span>{lang === 'en' ? 'Client Directory' : 'Répertoire Clients'}</span>
                      <span className="text-[10px] font-extrabold bg-slate-100 border border-slate-200/40 px-2 py-0.5 rounded-full text-slate-600 font-mono">
                        {sortedLeads.length} {lang === 'en' ? 'found' : 'trouvés'}
                      </span>
                    </h3>

                    {unreadLeadsCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs font-extrabold text-[#006AFF] hover:text-blue-700 cursor-pointer text-left self-start sm:self-auto flex items-center gap-1.5 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Mark all as read' : 'Tout marquer comme lu'}</span>
                      </button>
                    )}
                  </div>

                  {/* Inputs Row - responsive sizing with elegant border-radius and chevrons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3">
                    {/* Search field */}
                    <div className="relative md:col-span-4">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'Search name, city, email...' : 'Rechercher par nom, ville, email...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] text-slate-800 font-semibold transition-all shadow-xs placeholder-slate-400"
                      />
                    </div>

                    {/* Status filter select */}
                    <div className="relative md:col-span-2">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Layers className="w-4 h-4" />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full text-xs pl-10 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] font-bold text-slate-600 appearance-none cursor-pointer transition-all shadow-xs"
                      >
                        <option value="all">{lang === 'en' ? 'All Statuses' : 'Tous les statuts'}</option>
                        <option value="new">{lang === 'en' ? 'New' : 'Nouveau'}</option>
                        <option value="contacted">{lang === 'en' ? 'Contacted' : 'Contacté'}</option>
                        <option value="qualified">{lang === 'en' ? 'Qualified' : 'Qualifié'}</option>
                        <option value="closed_won">{lang === 'en' ? 'Won' : 'Gagné'}</option>
                        <option value="closed_lost">{lang === 'en' ? 'Lost' : 'Perdu'}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* City filter select */}
                    <div className="relative md:col-span-2">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="w-full text-xs pl-10 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] font-bold text-slate-600 appearance-none cursor-pointer transition-all shadow-xs"
                      >
                        <option value="all">{lang === 'en' ? 'All Cities' : 'Toutes les villes'}</option>
                        {uniqueRegions.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Sort filter select */}
                    <div className="relative md:col-span-2">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full text-xs pl-10 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] font-bold text-slate-600 appearance-none cursor-pointer transition-all shadow-xs"
                      >
                        <option value="date">{lang === 'en' ? 'Sort: Date' : 'Tri: Date'}</option>
                        <option value="score">{lang === 'en' ? 'Sort: Score' : 'Tri: Score'}</option>
                        <option value="outlets">{lang === 'en' ? 'Sort: Outlets' : 'Tri: Boutiques'}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Direction toggler and CSV exporter */}
                    <div className="md:col-span-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="w-full text-xs py-3 border border-slate-200/80 bg-white hover:bg-slate-50 font-bold text-slate-600 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs active:scale-98"
                      >
                        <span className="font-mono text-slate-400">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                        <span className="text-[11px]">{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-500 rounded-2xl cursor-pointer transition-all shadow-xs active:scale-98 flex items-center justify-center shrink-0"
                        title="Export to CSV"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* TABLE FOR DESKTOP */}
                <div className="hidden lg:block overflow-x-auto">
                  {sortedLeads.length === 0 ? (
                    <div className="text-center py-20 space-y-3 bg-slate-50/10">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">{lang === 'en' ? 'No records match' : 'Aucun résultat trouvé'}</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">{lang === 'en' ? 'Try clearing or modifying the filter queries above.' : 'Modifiez vos filtres de recherche.'}</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs font-semibold text-slate-600 border-collapse">
                      <thead>
                        <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          <th className="px-6 py-4">{lang === 'en' ? 'Client / Contact' : 'Client / Message'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Business Profile' : 'Profil Commerce'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Location' : 'Localisation'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Priority Score' : 'Indice Score'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Pipeline Stage' : 'Étape du Pipeline'}</th>
                          <th className="px-6 py-4 text-right">{lang === 'en' ? 'Action' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {sortedLeads.map((lead) => {
                          const isSelected = selectedLead?.id === lead.id;
                          const isUnread = !seenLeadIds.includes(lead.id);
                          const initials = lead.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

                          return (
                            <tr
                              key={lead.id}
                              onClick={() => setSelectedLead(lead)}
                              className={`hover:bg-slate-50/50 transition-all cursor-pointer ${isSelected ? 'bg-blue-50/30 border-l-4 border-l-[#006AFF]' : ''
                                } ${isUnread ? 'bg-blue-50/10 font-bold text-slate-900' : ''}`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {/* High-end European Style Initials Avatar */}
                                  <div className="relative shrink-0">
                                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 font-extrabold flex items-center justify-center text-[11px] tracking-wide">
                                      {initials}
                                    </div>
                                    {isUnread && (
                                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#006AFF] ring-2 ring-white" title="New message alert" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold text-slate-900 text-sm">{lead.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-mono font-medium">{lead.email}</p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    {lead.customVertical || lead.vertical.replace('_', ' ')}
                                  </span>
                                  <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5">
                                    <span>{lead.outlets} {parseInt(lead.outlets) > 1 ? 'Branches' : 'Single Branch'}</span>
                                  </p>
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <span className="font-extrabold text-slate-800 flex items-center gap-1.5 text-[11px]">
                                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                                  {lead.region}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-lg font-mono text-[11px] font-black ${lead.score >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                    lead.score >= 75 ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                      'bg-slate-100 text-slate-600 border border-slate-200/50'
                                    }`}>
                                    {lead.score}%
                                  </span>
                                  <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden hidden xl:block">
                                    <div
                                      className={`h-full rounded-full ${lead.score >= 85 ? 'bg-emerald-500' : lead.score >= 75 ? 'bg-blue-500' : 'bg-slate-400'}`}
                                      style={{ width: `${lead.score}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                <div className="relative inline-block w-full max-w-[130px]">
                                  <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${lead.status === 'new' ? 'bg-[#006AFF]' :
                                    lead.status === 'contacted' ? 'bg-amber-500' :
                                      lead.status === 'qualified' ? 'bg-purple-500' :
                                        lead.status === 'closed_won' ? 'bg-emerald-500' :
                                          'bg-rose-500'
                                    }`} />
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as any, e)}
                                    className={`w-full appearance-none pl-6.5 pr-7 py-1.5 rounded-xl text-[10px] font-black tracking-wider transition-all focus:outline-none uppercase cursor-pointer border ${lead.status === 'new' ? 'bg-blue-50/40 text-blue-700 border-blue-200/50' :
                                      lead.status === 'contacted' ? 'bg-amber-50/40 text-amber-700 border-amber-200/50' :
                                        lead.status === 'qualified' ? 'bg-purple-50/40 text-purple-700 border-purple-200/50' :
                                          lead.status === 'closed_won' ? 'bg-emerald-50/40 text-emerald-700 border-emerald-200/50' :
                                            'bg-rose-50/40 text-rose-700 border-rose-200/50'
                                      }`}
                                  >
                                    <option value="new">NEW</option>
                                    <option value="contacted">CONTACTED</option>
                                    <option value="qualified">QUALIFIED</option>
                                    <option value="closed_won">WON</option>
                                    <option value="closed_lost">LOST</option>
                                  </select>
                                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                              </td>

                              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteLead(lead.id, e)}
                                  className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
                                  title="Delete Client"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* MOBILE CARD STACK (NO EMOJIS, HIGH ELEGANCIES) */}
                <div className="block lg:hidden divide-y divide-slate-100">
                  {sortedLeads.length === 0 ? (
                    <div className="text-center py-16 space-y-3 bg-slate-50/10">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border flex items-center justify-center mx-auto text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-700">{lang === 'en' ? 'No clients found' : 'Aucun client trouvé'}</h4>
                        <p className="text-xs text-slate-400">{lang === 'en' ? 'Clear search filter and retry.' : 'Modifiez vos filtres.'}</p>
                      </div>
                    </div>
                  ) : (
                    sortedLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id;
                      const isUnread = !seenLeadIds.includes(lead.id);

                      const statusColors = {
                        new: 'bg-blue-500',
                        contacted: 'bg-amber-500',
                        qualified: 'bg-purple-500',
                        closed_won: 'bg-emerald-500',
                        closed_lost: 'bg-rose-500'
                      };

                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-5 relative flex items-start gap-3.5 transition-colors active:bg-slate-50 cursor-pointer ${isSelected ? 'bg-blue-50/20' : ''
                            } ${isUnread ? 'bg-blue-50/5 font-bold' : ''}`}
                        >
                          <div className={`absolute top-0 bottom-0 left-0 w-1 ${statusColors[lead.status] || 'bg-slate-300'}`} />

                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 min-w-0">
                                {isUnread && (
                                  <span className="w-2 h-2 rounded-full bg-[#006AFF] shrink-0 animate-pulse" />
                                )}
                                <h4 className="font-extrabold text-slate-900 truncate text-sm">{lead.name}</h4>
                              </div>
                              <span className="text-[9px] font-black uppercase bg-slate-100 border border-slate-200/50 text-slate-600 px-2 py-0.5 rounded-md shrink-0">
                                {lead.region}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <span className="text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-150">
                                {lead.customVertical || lead.vertical.replace('_', ' ')}
                              </span>
                              <span>•</span>
                              <span>{lead.outlets} {parseInt(lead.outlets) > 1 ? 'Branches' : 'Branch'}</span>
                            </div>

                            {lead.message && (
                              <p className="text-xs text-slate-500 line-clamp-2 bg-slate-50/50 p-3 rounded-xl border border-slate-150/40 mt-1.5 font-medium leading-relaxed">
                                "{lead.message}"
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-1.5">
                              <span className="text-[10px] text-slate-400 font-extrabold uppercase font-mono tracking-wider">
                                {new Date(lead.createdAt).toLocaleDateString(lang === 'en' ? 'en' : 'fr', {
                                  month: 'short', day: 'numeric'
                                })}
                              </span>

                              <div className="flex items-center gap-2.5">
                                <span className={`text-[9px] font-black border px-2 py-0.5 rounded-md font-mono ${lead.score >= 85 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-150'
                                  }`}>
                                  Score: {lead.score}%
                                </span>
                                <span className="text-[9px] font-black tracking-wider uppercase text-[#006AFF]">
                                  {lead.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between items-center font-mono">
                  <span>Nuqta Control Console • v3.0</span>
                  <span>Total: {leads.length} leads</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DETAILED INSIGHTS & ANALYTICS */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Top Analytical Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>{lang === 'en' ? 'Market Demand Report' : 'Rapport de Demande Marché'}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {lang === 'en' ? 'Geographic & Industry Verticals Share' : 'Répartition Géographique & Secteurs'}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-xl">
                    {lang === 'en'
                      ? 'Live calculation based on inbound contacts. Track which regions are leading in Nuqta POS adoption.'
                      : 'Calcul en temps réel basé sur les prospects reçus. Identifiez les régions clés d’adoption de Nuqta POS.'
                    }
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all active:scale-97 cursor-pointer self-start md:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Export Metrics CSV' : 'Exporter les Données'}</span>
                </button>
              </div>

              {/* High-Level Analytical KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Average Lead Score' : 'Score de Qualification'}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">{avgLeadScore}%</h3>
                    <span className="text-[10px] font-black text-emerald-500 uppercase">High intent</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgLeadScore}%` }} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'High Profile Leads' : 'Inscriptions VIP (>85)'}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {leads.filter(l => l.score >= 85).length}
                    </h3>
                    <span className="text-xs text-slate-400">/{leads.length} leads</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-3">⚡ Onboarding prioritized</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Average Outlets Size' : 'Taille Moyenne Points'}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {(totalOutletsCount / Math.max(leads.length, 1)).toFixed(1)}
                    </h3>
                    <span className="text-xs text-slate-400">outlets/merchant</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-3">🏬 Multi-warehouse setups scale</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Pipeline Volume' : 'Volume d’Abonnements'}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {leads.filter(l => l.status === 'qualified' || l.status === 'closed_won').length}
                    </h3>
                    <span className="text-[10px] font-black text-blue-500 uppercase">Qualified / Won</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(leads.filter(l => l.status === 'qualified' || l.status === 'closed_won').length / Math.max(leads.length, 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Visualized Charts Section */}
              {(() => {
                const verticalDataList = getVerticalBreakdown();
                const cityDataList = getCityBreakdown();

                const lineChartData = {
                  labels: trendData.labels,
                  datasets: [
                    {
                      label: lang === 'en' ? 'Subscribers Cumulative Growth' : 'Croissance Cumulative',
                      data: trendData.values,
                      borderColor: '#006AFF',
                      backgroundColor: 'rgba(0, 106, 255, 0.04)',
                      borderWidth: 2,
                      pointBackgroundColor: '#FFFFFF',
                      pointBorderColor: '#006AFF',
                      pointHoverBackgroundColor: '#006AFF',
                      pointHoverBorderColor: '#FFFFFF',
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      fill: true,
                      tension: 0.35,
                    }
                  ]
                };

                const lineChartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      padding: 12,
                      backgroundColor: '#1E293B',
                      titleColor: '#FFFFFF',
                      bodyColor: '#FFFFFF',
                      bodyFont: { size: 11, weight: 'bold' as const },
                      cornerRadius: 12,
                      displayColors: false,
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: '#94A3B8',
                        font: { size: 10, weight: 'bold' as const }
                      }
                    },
                    y: {
                      grid: {
                        color: '#F1F5F9',
                      },
                      ticks: {
                        color: '#94A3B8',
                        font: { size: 10, weight: 'bold' as const }
                      }
                    }
                  }
                };

                const doughnutChartData = {
                  labels: verticalDataList.map(v => v.name),
                  datasets: [
                    {
                      data: verticalDataList.map(v => v.count),
                      backgroundColor: [
                        '#006AFF', // Nuqta Blue
                        '#10B981', // Emerald
                        '#F59E0B', // Amber
                        '#8B5CF6', // Purple
                        '#EF4444', // Red
                      ],
                      borderWidth: 3,
                      borderColor: '#FFFFFF',
                      hoverOffset: 4,
                    }
                  ]
                };

                const doughnutChartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                      labels: {
                        boxWidth: 8,
                        padding: 12,
                        font: { size: 10, weight: 'bold' as const },
                        color: '#475569',
                      }
                    },
                    tooltip: {
                      padding: 12,
                      backgroundColor: '#1E293B',
                      titleColor: '#FFFFFF',
                      bodyColor: '#FFFFFF',
                      cornerRadius: 12,
                    }
                  },
                  cutout: '72%',
                };

                const barChartData = {
                  labels: cityDataList.map(c => c.name),
                  datasets: [
                    {
                      label: lang === 'en' ? 'Leads Count' : 'Nombre de prospects',
                      data: cityDataList.map(c => c.count),
                      backgroundColor: 'rgba(0, 106, 255, 0.85)',
                      hoverBackgroundColor: '#006AFF',
                      borderRadius: 10,
                      borderSkipped: false,
                      barThickness: 16,
                    }
                  ]
                };

                const barChartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      padding: 12,
                      backgroundColor: '#1E293B',
                      titleColor: '#FFFFFF',
                      bodyColor: '#FFFFFF',
                      cornerRadius: 12,
                      displayColors: false,
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: '#94A3B8',
                        font: { size: 10, weight: 'bold' as const }
                      }
                    },
                    y: {
                      grid: {
                        color: '#F1F5F9',
                      },
                      ticks: {
                        color: '#94A3B8',
                        font: { size: 10, weight: 'bold' as const },
                        precision: 0,
                      }
                    }
                  }
                };

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                      {/* 1. HIGH-END LINE CHART: PIPELINE GROWTH */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Inbound Growth Velocity' : 'Vitesse de Croissance du Pipeline'}</h4>
                            <p className="text-[10px] text-slate-400 font-bold">{lang === 'en' ? 'Cumulative client registrations over the past 7 days' : 'Inscriptions cumulées des 7 derniers jours'}</p>
                          </div>
                          <span className="text-xs font-black bg-blue-50 text-[#006AFF] px-3 py-1 rounded-full border border-blue-100/40 font-mono">+{leads.length} leads</span>
                        </div>

                        {/* ChartJS Line wrapper */}
                        <div className="h-64 relative">
                          <Line data={lineChartData} options={lineChartOptions} />
                        </div>
                      </div>

                      {/* 2. REGIONAL DEMAND RANK */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] space-y-6">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Geographic Demand' : 'Volume par Ville'}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">{lang === 'en' ? 'Inbound count rank per city' : 'Classement d’inscriptions par ville'}</p>
                        </div>

                        {/* ChartJS Bar wrapper */}
                        <div className="h-64 relative">
                          {cityDataList.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">No data available</div>
                          ) : (
                            <Bar data={barChartData} options={barChartOptions} />
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Breakdown details: Verticals & Conversion Stage */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* 3. BUSINESS VERTICALS BREAKDOWN */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] space-y-6">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Industry Verticals Share' : 'Répartition des Secteurs d’Activité'}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">{lang === 'en' ? 'Subscription interest mapped to business profile' : 'Intérêt d’abonnement selon le secteur'}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          {/* Doughnut Chart */}
                          <div className="sm:col-span-5 h-44 relative">
                            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                          </div>

                          {/* Legend / Lists */}
                          <div className="sm:col-span-7 space-y-2">
                            {verticalDataList.map((vert, idx) => {
                              const borderColors = [
                                'border-l-[#006AFF]',
                                'border-l-[#10B981]',
                                'border-l-[#F59E0B]',
                                'border-l-[#8B5CF6]',
                                'border-l-[#EF4444]',
                              ];
                              return (
                                <div key={vert.name} className={`px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 border-l-4 ${borderColors[idx % borderColors.length]} flex items-center justify-between`}>
                                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider truncate mr-2">{vert.name}</span>
                                  <span className="text-xs font-black text-slate-800 shrink-0 font-mono">{vert.count} ({vert.percentage}%)</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* 4. PIPELINE FUNNEL PROGRESS */}
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] space-y-6">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Lead Status Conversion Funnel' : 'Entonnoir de Conversion Commercial'}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">{lang === 'en' ? 'CRM pipeline stages count and percentage progress' : 'État de conversion des fiches dans le CRM'}</p>
                        </div>

                        <div className="space-y-3.5">
                          {[
                            { key: 'new', label: lang === 'en' ? 'New Inquiries' : 'Nouvelles Demandes', color: 'bg-blue-500' },
                            { key: 'contacted', label: lang === 'en' ? 'First Follow-up' : 'Premier Contact', color: 'bg-amber-500' },
                            { key: 'qualified', label: lang === 'en' ? 'Qualified Merchants' : 'Commerçants Qualifiés', color: 'bg-purple-500' },
                            { key: 'closed_won', label: lang === 'en' ? 'Onboarded (Closed Won)' : 'Abonnés Gagnés (Won)', color: 'bg-emerald-500' }
                          ].map(stage => {
                            const count = leads.filter(l => l.status === stage.key).length;
                            const percent = Math.round((count / Math.max(leads.length, 1)) * 100);
                            return (
                              <div key={stage.key} className="space-y-1">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                                  <span>{stage.label}</span>
                                  <span className="font-mono text-slate-900 font-extrabold">{count} leads ({percent}%)</span>
                                </div>
                                <div className="w-full bg-slate-50 border border-slate-100 h-6.5 rounded-xl relative overflow-hidden flex items-center px-3">
                                  <div
                                    className={`${stage.color} h-full absolute left-0 top-0 opacity-15 transition-all duration-500`}
                                    style={{ width: `${percent}%` }}
                                  />
                                  <div className="w-full flex items-center justify-between z-10">
                                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Conversion</span>
                                    <span className="text-[10px] font-black text-slate-700 font-mono">{percent}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

            </motion.div>
          )}

          {/* TAB 3: DEMO SIMULATION SANDBOX */}
          {activeTab === 'simulator' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
                <div className="inline-flex p-4 bg-blue-50 border border-blue-100 text-[#006AFF] rounded-2xl shadow-sm mb-2">
                  <Zap className="w-8 h-8 animate-pulse" />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  {lang === 'en' ? 'Nuqta CRM Simulation Sandbox' : 'Espace de Simulation Sandbox'}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
                  {lang === 'en'
                    ? 'Want to test how Nuqta CRM handles incoming client requests in real-time? Use this panel to inject simulated contact form submissions!'
                    : 'Vous souhaitez tester la réactivité de l’administration de Nuqta en temps réel ? Utilisez ces boutons pour simuler des envois de formulaires de contact !'
                  }
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl text-left border space-y-2 font-semibold">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What happens when you simulate?</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-medium">
                    <li>Creates a mock merchant profile with unique phone, sector and city in Morocco.</li>
                    <li>Saves the lead in the persistent LocalStorage database instantly.</li>
                    <li>Plays the custom high-frequency Nuqta chime tone audio notification.</li>
                    <li>Drops down a real-time banner alert on top of the screen instantly.</li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col gap-2.5">
                  <button
                    onClick={handleSimulateIncomingLead}
                    className="w-full py-4 bg-[#006AFF] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'en' ? 'Trigger Random Form Submission' : 'Simuler un Envoi Aléatoire'}</span>
                  </button>

                  <button
                    onClick={() => {
                      SIMULATION_POOL.forEach((item, idx) => {
                        setTimeout(() => {
                          const mockLead: Lead = {
                            id: 'NQ-LEAD-' + Math.floor(Math.random() * 90000 + 10000),
                            name: item.name!,
                            email: item.email!,
                            phone: item.phone!,
                            vertical: item.vertical!,
                            customVertical: item.customVertical || '',
                            outlets: item.outlets || '1',
                            message: item.message || 'Bulk sandbox simulation',
                            createdAt: new Date().toISOString(),
                            status: 'new',
                            score: item.score || 80,
                            source: 'Sandbox Bulk',
                            region: item.region || 'Casablanca'
                          };
                          setLeads(prev => [mockLead, ...prev]);
                        }, idx * 1200);
                      });
                      showToast('Injected bulk simulated clients!', 'success');
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-slate-500" />
                    <span>{lang === 'en' ? 'Inject All Simulation Candidates (Bulk)' : 'Injecter Tout le Pool de Simulation'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SYSTEM SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="border-b pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-[#006AFF]" />
                    <span>{lang === 'en' ? 'CRM Control Panel & Settings' : 'Tableau de Configuration CRM'}</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">
                    Manage administrative data resets, file backup exports, and mock settings.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Database Actions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Data Diagnostics' : 'Diagnostics & Nettoyage'}</h4>
                    <p className="text-xs text-slate-500">
                      Clear client histories or reset the database back to original template values. Recommended for presentation prep.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={handleResetData}
                        className="p-3 bg-slate-50 hover:bg-rose-50 border hover:border-rose-200 text-slate-700 hover:text-rose-600 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Reset CRM to Mock State' : 'Réinitialiser le CRM'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete all data permanently? This action cannot be undone.')) {
                            setLeads([]);
                            setSelectedLead(null);
                            showToast('Local view cleared. API data intact.', 'error');
                          }
                        }}
                        className="p-3 bg-slate-50 hover:bg-rose-100/60 border border-slate-200 hover:border-rose-300 text-rose-600 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Wipe Entire CRM Database' : 'Vider toute la base de données'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Export Options */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{lang === 'en' ? 'Export Backups' : 'Sauvegarde des Données'}</h4>
                    <p className="text-xs text-slate-500">
                      Download spreadsheet compatible files of active merchants for CRM integration with Excel/Salesforce.
                    </p>

                    <button
                      onClick={handleExportCSV}
                      className="p-3 bg-[#006AFF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Export Client Leads (.csv)' : 'Exporter les fiches au format CSV'}</span>
                    </button>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Technical details */}
                  <div className="p-4 bg-slate-50 rounded-2xl border text-xs space-y-1.5 font-semibold text-slate-500 leading-relaxed font-mono">
                    <div className="flex justify-between">
                      <span>CRM ENGINE VERSION:</span>
                      <span className="text-slate-800 font-bold">2.0.4 (REACT 19)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PERSISTENCE:</span>
                      <span className="text-slate-800 font-bold">LOCALSTORAGE (SYNCED)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CHIME AUDIO PATH:</span>
                      <span className="text-slate-800 font-bold">BROWSER WEBAUDIO OSCILLATOR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DEFAULT REGION CODE:</span>
                      <span className="text-slate-800 font-bold">MA (+212)</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Total Users' : 'Total Utilisateurs'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{users.length}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Active' : 'Actifs'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{users.filter(u => u.status === 'active').length}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Inactive' : 'Inactifs'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{users.filter(u => u.status === 'inactive').length}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Banned' : 'Bannis'}</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{users.filter(u => u.status === 'banned').length}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/30 space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span>{lang === 'en' ? 'Team Members' : "Membres de l'équipe"}</span>
                    <span className="text-[10px] font-extrabold bg-slate-100 border border-slate-200/40 px-2 py-0.5 rounded-full text-slate-600 font-mono">
                      {filteredUsers.length} {lang === 'en' ? 'found' : 'trouvés'}
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3">
                    <div className="relative md:col-span-5">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'Search name or email...' : 'Rechercher nom ou email...'}
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] text-slate-800 font-semibold transition-all shadow-xs placeholder-slate-400"
                      />
                    </div>

                    <div className="relative md:col-span-3">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Key className="w-4 h-4" />
                      </div>
                      <select
                        value={userRoleFilter}
                        onChange={(e) => setUserRoleFilter(e.target.value)}
                        className="w-full text-xs pl-10 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] font-bold text-slate-600 appearance-none cursor-pointer transition-all shadow-xs"
                      >
                        <option value="all">{lang === 'en' ? 'All Roles' : 'Tous les rôles'}</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="support">Support</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="relative md:col-span-4">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Layers className="w-4 h-4" />
                      </div>
                      <select
                        value={userStatusFilter}
                        onChange={(e) => setUserStatusFilter(e.target.value)}
                        className="w-full text-xs pl-10 pr-8 py-3 rounded-2xl border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF]/10 focus:border-[#006AFF] font-bold text-slate-600 appearance-none cursor-pointer transition-all shadow-xs"
                      >
                        <option value="all">{lang === 'en' ? 'All Statuses' : 'Tous les statuts'}</option>
                        <option value="active">{lang === 'en' ? 'Active' : 'Actif'}</option>
                        <option value="inactive">{lang === 'en' ? 'Inactive' : 'Inactif'}</option>
                        <option value="banned">{lang === 'en' ? 'Banned' : 'Banni'}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden lg:block overflow-x-auto">
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-20 space-y-3 bg-slate-50/10">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-700">{lang === 'en' ? 'No users found' : 'Aucun utilisateur trouvé'}</h4>
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs font-semibold text-slate-600 border-collapse">
                      <thead>
                        <tr className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          <th className="px-6 py-4">{lang === 'en' ? 'User' : 'Utilisateur'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Contact' : 'Contact'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Role' : 'Rôle'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Status' : 'Statut'}</th>
                          <th className="px-6 py-4">{lang === 'en' ? 'Joined' : 'Inscrit'}</th>
                          <th className="px-6 py-4 text-right">{lang === 'en' ? 'Actions' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {filteredUsers.map(u => {
                          const initials = u.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                          return (
                            <tr key={u.id} onClick={() => openEditUserModal(u)} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 font-extrabold flex items-center justify-center text-[11px]">
                                    {initials}
                                  </div>
                                  <h4 className="font-extrabold text-slate-900 text-sm">{u.name}</h4>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-[10px] text-slate-400 font-mono font-medium">{u.email}</p>
                                {u.phone && <p className="text-[10px] text-slate-400 font-mono">{u.phone}</p>}
                              </td>
                              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={u.role}
                                  onChange={(e) => handleUserRoleChange(u.id, e.target.value as User['role'], e)}
                                  className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                                >
                                  <option value="super_admin">Super Admin</option>
                                  <option value="admin">Admin</option>
                                  <option value="manager">Manager</option>
                                  <option value="support">Support</option>
                                </select>
                              </td>
                              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                <div className="relative inline-block w-full max-w-[130px]">
                                  <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : u.status === 'inactive' ? 'bg-amber-500' : 'bg-rose-500'
                                    }`} />
                                  <select
                                    value={u.status}
                                    onChange={(e) => handleUserStatusChange(u.id, e.target.value as User['status'], e)}
                                    className={`w-full appearance-none pl-6.5 pr-7 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase cursor-pointer border ${u.status === 'active' ? 'bg-emerald-50/40 text-emerald-700 border-emerald-200/50' :
                                      u.status === 'inactive' ? 'bg-amber-50/40 text-amber-700 border-amber-200/50' :
                                        'bg-rose-50/40 text-rose-700 border-rose-200/50'
                                      }`}
                                  >
                                    <option value="active">ACTIVE</option>
                                    <option value="inactive">INACTIVE</option>
                                    <option value="banned">BANNED</option>
                                  </select>
                                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                              </td>
                              <td className="px-6 py-4 text-[10px] text-slate-400 font-mono">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-end gap-1">
                                  <button onClick={(e) => openEditUserModal(u, e)} className="p-2 hover:bg-blue-50 text-slate-300 hover:text-blue-600 rounded-xl transition-all cursor-pointer" title="Edit">
                                    <Settings className="w-4 h-4" />
                                  </button>
                                  <button onClick={(e) => handleDeleteUser(u.id, e)} className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-xl transition-all cursor-pointer" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* MOBILE CARD STACK */}
                <div className="block lg:hidden divide-y divide-slate-100">
                  {filteredUsers.map(u => (
                    <div key={u.id} onClick={() => openEditUserModal(u)} className="p-5 flex items-start gap-3.5 cursor-pointer active:bg-slate-50">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-slate-900 text-sm truncate">{u.name}</h4>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : u.status === 'inactive' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                            }`}>{u.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                        <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-150 inline-block">{u.role.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </main>

      {/* DETAILS DRAWER / SIDE OVER PANEL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex justify-end">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slider Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            >

              {/* Header */}
              <div className="p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1 text-[9px] bg-blue-100 text-blue-850 px-2 py-0.5 rounded-full font-black uppercase">
                    {selectedLead.id}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{selectedLead.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <X className="w-5 h-5 mx-auto" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Contact Details</h4>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 text-xs font-semibold">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Business Sector & Outlets</span>
                        <span className="text-slate-800 font-bold uppercase">{selectedLead.customVertical || selectedLead.vertical} ({selectedLead.outlets} outlets)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-t border-slate-150 pt-2.5">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Moroccan Region</span>
                        <span className="text-slate-800 font-bold">{selectedLead.region}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-t border-slate-150 pt-2.5">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">WhatsApp Phone</span>
                        <span className="text-slate-800 font-mono font-bold">{selectedLead.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-t border-slate-150 pt-2.5">
                      <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold tracking-wider">Contact Email</span>
                        <span className="text-slate-800 font-mono font-bold">{selectedLead.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Submitted Inquiry Message' : 'Message Envoyé'}</h4>
                  <div className="p-4 bg-blue-50/50 border border-blue-100/40 rounded-xl text-xs font-semibold text-slate-700 leading-relaxed italic">
                    "{selectedLead.message || 'No specific inquiries detailed.'}"
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Change Contact Stage' : 'Changer l’état de contact'}</h4>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as any, e)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    <option value="new">🔵 NEW (Uncontacted)</option>
                    <option value="contacted">🟡 CONTACTED (Follow-up ping)</option>
                    <option value="qualified">🟣 QUALIFIED (High subscription intent)</option>
                    <option value="closed_won">🟢 CLOSED WON (Onboarded subscriber)</option>
                    <option value="closed_lost">🔴 CLOSED LOST (Archived)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <a
                    href={`mailto:${selectedLead.email}?subject=Nuqta%20POS%20Inquiry`}
                    className="flex items-center justify-center gap-1.5 p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all text-center"
                    style={{ minHeight: '44px' }}
                  >
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>{lang === 'en' ? 'Email Client' : 'Email'}</span>
                  </a>

                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all text-center"
                    style={{ minHeight: '44px' }}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp Ping</span>
                  </a>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-150 bg-slate-50 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    handleDeleteLead(selectedLead.id, e);
                  }}
                  className="flex-1 py-3 border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  style={{ minHeight: '44px' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Delete' : 'Supprimer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  {lang === 'en' ? 'Close' : 'Fermer'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MANUAL PROSPECT MODAL ADDITION OVERLAY */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-scale-in relative max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#006AFF]" />
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                  {lang === 'en' ? 'Add Prospect Manually' : 'Ajouter un Prospect'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer"
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5">

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Contact Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Amine Belkhayat"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="amine@domain.ma"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="+212 600-000000"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Region/City
                  </label>
                  <select
                    value={newLeadForm.region}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, region: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 focus:outline-none"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Fes">Fes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    No. of Outlets
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={newLeadForm.outlets}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, outlets: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Business Vertical
                </label>
                <select
                  value={newLeadForm.vertical}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, vertical: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 focus:outline-none"
                >
                  <option value="cafe">Boutique & Fashion</option>
                  <option value="restaurant">Café & Coffee shop</option>
                  <option value="salon">Beauty Salon & Spa</option>
                  <option value="retail">Supermarket & Grocery</option>
                  <option value="other">Other business sector</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Custom Industry (Optional specify)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Smoothie Bar, Artisan rugs"
                  value={newLeadForm.customVertical}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, customVertical: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Message / Requirements Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes or requirements like specific printer setup..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold bg-[#006AFF] hover:bg-blue-600 text-white rounded-xl shadow-sm cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Save Lead
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-scale-in relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#006AFF]" />
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                  {editingUserId
                    ? (lang === 'en' ? 'Edit Team Member' : "Modifier l'utilisateur")
                    : (lang === 'en' ? 'Add Team Member' : 'Ajouter un Utilisateur')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => { setIsAddUserModalOpen(false); setEditingUserId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer"
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Sara Idrissi"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="sara@nuqta-pos.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+212 600-000000"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as User['role'] })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 focus:outline-none"
                >
                  <option value="support">Support</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              {!editingUserId && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Temporary Password *</label>
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsAddUserModalOpen(false); setEditingUserId(null); }}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold bg-[#006AFF] hover:bg-blue-600 text-white rounded-xl shadow-sm cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  {editingUserId ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
