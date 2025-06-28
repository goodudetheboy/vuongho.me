import BusinessCard from '@/components/BusinessCard';
import personalInfo from '@/config/personal-info.json';

export default function Home() {
  return (
    <main>
      <BusinessCard info={personalInfo} />
    </main>
  );
}
