import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Heart, AlertCircle } from "lucide-react";
import AddEditProblemModal from "@/components/AddEditProblemModal";
import SheetProblemCard from "@/components/SheetProblemCard";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSheetStore } from "@/store/useSheetStore";

// Interfaces remain unchanged
export interface Problem {
  id: string;
  name: string;
  description?: string;
  likes: number;
  dislikes: number;
  questions: number;
  tags: string[];
  status: "Not Started" | "Solving" | "Done";
  addedDate: Date | string;
  solvedBy: string[];
}

interface UserInfo {
  id: string;
  name?: string;
  email?: string;
}

interface Sheet {
  id: string;
  name: string;
  description?: string;
  userId: string;
  tags?: string[];
  likes: string[];
  problems: Problem[];
}

const SheetProblemManagerPage = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Store hooks
  const { 
    isGettingSheetById, 
    getSheetById, 
    currentSheet, 
    liked,
    error: sheetError 
  } = useSheetStore();

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [like, setLike] = useState(0); // 0 = not liked, 1 = liked

  // Memoized user info
  const userInfo = useMemo((): UserInfo | null => {
    try {
      const stored = localStorage.getItem("userInfo");
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      if (!parsed.id) {
        console.warn("Invalid user info: missing id");
        return null;
      }
      return parsed;
    } catch (error) {
      console.error("Failed to parse user info:", error);
      return null;
    }
  }, []);

  // Initialize like state based on currentSheet
  useEffect(() => {
    if (userInfo && currentSheet?.likes) {
      setLike(currentSheet.likes.includes(userInfo.id) ? 1 : 0);
    }
  }, [currentSheet, userInfo]);

  // Memoized computed values
  const isSheetOwner = useMemo(() => {
    return userInfo && currentSheet && currentSheet.userId === userInfo.id;
  }, [userInfo, currentSheet]);

  // Calculate current likes count
  const currentLikes = useMemo(() => {
    if (!currentSheet?.likes || !userInfo) return [];
    const baseLikes = currentSheet.likes;
    if (like === 1 && !baseLikes.includes(userInfo.id)) {
      return [...baseLikes, userInfo.id];
    } else if (like === 0 && baseLikes.includes(userInfo.id)) {
      return baseLikes.filter(id => id !== userInfo.id);
    }
    return baseLikes;
  }, [currentSheet?.likes, like, userInfo]);

  const userLikesSheet = like === 1;

  const solvedProblemsCount = useMemo(() => {
    if (!currentSheet?.problems || !userInfo) return 0;
    return currentSheet.problems.filter(problem => 
      problem.solvedBy?.includes(userInfo.id)
    ).length;
  }, [currentSheet, userInfo]);

  const progressPercentage = useMemo(() => {
    if (!currentSheet?.problems?.length) return 0;
    return (solvedProblemsCount / currentSheet.problems.length) * 100;
  }, [solvedProblemsCount, currentSheet]);

  // Like handler
  const handleLike = useCallback(async () => {
    if (!userInfo || !sheetId || isLikeLoading) return;

    setIsLikeLoading(true);
    const newLikeState = like === 0 ? 1 : 0;
    setLike(newLikeState);

    try {
      await liked(userInfo.id, sheetId);
      toast({
        title: newLikeState === 1 ? "Liked" : "Unliked",
        description: `Sheet ${newLikeState === 1 ? "liked" : "unliked"} successfully.`,
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLike(like); // Revert to previous state
      toast({
        title: "Error",
        description: "Failed to update like status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLikeLoading(false);
    }
  }, [userInfo, sheetId, liked, isLikeLoading, like, toast]);

  // Rest of the handlers remain unchanged
  const handleAddProblem = useCallback((problemData: Omit<Problem, "id" | "addedDate">) => {
    const newProblem: Problem = {
      ...problemData,
      id: Date.now().toString(),
      addedDate: new Date(),
      solvedBy: [],
    };
    setIsModalOpen(false);
    toast({
      title: "Problem Added",
      description: `"${problemData.name}" has been added to the sheet.`,
    });
  }, [toast]);

  const handleEditProblem = useCallback((
    problemData: Omit<Problem, "id" | "addedDate">
  ) => {
    if (!editingProblem) return;
    setEditingProblem(null);
    setIsModalOpen(false);
    toast({
      title: "Problem Updated",
      description: `"${problemData.name}" has been updated.`,
    });
  }, [editingProblem, toast]);

  const handleDeleteProblem = useCallback((problem: Problem) => {
    setProblemToDelete(problem);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDeleteProblem = useCallback(() => {
    if (!problemToDelete) return;
    setDeleteDialogOpen(false);
    setProblemToDelete(null);
    toast({
      title: "Problem Deleted",
      description: `"${problemToDelete.name}" has been removed from the sheet.`,
    });
  }, [problemToDelete, toast]);

  const handleStatusChange = useCallback((
    problemId: string,
    newStatus: Problem["status"]
  ) => {
    const problem = currentSheet?.problems?.find(p => p.id === problemId);
    if (!problem) return;
    toast({
      title: "Status Updated",
      description: `"${problem.name}" marked as ${newStatus}.`,
    });
  }, [currentSheet, toast]);

  const openEditModal = useCallback((problem: Problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProblem(null);
  }, []);

  // Effects
  useEffect(() => {
    if (!userInfo) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view this sheet.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!sheetId) {
      toast({
        title: "Invalid Sheet",
        description: "Sheet ID is required.",
        variant: "destructive",
      });
      navigate("/sheets");
      return;
    }

    if (!currentSheet || currentSheet.id !== sheetId) {
      getSheetById(sheetId);
    }
  }, [sheetId, userInfo, currentSheet, getSheetById, navigate, toast]);

  // Handle sheet error
  useEffect(() => {
    if (sheetError) {
      toast({
        title: "Error Loading Sheet",
        description: sheetError,
        variant: "destructive",
      });
      navigate("/sheets");
    }
  }, [sheetError, navigate, toast]);

  // Loading state
  if (isGettingSheetById) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-craft-accent mx-auto mb-4"></div>
              <p className="text-craft-text-secondary">Loading sheet...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state or missing sheet
  if (!currentSheet) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <Card className="bg-craft-panel border-craft-border p-8 text-center">
              <AlertCircle className="w-12 h-12 text-craft-text-secondary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-craft-text-primary mb-2">
                Sheet Not Found
              </h2>
              <p className="text-craft-text-secondary mb-4">
                The sheet you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button
                onClick={() => navigate("/sheets")}
                className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
              >
                Back to Sheets
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2 break-words">
              {currentSheet.name}
            </h1>
            {currentSheet.description && (
              <p className="text-craft-text-secondary break-words">
                {currentSheet.description}
              </p>
            )}
          </div>
          
          {isSheetOwner && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Problem
            </Button>
          )}
        </div>

        {/* Tags */}
        {currentSheet.tags && currentSheet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {currentSheet.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-craft-text-secondary border-craft-border"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Like Section */}
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={handleLike}
            disabled={isLikeLoading}
            className={`flex items-center space-x-1 transition-all duration-200 disabled:opacity-75 hover:scale-105 text-craft-text-secondary hover:text-craft-accent`}
            title={isLikeLoading ? "Updating like..." : "Toggle like"}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                userLikesSheet ? "text-red-500 fill-red-500 scale-110" : ""
              } ${isLikeLoading ? "animate-pulse" : ""}`}
              style={{
                filter: userLikesSheet ? 'drop-shadow(0 0 2px rgba(239, 68, 68, 0.5))' : 'none'
              }}
            />
            <span className={`text-sm font-medium transition-all duration-200 ${
              isLikeLoading ? "animate-pulse" : ""
            } ${userLikesSheet ? 'text-red-500' : ''}`}>
              {currentLikes.length}
            </span>
            {isLikeLoading && (
              <div className="w-3 h-3 border border-craft-accent border-t-transparent rounded-full animate-spin ml-1" />
            )}
          </button>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="h-2 bg-craft-bg rounded-full overflow-hidden w-full mb-2">
            <div
              className="h-full bg-gradient-to-r from-craft-accent to-craft-accent-secondary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-craft-text-secondary text-end text-sm">
            {solvedProblemsCount}/{currentSheet.problems?.length || 0} solved
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {!currentSheet.problems || currentSheet.problems.length === 0 ? (
            <Card className="bg-craft-panel border-craft-border">
              <div className="p-12 text-center">
                <p className="text-craft-text-secondary mb-4">
                  No problems in this sheet yet
                </p>
                {isSheetOwner && (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Problem
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            currentSheet.problems.map((problem) => (
              <SheetProblemCard
                key={problem.id}
                problem={problem}
                onEdit={isSheetOwner ? openEditModal : undefined}
                onDelete={isSheetOwner ? handleDeleteProblem : undefined}
                onStatusChange={handleStatusChange}
                isOwner={isSheetOwner}
              />
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Problem Modal - Only for sheet owners */}
      {isSheetOwner && (
        <AddEditProblemModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingProblem ? handleEditProblem : handleAddProblem}
          editingProblem={editingProblem}
        />
      )}

      {/* Delete Confirmation Dialog - Only for sheet owners */}
      {isSheetOwner && (
        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <AlertDialogContent className="bg-craft-panel border-craft-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-craft-text-primary">
                Delete Problem
              </AlertDialogTitle>
              <AlertDialogDescription className="text-craft-text-secondary">
                Are you sure you want to delete "{problemToDelete?.name}"? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteProblem}
                className="bg-craft-error hover:bg-craft-error/80 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SheetProblemManagerPage;