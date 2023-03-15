const mapelRef = [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "IPA (Ilmu Pengetahuan Alam)",
    "IPS (Ilmu Pengetahuan Sosial)",
    "Seni Budaya",
    "Pendidikan Jasmani dan Kesehatan",
    "Agama",
    "PPKn (Pendidikan Pancasila dan Kewarganegaraan)",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sejarah",
    "Geografi",
    "Ekonomi",
    "Sosiologi",
    "Antropologi",
    "Psikologi",
    "Bahasa Daerah",
    "Teknologi Informasi dan Komunikasi",
    "Pemrograman Komputer",
    "Desain Grafis",
    "Bahasa Asing Lainnya (seperti Mandarin, Jepang, dll.)",
    "Kesenian",
    "Musik",
    "Tata Boga",
    "Tata Busana",
    "Kewirausahaan",
    "Filsafat",
    "Kesehatan Lingkungan",
    "Astronomi",
    "Statistika",
    "Akuntansi",
    "Hukum",
    "Keperawatan",
    "Kedokteran",
    "Kedokteran Gigi",
    "Farmasi",
    "Teknik Mesin",
    "Teknik Elektro",
    "Teknik Sipil",
    "Bahasa Jerman",
    "Bahasa Perancis",
    "Bahasa Spanyol",
    "Kesenian Bali",
    "Kesenian Jawa",
    "Kesenian Sunda",
    "Kesenian Betawi",
    "Kesenian Minangkabau",
    "Kesenian Bugis",
    "Kesenian Dayak",
    "Kesenian Papua",
    "Kesenian Melayu",
    "Tata Rias",
    "Tata Busana",
    "Kerajinan Tangan",
    "Seni Tari",
    "Pramuka",
    "Fotografi",
    "Jurnalistik",
    "Bimbingan Konseling",
    "Kesenian Kontemporer",
    "Pendidikan Lingkungan Hidup",
    "Pendidikan Kewarganegaraan",
    "Pendidikan Agama Islam",
    "Pendidikan Agama Kristen",
    "Pendidikan Agama Katolik",
    "Pendidikan Agama Hindu",
    "Pendidikan Agama Buddha",
    "Pendidikan Agama Konghucu",
    "Pendidikan Kewirausahaan",
    "Sistem Operasi",
    "Jaringan Komputer",
    "Administrasi Jaringan Komputer",
    "Pemrograman Web",
    "Desain Web",
    "Robotika",
    "Kesehatan Reproduksi",
    "Pendidikan Seksual",
    "Bahasa Jawa",
    "Bahasa Bali",
    "Bahasa Minangkabau",
    "Bahasa Bugis",
    "Bahasa Dayak",
    "Bahasa Papua",
    "Teknik Kimia",
    "Teknik Industri",
    "Ekonomi Syariah",
    "Bahasa Arab",
    "Bahasa Korea",
    "Bahasa Rusia",
    "Bahasa Portugis",
    "Bahasa Italia",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "Keamanan Jaringan Komputer",
    "Pemrograman Dasar",
    "Basis Data",
    "Sistem Informasi",
    "Kajian Budaya",
    "Sejarah Kebudayaan Indonesia",
    "Manajemen Proyek",
    "Pengembangan Aplikasi Mobile",
    "Pemasaran Digital",
    "Desain Grafis",
    "Desain Komunikasi Visual",
    "Pengolahan Citra",
    "Pengolahan Suara",
    "Kajian Gender",
    "Kajian Lingkungan",
    "Kajian Pembangunan",
    "Bahasa Mandarin",
    "Bahasa Jerman",
    "Bahasa Perancis",
    "Bahasa Spanyol",
    "Bahasa Jepang",
    "Bahasa Inggris",
    "Matematika Dasar",
    "Matematika Lanjutan",
    "Fisika",
    "Kimia",
    "Biologi",
    "Geografi",
    "Sosiologi",
    "Antropologi",
    "Ekonomi",
    "Sejarah",
    "Kajian Agama",
    "Kajian Politik",
    "Seni Rupa",
    "Seni Musik",
    "Seni Tari",
    "Bahasa Daerah",
    "Pendidikan Pancasila",
    "Pendidikan Sejarah",
    "Pendidikan Geografi",
    "Pendidikan Ekonomi",
    "Pendidikan Fisika",
    "Pendidikan Kimia",
    "Pendidikan Biologi",
    "Pendidikan Kesenian",
    "Pendidikan Bahasa dan Sastra Indonesia",
    "Pendidikan Bahasa dan Sastra Daerah",
    "Pendidikan Olahraga",
    "Pendidikan Keterampilan",
    "Pendidikan Karakter",
    "Pendidikan Inklusif",
    "Teknologi Informasi dan Komunikasi",
    "Pendidikan Kewarganegaraan",
    "Agama Hindu",
    "Agama Buddha",
    "Agama Kristen",
    "Agama Katolik",
    "Agama Islam",
    "Bahasa Prancis",
    "Bahasa Sunda",
    "Bahasa Lampung",
    "Bahasa Aceh",
    "Bahasa Banjar",
    "Bahasa Batak",
    "Bahasa Madura",
    "Bahasa Melayu",
    "Pendidikan Pengembangan Kepribadian",
    "Pendidikan Tata Boga",
    "Pendidikan Tata Busana",
]

