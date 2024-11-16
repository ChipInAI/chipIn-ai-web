'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import useGetSessionQuery from '@/lib/service/query/use-get-session';
import useGetSessionAdminQuery from '@/lib/service/query/use-get-session-admin';

export default function Component() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { data, isLoading } = useGetSessionQuery({
    sessionId: id,
    enabled: true,
  });
  const { data: adminData } = useGetSessionAdminQuery({
    sessionId: id,
    enabled: true,
    onError: () => {
      toast({
        title: 'Session not found',
        description:
          'The session you are looking for does not exist or expired',
        action: (
          <Button variant="outline" onClick={() => router.push('/')}>
            Home
          </Button>
        ),
      });
    },
  });

  if (!data || !adminData || isLoading || data.session_data.isClosed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Skeleton className="w-[500px] h-[600px]" />
      </div>
    );
  }

  const formattedTitle = data.session_data.session_name.split(' - ')[2];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  const calculateTotal = () => {
    return data.session_data.receipt
      .filter((_, index) => selectedItems.includes(index.toString()))
      .reduce((total, item) => total + item[0] * item[2], 0);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/live/${id}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full mx-auto">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">{formattedTitle}</h1>

          <Separator className="my-4" />

          <div className="space-y-4">
            {data.session_data.receipt.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`item-${index}`}
                    checked={selectedItems.includes(index.toString())}
                    onCheckedChange={() => toggleItem(index.toString())}
                  />
                  <label
                    htmlFor={`item-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item[1]}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm w-16 text-right">
                    ${(Number(item[0]) * Number(item[2])).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>

          <Separator className="my-4" />

          <div className="flex space-x-2">
            <Button onClick={() => {}} className="flex-1">
              Submit
            </Button>
            <Button onClick={() => {}} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <p className="text-sm font-medium">Share this bill:</p>
            <div className="flex space-x-2">
              <Input
                value={`${window.location.origin}/live/${id}`}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyToClipboard} size="icon" variant="outline">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>
              Other people that uses the session link can also calculate their
              expenses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
