"use client";

import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-border py-6 md:py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-16">
        <p className="text-sm text-muted-foreground text-center">
          {t.footer.text}
        </p>
      </div>
    </footer>
  );
}
