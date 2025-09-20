import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Heart, Globe, Users } from 'lucide-react';

export const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Al-Qur\'an Lengkap',
      description: 'Akses semua 114 surah dengan teks Arab, transliterasi, dan terjemahan Bahasa Indonesia'
    },
    {
      icon: Heart,
      title: 'Mudah Digunakan',
      description: 'Interface yang intuitif dan responsif untuk pengalaman membaca yang nyaman'
    },
    {
      icon: Globe,
      title: 'Akses Dimana Saja',
      description: 'Dapat diakses dari berbagai perangkat, kapan saja dan dimana saja'
    },
    {
      icon: Users,
      title: 'Untuk Semua',
      description: 'Dirancang untuk muslimin dan muslimah dari berbagai kalangan'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Tentang Al-Qur\'an Digital</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Platform digital untuk membaca dan mendengarkan Al-Qur\'an dengan fitur modern dan mudah digunakan
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="islamic-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Misi Kami</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg leading-relaxed">
              Al-Qur\'an Digital hadir untuk memudahkan umat Islam dalam mengakses dan mempelajari 
              Al-Qur\'an di era digital. Kami berkomitmen untuk menyediakan platform yang bersih, 
              mudah digunakan, dan dapat diakses oleh semua kalangan.
            </p>
            <div className="arabic-text text-2xl text-primary leading-relaxed">
              وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ
            </div>
            <p className="text-sm text-muted-foreground italic">
              "Dan Kami turunkan dari Al-Qur\'an suatu yang menjadi penawar dan rahmat bagi orang-orang mukmin"
              <br />
              (QS. Al-Isra: 82)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card 
            key={feature.title} 
            className="islamic-card hover:animate-islamic-glow"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Information */}
      <Card className="islamic-card">
        <CardHeader>
          <CardTitle className="text-center">Informasi Teknis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Sumber Data</h4>
              <p className="text-sm text-muted-foreground">
                Data Al-Qur\'an diambil dari API resmi equran.id yang telah terpercaya 
                dan diverifikasi oleh para ahli.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Teknologi</h4>
              <p className="text-sm text-muted-foreground">
                Dibangun menggunakan React, TypeScript, dan Tailwind CSS untuk 
                performa optimal dan pengalaman pengguna yang terbaik.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Responsif</h4>
              <p className="text-sm text-muted-foreground">
                Dapat diakses dengan sempurna dari desktop, tablet, dan smartphone 
                dengan tampilan yang menyesuaikan ukuran layar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Open Source</h4>
              <p className="text-sm text-muted-foreground">
                Proyek ini dikembangkan dengan semangat berbagi dan dapat digunakan 
                serta dikembangkan lebih lanjut oleh komunitas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center space-y-2 pb-8">
        <p className="text-muted-foreground">
          Semoga Allah SWT senantiasa memberikan kemudahan dalam mempelajari Al-Qur\'an
        </p>
        <p className="text-sm text-muted-foreground">
          Barakallahu fiikum
        </p>
      </div>
    </div>
  );
};