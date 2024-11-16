'use client';

import { useState } from 'react';
import { Minus, Plus, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const initialMenuItems: MenuItem[] = [
  { id: 1, name: 'Caesar Salad', price: 8.99, quantity: 0 },
  { id: 2, name: 'Margherita Pizza', price: 12.99, quantity: 0 },
  { id: 3, name: 'Grilled Salmon', price: 18.99, quantity: 0 },
  { id: 4, name: 'Chicken Alfredo', price: 15.99, quantity: 0 },
  { id: 5, name: 'Tiramisu', price: 6.99, quantity: 0 },
  { id: 6, name: 'Iced Tea', price: 2.99, quantity: 0 },
];

export default function Component() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const toggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const updateQuantity = (id: number, change: number) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      ),
    );
  };

  const calculateTotal = () => {
    return menuItems.reduce(
      (total, item) =>
        selectedItems.includes(item.id)
          ? total + item.price * item.quantity
          : total,
      0,
    );
  };

  const handleSubmit = () => {
    const itemizedBill = menuItems
      .filter(item => selectedItems.includes(item.id) && item.quantity > 0)
      .map(
        item =>
          `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`,
      )
      .join('\n');

    alert(
      `Your bill:\n\n${itemizedBill}\n\nTotal amount to pay: $${calculateTotal().toFixed(2)}`,
    );
    // Here you would typically handle the payment process
  };

  const handleReset = () => {
    setSelectedItems([]);
    setMenuItems(menuItems.map(item => ({ ...item, quantity: 0 })));
  };

  const handleAddPosition = () => {
    if (newItemName && newItemPrice) {
      const newItem: MenuItem = {
        id: menuItems.length + 1,
        name: newItemName,
        price: parseFloat(newItemPrice),
        quantity: 0,
      };
      setMenuItems([...menuItems, newItem]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full mx-auto">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Shake Shack</h1>

          <Separator className="my-4" />

          <div className="space-y-4">
            {menuItems.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
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

          <div className="grid grid-cols-5 gap-3">
            <Input
              className="col-span-2"
              placeholder="Item name"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
            <Input
              placeholder="Price"
              className="col-span-2"
              type="number"
              step="0.01"
              value={newItemPrice}
              onChange={e => setNewItemPrice(e.target.value)}
            />
            <Button
              onClick={handleAddPosition}
              size="icon"
              className="col-span-1"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="flex-1">
              Submit
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
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
