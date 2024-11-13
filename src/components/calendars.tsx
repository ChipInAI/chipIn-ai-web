'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

export function Calendars({
  sections,
}: {
  sections: {
    name: string;
    link: string;
  }[];
}) {
  const router = useRouter();

  return (
    <>
      {sections.map((section, index) => (
        <div className="px-8 py-2" key={index}>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => router.push(section.link)}
          >
            <span>{section.name}</span>
          </Button>
        </div>
      ))}
    </>
  );
}
