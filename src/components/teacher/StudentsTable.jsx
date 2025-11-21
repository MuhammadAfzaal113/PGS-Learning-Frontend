import React, {useMemo} from 'react';
import DataTable from '../../components/common/DataTable';
import Avatar from '../../components/common/Avatar';

const StudentsTable = ({ students = [], loading = false }) => {
  const studentsData = [
    { id: '564566', name: 'Ralph Edwards', avatar: '', courses: '07', email: 'ralph.edwards@example.com', phone: '(704) 555-0127', location: 'Kent, Utah', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Eleanor Pena', avatar: '', courses: '07', email: 'elenor.pena@example.com', phone: '(684) 555-0102', location: 'Lansing, Illinois', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Cody Fisher', avatar: '', courses: '07', email: 'codyfisher@example.com', phone: '(808) 555-0111', location: 'Corona, Michigan', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Eleanor Pena', avatar: '', courses: '07', email: 'elenor.pena@example.com', phone: '(684) 555-0102', location: 'Lansing, Illinois', registeredOn: 'Sep 28, 2025' },
    // { id: '564566', name: 'Ralph Edwards', avatar: '👨', courses: '07', email: 'ralph.edwards@example.com', phone: '(704) 555-0127', location: 'Kent, Utah', registeredOn: 'Sep 28, 2025' },
  ];
  console.log("StudentsTable received students:", students);

    // Convert API students into table rows
  const formattedStudents = useMemo(() => {
    return students?.slice(0, 4).map((s) => ({
      id: s.id?.slice(-6) || "-",
      name: s.full_name || "No Name",
      email: s.email || "",
      avatar: s.avatar || "",
      registeredOn: s.created_at
        ? new Date(s.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
    }));
  }, [students]);

  const studentsColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { 
      header: 'Name', 
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar} name={row.name} />
          <span className="text-[#424242]">{row.name}</span>
        </div>
      )
    },
    // { header: 'Courses Purchased', key: 'courses', className: 'text-gray-600' },
    { header: 'Email', key: 'email', className: 'text-[#424242]' },
    // { header: 'Phone', key: 'phone', className: 'text-gray-600' },
    // { header: 'Location', key: 'location', className: 'text-gray-600' },
    { header: 'Registered On', key: 'registeredOn', className: 'text-[#424242]' }
    // {
    //   header: '',
    //   key: 'actions',
    //   render: () => (
    //     <button className="text-gray-400 hover:text-gray-600">⋮</button>
    //   )
    // }
  ];

  return (
    <div className="h-[400px] bg-white rounded-lg shadow">
    <DataTable
      title="Students"
      columns={studentsColumns}
      data={formattedStudents}
      showSearch={false}
      showSortBy={false}
      searchPlaceholder="Search"
      showPagination={false}
    />
    </div>
  );
};

export default StudentsTable;
