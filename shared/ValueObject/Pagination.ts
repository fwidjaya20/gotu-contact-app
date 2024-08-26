export interface Pagination {
  limit?: number;
  pages?: number;
}

export namespace Pagination {
  const defaultLimit: number = 10;
  const defaultPages: number = 1;

  export function toJson(dto: Pagination): Record<string, any> {
    return {
      limit: dto.limit ?? defaultLimit,
      offset: getOffset(dto),
    };
  }

  export function getOffset({
    limit = defaultLimit,
    pages = defaultPages,
  }: Pagination): number {
    return Math.ceil((pages - 1) * limit);
  }
}

export interface PaginationMetadata {
  hasPreviousData?: boolean;
  hasNextData?: boolean;
}
