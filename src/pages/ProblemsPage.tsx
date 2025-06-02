import Header from "@/components/Header";
import ProblemCard from "@/components/ProblemCard";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useProblemStore } from "@/store/useProblemStore";
import { useEffect } from "react";
import { useQueryStore } from "@/store/useQueryStore";
// import { parseJSON } from "date-fns";
// 
const ProblemsPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const { setPage } = useQueryStore();
  const [searchParams] = useSearchParams();
  const {
    problems,
    isProblemsLoading,
    applyFilters,
    filteredProblems,
  } = useProblemStore();

  useEffect(() => {
    const query: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }
    applyFilters(query,userInfo.id);
  }, [searchParams, applyFilters]);

  const handleLoadMore = () => {
    if (problems) {
      setPage(problems.pagination.currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
              Problems
            </h1>
            <p className="text-craft-text-secondary">
              Sharpen your coding skills with our curated problems
            </p>
          </div>
          <Link to="/problems/create">
            <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
              <Plus className="w-4 h-4 mr-2" />
              Create Problem
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Problems List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-craft-text-primary">
              All Problems
            </h2>
            <div className="flex items-center space-x-2 text-sm text-craft-text-secondary">
              {problems && <span>{problems.pagination.message}</span>}
            </div>
          </div>

          <div className="grid gap-4">
            {isProblemsLoading && (
              <div className="flex items-center justify-center text-white">
                Loading...
              </div>
            )}
            {!isProblemsLoading &&
              (searchParams ? filteredProblems : problems.problems)?.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
          </div>
        </div>

        {/* Load More */}
        {problems && problems.pagination.currentPage < problems.pagination.totalPages && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent transition-all duration-200"
              onClick={handleLoadMore}
            >
              Load More Problems
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
