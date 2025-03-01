import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Drawer, Slider, Select, InputNumber, Button, Space, Divider } from "antd";

const FilterButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [rooms, setRooms] = useState<number>(1);
  const [location, setLocation] = useState<string>("");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleApplyFilters = () => {
     console.log("Applied filters:", { priceRange, rooms, location });
    onClose();
  };

  const handleResetFilters = () => {
    setPriceRange([0, 5000]);
    setRooms(1);
    setLocation("");
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const locationOptions = [
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "miami", label: "Miami" },
    { value: "seattle", label: "Seattle" },
  ];

  return (
    <div>
      <button 
        className="flex items-center gap-4 px-4 py-2 h-14 w-32 border rounded-xl shadow-sm bg-white hover:bg-gray-100"
        onClick={showDrawer}
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="font-medium">Filters</span>
      </button>   

      <Drawer
        title="Filter Properties"
        placement="left"
        onClose={onClose}
        open={open}
        width={360}
        footer={
          <Space className="w-full flex justify-between">
            <Button className="bg-gray-100 shadow-md" onClick={handleResetFilters}>Reset</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-md" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Space>
        }
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Price Range ($)</h4>
            <Slider
              range
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="text-purple-500"
            />
            <div className="flex justify-between mt-2">
              <InputNumber
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(value) => value !== null && setPriceRange([value, priceRange[1]])}
                style={{ width: '45%' }}
              />
              <span className="self-center">-</span>
              <InputNumber
                min={priceRange[0]}
                max={10000}
                value={priceRange[1]}
                onChange={(value) => value !== null && setPriceRange([priceRange[0], value])}
                style={{ width: '45%' }}
              />
            </div>
          </div>

          <Divider />

          <div>
            <h4 className="font-medium mb-2">Location</h4>
            <Select
              placeholder="Select a location"
              style={{ width: '100%' }}
              value={location || undefined}
              onChange={(value) => setLocation(value)}
              options={locationOptions}
              allowClear
            />
          </div>

          <Divider />

          <div>
            <h4 className="font-medium mb-2">Number of Rooms</h4>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                disabled={rooms <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{rooms}</span>
              <Button 
                onClick={() => setRooms(rooms + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FilterButton;