// Remove duplicate and create new one
export const mapel = mapelRef.filter((m, index) => {
    return mapelRef.indexOf(m) === index;
});

const mataPelajaran = [
    {
      nama: 'Matematika',
      subTopik: ['geometri', 'aljabar', 'statistika']
    },
    {
      nama: 'Bahasa Indonesia',
      subTopik: ['tata bahasa', 'ejaan', 'penulisan karangan']
    },
    {
      nama: 'Bahasa Inggris',
      subTopik: ['tata bahasa', 'mendengarkan dan berbicara', 'menulis']
    },
    {
      nama: 'IPA (Ilmu Pengetahuan Alam)',
      subTopik: ['fisika', 'biologi', 'kimia']
    },
    {
      nama: 'IPS (Ilmu Pengetahuan Sosial)',
      subTopik: ['sejarah', 'geografi', 'sosiologi']
    },
    {
      nama: 'Pendidikan Agama dan Budi Pekerti',
      subTopik: ['etika', 'moral', 'agama']
    },
    {
      nama: 'Seni Budaya',
      subTopik: ['musik', 'tari', 'seni rupa']
    },
    {
      nama: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
      subTopik: ['olahraga', 'kesehatan', 'kebugaran']
    },
    {
      nama: 'Sejarah',
      subTopik: ['peradaban', 'politik', 'budaya']
    },
    {
      nama: 'Geografi',
      subTopik: ['peta', 'lingkungan', 'sosial']
    },
    {
      nama: 'Ekonomi',
      subTopik: ['mikroekonomi', 'makroekonomi', 'pengelolaan bisnis']
    },
    {
      nama: 'Sosiologi',
      subTopik: ['struktur sosial', 'perilaku sosial', 'stratifikasi sosial']
    },
    {
      nama: 'Antropologi',
      subTopik: ['kebudayaan', 'etnografi', 'arkeologi']
    },
    {
      nama: 'Fisika',
      subTopik: ['mekanika', 'termodinamika', 'elektromagnetisme']
    },
    {
      nama: 'Kimia',
      subTopik: ['stoikiometri', 'termokimia', 'kimia organik']
    },
    {
      nama: 'Biologi',
      subTopik: ['zoologi', 'botani', 'fisiologi']
    },
    {
      nama: 'Kewarganegaraan',
      subTopik: ['hak asasi manusia', 'pemerintahan', 'politik']
    },
    {
      nama: 'Komputer dan Teknologi Informasi',
      subTopik: ['pemrograman', 'jaringan komputer', 'desain web']
    },
    {
      nama: 'Desain dan Kreativitas',
      subTopik: ['desain grafis', 'desain produk', 'seni rupa']
    },
    {
      nama: 'Pendidikan Kewirausahaan',
      subTopik: ['pengembangan bisnis', 'manajemen bisnis', 'kewirausahaan sosial']
    }
  ];