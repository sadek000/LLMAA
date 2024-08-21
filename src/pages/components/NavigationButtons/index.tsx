import { ATBox, ATButton } from "components";
import { useTranslation } from "react-i18next";

interface Props {
  handleBack: () => void;
  handleNext: () => void;
  handleLast: () => void;
  activeStep: number;
  isLastStep: boolean;
  isEditMode: boolean;
}

function NavigationButtons({
  handleBack,
  handleNext,
  handleLast,
  activeStep,
  isLastStep,
  isEditMode,
}: Props) {
  const { t } = useTranslation();

  return (
    <ATBox mt={3} width="100%" display="flex" justifyContent="space-between">
      {activeStep === 0 ? (
        <ATBox />
      ) : (
        <ATButton variant="gradient" color="light" onClick={handleBack}>
          {t("back")}
        </ATButton>
      )}
      <ATBox>
        {isLastStep || (
          <ATButton variant="gradient" color="primary" onClick={handleNext} type={"button"}>
            {t("next")}
          </ATButton>
        )}
        {(activeStep >= 2 || isLastStep || isEditMode) && (
          <ATButton
            variant="gradient"
            color="success"
            onClick={handleLast}
            type={"button"}
            style={{ marginInlineStart: "10px" }}
          >
            {t("submit")}
          </ATButton>
        )}
      </ATBox>
    </ATBox>
  );
}

export default NavigationButtons;
