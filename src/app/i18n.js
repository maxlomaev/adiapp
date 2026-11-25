// Переключение IT / EN. Переводы взяты из английских экранов макета (страница «app», фреймы 450:*).
// Перевод накладывается на уже отрисованный DOM: ищем элементы, чей текст целиком совпадает
// с ключом словаря (или с шаблоном ниже), и подменяем текст. Оригинал хранится, чтобы вернуть IT.

const PAIRS = [
  // ——— Каркас, навигация, туториал
  ['Nuovo snap', 'New snap'], ['La mia collezione', 'My collection'], ['Cerca', 'Search'],
  ['Salta', 'Skip'], ['Avanti', 'Next'], ['Fine', 'Done'],
  ['Cerca oggetti, progettisti e aziende della Collezione Storica Compasso d’Oro con il pulsante di ricerca in alto.', 'Find products, designers and companies in the Compasso d’Oro Historical Collection using the search button at the top.'],
  ['Fotografa un oggetto per riconoscerlo. Scopri la sua storia, il progettista e l’azienda, poi condividi il tuo scatto.', 'Take a photo of an object to identify it. Discover its story, designer and manufacturer, then share your photo.'],
  ['Scopri gli Snap condivisi dagli altri utenti. Esplora i loro scatti e lasciati ispirare dagli oggetti che hanno fotografato.', 'Discover Snaps shared by other users. Explore their photos and find inspiration in the products they have captured.'],
  ['Ritrova qui gli Snap, gli oggetti, i progettisti e le aziende che hai salvato: la tua collezione personale di design, sempre a portata di mano.', 'Find the Snaps, products, designers and companies you have saved here: your personal design collection, always at your fingertips.'],

  // ——— Esplora
  ['Il design a portata di mano.', 'Design at your fingertips.'],
  ['Riconosci subito qualsiasi oggetto della Collezione Storica Compasso d’Oro. Scopri la sua storia, chi l’ha disegnato e l’azienda che lo produce, e condividi il tuo scatto nella Snap Gallery.', 'Instantly identify any object in the Compasso d’Oro Historical Collection. Discover its story, its designer and the company behind it, then share your photo in the Snap Gallery.'],
  ['Scatta e condividi\nnuovo snap', 'Snap and share\nnew snap'],
  ['Ricerca oggetti', 'Search products'], ['Ricerca progettisti', 'Search designers'], ['Ricerca aziende', 'Search companies'],
  ['Sito ADI', 'ADI website'], ['Il museo', 'The museum'],

  // ——— Ricerca
  ['Esplora le aziende produttrici degli oggetti della Collezione Storica Compasso d’Oro.', 'Explore the companies that manufacture products in the Compasso d’Oro Historical Collection.'],
  ['Esplora i progettisti degli oggetti della Collezione Storica Compasso d’Oro.', 'Explore the designers of products in the Compasso d’Oro Historical Collection.'],
  ['Esplora la Collezione Storica Compasso d’Oro. Cerca un oggetto o combina i filtri.', 'Explore the Compasso d’Oro Historical Collection. Search for an object or combine filters.'],
  ['Oggetti', 'Products'], ['Progettisti', 'Designers'], ['Aziende', 'Companies'], ['Designer', 'Designers'],
  ['Nome dell’azienda', 'Company name'], ['Digita il nome dell’azienda…', 'Enter a company name…'],
  ['Nome o cognome del progettista', 'Designer’s first or last name'], ['Digita il nome del progettista…', 'Enter a designer’s name…'],
  ['Nome dell’oggetto', 'Object name'], ['Digita il nome del prodotto…', 'Enter a product name…'],
  ['Cerca aziende', 'Search companies'], ['Cerca progettisti', 'Search designers'], ['Cerca oggetti', 'Search products'],
  ['Suggerimenti per te', 'Suggested for you'], ['Risultati', 'Results'],
  ['Ricerca avanzata', 'Advanced search'], ['Azzera', 'Reset'],
  ['Anno', 'Year'], ['Tutti gli anni', 'All years'], ['Progettista', 'Designer'], ['Tutti i progettisti', 'All designers'],
  ['Categoria', 'Category'], ['Tutte le categorie', 'All categories'], ['Tipo di premio', 'Award type'], ['Tutti i premi', 'All awards'],
  ['Compasso d’Oro', 'Compasso d’Oro'], ['Menzione d’onore', 'Honourable mention'], ['Compasso d’Oro alla carriera', 'Compasso d’Oro Lifetime Achievement Award'],
  ['Modula la ricerca', 'Refine your search'],
  ['Puoi usare anche un solo filtro. Lascia tutti i campi liberi per esplorare l’intera collezione.', 'You can use just one filter. Leave all fields blank to explore the entire collection.'],

  // ——— Категории и списки
  ['Automobili', 'Cars'], ['Arredi e complementi casa', 'Home furniture & accessories'], ['Giochi e articoli per l’infanzia', 'Toys & children’s products'],
  ['Motocicli', 'Motorcycles'], ['Illuminazione', 'Lighting'], ['Oggetti per la casa', 'Household products'], ['Elettronica', 'Electronics'],
  ['Filtra', 'Filter'], ['Ordina', 'Sort'], ['Meno recenti', 'Oldest first'], ['Filtra per categoria', 'Filter by category'], ['Annulla', 'Cancel'],
  ['Nessun oggetto corrisponde ai filtri scelti.', 'No products match the selected filters.'], ['Collezione storica', 'Historical collection'],

  // ——— Nuovo snap
  ['Corrispondenza trovata', 'Match found'], ['Vai alla scheda', 'View details'],
  ['Condividi nella snap gallery', 'Share in the Snap Gallery'], ['Non è l’oggetto giusto? Cerca ancora', 'Not the right object? Search again'],
  ['Condividi il tuo snap', 'Share your snap'],
  ['Fai scoprire questo oggetto e la sua storia agli altri utenti ADI Snap.', 'Help other ADI Snap users discover this object and its story.'],
  ['Didascalia (opzionale)', 'Caption (optional)'], ['Aggiungi un messaggio…', 'Add a message…'],

  // ——— Snap gallery, collezione
  ['Guarda gli Snap condivisi dagli altri utenti.', 'See Snaps shared by other users.'],
  ['Salva nella mia collezione', 'Save to my collection'], ['Salvato nella collezione', 'Saved to collection'],
  ['Un bellissimo esemplare del 1980, molto ben conservato.', 'A beautiful 1980 example, very well preserved.'],
  ['Trovata ad un mercatino, edizione originale ancora in scatola. L’ho pagata bene, ma non potevo farmela scappare.', 'Found at a flea market, an original edition still in its box. I paid a fair amount, but I couldn’t let it go.'],
  ['A casa di mia zia, 50 anni di onorato servizio. Ha ancora il rivestimento originale.', 'At my aunt’s house, 50 years of faithful service. It still has its original upholstery.'],
  ['Da 25 anni nella mia collezione.', 'In my collection for 25 years.'],
  ['Direzione Tecnica Piaggio V.E.', 'Piaggio V.E. Technical Department'],

  // ——— Scheda oggetto
  ['Storia', 'History'], ['Produttore', 'Manufacturer'], ['Materiale d’archivio', 'Archive material'],
  ['Informazioni sull’edizione e documenti originali.', 'Edition information and original documents.'], ['Esplora', 'Explore'],
  ['Guida all’acquisto', 'Buying guide'], ['Analisi aggiornata del mercato.', 'Up-to-date market analysis.'],
  ['Vedi valore di mercato', 'View market value'], ['Vedi tutti', 'View all'], ['Motivazione del premio', 'Award citation'],

  ['Verso la fine degli anni ’70 la necessità di risollevare le sorti della Fiat pone il management davanti a un’intuizione geniale: creare un’utilitaria spartana e funzionale, alla francese, che si distaccasse radicalmente dalla produzione dell’epoca.', 'In the late 1970s, the need to revive Fiat’s fortunes led its management to a brilliant idea: a simple, functional small car in the French tradition, radically different from the cars of the time.'],
  ['La realizzazione viene affidata all’Italdesign di Giorgetto Giugiaro, che realizza un progetto all’insegna della semplicità costruttiva e di utilizzo.', 'The project was entrusted to Giorgetto Giugiaro’s Italdesign, which developed a car focused on ease of construction and use.'],
  ['La Panda si rivela un grande successo di vendite sin dalla sua introduzione sul mercato nel 1980, e viene aggiornata numerose volte fino all’uscita di produzione ben ventitrè anni dopo.', 'The Panda was a major sales success from its launch in 1980 and was updated many times before production ended twenty-three years later.'],
  ['Lo scooter Piaggio Sfera è stato prodotto dal 1990 al 1998. Presentato a Monte Carlo nel 1990, affianca la Vespa con un concept nuovo: la carrozzeria è interamente in plastica, su un telaio a tubo centrale con un tubo di sterzo.', 'The Piaggio Sfera scooter was produced from 1990 to 1998. Unveiled in Monte Carlo in 1990, it joined the Vespa with a new concept: all-plastic bodywork on a central tubular frame with a steering tube.'],
  ['Il motore è un monocilindrico raffreddato ad aria, posizionato in modo tale da portare il baricentro in basso e in avanti, garantendo una maneggevolezza ottimale.', 'Its air-cooled single-cylinder engine was positioned to keep the centre of gravity low and forward, ensuring excellent handling.'],
  ['È stato il primo scooter con carrozzeria in plastica. Il progetto è della Direzione Tecnica Piaggio ed è una riproposta innovativa di un’icona del trasporto personale italiano. Dalla Sfera derivano il Piaggio Quartz e il Gilera Typhoon.', 'It was the first scooter with plastic bodywork. Designed by Piaggio’s Technical Department, it was an innovative reinterpretation of an icon of Italian personal transport. The Piaggio Quartz and Gilera Typhoon were derived from the Sfera.'],
  ['Sity è un sistema di sedute progettato da Antonio Citterio per B&B Italia nel 1986. È composto da una sezione a due posti, una angolare e una singola, che può essere usata anche come poltrona.', 'Sity is a seating system designed by Antonio Citterio for B&B Italia in 1986. It consists of a two-seat section, a corner section and a single unit that can also be used as an armchair.'],
  ['Lo schienale non è fisso e si può togliere o spostare a piacere, mentre tre staffe uniscono i moduli tra loro. Il progetto nasce dall’impegno dell’azienda insieme al progettista per creare un prodotto tipologicamente avanzato rispetto ai nuovi modi di vivere la casa, e avvia un rinnovamento in un settore rimasto a lungo legato alla tradizione.', 'The backrest is not fixed and can be removed or repositioned, while three brackets connect the modules. The company and designer worked together to create a product suited to new ways of living at home, initiating renewal in a sector long bound by tradition.'],
  ['Secondo Piero Ambrogio Busnelli, fondatore di B&B Italia, “Sity ha segnato l’inizio di un’epoca in cui le persone hanno iniziato a stendersi sul divano, perché la casa è fatta per riposare”.', 'According to B&B Italia founder Piero Ambrogio Busnelli, “Sity marked the beginning of an era when people started stretching out on the sofa, because home is a place to rest.”'],
  ['“La Giuria della XIV edizione ha deliberato di conferire il Premio Compasso d’oro 1987 al sistema di sedute “Sity” per il costante impegno dell’Azienda strettamente integrato con il contributo del designer ha condotto alla realizzazione di un prodotto tipologicamente avanzato in rapporto ai mutati atteggiamenti comportamentali dell’uomo nella casa. Si avvia così un processo di rinnovamento in un settore che da troppo tempo vedeva l’impegno dei designers costretto ad operare nell’ambito della sola tradizione.”', '“The jury of the 14th edition resolved to award the 1987 Compasso d’Oro to the Sity seating system. The company’s sustained commitment, closely integrated with the designer’s contribution, has produced a typologically advanced product responding to changing patterns of behaviour in the home. It thus begins a process of renewal in a sector where designers had long been confined to working within tradition alone.”'],
  ['Nel 1973 Vico Magistretti immagina per Cassina il divano Maralunga, con un poggiatesta pieghevole integrato nello schienale e azionato da una comune catena da bicicletta, invisibile all’occhio.', 'In 1973, Vico Magistretti conceived the Maralunga sofa for Cassina, with a folding headrest built into the backrest and operated by an ordinary bicycle chain, hidden from view.'],
  ['Il meccanismo, brevettato, permette di ottenere uno schienale alto o basso e rappresenta un’innovazione senza precedenti nell’ambito degli imbottiti, creando un oggetto che si trasforma a seconda delle esigenze del momento.', 'The patented mechanism allows the backrest to be raised or lowered: an unprecedented innovation in upholstered furniture, creating an object that transforms to suit the needs of the moment.'],
  ['Il divano è disponibile da due a tre posti, fino alla versione Maxi, e può essere personalizzato in tessuto o pelle. La collezione si estende a poltrona e pouf, che riprendono il concept del divano con lo stesso meccanismo regolabile.', 'The sofa comes in two- and three-seat versions, as well as a Maxi model, with fabric or leather upholstery. The collection also includes an armchair and an ottoman, extending the sofa concept with the same adjustable mechanism.'],
  ['La Ducati 1199 Panigale è una moto sportiva da 1.198 cc presentata a Milano all’EICMA del 2011 con l’obbiettivo di portare prestazioni da competizione in un modello di serie elegante, coerente con l’immagine storica del marchio.', 'The Ducati 1199 Panigale is a 1,198 cc sports motorcycle unveiled at EICMA in Milan in 2011. It aimed to bring racing performance to an elegant production model consistent with the brand’s heritage.'],
  ['Il motore bicilindrico Superquadro è parte integrante di un telaio monoscocca in alluminio, e insieme raggiungono 195 cv con 164 kg a secco. Il nome Superquadro viene dal rapporto tra alesaggio e corsa, 120 x 60,8 mm, mai visto su una moto di serie.', 'The Superquadro twin-cylinder engine is an integral part of an aluminium monocoque chassis, delivering 195 hp at a dry weight of 164 kg. The name Superquadro refers to its bore and stroke of 120 × 60.8 mm, unprecedented on a production motorcycle.'],
  ['Era disponibile dall’inizio del 2012 nelle versioni 1199 Panigale, S e S Tricolore.', 'It was available from early 2012 in 1199 Panigale, S and S Tricolore versions.'],

  // ——— Designer
  ['Biografia', 'Biography'], ['Interviste', 'Interviews'],
  ['“Non è l’uomo che si deve adattare alla vettura, ma la macchina. Tenendo ovviamente conto dei problemi tecnici, economici e commerciali, penso sia soprattutto importante considerare i movimenti strutturali dell’uomo: salire, scendere, sedersi.”', '“It is not the person who should adapt to the car, but the car to the person. While taking technical, economic and commercial issues into account, I believe it is especially important to consider human movements: getting in, getting out, sitting down.”'],
  ['Nato a Garessio nel 1938, Giorgetto Giugiaro è universalmente riconosciuto come uno dei più grandi designer automobilistici di tutti i tempi. La sua carriera inizia giovanissimo presso Bertone, dove lavora su progetti iconici come l’Alfa Romeo Giulia GT.', 'Born in Garessio in 1938, Giorgetto Giugiaro is widely recognised as one of the greatest automotive designers of all time. He began his career at a very young age at Bertone, working on iconic projects such as the Alfa Romeo Giulia GT.'],
  ['Nel 1965 si trasferisce alla Ghia, dove progetta la De Tomaso Mangusta e la Maserati Ghibli. Ma è nel 1968 che fonda la sua casa di design, Italdesign Giugiaro, che diventerà una delle più influenti al mondo nel settore automotive.', 'In 1965 he moved to Ghia, where he designed the De Tomaso Mangusta and Maserati Ghibli. In 1968 he founded his own design firm, Italdesign Giugiaro, which would become one of the most influential in the automotive world.'],
  ['Tra i suoi progetti più celebri si annoverano la Volkswagen Golf (1974), la Fiat Panda (1980), la Lancia Delta (1979) e la DeLorean DMC-12. Nel 1984 ha ricevuto il Compasso d’Oro alla Carriera. Oltre alle automobili, ha spaziato in numerosi campi del design industriale: fotocamere Nikon, armi Beretta, moto Ducati, e persino un nuovo tipo di pasta per Barilla.', 'His best-known projects include the Volkswagen Golf (1974), Fiat Panda (1980), Lancia Delta (1979) and DeLorean DMC-12. In 1984 he received the Compasso d’Oro Lifetime Achievement Award. Beyond cars, he has worked across industrial design: Nikon cameras, Beretta firearms, Ducati motorcycles and even a new pasta shape for Barilla.'],
  ['Nel 1999 viene nominato “Car Designer of the Century” dal Global Automotive Elections Foundation, riconoscimento che corona una carriera straordinaria dedicata all’innovazione nel design automobilistico.', 'In 1999 the Global Automotive Elections Foundation named him “Car Designer of the Century”, crowning an extraordinary career devoted to innovation in automotive design.'],
  ['Il design della Panda', 'Designing the Panda'], ['Intervista esclusiva sul processo creativo dietro la Fiat Panda', 'An exclusive interview on the creative process behind the Fiat Panda'],
  ['Come cambia l’auto italiana', 'The changing face of Italian cars'], ['L’influenza di Giugiaro sulla produzione di massa dell’auto italiana', 'Giugiaro’s influence on Italian mass-market car production'],
  ['“L’esperienza non dà certezza né sicurezza, ma anzi aumenta la possibilità di errore. Direi che è meglio ricominciare ogni volta da capo con umiltà perché l’esperienza non rischi di tramutarsi in furbizia.”', '“Experience brings neither certainty nor security; rather, it increases the possibility of error. I would say it is better to start afresh each time with humility, so that experience does not risk turning into cleverness.”'],
  ['Nato a Milano il 16 febbraio 1918, è figlio dello scultore Giannino Castiglioni, il cui approccio plastico ha influenzato il suo modo di fare design. Dal 1940 sperimenta prodotti industriali con i fratelli Livio e Pier Giacomo.', 'Born in Milan on 16 February 1918, he was the son of sculptor Giannino Castiglioni, whose sculptural approach influenced his design work. From 1940 he experimented with industrial products alongside his brothers Livio and Pier Giacomo.'],
  ['Si laurea in architettura al Politecnico di Milano nel 1944 e collabora con Livio fino al 1952 e con Pier Giacomo fino alla morte di quest’ultimo, nel 1968. Da allora guida lo studio da solo fino al 2002.', 'He graduated in architecture from the Politecnico di Milano in 1944, working with Livio until 1952 and with Pier Giacomo until his death in 1968. He then led the studio alone until 2002.'],
  ['Tra i fondatori dell’ADI (1956), insegna Disegno industriale al Politecnico di Milano fino al 1993. Il suo lavoro unisce semplicità, ironia e attenzione al modo in cui gli oggetti vengono usati, alla tecnologia e ai nuovi materiali.', 'A founding member of ADI (1956), he taught industrial design at the Politecnico di Milano until 1993. His work combined simplicity, humour and attention to how products are used, technology and new materials.'],
  ['Ha disegnato per Flos, Zanotta, Alessi (le posate Dry sono il primo servizio di posate dell’azienda) e De Padova.', 'He designed for Flos, Zanotta, Alessi (the Dry cutlery was the company’s first cutlery range) and De Padova.'],
  ['Ha vinto nove Compassi d’Oro, tra cui la lampada Luminator (1955), la sedia T12 (1960), la macchina per il caffè Pitagora (1962) e la lampada Parentesi (1979), più una menzione speciale nel 1989. Quattordici sue opere sono al MoMA di New York. Muore a Milano il 2 dicembre 2002.', 'He won nine Compasso d’Oro awards, including for the Luminator lamp (1955), T12 chair (1960), Pitagora coffee machine (1962) and Parentesi lamp (1979), plus a special mention in 1989. Fourteen of his works are at New York’s MoMA. He died in Milan on 2 December 2002.'],
  ['Intervista (Designboom)', 'Interview (Designboom)'], ['Video intervista inedita', 'Previously unseen video interview'],
  ['Intervista (RaiPlay — 2000)', 'Interview (RaiPlay – 2000)'], ['Art Night rielabora le immagini di un’intervista del 2000.', 'Art Night revisits footage from a 2000 interview.'],
  ['“Mi hanno sempre interessato le persone e i loro comportamenti. Sono una grande osservatrice, quando progetto mi piace entrare in sintonia con i committenti e comprendere le loro necessità e desideri per cercare di fornirgli la migliore soluzione possibile.”', '“I have always been interested in people and their behaviour. I am a keen observer; when I design, I like to connect with clients and understand their needs and wishes, to try to give them the best possible solution.”'],
  ['Maria Cristina Mariani Dameno, detta Cini Boeri, nasce a Milano il 19 giugno 1924 e si laurea in architettura al Politecnico di Milano nel 1951.', 'Maria Cristina Mariani Dameno, known as Cini Boeri, was born in Milan on 19 June 1924 and graduated in architecture from the Politecnico di Milano in 1951.'],
  ['Dopo un breve periodo nello studio di Giò Ponti lavora per molti anni con Marco Zanuso, e nel 1963 apre il proprio studio, dedicandosi ad architettura civile e design industriale. Nel design si concentra su elementi d’arredo e componenti per l’edilizia, e nel suo pensiero ha un ruolo centrale il rapporto psicologico tra le persone e lo spazio in cui vivono. Collabora con aziende come Arflex, Arteluce, Knoll, Fiam e Poltrona Frau.', 'After a short time at Giò Ponti’s studio, she worked for many years with Marco Zanuso. In 1963 she opened her own practice, focusing on architecture and industrial design. Her design work centred on furniture and building components, with the psychological relationship between people and their living spaces at its core. She worked with Arflex, Arteluce, Knoll, Fiam and Poltrona Frau.'],
  ['Tra i suoi progetti ci sono la poltrona Bobo (1967), la prima seduta realizzata interamente in schiuma, il divano Serpentone (1971), venduto al metro, il sistema modulare Strips (1972), premiato con il Compasso d’Oro nel 1979, e la sedia Ghost (1987, con Tomu Katayanagi).', 'Her projects include the Bobo armchair (1967), the first seat made entirely of foam; the Serpentone sofa (1971), sold by the metre; the Strips modular system (1972), awarded the Compasso d’Oro in 1979; and the Ghost chair (1987, with Tomu Katayanagi).'],
  ['Ha progettato anche case, uffici, negozi e allestimenti museali, e ha insegnato in Italia e all’estero. Le sono stati assegnati il Compasso d’Oro alla carriera (2011), la nomina a Grande Ufficiale dell’Ordine al Merito della Repubblica Italiana (2011) e l’Ambrogino d’oro (2019). Muore a Milano il 9 settembre 2020, a 96 anni.', 'She also designed homes, offices, shops and museum displays, and taught in Italy and abroad. Her honours include the Compasso d’Oro Lifetime Achievement Award (2011), Grand Officer of the Order of Merit of the Italian Republic (2011) and the Ambrogino d’Oro (2019). She died in Milan on 9 September 2020, aged 96.'],
  ['Intervista (1977)', 'Interview (1977)'], ['Intervista esclusiva', 'Exclusive interview'], ['Intervista (Domus)', 'Interview (Domus)'],
  ['Intervista inedita', 'Previously unseen interview'], ['Intervista', 'Interview'],
  ['“Quando penso al design e a quello che oggi rappresenta, mi viene in mente il concetto di una nuova modernità che potremmo riassumere, in estrema sintesi, come ‘lasciare un’eredità’.”', '“When I think about design and what it represents today, I think of a new modernity that we could sum up, very simply, as ‘leaving a legacy’.”'],
  ['Nato a Meda nel 1950, apre il proprio studio nel 1972 e si laurea in architettura al Politecnico di Milano nel 1975. Dal 1987 al 1996 collabora con Terry Dwan a edifici in Europa e in Giappone.', 'Born in Meda in 1950, he opened his own studio in 1972 and graduated in architecture from the Politecnico di Milano in 1975. From 1987 to 1996 he worked with Terry Dwan on buildings in Europe and Japan.'],
  ['Nel design industriale lavora per aziende come B&B Italia, Kartell, Vitra, Flexform, Flos, Hermès, Iittala e Technogym. Dal 1993 è Head of Design di Maxalto, marchio del gruppo B&B Italia.', 'In industrial design, he works with companies including B&B Italia, Kartell, Vitra, Flexform, Flos, Hermès, Iittala and Technogym. Since 1993 he has been Head of Design at Maxalto, part of the B&B Italia group.'],
  ['Tra i suoi progetti più noti ci sono il divano Sity (1986) per B&B Italia, il tavolo Battista, il carrello Oxo e il sistema Mobil (1993) per Kartell, e la T-Chair (1996) per Vitra.', 'His best-known projects include the Sity sofa (1986) for B&B Italia, the Battista table, Oxo trolley and Mobil system (1993) for Kartell, and the T-Chair (1996) for Vitra.'],
  ['Nel 2000 fonda con Patricia Viel uno studio di architettura, interni e grafica, oggi Antonio Citterio Patricia Viel. Dal 2006 al 2016 è professore di architettura all’Università della Svizzera italiana a Mendrisio. Nel 2008 la Royal Society for the Encouragement of Arts, Manufactures & Commerce di Londra lo nomina Royal Designer for Industry.', 'In 2000 he founded an architecture, interiors and graphic design practice with Patricia Viel, now Antonio Citterio Patricia Viel. From 2006 to 2016 he was professor of architecture at the Università della Svizzera italiana in Mendrisio. In 2008 London’s Royal Society for the Encouragement of Arts, Manufactures & Commerce named him Royal Designer for Industry.'],
  ['“Noi siamo tutti progettisti. Siamo impegnati ad immaginarci una vita dell’uomo migliore su questo pianeta. […] Noi designer non la possiamo migliorare se non abbiamo dei clienti. Noi stessi siamo clienti e progettisti. Dobbiamo vivere con loro e sono al contempo orribili e meravigliosi.”', '“We are all designers. We are committed to imagining a better human life on this planet. […] As designers, we cannot improve it without clients. We ourselves are both clients and designers. We must live with them, and they are at once terrible and wonderful.”'],
  ['Nato a Ferrara nel 1951, studia architettura a Padova e a Firenze, dove si laurea nel 1975.', 'Born in Ferrara in 1951, he studied architecture in Padua and Florence, graduating in 1975.'],
  ['Negli anni dell’architettura radicale partecipa a Cavart e Alchimia, e nel 1980 è tra i fondatori di Memphis, guidato da Ettore Sottsass. Per Memphis disegna, tra l’altro, il tavolo Crystal, il divano Lido, la lampada Oceanic e la First Chair.', 'During the years of radical architecture, he joined Cavart and Alchimia. In 1980 he was a founding member of Memphis, led by Ettore Sottsass. His Memphis designs include the Crystal table, Lido sofa, Oceanic lamp and First Chair.'],
  ['È stato responsabile del design Olivetti fino al 2002, dove ha sviluppato prodotti e ambienti di lavoro. Il Compasso d’Oro 2001 è per la stampante Olivetti Artjet 10.', 'He was head of design at Olivetti until 2002, developing products and workspaces. The 2001 Compasso d’Oro recognised his Olivetti Artjet 10 printer.'],
  ['Con Giancarlo Fassina ha disegnato per Artemide la lampada Tolomeo, anch’essa premiata con il Compasso d’Oro. Nel 1990 fonda Produzione Privata, per realizzare con tecniche artigianali oggetti progettati senza committenza, e nel 1998 lo studio aMDL, oggi AMDL CIRCLE.', 'With Giancarlo Fassina he designed Artemide’s Tolomeo lamp, also a Compasso d’Oro winner. In 1990 he founded Produzione Privata to make self-initiated products using craft techniques, and in 1998 established aMDL, now AMDL CIRCLE.'],
  ['Ha progettato edifici e allestimenti per musei come la Triennale di Milano e il Neues Museum di Berlino. Insegna allo IUAV di Venezia (dal 2001) e al Politecnico di Milano (dal 2008) ed è membro dell’Accademia Nazionale di San Luca. Nel 2022 riceve il Compasso d’Oro alla carriera.', 'He has designed buildings and exhibitions for museums including the Triennale di Milano and Berlin’s Neues Museum. He has taught at IUAV in Venice since 2001 and the Politecnico di Milano since 2008, and is a member of the Accademia Nazionale di San Luca. In 2022 he received the Compasso d’Oro Lifetime Achievement Award.'],
  ['Compasso d’Oro alla carriera 2011', 'Compasso d’Oro Lifetime Achievement Award 2011'],
  ['“Per me il design è disciplina e filosofia. La sintesi di questi elementi, in particolare nella progettazione di qualcosa che poi si inserirà nel mondo e nella società influendo sulla vita degli uomini, non può che essere di natura etica.”', '“For me, design is discipline and philosophy. The synthesis of these elements, especially when designing something that will enter the world and society and affect people’s lives, can only be ethical in nature.”'],
  ['Nato a Lecco il 27 febbraio 1951, inizia la carriera nel 1972 al Centro Stile Fiat di Torino. Lavora poi nello studio di Rodolfo Bonetto a Milano, dove si occupa di interni per auto, e dirige l’area di design industriale e automobilistico all’Istituto Idea di Torino.', 'Born in Lecco on 27 February 1951, he began his career in 1972 at Fiat’s Centro Stile in Turin. He then worked at Rodolfo Bonetto’s Milan studio on car interiors and led industrial and automotive design at Turin’s Istituto Idea.'],
  ['Dopo una breve esperienza da Trussardi Design, nel 1986 passa all’Alfa Romeo come responsabile del Centro Stile. Tra i suoi lavori di quegli anni ci sono le Alfa Romeo 156 (1997) e 147 (2001).', 'After a short period at Trussardi Design, he joined Alfa Romeo in 1986 as head of Centro Stile. His work there included the Alfa Romeo 156 (1997) and 147 (2001).'],
  ['Nel 1999 diventa responsabile del design SEAT, nel 2002 guida il design del gruppo Audi (Audi, SEAT, Lamborghini) e dal 2007 coordina il design di tutti i marchi del Gruppo Volkswagen. Tra le auto a cui è associato ci sono la Volkswagen up!, le Golf 6 e 7, l’Audi R8 e l’Audi A5.', 'In 1999 he became head of SEAT design, in 2002 he led design for the Audi group (Audi, SEAT, Lamborghini), and from 2007 he coordinated design across all Volkswagen Group brands. Cars associated with him include the Volkswagen up!, Golf 6 and 7, Audi R8 and Audi A5.'],
  ['Lascia il Gruppo a fine 2015 e nel 2019 fonda lo studio indipendente Walter De Silva Automotive. Ha disegnato anche prodotti fuori dall’auto, come la Leica M9 Titanium e la poltrona Luft per Poltrona Frau. Nel 2011 riceve il Compasso d’Oro alla carriera.', 'He left the Group at the end of 2015 and founded independent studio Walter De Silva Automotive in 2019. He has also designed products beyond cars, including the Leica M9 Titanium and Luft armchair for Poltrona Frau. In 2011 he received the Compasso d’Oro Lifetime Achievement Award.'],

  // ——— Aziende
  ['Oggetti nella\ncollezione storica\nCompasso d’Oro', 'Products in the\nCompasso d’Oro\nHistorical Collection'],
  ['FIAT (Fabbrica Italiana Automobili Torino), fondata nel 1899, è sinonimo di motorizzazione di massa italiana.', 'FIAT (Fabbrica Italiana Automobili Torino), founded in 1899, is synonymous with mass motoring in Italy.'],
  ['Dopo la guerra arrivano i modelli del boom economico: la 600 nel 1955 e la Nuova 500 nel 1957, auto che grazie alla progettazione intelligente e al prezzo accessibile hanno motorizzato l’Italia.', 'After the war came the cars of the economic boom: the 600 in 1955 and Nuova 500 in 1957. With intelligent design and affordable prices, they put Italy on wheels.'],
  ['Nel secondo Novecento, Fiat diventa sinonimo di innovazione specie nel settore delle automobili compatte: dalla 128 alla Tipo, dalla Uno alla Punto, passando per l’iconica Panda, che rivoluziona il concetto di utilitaria con semplicità e versatilità.', 'In the second half of the 20th century, Fiat became a byword for innovation, especially in compact cars: from the 128 to the Tipo, the Uno to the Punto, and the iconic Panda, which redefined the small car through simplicity and versatility.'],
  ['Dal 2007 torna la 500 in un design che rievoca l’iconico modello, oggi disponibile anche in versione elettrica. Dopo la fusione con Chrysler nel 2011 in FCA, dal 2021 è parte di Stellantis.', 'The 500 returned in 2007 with a design recalling the original icon, now also available as an electric model. Following its merger with Chrysler into FCA in 2011, Fiat became part of Stellantis in 2021.'],
  ['Alessi nasce a Omegna, sul Lago d’Orta, nel 1921, quando Giovanni Alessi fonda con il fratello l’officina Fratelli Alessi Omegna, specializzata in oggetti di rame, ottone e alpacca.', 'Alessi began in Omegna on Lake Orta in 1921, when Giovanni Alessi and his brother founded the Fratelli Alessi Omegna workshop, specialising in copper, brass and nickel silver products.'],
  ['Nel 1932 entra in azienda il figlio Carlo, che tra il 1935 e il 1945 disegna la maggior parte dei prodotti. Dopo la guerra l’attività diventa industriale, e negli anni Cinquanta passa all’acciaio inossidabile, specializzandosi in oggetti per uso professionale.', 'His son Carlo joined in 1932 and designed most of its products between 1935 and 1945. After the war, production became industrial. In the 1950s it moved to stainless steel, specialising in professional-use products.'],
  ['Nel 1970 entra Alberto Alessi, nipote del fondatore, e con le collaborazioni di Sottsass, Sapper, Castiglioni e Mendini l’azienda diventa una “fabbrica del design”, specializzata in oggetti per la casa che sono diventati vere e proprie icone. Tra i prodotti entrati nella storia ci sono il bollitore 9091 di Sapper (1983) e lo spremiagrumi Juicy Salif di Starck (1990).', 'Alberto Alessi, the founder’s grandson, joined in 1970. Through collaborations with Sottsass, Sapper, Castiglioni and Mendini, the company became a “design factory”, creating household products that became true icons. Historic products include Sapper’s 9091 kettle (1983) and Starck’s Juicy Salif citrus squeezer (1990).'],
  ['Nel 1998 nasce il Museo Alessi, e Alberto Alessi è oggi presidente.', 'The Museo Alessi opened in 1998, and Alberto Alessi is now president.'],
  ['Artemide viene fondata a Milano nel 1960 da Ernesto Gismondi e Sergio Mazza, e la sua prima lampada è Alfa, disegnata da Mazza nel 1959. La sede è a Pregnana Milanese.', 'Artemide was founded in Milan in 1960 by Ernesto Gismondi and Sergio Mazza. Its first lamp was Alfa, designed by Mazza in 1959. Its headquarters are in Pregnana Milanese.'],
  ['Dopo una breve fase di arredi in plastica, esaurita per i costi di produzione e la crisi petrolifera degli anni Settanta, l’azienda si concentra sull’illuminazione. Tra i suoi prodotti più noti ci sono la lampada Eclisse di Vico Magistretti (Compasso d’Oro 1967), la Tizio di Richard Sapper (1972) e la Tolomeo di Michele De Lucchi e Giancarlo Fassina, lanciata nel 1987 e premiata con il Compasso d’Oro nel 1989.', 'After a brief venture into plastic furniture, ended by production costs and the 1970s oil crisis, the company focused on lighting. Its best-known products include Vico Magistretti’s Eclisse (Compasso d’Oro 1967), Richard Sapper’s Tizio (1972) and Michele De Lucchi and Giancarlo Fassina’s Tolomeo, launched in 1987 and awarded the Compasso d’Oro in 1989.'],
  ['Artemide ha ricevuto anche il Compasso d’Oro alla carriera. Oggi collabora con progettisti internazionali come Herzog & de Meuron, Naoto Fukasawa e Zaha Hadid, con una crescente attenzione alla sostenibilità.', 'Artemide has also received a Compasso d’Oro Lifetime Achievement Award. Today it works with international designers such as Herzog & de Meuron, Naoto Fukasawa and Zaha Hadid, with a growing focus on sustainability.'],
  ['B&B Italia nasce nel 1966 come C&B Italia, fondata da Piero Ambrogio Busnelli con Cesare Cassina. Dopo la separazione da Cassina, Busnelli guida l’azienda e nel 1973 ne cambia il nome in B&B Italia.', 'B&B Italia was founded in 1966 as C&B Italia by Piero Ambrogio Busnelli and Cesare Cassina. After parting with Cassina, Busnelli led the company and renamed it B&B Italia in 1973.'],
  ['La sede è a Novedrate, in provincia di Como, in un edificio progettato da Renzo Piano e Richard Rogers. Hanno lavorato per l’azienda, tra gli altri, Mario Bellini, Gaetano Pesce, Patricia Urquiola e Zaha Hadid.', 'Its headquarters are in Novedrate, near Como, in a building designed by Renzo Piano and Richard Rogers. Designers who have worked with the company include Mario Bellini, Gaetano Pesce, Patricia Urquiola and Zaha Hadid.'],
  ['Ha vinto quattro Compassi d’Oro: nel 1979 per Le Bambole di Bellini, nel 1984 per Sisamo dello Studio Kairos, nel 1987 per Sity di Antonio Citterio e nel 1989, il primo assegnato direttamente a un’azienda produttrice.', 'It has won four Compasso d’Oro awards: in 1979 for Bellini’s Le Bambole, in 1984 for Studio Kairos’s Sisamo, in 1987 for Antonio Citterio’s Sity and in 1989, the first awarded directly to a manufacturing company.'],
  ['Dal 1966 ha prodotto oltre mille progetti, compresi i prototipi, e nel 2011 la famiglia Busnelli ha riacquistato la maggioranza dell’azienda.', 'Since 1966 it has produced over a thousand designs, including prototypes. In 2011 the Busnelli family bought back a majority stake in the company.'],

  // ——— Archivio, guida
  ['Materiale\nd’archivio', 'Archive\nmaterial'], ['Premiazione', 'Award ceremony'], ['17 settembre 1981', '17 September 1981'], ['Mostra', 'Exhibition'],
  ['Altri premiati del 1981', 'Other 1981 award winners'], ['Categorie di materiale', 'Material categories'],
  ['Fotografie', 'Photographs'], ['Immagini storiche del processo di progettazione e pubblicitarie', 'Historic images of the design process and advertising'],
  ['Documenti', 'Documents'], ['Briefing, relazioni tecniche, corrispondenze e prove su strada', 'Briefs, technical reports, correspondence and road tests'],
  ['Filmati', 'Films'], ['Pubblicità e materiale informativo dell’epoca', 'Period advertising and informational material'],
  ['HORO è il portale digitale dedicato alla conservazione e valorizzazione del patrimonio documentale del Premio Compasso d’Oro e dell’ADI.', 'HORO is the digital portal dedicated to preserving and showcasing the documentary heritage of the Compasso d’Oro Award and ADI.'],
  ['Visita Horo', 'Visit Horo'], ['Centro Storico Fiat', 'Centro Storico Fiat'], ['Archivio del produttore', 'Manufacturer’s archive'],
  ['Visita il centro storico', 'Visit the historical centre'],
  ['Guida\nall’acquisto', 'Buying\nguide'], ['Acquista nuova', 'Buy new'], ['Non più in produzione', 'No longer in production'], ['In produzione', 'In production'],
  ['Mercato dell’usato', 'Second-hand market'], ['Prezzo medio', 'Average price'], ['Vai a Subito.it', 'Visit Subito.it'],
  ['€3.150', '€3,150'], ['€4.080', '€4,080'],
  ['Dati di mercato non ancora disponibili per questo oggetto.', 'Market data is not yet available for this object.'],

  // ——— Сообщения
  ['Salvato nella mia collezione', 'Saved to my collection'], ['Rimosso dalla collezione', 'Removed from collection'],
  ['Snap condiviso nella Snap Gallery', 'Snap shared in the Snap Gallery'], ['Disponibile nel prototipo solo per la Panda', 'Available in the prototype for the Panda only'],
  ['Video non disponibile nel prototipo', 'Video not available in the prototype'], ['Pagina 2 non inclusa nel prototipo', 'Page 2 is not included in the prototype'],
  ['Nessun risultato', 'No results'], ['Digita il nome del progettista', 'Enter the designer’s name'], ['Digita il nome dell’azienda', 'Enter the company name'],
]

