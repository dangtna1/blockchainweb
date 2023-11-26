import { useMemo } from 'react'
import { useTable } from 'react-table'

const CustomTable = ({ data, type }) => {
    const columns =
        type === 'controller'
            ? useMemo(
                  () => [
                      {
                          Header: 'Timestamp',
                          accessor: 'createAt',
                      },
                      {
                          Header: 'Device Name',
                          accessor: 'deviceName',
                      },
                      {
                          Header: 'Value',
                          accessor: 'value',
                      },
                      {
                        Header: 'Log',
                        accessor: 'historyLine',
                    },
                  ],
                  []
              )
            : useMemo(
                  () => [
                      {
                          Header: 'Timestamp',
                          accessor: 'createAt',
                      },
                      {
                          Header: 'Sensor type',
                          accessor: 'sensorType',
                      },
                      {
                          Header: 'Value',
                          accessor: 'value',
                      },
                  ],
                  []
              )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    return (
        <table {...getTableProps()} className='table-auto w-full'>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} className='border px-4 py-2'>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className='border-t'>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} className='border px-4 py-2'>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomTable
