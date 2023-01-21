import { Modal, Tabs } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useRef, useState } from "react";
import { CreateManyShiftsModal } from "./create-many-shifts-form";
import { CreateOneShiftModal } from "./create-one-shift-form";
import {
  CreateManyShiftsRefMethod,
  CreateOneShiftRefMethod,
  LoadingSpinner,
} from "@jamalsoueidan/bsf.bsf-pkg";

const CreateManyShiftsForm = lazy(() =>
  import("./create-many-shifts-form").then((module) => ({
    default: module.CreateManyShiftsModal,
  }))
);

const CreateOneShiftForm = lazy(() =>
  import("./create-one-shift-form").then((module) => ({
    default: module.CreateOneShiftModal,
  }))
);

export default ({ info, setInfo }: any) => {
  const ref = useRef<CreateManyShiftsRefMethod | CreateOneShiftRefMethod>();
  const toggleActive = useCallback(() => setInfo(null), []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const submit = useCallback(() => {
    const noErrors = ref.current.submit().length === 0;
    setLoading(true);
    if (noErrors) {
      setInfo(null);
    }
  }, [ref]);

  const tabs = [
    {
      id: "create-all",
      content: "Create for range",
    },
    {
      id: "create-day",
      content: `Create for day`,
    },
  ];

  return (
    <Modal
      open={true}
      onClose={toggleActive}
      title="New availability"
      primaryAction={{
        content: `${tabs[selected].content}`,
        onAction: submit,
        loading,
      }}
      secondaryActions={[
        {
          content: "Luk",
          onAction: toggleActive,
        },
      ]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Modal.Section>
          {tabs[selected].id === "create-day" ? (
            <Suspense fallback={<LoadingSpinner />}>
              <CreateOneShiftForm ref={ref} date={info.dateStr} />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <CreateManyShiftsForm ref={ref} date={info.dateStr} />
            </Suspense>
          )}
        </Modal.Section>
      </Tabs>
    </Modal>
  );
};