const trOr = (x) => tr(x) ?? x

const RULES = [
  [/^Torna a (.+)$/i, (m) => `Back to ${trOr(m[1])}`],
  [/^Tutorial · (\d) di (\d)$/i, (m) => `Tutorial · ${m[1]} of ${m[2]}`],
  [/^Snap di (.+)$/i, (m) => `Snap by ${m[1]}`],
  [/^Altri oggetti nella categoria (.+)$/i, (m) => `More products in the ${trOr(m[1])} category`],
  [/^Oggetti di (.+) nella collezione$/i, (m) => `${m[1]}’s products in the collection`],
  [/^Oggetti (.+)\nnella collezione$/i, (m) => `${m[1]} products\nin the collection`],
  [/^Oggetti di (.+)$/i, (m) => `${m[1]}’s products`],
  [/^Oggetti (.+)$/i, (m) => `${m[1]} products`],
  [/^Visita il sito (.+)$/i, (m) => `Visit the ${m[1]} website`],
  [/^Trovati (\d+) oggetti premiati$/i, (m) => `${m[1]} awarded products found`],
  [/^(\d+) elementi salvati$/i, (m) => `${m[1]} saved items`],
  [/^(\d+) elementi$/i, (m) => `${m[1]} items`],
  [/^Menzione d’onore (\d{4})$/i, (m) => `Honourable mention ${m[1]}`],
  [/^Compasso d’Oro alla carriera (\d{4})$/i, (m) => `Compasso d’Oro Lifetime Achievement Award ${m[1]}`],
  [/^Nessun risultato per “(.+)”\.$/i, (m) => `No results for “${m[1]}”.`],
  [/^Scheda di (.+) non inclusa nel prototipo$/i, (m) => `${m[1]}’s page is not included in the prototype`],
  [/^(.+): (\d+) elementi \(non inclusi nel prototipo\)$/i, (m) => `${trOr(m[1])}: ${m[2]} items (not included in the prototype)`],
  [/^Risultati$/i, () => 'Results'],
]

