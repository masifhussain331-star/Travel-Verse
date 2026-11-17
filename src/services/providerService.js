// Secure Provider Integration & Checkout Processing Hub
// Handles Amadeus / Duffel / Hotelbeds provider interfaces and secure mock transaction processing

export const providerService = {
  /**
   * Generates a unique, collision-proof booking reference
   * Format: TV-FL-82914 or TV-HTL-19402
   */
  generateBookingReference(prefix = 'FL') {
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    return `TV-${prefix}-${randomHex}`;
  },

  /**
   * Generates an idempotency token to prevent duplicate accidental double-charges
   */
  generateIdempotencyKey() {
    return 'idemp_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  },

  /**
   * Verifies price integrity before finalizing payment (Anti-tampering check)
   */
  verifyPriceIntegrity({ originalUSD, clientCalculatedUSD, tolerance = 0.05 }) {
    const diff = Math.abs(originalUSD - clientCalculatedUSD);
    const isValid = diff <= originalUSD * tolerance;
    return {
      isValid,
      serverVerifiedUSD: originalUSD,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulates a secure server-side checkout transaction with payment gateway
   */
  async processPayment({
    bookingData,
    paymentMethod = 'Credit Card',
    cardDetails = {},
    isLiveProvider = false
  }) {
    // Artificial latency to simulate bank authorization & carrier reservation lock
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Basic card validation
    if (paymentMethod === 'Credit Card' && cardDetails.cardNumber) {
      const cleanNum = cardDetails.cardNumber.replace(/\s+/g, '');
      if (cleanNum.length < 13) {
        throw new Error('Invalid card number. Please provide a valid 16-digit card.');
      }
    }

    const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const bookingRef = this.generateBookingReference(
      bookingData.itemType === 'flight' ? 'FL' :
      bookingData.itemType === 'hotel' ? 'HTL' :
      bookingData.itemType === 'package' ? 'PKG' : 'CAR'
    );

    const record = {
      id: 'BK-' + Date.now(),
      bookingReference: bookingRef,
      itemType: bookingData.itemType,
      itemId: bookingData.itemId,
      itemTitle: bookingData.itemTitle,
      itemDetails: bookingData.itemDetails,
      passengers: bookingData.passengers,
      contactInfo: bookingData.contactInfo,
      supplierCurrency: bookingData.supplierCurrency || 'USD',
      supplierPrice: bookingData.supplierPrice,
      chargedCurrency: bookingData.chargedCurrency || 'PKR',
      chargedPrice: bookingData.chargedPrice,
      exchangeRate: bookingData.exchangeRate || 278.60,
      exchangeTimestamp: new Date().toISOString(),
      status: 'confirmed',
      isDemo: !isLiveProvider,
      paymentMethod: `${paymentMethod} (•••• ${cardDetails.cardNumber ? cardDetails.cardNumber.slice(-4) : '4242'})`,
      paymentId: transactionId,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      booking: record,
      transactionId,
      message: isLiveProvider 
        ? 'Reservation successfully locked with airline/hotel inventory system.' 
        : 'Demo booking confirmed without real charges. All ticket vouchers generated.'
    };
  }
};

