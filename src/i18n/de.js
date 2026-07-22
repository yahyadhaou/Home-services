export default {
  // Language picker
  languagePicker: {
    title: 'Wählen Sie Ihre Sprache',
    subtitle: 'Sie können dies später in den Einstellungen ändern',
    continue: 'Weiter',
  },

  // Onboarding
  onboarding: {
    skip: 'Überspringen',
    next: 'Weiter',
    getStarted: "Los geht's",
    slide1Title: 'Schnelle Handwerker',
    slide1Desc: 'Finden Sie qualifizierte Fachkräfte in Ihrer Nähe in wenigen Minuten.',
    slide2Title: 'Sofort verfügbar',
    slide2Desc: 'Echtzeit-Verfügbarkeit und sofortige Buchungsbestätigung.',
    slide3Title: 'Sichere Zahlung',
    slide3Desc: 'SEPA, Kreditkarte und digitale Zahlungsmethoden — alles sicher.',
    slide4Title: 'Notdienst',
    slide4Desc: '24/7 Notdienst für dringende Reparaturen rund ums Haus.',
  },

  // Welcome
  welcome: {
    tagline: 'Willkommen zurück!',
    subtitle: 'Finden Sie qualifizierte Fachkräfte in Ihrer Nähe',
    signIn: 'Anmelden',
    createAccount: 'Neues Konto erstellen',
    orContinueWith: 'oder weiter mit',
    continueAsGuest: 'Als Gast fortfahren',
    carpenter: 'Schreiner',
    electrician: 'Elektriker',
    plumber: 'Klempner',
  },

  // Login
  login: {
    title: 'Anmelden',
    heading: 'Willkommen zurück',
    subheading: 'Melden Sie sich an, um fortzufahren',
    email: 'E-Mail',
    emailPlaceholder: 'ihre.email@beispiel.de',
    password: 'Passwort',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'Passwort vergessen?',
    signInButton: 'Anmelden',
    noAccount: 'Noch kein Konto? ',
    register: 'Registrieren',
    emailRequired: 'E-Mail ist erforderlich',
    emailInvalid: 'Ungültige E-Mail-Adresse',
    passwordRequired: 'Passwort ist erforderlich',
    loginFailed: 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Angaben.',
  },

  // Register
  register: {
    title: 'Konto erstellen',
    heading: 'Neu hier?',
    subheading: 'Erstellen Sie jetzt Ihr kostenloses Konto',
    name: 'Name',
    namePlaceholder: 'Max Mustermann',
    email: 'E-Mail',
    emailPlaceholder: 'ihre.email@beispiel.de',
    phone: 'Telefon',
    phonePlaceholder: '+49 123 456 7890',
    password: 'Passwort',
    passwordPlaceholder: 'Mindestens 8 Zeichen',
    agreeTerms: 'Ich akzeptiere die ',
    termsLink: 'Nutzungsbedingungen',
    and: ' und die ',
    privacyLink: 'Datenschutzerklärung',
    registerButton: 'Registrieren',
    haveAccount: 'Bereits ein Konto? ',
    signIn: 'Anmelden',
    nameRequired: 'Name ist erforderlich',
    emailInvalid: 'Gültige E-Mail erforderlich',
    phoneInvalid: 'Gültige Telefonnummer erforderlich',
    passwordWeak: 'Mind. 8 Zeichen, mit Buchstaben und Zahlen',
    termsRequired: 'Bitte akzeptieren Sie die Bedingungen',
  },

  // Home
  home: {
    greeting: 'Hallo,',
    welcome: 'Willkommen!',
    searchPlaceholder: 'Dienstleistungen suchen…',
    emergencyTitle: 'Notdienst',
    emergencySubtitle: '24/7 sofort verfügbar',
    services: 'Dienstleistungen',
    seeAll: 'Alle anzeigen',
    recentBookings: 'Letzte Buchungen',
    quickAccess: 'Schnellzugriff',
    favorites: 'Favoriten',
    payment: 'Zahlung',
    settings: 'Einstellungen',
    available: 'verfügbar',
    plumber: 'Klempner', electrician: 'Elektriker', cleaning: 'Reinigung',
    heating: 'Heizung', carpenter: 'Schreiner', painter: 'Maler',
    gardener: 'Gärtner', moving: 'Umzug',
    statusConfirmed: 'Bestätigt', statusCompleted: 'Abgeschlossen', statusPending: 'Ausstehend',
    liveDispatch: 'Live-Einsatzübersicht', prosNearby: 'Fachkräfte in der Nähe', fastestMatch: 'Schnellste Vermittlung',
    recentJob: 'Letzter Auftrag', history: 'Verlauf', bookAgain: 'Erneut buchen',
  },

  // Service Category
  serviceCategory: {
    available: 'Fachkräfte verfügbar',
    rating: 'Bewertung', arrival: 'Ankunft', jobs: 'Aufträge',
    whatDoYouNeed: 'Was brauchen Sie?',
    faq: 'Häufig gestellte Fragen',
    viewProviders: 'Verfügbare Fachkräfte anzeigen',
    emergency: 'Notfall',
    subServices: {
      plumber: [
        { name: 'Rohrverstopfung', icon: 'water', urgent: true },
        { name: 'Wasserhahn-Reparatur', icon: 'water-outline' },
        { name: 'WC-Reparatur', icon: 'help-buoy-outline' },
        { name: 'Rohraustausch', icon: 'git-network-outline' },
        { name: 'Warmwasserbereiter-Installation', icon: 'flame-outline' },
        { name: 'Sanitärinstallation', icon: 'construct-outline' },
      ],
      electrician: [
        { name: 'Steckdosen-Reparatur', icon: 'flash', urgent: true },
        { name: 'Sicherungskasten-Service', icon: 'speedometer-outline' },
        { name: 'Beleuchtungsinstallation', icon: 'bulb-outline' },
        { name: 'Verkabelung & Neuverkabelung', icon: 'git-commit-outline' },
        { name: 'Schutzschalter', icon: 'flash-outline' },
        { name: 'Smart-Home-Einrichtung', icon: 'home-outline' },
      ],
      cleaning: [
        { name: 'Wohnungsreinigung', icon: 'sparkles' },
        { name: 'Büroreinigung', icon: 'business-outline' },
        { name: 'Auszugsreinigung', icon: 'cube-outline' },
        { name: 'Fensterreinigung', icon: 'square-outline' },
        { name: 'Teppichreinigung', icon: 'layers-outline' },
        { name: 'Grundreinigung', icon: 'shield-checkmark-outline' },
      ],
      heating: [
        { name: 'Heizungsausfall', icon: 'flame', urgent: true },
        { name: 'Heizkessel-Service', icon: 'thermometer-outline' },
        { name: 'Heizkörper-Reparatur', icon: 'grid-outline' },
        { name: 'Systeminstallation', icon: 'construct-outline' },
        { name: 'Jährliche Wartung', icon: 'calendar-outline' },
        { name: 'Thermostat-Einrichtung', icon: 'speedometer-outline' },
      ],
      carpenter: [
        { name: 'Türreparatur', icon: 'hammer', urgent: true },
        { name: 'Möbel nach Maß', icon: 'cube-outline' },
        { name: 'Fensterrahmen', icon: 'square-outline' },
        { name: 'Bodenbelag-Installation', icon: 'layers-outline' },
        { name: 'Schrankbau', icon: 'file-tray-stacked-outline' },
        { name: 'Holzreparatur', icon: 'construct-outline' },
      ],
      painter: [
        { name: 'Innenanstrich', icon: 'color-palette' },
        { name: 'Außenanstrich', icon: 'home-outline' },
        { name: 'Tapezieren', icon: 'image-outline' },
        { name: 'Wandreparatur', icon: 'construct-outline' },
        { name: 'Farbberatung', icon: 'eyedrop-outline' },
        { name: 'Möbel lackieren', icon: 'brush-outline' },
      ],
      gardener: [
        { name: 'Rasenmähen', icon: 'leaf' },
        { name: 'Heckenschnitt', icon: 'cut-outline' },
        { name: 'Baumpflege', icon: 'leaf-outline' },
        { name: 'Gartengestaltung', icon: 'flower-outline' },
        { name: 'Bewässerungsanlage', icon: 'water-outline' },
        { name: 'Saisonale Gartenpflege', icon: 'sunny-outline' },
      ],
      moving: [
        { name: 'Wohnungsumzug', icon: 'car', urgent: true },
        { name: 'Büroumzug', icon: 'business-outline' },
        { name: 'Verpackungsservice', icon: 'cube-outline' },
        { name: 'Möbeltransport', icon: 'bed-outline' },
        { name: 'Lagerlösungen', icon: 'file-tray-full-outline' },
        { name: 'Klaviertransport', icon: 'musical-notes-outline' },
      ],
    },
    faqs: {
      plumber: [
        { q: 'Wie schnell kann ein Klempner kommen?', a: 'Bei Notfällen meist innerhalb von 1-2 Stunden. Reguläre Termine sind am selben Tag oder am nächsten Tag verfügbar.' },
        { q: 'Was kostet ein Klempner?', a: 'Im Durchschnitt 80-120 € pro Stunde, zuzüglich Material. Notfalleinsätze können eine zusätzliche Gebühr beinhalten.' },
      ],
      electrician: [
        { q: 'Sind Ihre Elektriker zertifiziert?', a: 'Ja, alle Elektriker auf unserer Plattform besitzen eine gültige Zertifizierung und sind für Wohnarbeiten versichert.' },
        { q: 'Können Sie Smart-Home-Verkabelung übernehmen?', a: 'Die meisten unserer Elektriker bieten Smart-Home-Installationen an, von Schaltern bis zur vollständigen Hausautomation.' },
      ],
      cleaning: [
        { q: 'Muss ich Reinigungsmittel bereitstellen?', a: 'Nein, unsere Reinigungskräfte bringen ihre eigenen umweltfreundlichen Mittel und Geräte mit, sofern nicht anders gewünscht.' },
        { q: 'Wie lange dauert eine Standardreinigung?', a: 'Eine typische Wohnungsreinigung dauert 2-4 Stunden, je nach Größe und Zustand.' },
      ],
      heating: [
        { q: 'Was tun, wenn meine Heizung im Winter ausfällt?', a: 'Notfall-Heizungsreparaturen werden priorisiert und in der Regel innerhalb von 1-2 Stunden in den kalten Monaten durchgeführt.' },
        { q: 'Wie oft sollte ich meinen Heizkessel warten lassen?', a: 'Eine jährliche Wartung wird empfohlen, um Ihr System effizient zu halten und Probleme frühzeitig zu erkennen.' },
      ],
      carpenter: [
        { q: 'Können Schreiner Sonderanfertigungen bauen?', a: 'Ja, viele unserer Schreiner sind auf Möbel nach Maß und eingebaute Stauraumlösungen spezialisiert.' },
        { q: 'Arbeiten Sie mit Altholz?', a: 'Mehrere Anbieter bieten auf Anfrage nachhaltige und recycelte Holzoptionen an.' },
      ],
      painter: [
        { q: 'Wie lange bis ich den Raum nutzen kann?', a: 'Die meisten Innenfarben sind innerhalb von Stunden griffest, aber warten Sie 24 Stunden vor intensiver Nutzung.' },
        { q: 'Helfen Maler bei der Farbauswahl?', a: 'Viele bieten eine kostenlose Farbberatung im Rahmen größerer Malerarbeiten an.' },
      ],
      gardener: [
        { q: 'Bieten Sie einmaligen oder wiederkehrenden Service an?', a: 'Beides — Sie können einen einzelnen Besuch buchen oder eine wöchentliche, zweiwöchentliche oder monatliche Pflege einrichten.' },
        { q: 'Können Gärtner meinen Garten umgestalten?', a: 'Ja, mehrere Anbieter bieten umfassende Gartengestaltungs- und Landschaftsberatung an.' },
      ],
      moving: [
        { q: 'Stellen Umzugsfirmen Verpackungsmaterial bereit?', a: 'Die meisten bieten Kartons, Klebeband und Schutzverpackung im Rahmen ihres Verpackungsservices an.' },
        { q: 'Wie weit im Voraus sollte ich buchen?', a: 'Wir empfehlen, mindestens 1-2 Wochen im Voraus zu buchen, besonders für Umzüge am Wochenende.' },
      ],
    },
  },

  // Provider List
  providerList: {
    sortDistance: 'Entfernung', sortRating: 'Bewertung', sortPrice: 'Preis',
    results: 'Ergebnisse',
    responseTime: 'Antwortzeit', completedJobs: 'erledigte Aufträge',
  },

  // Provider Detail
  providerDetail: {
    reviews: 'Bewertungen', verified: 'Verifiziert', away: 'entfernt',
    jobsCompleted: 'Aufträge', responseTime: 'Antwortzeit', successRate: 'Erfolgsquote',
    tabAbout: 'Über uns', tabReviews: 'Bewertungen', tabServices: 'Leistungen',
    aboutText: 'Professionelle Sanitär- und Heizungsinstallation seit über 20 Jahren. Wir bieten schnellen und zuverlässigen Service für alle Ihre Anliegen.',
    openingHours: 'Öffnungszeiten', paymentMethods: 'Zahlungsmethoden',
    creditCard: 'Kreditkarte', cash: 'Bargeld', sepa: 'SEPA',
    weekday: 'Mo–Fr', saturday: 'Sa', sunday: 'So', emergencyOnly: 'Nur Notfälle',
    from: 'Ab', bookNow: 'Jetzt buchen',
    serviceList: ['Rohrverstopfung', 'Wasserhahn-Installation', 'Heizungsreparatur', '24/7 Notdienst', 'Sanitär-Wartung', 'Heizkessel-Service'],
  },

  // Search
  search: {
    recentSearches: 'Letzte Suchen',
    popularCategories: 'Beliebte Kategorien',
    resultsFor: 'Ergebnisse für',
    noResults: 'Keine Ergebnisse gefunden.',
  },

  // Emergency Booking
  emergency: {
    title: 'Notdienst', subtitle: '24/7 Sofort-Reaktion',
    arrival: 'Ankunft', technicians: 'Techniker', hotline: 'Hotline',
    available: 'verfügbar',
    typeOfEmergency: 'Art des Notfalls',
    waterLeak: 'Rohrbruch', powerOutage: 'Stromausfall', heatingFailure: 'Heizungsausfall',
    lockedDoor: 'Ausgesperrt', gasLeak: 'Gasleck', flooding: 'Überschwemmung', other: 'Sonstiges',
    description: 'Problembeschreibung',
    descriptionPlaceholder: 'Beschreiben Sie das Problem kurz…',
    yourLocation: 'Ihr Standort', change: 'Ändern',
    lifeThreat: 'rufen Sie sofort den Notruf an — diese App ersetzt keinen Notdienst.',
    lifeThreatBold: 'Unmittelbare Gefahr für Leib oder Eigentum?',
    reportButton: 'Notfall jetzt anfordern',
    selectFirst: 'Bitte auswählen', selectFirstBody: 'Bitte wählen Sie die Art des Notfalls aus.',
    reported: 'Notfall gemeldet', reportedBody: 'Ein Techniker ist auf dem Weg. Voraussichtliche Ankunft: 30–60 Minuten.',
    ok: 'OK',
    avgResponse: 'Ø Reaktionszeit 9 Min.', urgentRequest: 'Dringende Anfrage',
    tapHint: 'Tippen Sie auf Anfordern, um alle verfügbaren Fachkräfte in der Nähe sofort zu alarmieren',
    hintPipe: 'Drehen Sie, falls sicher erreichbar, den Haupt-Wasserhahn zu, während Sie warten.',
    hintGas: 'Verlassen Sie das Gebäude, betätigen Sie keine Schalter oder offenes Feuer und rufen Sie zuerst 112 an.',
    hintPower: 'Prüfen Sie zunächst den Sicherungskasten Ihres Gebäudes.',
    hintFlood: 'Bringen Sie Wertsachen und Elektrogeräte in Sicherheit, wenn es gefahrlos möglich ist.',
    hintLock: 'Halten Sie einen Ausweis bereit — die meisten Schlüsseldienste verlangen einen Wohnnachweis.',
    notifiesNearby: 'benachrichtigt sofort 24 Fachkräfte in der Nähe',
    callDirect: 'Anbieter direkt anrufen',
    trackJob: 'Auftrag verfolgen',
  },

  // Chat
  chat: {
    online: 'Online', placeholder: 'Nachricht schreiben...', autoReply: 'Danke für Ihre Nachricht. Ich melde mich in Kürze.',
    sampleMsg1: 'Guten Tag! Wie kann ich Ihnen helfen?',
    sampleMsg2: 'Ich habe ein Problem mit meinem Wasserhahn.',
    sampleMsg3: 'Kein Problem! Wann wäre ein Termin günstig?',
  },

  // Booking
  booking: {
    title: 'Termin buchen',
    urgency: 'Dringlichkeit', normal: 'Normal', normalDesc: 'Termin vereinbaren',
    emergencyDesc: 'Jetzt verfügbar',
    selectDate: 'Datum wählen', selectTime: 'Uhrzeit wählen',
    selected: 'Ausgewählt:', noDate: 'Noch kein Termin',
    continueButton: 'Weiter',
    months: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    days: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    frequency: 'Wie oft?', freqOnce: 'Einmalig', freqWeekly: 'Wöchentlich', freqBiweekly: 'Alle 2 Wochen', freqMonthly: 'Monatlich',
    recurringHint: 'Sie erhalten 10% Rabatt auf Wiederholungsbuchungen und können jederzeit kündigen.',
    estimate: 'Preisschätzung', calloutFee: 'Anfahrtspauschale', hourlyRate: 'Stundensatz',
    recurringDiscount: 'Rabatt für Wiederholung', estimatedTotal: 'Geschätzter Gesamtbetrag',
    estimateNote: 'Der Endpreis kann je nach Umfang des Auftrags abweichen.',
  },

  // Booking Confirmation
  bookingConfirmation: {
    title: 'Buchung bestätigen', checkTitle: 'Buchung prüfen', checkSubtitle: 'Bitte bestätigen Sie alle Angaben',
    provider: 'Anbieter', rating: 'Bewertung', date: 'Datum', time: 'Uhrzeit',
    urgencyLabel: 'Dringlichkeit', normal: 'Normal', emergency: 'Notfall',
    costOverview: 'Kostenübersicht', baseFee: 'Grundgebühr', service: 'Leistung', emergencyFee: 'Notfallgebühr',
    total: 'Gesamtbetrag', infoText: 'Sie erhalten eine Bestätigung per E-Mail. Der Anbieter kontaktiert Sie 30 Minuten vor dem Termin.',
    back: 'Zurück', confirmButton: 'Jetzt buchen',
  },

  // My Bookings
  myBookings: {
    title: 'Meine Buchungen',
    filterAll: 'Alle', filterUpcoming: 'Anstehend', filterCompleted: 'Abgeschlossen',
    statusUpcoming: 'Anstehend', statusConfirmed: 'Bestätigt', statusCompleted: 'Abgeschlossen',
    statusPending: 'Ausstehend', statusCancelled: 'Storniert',
    empty: 'Keine Buchungen', emptySubtitle: 'Ihre anstehenden und vergangenen Termine erscheinen hier.',
  },

  // Booking Detail
  bookingDetail: {
    title: 'Buchungsdetails', bookingNumber: 'Buchungsnr. ',
    detailsTitle: 'Buchungsdetails', provider: 'Anbieter', service: 'Leistung',
    date: 'Datum', time: 'Uhrzeit', address: 'Adresse',
    paymentTitle: 'Zahlung', amount: 'Betrag', paymentMethod: 'Zahlungsmethode', sepaDebit: 'SEPA-Lastschrift',
    sendMessage: 'Nachricht senden', cancelBooking: 'Buchung stornieren', leaveReview: 'Bewertung abgeben',
    cancelConfirmTitle: 'Buchung stornieren', cancelConfirmBody: 'Sind Sie sicher, dass Sie diese Buchung stornieren möchten?',
    cancelAbort: 'Abbrechen', cancelConfirm: 'Buchung stornieren',
    backToHome: 'Zurück zur Startseite',
    trackLive: 'Live verfolgen', jobProof: 'Nachweis der Fertigstellung', verified: 'Bestätigt',
    before: 'Vorher', after: 'Nachher',
    checklist1: 'Arbeitsbereich geprüft', checklist2: 'Reparatur abgeschlossen und getestet', checklist3: 'Arbeitsplatz gereinigt',
  },

  // Profile
  profile: {
    guest: 'Gast', bookings: 'Buchungen', favorites: 'Favoriten', rating: 'Bewertung',
    editProfile: 'Profil bearbeiten', myBookings: 'Meine Buchungen', paymentMethods: 'Zahlungsmethoden',
    notifications: 'Benachrichtigungen', settings: 'Einstellungen', logOut: 'Abmelden',
    savedAddresses: 'Gespeicherte Adressen', helpSupport: 'Hilfe & Support',
  },

  // Edit Profile
  editProfile: {
    title: 'Profil bearbeiten', changePhoto: 'Foto ändern',
    personalData: 'Persönliche Daten', fullName: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon',
    address: 'Adresse', street: 'Straße & Hausnummer', city: 'Stadt', zip: 'Postleitzahl',
    saveButton: 'Änderungen speichern',
    nameRequired: 'Name ist erforderlich', emailInvalid: 'Gültige E-Mail erforderlich',
    phoneInvalid: 'Gültige Telefonnummer erforderlich', zipInvalid: 'PLZ muss 5 Ziffern haben',
    savedTitle: 'Gespeichert', savedBody: 'Ihre Angaben wurden aktualisiert.',
  },

  // Payment Methods
  paymentMethods: {
    title: 'Zahlungsmethoden', default: 'Standard', setDefault: 'Als Standard', remove: 'Entfernen',
    addButton: 'Zahlungsmethode hinzufügen',
    removeTitle: 'Entfernen', removeBody: 'Diese Zahlungsmethode wirklich entfernen?',
    cancel: 'Abbrechen',
  },

  // Add Payment
  addPayment: {
    title: 'Zahlungsmethode hinzufügen', selectType: 'Zahlungsart auswählen',
    card: 'Kredit-/Debitkarte', sepa: 'SEPA-Lastschrift', paypal: 'PayPal',
    cardData: 'Kartendaten', cardHolder: 'Karteninhaber', cardHolderPlaceholder: 'Max Mustermann',
    cardNumber: 'Kartennummer', expiry: 'Ablaufdatum', cvv: 'CVV',
    sepaData: 'SEPA-Daten', accountHolder: 'Kontoinhaber', iban: 'IBAN',
    paypalAccount: 'PayPal-Konto', paypalEmail: 'PayPal-E-Mail',
    secureText: 'Ihre Daten sind sicher verschlüsselt (TLS 1.3)',
    addButton: 'Hinzufügen',
    cardInvalid: 'Ungültige Kartennummer', ibanInvalid: 'Ungültige IBAN',
    addedTitle: 'Hinzugefügt', addedBody: 'Zahlungsmethode wurde gespeichert.',
  },

  // Notifications
  notifications: {
    title: 'Benachrichtigungen', markAllRead: 'Alle als gelesen markieren', empty: 'Keine Benachrichtigungen',
    bookingConfirmedTitle: 'Buchung bestätigt', bookingConfirmedBody: 'Ihr Termin am 15.05. um 14:00 Uhr wurde bestätigt.',
    reminderTitle: 'Termin morgen', reminderBody: 'Nicht vergessen: Müller GmbH kommt morgen um 14:00 Uhr.',
    promoTitle: '20% Rabatt auf Reinigung', promoBody: 'Nur heute: Buchen Sie eine Reinigung und sparen Sie 20%.',
    reviewTitle: 'Bewertung abgeben', reviewBody: 'Wie war Ihr Termin mit Schmidt Sanitär?',
    systemTitle: 'App aktualisiert', systemBody: 'HomeServices wurde auf Version 1.1.0 aktualisiert.',
    justNow: 'Gerade jetzt', minAgo: 'Min. her', hoursAgo: 'Std. her', yesterday: 'Gestern', daysAgo: 'Tage her',
  },

  // Settings
  settings: {
    title: 'Einstellungen',
    notificationsSection: 'Benachrichtigungen', push: 'Push-Benachrichtigungen', emailNotif: 'E-Mail-Benachrichtigungen', sms: 'SMS-Benachrichtigungen',
    privacySection: 'Datenschutz & Sicherheit', location: 'Standortdienste', biometric: 'Biometrische Anmeldung',
    appearanceSection: 'Erscheinungsbild', darkMode: 'Dunkler Modus',
    languageSection: 'Sprache', language: 'Sprache',
    generalSection: 'Allgemein', help: 'Hilfe & Support', privacyPolicy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen',
    marketingSection: 'Marketing', marketingEmails: 'Marketing-E-Mails',
    version: 'HomeServices v1.0.0',
  },

  // Favorites
  favorites: {
    title: 'Favoriten', empty: 'Keine Favoriten',
    emptySubtitle: 'Tippen Sie auf das Herz-Symbol bei einem Anbieter, um ihn hier zu speichern.',
    discoverButton: 'Anbieter entdecken',
  },

  // Live Tracking
  liveTracking: {
    title: 'Live-Verfolgung', etaLabel: 'Voraussichtliche Ankunft', plumber: 'Klempner', status: 'Auftragsstatus',
    step_matched: 'Fachkraft zugewiesen', step_enroute: 'Unterwegs', step_arriving: 'Kommt gleich an',
    step_inprogress: 'Auftrag läuft', step_completed: 'Abgeschlossen',
    now: 'Jetzt', cancelJob: 'Auftrag stornieren',
    cancelTitle: 'Auftrag stornieren', cancelBody: 'Möchten Sie diesen Auftrag wirklich stornieren?', cancelConfirm: 'Auftrag stornieren',
  },

  // Saved Addresses
  savedAddresses: {
    title: 'Gespeicherte Adressen', default: 'Standard', addNew: 'Neue Adresse hinzufügen',
  },

  // Help & Support
  helpSupport: {
    title: 'Hilfe & Support', faqTitle: 'Häufig gestellte Fragen', contactTitle: 'Kontaktieren Sie uns',
    liveChat: 'Live-Chat', email: 'E-Mail senden', callUs: 'Anrufen', reportIssue: 'Problem oder Streitfall melden',
    faq1Q: 'Wie storniere ich eine Buchung?', faq1A: 'Gehen Sie zu Meine Buchungen, öffnen Sie die Buchung und tippen Sie auf Buchung stornieren. Stornierungen weniger als 2 Stunden vor dem Termin können gebührenpflichtig sein.',
    faq2Q: 'Wie funktioniert die Preisgestaltung?', faq2A: 'Jede Buchung zeigt vor der Bestätigung eine Anfahrtspauschale plus Stundensatz. Wiederkehrende Buchungen erhalten 10% Rabatt.',
    faq3Q: 'Was, wenn meine Fachkraft sich verspätet?', faq3A: 'Verfolgen Sie die Live-Ankunftszeit über die Buchungsdetails. Bei erheblicher Verspätung kontaktieren Sie den Support.',
    faq4Q: 'Sind meine Zahlungsdaten sicher?', faq4A: 'Ja, alle Zahlungsdaten sind mit TLS 1.3 verschlüsselt und werden niemals im Klartext gespeichert.',
  },

  // Common
  common: {
    back: 'Zurück', cancel: 'Abbrechen', save: 'Speichern', delete: 'Löschen', edit: 'Bearbeiten',
    loading: 'Lädt…', error: 'Ein Fehler ist aufgetreten', retry: 'Erneut versuchen',
  },
};
