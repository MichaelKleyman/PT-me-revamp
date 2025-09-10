import { PatientPage } from "@client/features/patient-page/exports";
import { LayoutPage } from "@client/layouts/LayoutPage";
import { useGetPatient } from "@client/lib/api/practitioner/query";
import { LoadingPage } from "@client/lib/components/loading/LoadingPage";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute(
  "/_authenticated/practice/patients/$patientId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { patientId } = useParams({
    from: "/_authenticated/practice/patients/$patientId",
  });

  const { data: patient } = useGetPatient(patientId);

  const pageBreadcrumbs = [
    { label: "Patients", href: "/practice/patients" },
    { label: patient?.firstName + " " + patient?.lastName, href: "#" },
  ];

  return (
    <LayoutPage pageBreadcrumbs={pageBreadcrumbs}>
      <Suspense fallback={<LoadingPage />}>
        <PatientPage />
      </Suspense>
    </LayoutPage>
  );
}
