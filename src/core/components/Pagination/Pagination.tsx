import { Pagination as PaginationComponent, PaginationProps } from '@mui/material';

export function Pagination({ count, onChange, ...other }: PaginationProps) {
  return <PaginationComponent count={count} onChange={onChange} {...other} />;
}
