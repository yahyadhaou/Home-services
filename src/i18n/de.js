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
    gardener: 'Gärtner', moving: 'Umzug', handyman: 'Handwerker', internet: 'Internettechniker',
    statusConfirmed: 'Bestätigt', statusCompleted: 'Abgeschlossen', statusPending: 'Ausstehend',
    liveDispatch: 'Live-Einsatzübersicht', prosNearby: 'Fachkräfte in der Nähe', fastestMatch: 'Schnellste Vermittlung', you: 'Sie',
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
      handyman: [
        { name: 'Möbelmontage', icon: 'construct', urgent: true },
        { name: 'Wandmontage', icon: 'grid-outline' },
        { name: 'Kleine Reparaturen', icon: 'hammer-outline' },
        { name: 'Vorhang- & Jalousienmontage', icon: 'apps-outline' },
        { name: 'Tür- & Schlossreparatur', icon: 'key-outline' },
        { name: 'Allgemeine Handwerksarbeiten', icon: 'briefcase-outline' },
      ],
      internet: [
        { name: 'Kein Internetzugang', icon: 'wifi-outline', urgent: true },
        { name: 'Router- & Modem-Einrichtung', icon: 'hardware-chip-outline' },
        { name: 'WLAN-Abdeckung & Mesh', icon: 'grid-outline' },
        { name: 'Netzwerkverkabelung', icon: 'git-network-outline' },
        { name: 'Smart-Home-Vernetzung', icon: 'home-outline' },
        { name: 'Geschwindigkeits- & Signaldiagnose', icon: 'speedometer-outline' },
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
      handyman: [
        { q: 'Welche kleinen Arbeiten übernimmt ein Handwerker?', a: 'Möbelmontage, Regal- und TV-Montage, kleinere Reparaturen und andere Arbeiten, die kein spezialisiertes Gewerk erfordern.' },
        { q: 'Muss ich Werkzeug oder Material bereitstellen?', a: 'Nein, unsere Handwerker bringen ihr eigenes Werkzeug mit. Kleinmaterial wie Schrauben ist meist inklusive; größere Teile können extra berechnet werden.' },
      ],
      internet: [
        { q: 'Kann ein Techniker einen Router oder eine WLAN-Funklücke beheben?', a: 'Ja — die meisten Einsätze umfassen Router-Konfiguration, WLAN-Mesh-Installation und die Diagnose von schwachem Signal in einzelnen Räumen.' },
        { q: 'Muss ich bereits Kunde meines Internetanbieters sein?', a: 'Nein, Techniker können jeden Router oder Anschluss einrichten oder prüfen und auch die Vernetzung von Smart-Home-Geräten übernehmen.' },
      ],
    },
  },

  // Provider List
  providerList: {
    sortDistance: 'Entfernung', sortRating: 'Bewertung', sortPrice: 'Preis',
    results: 'Ergebnisse',
    responseTime: 'Antwortzeit', completedJobs: 'erledigte Aufträge',
    company: 'Unternehmen', independent: 'Selbstständig', all: 'Alle', filterBy: 'Filtern nach', perHour: 'Std.',
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

  relocation: {
    title: 'Umzug', subtitle: 'Unternehmen oder Unabhängiger — passend zu Ihrem Umzug',
    stepHomeTitle: 'Erzählen Sie uns von Ihrer Wohnung',
    propertyType: 'Immobilientyp', apartment: 'Wohnung', house: 'Haus',
    roomCount: 'Anzahl Zimmer', rooms: 'Zimmer',
    floor: 'Etage', groundFloor: 'Erdgeschoss', floorShort: 'Etage',
    hasElevator: 'Dieses Gebäude hat einen Aufzug',
    noElevatorHint: 'Kein Aufzug in der {{floor}}. Etage — Tragekosten sind in der Schätzung enthalten.',
    stepItemsTitle: 'Was möchten Sie umziehen?',
    item_furniture: 'Möbel', item_boxes: 'Kartons', item_appliances: 'Elektrogeräte',
    item_kitchen: 'Küche', item_heavy: 'Klavier / Schwergut', item_misc: 'Fahrrad / Sonstiges',
    estimatedVolume: 'Geschätztes Volumen', volumeNote: 'Das bestimmt, welche Fahrzeuggröße für Ihren Umzug passt.',
    tier_0: 'PKW', tier_1: 'Kleinbus', tier_2: 'Sprinter', tier_3: 'Möbelwagen',
    stepRouteTitle: 'Wohin geht es?',
    destination: 'Zielort',
    city_essen: 'Essen (lokal)', city_muelheim: 'Mülheim a.d.R.', city_bochum: 'Bochum',
    city_oberhausen: 'Oberhausen', city_duisburg: 'Duisburg', city_duesseldorf: 'Düsseldorf', city_dortmund: 'Dortmund',
    stepMoverTitle: 'Wählen Sie Ihren Umzugshelfer',
    companyOption: 'Umzugsunternehmen', companyDesc: 'Versichertes Team, Festpreis, Rundum-Service',
    independentOption: 'Unabhängiger Helfer', independentDesc: 'Eigenes Fahrzeug, flexibel, günstig',
    laborOption: 'Nur Helfer', laborDesc: 'Sie stellen den Transporter (eigener oder geliehener) — nur Arbeitskraft buchen',
    bullet_insured: 'Gegen Schäden versichert', bullet_fixedPrice: 'Festpreis, keine Überraschungen', bullet_crew: '2-3 Personen Team inklusive',
    bullet_cheaper: 'Meist günstiger', bullet_flexible: 'Flexible Terminwahl', bullet_ownCar: 'Bringt eigenes Fahrzeug mit',
    bullet_cheapest: 'Günstigste Option', bullet_yourVan: 'Nutzt Ihr eigenes oder geliehenes Fahrzeug',
    bullet_notInsured: 'Nicht über die Plattform versichert — Haftung wird direkt vereinbart',
    helperCount: 'Anzahl Helfer', helpers: 'Helfer',
    recommendHelpers: 'Empfehlung: {{count}} Helfer für dieses Volumen (weniger geht auch, dauert nur länger)',
    matched: 'Passende Anbieter für Ihren Umzug', noMatch: 'Noch keine Übereinstimmung — versuchen Sie ein kleineres Volumen oder die andere Option.',
    laborOnly: 'Nur Helfer (kein Fahrzeug)', mayNeedTrips: 'Kleineres Fahrzeug — evtl. mehrere Fahrten nötig',
    continue: 'Weiter', pickHint: 'Wählen Sie oben einen Anbieter, um zur Buchung fortzufahren',
  },

  nearby: {
    title: 'In der Nähe', subtitle: '{{count}} Fachkräfte gerade in Ihrer Nähe',
    live: 'Live-Karte', tapPin: 'Tippen Sie auf einen Pin für eine Vorschau',
    allNearby: 'Alle in der Nähe',
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

  // Chat inbox
  chatList: {
    title: 'Nachrichten', search: 'Unterhaltungen durchsuchen…',
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
    estimate: 'Preisschätzung', calloutFee: 'Anfahrtspauschale', hourlyRate: 'Stundensatz', servicePrice: 'Leistungspreis',
    recurringDiscount: 'Rabatt für Wiederholung', estimatedTotal: 'Gesamtbetrag',
    serviceFee: 'Servicegebühr ({{rate}}%)',
    estimateNote: 'Der Endpreis kann je nach Umfang des Auftrags abweichen.',
    vatNote: 'Preis inkl. MwSt. (19%). Der Endpreis kann je nach Umfang des Auftrags abweichen.',
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
    savedAddresses: 'Gespeicherte Adressen', helpSupport: 'Hilfe & Support', messages: 'Nachrichten',
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
    reminderTitle: 'Termin morgen', reminderBody: 'Nicht vergessen: Rüttenscheider Sanitärtechnik GmbH kommt morgen um 14:00 Uhr.',
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
    title: 'Live-Verfolgung', etaLabel: 'Voraussichtliche Ankunft', plumber: 'Klempner', status: 'Auftragsstatus', you: 'Sie',
    step_pending: 'Warte auf Bestätigung', step_matched: 'Fachkraft zugewiesen', step_enroute: 'Unterwegs', step_arriving: 'Kommt gleich an',
    step_inprogress: 'Auftrag läuft', step_completed: 'Abgeschlossen',
    waitingTitle: 'Warte auf Bestätigung', waitingSub: '{{name}} wurde benachrichtigt und prüft gerade Ihre Anfrage.',
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

  // Rechtliches — Platzhaltertext nur zur Vorschau der Oberfläche, nicht
  // anwaltlich geprüft. Vor echtem Betrieb durch geprüften Text ersetzen
  // (DSGVO, PAngV, Fernabsatzrecht).
  legal: {
    draftNotice: 'Platzhaltertext zur Vorschau — noch nicht anwaltlich geprüft. Nicht für den echten Start verwenden.',
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      updated: 'Zuletzt aktualisiert: Juli 2026',
      sections: [
        { heading: '1. Annahme dieser Bedingungen', body: 'Mit der Erstellung eines Kontos oder einer Buchung über HomeServices stimmen Sie diesen Nutzungsbedingungen und unserer Datenschutzerklärung zu. Wenn Sie nicht einverstanden sind, nutzen Sie die App bitte nicht.' },
        { heading: '2. Was HomeServices ist', body: 'HomeServices ist eine Vermittlungsplattform, die Kunden mit selbstständigen Handwerkern, eingetragenen Dienstleistungsunternehmen und unabhängigen Umzugshelfern im Raum Essen/NRW verbindet. Wir beschäftigen keine Anbieter und führen selbst keine Klempner-, Elektro-, Reinigungs-, Umzugs- oder sonstigen gelisteten Leistungen aus.' },
        { heading: '3. Konten', body: 'Sie müssen mindestens 18 Jahre alt sein und korrekte Kontakt- und Adressdaten angeben. Sie sind für die Sicherheit Ihrer Zugangsdaten und alle Aktivitäten unter Ihrem Konto verantwortlich.' },
        { heading: '4. Buchungen, Preise & Gebühren', body: 'Der vor Bestätigung angezeigte Preis ist endgültig: Er enthält den Servicepreis des Anbieters, eine Plattformgebühr (derzeit 12 %) und die gesetzliche Mehrwertsteuer. Eine Stornierung weniger als 2 Stunden vor dem Termin kann eine Gebühr auslösen, die zum Zeitpunkt der Stornierung angezeigt wird.' },
        { heading: '5. Ihr Verhältnis zu Anbietern', body: 'Unternehmen und selbstständige Anbieter werden in der App getrennt dargestellt, weil sie nicht dasselbe sind: Unternehmen verfügen über eine Betriebshaftpflichtversicherung und beschäftigen eigenes Personal; selbstständige Anbieter arbeiten auf eigene Rechnung. HomeServices ist nicht Vertragspartei des Dienstleistungsvertrags zwischen Ihnen und dem Anbieter.' },
        { heading: '6. Zahlungen & Erstattungen', body: 'Zahlungen werden per SEPA oder Karte über unseren Zahlungsdienstleister abgewickelt. Wird eine Buchung vom Anbieter storniert oder die Leistung nicht wie gebucht erbracht, haben Sie Anspruch auf vollständige Erstattung des belasteten Betrags.' },
        { heading: '7. Zulässige Nutzung', body: 'Sie verpflichten sich, die App nicht für betrügerische Buchungen zu nutzen, die Plattform nicht zu umgehen, um Gebühren zu vermeiden, und Anbieter oder andere Nutzer nicht zu belästigen.' },
        { heading: '8. Haftung', body: 'HomeServices bemüht sich um die Vermittlung qualifizierter Anbieter, garantiert jedoch nicht die Qualität der ausgeführten Arbeiten. Unsere Haftung ist, soweit nach deutschem Recht zulässig, auf den Betrag der jeweiligen Buchung begrenzt. Ihre gesetzlichen Verbraucherrechte bleiben hiervon unberührt.' },
        { heading: '9. Sperrung & Kündigung', body: 'Wir können ein Konto sperren oder schließen, das gegen diese Bedingungen verstößt, einschließlich betrügerischer Aktivitäten oder Missbrauchs gegenüber Anbietern oder dem Support.' },
        { heading: '10. Anwendbares Recht', body: 'Diese Bedingungen unterliegen deutschem Recht. Zwingende verbraucherschützende Vorschriften Ihres Wohnsitzlandes bleiben als EU-Verbraucher unberührt.' },
        { heading: '11. Änderungen dieser Bedingungen', body: 'Wir können diese Bedingungen gelegentlich aktualisieren. Über wesentliche Änderungen informieren wir Sie, bevor sie wirksam werden.' },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung',
      updated: 'Zuletzt aktualisiert: Juli 2026',
      sections: [
        { heading: '1. Wer wir sind', body: 'HomeServices (Platzhalter-Rechtsform, Essen, Deutschland) ist der Verantwortliche für die in dieser Erklärung beschriebenen personenbezogenen Daten. Kontakt: privacy@homeservices.example (Platzhalter).' },
        { heading: '2. Was wir erheben', body: 'Kontodaten (Name, E-Mail, Telefon), Ihre Adresse und Ihren Standort (zur Vermittlung nahegelegener Anbieter), Buchungshistorie sowie Nachrichten mit Anbietern innerhalb der App. Zahlungskartendaten werden direkt von unserem Zahlungsdienstleister verarbeitet — wir speichern keine vollständigen Kartennummern.' },
        { heading: '3. Wie wir Ihre Daten verwenden', body: 'Zur Erstellung und Verwaltung Ihrer Buchungen, zur Vermittlung verfügbarer Anbieter, für buchungsbezogene Benachrichtigungen, zur Betrugsprävention und zur Erfüllung gesetzlicher Pflichten (z. B. Aufbewahrung von Rechnungen nach deutschem Steuerrecht).' },
        { heading: '4. Rechtsgrundlage', body: 'Wir verarbeiten Ihre Daten zur Vertragserfüllung bei einer Buchung, aufgrund unseres berechtigten Interesses an einem sicheren Marktplatz sowie auf Basis Ihrer Einwilligung, soweit Sie Marketingmitteilungen zugestimmt haben.' },
        { heading: '5. Weitergabe an Dritte', body: 'Bei einer Buchung erhält der vermittelte Anbieter die zur Auftragserfüllung nötigen Informationen (Name, Adresse, Telefonnummer, Auftragsdetails). Wir verkaufen Ihre Daten nicht an Werbetreibende.' },
        { heading: '6. Speicherdauer', body: 'Kontodaten werden gespeichert, solange Ihr Konto aktiv ist; rechnungsbezogene Daten werden für den nach deutschem Steuerrecht vorgeschriebenen Zeitraum (derzeit bis zu 10 Jahre) auch nach Kontoschließung aufbewahrt.' },
        { heading: '7. Ihre Rechte', body: 'Nach der DSGVO können Sie Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, die Einschränkung oder den Widerspruch gegen die Verarbeitung fordern und eine Kopie Ihrer Daten in einem übertragbaren Format verlangen. Sie können sich außerdem bei Ihrer zuständigen Aufsichtsbehörde beschweren (in NRW: Landesbeauftragte für Datenschutz und Informationsfreiheit).' },
        { heading: '8. Cookies & Analyse', body: 'Die App verwendet funktionale Speicherung, die zur Anmeldung und zum Speichern Ihrer Einstellungen nötig ist. Jede darüber hinausgehende Analyse oder Nachverfolgung wird hier stets beschrieben, bevor sie aktiviert wird.' },
        { heading: '9. Sicherheit', body: 'Daten werden bei der Übertragung verschlüsselt (TLS). Der interne Zugriff auf personenbezogene Daten ist auf das für den Betrieb Notwendige beschränkt.' },
        { heading: '10. Kontakt', body: 'Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie privacy@homeservices.example (Platzhalter) oder nutzen Sie Hilfe & Support in der App.' },
      ],
    },
  },
};
