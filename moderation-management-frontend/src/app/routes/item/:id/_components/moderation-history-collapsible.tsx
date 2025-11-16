import * as React from 'react';
import { ChevronsUpDown, UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemTitle } from '@/components/ui/item.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/lib/utils.ts';
import { TypographyBlockquote } from '@/components/ui/TypographyBlockquote.tsx';
import { IconCalendar } from '@tabler/icons-react';
import type { ModerationAction, ModerationHistory } from '@/types/api/api.ts';

const ModerationHistoryCollapsible = ({ moderationHistory }: { moderationHistory: ModerationHistory[] | undefined }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const actionColors: Record<ModerationAction, string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
    requestChanges: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex max-w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Список из {moderationHistory?.length} элементов</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {moderationHistory?.length
          ? moderationHistory?.map(moderation => (
              <Item key={`${moderation.moderatorId}: ${moderation.moderatorName} - ${moderation.timestamp}`} variant="outline">
                <ItemContent>
                  <ItemTitle className="w-full justify-between">
                    <h3 className="flex justify-center items-center gap-2">
                      <UserIcon /> {moderation.moderatorName}
                    </h3>
                    <Badge className={cn(actionColors[moderation.action])}>{moderation.action}</Badge>
                  </ItemTitle>
                  <ItemDescription>{moderation.reason}</ItemDescription>
                  <div>{TypographyBlockquote(moderation.comment)}</div>
                </ItemContent>
                <ItemFooter className="justify-end">
                  <Badge>
                    <IconCalendar /> {new Date(moderation.timestamp).toLocaleDateString('ru-RU')},{' '}
                    {new Date(moderation.timestamp).toLocaleTimeString('ru-RU')}
                  </Badge>
                </ItemFooter>
              </Item>
            ))
          : null}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ModerationHistoryCollapsible;
