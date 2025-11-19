import react, { useState } from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

const InstituteInfo = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phone: '300 1234567',
    countryCode: '+92',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    city: 'Manchester',
    state: 'Kentucky',
    zipCode: '39495',
    instituteCode: 'John Doe',
    instituteName: 'john.doe@gmail.com',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return <div>
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
      <div className="border-2 border-dashed border-neutral-300 rounded-xl p-12 flex flex-col items-center justify-center hover:border-purple-500 cursor-pointer transition-colors">
        <ArrowUpwardOutlinedIcon />
        <span className="text-sm text-neutral-500 mt-2">Upload Logo</span>
      </div>
    </div>

    <h3 className="text-lg font-semibold mb-4">General Information</h3>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium mb-2">Institute Code</label>
        <input
          type="text"
          value={formData.instituteCode}
          onChange={(e) => handleInputChange('instituteCode', e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Institute Name</label>
        <input
          type="text"
          value={formData.instituteName}
          onChange={(e) => handleInputChange('instituteName', e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Phone</label>
      <div className="flex gap-4">
        <select
          value={formData.countryCode}
          onChange={(e) => handleInputChange('countryCode', e.target.value)}
          className="w-24 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="+92">+92</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Address</label>
      <input
        type="text"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium mb-2">City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">State</label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Zip Code</label>
      <input
        type="text"
        value={formData.zipCode}
        onChange={(e) => handleInputChange('zipCode', e.target.value)}
        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    <button className="px-8 py-2.5 bg-[#664286] text-white rounded-lg hover:bg-[#5a356d] transition-colors font-medium">
      Update Info
    </button>
  </div>;
};
export default InstituteInfo;
