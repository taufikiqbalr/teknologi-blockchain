export const course = {
  name: "Teknologi Blockchain",
  semester: "Ganjil 2026/2027",
  instructor: "Taufik Iqbal Ramdhani, S.Kom., M.Sc.",
  classes: [
    { code:"TI229", track:"Eksekutif", day:"Senin", time:"19:00 - 21:30 WIB", mode:"Zoom", icon:"💻" },
    { code:"IF235", track:"Reguler", day:"Selasa", time:"09:45 - 12:00 WIB", mode:"Ruang Kelas 1", icon:"🏫" },
    { code:"IF235", track:"Eksekutif", day:"Jumat", time:"19:00 - 20:20 WIB", mode:"Zoom", icon:"💻" }
  ],
  grading: [
    {name:"Kehadiran / Kuis", weight:10},
    {name:"Praktik / Tugas", weight:20},
    {name:"Tugas Kelompok", weight:10},
    {name:"Presentasi", weight:10},
    {name:"UTS", weight:20},
    {name:"UAS", weight:30}
  ],
  references: [
    "S. Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System",
    "A. M. Antonopoulos — Mastering Bitcoin",
    "A. M. Antonopoulos & G. Wood — Mastering Ethereum",
    "I. Bashir — Mastering Blockchain",
    "Ethereum Developer Documentation",
    "Hyperledger Fabric Documentation"
  ]
};

