// Контент приложения ADI Snap. Тексты взяты из макета; там, где строку
// перекрывал таб-бар, фраза аккуратно достроена.

export const img = (name, ext = 'webp') => `${import.meta.env.BASE_URL}img/${name}.${ext}`

export const ME = { handle: 'francorossi33', avatar: 'avatar' }

// ——— Категории

export const CATEGORIES = {
  automobili: { title: 'Automobili' },
  arredi: { title: 'Arredi e complementi casa' },
  giochi: { title: 'Giochi e articoli per l’infanzia' },
  motocicli: { title: 'Motocicli' },
  illuminazione: { title: 'Illuminazione' },
  casa: { title: 'Oggetti per la casa' },
  elettronica: { title: 'Elettronica' },
}

// ——— Aziende

export const COMPANIES = {
  fiat: {
    name: 'Fiat',
    logo: 'logo-fiat',
    thumb: 'thumb-fiat',
    count: 18,
    site: 'https://www.fiat.it',
    story: [
      'FIAT (Fabbrica Italiana Automobili Torino), fondata nel 1899, è sinonimo di motorizzazione di massa italiana.',
      'Dopo la guerra arrivano i modelli del boom economico: la 600 nel 1955 e la Nuova 500 nel 1957, auto che grazie alla progettazione intelligente e al prezzo accessibile hanno motorizzato l’Italia.',
      'Nel secondo Novecento, Fiat diventa sinonimo di innovazione specie nel settore delle automobili compatte: dalla 128 alla Tipo, dalla Uno alla Punto, passando per l’iconica Panda, che rivoluziona il concetto di utilitaria con semplicità e versatilità.',
      'Dal 2007 torna la 500 in un design che rievoca l’iconico modello, oggi disponibile anche in versione elettrica. Dopo la fusione con Chrysler nel 2011 in FCA, dal 2021 è parte di Stellantis.',
    ],
  },
  alessi: {
    name: 'Alessi',
    logo: 'logo-alessi',
    count: 10,
    site: 'https://alessi.com/it',
    story: [
      'Alessi nasce a Omegna, sul Lago d’Orta, nel 1921, quando Giovanni Alessi fonda con il fratello l’officina Fratelli Alessi Omegna, specializzata in oggetti di rame, ottone e alpacca.',
      'Nel 1932 entra in azienda il figlio Carlo, che tra il 1935 e il 1945 disegna la maggior parte dei prodotti. Dopo la guerra l’attività diventa industriale, e negli anni Cinquanta passa all’acciaio inossidabile, specializzandosi in oggetti per uso professionale.',
      'Nel 1970 entra Alberto Alessi, nipote del fondatore, e con le collaborazioni di Sottsass, Sapper, Castiglioni e Mendini l’azienda diventa una “fabbrica del design”, specializzata in oggetti per la casa che sono diventati vere e proprie icone. Tra i prodotti entrati nella storia ci sono il bollitore 9091 di Sapper (1983) e lo spremiagrumi Juicy Salif di Starck (1990).',
      'Nel 1998 nasce il Museo Alessi, e Alberto Alessi è oggi presidente.',
    ],
  },
  artemide: {
    name: 'Artemide',
    logo: 'logo-artemide',
    count: 6,
    site: 'https://www.artemide.com/it',
    story: [
      'Artemide viene fondata a Milano nel 1960 da Ernesto Gismondi e Sergio Mazza, e la sua prima lampada è Alfa, disegnata da Mazza nel 1959. La sede è a Pregnana Milanese.',
      'Dopo una breve fase di arredi in plastica, esaurita per i costi di produzione e la crisi petrolifera degli anni Settanta, l’azienda si concentra sull’illuminazione. Tra i suoi prodotti più noti ci sono la lampada Eclisse di Vico Magistretti (Compasso d’Oro 1967), la Tizio di Richard Sapper (1972) e la Tolomeo di Michele De Lucchi e Giancarlo Fassina, lanciata nel 1987 e premiata con il Compasso d’Oro nel 1989.',
      'Artemide ha ricevuto anche il Compasso d’Oro alla carriera. Oggi collabora con progettisti internazionali come Herzog & de Meuron, Naoto Fukasawa e Zaha Hadid, con una crescente attenzione alla sostenibilità.',
    ],
  },
  bb: {
    name: 'B&B Italia',
    short: 'B&B',
    logo: 'logo-bb',
    thumb: 'thumb-bb',
    count: 5,
    site: 'https://www.bebitalia.com/it',
    story: [
      'B&B Italia nasce nel 1966 come C&B Italia, fondata da Piero Ambrogio Busnelli con Cesare Cassina. Dopo la separazione da Cassina, Busnelli guida l’azienda e nel 1973 ne cambia il nome in B&B Italia.',
      'La sede è a Novedrate, in provincia di Como, in un edificio progettato da Renzo Piano e Richard Rogers. Hanno lavorato per l’azienda, tra gli altri, Mario Bellini, Gaetano Pesce, Patricia Urquiola e Zaha Hadid.',
      'Ha vinto quattro Compassi d’Oro: nel 1979 per Le Bambole di Bellini, nel 1984 per Sisamo dello Studio Kairos, nel 1987 per Sity di Antonio Citterio e nel 1989, il primo assegnato direttamente a un’azienda produttrice.',
      'Dal 1966 ha prodotto oltre mille progetti, compresi i prototipi, e nel 2011 la famiglia Busnelli ha riacquistato la maggioranza dell’azienda.',
    ],
  },
  // aziende senza scheda
  cassina: { name: 'Cassina', wordmark: 'Cassina' },
  piaggio: { name: 'Piaggio', thumb: 'thumb-piaggio' },
  ducati: { name: 'Ducati', thumb: 'thumb-ducati' },
  kartell: { name: 'Kartell' },
  robots: { name: 'Robots' },
  magis: { name: 'Magis' },
  pigomma: { name: 'Pigomma' },
  quasar: { name: 'Quasar' },
  alfaromeo: { name: 'Alfa Romeo' },
  italtel: { name: 'Italtel' },
  flos: { name: 'Flos' },
  arflex: { name: 'Arflex' },
  olivetti: { name: 'Olivetti', wordmark: 'olivetti' },
}

