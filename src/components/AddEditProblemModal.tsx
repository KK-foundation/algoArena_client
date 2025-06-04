
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Problem } from "@/pages/SheetProblemManagerPage";
import { useProblemStore } from "@/store/useProblemStore";

interface AddEditProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemData: Omit<Problem, 'id' | 'addedDate'>) => void;
  editingProblem?: Problem | null;
}



const AddEditProblemModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingProblem 
}: AddEditProblemModalProps) => {
  const {getAllProblems,problems} = useProblemStore();
  

 

  useEffect(() => {
    if(problems.problems.length <= 0){
      getAllProblems();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-craft-text-primary">
            {editingProblem ? "Edit Problem" : "Add New Problem"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Name */}
          <div className="space-y-2">
            
          </div>

         

          
          

          

          

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              {editingProblem ? "Update Problem" : "Add Problem"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProblemModal;