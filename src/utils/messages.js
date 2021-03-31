export const showErrorMessage = (toast, title, description) => {
  toast.current.show({
    severity: "error",
    summary: title,
    detail: description,
    life: 3000,
  });
};

export const showSuccessMessage = (toast, title, description) => {
  toast.current.show({
    severity: "success",
    summary: title,
    detail: description,
    life: 3000,
  });
};