// ——— Designer

export const DESIGNERS = {
  giugiaro: {
    name: 'Giorgetto Giugiaro',
    lines: ['Giorgetto', 'Giugiaro'],
    photo: 'hero-giugiaro',
    portrait: 'hero-giugiaro',
    thumb: 'thumb-giugiaro',
    quote: 'Non è l’uomo che si deve adattare alla vettura, ma la macchina. Tenendo ovviamente conto dei problemi tecnici, economici e commerciali, penso sia soprattutto importante considerare i movimenti strutturali dell’uomo: salire, scendere, sedersi.',
    bio: [
      'Nato a Garessio nel 1938, Giorgetto Giugiaro è universalmente riconosciuto come uno dei più grandi designer automobilistici di tutti i tempi. La sua carriera inizia giovanissimo presso Bertone, dove lavora su progetti iconici come l’Alfa Romeo Giulia GT.',
      'Nel 1965 si trasferisce alla Ghia, dove progetta la De Tomaso Mangusta e la Maserati Ghibli. Ma è nel 1968 che fonda la sua casa di design, Italdesign Giugiaro, che diventerà una delle più influenti al mondo nel settore automotive.',
      'Tra i suoi progetti più celebri si annoverano la Volkswagen Golf (1974), la Fiat Panda (1980), la Lancia Delta (1979) e la DeLorean DMC-12. Nel 1984 ha ricevuto il Compasso d’Oro alla Carriera. Oltre alle automobili, ha spaziato in numerosi campi del design industriale: fotocamere Nikon, armi Beretta, moto Ducati, e persino un nuovo tipo di pasta per Barilla.',
      'Nel 1999 viene nominato “Car Designer of the Century” dal Global Automotive Elections Foundation, riconoscimento che corona una carriera straordinaria dedicata all’innovazione nel design automobilistico.',
    ],
    videos: [
      { title: 'Il design della Panda', text: 'Intervista esclusiva sul processo creativo dietro la Fiat Panda', time: '15:30 min', thumb: 'video-giugiaro' },
      { title: 'Come cambia l’auto italiana', text: 'L’influenza di Giugiaro sulla produzione di massa dell’auto italiana', time: '22:15 min' },
    ],
  },
  castiglioni: {
    name: 'Achille Castiglioni',
    lines: ['Achille', 'Castiglioni'],
    photo: 'hero-castiglioni',
    portrait: 'hero-castiglioni',
    quote: 'L’esperienza non dà certezza né sicurezza, ma anzi aumenta la possibilità di errore. Direi che è meglio ricominciare ogni volta da capo con umiltà perché l’esperienza non rischi di tramutarsi in furbizia.',
    bio: [
      'Nato a Milano il 16 febbraio 1918, è figlio dello scultore Giannino Castiglioni, il cui approccio plastico ha influenzato il suo modo di fare design. Dal 1940 sperimenta prodotti industriali con i fratelli Livio e Pier Giacomo.',
      'Si laurea in architettura al Politecnico di Milano nel 1944 e collabora con Livio fino al 1952 e con Pier Giacomo fino alla morte di quest’ultimo, nel 1968. Da allora guida lo studio da solo fino al 2002.',
      'Tra i fondatori dell’ADI (1956), insegna Disegno industriale al Politecnico di Milano fino al 1993. Il suo lavoro unisce semplicità, ironia e attenzione al modo in cui gli oggetti vengono usati, alla tecnologia e ai nuovi materiali.',
      'Ha disegnato per Flos, Zanotta, Alessi (le posate Dry sono il primo servizio di posate dell’azienda) e De Padova.',
      'Ha vinto nove Compassi d’Oro, tra cui la lampada Luminator (1955), la sedia T12 (1960), la macchina per il caffè Pitagora (1962) e la lampada Parentesi (1979), più una menzione speciale nel 1989. Quattordici sue opere sono al MoMA di New York. Muore a Milano il 2 dicembre 2002.',
    ],
    videos: [
      { title: 'Intervista (Designboom)', text: 'Video intervista inedita', time: '15:30 min', thumb: 'video-castiglioni' },
      { title: 'Intervista (RaiPlay — 2000)', text: 'Art Night rielabora le immagini di un’intervista del 2000.', time: '22:15 min' },
    ],
  },
  boeri: {
    name: 'Cini Boeri',
    lines: ['Cini', 'Boeri'],
    photo: 'hero-boeri',
    portrait: 'boeri',
    quote: 'Mi hanno sempre interessato le persone e i loro comportamenti. Sono una grande osservatrice, quando progetto mi piace entrare in sintonia con i committenti e comprendere le loro necessità e desideri per cercare di fornirgli la migliore soluzione possibile.',
    bio: [
      'Maria Cristina Mariani Dameno, detta Cini Boeri, nasce a Milano il 19 giugno 1924 e si laurea in architettura al Politecnico di Milano nel 1951.',
      'Dopo un breve periodo nello studio di Giò Ponti lavora per molti anni con Marco Zanuso, e nel 1963 apre il proprio studio, dedicandosi ad architettura civile e design industriale. Nel design si concentra su elementi d’arredo e componenti per l’edilizia, e nel suo pensiero ha un ruolo centrale il rapporto psicologico tra le persone e lo spazio in cui vivono. Collabora con aziende come Arflex, Arteluce, Knoll, Fiam e Poltrona Frau.',
      'Tra i suoi progetti ci sono la poltrona Bobo (1967), la prima seduta realizzata interamente in schiuma, il divano Serpentone (1971), venduto al metro, il sistema modulare Strips (1972), premiato con il Compasso d’Oro nel 1979, e la sedia Ghost (1987, con Tomu Katayanagi).',
      'Ha progettato anche case, uffici, negozi e allestimenti museali, e ha insegnato in Italia e all’estero. Le sono stati assegnati il Compasso d’Oro alla carriera (2011), la nomina a Grande Ufficiale dell’Ordine al Merito della Repubblica Italiana (2011) e l’Ambrogino d’oro (2019). Muore a Milano il 9 settembre 2020, a 96 anni.',
    ],
    videos: [
      { title: 'Intervista (1977)', text: 'Intervista esclusiva', time: '15:30 min' },
      { title: 'Intervista (Domus)', text: 'Intervista inedita', time: '22:15 min' },
    ],
  },
  citterio: {
    name: 'Antonio Citterio',
    lines: ['Antonio', 'Citterio'],
    photo: 'hero-citterio',
    portrait: 'citterio',
    thumb: 'thumb-citterio',
    quote: 'Quando penso al design e a quello che oggi rappresenta, mi viene in mente il concetto di una nuova modernità che potremmo riassumere, in estrema sintesi, come ‘lasciare un’eredità’.',
    bio: [
      'Nato a Meda nel 1950, apre il proprio studio nel 1972 e si laurea in architettura al Politecnico di Milano nel 1975. Dal 1987 al 1996 collabora con Terry Dwan a edifici in Europa e in Giappone.',
      'Nel design industriale lavora per aziende come B&B Italia, Kartell, Vitra, Flexform, Flos, Hermès, Iittala e Technogym. Dal 1993 è Head of Design di Maxalto, marchio del gruppo B&B Italia.',
      'Tra i suoi progetti più noti ci sono il divano Sity (1986) per B&B Italia, il tavolo Battista, il carrello Oxo e il sistema Mobil (1993) per Kartell, e la T-Chair (1996) per Vitra.',
      'Nel 2000 fonda con Patricia Viel uno studio di architettura, interni e grafica, oggi Antonio Citterio Patricia Viel. Dal 2006 al 2016 è professore di architettura all’Università della Svizzera italiana a Mendrisio. Nel 2008 la Royal Society for the Encouragement of Arts, Manufactures & Commerce di Londra lo nomina Royal Designer for Industry.',
    ],
    videos: [
      { title: 'Intervista (Domus)', text: 'Intervista esclusiva', time: '15:30 min' },
      { title: 'Intervista', text: 'Intervista esclusiva', time: '22:15 min' },
    ],
  },
  delucchi: {
    name: 'Michele De Lucchi',
    lines: ['Michele de', 'Lucchi'],
    photo: 'hero-delucchi',
    portrait: 'delucchi',
    quote: 'Noi siamo tutti progettisti. Siamo impegnati ad immaginarci una vita dell’uomo migliore su questo pianeta. […] Noi designer non la possiamo migliorare se non abbiamo dei clienti. Noi stessi siamo clienti e progettisti. Dobbiamo vivere con loro e sono al contempo orribili e meravigliosi.',
    bio: [
      'Nato a Ferrara nel 1951, studia architettura a Padova e a Firenze, dove si laurea nel 1975.',
      'Negli anni dell’architettura radicale partecipa a Cavart e Alchimia, e nel 1980 è tra i fondatori di Memphis, guidato da Ettore Sottsass. Per Memphis disegna, tra l’altro, il tavolo Crystal, il divano Lido, la lampada Oceanic e la First Chair.',
      'È stato responsabile del design Olivetti fino al 2002, dove ha sviluppato prodotti e ambienti di lavoro. Il Compasso d’Oro 2001 è per la stampante Olivetti Artjet 10.',
      'Con Giancarlo Fassina ha disegnato per Artemide la lampada Tolomeo, anch’essa premiata con il Compasso d’Oro. Nel 1990 fonda Produzione Privata, per realizzare con tecniche artigianali oggetti progettati senza committenza, e nel 1998 lo studio aMDL, oggi AMDL CIRCLE.',
      'Ha progettato edifici e allestimenti per musei come la Triennale di Milano e il Neues Museum di Berlino. Insegna allo IUAV di Venezia (dal 2001) e al Politecnico di Milano (dal 2008) ed è membro dell’Accademia Nazionale di San Luca. Nel 2022 riceve il Compasso d’Oro alla carriera.',
    ],
    videos: [
      { title: 'Intervista', text: 'Intervista esclusiva', time: '15:30 min' },
      { title: 'Intervista', text: 'Intervista esclusiva', time: '22:15 min' },
    ],
  },
  desilva: {
    name: 'Walter De Silva',
    lines: ['Walter de', 'Silva'],
    award: 'Compasso d’Oro alla carriera 2011',
    photo: 'hero-desilva',
    portrait: 'desilva',
    quote: 'Per me il design è disciplina e filosofia. La sintesi di questi elementi, in particolare nella progettazione di qualcosa che poi si inserirà nel mondo e nella società influendo sulla vita degli uomini, non può che essere di natura etica.',
    bio: [
      'Nato a Lecco il 27 febbraio 1951, inizia la carriera nel 1972 al Centro Stile Fiat di Torino. Lavora poi nello studio di Rodolfo Bonetto a Milano, dove si occupa di interni per auto, e dirige l’area di design industriale e automobilistico all’Istituto Idea di Torino.',
      'Dopo una breve esperienza da Trussardi Design, nel 1986 passa all’Alfa Romeo come responsabile del Centro Stile. Tra i suoi lavori di quegli anni ci sono le Alfa Romeo 156 (1997) e 147 (2001).',
      'Nel 1999 diventa responsabile del design SEAT, nel 2002 guida il design del gruppo Audi (Audi, SEAT, Lamborghini) e dal 2007 coordina il design di tutti i marchi del Gruppo Volkswagen. Tra le auto a cui è associato ci sono la Volkswagen up!, le Golf 6 e 7, l’Audi R8 e l’Audi A5.',
      'Lascia il Gruppo a fine 2015 e nel 2019 fonda lo studio indipendente Walter De Silva Automotive. Ha disegnato anche prodotti fuori dall’auto, come la Leica M9 Titanium e la poltrona Luft per Poltrona Frau. Nel 2011 riceve il Compasso d’Oro alla carriera.',
    ],
    videos: [
      { title: 'Intervista', text: 'Intervista esclusiva', time: '15:30 min' },
      { title: 'Intervista', text: 'Intervista esclusiva', time: '22:15 min' },
    ],
  },
  // designer senza scheda
  magistretti: { name: 'Vico Magistretti', thumb: 'thumb-magistretti' },
  piaggiodt: { name: 'Direzione Tecnica Piaggio V.E.', thumb: 'thumb-piaggio' },
  ducatidc: { name: 'Ducati Design Center', thumb: 'thumb-ducati' },
  fabbro: { name: 'Gianandrea Fabbro', thumb: 'thumb-fabbro' },
  giacosa: { name: 'Dante Giacosa' },
  zanuso: { name: 'Marco Zanuso' },
  sapper: { name: 'Richard Sapper' },
  munari: { name: 'Bruno Munari' },
  heatherwick: { name: 'Thomas Heatherwick' },
  arnio: { name: 'Eero Arnio' },
  chiola: { name: 'Giorgio Chiola, Italo Cammarata' },
  mari: { name: 'Enzo Mari' },
}

