export const getApiErrorMessage = (
  error: any,
  fallback = "Something went wrong",
) => {
  const errors =
    error?.response?.data?.errors || error?.errors || error?.data?.errors;

  if (Array.isArray(errors) && errors.length > 0) {
    return errors
      .map((item: any) => item?.message)
      .filter(Boolean)
      .join("\n");
  }

  return error?.response?.data?.message || error?.message || fallback;
};
