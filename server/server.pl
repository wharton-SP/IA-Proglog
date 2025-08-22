:- module(crime_server, [main/0]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_files)).
:- use_module(library(http/http_cors)).

%% --- Base de connaissances criminelle ---

% Types de crimes
crime_type(assassinat).
crime_type(vol).
crime_type(escroquerie).

% Suspects
suspect(john).
suspect(mary).
suspect(alice).
suspect(bruno).
suspect(sophie).

% Motifs
has_motive(john, vol).
has_motive(mary, assassinat).
has_motive(alice, escroquerie).
has_motive(bruno, escroquerie).

% Présence sur la scène de crime
was_near_crime_scene(john, vol).
was_near_crime_scene(mary, assassinat).

% Empreintes sur l'arme
has_fingerprint_on_weapon(john, vol).
has_fingerprint_on_weapon(mary, assassinat).

% Transactions bancaires suspectes
has_bank_transaction(alice, escroquerie).
has_bank_transaction(bruno, escroquerie).

% Fausses identités
owns_fake_identity(sophie, escroquerie).

% Témoignages oculaires (simulé)
eyewitness_identification(john, vol).
eyewitness_identification(mary, assassinat).

%% --- Règles de déduction ---

% Règle principale pour déterminer la culpabilité
is_guilty(Suspect, Crime) :-
    has_motive(Suspect, Crime),
    was_near_crime_scene(Suspect, Crime),
    (has_fingerprint_on_weapon(Suspect, Crime) ; eyewitness_identification(Suspect, Crime)).

% Règle spéciale pour l'escroquerie
is_guilty(Suspect, escroquerie) :-
    has_motive(Suspect, escroquerie),
    (has_bank_transaction(Suspect, escroquerie) ; owns_fake_identity(Suspect, escroquerie)).

% Collecte des preuves pour un suspect et un crime
collect_evidence(Suspect, Crime, Evidence) :-
    findall(Proof, evidence_for(Suspect, Crime, Proof), Evidence).

% Définition des différents types de preuves
evidence_for(Suspect, Crime, motive) :- has_motive(Suspect, Crime).
evidence_for(Suspect, Crime, near_scene) :- was_near_crime_scene(Suspect, Crime).
evidence_for(Suspect, Crime, fingerprint) :- has_fingerprint_on_weapon(Suspect, Crime).
evidence_for(Suspect, Crime, eyewitness) :- eyewitness_identification(Suspect, Crime).
evidence_for(Suspect, Crime, bank_transaction) :- has_bank_transaction(Suspect, Crime).
evidence_for(Suspect, Crime, fake_identity) :- owns_fake_identity(Suspect, Crime).

% Calcul du niveau de confiance
confidence_level(Suspect, Crime, Confidence) :-
    collect_evidence(Suspect, Crime, Evidence),
    length(Evidence, Count),
    Confidence is min(100, Count * 20).

%% --- Déclarations de routes ---
:- http_handler(root(api/suspects), suspects_handler, [method(get)]).
:- http_handler(root(api/crimes), crimes_handler, [method(get)]).
:- http_handler(root(api/analyze), analyze_handler, [method(post)]).
:- http_handler(root(api/evidence), evidence_handler, [method(get)]).
:- http_handler(root(api/facts), facts_handler, [method(get)]).
:- http_handler(root(.), static_handler, [prefix]).

%% --- CORS ---
add_cors(Request) :- 
    cors_enable(Request, [
        methods([get, post, options]),
        headers(['Content-Type', 'Authorization'])
    ]).

%% --- Handlers API ---

% Récupérer tous les suspects
suspects_handler(Request) :-
    add_cors(Request),
    findall(S, suspect(S), Suspects),
    reply_json_dict(_{suspects: Suspects}).

% Récupérer tous les types de crimes
crimes_handler(Request) :-
    add_cors(Request),
    findall(C, crime_type(C), Crimes),
    reply_json_dict(_{crimes: Crimes}).

% Analyser un suspect pour un crime
analyze_handler(Request) :-
    add_cors(Request),
    http_read_json_dict(Request, Data),
    Suspect = Data.suspect,
    Crime = Data.crime,
    
    % Vérifier si le suspect est coupable
    (is_guilty(Suspect, Crime) -> 
        Guilty = true ; 
        Guilty = false
    ),
    
    % Collecter les preuves
    collect_evidence(Suspect, Crime, Evidence),
    
    % Calculer le niveau de confiance
    confidence_level(Suspect, Crime, Confidence),
    
    % Créer la réponse
    reply_json_dict(_{
        suspect: Suspect,
        crime: Crime,
        guilty: Guilty,
        confidence: Confidence,
        evidence: Evidence
    }).

% Récupérer les preuves pour un suspect et un crime
evidence_handler(Request) :-
    add_cors(Request),
    http_parameters(Request, [
        suspect(Suspect, [atom]),
        crime(Crime, [atom])
    ]),
    
    collect_evidence(Suspect, Crime, Evidence),
    reply_json_dict(_{
        suspect: Suspect,
        crime: Crime,
        evidence: Evidence
    }).

% Récupérer tous les faits de la base de connaissances
facts_handler(Request) :-
    add_cors(Request),
    
    % Collecter tous les faits
    findall([Suspect, Crime], has_motive(Suspect, Crime), Motives),
    findall([Suspect, Crime], was_near_crime_scene(Suspect, Crime), NearScene),
    findall([Suspect, Crime], has_fingerprint_on_weapon(Suspect, Crime), Fingerprints),
    findall([Suspect, Crime], has_bank_transaction(Suspect, Crime), BankTransactions),
    findall([Suspect, Crime], owns_fake_identity(Suspect, Crime), FakeIdentities),
    findall([Suspect, Crime], eyewitness_identification(Suspect, Crime), Eyewitnesses),
    
    reply_json_dict(_{
        motives: Motives,
        near_scene: NearScene,
        fingerprints: Fingerprints,
        bank_transactions: BankTransactions,
        fake_identities: FakeIdentities,
        eyewitnesses: Eyewitnesses
    }).

% Handler pour les fichiers statiques
static_handler(Request) :-
    http_reply_from_files('public', [indexes(['index.html'])], Request).

%% --- Démarrage serveur ---
server(Port) :-
    http_server(http_dispatch, [port(Port)]),
    format('~N[OK] Serveur d\'enquête criminelle démarré sur http://localhost:~w/~n', [Port]),
    format('~N[INFO] Routes API disponibles:~n'),
    format('~N  GET  /api/suspects     - Liste des suspects~n'),
    format('~N  GET  /api/crimes       - Types de crimes~n'),
    format('~N  POST /api/analyze      - Analyser un cas~n'),
    format('~N  GET  /api/evidence     - Preuves pour un suspect~n'),
    format('~N  GET  /api/facts        - Base de connaissances~n').

%% --- Point d'entrée ---
main :-
    current_prolog_flag(argv, Argv),
    (Argv = [PortAtom|_], atom_number(PortAtom, Port)
    -> true
    ; Port = 8080
    ),
    server(Port),
    thread_get_message(_).

:- initialization(main, main).