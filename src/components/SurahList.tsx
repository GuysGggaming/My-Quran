import { useState, useEffect } from 'react';
import { SurahCard } from './SurahCard';
import { SearchBar } from './SearchBar';
import { LoadingSpinner, LoadingSkeleton } from './LoadingSpinner';
import heroBackground from '@/assets/islamic-hero-bg.jpg';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahListProps {
  onSurahSelect: (surahNumber: number) => void;
}

export const SurahList = ({ onSurahSelect }: SurahListProps) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    filterSurahs();
  }, [searchQuery, surahs]);

  const fetchSurahs = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://equran.id/api/v2/surat');
      const data = await response.json();
      
      const formattedSurahs = data.data.map((surah: any) => ({
        number: surah.nomor,
        name: surah.nama,
        englishName: surah.nama_latin,
        englishNameTranslation: surah.arti,
        numberOfAyahs: surah.jumlah_ayat,
        revelationType: surah.tempat_turun
      }));
      
      setSurahs(formattedSurahs);
      setFilteredSurahs(formattedSurahs);
    } catch (error) {
      console.error('Error fetching surahs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSurahs = () => {
    if (!searchQuery.trim()) {
      setFilteredSurahs(surahs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = surahs.filter(surah => 
      surah.englishName.toLowerCase().includes(query) ||
      surah.englishNameTranslation.toLowerCase().includes(query) ||
      surah.number.toString().includes(query)
    );
    
    setFilteredSurahs(filtered);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="h-8 w-64 loading-pulse mx-auto rounded" />
          <div className="h-4 w-48 loading-pulse mx-auto rounded" />
        </div>
        <div className="flex justify-center">
          <div className="h-11 w-80 loading-pulse rounded" />
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header with Background */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="relative bg-gradient-to-br from-primary/90 to-accent/90 text-primary-foreground">
          <div className="px-8 py-16 text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Al-Qur'an Digital
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Membaca dan mendengarkan Al-Qur'an dengan mudah
            </p>
            <div className="arabic-text text-3xl md:text-4xl opacity-95 leading-relaxed">
              وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ
            </div>
            <p className="text-sm opacity-80 italic">
              "Dan Al-Qur'an itu telah Kami turunkan dengan berangsur-angsur agar kamu dapat membacakannya perlahan-lahan kepada manusia"
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari surah berdasarkan nama atau nomor..."
        />
      </div>

      {/* Results count */}
      <div className="text-center text-sm text-muted-foreground">
        {searchQuery ? (
          <span>Ditemukan {filteredSurahs.length} surah dari pencarian "{searchQuery}"</span>
        ) : (
          <span>Menampilkan {surahs.length} surah</span>
        )}
      </div>

      {/* Surah grid */}
      {filteredSurahs.length === 0 && searchQuery ? (
        <div className="text-center p-12">
          <p className="text-lg text-muted-foreground">Tidak ada surah yang ditemukan</p>
          <p className="text-sm text-muted-foreground mt-2">
            Coba ubah kata kunci pencarian Anda
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah, index) => (
            <div
              key={surah.number}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SurahCard
                surah={surah}
                onClick={() => onSurahSelect(surah.number)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};