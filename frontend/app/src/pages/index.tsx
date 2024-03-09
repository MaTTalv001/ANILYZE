import { useEffect, useState } from "react";
import WorkCard from "../components/WorkCard";
import { fetchWorks } from "../services/workService";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import SearchForm from "../components/SearchForm"; // SearchFormをインポート
import { SearchParams } from "../types/SearchParams"; // SearchParamsを追加

const HomePage = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({}); // 検索パラメータの状態

  useEffect(() => {
    const loadWorks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWorks(currentPage, searchParams); // 検索パラメータを渡す
        setWorks(data.works);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to load works:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorks();
  }, [currentPage, searchParams]); // searchParamsを依存配列に追加

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params); // 検索フォームからの入力で検索パラメータを更新
    setCurrentPage(1); // 検索後は1ページ目に戻る
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-20 pb-5">
      <SearchForm onSearch={handleSearch} /> {/* 検索フォームの追加 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
      <div className="mb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
