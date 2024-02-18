// services/workService.ts
import { Work } from "../types";

// APIレスポンスの新しい型定義
interface WorksResponse {
  works: Work[];
  total_pages: number;
  current_page: number;
  total_count: number;
}

interface SearchParams {
  title_cont?: string;
  people_name_cont?: string;
  casts_character_name_cont?: string;
  year_eq?: string;
  season_eq?: string;
}

export const fetchWorks = async (
  page = 1,
  searchParams: SearchParams = {}
): Promise<WorksResponse> => {
  // Ransackが期待する形式に合わせて、検索パラメータを`q`オブジェクト内にネストする
  const ransackQueryParams = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [`q[${key}]`, value])
  );

  // ページパラメータと組み合わせる
  const queryParams = new URLSearchParams({
    page: page.toString(),
    ...ransackQueryParams,
  }).toString();

  const response = await fetch(
    `http://localhost:3021/api/v1/works?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch works.");
  }
  const data: WorksResponse = await response.json();
  return data;
};
