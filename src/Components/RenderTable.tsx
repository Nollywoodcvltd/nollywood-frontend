import RenderTableColumn from './RenderTableColumn';
import { Table } from 'react-bootstrap';

const RenderTable = () => (
  <Table className='pricing-table w-75' bordered hover>
    <thead>
      <tr>
        <th>Free</th>
        <th>1 Month</th>
        <th>1 Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>₦ 0</td>
        <td>₦ 600</td>
        <td>₦ 5000</td>
      </tr>
      <tr>
        <RenderTableColumn free={true} />
        <RenderTableColumn />
        <RenderTableColumn />
      </tr>
    </tbody>
  </Table>
);

export default RenderTable;
