import { Leaf } from "lucide-react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-8">
      <Leaf
        size={22}
        className="mx-auto mb-2 text-[var(--color-primary)]"
        strokeWidth={1.5}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}