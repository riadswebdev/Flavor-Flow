import { toast } from "@heroui/react";

const Toast = ({ recipeName }) => {
  return toast.success(`Recipe purchased successfully! (${recipeName})`);
};

export default Toast;
