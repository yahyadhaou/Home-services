export default {
  // Language picker
  languagePicker: {
    title: 'Choose your language',
    subtitle: 'You can change this later in Settings',
    continue: 'Continue',
  },

  // Onboarding
  onboarding: {
    skip: 'Skip',
    next: 'Next',
    getStarted: "Let's go",
    slide1Title: 'Fast Tradespeople',
    slide1Desc: 'Find qualified professionals near you within minutes.',
    slide2Title: 'Instantly Available',
    slide2Desc: 'Real-time availability and instant booking confirmation.',
    slide3Title: 'Secure Payment',
    slide3Desc: 'SEPA, credit card and digital payment methods — all secure.',
    slide4Title: 'Emergency Service',
    slide4Desc: '24/7 emergency support for urgent home repairs.',
  },

  // Welcome
  welcome: {
    tagline: 'Welcome back!',
    subtitle: 'Find qualified professionals near you',
    signIn: 'Sign In',
    createAccount: 'Create New Account',
    orContinueWith: 'or continue with',
    continueAsGuest: 'Continue as Guest',
    carpenter: 'Carpenter',
    electrician: 'Electrician',
    plumber: 'Plumber',
  },

  // Login
  login: {
    title: 'Sign In',
    heading: 'Welcome back',
    subheading: 'Sign in to continue',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    password: 'Password',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'Forgot password?',
    signInButton: 'Sign In',
    noAccount: "Don't have an account? ",
    register: 'Register',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email address',
    passwordRequired: 'Password is required',
    loginFailed: 'Sign in failed. Please check your details.',
  },

  // Register
  register: {
    title: 'Create Account',
    heading: 'New here?',
    subheading: 'Create your free account now',
    name: 'Name',
    namePlaceholder: 'John Smith',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    phone: 'Phone',
    phonePlaceholder: '+1 234 567 8900',
    password: 'Password',
    passwordPlaceholder: 'At least 8 characters',
    agreeTerms: 'I agree to the ',
    termsLink: 'Terms of Service',
    and: ' and ',
    privacyLink: 'Privacy Policy',
    registerButton: 'Register',
    haveAccount: 'Already have an account? ',
    signIn: 'Sign In',
    nameRequired: 'Name is required',
    emailInvalid: 'Valid email required',
    phoneInvalid: 'Valid phone number required',
    passwordWeak: 'Min. 8 characters, with letters and numbers',
    termsRequired: 'Please accept the terms',
  },

  // Home
  home: {
    greeting: 'Hello,',
    welcome: 'Welcome!',
    searchPlaceholder: 'Search for services…',
    emergencyTitle: 'Emergency Service',
    emergencySubtitle: '24/7 instantly available',
    services: 'Services',
    seeAll: 'See all',
    recentBookings: 'Recent Bookings',
    quickAccess: 'Quick Access',
    favorites: 'Favorites',
    payment: 'Payment',
    settings: 'Settings',
    available: 'available',
    plumber: 'Plumber', electrician: 'Electrician', cleaning: 'Cleaning',
    heating: 'Heating', carpenter: 'Carpenter', painter: 'Painter',
    gardener: 'Gardener', moving: 'Moving',
    statusConfirmed: 'Confirmed', statusCompleted: 'Completed', statusPending: 'Pending',
    liveDispatch: 'Live dispatch', prosNearby: 'Pros nearby', fastestMatch: 'Fastest match',
    recentJob: 'Recent job', history: 'History', bookAgain: 'Book again',
  },

  // Service Category
  serviceCategory: {
    available: 'professionals available',
    rating: 'Rating', arrival: 'Arrival', jobs: 'Jobs',
    whatDoYouNeed: 'What do you need?',
    faq: 'Frequently Asked Questions',
    viewProviders: 'View Available Professionals',
    emergency: 'Emergency',
    subServices: {
      plumber: [
        { name: 'Drain Unblocking', icon: 'water', urgent: true },
        { name: 'Faucet Repair', icon: 'water-outline' },
        { name: 'Toilet Repair', icon: 'help-buoy-outline' },
        { name: 'Pipe Replacement', icon: 'git-network-outline' },
        { name: 'Water Heater Install', icon: 'flame-outline' },
        { name: 'Bathroom Plumbing', icon: 'construct-outline' },
      ],
      electrician: [
        { name: 'Outlet Repair', icon: 'flash', urgent: true },
        { name: 'Fuse Box Service', icon: 'speedometer-outline' },
        { name: 'Light Installation', icon: 'bulb-outline' },
        { name: 'Wiring & Rewiring', icon: 'git-commit-outline' },
        { name: 'Circuit Breaker', icon: 'flash-outline' },
        { name: 'Smart Home Setup', icon: 'home-outline' },
      ],
      cleaning: [
        { name: 'Apartment Cleaning', icon: 'sparkles' },
        { name: 'Office Cleaning', icon: 'business-outline' },
        { name: 'Move-out Cleaning', icon: 'cube-outline' },
        { name: 'Window Cleaning', icon: 'square-outline' },
        { name: 'Carpet Cleaning', icon: 'layers-outline' },
        { name: 'Deep Cleaning', icon: 'shield-checkmark-outline' },
      ],
      heating: [
        { name: 'Heating Failure', icon: 'flame', urgent: true },
        { name: 'Boiler Service', icon: 'thermometer-outline' },
        { name: 'Radiator Repair', icon: 'grid-outline' },
        { name: 'System Installation', icon: 'construct-outline' },
        { name: 'Annual Maintenance', icon: 'calendar-outline' },
        { name: 'Thermostat Setup', icon: 'speedometer-outline' },
      ],
      carpenter: [
        { name: 'Door Repair', icon: 'hammer', urgent: true },
        { name: 'Custom Furniture', icon: 'cube-outline' },
        { name: 'Window Frames', icon: 'square-outline' },
        { name: 'Flooring Install', icon: 'layers-outline' },
        { name: 'Cabinet Building', icon: 'file-tray-stacked-outline' },
        { name: 'Wood Repair', icon: 'construct-outline' },
      ],
      painter: [
        { name: 'Interior Painting', icon: 'color-palette' },
        { name: 'Exterior Painting', icon: 'home-outline' },
        { name: 'Wallpaper Install', icon: 'image-outline' },
        { name: 'Wall Repair', icon: 'construct-outline' },
        { name: 'Color Consultation', icon: 'eyedrop-outline' },
        { name: 'Furniture Painting', icon: 'brush-outline' },
      ],
      gardener: [
        { name: 'Lawn Mowing', icon: 'leaf' },
        { name: 'Hedge Trimming', icon: 'cut-outline' },
        { name: 'Tree Care', icon: 'leaf-outline' },
        { name: 'Garden Design', icon: 'flower-outline' },
        { name: 'Irrigation Setup', icon: 'water-outline' },
        { name: 'Seasonal Cleanup', icon: 'sunny-outline' },
      ],
      moving: [
        { name: 'Apartment Moving', icon: 'car', urgent: true },
        { name: 'Office Relocation', icon: 'business-outline' },
        { name: 'Packing Service', icon: 'cube-outline' },
        { name: 'Furniture Transport', icon: 'bed-outline' },
        { name: 'Storage Solutions', icon: 'file-tray-full-outline' },
        { name: 'Piano Moving', icon: 'musical-notes-outline' },
      ],
    },
    faqs: {
      plumber: [
        { q: 'How fast can a plumber arrive?', a: 'For emergencies, typically within 1-2 hours. Regular appointments are available same-day or next-day.' },
        { q: 'What does a plumber cost?', a: 'On average €80-120 per hour, plus materials. Emergency call-outs may include an additional fee.' },
      ],
      electrician: [
        { q: 'Are your electricians certified?', a: 'Yes, all electricians on our platform hold valid certification and are insured for residential work.' },
        { q: 'Can you handle smart home wiring?', a: "Most of our electricians offer smart home installation, from switches to full home automation." },
      ],
      cleaning: [
        { q: 'Do I need to provide cleaning supplies?', a: 'No, our cleaning professionals bring their own eco-friendly supplies and equipment unless you prefer otherwise.' },
        { q: 'How long does a standard cleaning take?', a: 'A typical apartment cleaning takes 2-4 hours depending on size and condition.' },
      ],
      heating: [
        { q: 'What if my heating fails in winter?', a: 'Emergency heating repairs are prioritized and typically dispatched within 1-2 hours during cold months.' },
        { q: 'How often should I service my boiler?', a: 'Annual maintenance is recommended to keep your system efficient and catch issues early.' },
      ],
      carpenter: [
        { q: 'Can carpenters build custom pieces?', a: 'Yes, many of our carpenters specialize in custom furniture and built-in storage solutions.' },
        { q: 'Do you work with reclaimed wood?', a: 'Several providers offer sustainable and reclaimed wood options on request.' },
      ],
      painter: [
        { q: 'How long before I can use the room?', a: 'Most interior paints are dry to the touch within hours, but allow 24 hours before heavy use.' },
        { q: 'Do painters help choose colors?', a: 'Many offer a free color consultation as part of larger painting jobs.' },
      ],
      gardener: [
        { q: 'Do you offer one-time or recurring service?', a: 'Both — you can book a single visit or set up weekly, biweekly, or monthly recurring care.' },
        { q: 'Can gardeners help redesign my yard?', a: 'Yes, several providers offer full garden design and landscaping consultations.' },
      ],
      moving: [
        { q: 'Do movers provide packing materials?', a: 'Most moving providers offer boxes, tape, and protective wrapping as part of their packing service.' },
        { q: 'How far in advance should I book?', a: 'We recommend booking at least 1-2 weeks ahead, especially for weekend moves.' },
      ],
    },
  },

  // Provider List
  providerList: {
    sortDistance: 'Distance', sortRating: 'Rating', sortPrice: 'Price',
    results: 'results',
    responseTime: 'response time', completedJobs: 'jobs completed',
    company: 'Company', independent: 'Independent',
  },

  // Provider Detail
  providerDetail: {
    reviews: 'reviews', verified: 'Verified', away: 'away',
    jobsCompleted: 'Jobs', responseTime: 'Response time', successRate: 'Success Rate',
    tabAbout: 'About', tabReviews: 'Reviews', tabServices: 'Services',
    aboutText: 'Professional plumbing and heating installation for over 20 years. We offer fast and reliable service for all your needs.',
    openingHours: 'Opening Hours', paymentMethods: 'Payment Methods',
    creditCard: 'Credit Card', cash: 'Cash', sepa: 'SEPA',
    weekday: 'Mon–Fri', saturday: 'Sat', sunday: 'Sun', emergencyOnly: 'Emergency only',
    from: 'From', bookNow: 'Book Now',
    serviceList: ['Drain Unblocking', 'Faucet Installation', 'Heating Repair', '24/7 Emergency Service', 'Plumbing Maintenance', 'Boiler Service'],
  },

  // Search
  search: {
    recentSearches: 'Recent Searches',
    popularCategories: 'Popular Categories',
    resultsFor: 'results for',
    noResults: 'No results found.',
  },

  // Emergency Booking
  emergency: {
    title: 'Emergency Service', subtitle: '24/7 Instant Response',
    arrival: 'Arrival', technicians: 'Technicians', hotline: 'Hotline',
    available: 'available',
    typeOfEmergency: 'Type of Emergency',
    waterLeak: 'Burst pipe', powerOutage: 'No power', heatingFailure: 'Heating Failure',
    lockedDoor: 'Locked out', gasLeak: 'Gas leak', flooding: 'Flooding', other: 'Other',
    description: 'Problem Description',
    descriptionPlaceholder: 'Briefly describe the problem…',
    yourLocation: 'Your Location', change: 'Change',
    lifeThreat: 'call emergency services immediately — this app is not a substitute.',
    lifeThreatBold: 'Immediate danger to life or property?',
    reportButton: 'Request emergency now',
    selectFirst: 'Please select', selectFirstBody: 'Please select the type of emergency.',
    reported: 'Emergency reported', reportedBody: 'A technician is on the way. Estimated arrival: 30–60 minutes.',
    ok: 'OK',
    avgResponse: 'avg. response 9 min', urgentRequest: 'Urgent request',
    tapHint: 'Tap request to alert every available pro nearby at once',
    hintPipe: 'Shut off the main water valve while you wait, if you can safely reach it.',
    hintGas: 'Leave the property, do not use switches or open flames, and call 112 first.',
    hintPower: "Check your building's fuse box before assuming a wider outage.",
    hintFlood: 'Move valuables and electronics away from rising water if it is safe to do so.',
    hintLock: "Confirm your ID is ready — most locksmiths ask for proof you're the resident.",
    notifiesNearby: 'notifies nearest 24 pros instantly',
    callDirect: 'Call provider directly',
    trackJob: 'Track job',
  },

  // Chat
  chat: {
    online: 'Online', placeholder: 'Type a message...', autoReply: 'Thanks for your message. I\'ll get back to you shortly.',
    sampleMsg1: 'Hello! How can I help you?',
    sampleMsg2: 'I have a problem with my faucet.',
    sampleMsg3: 'No problem! When would be a good time for an appointment?',
  },

  // Booking
  booking: {
    title: 'Book Appointment',
    urgency: 'Urgency', normal: 'Normal', normalDesc: 'Schedule appointment',
    emergencyDesc: 'Available now',
    selectDate: 'Select Date', selectTime: 'Select Time',
    selected: 'Selected:', noDate: 'No appointment yet',
    continueButton: 'Continue',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    frequency: 'How often?', freqOnce: 'One-time', freqWeekly: 'Weekly', freqBiweekly: 'Bi-weekly', freqMonthly: 'Monthly',
    recurringHint: "You'll get a 10% recurring discount and can cancel anytime.",
    estimate: 'Price estimate', calloutFee: 'Call-out fee', hourlyRate: 'Hourly rate',
    recurringDiscount: 'Recurring discount', estimatedTotal: 'Estimated total',
    estimateNote: 'Final price may vary based on job complexity.',
  },

  // Booking Confirmation
  bookingConfirmation: {
    title: 'Confirm Booking', checkTitle: 'Review Booking', checkSubtitle: 'Please confirm all details',
    provider: 'Provider', rating: 'Rating', date: 'Date', time: 'Time',
    urgencyLabel: 'Urgency', normal: 'Normal', emergency: 'Emergency',
    costOverview: 'Cost Overview', baseFee: 'Base Fee', service: 'Service', emergencyFee: 'Emergency Fee',
    total: 'Total Amount', infoText: "You'll receive a confirmation by email. The provider will contact you 30 minutes before the appointment.",
    back: 'Back', confirmButton: 'Book Now',
  },

  // My Bookings
  myBookings: {
    title: 'My Bookings',
    filterAll: 'All', filterUpcoming: 'Upcoming', filterCompleted: 'Completed',
    statusUpcoming: 'Upcoming', statusConfirmed: 'Confirmed', statusCompleted: 'Completed',
    statusPending: 'Pending', statusCancelled: 'Cancelled',
    empty: 'No Bookings', emptySubtitle: 'Your upcoming and past appointments will appear here.',
  },

  // Booking Detail
  bookingDetail: {
    title: 'Booking Details', bookingNumber: 'Booking #',
    detailsTitle: 'Booking Details', provider: 'Provider', service: 'Service',
    date: 'Date', time: 'Time', address: 'Address',
    paymentTitle: 'Payment', amount: 'Amount', paymentMethod: 'Payment Method', sepaDebit: 'SEPA Direct Debit',
    sendMessage: 'Send Message', cancelBooking: 'Cancel Booking', leaveReview: 'Leave a Review',
    cancelConfirmTitle: 'Cancel Booking', cancelConfirmBody: 'Are you sure you want to cancel this booking?',
    cancelAbort: 'Cancel', cancelConfirm: 'Cancel Booking',
    backToHome: 'Back to Home',
    trackLive: 'Track live', jobProof: 'Job completion proof', verified: 'Verified',
    before: 'Before', after: 'After',
    checklist1: 'Work area inspected', checklist2: 'Repair completed and tested', checklist3: 'Site cleaned up',
  },

  // Profile
  profile: {
    guest: 'Guest', bookings: 'Bookings', favorites: 'Favorites', rating: 'Rating',
    editProfile: 'Edit Profile', myBookings: 'My Bookings', paymentMethods: 'Payment Methods',
    notifications: 'Notifications', settings: 'Settings', logOut: 'Log Out',
    savedAddresses: 'Saved Addresses', helpSupport: 'Help & Support',
  },

  // Edit Profile
  editProfile: {
    title: 'Edit Profile', changePhoto: 'Change Photo',
    personalData: 'Personal Information', fullName: 'Full Name', email: 'Email', phone: 'Phone',
    address: 'Address', street: 'Street & Number', city: 'City', zip: 'ZIP Code',
    saveButton: 'Save Changes',
    nameRequired: 'Name is required', emailInvalid: 'Valid email required',
    phoneInvalid: 'Valid phone number required', zipInvalid: 'ZIP must be 5 digits',
    savedTitle: 'Saved', savedBody: 'Your information has been updated.',
  },

  // Payment Methods
  paymentMethods: {
    title: 'Payment Methods', default: 'Default', setDefault: 'Default', remove: 'Remove',
    addButton: 'Add Payment Method',
    removeTitle: 'Remove', removeBody: 'Really remove this payment method?',
    cancel: 'Cancel',
  },

  // Add Payment
  addPayment: {
    title: 'Add Payment Method', selectType: 'Select Payment Type',
    card: 'Credit/Debit Card', sepa: 'SEPA Direct Debit', paypal: 'PayPal',
    cardData: 'Card Details', cardHolder: 'Card Holder', cardHolderPlaceholder: 'John Smith',
    cardNumber: 'Card Number', expiry: 'Expiry Date', cvv: 'CVV',
    sepaData: 'SEPA Details', accountHolder: 'Account Holder', iban: 'IBAN',
    paypalAccount: 'PayPal Account', paypalEmail: 'PayPal Email',
    secureText: 'Your data is securely encrypted (TLS 1.3)',
    addButton: 'Add',
    cardInvalid: 'Invalid card number', ibanInvalid: 'Invalid IBAN',
    addedTitle: 'Added', addedBody: 'Payment method has been saved.',
  },

  // Notifications
  notifications: {
    title: 'Notifications', markAllRead: 'Mark all read', empty: 'No Notifications',
    bookingConfirmedTitle: 'Booking Confirmed', bookingConfirmedBody: 'Your appointment on 15/05 at 2:00 PM has been confirmed.',
    reminderTitle: 'Appointment Tomorrow', reminderBody: "Don't forget: Müller GmbH arrives tomorrow at 2 PM.",
    promoTitle: '20% Off Cleaning', promoBody: 'Today only: book a cleaning service and save 20%.',
    reviewTitle: 'Leave a Review', reviewBody: 'How was your appointment with Schmidt Sanitär?',
    systemTitle: 'App Updated', systemBody: 'HomeServices has been updated to version 1.1.0.',
    justNow: 'Just now', minAgo: 'min ago', hoursAgo: 'h ago', yesterday: 'Yesterday', daysAgo: 'days ago',
  },

  // Settings
  settings: {
    title: 'Settings',
    notificationsSection: 'Notifications', push: 'Push Notifications', emailNotif: 'Email Notifications', sms: 'SMS Notifications',
    privacySection: 'Privacy & Security', location: 'Location Services', biometric: 'Biometric Login',
    appearanceSection: 'Appearance', darkMode: 'Dark Mode',
    languageSection: 'Language', language: 'Language',
    generalSection: 'General', help: 'Help & Support', privacyPolicy: 'Privacy Policy', terms: 'Terms of Service',
    marketingSection: 'Marketing', marketingEmails: 'Marketing Emails',
    version: 'HomeServices v1.0.0',
  },

  // Favorites
  favorites: {
    title: 'Favorites', empty: 'No Favorites',
    emptySubtitle: 'Tap the heart icon on a provider to save them here.',
    discoverButton: 'Discover Providers',
  },

  // Live Tracking
  liveTracking: {
    title: 'Live tracking', etaLabel: 'Estimated arrival', plumber: 'Plumber', status: 'Job status',
    step_matched: 'Matched with a pro', step_enroute: 'On the way', step_arriving: 'Arriving',
    step_inprogress: 'Job in progress', step_completed: 'Completed',
    now: 'Now', cancelJob: 'Cancel job',
    cancelTitle: 'Cancel job', cancelBody: 'Are you sure you want to cancel this job?', cancelConfirm: 'Cancel job',
  },

  // Saved Addresses
  savedAddresses: {
    title: 'Saved addresses', default: 'Default', addNew: 'Add new address',
  },

  // Help & Support
  helpSupport: {
    title: 'Help & Support', faqTitle: 'Frequently asked questions', contactTitle: 'Contact us',
    liveChat: 'Live chat', email: 'Email us', callUs: 'Call us', reportIssue: 'Report an issue or dispute',
    faq1Q: 'How do I cancel a booking?', faq1A: 'Go to My Bookings, open the booking, and tap Cancel Booking. Cancellations made less than 2 hours before the appointment may incur a fee.',
    faq2Q: 'How does pricing work?', faq2A: 'Each booking shows a call-out fee plus an hourly rate before you confirm. Recurring bookings get a 10% discount.',
    faq3Q: 'What if my provider is late?', faq3A: 'Track their live ETA from the booking detail screen. If they are significantly delayed, contact support and we will follow up.',
    faq4Q: 'Is my payment information secure?', faq4A: 'Yes, all payment data is encrypted with TLS 1.3 and never stored on our servers in plain text.',
  },

  // Common
  common: {
    back: 'Back', cancel: 'Cancel', save: 'Save', delete: 'Delete', edit: 'Edit',
    loading: 'Loading…', error: 'An error occurred', retry: 'Retry',
  },
};