// ——— Oggetti

export const OBJECTS = {
  panda: {
    name: 'Panda',
    year: 1981,
    category: 'automobili',
    company: 'fiat',
    designers: ['giugiaro'],
    image: 'panda',
    image2: 'panda-vintage',
    story: [
      'Verso la fine degli anni ’70 la necessità di risollevare le sorti della Fiat pone il management davanti a un’intuizione geniale: creare un’utilitaria spartana e funzionale, alla francese, che si distaccasse radicalmente dalla produzione dell’epoca. La realizzazione viene affidata all’Italdesign di Giorgetto Giugiaro, che realizza un progetto all’insegna della semplicità costruttiva e di utilizzo.',
      'La Panda si rivela un grande successo di vendite sin dalla sua introduzione sul mercato nel 1980, e viene aggiornata numerose volte fino all’uscita di produzione ben ventitrè anni dopo.',
    ],
    archive: true,
    market: {
      new: false,
      used: [['Panda 30', '€3.150'], ['Panda 45', '€4.080']],
      link: 'https://www.subito.it/annunci-italia/vendita/auto/?q=fiat+panda+30',
    },
  },
  maralunga: {
    name: 'Maralunga',
    year: 1979,
    category: 'arredi',
    company: 'cassina',
    designers: ['magistretti'],
    image: 'maralunga',
    image2: 'maralunga-2',
    story: [
      'Nel 1973 Vico Magistretti immagina per Cassina il divano Maralunga, con un poggiatesta pieghevole integrato nello schienale e azionato da una comune catena da bicicletta, invisibile all’occhio. Il meccanismo, brevettato, permette di ottenere uno schienale alto o basso e rappresenta un’innovazione senza precedenti nell’ambito degli imbottiti, creando un oggetto che si trasforma a seconda delle esigenze del momento.',
      'Il divano è disponibile da due a tre posti, fino alla versione Maxi, e può essere personalizzato in tessuto o pelle. La collezione si estende a poltrona e pouf, che riprendono il concept del divano con lo stesso meccanismo regolabile.',
    ],
  },
  sity: {
    name: 'Sity',
    year: 1987,
    category: 'arredi',
    company: 'bb',
    designers: ['citterio'],
    image: 'sity',
    image2: 'sity-2',
    story: [
      'Sity è un sistema di sedute progettato da Antonio Citterio per B&B Italia nel 1986. È composto da una sezione a due posti, una angolare e una singola, che può essere usata anche come poltrona. Lo schienale non è fisso e si può togliere o spostare a piacere, mentre tre staffe uniscono i moduli tra loro. Il progetto nasce dall’impegno dell’azienda insieme al progettista per creare un prodotto tipologicamente avanzato rispetto ai nuovi modi di vivere la casa, e avvia un rinnovamento in un settore rimasto a lungo legato alla tradizione.',
      'Secondo Piero Ambrogio Busnelli, fondatore di B&B Italia, “Sity ha segnato l’inizio di un’epoca in cui le persone hanno iniziato a stendersi sul divano, perché la casa è fatta per riposare”.',
    ],
    motivation: 'La Giuria della XIV edizione ha deliberato di conferire il Premio Compasso d’oro 1987 al sistema di sedute “Sity” per il costante impegno dell’Azienda strettamente integrato con il contributo del designer ha condotto alla realizzazione di un prodotto tipologicamente avanzato in rapporto ai mutati atteggiamenti comportamentali dell’uomo nella casa. Si avvia così un processo di rinnovamento in un settore che da troppo tempo vedeva l’impegno dei designers costretto ad operare nell’ambito della sola tradizione.',
  },
  sfera: {
    name: 'Sfera',
    year: 1991,
    category: 'motocicli',
    company: 'piaggio',
    designers: ['piaggiodt'],
    makerLabel: 'Piaggio V.E.',
    image: 'sfera',
    image2: 'sfera-2',
    story: [
      'Lo scooter Piaggio Sfera è stato prodotto dal 1990 al 1998. Presentato a Monte Carlo nel 1990, affianca la Vespa con un concept nuovo: la carrozzeria è interamente in plastica, su un telaio a tubo centrale con un tubo di sterzo. Il motore è un monocilindrico raffreddato ad aria, posizionato in modo tale da portare il baricentro in basso e in avanti, garantendo una maneggevolezza ottimale.',
      'È stato il primo scooter con carrozzeria in plastica. Il progetto è della Direzione Tecnica Piaggio ed è una riproposta innovativa di un’icona del trasporto personale italiano. Dalla Sfera derivano il Piaggio Quartz e il Gilera Typhoon.',
    ],
  },
  panigale: {
    name: '1199 Panigale',
    lines: ['1199', 'Panigale'],
    year: 2014,
    category: 'motocicli',
    company: 'ducati',
    designers: ['ducatidc', 'fabbro'],
    image: 'panigale',
    image2: 'panigale-2',
    story: [
      'La Ducati 1199 Panigale è una moto sportiva da 1.198 cc presentata a Milano all’EICMA del 2011 con l’obiettivo di portare prestazioni da competizione in un modello di serie elegante, coerente con l’immagine storica del marchio. Il motore bicilindrico Superquadro è parte integrante di un telaio monoscocca in alluminio, e insieme raggiungono 195 cv con 164 kg a secco. Il nome Superquadro viene dal rapporto tra alesaggio e corsa, 120 × 60,8 mm, mai visto su una moto di serie.',
      'Era disponibile dall’inizio del 2012 nelle versioni 1199 Panigale, S e S Tricolore.',
    ],
  },
  // oggetti senza testo esteso
  fiat500: { name: '500', year: 1959, category: 'automobili', company: 'fiat', designers: ['giacosa'], image: 'fiat500' },
  brera: { name: 'Brera', year: 2005, category: 'automobili', company: 'alfaromeo', designers: ['giugiaro'], image: 'brera' },
  k1340: { name: 'K 1340', year: 1964, category: 'arredi', company: 'kartell', designers: ['zanuso', 'sapper'], image: 'k1340' },
  abitacolo: { name: 'Abitacolo', year: 1979, category: 'arredi', company: 'robots', designers: ['munari'], image: 'abitacolo' },
  spun: { name: 'Spun', year: 2014, category: 'giochi', company: 'magis', designers: ['heatherwick'], image: 'spun' },
  trioli: { name: 'Trioli', category: 'giochi', company: 'magis', designers: ['arnio'], image: 'trioli' },
  zizi: { name: 'Zizì', year: 1979, category: 'giochi', company: 'pigomma', designers: ['munari'], image: 'zizi' },
  tender: { name: 'Tender', year: 1984, category: 'motocicli', company: 'quasar', designers: ['chiola'], image: 'tender' },
  eclisse: { name: 'Eclisse', year: 1967, category: 'illuminazione', company: 'artemide', designers: ['magistretti'], image: 'eclisse-snap' },
  parentesi: { name: 'Parentesi', year: 1979, category: 'illuminazione', company: 'flos', designers: ['castiglioni'], image: 'parentesi' },
  espresso9090: { name: 'Espresso 9090', year: 1979, category: 'casa', company: 'alessi', designers: ['sapper'], image: 'espresso9090' },
  strips: { name: 'Strips', year: 1979, category: 'arredi', company: 'arflex', designers: ['boeri'], image: 'strips' },
  grillo: { name: 'Grillo', year: 1967, category: 'elettronica', company: 'italtel', designers: ['zanuso', 'sapper'], image: 'grillo-snap' },
}

