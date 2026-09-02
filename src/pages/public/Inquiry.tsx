import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { db } from '../../services/db';
import { Inquiry } from '../../types';

export const InquiryPage: React.FC = () => {
  const [name, setName] = useState('Priyantha Samarajeewa');
  const [email, setEmail] = useState('p.samarajeewa@farmco.lk');
  const [mobile, setMobile] = useState('+94 77 890 1234');
  const [category, setCategory] = useState<Inquiry['category']>('Fertilizer Availability');
  const [subject, setSubject] = useState('Request for Urea supply to Hambantota Govijana Sewa Center');
  const [message, setMessage] = useState('We require 500 bags of Granular Urea for paddy fields in Hambantota District. Please notify the nearest available depot.');
  
  // Simulated CAPTCHA & SMS verification
  const [captchaAnswer, setCaptchaAnswer] = useState('12');
  const [smsOtp, setSmsOtp] = useState('4892');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [createdInquiry, setCreatedInquiry] = useState<Inquiry | null>(null);

  const handleSendOtp = () => {
    if (!mobile) return;
    setIsSmsSent(true);
  };

  const handleVerifyOtp = () => {
    if (smsOtp === '4892' || smsOtp.length === 4) {
      setIsVerified(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer !== '12') {
      alert('Security CAPTCHA verification failed! Please calculate 7 + 5 correctly.');
      return;
    }

    const inq = db.createInquiry({
      name,
      email,
      mobile,
      category,
      subject,
      message
    });

    setCreatedInquiry(inq);
  };

  if (createdInquiry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-200 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Inquiry Submitted Successfully!</h2>
          <p className="text-xs text-slate-600">Your public inquiry has been logged into the SFCL Official Helpdesk Queue.</p>

          <div className="p-4 bg-slate-50 rounded-xl border text-xs max-w-md mx-auto space-y-1">
            <p className="text-slate-500 uppercase">Tracking Reference Number</p>
            <p className="text-2xl font-mono font-extrabold text-gov-navy">{createdInquiry.referenceNo}</p>
            <p className="text-slate-500 pt-2">Assigned Status: <span className="font-bold text-amber-700">{createdInquiry.status}</span></p>
          </div>

          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            An officer from SFCL Public Relations division will respond to your inquiry via email ({createdInquiry.email}) and SMS notification within 24 hours.
          </p>

          <button
            onClick={() => setCreatedInquiry(null)}
            className="px-6 py-2.5 bg-gov-navy text-white text-xs font-bold rounded-xl shadow"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30">
        <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
          Public Contact & Helpdesk
        </span>
        <h2 className="text-3xl font-extrabold mt-2">Contact Us & Online Feedback</h2>
        <p className="text-sm text-slate-200 mt-1 max-w-3xl">
          State Fertilizer Company Limited encourages public inquiries, complaints, suggestions, and laboratory service requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="font-bold text-base text-gov-navy border-b pb-2">Head Office Details</h3>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gov-gold shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">State Fertilizer Company Limited</strong>
                <span className="text-slate-600">Station Road, Hunupitiya, Peliyagoda, Western Province, Sri Lanka</span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gov-gold shrink-0" />
              <div>
                <strong className="block text-slate-800">Telephone Hotlines</strong>
                <span className="text-slate-600">+94 11 292 2100 / +94 11 292 2105</span>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gov-gold shrink-0" />
              <div>
                <strong className="block text-slate-800">Official Email</strong>
                <span className="text-slate-600">info@sfcl.gov.lk / helpdesk@sfcl.gov.lk</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Public Inquiry Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-xs">
          <h3 className="font-bold text-base text-gov-navy border-b pb-2">Online Public Inquiry & Feedback Form</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Telephone Number *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 font-bold rounded-lg shrink-0"
                >
                  {isSmsSent ? 'Resend SMS' : 'SMS Verify'}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inquiry Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="General Information">General Information</option>
                <option value="Fertilizer Availability">Fertilizer Availability & Stocks</option>
                <option value="Testing Lab Services">Testing Lab Services</option>
                <option value="Complaints">Complaints</option>
                <option value="Suggestions">Suggestions</option>
              </select>
            </div>
          </div>

          {/* SMS Verification Box */}
          {isSmsSent && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <span className="font-bold text-blue-900">Simulated SMS Verification OTP sent to {mobile}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP (Simulated: 4892)"
                  value={smsOtp}
                  onChange={e => setSmsOtp(e.target.value)}
                  className="px-3 py-1.5 border rounded-lg w-48 font-mono font-bold"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-1.5 bg-blue-700 text-white font-bold rounded-lg"
                >
                  Verify Code
                </button>
                {isVerified && <span className="text-emerald-700 font-bold">✓ Phone Verified</span>}
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Inquiry Subject *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Detailed Message (Max 1000 chars) *</label>
            <textarea
              rows={4}
              required
              maxLength={1000}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* CAPTCHA Challenge */}
          <div className="p-4 bg-slate-50 rounded-xl border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-gov-green" />
              <span className="font-bold text-slate-800">Security Math CAPTCHA: What is 7 + 5 ?</span>
            </div>
            <input
              type="text"
              required
              value={captchaAnswer}
              onChange={e => setCaptchaAnswer(e.target.value)}
              className="w-20 px-3 py-1 border rounded-lg text-center font-bold"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gov-green hover:bg-gov-greenDark text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Official Inquiry</span>
          </button>
        </form>
      </div>
    </div>
  );
};
