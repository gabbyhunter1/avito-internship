import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from '@/components/ui/expandable';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, BadgeRussianRuble } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import type { AdPriority, Advertisement, Status } from '@/types/api/api.ts';
import { IconCalendar, IconCategory } from '@tabler/icons-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils.ts';

const AdCard = ({ ad }: { ad: Advertisement }) => {
  const { title, description, price, status, category, createdAt, priority, id } = ad;
  const formattedDate = new Date(createdAt);

  const date = formattedDate.toLocaleDateString('ru-RU');
  const time = formattedDate.toLocaleTimeString('ru-RU');

  const statusColors: Record<Status, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
    draft: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
  };

  const priorityColors: Record<AdPriority, string> = {
    normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Expandable expandDirection="both" expandBehavior="replace" initialDelay={0.2}>
      {() => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 350, height: 470 }}
            expandedSize={{ width: 370, height: 580 }}
            hoverToExpand={false}
            expandDelay={200}
            collapseDelay={500}>
            <ExpandableCardHeader>
              <div className="flex justify-between items-center justify-center w-full">
                <div className="flex items-center justify-center flex-col gap-3">
                  <div className="w-full flex justify-between">
                    <Badge variant="secondary" className={cn(statusColors[status])}>
                      {status}
                    </Badge>
                    <Badge className={cn(priorityColors[priority])}>{priority}</Badge>
                    <Button size="icon-sm" variant="secondary" asChild>
                      <Link to={`/item/${id}`}>
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  </div>
                  <img
                    src="https://placehold.co/230x190?text=Image"
                    width={230}
                    height={190}
                    alt={`Фотография товара ${title}`}
                    className="rounded-xl"
                  />
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white text-center">{title}</h3>
                </div>
              </div>
            </ExpandableCardHeader>
            <ExpandableCardContent>
              <div className="flex flex-col items-start justify-between mb-4">
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Badge>
                    <BadgeRussianRuble />
                    {price}
                  </Badge>
                  <Badge>
                    <IconCategory />
                    {category}
                  </Badge>
                  <Badge>
                    <IconCalendar />
                    {date}, {time}
                  </Badge>
                </div>
              </div>
              <ExpandableContent preset="blur-md" stagger staggerChildren={0.2}>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">{description}</p>
              </ExpandableContent>
            </ExpandableCardContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
};

export default AdCard;