// ——— Snap

export const SNAPS = [
  { id: 's1', object: 'panda', user: 'francorossi33', photo: 'panda-snap', caption: 'Un bellissimo esemplare del 1980, molto ben conservato.' },
  { id: 's2', object: 'eclisse', user: 'giancarlo.p', photo: 'eclisse-snap', caption: 'Trovata ad un mercatino, edizione originale ancora in scatola. L’ho pagata bene, ma non potevo farmela scappare.' },
  { id: 's3', object: 'maralunga', user: 'tatiana.interiord', photo: 'maralunga-snap', caption: 'A casa di mia zia, 50 anni di onorato servizio. Ha ancora il rivestimento originale.' },
  { id: 's4', object: 'grillo', user: 'francesco.mancini', photo: 'grillo-snap', caption: 'Da 25 anni nella mia collezione.', hidden: true },
]

export const INITIAL_SAVED = {
  snap: ['s1', 's2', 's4'],
  oggetti: ['panigale', 'maralunga', 'sfera', 'sity'],
  aziende: ['alessi', 'artemide', 'bb', 'fiat'],
  designer: ['boeri', 'castiglioni', 'citterio', 'delucchi', 'desilva'],
}

// ——— Хелперы

export const objectsIn = (cat) => Object.entries(OBJECTS).filter(([, o]) => o.category === cat).map(([id]) => id)
export const objectsBy = (designerId) => Object.entries(OBJECTS).filter(([, o]) => o.designers.includes(designerId)).map(([id]) => id)
export const objectsOf = (companyId) => Object.entries(OBJECTS).filter(([, o]) => o.company === companyId).map(([id]) => id)
export const designerNames = (o) => o.designers.map((d) => DESIGNERS[d].name).join(', ')
// страницы есть только у того, что нарисовано в макете (с описанием)
export const hasPage = {
  object: (id) => !!OBJECTS[id]?.story,
  designer: (id) => !!DESIGNERS[id]?.bio,
  company: (id) => !!COMPANIES[id]?.story,
}
export const YEARS = [...new Set(Object.values(OBJECTS).map((o) => o.year).filter(Boolean))].sort()
