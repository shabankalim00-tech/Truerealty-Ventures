import React, { useState, useMemo } from 'react';
import { Calculator, IndianRupee, Percent, Clock } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function EMICalculator({ initialAmount = 10000000 }) {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const { monthlyEMI, totalInterest, totalPayment } = useMemo(() => {
    const P = Number(loanAmount);
    const r = Number(interestRate) / (12 * 100); // monthly interest rate
    const n = Number(tenureYears) * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEMI: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = totalPay - P;

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
    };
  }, [loanAmount, interestRate, tenureYears]);

  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex items-center space-x-2.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">Home Loan EMI Calculator</h3>
          <p className="text-xs text-slate-500">Plan your home purchase with accurate monthly estimates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders & Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Loan Amount (₹)
              </label>
              <span className="text-base font-extrabold text-slate-900 font-serif">
                {formatPrice(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹ 10 Lacs</span>
              <span>₹ 2.5 Cr</span>
              <span>₹ 5 Cr+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Interest Rate (% p.a.)
              </label>
              <span className="text-base font-extrabold text-slate-900 font-serif">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="7.0"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>7.0%</span>
              <span>10.0%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Loan Tenure (Years)
              </label>
              <span className="text-base font-extrabold text-slate-900 font-serif">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Yr</span>
              <span>15 Yrs</span>
              <span>30 Yrs</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
          <div className="text-center pb-4 border-b border-slate-700">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Monthly EMI Breakdown
            </span>
            <div className="text-3xl font-black text-white font-serif mt-1">
              ₹ {monthlyEMI.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Principal Loan Amount:</span>
              <span className="font-bold text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Interest Payable:</span>
              <span className="font-bold text-gold-400">₹ {totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-700 text-sm">
              <span className="font-semibold text-slate-200">Total Amount Payable:</span>
              <span className="font-extrabold text-white">₹ {totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Visual Bar Ratio */}
          <div className="pt-2">
            <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${principalPercent}%` }}
                className="bg-primary-500 h-full"
                title={`Principal: ${principalPercent}%`}
              ></div>
              <div
                style={{ width: `${interestPercent}%` }}
                className="bg-gold-500 h-full"
                title={`Interest: ${interestPercent}%`}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-1"></span> Principal ({principalPercent}%)
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-gold-500 mr-1"></span> Interest ({interestPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
