import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
  hidden?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  hidden = false,
  seeAllHref = "/categories",
}) => (
  <div
    className={`flex justify-between items-center mb-4 ${
      hidden ? "hidden" : ""
    }`}
  >
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    <Link
      href={seeAllHref}
      className="text-sm font-semibold text-green-600 hover:text-green-700"
    >
      See All
    </Link>
  </div>
);
