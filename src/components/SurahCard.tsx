import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download, Share2 } from 'lucide-react';

interface SurahCardProps {
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  onClick: () => void;
}

export const SurahCard = ({ surah, onClick }: SurahCardProps) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Surah ${surah.englishName}`,
        text: `${surah.englishNameTranslation} - ${surah.numberOfAyahs} ayat`,
        url: window.location.href
      });
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement PDF download functionality
    console.log('Download surah:', surah.name);
  };

  return (
    <Card 
      className="islamic-card cursor-pointer group hover:scale-[1.02] transform transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
              {surah.number}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{surah.englishName}</h3>
              <p className="text-sm text-muted-foreground">{surah.englishNameTranslation}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="arabic-text text-xl font-bold text-primary">{surah.name}</p>
            <p className="text-sm text-muted-foreground">{surah.revelationType}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {surah.numberOfAyahs} ayat
            </span>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};