export const weeks = [
  {week:1,type:"lecture",sub:"SUB-IF219-1-1",topic:"Pengenalan Teknologi Blockchain",focus:"Definisi blockchain dan distributed ledger; decentralization, immutability, transparency, traceability; node, peer, transaction, block, ledger.",concepts:["DLT","decentralization","immutability","node"],activity:"Identifikasi karakteristik blockchain dan diskusi centralized vs decentralized.",assessment:"Kuis 1 · 5%",assessmentType:"quiz",slides:"Materi_Pertemuan_1_Blockchain_Technology_ITTS.pptx",handson:"Hands-on_Pertemuan_1_Blockchain_Technology_ITTS.pdf"},
  {week:2,type:"lecture",sub:"SUB-IF219-1-2",topic:"Arsitektur Blockchain dan Distributed Ledger",focus:"Peer-to-peer network; struktur blok & transaksi; block header/body; hash pointer; Merkle tree/root; propagasi dan validasi transaksi.",concepts:["P2P","block header","hash pointer","Merkle tree"],activity:"Menguraikan transaction → block → hash → node → ledger dan validasi transaksi.",assessment:"Kuis 2 · 5%",assessmentType:"quiz",slides:"Materi_Pertemuan_2_Blockchain_Architecture_ITTS.pptx",handson:"Hands-on_Pertemuan_2_Distributed_Ledger_Simulator_ITTS.pdf"},
  {week:3,type:"lecture",sub:"SUB-IF219-1-3",topic:"Perbandingan Model dan Platform Blockchain",focus:"Centralized vs distributed; permissionless vs permissioned; public, private, consortium; Bitcoin, Ethereum, Hyperledger Fabric; trust, privacy, performance, governance.",concepts:["public/private","permissioned","Ethereum","Fabric"],activity:"Case method dan platform selection matrix.",assessment:"Tugas 1 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_3_Model_dan_Platform_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_3_Platform_Selection_Matrix_ITTS.pdf"},
  {week:4,type:"lecture",sub:"SUB-IF219-2-1",topic:"Kriptografi dalam Blockchain",focus:"Cryptographic hash; preimage & collision resistance; public/private key; digital signature; address/identity; integrity & authentication.",concepts:["SHA-256","key pair","signature","verification"],activity:"Simulasi hashing, signing, verification, dan tampering.",assessment:"Tugas 2 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_4_Kriptografi_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_4_Kriptografi_Blockchain_ITTS.pdf"},
  {week:5,type:"lecture",sub:"SUB-IF219-2-2",topic:"Mekanisme Konsensus Blockchain",focus:"Tujuan konsensus; PoW & mining; difficulty/target; PoS; PBFT/RAFT; finality, fault tolerance, energy, throughput.",concepts:["PoW","PoS","PBFT","RAFT"],activity:"Perbandingan konsensus dan simulasi sederhana PoW.",assessment:"Tugas 3 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_5_Mekanisme_Konsensus_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_5_Konsensus_Blockchain_ITTS.pdf"},
  {week:6,type:"lecture",sub:"SUB-IF219-2-3",topic:"Implementasi Blockchain Sederhana",focus:"Block & chain; genesis block; hash & previous hash; transaction pool; chain validation; simulasi mining; implementasi Python.",concepts:["Python","genesis block","previous hash","validation"],activity:"Guided coding blockchain from scratch dan tamper detection.",assessment:"Tugas 4 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_6_Implementasi_Blockchain_Sederhana_ITTS.pptx",handson:"Hands-on_Pertemuan_6_Implementasi_Blockchain_Sederhana_ITTS.pdf"},
  {week:7,type:"lecture",sub:"SUB-IF219-3-1",topic:"Perancangan Solusi Berbasis Blockchain",focus:"Stakeholder; aktor/aset/transaksi; trust boundary; on-chain/off-chain; permission model; consensus; security/key management; architecture.",concepts:["trust boundary","on-chain/off-chain","architecture","security"],activity:"Project-based design untuk studi kasus nyata.",assessment:"Tugas 5 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_7_Perancangan_Solusi_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_7_Perancangan_Solusi_Blockchain_ITTS.pdf"},
  {week:8,type:"exam",sub:"",topic:"Ujian Tengah Semester (UTS)",focus:"Evaluasi capaian konsep, arsitektur, platform, kriptografi, konsensus, implementasi sederhana, dan design thinking blockchain.",concepts:["UTS"],activity:"Ujian sesuai ketentuan kelas.",assessment:"UTS · 20%",assessmentType:"exam",slides:"",handson:""},
  {week:9,type:"lecture",sub:"SUB-IF219-3-2",topic:"Smart Contract dan Perancangan Aplikasi Blockchain",focus:"Smart contract; account/state model; function, state, event, access control; gas; state transition; DApp integration.",concepts:["Solidity","state","event","DApp"],activity:"Menyusun spesifikasi smart contract dan arsitektur DApp.",assessment:"Tugas 6 · 10%",assessmentType:"task",slides:"Materi_Pertemuan_9_Smart_Contract_DApp_Design_ITTS.pptx",handson:"Hands-on_Pertemuan_9_Smart_Contract_DApp_Design_ITTS.pdf"},
  {week:10,type:"lecture",sub:"SUB-IF219-3-3",topic:"Pengembangan Prototipe Blockchain",focus:"Solidity; compile/deploy; wallet/Web3/API interaction; testing; event & receipt; front-end/back-end integration; documentation.",concepts:["compile/deploy","wallet","ABI","testing"],activity:"Pengembangan prototipe, deployment, transaksi uji, dan integrasi aplikasi.",assessment:"Tugas 7 · 5%",assessmentType:"task",slides:"Materi_Pertemuan_10_Pengembangan_Prototipe_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_10_Pengembangan_Prototipe_Blockchain_ITTS.pdf"},
  {week:11,type:"lecture",sub:"",topic:"Platform Ethereum dan Ekosistem DApp",focus:"Ethereum account model; EVM; wallet & transaction lifecycle; gas/fee/nonce; DApp architecture; RPC/Web3; deployment environment.",concepts:["EVM","gas","nonce","RPC"],activity:"Analisis lifecycle transaksi dan arsitektur DApp Ethereum.",assessment:"Formatif · 0%",assessmentType:"formative",slides:"Materi_Pertemuan_11_Platform_Ethereum_DApp_ITTS.pptx",handson:"Hands-on_Pertemuan_11_Ethereum_DApp_ITTS.pdf"},
  {week:12,type:"lecture",sub:"",topic:"Enterprise Blockchain dengan Hyperledger Fabric",focus:"Permissioned blockchain; MSP; peer & orderer; channel; chaincode; endorsement policy; enterprise use case.",concepts:["MSP","peer","orderer","channel"],activity:"Pemetaan komponen Fabric dan test-network workflow.",assessment:"Formatif · 0%",assessmentType:"formative",slides:"Materi_Pertemuan_12_Enterprise_Blockchain_Hyperledger_Fabric_ITTS.pptx",handson:"Hands-on_Pertemuan_12_Hyperledger_Fabric_ITTS.pdf"},
  {week:13,type:"lecture",sub:"",topic:"Keamanan Blockchain dan Smart Contract",focus:"51% attack; Sybil/eclipsing; private-key compromise; replay; reentrancy; access-control vulnerability; secure development; audit/testing.",concepts:["threat model","reentrancy","key compromise","audit"],activity:"Threat analysis dan secure smart contract checklist.",assessment:"Formatif · 0%",assessmentType:"formative",slides:"Materi_Pertemuan_13_Keamanan_Blockchain_Smart_Contract_ITTS.pptx",handson:"Hands-on_Pertemuan_13_Keamanan_Blockchain_Smart_Contract_ITTS.pdf"},
  {week:14,type:"lecture",sub:"",topic:"Skalabilitas dan Interoperabilitas Blockchain",focus:"Blockchain trilemma; throughput/latency; Layer-2; sidechain; sharding; bridges; off-chain storage; trade-off scalability/security/decentralization.",concepts:["L2","sidechain","sharding","bridge"],activity:"Evaluasi strategi scaling dan interoperability.",assessment:"Formatif · 0%",assessmentType:"formative",slides:"Materi_Pertemuan_14_Skalabilitas_Interoperabilitas_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_14_Skalabilitas_Interoperabilitas_Blockchain_ITTS.pdf"},
  {week:15,type:"lecture",sub:"",topic:"Studi Kasus dan Evaluasi Solusi Blockchain",focus:"Finance/payment; supply-chain traceability; digital identity; IoT; audit trail; manfaat, biaya, security, scalability, governance.",concepts:["use case","ROI/value","governance","evaluation"],activity:"Case evaluation dan finalisasi prototipe/dokumentasi.",assessment:"Formatif · 0%",assessmentType:"formative",slides:"Materi_Pertemuan_15_Studi_Kasus_Evaluasi_Blockchain_ITTS.pptx",handson:"Hands-on_Pertemuan_15_Evaluasi_Solusi_Blockchain_ITTS.pdf"},
  {week:16,type:"exam",sub:"",topic:"Ujian Akhir Semester (UAS)",focus:"Evaluasi integratif smart contract, DApp, Ethereum, Fabric, security, scalability, interoperability, dan solusi blockchain.",concepts:["UAS"],activity:"Ujian / evaluasi akhir sesuai ketentuan kelas.",assessment:"UAS · 30%",assessmentType:"exam",slides:"",handson:""}
];

