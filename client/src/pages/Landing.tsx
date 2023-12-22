import { useTranslation } from "react-i18next";
import Box from "../components/global/Box";
import Button from "../components/global/Button";
import { useNavigate } from "react-router-dom";

// Landing page
export default function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const newYear =
    new Date().getMonth() > 10
      ? new Date().getFullYear() + 1
      : new Date().getFullYear();

  return (
    <div className="flex flex-col h-[calc(100%-48px)] items-center justify-center bg-[url('/temple1.jpg')] bg-cover">
      <Box
        title={t("welcome") + " " + newYear + "!"}
        children={
          <div className="flex flex-col gap-[32px]">
            <Button
              color="orange"
              title={t("addRoom")}
              onClick={() => {
                navigate("/add-room");
              }}
            />
            <Button
              color="green"
              title={t("searchRoom")}
              onClick={() => {
                navigate("/search-room");
              }}
            />
          </div>
        }
      />
    </div>
  );
}
