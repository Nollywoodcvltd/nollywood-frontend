import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const RenderTableColumn = ({ free }: { free?: boolean }) => (
  <td className={free ? 'double-row' : ''} rowSpan={free ? 3 : undefined}>
    <div>
      Register, User Bio, Explore Talents, News <CheckIcon sx={{ fontSize: 16 }} />
    </div>
    <div className='fs-6'>
      User CV, Jobs{' '}
      {free ? (
        <>
        <CloseIcon sx={{ fontSize: 16 }} /> 
        </>
      ) : (
        <CheckIcon sx={{ fontSize: 16 }} />
      )}
    </div>
  </td>
);

export default RenderTableColumn;
