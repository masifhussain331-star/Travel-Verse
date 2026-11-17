import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { providerService } from '../../services/providerService';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Plane, 
  Building2, 
  Package, 
  Car, 
  Sparkles,
  AlertCircle,
  Download,
  Calendar,
  Users
} from 'lucide-react';
import Badge from './Badge';

export default function BookingCheckoutModal({
  isOpen,
  onClose,
  bookingItem = null
}) {
  const navigate = useNavigate();
  const { currentCurrency, currencyData, format, convert } = useCurrency();
  const { addBooking } = useBookings();
  const { user } = useAuth();

  const [step, setStep] = useState('details'); // 'details' | 'payment' | 'confirmed'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Form State
  const [firstName, setFirstName] = useState(user?.full_name ? user.full_name.split(' ')[0] : 'Zainab');
  const [lastName, setLastName] = useState(user?.full_name ? user.full_name.split(' ').slice(1).join(' ') : 'Fatima');
  const [email, setEmail] = useState(user?.email || 'traveler@travelverse.com');
  const [phone, setPhone] = useState(user?.phone || '+92 300 1234567');
  const [passportNumber, setPassportNumber] = useState('PK9823411');
  const [nationality, setNationality] = useState('Pakistani');
  const [specialRequests, setSpecialRequests] = useState('Halal meal, window seat preferred');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('888');
  const [cardHolder, setCardHolder] = useState(user?.full_name || 'ZAINAB FATIMA');

  if (!isOpen || !bookingItem) return null;

  const baseUSD = bookingItem.priceUSD || bookingItem.item?.basePriceUSD || bookingItem.item?.pricePerNightUSD || bookingItem.item?.pricePerPersonUSD || bookingItem.item?.pricePerDayUSD || 250;

  const taxesUSD = Math.round(baseUSD * 0.12);
  const totalUSD = baseUSD + taxesUSD;
  const chargedPriceConverted = convert(totalUSD);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      setError('Please complete all passenger contact details.');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const itemTitle = bookingItem.type === 'flight' 
        ? `${bookingItem.item.airline} ${bookingItem.item.flightNumber} (${bookingItem.item.origin} → ${bookingItem.item.destination})`
        : bookingItem.type === 'hotel'
        ? `${bookingItem.item.name} (${bookingItem.item.city})`
        : bookingItem.type === 'package'
        ? bookingItem.item.title
        : `${bookingItem.item.name} (${bookingItem.item.category})`;

      const result = await providerService.processPayment({
        bookingData: {
          itemType: bookingItem.type,
          itemId: bookingItem.item.id,
          itemTitle,
          itemDetails: bookingItem.item,
          passengers: [
            {
              firstName,
              lastName,
              passportNumber,
              nationality,
              email,
              phone
            }
          ],
          contactInfo: { email, phone, specialRequests },
          supplierCurrency: 'USD',
          supplierPrice: totalUSD,
          chargedCurrency: currentCurrency,
          chargedPrice: chargedPriceConverted,
          exchangeRate: currencyData.rateToUSD
        },
        paymentMethod,
        cardDetails: { cardNumber, cardHolder }
      });

      if (result.success) {
        addBooking(result.booking);
        setConfirmedBooking(result.booking);
        setStep('confirmed');
      }
    } catch (err) {
      setError(err.message || 'Payment verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">
                Secure Reservation Portal
              </span>
              <Badge variant="demo" size="sm">Demo Transaction (Zero Charge)</Badge>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {step === 'details' && 'Passenger & Traveler Information'}
              {step === 'payment' && 'Payment & Price Verification'}
              {step === 'confirmed' && 'Reservation Successfully Confirmed!'}
            </h3>
          </div>

          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* Order Summary Pill */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                {bookingItem.type === 'flight' && <Plane className="w-5 h-5" />}
                {bookingItem.type === 'hotel' && <Building2 className="w-5 h-5" />}
                {bookingItem.type === 'package' && <Package className="w-5 h-5" />}
                {bookingItem.type === 'car' && <Car className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 line-clamp-1">
                  {bookingItem.item?.title || bookingItem.item?.name || `${bookingItem.item?.airline} ${bookingItem.item?.flightNumber}`}
                </p>
                <p className="text-[11px] text-slate-500">
                  Total Payable: <strong className="text-blue-700 font-sans">{format(totalUSD)}</strong> (${totalUSD} USD)
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Guaranteed Fare
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: TRAVELER DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (for E-Ticket) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Passport / CNIC Number *</label>
                  <input
                    type="text"
                    required
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nationality *</label>
                  <input
                    type="text"
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Meal / Bed Preferences</label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Halal meal, extra pillows, high floor room"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
                >
                  Proceed to Payment →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT & PRICE VERIFICATION */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>Selected Payment Gateway</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {['Credit / Debit Card', 'Bank Transfer (IBFT)', 'Pay at Desk'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                        paymentMethod === m 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'Credit / Debit Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Full Name</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number (Visa / Mastercard)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expires (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Base Tariff (Supplier USD)</span>
                  <span>${baseUSD} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Government Airport / Tourism Taxes</span>
                  <span>${taxesUSD} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Institutional Exchange Rate</span>
                  <span>1 USD = {currencyData.rateToUSD} {currentCurrency}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount Due</span>
                  <span className="text-blue-700 text-base font-sans">{format(totalUSD)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  ← Back to Details
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Locking Carrier Reservation...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm & Pay {format(totalUSD)}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: CONFIRMATION & E-TICKET */}
          {step === 'confirmed' && confirmedBooking && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <Badge variant="demo" size="md">DEMO RESERVATION CONFIRMED</Badge>
                <h3 className="text-xl font-black text-slate-900 mt-2 font-sans">
                  Booking Reference: {confirmedBooking.bookingReference}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Electronic voucher sent to <strong>{confirmedBooking.contactInfo.email}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Reserved Item:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{confirmedBooking.itemTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Passenger:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.passengers[0]?.firstName} {confirmedBooking.passengers[0]?.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Charged Amount:</span>
                  <span className="font-bold text-blue-700 font-sans">{confirmedBooking.chargedCurrency} {confirmedBooking.chargedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment ID:</span>
                  <span className="font-mono text-[11px] text-slate-600">{confirmedBooking.paymentId}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/bookings');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  View My Bookings & E-Tickets
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
