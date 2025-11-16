import AdCard from '@/app/routes/list/_components/ad-card/ad-card.tsx';
import type { Advertisement } from '@/types/api/api.ts';

const AdsList = ({ ads }: { ads: Advertisement[] | undefined }) => {
  if (ads === undefined) return null;

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
      {ads.map(ad => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default AdsList;
