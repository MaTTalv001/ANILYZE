// pages/people/index.tsx
import { useState, useEffect } from "react";
import PersonTable from "../../components/PersonTable";
import Pagination from "../../components/Pagination"; // Paginationコンポーネントをインポート
import Loading from "../../components/Loading"; // Loadingコンポーネントをインポート（必要に応じて）
import { fetchPeople } from "../../services/peopleService"; // fetchPeople関数をインポート

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPeople(currentPage);
        setPeople(data.people);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to load people:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, [currentPage]); // currentPageが変更された時にloadPeopleを再実行

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="flex justify-center text-2xl font-bold my-4">
        声優リスト
      </h1>
      <div className="m-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <PersonTable people={people} />
      <div className="mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PeoplePage;
