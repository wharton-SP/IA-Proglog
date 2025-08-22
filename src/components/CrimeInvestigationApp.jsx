import React, { useState, useEffect } from 'react';
import { Search, Users, FileText, AlertCircle, CheckCircle, XCircle, Eye, Fingerprint, CreditCard, UserX, MapPin, Target } from 'lucide-react';
import axios from 'axios';
import { ChartNoAxesColumn } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import { ScrollText } from 'lucide-react';

const CrimeInvestigationApp = () => {
    const [suspects, setSuspects] = useState([]);
    const [crimes, setCrimes] = useState([]);
    const [selectedSuspect, setSelectedSuspect] = useState('');
    const [selectedCrime, setSelectedCrime] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [facts, setFacts] = useState(null);
    const [error, setError] = useState('');

    // Charger les données initiales
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [suspectsRes, crimesRes, factsRes] = await Promise.all([
                axios.get('api/suspects'),
                axios.get('api/crimes'),
                axios.get('api/facts')
            ]);

            setSuspects(suspectsRes.data.suspects);
            setCrimes(crimesRes.data.crimes);
            setFacts(factsRes.data);
            console.log("Facts loaded:", factsRes.data);

        } catch (err) {
            setError('Erreur lors du chargement des données. Vérifiez que le serveur Prolog est démarré.');
            console.error('Erreur:', err);
        }
    };

    const analyzeCase = async () => {
        if (!selectedSuspect || !selectedCrime) {
            setError('Veuillez sélectionner un suspect et un type de crime');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const body = {
                suspect: selectedSuspect,
                crime: selectedCrime
            };
            console.log('Analyse body:', body);
            const response = await axios.post('api/analyze', body);
            console.log(response.data);

            setAnalysis(response.data);
        } catch (err) {
            setError('Erreur lors de l\'analyse. Vérifiez la connexion au serveur.');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    const getEvidenceIcon = (evidenceType) => {
        const icons = {
            motive: <Target className="w-4 h-4" />,
            near_scene: <MapPin className="w-4 h-4" />,
            fingerprint: <Fingerprint className="w-4 h-4" />,
            eyewitness: <Eye className="w-4 h-4" />,
            bank_transaction: <CreditCard className="w-4 h-4" />,
            fake_identity: <UserX className="w-4 h-4" />
        };
        return icons[evidenceType] || <AlertCircle className="w-4 h-4" />;
    };

    const getEvidenceLabel = (evidenceType) => {
        const labels = {
            motive: 'Motif établi',
            near_scene: 'Présence sur la scène',
            fingerprint: 'Empreintes digitales',
            eyewitness: 'Témoin oculaire',
            bank_transaction: 'Transaction suspecte',
            fake_identity: 'Fausse identité'
        };
        return labels[evidenceType] || evidenceType;
    };

    if (error && !suspects.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-8 flex items-center justify-center">
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Erreur de connexion</h2>
                    <p className="text-red-200 mb-4">{error}</p>
                    <p className="text-sm text-gray-300">
                        Assurez-vous que le serveur Prolog fonctionne sur le port 8080
                    </p>
                    <button
                        onClick={loadInitialData}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative z-10">
            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-500">
                        Système d'Enquête Criminelle
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Interface React avec serveur Prolog
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <XCircle className="w-5 h-5 text-red-500 mr-2" />
                            <span className="text-red-200">{error}</span>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Panneau de contrôle */}
                    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-600">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <Users className="w-6 h-6 mr-2" />
                            Enquête
                        </h2>

                        {/* Sélection du suspect */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Suspect à analyser :
                            </label>
                            <select
                                value={selectedSuspect}
                                onChange={(e) => setSelectedSuspect(e.target.value)}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">-- Sélectionner un suspect --</option>
                                {suspects.map(suspect => (
                                    <option key={suspect} value={suspect}>
                                        {suspect.charAt(0).toUpperCase() + suspect.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sélection du crime */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Type de crime :
                            </label>
                            <select
                                value={selectedCrime}
                                onChange={(e) => setSelectedCrime(e.target.value)}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">-- Sélectionner un crime --</option>
                                {crimes.map(crime => (
                                    <option key={crime} value={crime}>
                                        {crime.charAt(0).toUpperCase() + crime.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bouton d'analyse */}
                        <button
                            onClick={analyzeCase}
                            disabled={loading || !selectedSuspect || !selectedCrime}
                            className="w-full py-3 px-6 bg-gradient-to-r from-pink-600 to-yellow-600 rounded-lg font-semibold text-white hover:from-pink-700 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mr-2" />
                                    Lancer l'enquête
                                </>
                            )}
                        </button>
                    </div>

                    {/* Base de faits Prolog */}
                    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-600">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Base de connaissances
                        </h2>

                        {facts && (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                <div>
                                    <h3 className="font-semibold text-blue-400 mb-2">Motifs :</h3>
                                    <div className="text-sm space-y-1">
                                        {facts.motives.map(([suspect, crime], idx) => (
                                            <div key={idx} className="flex items-center">
                                                <Target className="w-3 h-3 mr-2 text-orange-400" />
                                                <code>has_motive({suspect}, {crime})</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-blue-400 mb-2">Scène de crime :</h3>
                                    <div className="text-sm space-y-1">
                                        {facts.near_scene.map(([suspect, crime], idx) => (
                                            <div key={idx} className="flex items-center">
                                                <MapPin className="w-3 h-3 mr-2 text-red-400" />
                                                <code>was_near_crime_scene({suspect}, {crime})</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-blue-400 mb-2">Empreintes :</h3>
                                    <div className="text-sm space-y-1">
                                        {facts.fingerprints.map(([suspect, crime], idx) => (
                                            <div key={idx} className="flex items-center">
                                                <Fingerprint className="w-3 h-3 mr-2 text-purple-400" />
                                                <code>has_fingerprint_on_weapon({suspect}, {crime})</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Résultats de l'analyse */}
                {analysis && (
                    <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-600">
                        <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center"><ChartNoAxesColumn /> Résultats de l'enquête</h2>

                        <div className={`p-6 rounded-lg border-l-4 ${analysis.guilty
                            ? 'bg-red-900/20 border-red-500'
                            : 'bg-green-900/20 border-green-500'
                            }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    {analysis.guilty ? (
                                        <XCircle className="w-8 h-8 text-red-500 mr-3" />
                                    ) : (
                                        <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {analysis.suspect.charAt(0).toUpperCase() + analysis.suspect.slice(1)}
                                        </h3>
                                        <p className="text-gray-300">
                                            Crime: {analysis.crime.charAt(0).toUpperCase() + analysis.crime.slice(1)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-bold ${analysis.guilty ? 'text-red-400' : 'text-green-400'
                                        }`}>
                                        {analysis.guilty ? 'COUPABLE' : 'INNOCENT'}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Confiance: {analysis.confidence}%
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><SearchIcon /> Preuves collectées :</h4>
                                {analysis.evidence.length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {analysis.evidence.map((evidence, idx) => (
                                            <div key={idx} className="flex items-center p-2 bg-slate-700/50 rounded">
                                                {getEvidenceIcon(evidence)}
                                                <span className="ml-2 text-sm">{getEvidenceLabel(evidence)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 italic">Aucune preuve trouvée</p>
                                )}
                            </div>

                            <div className="bg-slate-700/50 p-4 rounded">
                                <h4 className="font-semibold mb-2 flex items-center gap-3"><ScrollText /> Requête Prolog :</h4>
                                <code className="text-sm text-blue-300">
                                    ?- is_guilty({analysis.suspect}, {analysis.crime}).
                                </code>
                                <div className="mt-2">
                                    <span className="text-sm">
                                        <strong>Résultat:</strong>
                                        <span className={analysis.guilty ? 'text-red-400' : 'text-green-400'}>
                                            {analysis.guilty ? 'true' : 'false'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrimeInvestigationApp;