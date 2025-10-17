import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PaymentsChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseEnter = (index) => setActiveIndex(index);
    const handleMouseLeave = () => setActiveIndex(null);

    const thisMonth = 650;
    const lastMonth = 450;
    const thisYear = 2500;
    const percentage = 43;

    const thisMonthPercent = (thisMonth / thisYear) * 100;
    const lastMonthPercent = (lastMonth / thisYear) * 100;
    const remainingPercent = 100 - thisMonthPercent - lastMonthPercent;

    const data = [
        { name: 'This Month', value: thisMonthPercent, color: '#C24C99' },
        { name: 'Last Month', value: lastMonthPercent, color: '#664286' },
        { name: 'Remaining', value: remainingPercent, color: '#EEEEEE' },
    ];

    // ✅ Custom tooltip with light gray background
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0];
            return (
                <div className="bg-gray-100 border border-gray-300 shadow-sm rounded-md px-4 py-2 text-gray-800 text-sm">
                    <p className="font-medium">{name}</p>
                    <p className="text-gray-600">{value.toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payments</h2>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>

            <div className="relative flex items-center">
                {/* Legend */}
                <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#C24C99]"></div>
                        <span className="text-sm text-gray-700">This Month</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#664286]"></div>
                        <span className="text-sm text-gray-700">Last Month</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#EEEEEE]"></div>
                        <span className="text-sm text-gray-700">This Year</span>
                    </div>
                </div>

                {/* Circular Chart */}
                <div className="relative w-64 h-[12rem] mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                startAngle={90}
                                endAngle={450}
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={2}
                                dataKey="value"
                                strokeWidth={0}
                                onMouseLeave={handleMouseLeave}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        cursor="pointer"
                                        stroke={activeIndex === index ? "#fff" : "none"}
                                        strokeWidth={activeIndex === index ? 2 : 0}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        {activeIndex ? (
                            <>
                                {/* <p className="text-sm text-gray-500 mb-1">{data[activeIndex].name}</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {data[activeIndex].value.toFixed(2)}%
                                </p> */}
                            </>
                        ) : (
                            <>
                                <p className="text-xs text-gray-600 mb-1">This Month</p>
                                <p className="text-3xl font-bold text-gray-900">${thisMonth}K</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <svg
                                        className="w-4 h-4 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                    <span className="text-sm text-green-500 font-medium">
                                        {percentage}%
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsChart;