const norm = (s) => s
  .normalize('NFC')
  .replace(/[‘’'`]/g, '’')
  .replace(/[“”"]/g, '"')
  .replace(/…/g, '...')
  .replace(/[ \t ]+/g, ' ')
  .replace(/ *\n */g, '\n')
  .trim()
  .toLowerCase()

const DICT = new Map(PAIRS.map(([it, en]) => [norm(it), en]))

// Перевод одной строки (с сохранением регистра, если исходник набран капсом)
export function tr(s) {
  const key = norm(s)
  let out = DICT.get(key) ?? DICT.get(key.replace(/\n/g, ' '))
  if (out === undefined) {
    const flat = s.trim()
    for (const [re, fn] of RULES) {
      const m = flat.match(re)
      if (m) { out = fn(m); break }
    }
  }
  if (out === undefined) {
    const q = s.trim().match(/^[“"](.+)[”"]$/s)
    if (q) { const inner = tr(q[1]); if (inner) return `“${inner.replace(/^[“"]|[”"]$/g, '')}”` }
    return null
  }
  return s === s.toUpperCase() && /[a-z]/i.test(s) ? out.toUpperCase() : out
}

// ——— DOM-переводчик

const SKIP = new Set(['SCRIPT', 'STYLE', 'SVG', 'svg', 'path'])
const memo = new WeakMap() // element → { it: [текстовые узлы IT], en: строка, applied: bool }

function leafEls(root) {
  const out = []
  const walk = (el) => {
    if (SKIP.has(el.tagName) || el.dataset?.noI18n !== undefined) return
    let onlyText = el.childNodes.length > 0
    for (const n of el.childNodes) {
      if (n.nodeType === 1 && !['BR', 'IMG', 'svg', 'SVG'].includes(n.tagName)) onlyText = false
    }
    if (onlyText) { if ([...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) out.push(el); return }
    for (const c of el.children) walk(c)
  }
  walk(root)
  return out
}

function textOf(el) {
  return [...el.childNodes].map((n) => (n.nodeType === 3 ? n.nodeValue : n.tagName === 'BR' ? '\n' : '')).join('')
}

function setText(el, value) {
  const texts = [...el.childNodes].filter((n) => n.nodeType === 3)
  const parts = value.split('\n')
  if (parts.length === texts.length) texts.forEach((n, i) => { n.nodeValue = parts[i] })
  else texts.forEach((n, i) => { n.nodeValue = i === 0 ? value.replace(/\n/g, ' ') : '' })
}

export function translateDom(root, lang) {
  if (!root) return
  for (const el of leafEls(root)) {
    const current = textOf(el)
    let m = memo.get(el)
    // React перерисовал узел — запоминаем новый итальянский текст
    if (!m || (current !== m.en && current !== m.it)) {
      m = { it: current, en: null }
      memo.set(el, m)
    }
    if (lang === 'en') {
      if (m.en === null) m.en = tr(m.it) ?? m.it
      if (current !== m.en) setText(el, m.en)
    } else if (current !== m.it) {
      setText(el, m.it)
    }
  }
  for (const el of root.querySelectorAll('input[placeholder], textarea[placeholder]')) {
    if (!el.dataset.it) el.dataset.it = el.placeholder
    el.placeholder = lang === 'en' ? tr(el.dataset.it) ?? el.dataset.it : el.dataset.it
  }
}
