import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SurahList } from '@/components/SurahList';
import { SurahDetail } from '@/components/SurahDetail';
import { AboutPage } from '@/components/AboutPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedSurah(null);
  };

  const handleSurahSelect = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    setCurrentPage('surah-detail');
  };

  const handleBackToList = () => {
    setSelectedSurah(null);
    setCurrentPage('home');
  };

  const renderContent = () => {
    if (currentPage === 'surah-detail' && selectedSurah) {
      return (
        <SurahDetail 
          surahNumber={selectedSurah} 
          onBack={handleBackToList}
        />
      );
    }

    switch (currentPage) {
      case 'home':
      case 'surah':
        return <SurahList onSurahSelect={handleSurahSelect} />;
      case 'tentang':
        return <AboutPage />;
      default:
        return <SurahList onSurahSelect={handleSurahSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      {/* Islamic pattern background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default Index;