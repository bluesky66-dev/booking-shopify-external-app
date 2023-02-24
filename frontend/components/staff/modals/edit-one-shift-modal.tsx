import { Schedule } from "@jamalsoueidan/pkg.bsb-types";
import {
  LoadingSpinner,
  ScheduleFormOneShiftBody,
  ScheduleFormOneShiftRefMethod,
  ScheduleFormOneShiftSubmitResult,
  useToast,
  useTranslation,
} from "@jamalsoueidan/pkg.bsf";
import { useStaffScheduleDestroy, useStaffScheduleUpdate } from "@services/staff/schedule";
import { Modal } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useRef } from "react";

const EditOneShift = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
    default: module.ScheduleFormOneShift,
  })),
);

interface EditOneScheduleProps {
  schedule: Schedule;
  close: () => void;
}

export const EditOneShiftModal = ({ schedule, close }: EditOneScheduleProps) => {
  const ref = useRef<ScheduleFormOneShiftRefMethod>();
  const { show } = useToast();
  const { t } = useTranslation({ id: "edit-one-shifts-modal", locales });

  const { update } = useStaffScheduleUpdate({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const { destroy } = useStaffScheduleDestroy({
    schedule: schedule._id,
    staff: schedule.staff,
  });

  const onDestroy = useCallback(() => {
    destroy();
    close();
  }, [destroy]);

  const onSubmit = useCallback(
    (fieldValues: ScheduleFormOneShiftBody): ScheduleFormOneShiftSubmitResult => {
      update(fieldValues);
      show({ content: t("success") });
      return { status: "success" };
    },
    [update, show, t],
  );

  const submit = useCallback(() => {
    const noErrors = ref.current.submit().length === 0;
    if (noErrors) {
      close();
    }
  }, [close]);

  return (
    <Modal
      open={true}
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: t("save_changes"),
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: t("destroy"),
          destructive: true,
          onAction: onDestroy,
        },
      ]}
    >
      <Modal.Section>
        <Suspense fallback={<LoadingSpinner />}>
          <EditOneShift data={schedule} onSubmit={onSubmit} ref={ref} />
        </Suspense>
      </Modal.Section>
    </Modal>
  );
};

const locales = {
  da: {
    title: "Redigere vagtplan",
    success: "Vagtplan redigeret",
    save_changes: "Gem ændringer",
    destroy: "Slet vagtplan",
  },
  en: {
    title: "Edit shift",
    success: "Shift edit",
    save_changes: "Save changes",
    destroy: "Delete shift",
  },
};
