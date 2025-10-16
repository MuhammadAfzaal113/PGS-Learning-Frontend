import React from 'react';

const PaymentInvoice = ({ invoice = {}, items = [], onClose }) => {
    const total = items.reduce((s, it) => s + (it.amount || 0), 0);
    const invoiceData = {
        invoiceNumber: '#225633',
        soldBy: 'Futuro Passionnecto',
        date: '10 January 2024',
        billTo: {
            name: 'Banony Wood',
            phone: '+1-202-555-0153',
            email: 'name@mail.com'
        },
        items: [
            {
                sNo: '01',
                paymentFor: 'Total PSU',
                amount: 542,
                discount: 542,
                tax: 542,
                total: '$452'
            }
        ],
        subtotal: '$400.00',
        cardFee: '$0.00',
        grandTotal: '$600.00'
    };

    return (
        <div className='p-4'>
            <div className="bg-white rounded-lg shadow p-6">



                {/* <div className="p-8"> */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Invoice</h2>
                    <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-medium">
                        Download Invoice
                    </button>
                </div>

                {/* Invoice Card */}
                <div className="bg-white  overflow-hidden max-w-4xl">

                    <div className=" text-white p-8 h-[276px]  rounded-b-2xl" style={{ background: 'linear-gradient(177deg, #C24C99 0%, #664286 100%)' }}>
                        <div className="flex items-start justify-between">
                            {/* Left Side - Logo and Invoice */}
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">🎓</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-1">Invoice</h3>
                                    <p className="text-white/80 text-sm">{invoiceData.invoiceNumber}</p>
                                </div>
                            </div>

                            {/* Right Side - Bill To */}
                            <div className="text-right">
                                <h4 className="text-sm font-semibold mb-2">Bill To</h4>
                                <p className="text-sm">{invoiceData.billTo.name}</p>
                                <p className="text-sm text-white/80">{invoiceData.billTo.phone}</p>
                                <p className="text-sm text-white/80">{invoiceData.billTo.email}</p>
                            </div>
                        </div>


                    </div>

                    {/* Invoice Table */}
                    <div className="p-[24px] w-[768px] bg-white rounded-lg m-auto relative bottom-[30px]">

                        <div className='h-[868px] flex flex-col gap-4'>
                        {/* Sold By and Date */}
                        <div className=" flex px-4 py-2 bg-[#F5F5F5] rounded-lg items-center justify-between text-sm">
                            <div>
                                <span className="">Sold By: </span>
                                <span className="font-medium">{invoiceData.soldBy}</span>
                            </div>
                            <div>
                                <span className="">Date: </span>
                                <span className="font-medium">{invoiceData.date}</span>
                            </div>
                        </div>

                        <div className='bg-[#F5F5F5] rounded-lg p-2'>

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">S.No</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Payment For</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Discount</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Tax</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.items.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="py-4 px-4 text-sm text-gray-700">{item.sNo}</td>
                                            <td className="py-4 px-4 text-sm text-gray-700">{item.paymentFor}</td>
                                            <td className="py-4 px-4 text-sm text-gray-700 text-center">{item.amount}</td>
                                            <td className="py-4 px-4 text-sm text-gray-700 text-center">{item.discount}</td>
                                            <td className="py-4 px-4 text-sm text-gray-700 text-center">{item.tax}</td>
                                            <td className="py-4 px-4 text-sm text-gray-700 text-right font-medium">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Totals Section */}
                            <div className="mt-6 mr-[15px] flex justify-end">
                                <div className="w-[248px] space-y-2">
                                    <div className="flex justify-between items-center  ">
                                        <span className="text-sm text-gray-600">Subtotal</span>
                                        <span className="text-sm font-medium text-gray-900">{invoiceData.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center ">
                                        <span className="text-sm text-gray-600">Card Fee</span>
                                        <span className="text-sm font-medium text-gray-900">{invoiceData.cardFee}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-semibold text-gray-900">Grand Total</span>
                                        <span className="text-base font-bold text-gray-900">{invoiceData.grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>



                        {/* Note Section */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur. Nunc amet velit odio pellentesque tempus placerat velit dictate volutpat et et. Pellentesque odio neque ultrices elit cursus. Dictum massa elit puro dignissim ut elit erus.
                            </p>
                        </div>
                    </div>
                </div>
                {/* </div> */}


            </div>
        </div>

    );
};

export default PaymentInvoice;
