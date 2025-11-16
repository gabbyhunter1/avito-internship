import { useParams } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Item, ItemDescription, ItemTitle } from '@/components/ui/item.tsx';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import ImageCarousel from '@/app/routes/item/:id/_components/image-carousel.tsx';
import { useQuery } from '@tanstack/react-query';
import { getAdById } from '@/features/ad/api/getAd.ts';
import ModerationButtons from '@/app/routes/item/:id/_components/moderation-buttons.tsx';
import ModerationHistoryCollapsible from '@/app/routes/item/:id/_components/moderation-history-collapsible.tsx';
import NotFound from '@/app/routes/not-found.tsx';

const ItemPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['adsByID', Number(id)],
    queryFn: () => getAdById(id),
  });

  if (error) return <NotFound />;

  if (!data) return null;

  const ad = data;
  const { title, images } = ad;

  const { characteristics } = ad;

  const { moderationHistory } = ad;

  const { seller } = ad;

  return (
    <div className="flex h-full justify-center mt-20 pb-60">
      <div className="max-w-5xl w-full bg-secondary rounded-3xl">
        <div className="p-4 pb-16">
          <h1 className="sr-only">{title}</h1>
          <div className="flex flex-col items-center gap-2">
            <ImageCarousel images={images} />

            <Card className="w-full max-w-md p-5">
              <CardHeader>
                <CardTitle>
                  <h2>История модерации</h2>
                </CardTitle>
                {}
                {moderationHistory?.length ? (
                  <CardDescription>Здесь указана история модерации данного объявления</CardDescription>
                ) : (
                  <CardDescription>Пусто</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <ModerationHistoryCollapsible moderationHistory={moderationHistory} />
              </CardContent>
            </Card>
          </div>

          <section className="mt-5">
            <Card>
              <CardHeader className="justify-center text-center">
                <CardTitle>
                  <h2>Полное описание</h2>
                </CardTitle>
                <CardDescription>Развернутая информация по объявлению</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="flex justify-center max-w-md">
                    <Table>
                      <TableBody>
                        {Object.entries(characteristics).map(([key, value]) => (
                          <TableRow key={key} className="*:border-border [&>:not(:last-child)]:border-r">
                            <TableCell className="font-medium w-1/3">{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="flex justify-center mt-5">
            <Card className="w-full w-full">
              <CardHeader className="flex flex-col justify-center items-center text-center">
                <CardTitle>
                  <h2>Продавец</h2>
                </CardTitle>
                <CardDescription>Информация о продавце</CardDescription>
              </CardHeader>
              <CardContent className="max-w-md mx-auto">
                <Item>
                  <ItemTitle>Имя:</ItemTitle>
                  <ItemDescription>{seller.name}</ItemDescription>
                </Item>
                <Item>
                  <ItemTitle>Рейтинг:</ItemTitle>
                  <ItemDescription>{seller.rating}</ItemDescription>
                </Item>
                <Item>
                  <ItemTitle>Дата регистрации:</ItemTitle>
                  <ItemDescription>
                    {new Date(seller.registeredAt).toLocaleDateString('ru-RU')}, {new Date(seller.registeredAt).toLocaleTimeString()}
                  </ItemDescription>
                </Item>
              </CardContent>
            </Card>
          </section>

          <ModerationButtons adId={Number(id)} />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
