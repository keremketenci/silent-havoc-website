// translations
import { useTranslations } from "next-intl";

// components
import { CT } from "./CT";
import { FM } from "./FM";
import InstagramFeed from "./InstagramFeed";

export function Home() {
  const t = useTranslations("Home");

  return (
    <div>
      <div className="grid grid-row-3 md:grid md:grid-cols-3 min-h-screen md:items-center md:pb-12">
        {/* Text Section */}
        <div className="text-center">
          <p className="text-4xl font-bold text-accent pb-6">{`${t(
            "title"
          )}!`}</p>
          <p className="text-lg text-gray-300 pb-6">{`${t("about")}.`}</p>
        </div>

        <div></div>

        <div className="text-center">
          <CT />
        </div>
      </div>
      <div>
        <InstagramFeed/>
      </div>
      <div className="my-48">
        <FM />
      </div>
    </div>
  );
}
