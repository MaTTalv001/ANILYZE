// services/peopleService.ts
interface Person {
  id: number;
  name: string;
  birthday: string;
  official_site_url: string;
  twitter_url: string;
}

// APIレスポンスの型定義
interface PeopleResponse {
  people: Person[];
  total_pages: number;
  current_page: number;
  total_count: number;
}

// 特定のページの声優リストをフェッチする関数
export const fetchPeople = async (page = 1): Promise<PeopleResponse> => {
  const response = await fetch(
    `http://localhost:3021/api/v1/people?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch people.");
  }
  const data: PeopleResponse = await response.json();
  return data;
};
