import { cn } from "@/components/ui/utils";
import {
  BadgeCheck,
  FileText,
  List,
  NotebookText,
  Receipt,
  ShoppingCart,
} from "lucide-react";

type Props = {
  name: string;
  color: string;
};

export const RenderIcon = ({ name, color }: Props) => {
  switch (name) {
    case "FileText":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <FileText className="w-6 h-6" />
        </div>
      );

    case "Receipt":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <Receipt className="w-6 h-6" />
        </div>
      );

    case "List":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <List className="w-6 h-6" />
        </div>
      );

    case "ShoppingCart":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <ShoppingCart className="w-6 h-6" />
        </div>
      );

    case "Check":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <BadgeCheck className="w-6 h-6" />
        </div>
      );

    case "NoteBookText":
      return (
        <div className={cn("p-3 rounded-full", color)}>
          <NotebookText className="w-6 h-6" />
        </div>
      );

    default:
      return null;
  }
};
