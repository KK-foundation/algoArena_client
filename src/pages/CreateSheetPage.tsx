import { useState } from "react";
import { z } from "zod";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import MarkdownEditor from "@/components/MarkdownEditor";
import { Save, Eye, Send, X, Code2, CheckCircle2, Loader } from "lucide-react";

import { availableTags } from "@/constents/tags";
import { useSheetStore } from "@/store/useSheetStore";
import { useNavigate } from "react-router-dom";

type visibility = "Public" | "Private";
export interface FormData {
  name: string;
  description: string;
  tags: string[];
  visibility: visibility;
}

// Zod validation schema
const problemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  visibility: z.enum(["Public", "Private"]),
});

const CreateSheetPage = () => {
  const navigate = useNavigate();
  const {createSheet,isSheetCreating} = useSheetStore();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    tags: [],
    visibility: "Private",
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = (): boolean => {
    try {
      const dataToValidate = {
        ...formData,
        tags: selectedTags,
      };

      problemSchema.parse(dataToValidate);
      setValidationErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        );
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (action: "preview" | "submit") => {
    const finalData = {
      ...formData,
      tags: selectedTags,
    };

    if (action === "submit") {
      if (!validateForm()) {
        console.error("Validation failed:", validationErrors);
        return;
      }

      const res = await createSheet(finalData);
      if(res.data.success){
        navigate("/sheets")
      }
    }
  };

  const isFormValid =
    formData.name && formData.description && selectedTags.length > 0;

  // --- End Sample Data and Load Functionality ---


  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* heading  */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
            Create Sheet
          </h1>
          <p className="text-craft-text-secondary">
            Design a new Sheet for the community
          </p>
        </div>

        {/* top validation error line  */}
        {validationErrors.length > 0 && (
          <Card className="bg-craft-error/10 border-craft-error/30 p-4 mb-6">
            <h3 className="text-craft-error font-semibold mb-2">
              Validation Errors:
            </h3>
            <ul className="text-craft-error text-sm space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </Card>
        )}

        <div className="grid grid-cols-1  gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-craft-panel border-craft-border p-6">
              {/* heading 2  */}
              <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="title" className="text-craft-text-primary">
                    Sheet Name *
                  </Label>
                  <Input
                    id="title"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter sheet name..."
                    className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                  />
                </div>

                {/* Description */}
                <MarkdownEditor
                  label="Problem Description *"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                  placeholder="Describe the problem in detail. You can use markdown formatting..."
                />
              </div>
            </Card>

            {/* Tags */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-craft-accent text-craft-bg hover:bg-craft-accent/80"
                        : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <br />
              <div>
                <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                  Visibility
                </h3>
                <div className="flex space-x-2 mt-2">
                  {(["Private", "Public"] as const).map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={
                        formData.visibility === level ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          visibility: level,
                        }))
                      }
                      className={
                        formData.visibility === level
                          ? "bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                          : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                      }
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Actions
              </h3>

              <div className="space-y-3">

                <Button
                  onClick={() => handleSubmit("submit")}
                  className="w-full bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                  disabled={!isFormValid || isSheetCreating}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSheetCreating ? "Loading..." : "Create Sheet"}
                </Button>
              </div>

              {!isFormValid && (
                <p className="text-craft-error text-sm mt-2">
                  Please fill in all required fields before submitting.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSheetPage;
