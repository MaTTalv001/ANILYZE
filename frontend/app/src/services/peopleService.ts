// services/peopleService.ts
interface Person {
  id: number;
  name: string;
  birthday: string;
  official_site_url: string;
  twitter_url: string;
}
interface SearchParams {
  name_cont?: string;
}

// APIレスポンスの型定義
interface PeopleResponse {
  people: Person[];
  total_pages: number;
  current_page: number;
  total_count: number;
}

export const fetchPeople = async (
  page = 1,
  searchParams: SearchParams = {}
): Promise<PeopleResponse> => {
  // Ransackが期待する形式に合わせて、検索パラメータを`q`オブジェクト内にネストする
  const ransackQueryParams = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [`q[${key}]`, value])
  );
  console.log(searchParams);
  console.log(ransackQueryParams);

  // ページパラメータと検索パラメータを組み合わせる
  const queryParams = new URLSearchParams({
    page: page.toString(),
    ...ransackQueryParams,
  }).toString();

  const response = await fetch(
    `http://localhost:3021/api/v1/people?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch people.");
  }
  const data: PeopleResponse = await response.json();
  return data;
};
