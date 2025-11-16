// =========================
// Enums & string unions
// =========================

export const StatusArray = ['pending', 'approved', 'rejected', 'draft'] as const;
export type Status = (typeof StatusArray)[number];

export const AdPriorityArray = ['normal', 'urgent'] as const;
export type AdPriority = (typeof AdPriorityArray)[number];

export type ModerationAction = 'approved' | 'rejected' | 'requestChanges';

export type SortBy = 'createdAt' | 'price' | 'priority';

export type SortOrder = 'asc' | 'desc';

export type StatsPeriod = 'today' | 'week' | 'month' | 'custom';

export type ModerationReason =
  | 'Запрещенный товар'
  | 'Неверная категория'
  | 'Некорректное описание'
  | 'Проблемы с фото'
  | 'Подозрение на мошенничество'
  | 'Другое';

export const CategoryMap = {
  Недвижимость: 1,
  Транспорт: 2,
  Работа: 3,
  Услуги: 4,
  Животные: 5,
  Мода: 6,
  Детское: 7,
} as const;

export type CategoryName = keyof typeof CategoryMap;

export const Categories = Object.keys(CategoryMap) as CategoryName[];

// =========================
// Core schemas (components/schemas)
// =========================

export interface Seller {
  id: number;
  name: string;
  rating?: string;
  totalAds: number;
  registeredAt: string; // date-time
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: ModerationAction;
  reason: string | null;
  comment: string;
  timestamp: string; // date-time
}

export interface Advertisement {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  categoryId?: number;
  status: Status;
  priority: AdPriority;
  createdAt: string; // date-time
  updatedAt: string; // date-time
  images?: string[];
  seller: Seller;
  characteristics?: Record<string, string>;
  moderationHistory?: ModerationHistory[];
}

export interface PaginationAPIType {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface ModeratorStats {
  totalReviewed?: number;
  todayReviewed?: number;
  thisWeekReviewed?: number;
  thisMonthReviewed?: number;
  averageReviewTime?: number;
  approvalRate?: number;
}

export interface Moderator {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  statistics?: ModeratorStats;
  permissions?: string[];
}

// =========================
// Error response schemas
// =========================

export interface BadRequestResponse {
  error?: string;
  message?: string;
}

export interface NotFoundResponse {
  error?: string;
  id?: number;
}

export interface InternalServerErrorResponse {
  error?: string;
  message?: string;
}

// =========================
// /ads
// =========================

export interface GetAdsQuery {
  page?: number; // min 1, default 1
  limit?: number; // 1–100, default 10
  status?: Status[]; // multiple statuses
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: SortBy; // default createdAt
  sortOrder?: SortOrder; // default desc
}

export interface GetAdsResponse {
  ads: Advertisement[];
  pagination: PaginationAPIType;
}

// =========================
// /ads/{id}
// =========================

export interface GetAdByIdPathParams {
  id: number;
}

export type GetAdByIdResponse = Advertisement;

// =========================
// /ads/{id}/approve
// =========================

export interface ApproveAdPathParams {
  id: number;
}

export interface ApproveAdResponse {
  message: string;
  ad: Advertisement;
}

// =========================
// /ads/{id}/reject
// =========================

export interface RejectAdPathParams {
  id: number;
}

export interface RejectAdRequestBody {
  reason: ModerationReason;
  comment?: string;
}

export interface RejectAdResponse {
  message: string;
  ad: Advertisement;
}

// =========================
// /ads/{id}/request-changes
// =========================

export interface RequestChangesRequestBody {
  reason: ModerationReason;
  comment?: string;
}

export interface RequestChangesResponse {
  message: string;
  ad: Advertisement;
}

// =========================
// /stats/summary
// =========================

export interface StatsQueryBase {
  period?: StatsPeriod;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export type GetStatsSummaryQuery = StatsQueryBase;

export type GetStatsSummaryResponse = StatsSummary;

// =========================
// /stats/chart/activity
// =========================

export type GetActivityChartQuery = StatsQueryBase;

export type GetActivityChartResponse = ActivityData[];

// =========================
// /stats/chart/decisions
// =========================

export type GetDecisionsChartQuery = StatsQueryBase;

export type GetDecisionsChartResponse = DecisionsData;

// =========================
// /stats/chart/categories
// =========================

export type GetCategoriesChartQuery = StatsQueryBase;

// object with category name -> number
export type GetCategoriesChartResponse = Record<string, number>;

// =========================
// /moderators/me
// =========================

export type GetCurrentModeratorResponse = Moderator;
