import BusinessCard from '@/components/BusinessCard';
import personalInfo from '@/config/personal-info.json';

export default function App() {
  return (
    <main>
      <BusinessCard info={personalInfo} />
    </main>
  );
}