export const assessments = [
  {week:1,kind:"Kuis",title:"Kuis 1 — Konsep Dasar Blockchain",sub:"SUB-IF219-1-1",weight:5,group:"Individu"},
  {week:2,kind:"Kuis",title:"Kuis 2 — Arsitektur Blockchain & Distributed Ledger",sub:"SUB-IF219-1-2",weight:5,group:"Individu"},
  {week:3,kind:"Tugas",title:"Tugas 1 — Perbandingan Model & Platform Blockchain",sub:"SUB-IF219-1-3",weight:5,group:"Individu"},
  {week:4,kind:"Tugas",title:"Tugas 2 — Simulasi Hashing & Digital Signature",sub:"SUB-IF219-2-1",weight:5,group:"Individu"},
  {week:5,kind:"Tugas",title:"Tugas 3 — Analisis & Simulasi Konsensus",sub:"SUB-IF219-2-2",weight:5,group:"Individu"},
  {week:6,kind:"Tugas",title:"Tugas 4 — Implementasi Blockchain Sederhana dengan Python",sub:"SUB-IF219-2-3",weight:5,group:"Individu"},
  {week:7,kind:"Tugas Kelompok",title:"Tugas 5 — Desain Arsitektur Solusi Blockchain",sub:"SUB-IF219-3-1",weight:5,group:"Kelompok"},
  {week:8,kind:"UTS",title:"Ujian Tengah Semester",sub:"Pertemuan 1–7",weight:20,group:"Individu"},
  {week:9,kind:"Presentasi",title:"Tugas 6 — Presentasi Desain Smart Contract & DApp",sub:"SUB-IF219-3-2",weight:10,group:"Kelompok"},
  {week:10,kind:"Tugas Kelompok",title:"Tugas 7 — Prototipe Smart Contract & Integrasi Aplikasi",sub:"SUB-IF219-3-3",weight:5,group:"Kelompok"},
  {week:16,kind:"UAS",title:"Ujian Akhir Semester",sub:"Materi integratif",weight:30,group:"Individu"}
];