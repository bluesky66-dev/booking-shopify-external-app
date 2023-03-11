import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/pkg.backend-types";
import {
  AbilityCan,
  HelperArray,
  ProductStaffEmpty,
  StaffResourceList,
  usePosition,
  useTag,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";
import { AlphaCard, Avatar, Box, Button, Stack, Text } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";
import { useCallback, useContext, useMemo } from "react";
import FormContext from "./form-context";

interface StaffListProps {
  action: () => void;
}

export const StaffList = ({ action }: StaffListProps) => {
  const { selectTagLabel } = useTag();
  const { selectPosition } = usePosition();
  const { field } = useContext(FormContext);

  const renderItem = useCallback(
    ({ fullname, avatar, position, tag }: ProductServiceUpdateBodyStaffProperty) => {
      return {
        media: <Avatar customer size="medium" name={fullname} source={avatar} />,
        title: `${fullname}, ${selectPosition(position)}`,
        desc: selectTagLabel(tag),
      };
    },
    [action, selectPosition, selectTagLabel],
  );

  const items = useMemo(() => [...field.value].sort(HelperArray.sortByText((d) => d.fullname)), [field]);

  return (
    <AlphaCard padding="0">
      <StaffListHeader itemsLength={items.length} action={action} />
      <StaffResourceList emptyState={<ProductStaffEmpty action={action} />} items={items} renderItem={renderItem} />
    </AlphaCard>
  );
};

type StaffListHeader = {
  itemsLength: number;
  action: () => void;
};

const StaffListHeader = ({ itemsLength, action }: StaffListHeader) => {
  const { t, tdynamic } = useTranslation({
    id: "product-staff-list",
    locales: {
      da: {
        title: "Medarbejder",
        browse: "Tilføj/fjern medarbejder",
        staff: {
          other: "{count} medarbejder tilføjet",
          zero: "Tillføje medarbejder til dette produkt",
        },
      },
      en: {
        title: "Staff",
        browse: "Add/remove staff",
        staff: {
          other: "{count} staff added",
          zero: "Add staff to this product",
        },
      },
    },
  });

  const { product } = useContext(FormContext);

  return (
    <>
      <Box padding="4">
        <Text as="h1" variant="bodyLg" fontWeight="bold">
          {t("title")}
        </Text>
      </Box>
      <Box paddingInlineStart="4" paddingInlineEnd="4" paddingBlockEnd="4">
        <Stack alignment="center">
          <Stack.Item fill>
            <Text as="h2" variant="bodyLg">
              {tdynamic("staff", {
                count: itemsLength || 0,
              })}
            </Text>
          </Stack.Item>
          <AbilityCan I="update" a="product" this={product}>
            <Button size="slim" onClick={action} outline icon={PlusMinor}>
              {t("browse")}
            </Button>
          </AbilityCan>
        </Stack>
      </Box>
    </>
  );
};