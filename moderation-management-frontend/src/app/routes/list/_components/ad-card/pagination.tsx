import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import type { GetAdsQuery, PaginationAPIType } from '@/types/api/api.ts';
import type { Dispatch, SetStateAction } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';

const PaginationMenu = ({ pagination, setFilters }: { pagination?: PaginationAPIType; setFilters: Dispatch<SetStateAction<GetAdsQuery>> }) => {
  if (!pagination) return null;

  const { currentPage, totalPages } = pagination;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    if (pageFromUrl !== currentPage && pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      setFilters(prev => ({
        ...prev,
        page: pageFromUrl,
      }));
    }
  }, [searchParams, currentPage, totalPages, setFilters]);

  if (totalPages === 0) return null;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', p.toString());
    navigate(`?${newSearchParams.toString()}`, { replace: false });

    setFilters(prev => ({
      ...prev,
      page: p,
    }));
  };

  const getPages = () => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <Pagination>
        <PaginationContent className="flex flex-wrap gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault();
                goToPage(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === '...' ? (
              <PaginationItem key={`dots-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  onClick={e => {
                    e.preventDefault();
                    goToPage(p);
                  }}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault();
                goToPage(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationMenu;
