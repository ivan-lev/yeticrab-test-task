import './Records.scss';

//Components
import { Table, Link, withTableActions, TableDataItem } from '@gravity-ui/uikit';

//utils and variables
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';

//Types
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';

export default function Records({ records }: { records: RecordElementType[] }): JSX.Element {
  const MyTable = withTableActions(Table);

  const columns = [
    { id: tableColumnsEnum.Number },
    { id: tableColumnsEnum.DateTime },
    { id: tableColumnsEnum.ClientsFirm },
    { id: tableColumnsEnum.Shipper },
    { id: tableColumnsEnum.ShipperNumber },
    { id: tableColumnsEnum.Comment },
    { id: tableColumnsEnum.Status },
    { id: tableColumnsEnum.AtiCode }
  ];

  const data = records.map(record => {
    return {
      id: record.number,
      [tableColumnsEnum.Number]: record.number,
      [tableColumnsEnum.DateTime]: getDate(record.datetime),
      [tableColumnsEnum.ClientsFirm]: record.companyName,
      [tableColumnsEnum.Shipper]: record.clientName,
      [tableColumnsEnum.ShipperNumber]: record.phone,
      [tableColumnsEnum.Comment]: record.comment,
      [tableColumnsEnum.Status]: record.status,
      [tableColumnsEnum.AtiCode]: (
        <Link href={getAtiLink(record.atiCode)} target="_blank">
          {record.atiCode}
        </Link>
      )
    };
  });

  const getRowActions = () => {
    return [
      {
        text: 'Print',
        handler: (item: TableDataItem) => {
          console.log(item);
        }
      },
      {
        text: 'Edit',
        handler: (item: TableDataItem, index: number) => {
          console.log({ item, index });
        }
      },
      {
        text: 'Remove',
        handler: (item: TableDataItem, index: number) => {},
        theme: 'danger'
      }
    ];
  };

  return <MyTable data={data} columns={columns} getRowActions={getRowActions} />;
}
