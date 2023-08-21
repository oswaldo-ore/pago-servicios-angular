export interface PaginationModel<T> {
  total:number;
  totalPages: number;
  currentPage: number;
  data: T[];
}
