import { useTranslation } from "@hooks";
import { Card, EmptyState } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { t } = useTranslation("staff", { keyPrefix: "empty" });

  const props = { onAction: () => navigate("/Staff/New") };

  return (
    <Card sectioned>
      <EmptyState
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        heading={t("heading")}
        action={{
          content: t("add"),
          ...props,
        }}
      >
        <p>{t("text")}</p>
      </EmptyState>
    </Card>
  );
};
