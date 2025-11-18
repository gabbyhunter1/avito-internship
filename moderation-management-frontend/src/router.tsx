import { Navigate, Route, Routes } from 'react-router';
import ListPage from '@/app/routes/list/page.tsx';
import ItemPage from '@/app/routes/item/:id/page.tsx';
import NotFound from '@/app/routes/not-found.tsx';
import StatsPage from '@/app/routes/stats/page.tsx';
import Layout from '@/app/layout.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
