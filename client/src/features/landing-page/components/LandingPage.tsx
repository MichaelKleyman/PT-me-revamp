import { Stack } from "@mui/material";
import { TopBar } from "@client/features/top-bar/TopBar";
import { LandingPageSectionOne } from "@client/features/landing-page/components/LandingPageSectionOne";
import { LandingPageSectionTwo } from "@client/features/landing-page/components/LandingPageSectionTwo";
import { LandingPageSectionMiddle } from "@client/features/landing-page/components/LandingPageSectionMiddle";
import { useRef } from "react";
import { MenuRef, MenuRefs } from "@client/lib/types/types";
import { LandingPageFooter } from "@client/features/landing-page/components/LandingPageFooter";

export const LandingPage = () => {
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const menuRefs: MenuRefs = {
    Services: servicesRef,
  };

  const handleClick = (ref: MenuRef) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack sx={{ background: "transparent" }}>
      <TopBar menuRefs={menuRefs} handleClick={handleClick} />
      {/* First section */}
      <Stack>
        <LandingPageSectionOne />
      </Stack>
      <Stack alignItems="center">
        {/* Middle section */}
        <LandingPageSectionMiddle />
      </Stack>
      {/* Second section */}
      <Stack ref={servicesRef}>
        <LandingPageSectionTwo />
      </Stack>
      <LandingPageFooter />
    </Stack>
  );
};
