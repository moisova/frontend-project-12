import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("notFound.errCode")}</h1>
      <p>{t("notFound.title")}</p>
    </div>
  );
};

export default NotFound;
