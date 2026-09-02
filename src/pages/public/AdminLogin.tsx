import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'admin@sfcl-demo.lk' && password === 'demo123') {
      loginAs('user-01');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@sfcl-demo.lk / demo123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border p-6">
        <h2 className="text-lg font-bold mb-3">Admin Sign In</h2>
        <p className="text-sm text-slate-600 mb-4">Sign in with demo Super Admin credentials to view the dashboard.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="admin@sfcl-demo.lk" />
          </div>
          <div className="mb-3">
            <label className="text-xs font-medium text-slate-700">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="mt-1 w-full px-3 py-2 border rounded" placeholder="demo123" />
          </div>
          {error && <div className="text-rose-600 text-xs mb-3">{error}</div>}
          <div className="flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 text-sm bg-gov-navy text-white rounded">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
