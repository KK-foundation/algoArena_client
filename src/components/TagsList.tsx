import { Badge } from "@/components/ui/badge";

interface TagsListProps {
  tags: string[];
  maxVisible?: number;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
  tagClassName?: string;
}

const TagsList = ({ 
  tags, 
  maxVisible = 3, 
  variant = "outline",
  className = "",
  tagClassName = ""
}: TagsListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {visibleTags.map((tag) => (
        <Badge
          key={tag}
          variant={variant}
          className={`text-xs ${tagClassName}`}
        >
          {tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge
          variant={variant}
          className={`text-xs ${tagClassName}`}
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

export default TagsList;
