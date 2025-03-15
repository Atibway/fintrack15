import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Coins } from 'lucide-react';

interface CurrencySelectorProps {
  className?: string;
}

 const availableCurrencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' }, // Uganda
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },  // Kenya
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' }, // Tanzania
  { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc' }, // Rwanda
  { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc' }, // Burundi
  { code: 'SSP', symbol: '£', name: 'South Sudanese Pound' }, // South Sudan
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' }, // Ethiopia
  { code: 'SDG', symbol: 'ج.س', name: 'Sudanese Pound' }, // Sudan
  { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling' }, // Somalia
  { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc' }, // Djibouti
  { code: 'ERF', symbol: 'Nfk', name: 'Eritrean Nakfa' }, // Eritrea
];


export const CurrencySelector = ({ className }: CurrencySelectorProps) => {
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Coins size={16} className="text-muted-foreground" />
      <Select value={currentCurrency} onValueChange={setCurrentCurrency}>
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {availableCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center gap-2">
                <span>{currency.symbol}</span>
                <span>{currency.code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};


