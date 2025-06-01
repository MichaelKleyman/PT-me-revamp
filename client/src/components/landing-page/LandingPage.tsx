import { Stack } from "@mui/material";
import { TopBar } from "@client/components/top-bar/TopBar";
import { LandingPageSectionOne } from "@client/components/landing-page/LandingPageSectionOne";
import { LandingPageSectionTwo } from "@client/components/landing-page/LandingPageSectionTwo";
import { LandingPageSectionMiddle } from "@client/components/landing-page/LandingPageSectionMiddle";
import { useRef } from "react";
import { MenuRef, MenuRefs } from "@client/lib/utils/types/types";
import { LandingPageFooter } from "@client/components/landing-page/LandingPageFooter";

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
