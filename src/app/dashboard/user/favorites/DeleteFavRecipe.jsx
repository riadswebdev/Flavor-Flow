"use client";

import { deleteFavRecipe } from "@/lib/actions/recipe";
import { getUserSession } from "@/lib/core/session";
import { AlertDialog, Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export function DeleteFavRecipe({ recipeId, recipeName = "this recipe" }) {
  const router = useRouter();

  const handleDelete = async () => {
    const user = await getUserSession();
    const userId = user?.id;
    const result = await deleteFavRecipe(recipeId, userId);
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
        variant="light"
        className="text-default-400 hover:text-danger text-lg"
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
