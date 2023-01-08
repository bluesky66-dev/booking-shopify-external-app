import { useTranslation } from "@hooks/useTranslation";
import { useCallback, useMemo } from "react";

interface UseTagOptionsReturn {
  options: UseTagOptions[];
  select: (value: string) => string;
}

interface UseTagOptions {
  label: string;
  value: string;
}

export const usePosition = (): UseTagOptionsReturn => {
  const { t } = useTranslation("positions");

  const options: UseTagOptions[] = useMemo(
    () => [
      { label: t("makeup"), value: "1" },
      { label: t("hairdresser"), value: "2" },
    ],
    []
  );

  const select = useCallback(
    (value: string) => {
      return options.find((o) => o.value === value)?.label || "";
    },
    [options]
  );

  return {
    options,
    select,
  };
};
