import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Minus,
  Send,
  Sparkles,
  Bot,
  User,
  Building,
  BedDouble,
  MapPin,
  ExternalLink,
  PhoneCall,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { chatApi, formatCurrency } from '../../services/chatApi';
import { ROUTES } from '../../routes';

export default function PropertyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeLeadProperty, setActiveLeadProperty] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPreferredTime, setLeadPreferredTime] = useState('Immediate / Any Time');
  const [leadConsent, setLeadConsent] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadSuccessMsg, setLeadSuccessMsg] = useState('');

  // Initial Conversation
  const initialGreeting = {
    id: 'msg-init',
    sender: 'bot',
    text: "Namaste & Welcome to True Realty Venture! 🏡\nI'm your AI Property Assistant. I can help you explore verified luxury apartments, villas, and rentals across Gurgaon, Noida, Greater Noida, and Delhi NCR.\n\nAsk me anything in English or Hinglish!",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies: [
      'Noida mein 80 lakh ke andar 3 BHK',
      'Greater Noida 2 BHK under 60 lakh',
      'Gurgaon mein 70,000 tak rent flat',
      'Show villas near Noida under 2 crore',
    ],
  };

  const [messages, setMessages] = useState([initialGreeting]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized, isLoading, showLeadForm]);

  // Handle Send Message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setInputMessage('');
    setHasUnread(false);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await chatApi.sendMessage(text, historyPayload);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res.reply || 'Here are the details for your request:',
        properties: res.properties || [],
        alternatives: res.alternatives || [],
        quickReplies: res.quickReplies || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (res.action === 'open_lead_form') {
        setShowLeadForm(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'I encountered a temporary connection issue. Please try again or click below to speak with an advisor.',
          quickReplies: ['Request Advisor Callback', 'Browse All Properties'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Lead
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadError('');

    if (!leadConsent) {
      setLeadError('Please check the consent box to proceed.');
      return;
    }

    const cleanPhone = leadPhone.replace(/[\s\-\(\)]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone.replace(/^(\+91|91|0)/, ''))) {
      setLeadError('Please provide a valid 10-digit Indian phone number.');
      return;
    }

    setLeadSubmitting(true);
    try {
      const result = await chatApi.submitLead({
        name: leadName,
        phone: leadPhone,
        preferredTime: leadPreferredTime,
        consent: true,
        propertyId: activeLeadProperty?._id || null,
        propertyTitle: activeLeadProperty?.title || 'General Inquiry',
        query: `Inquiry via AI Chatbot for ${activeLeadProperty?.title || 'Property Advisor Assistance'}`,
      });

      setLeadSuccessMsg(result.message || 'Thank you! Your request has been confirmed.');
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSuccessMsg('');
        setActiveLeadProperty(null);
        setLeadName('');
        setLeadPhone('');
        setLeadConsent(false);
        // Post confirmation message in chat
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-lead-conf-${Date.now()}`,
            sender: 'bot',
            text: `✅ Thank you, ${leadName}! Your callback request has been scheduled (${leadPreferredTime}). Our relationship manager will connect with you shortly.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickReplies: ['Explore More Properties', 'Check Loan EMI', 'Done'],
          },
        ]);
      }, 1800);
    } catch (err) {
      setLeadError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  // Reset Conversation
  const handleResetChat = () => {
    setMessages([initialGreeting]);
    setShowLeadForm(false);
    setActiveLeadProperty(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Teaser pill before first open */}
        {!isOpen && hasUnread && (
          <div
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setHasUnread(false);
            }}
            className="mb-3 hidden sm:flex items-center gap-2 bg-slate-900/95 text-white text-xs px-3.5 py-2 rounded-full shadow-xl border border-slate-700/60 backdrop-blur cursor-pointer hover:bg-slate-800 transition-all duration-200 group animate-bounce"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="font-medium text-slate-200 group-hover:text-gold-300">
              Need Help? Ask in English or Hinglish
            </span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
            setHasUnread(false);
          }}
          aria-label="Open True Realty AI Assistant"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-slate-900 via-primary-700 to-primary-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-primary-500/30 group"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500 text-[9px] font-bold text-slate-950 items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-in-out ${
            isMinimized
              ? 'bottom-24 right-6 w-72 h-14 rounded-2xl shadow-xl'
              : 'bottom-0 right-0 sm:bottom-24 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[650px] sm:max-h-[85vh] sm:rounded-2xl shadow-2xl'
          } bg-white flex flex-col overflow-hidden border border-slate-200 sm:border-slate-800/10 font-sans`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-3.5 sm:px-4 flex items-center justify-between border-b border-slate-800 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-inner border border-primary-400/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm tracking-wide text-white">
                    True Realty Assistant
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-gold-500/20 text-gold-400 rounded border border-gold-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Verified Listings</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Online 24/7</span>
                </p>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body - Hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[88%] ${
                        msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs mt-0.5 ${
                          msg.sender === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-slate-900 text-gold-400 border border-slate-800'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <User className="w-3.5 h-3.5" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Bubble Content */}
                      <div>
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                            msg.sender === 'user'
                              ? 'bg-primary-600 text-white rounded-tr-xs shadow-sm'
                              : 'bg-white text-slate-800 rounded-tl-xs shadow-sm border border-slate-200/80'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span
                          className={`text-[10px] text-slate-400 mt-1 px-1 block ${
                            msg.sender === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Grounded Property Cards */}
                    {msg.properties && msg.properties.length > 0 && (
                      <div className="mt-3 w-full space-y-3 pl-9">
                        {msg.properties.map((prop) => (
                          <div
                            key={prop._id || prop.slug}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                          >
                            {/* Card Image Banner */}
                            <div className="relative h-32 w-full bg-slate-200 overflow-hidden">
                              <img
                                src={prop.image || '/listings/wal-serenia92/image_1.png'}
                                alt={prop.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = '/listings/wal-serenia92/image_1.png';
                                }}
                              />
                              <div className="absolute top-2 left-2 flex gap-1.5">
                                {prop.isDemo ? (
                                  <span className="text-[10px] font-semibold bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded shadow">
                                    Demo Match
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded shadow flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Verified
                                  </span>
                                )}
                                <span className="text-[10px] font-semibold bg-slate-900/80 backdrop-blur text-white px-2 py-0.5 rounded">
                                  {prop.propertyType || 'Apartment'}
                                </span>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-slate-950/85 backdrop-blur text-gold-400 font-bold text-xs px-2.5 py-1 rounded shadow border border-gold-500/30">
                                {prop.formattedPrice || formatCurrency(prop.price, prop.transactionType)}
                              </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-3">
                              <h4 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-primary-600 transition-colors">
                                {prop.title}
                              </h4>
                              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  {prop.localityName ? `${prop.localityName}, ` : ''}{prop.cityName}
                                </span>
                                {prop.bedrooms && (
                                  <span className="flex items-center gap-1">
                                    <BedDouble className="w-3 h-3 text-slate-400" />
                                    {prop.bedrooms} BHK
                                  </span>
                                )}
                              </div>

                              {/* Card Action Buttons */}
                              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2">
                                <Link
                                  to={ROUTES.PROPERTY_DETAIL(prop.slug)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                                >
                                  <span>View Property</span>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveLeadProperty(prop);
                                    setShowLeadForm(true);
                                  }}
                                  className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 transition-colors"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  <span>Enquire</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Reply Chips */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 pl-9">
                        {msg.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (qr.toLowerCase().includes('site visit') || qr.toLowerCase().includes('callback')) {
                                setShowLeadForm(true);
                              } else {
                                handleSendMessage(qr);
                              }
                            }}
                            className="text-xs bg-white hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-all shadow-2xs font-medium active:scale-95"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 pl-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-gold-400 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="bg-white px-3.5 py-2 rounded-2xl rounded-tl-xs border border-slate-200 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Inline Lead Capture Form Modal/Drawer */}
              {showLeadForm && (
                <div className="p-4 bg-white border-t border-slate-200 shadow-lg animate-in slide-in-from-bottom duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4 text-primary-600" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {activeLeadProperty ? 'Schedule Property Consultation' : 'Request Advisor Callback'}
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {activeLeadProperty && (
                    <div className="bg-slate-50 text-[11px] text-slate-600 p-2 rounded-md mb-2 border border-slate-100 flex justify-between items-center">
                      <span className="font-semibold text-slate-800 truncate mr-2">
                        {activeLeadProperty.title}
                      </span>
                      <span className="text-gold-600 font-bold flex-shrink-0">
                        {activeLeadProperty.formattedPrice}
                      </span>
                    </div>
                  )}

                  {leadError && (
                    <div className="mb-2 p-2 bg-rose-50 text-rose-700 text-xs rounded-md border border-rose-200 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{leadError}</span>
                    </div>
                  )}

                  {leadSuccessMsg && (
                    <div className="mb-2 p-2 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{leadSuccessMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary-500"
                      />
                      <input
                        type="tel"
                        placeholder="10-digit Mobile *"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary-500"
                      />
                    </div>

                    <select
                      value={leadPreferredTime}
                      onChange={(e) => setLeadPreferredTime(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary-500 bg-white"
                    >
                      <option value="Immediate / Any Time">Call Timing: Immediate / Any Time</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    </select>

                    <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={leadConsent}
                        onChange={(e) => setLeadConsent(e.target.checked)}
                        className="mt-0.5 rounded text-primary-600 focus:ring-primary-500 h-3.5 w-3.5"
                      />
                      <span>
                        I consent to receive verified property information and advisor calls per True Realty Venture privacy policy.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-xs font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
                    >
                      {leadSubmitting ? (
                        <span>Confirming...</span>
                      ) : (
                        <>
                          <span>Confirm Callback Request</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask in English or Hinglish..."
                    disabled={isLoading}
                    className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-slate-50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-2">
                  <span>Powered by True Realty Intelligence</span>
                  <span className="hidden sm:inline">Press Enter to send</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
