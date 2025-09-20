import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, Download, Share2 } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

interface SurahDetailProps {
  surahNumber: number;
  onBack: () => void;
}

export const SurahDetail = ({ surahNumber, onBack }: SurahDetailProps) => {
  const [surahData, setSurahData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);

  useEffect(() => {
    fetchSurahDetail();
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [surahNumber]);

  const fetchSurahDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
      const data = await response.json();
      setSurahData(data.data);
    } catch (error) {
      console.error('Error fetching surah detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const playAyah = (ayah: Ayah) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingAyah === ayah.nomorAyat) {
      setPlayingAyah(null);
      setCurrentAudio(null);
      return;
    }

    const audioUrl = ayah.audio["01"] || Object.values(ayah.audio)[0];
    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    setPlayingAyah(ayah.nomorAyat);

    audio.onended = () => {
      setPlayingAyah(null);
      setCurrentAudio(null);
    };
  };

  const handleShare = () => {
    if (navigator.share && surahData) {
      navigator.share({
        title: `Surah ${surahData.nama_latin}`,
        text: `${surahData.arti} - ${surahData.jumlah_ayat} ayat`,
        url: window.location.href
      });
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Download surah:', surahData?.nama_latin);
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Memuat surah..." />;
  }

  if (!surahData) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Surah tidak ditemukan</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="islamic-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h1 className="arabic-text text-4xl font-bold text-primary">{surahData.nama}</h1>
            <div>
              <h2 className="text-2xl font-bold">{surahData.nama_latin}</h2>
              <p className="text-lg text-muted-foreground">{surahData.arti}</p>
              <p className="text-sm text-muted-foreground">
                {surahData.tempat_turun} • {surahData.jumlah_ayat} ayat
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bismillah */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <Card className="islamic-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="arabic-text text-2xl text-primary leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="mt-2 text-sm text-muted-foreground italic">
                Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ayahs */}
      <div className="space-y-4">
        {surahData.ayat?.map((ayah: Ayah) => (
          <Card key={ayah.nomorAyat} className="islamic-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Ayah number and controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {ayah.nomorAyat}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => playAyah(ayah)}
                    className="hover:bg-accent"
                  >
                    {playingAyah === ayah.nomorAyat ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Arabic text */}
                <div className="arabic-text text-2xl leading-loose text-foreground text-right">
                  {ayah.teksArab}
                </div>

                {/* Transliteration */}
                <div className="text-sm italic text-muted-foreground">
                  {ayah.teksLatin}
                </div>

                {/* Indonesian translation */}
                <div className="text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4">
                  {ayah.teksIndonesia}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};