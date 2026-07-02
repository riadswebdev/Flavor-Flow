"use client";

import { deleteRecipe } from "@/lib/actions/recipe";
import { AlertDialog, Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export function DeleteRecipe({ recipeId, recipeName = "this recipe" }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteRecipe(recipeId);
    if (result.success) {
      toast.success("Recipe deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete recipe");
    }
  };

  return (
    <AlertDialog>
      <Button
        size="sm"
        className="bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-2xl h-9 w-9 hover:bg-rose-500/20 hover:text-rose-600 transition-all active:scale-[0.95]"
      >
        <FiTrash2 />
     
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete recipe permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{recipeName}</strong> from
                your FlavorFlow collection. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Recipe
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
