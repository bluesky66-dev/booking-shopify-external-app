import { StaffForm, useStaffCreate } from "@jamalsoueidan/pkg.bsf";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { create } = useStaffCreate();

  const submit = useCallback(
    async (fieldValues: any) => {
      const staff = await create(fieldValues);
      navigate(`/staff/${staff.payload?._id}`);
    },
    [create, navigate],
  );

  return (
    <StaffForm
      action={submit}
      breadcrumbs={[{ content: "Staff", onAction: () => navigate("/staff") }]}
      allowEditing={{ group: true, active: true, role: true }}
    />
  );
};
