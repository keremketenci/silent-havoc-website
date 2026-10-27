// translations
import { useTranslations } from "next-intl";

// components
import { CircularText } from "@/components/effects/CircularText";
// import { FM } from "./FM";
import { InstagramFeed } from "./InstagramFeed";

export function Home() {
  const t = useTranslations("Home");

  return (
    <div>
      <div className="grid grid-row-3 md:grid md:grid-cols-3 min-h-screen md:items-center md:pb-12">
        {/* Text Section */}
        <div className="text-center px-4 pb-2 lg:p-0">
          <h1 className="text-4xl font-bold text-accent pb-6">{`${t(
            "title",
          )}!`}</h1>
          <p className="text-lg text-gray-300 pb-6">{`${t("about")}.`}</p>
          <p className="text-lg text-gray-300 pb-6 font-bold">{`${t("greeting")}...`}</p>
        </div>

        <div></div>

        <div className="text-center">
          <CircularText
            text="SILENT*HAVOC*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class select-none md:cursor-none"
            logoSrc="/icons/silenthavoc/logo-colored.png"
            logoSize={100}
          />
        </div>
      </div>
      <InstagramFeed />
      {/* <div className="my-48">
        <FM />
      </div> */}
    </div>
  );
}
